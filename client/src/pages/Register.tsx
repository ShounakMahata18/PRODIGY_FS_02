import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        const API_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL || "http://localhost:5000";

        if (!name || !email || !password || !confirmPassword) {
            alert("All fields are required!");
            return;
        }

        if (password !== confirmPassword) {
            alert("Password do not match!");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters!");
            return;
        }

        try {
            setLoading(true);

            const res = await fetch(`${API_URL}/api/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Registration failed");
            }

            alert("Registration successful!");
            navigate("/login");

        } catch (error: any) {
            console.error("Registration error:", error);
            alert("Registration failed: " + error.message);

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center">
            <form
                onSubmit={handleRegister}
                className="flex flex-col w-sm p-6 rounded-lg border"
            >
                <h2 className="text-2xl text-center">Register</h2>
                <input
                    className="border w-full mt-4 px-3 py-1 rounded-full"
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    className="border w-full mt-2 px-3 py-1 rounded-full"
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
                <div className="relative mt-2">
                    <input
                        className="border w-full px-3 py-1 rounded-full"
                        placeholder="Confirm Password"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button
                        className="absolute inset-y-0 right-2 flex items-center text-gray-600 hover:text-gray-950"
                        type="button"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                    >
                        {showConfirmPassword ? (
                            <Eye size={18} />
                        ) : (
                            <EyeOff size={18} />
                        )}
                    </button>
                </div>
                <button className="text-white bg-black h-9 mt-4 rounded-full cursor-pointer">
                    {loading ? "Registering..." : "Register"}
                </button>
                <div className="flex justify-between mt-4">
                    <span>Already have an account?</span>
                    <span
                        className="underline text-blue-700"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </span>
                </div>
            </form>
        </div>
    );
}
