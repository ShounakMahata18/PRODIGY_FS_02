import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function ProtectedRoute({ children }: any) {
    const  { user, loading } = useContext<any>(AuthContext);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        alert("Please login to access this page");
        return <Navigate to="/login" replace />;
    }

    return children;
}