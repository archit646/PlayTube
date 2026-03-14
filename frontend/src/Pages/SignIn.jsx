import { useState } from "react";
import axios from "axios";


export default function Login({navigate}) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const validate = () => {
        const newErrors = {};

        if (!email.trim()) {
            newErrors.email = "Email required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Invalid email";
        }

        if (!password) {
            newErrors.password = "Password required";
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();

        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length !== 0) return;

        const formData = {
            email,
            password
        };
        try {
            const result = await axios.post("http://localhost:8000/api/auth/signin", formData).then((res) => {
                console.log(res.data)
                setLoading(false);
            })
            // console.log(result);
            navigate('/')

        }
        catch (error) {
            console.log(error);
        }

        console.log(formData);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-xl shadow-lg w-96 space-y-4"
            >

                <h2 className="text-2xl font-bold text-center">Login</h2>

                {/* Email */}
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border p-2 rounded-md"
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
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border p-2 rounded-md"
                    />
                    {errors.password && (
                        <p className="text-red-500 text-xs">{errors.password}</p>
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

                {/* Button */}
                <button
                    type="submit" disabled={loading}
                    className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600'
                >
                    {loading?'Logging':'Login'}
                </button>

            </form>
        </div>
    );
}
