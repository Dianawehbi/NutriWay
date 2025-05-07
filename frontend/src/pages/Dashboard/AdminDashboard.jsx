import React, { useState, useEffect } from "react";
import AdminNavBar from "../../components/Admin/AdminNavBar";
import AdminHeader from "../../components/Admin/AdminHeader";
import RecipeManager from "../../components/RecipeManager";
import Statistic from "../../components/Admin/Statistics";
import AdminVerifying from "../../components/Admin/AdminVerifying.jsx";
import Actions from "../../components/Admin/Actions";
import Footer from "../../components/Footer";
import Dietitian from "../../components/Client/DietianSection.jsx";
import { useAuth } from "../../context/authContext";

const AdminDashboard = () => {
    useEffect(() => {
        const hasReloaded = sessionStorage.getItem('hasReloaded');
        if (!hasReloaded) {
          sessionStorage.setItem('hasReloaded', 'true');
          window.location.reload();
        }
      }, []);
    // const { user } = useAuth()
    //instead of this we will ceate private route and protected route
    return (
        <div className="min-h-screen bg-gray-50">
            <AdminNavBar /> 
            <AdminHeader />
            <div className="p-6 space-y-6">
                <Statistic />
                <AdminVerifying />
                <RecipeManager />
                <Dietitian/>
                <Actions />
            </div>
            <Footer />

        </div>
    );
};

export default AdminDashboard;
