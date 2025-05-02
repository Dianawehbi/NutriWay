// Here we store the user information to access it from all components
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
const UserContext = createContext();

const AuthContext = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const verifyUser = async () => {
            try {
                const token = localStorage.getItem("token")
                if (!token) {
                    setUser(null)
                    setLoading(false)
                } else {
                    // check token , first send token to server 
                    const response = await axios.get('http://localhost:5000/api/auth/verify', {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    });
                    
                    if (response.data.success) {
                        setUser(response.data.user);
                    } else {
                        setUser(null)
                    }
                }

            } catch (error) {
                if (error.response && !error.response.data.error) {
                    setUser(null);
                } else {
                    console.log(error)
                }
            } finally {
                setLoading(false)
            }
        }
        verifyUser();
    }, [])

    const login = (user) => {
        setUser(user);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    return (
        <UserContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useAuth = () => useContext(UserContext);
export default AuthContext;
