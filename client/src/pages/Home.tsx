import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";

export default function Home() {
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);

    return (
        <div className="h-screen flex flex-col">
            <Navbar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold text-center">
                    <p>Welcome To</p>
                    <p>Employee Management System</p>
                </h1>

                <div className="mt-10 flex flex-wrap justify-center gap-4">
                    {user ? (
                        <>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded-md"
                                onClick={logout}
                            >
                                Logout
                            </button>
                            <button
                                className="bg-purple-500 text-white px-4 py-2 rounded-md"
                                onClick={() => navigate("/dashboard")}
                            >
                                Dashboard
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                onClick={() => navigate("/login")}
                            >
                                Login
                            </button>
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded-md"
                                onClick={() => navigate("/register")}
                            >
                                Register
                            </button>
                        </>
                    )}
                </div>

                <hr className="w-1/2 my-4" />

                <p className="text-sm text-gray-600 mt-4 text-center max-w-xl">
                    <span className="font-semibold">Note:</span> Only
                    authenticated users can access the dashboard and perform
                    operations on the employee database.
                </p>
            </div>
        </div>
    );
}
