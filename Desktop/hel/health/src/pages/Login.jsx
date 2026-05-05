import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Stethoscope, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import doctorImg from "../assets/doctor.png";
export default function Login() {
  const navigate = useNavigate();

  const [userType, setUserType] = useState("doctor");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
  setIsLoading(false);

  if (userType === "doctor") {
    navigate("/doctor-dashboard");
  } else {
    navigate("/patient-dashboard");
  }

}, 800);
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row bg-gray-50">

      {/* LEFT SIDE */}
      <div className="w-1/2 flex flex-col items-center justify-center bg-blue-50 p-10">

  <img
    src={doctorImg}
    alt="doctor"
    className="w-[70%] max-w-md mb-6"
  />

  <h1 className="text-3xl font-bold text-center">
    Better Care, Stronger Relationships
  </h1>

  <p className="text-gray-500 text-center mt-2">
    Connecting doctors and patients seamlessly
  </p>

</div>

      {/* RIGHT SIDE */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6">

        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">

          {/* Title */}
          <h2 className="text-2xl font-bold text-center mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-500 text-center mb-6">
            Sign in to continue
          </p>

          {/* Role Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
            <button
              onClick={() => setUserType("doctor")}
              className={`flex-1 py-2 rounded-lg ${
                userType === "doctor"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600"
              }`}
            >
              Doctor
            </button>

            <button
              onClick={() => setUserType("patient")}
              className={`flex-1 py-2 rounded-lg ${
                userType === "patient"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600"
              }`}
            >
              Patient
            </button>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Email */}
            <div className="flex items-center border rounded-lg px-3">
              <Mail className="w-4 h-4 text-gray-400" />
              <input
                type="email"
                placeholder="Email address"
                className="w-full p-2 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="flex items-center border rounded-lg px-3">
              <Lock className="w-4 h-4 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full p-2 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 text-gray-400" />
                ) : (
                  <Eye className="w-4 h-4 text-gray-400" />
                )}
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                Remember me
              </label>

              <span className="text-blue-600 cursor-pointer">
                Forgot password?
              </span>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>

          </form>

          {/* Divider */}
          <div className="text-center text-gray-400 my-4">
            or continue with
          </div>

          {/* Social */}
          <div className="flex gap-3">
            <button className="flex-1 border py-2 rounded-lg">
              Google
            </button>
            <button className="flex-1 border py-2 rounded-lg">
              Microsoft
            </button>
          </div>

          {/* Signup */}
          <p className="text-center text-sm mt-6">
            Don’t have an account?{" "}
            <span className="text-blue-600 cursor-pointer">
              Sign up
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}