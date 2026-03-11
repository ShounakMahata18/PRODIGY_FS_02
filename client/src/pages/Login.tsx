import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";
import Navbar from "../components/Navbar";

export default function Login() {
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const API_URL =
        import.meta.env.VITE_REACT_APP_BACKEND_URL || "http://localhost:5000";

    const login = async () => {
        if (!email || !password) {
            alert("Please enter both email and password");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters");
            return;
        }

        try {
            const res = await fetch(`${API_URL}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Login failed");
                return;
            }

            localStorage.setItem("token", data.token);

            const me = await fetch(`${API_URL}/api/auth/me`, {
                headers: { Authorization: `Bearer ${data.token}` },
            });

            if (!me.ok) {
                console.error("Failed to fetch user");
                alert("Failed to fetch user");
                return;
            }

            const userData = await me.json();
            setUser(userData);

            navigate("/");
        } catch (error) {
            console.error("Login error:", error);
            alert("Network error. Please try again");
        }
    };

    return (
        <div className="w-full min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-1 flex flex-col items-center justify-center">
                <div className="flex flex-col w-sm p-6 rounded-lg border">
                    <h2 className="text-2xl text-center">Login</h2>
                    <input
                        className="border w-full mt-4 px-3 py-1 rounded-full"
                        placeholder="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <div className="relative mt-2">
                        <input
                            className="border w-full px-3 py-1 rounded-full"
                            placeholder="Password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            className="absolute inset-y-0 right-2 flex items-center text-gray-600 hover:text-gray-950"
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                        >
                            {showPassword ? (
                                <Eye size={18} />
                            ) : (
                                <EyeOff size={18} />
                            )}
                        </button>
                    </div>
                    <button
                        className="text-white bg-black h-9 mt-4 rounded-full cursor-pointer"
                        onClick={login}
                    >
                        Login
                    </button>
                    <div className="flex justify-between mt-4">
                        <span>Don't have account?</span>
                        <span
                            className="underline text-blue-700"
                            onClick={() => navigate("/register")}
                        >
                            Register
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
