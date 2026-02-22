import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function User() {
    const { user } = useContext(AuthContext);

    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold">Welcome, User!</h1>
            <p className="mt-4">This page is accessible to all users, including users.</p>
            <span className="text-sm text-gray-500">User: {user?.name}</span>
        </div>
    );
}