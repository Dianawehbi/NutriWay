import React from 'react';
import NavBar from '../../components/NavBar';
import DietitianServicesSection from '../../components/profile/dietitian_services_section';
import ProfileSection from '../../components/profile/profileSection';
import img from '../../assets/beforandafetr.jpg'
const DietitianProfile = () => {

  // for the dietitian it self , there is a setting buutton , this button lead dietitan to manage there account 
  // also for dietitian there is manage button  also do the same things , additional to 
  // re,ove acccount 

  return (
    <div className="bg-gray-100">
      <NavBar />
      <div className="min-h-screen  flex flex-col items-center p-6 mt-20 font-serif">
        {/* Profile Section */}
        <ProfileSection />

        {/* Sevices Section */}
        <div className="bg-white shadow-xl rounded-3xl p-8 w-11/12 mt-8">
          <DietitianServicesSection />
        </div>

        <div className="bg-white shadow-xl rounded-3xl p-8 w-11/12 mt-8">
          <div className="flex flex-row justify-around gap-4">
            <div>
              <img src={img} alt="Before" className="max-h-[300px] w-auto rounded-lg" />
            </div>
            <div>
              <img src={img} alt="After" className="max-h-[300px] w-auto rounded-lg" />
            </div>
            <div className='hidden md:flex'>
              <img src={img} alt="Before" className="max-h-[300px] w-auto rounded-lg" />
            </div>
            <div className='hidden md:flex'>
              <img src={img} alt="After" className="max-h-[300px] w-auto rounded-lg" />
            </div>
          </div>
        </div>


        <div className="bg-white shadow-xl rounded-3xl p-8 w-11/12 mt-8">
          <h2 className="text-xl font-semibold mb-4">Our Location</h2>
          <iframe
            className="w-full h-64 rounded-xl"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2942.497101850026!2d35.8221472!3d34.4143186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1521f726e50c8ddd%3A0x514a9e6e348373c5!2sLebanese%20International%20University!5e0!3m2!1sen!2slb!4v1678301801086!5m2!1sen!2slb"
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

      </div>
    </div>
  );
};

export default DietitianProfile;
