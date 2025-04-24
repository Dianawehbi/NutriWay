import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import LoadingPage from "../pages/auth/LoadingPage";

// we will implement here the functionality of
// if the user is already logged in or not
const PrivateRoutes = ({ children }) => {
    const { user, loading } = useAuth()
    const navigate = useNavigate()
    if (loading) {
        return <LoadingPage />
    }

    return user ? children : navigate('/login')
}

export default PrivateRoutes