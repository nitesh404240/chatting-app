import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn, loginEmailError, loginPasswordError } =
    useAuthStore();

  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");

    return true;
  };
  const handelSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();
    if (success === true) login(formData);
  };
  return (
    <div className="min-h-screen  w-full flex flex-col justify-center pl-20 pr-20">
      <div className="flex flex-col  w-auto justify-center items-center   sm:p-12">
        <div className="w-full max-w-md border p-5 space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col  items-center gap-2 group">
              <div className="size-12  rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcom back</h1>
              <p className="text-base-content/60">Login into your account</p>
            </div>
          </div>

          <form onSubmit={handelSubmit} className="space-y-6">
            <div className="control-form flex flex-col gap-1">
              <label className="label mb-1">
                <label className="label-text font-medium">Email</label>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  className={`input input-bordered w-full pl-10  bg-transparent`}
                  type="text"
                  placeholder="John@gmail.com"
                  value={formData.email}
                  onChange={(e) =>
                    setformData({ ...formData, email: e.target.value })
                  }
                />

                {loginEmailError && (
                  <p className="text-red-500 text-sm mt-1">{loginEmailError}</p>
                )}
              </div>
            </div>

            <div className="control-form flex flex-col gap-1">
              <label className="label mb-1">
                <label className="label-text font-medium">Password</label>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  className={`input input-bordered w-full pl-10  bg-transparent`}
                  type={!showPassword ? "password" : "text"}
                  placeholder=" * * * * * * *"
                  value={formData.password}
                  onChange={(e) =>
                    setformData({ ...formData, password: e.target.value })
                  }
                />

                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? (
                    <Eye className="size-5 text-base-content/40" />
                  ) : (
                    <EyeOff className="size-5 text-base-content/40" />
                  )}
                </button>
                {loginPasswordError && (
                  <p className="text-red-500 text-sm mt-1">
                    {loginPasswordError}
                  </p>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-active btn-primary w-full"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  {" "}
                  <Loader2 className="size-5 animate-spin" />
                </>
              ) : (
                "login"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Create an new account?{" "}
              <Link to="/signup" className="link link-primary">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
