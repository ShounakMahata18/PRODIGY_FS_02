import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
    const API_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL || "http://localhost:5000";

    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUser();
    }, []);

    
    const fetchUser = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const res = await fetch(`${API_URL}/api/auth/me`, {
                headers: { Authorization: `Bearer ${token}`}
            });
            
            if (!res.ok) throw new Error("Failed to fetch user");

            const data = await res.json();
            setUser(data);
        } catch (error) {
            console.error("Failed to fetch user:", error);
            localStorage.removeItem("token");
            setUser(null);
        }finally{
            setLoading(false);
        }
    };
    
    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);

        navigate("/");
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}