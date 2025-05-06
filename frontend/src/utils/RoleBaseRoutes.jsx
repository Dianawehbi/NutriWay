import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";
import LoadingPage from "../pages/auth/LoadingPage";
import axios from "axios";

const RoleBaseRoutes = ({ children, requiredRole }) => {
    const { user, loading } = useAuth();
    const [checkingStatus, setCheckingStatus] = useState(true);
    const [isApproved, setIsApproved] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchDietitianInfo = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/dietitian/${user._id}`);
                if (data.success && data.data.status === "approved") {
                    setIsApproved(true);
                } else {
                    setIsApproved(false);
                }
            } catch (err) {
                console.error("Failed to fetch dietitian info:", err);
                setError(true);
            } finally {
                setCheckingStatus(false);
            }
        };

        if (user?.role === "dietitian") {
            fetchDietitianInfo();
        } else {
            setCheckingStatus(false); // Not a dietitian, no need to check
        }
    }, [user]);

    if (loading || checkingStatus) {
        return <LoadingPage />;
    }

    if (!requiredRole.includes(user.role)) {
        return <Navigate to="/login" />;
    }

    if (user.role === "dietitian" && !isApproved) {
        return <Navigate to="/PendingApproval" />;
    }

    if (error) {
        return <Navigate to="/ErrorPage" />;  // You can create a dedicated error page
    }

    return user ? children : <Navigate to="/login" />;
};

export default RoleBaseRoutes;
