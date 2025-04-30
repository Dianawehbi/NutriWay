import React, { useEffect, useState } from 'react';
import DietitianNavBar from '../../../components/Dietitian/NavBar.jsx';
import DietitianService from "../../../components/profile/dietitian_services.jsx";
import ProfileSection from '../../../components/Dietitian/profileSection.jsx';
import img from '../../../assets/beforandafetr.jpg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DietitianProfile = () => {
  const [dietitian, setDietitian] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchDietitianInfo = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user._id) {

        try {
          const res = await axios.get('http://localhost:5000/api/dietitian', {
            params: {
              id: JSON.parse(localStorage.getItem("user"))._id
            }
          });
          if (res.data.success) {
            setDietitian(res.data.dietitian); // or res.data.data depending on your backend response
            setError(null)
          } else {
            console.error("Failed to fetch dietitian info: success = false");
          }
        } catch (err) {
          setError("Failed to fetch dietitian info \n " + err)
          console.error("Failed to fetch dietitian info", err);
        }
      } else {
        alert("Error Your LocalStorage Doesnt contain a user \n Please Login")
        navigate('/login')
      }
    };

    fetchDietitianInfo();
  }, []);
  if (error) {
    return <div className="text-center mt-10">{error}</div>;
  }
  if (!dietitian) {
    return <p className="text-center mt-10">Loading profile... </p>;
  }


  return (
    <div className="bg-gray-100">
      <DietitianNavBar />
      <div className="min-h-screen flex flex-col items-center p-6 mt-20 font-serif">

        {/* Profile Section */}
        <ProfileSection dietitian={dietitian} />

        {/* Services Section */}
        <div className="bg-white shadow-xl rounded-3xl p-8 w-11/12 mt-8">
          <DietitianService services={dietitian.services} />
        </div>

        {/* Before/After Images */}
        <div className="bg-white shadow-xl rounded-3xl p-8 w-11/12 mt-8">
          <div className="flex flex-row justify-around gap-4">
            {[1, 2, 3, 4].map((_, i) => (
              <div key={i} className={i > 1 ? 'hidden md:flex' : ''}>
                <img src={img} alt="Before or After" className="max-h-[300px] w-auto rounded-lg" />
              </div>
            ))}
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-white shadow-xl rounded-3xl p-8 w-11/12 mt-8">
          <h2 className="text-xl font-semibold mb-4">Our Location</h2>
          <iframe
            className="w-full h-64 rounded-xl"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(dietitian.clinic_address.city || "Beirut")}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default DietitianProfile;
