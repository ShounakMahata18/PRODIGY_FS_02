import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

interface RoleRouteProps {
    children: React.ReactNode;
    role: string;
}

export default function RoleRoute({ children, role }: RoleRouteProps) {
    const { user, loading } = useContext<any>(AuthContext);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        alert(`You must be logged in as ${role} to access this page.`);
        return <Navigate to="/login" replace />;
    }

    if (user.role !== role) {
        alert("You do not have permission to access this page.");
        return <Navigate to="/" replace />;
    }

    // Authorized, render the children
    return <>{children}</>;
}
