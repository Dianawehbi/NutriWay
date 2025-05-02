import { useState, useEffect } from "react";
import DietitianNavBar from "../../components/Dietitian/NavBar";
import DietitianHeader from "../../components/Dietitian/Header";
import RecipeManager from "../../components/RecipeManager.jsx";
import DashboardAppointmentsSection from "../../components/Dietitian/ManageAppoitment";
import Footer from "../../components/Footer";
import DietitianAvailabilitySection from "../../components/Dietitian/DietitianAvailabilitySection.jsx";
import Dietitian from "../../components/Client/DietianSection";
import axios from "axios";
import LoadingPage from "../auth/LoadingPage.jsx";
import PendingApproval from "./PendingApproval.jsx";

const DietitianDashboard = () => {

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <DietitianNavBar />

            <DietitianHeader />
            {/* Dashboard Content */}


           
            <div className="p-6 space-y-6 mt-20">
                <DietitianAvailabilitySection />
                <DashboardAppointmentsSection />
                <RecipeManager />
                <Dietitian />

            </div>
            <Footer />
        </div>
    );
};

export default DietitianDashboard;
