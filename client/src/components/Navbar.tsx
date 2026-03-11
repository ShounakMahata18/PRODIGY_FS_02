import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
    const navigate = useNavigate();

    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="w-full bg-gray-900 text-white shadow-md">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <div
                    className="text-2xl font-bold cursor-pointer"
                    onClick={() => navigate("/")}
                >
                    EMS
                </div>
                {user ? (
                    <div className="flex gap-4">
                        <button
                            className="px-4 py-2 rounded-lg border bg-red-600 hover:bg-red-700 transition duration-200"
                            onClick={logout}
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="flex gap-4">
                        <button
                            className="px-4 py-2 rounded-lg border border-white hover:bg-white hover:text-gray-900 transition duration-200"
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </button>
                        <button
                            className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition duration-200"
                            onClick={() => navigate("/register")}
                        >
                            Register
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
