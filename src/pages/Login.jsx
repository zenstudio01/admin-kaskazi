import { useState } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config/env";
import Swal from "sweetalert2";
import Colors from "../constants/colors";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/signin/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);

      if (response.status === 200 || response.status === 201) {
        if (data.user?.role === "admin") {
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("refresh_token", data.refresh_token);
          localStorage.setItem("admin", JSON.stringify(data.user));
          navigate("/dashboard");
        } else {
          Swal.fire({
            icon: "error",
            title: "Unauthorized",
            text: "Only admins are allowed here!.",
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Login failed",
          text: data.message || "Login failed",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Server error",
        text: "Unable to connect to server!.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: Colors.background }}
    >
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div
          className="rounded-3xl shadow-2xl overflow-hidden"
          style={{ backgroundColor: Colors.primary }}
        >
          {/* Card Header */}
          <div
            className="px-8 py-8 text-center"
            style={{ backgroundColor: Colors.placeholder }}
          >
            <img
              src="/logo.png"
              alt="Kaskazi"
              className="w-24 h-24 mx-auto object-contain rounded-full shadow-md border-2 border-white/20"
            />

            <h1 className="text-white text-3xl font-bold mt-4 tracking-wide">
              Kaskazi
            </h1>

            <p className="text-emerald-100 text-sm mt-1 opacity-90">
              Admin Dashboard Login
            </p>
          </div>

          {/* Form Body */}
          <div className="p-8">
            <h2
              className="text-2xl font-bold mb-6 text-center"
              style={{ color: Colors.typography }}
            >
              Welcome Back
            </h2>

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email Input */}
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: Colors.typography }}
                >
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-4"
                    style={{ color: Colors.placeholder }}
                  />

                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="admin@kaskazi.com"
                    className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none transition-all"
                    style={{
                      color: Colors.typography,
                      backgroundColor: "#ffffff",
                    }}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: Colors.typography }}
                >
                  Password
                </label>

                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-4 top-4"
                    style={{ color: Colors.placeholder }}
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    className="w-full pl-12 pr-12 py-3 border border-slate-300 rounded-xl focus:outline-none transition-all"
                    style={{
                      color: Colors.typography,
                      backgroundColor: "#ffffff",
                    }}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3.5 transition-opacity hover:opacity-70"
                    style={{ color: Colors.placeholder }}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <label
                  className="flex items-center gap-2 cursor-pointer"
                  style={{ color: Colors.typography }}
                >
                  <input
                    type="checkbox"
                    className="rounded"
                    style={{ accentColor: Colors.placeholder }}
                  />
                  <span>Remember me</span>
                </label>

                <button
                  type="button"
                  className="font-medium hover:underline"
                  style={{ color: Colors.placeholder }}
                >
                  Forgot Password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full text-white py-3 rounded-xl font-semibold shadow-md transition-all hover:brightness-110 active:scale-[0.99]"
                style={{ backgroundColor: Colors.typography }}
              >
                {loading ? (
                  <div className="flex justify-center">
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Footer Text */}
        <p className="text-center mt-5 text-white/80 text-sm drop-shadow-sm">
          © 2026 Kaskazi Admin Panel
        </p>
      </div>
    </div>
  );
}