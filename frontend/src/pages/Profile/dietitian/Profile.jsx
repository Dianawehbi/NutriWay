import React, { useEffect, useState } from 'react';
import DietitianNavBar from '../../../components/Dietitian/NavBar.jsx';
import DietitianService from "../../../components/profile/dietitian_services.jsx";
import ProfileSection from '../../../components/Dietitian/profileSection.jsx';
import { useNavigate, useParams } from "react-router-dom";
import Footer from '../../../components/Footer.jsx'
import axios from 'axios';
import LoadingPage from '../../auth/LoadingPage.jsx';
import ClientNavbar from '../../../components/Client/NavBar.jsx';
import AdminNavBar from '../../../components/Admin/AdminNavBar.jsx';
const DietitianProfile = () => {
  const [dietitian, setDietitian] = useState(null);
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchDietitianInfo = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user._id) {
        try {
          const res = await axios.get(`http://localhost:5000/api/dietitian/${id}`);
          if (res.data.success) {
            setDietitian(res.data.data);
            setError(null);
          } else {
            console.error("Failed to fetch dietitian info: success = false");
          }
        } catch (err) {
          setError("Failed to fetch dietitian info. " + err.message);
          console.error("Error:", err);
        }
      } else {
        alert("LocalStorage does not contain a user. Please login.");
        navigate('/login');
      }
    };

    fetchDietitianInfo();
  }, [id, navigate]);

  console.log(dietitian);
  useEffect(() => {
    const fetchServices = async () => {
      if (!dietitian?.user_id) return;
      try {
        const res = await axios.get(`http://localhost:5000/api/dietitian/service/${dietitian.user_id._id}`);
        // console.log(res.data.services)
        if (res.data.success) {
          console.log(res.data)
          setServices(res.data.services);
          setError(null);
        } else {
          console.error("Failed to fetch services: success = false");
        }
      } catch (err) {
        setError("Failed to fetch dietitian's services. " + err.message);
        console.error("Error fetching services:", err);
      }
    };

    fetchServices();
  }, [dietitian]);


  if (!dietitian) {
    return <div>Loading ...</div>;
  }

  let role, user_id, dietitian_id, dietitian_main_id;
  if (dietitian) {
    role = JSON.parse(localStorage.getItem("user")).role
    user_id = JSON.parse(localStorage.getItem("user"))._id
    dietitian_id = dietitian.user_id._id;
    dietitian_main_id = dietitian._id
  }

  return (
    <div className="bg-gray-100">
      {role == "dietitian" &&
        <DietitianNavBar role={role} dietitian_id={dietitian_id} user_id={user_id} />
      }
      {role == "client" &&
        <ClientNavbar />
      }
      {role == "admin" &&
        <AdminNavBar />
      }
      <div className="min-h-screen flex flex-col items-center p-6 mt-20 font-serif">

        <ProfileSection dietitian={dietitian} role={role} user_id={user_id} dietitian_id={dietitian_id} />

        <div className="bg-white shadow-xl rounded-3xl p-8 w-11/12 mt-8">
          <DietitianService services={services} role={role} user_id={user_id} dietitian_id={dietitian_main_id} />
        </div>


        {/* Map Section */}
        <div className="bg-white shadow-xl rounded-3xl p-8 w-11/12 mt-8">
          <h2 className="text-xl font-semibold mb-4">Our Location</h2>
          <iframe
            className="w-full h-64 rounded-xl"
            src={`https://maps.google.com/maps?q=${dietitian.clinic_address.lat},${dietitian.clinic_address.lng}&z=15&output=embed`}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>

        </div>
      </div>
      <Footer />
    </div >
  );
};

export default DietitianProfile;
