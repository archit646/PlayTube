import { useState } from "react";
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUserData } from "../redux/userSlice";

export default function SignUp({ navigate }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [logo, setLogo] = useState(null);
    const [preview, setPreview] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLogo(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!username.trim()) newErrors.username = "Username required";

        if (!email.trim()) {
            newErrors.email = "Email required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Invalid email";
        }

        if (!password) {
            newErrors.password = "Password required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be 6 characters";
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        if (!logo) {
            newErrors.logo = "Logo required";
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();

        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length !== 0) return;

        const formData = new FormData();

        formData.append("userName", username);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("photoUrl", logo);
        try {
            const result = await axios.post("http://localhost:8000/api/auth/signup", formData, { withCredentials: true })
       const userRes = await axios.get(
            "http://localhost:8000/api/users/me",
            { withCredentials: true }
        );

        // ✅ redux update
        dispatch(setUserData(userRes.data));

        // ✅ navigate
        navigate("/signin");
        }
        catch (error) {
            console.log(error)
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-xl shadow-lg w-96 space-y-4"
            >
                <h2 className="text-2xl font-bold text-center">Sign Up</h2>

                {/* Logo */}
                <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                        {preview ? (
                            <img src={preview} alt="logo" className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-gray-500 text-sm">Logo</span>
                        )}
                    </div>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoChange}
                        className="mt-2 text-sm border border-gray-700" required
                    />
                    {errors.logo && (
                        <p className="text-red-500 text-xs">{errors.logo}</p>
                    )}
                </div>

                {/* Username */}
                <div>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full border p-2 rounded-md" required
                    />
                    {errors.username && (
                        <p className="text-red-500 text-xs">{errors.username}</p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border p-2 rounded-md" required
                    />
                    {errors.email && (
                        <p className="text-red-500 text-xs">{errors.email}</p>
                    )}
                </div>

                {/* Password */}
                <div>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border p-2 rounded-md"
                    />
                    {errors.password && (
                        <p className="text-red-500 text-xs">{errors.password}</p>
                    )}
                </div>

                {/* Confirm Password */}
                <div>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        required
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full border p-2 rounded-md"
                    />
                    {errors.confirmPassword && (
                        <p className="text-red-500 text-xs">
                            {errors.confirmPassword}
                        </p>
                    )}
                </div>

                {/* Show password */}
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        onChange={() => setShowPassword(!showPassword)}
                    />
                    <label className="text-sm">Show Password</label>
                </div>

                <button
                    type="submit" disabled={loading}
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                >
                    {loading ? "Signing Up" : "Sign Up"}
                </button>
            </form>
        </div>
    );
}