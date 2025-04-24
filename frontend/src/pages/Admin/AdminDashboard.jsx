import React, { useState, useEffect } from "react";
import AdminNavBar from "../../components/Admin/AdminNavBar";
import AdminHeader from "../../components/Admin/AdminHeader";
import MealManager from "../../components/MealsManager";
import Statistic from "../../components/Admin/Statistics";
import AdminApptHome from "../../components/Admin/AdminAptHome";
import Actions from "../../components/Admin/Actions";
import Footer from "../../components/Footer";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const { user } = useAuth()
    //instead of this we will ceate private route and protected route

    return (
        <div className="min-h-screen bg-gray-50">
            <AdminNavBar />
            <AdminHeader />
            <div className="p-6 space-y-6">
                <Statistic />
                <AdminApptHome />
                <MealManager />
                {/* Quick Actions */}
                <Actions />
            </div>
            <Footer />

        </div>
    );
};

export default AdminDashboard;