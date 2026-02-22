import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Admin() {
    const { user } = useContext(AuthContext);

    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold">Admin Page</h1>
            <p className="mt-4">Only users with the admin role can access this page.</p>
            <span className="text-sm text-gray-500">User: {user?.name}</span>
        </div>
    );
}