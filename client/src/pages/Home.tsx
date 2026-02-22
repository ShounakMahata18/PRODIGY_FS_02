import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold">Welcome to the Authentication System</h1>
            <div className="mt-10">
                <button className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => navigate("/login")}>Login</button>
                <button className="ml-4 bg-green-500 text-white px-4 py-2 rounded-md" onClick={() => navigate("/register")}>Register</button>
                {user && (<button className="ml-4 bg-red-500 text-white px-4 py-2 rounded-md" onClick={logout}>Logout</button>)}
            </div>
            <div className="mt-4 text-gray-600">Click on Login or Register to get started</div>
            <hr className="w-1/2 my-4" />
            <div className="mt-8">
                <button className="bg-purple-500 text-white px-4 py-2 rounded-md" onClick={() => navigate("/dashboard")}>Dashboard</button>
                <button className="ml-4 bg-red-500 text-white px-4 py-2 rounded-md" onClick={() => navigate("/admin")}>Admin</button>
                <button className="ml-4 bg-gray-500 text-white px-4 py-2 rounded-md" onClick={() => navigate("/user")}>User</button>
            </div>
            <p className="text-sm text-gray-500 mt-4">Note: Dashboard is for all authenticated users, Admin is for users with admin role, and Guest is for users with guest role.</p>
            <hr className="w-1/2 my-4" />
            <div className="flex mt-4">
                <div className="bg-gray-200 p-4 rounded-md">
                    <p className="font-bold underline">Admin</p>
                    <p>Email: admin@gmail.com</p>
                    <p>Password: Admin123</p>
                </div>
                <div className="bg-gray-200 p-4 rounded-md ml-4">
                    <p className="font-bold underline">User</p>
                    <p>Email: user@gmail.com</p>
                    <p>Password: User123</p>
                </div>
            </div>
        </div>
    );
}