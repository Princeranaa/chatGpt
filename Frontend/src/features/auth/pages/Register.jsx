import React, { useState } from "react";
import { Link } from "react-router";

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: {
      firstName: "",
      lastName: "",
    },
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "firstName" || name === "lastName") {
      setFormData((prev) => ({
        ...prev,
        fullName: {
          ...prev.fullName,
          [name]: value,
        },
      }));
      if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }

    if (!formData.fullName.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

   
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    /*
      Formatted Payload Output matches exact requirement:
      {
        fullName: {
          firstName: "...",
          lastName: "..."
        },
        email: "...",
        password: "..."
      }
    */
    console.log("Register Payload Submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Red Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-rose-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Form Card Container */}
      <div className="w-full max-w-lg bg-zinc-900/70 border border-zinc-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-red-600 to-rose-500 mb-4 shadow-lg shadow-red-600/30">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Create an account
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Get started by entering your information below
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {/* Two Column Layout for Names */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* First Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.fullName.firstName}
                onChange={handleChange}
                placeholder="Jane"
                className={`w-full px-4 py-3 bg-zinc-950/80 border rounded-xl text-sm text-white placeholder-zinc-500 transition-all focus:outline-none ${
                  errors.firstName
                    ? "border-red-500 focus:ring-2 focus:ring-red-500/30"
                    : "border-zinc-800 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                }`}
              />
              {errors.firstName && (
                <p className="mt-1.5 text-xs text-red-400">
                  {errors.firstName}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.fullName.lastName}
                onChange={handleChange}
                placeholder="Doe"
                className={`w-full px-4 py-3 bg-zinc-950/80 border rounded-xl text-sm text-white placeholder-zinc-500 transition-all focus:outline-none ${
                  errors.lastName
                    ? "border-red-500 focus:ring-2 focus:ring-red-500/30"
                    : "border-zinc-800 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                }`}
              />
              {errors.lastName && (
                <p className="mt-1.5 text-xs text-red-400">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="jane.doe@example.com"
              className={`w-full px-4 py-3 bg-zinc-950/80 border rounded-xl text-sm text-white placeholder-zinc-500 transition-all focus:outline-none ${
                errors.email
                  ? "border-red-500 focus:ring-2 focus:ring-red-500/30"
                  : "border-zinc-800 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
              }`}
            />
            {errors.email && (
              <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Minimum 8 characters"
                className={`w-full px-4 py-3 bg-zinc-950/80 border rounded-xl text-sm text-white placeholder-zinc-500 transition-all focus:outline-none ${
                  errors.password
                    ? "border-red-500 focus:ring-2 focus:ring-red-500/30"
                    : "border-zinc-800 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200 text-xs font-medium"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1.5 text-xs text-red-400">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-red-600 via-rose-600 to-red-500 hover:from-red-500 hover:to-rose-500 active:scale-[0.99] transition-all duration-200 shadow-lg shadow-red-600/25 mt-2"
          >
            Create Account
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-zinc-400">
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="font-semibold text-red-400 hover:text-red-300 transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
