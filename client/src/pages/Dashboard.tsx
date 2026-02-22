import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
    const { user, logout } = useContext(AuthContext);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="p-10 bg-white rounded-lg shadow-lg flex flex-col items-center">
                <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
                <h2 className="text-lg mt-3">You are logged in as {user?.role}.</h2>
                <button
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                    onClick={logout}
                    >
                    Logout
                </button>
            </div>
        </div>
    );
}
