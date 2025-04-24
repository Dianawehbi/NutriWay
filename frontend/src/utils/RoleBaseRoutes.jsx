import React from "react";
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";
import LoadingPage from "../pages/auth/LoadingPage";

const RoleBaseRoutes = ({ children, requiredRole }) => {
    const { user, loading } = useAuth()
    if (loading) {
        return <LoadingPage />
    }
    alert(user.username)
    if (!requiredRole.includes(user.role)) {
        // <Navigate to='/unauthorized' />
        return <Navigate to='/login' />
    } else {
        return user ? children : <Navigate to='/login' />
    }
}

export default RoleBaseRoutes