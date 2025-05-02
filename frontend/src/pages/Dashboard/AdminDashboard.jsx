import React, { useState, useEffect } from "react";
import AdminNavBar from "../../components/Admin/AdminNavBar";
import AdminHeader from "../../components/Admin/AdminHeader";
import RecipeManager from "../../components/RecipeManager";
import Statistic from "../../components/Admin/Statistics";
import AdminVerifying from "../../components/Admin/AdminVerifying.jsx";
import Actions from "../../components/Admin/Actions";
import Footer from "../../components/Footer";
import { useAuth } from "../../context/authContext";

const AdminDashboard = () => {
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
                <Actions />
            </div>
            <Footer />

        </div>
    );
};

export default AdminDashboard;
