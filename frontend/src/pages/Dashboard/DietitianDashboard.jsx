import DietitianNavBar from "../../components/Dietitian/NavBar.jsx";
import DietitianHeader from "../../components/Dietitian/Header.jsx";
import RecipeManager from "../../components/RecipeManager.jsx";
import DashboardAppointmentsSection from "../../components/Dietitian/ManageAppoitment.jsx";
import Footer from "../../components/Footer.jsx";
import DietitianAvailabilitySection from "../../components/Dietitian/DietitianAvailabilitySection.jsx";
import Dietitian from "../../components/Client/DietianSection.jsx";
import axios from "axios";
import LoadingPage from "../auth/LoadingPage.jsx";
import PendingApproval from "./PendingApproval.jsx";
import { useEffect } from 'react';

const DietitianDashboard = () => {
    useEffect(() => {
        const hasReloaded = sessionStorage.getItem('hasReloaded');
        if (!hasReloaded) {
          sessionStorage.setItem('hasReloaded', 'true');
          window.location.reload();
        }
      }, []);
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <DietitianNavBar />

            <DietitianHeader />
            {/* Dashboard Content */}


           
            <div className="p-6 space-y-6 mt-20">
                <DietitianAvailabilitySection />
                <DashboardAppointmentsSection />
                <Dietitian />

                <RecipeManager />

            </div>
            <Footer />
        </div>
    );
};

export default DietitianDashboard;
