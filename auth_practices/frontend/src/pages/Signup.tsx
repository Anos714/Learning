import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  signupSchema,
  type SignupInput,
} from "../features/auth/schemas/auth.schema";
import { assets } from "../assets/assets";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { signupRes } from "../features/auth/types/types";
import { signupUser } from "../features/auth/api/api";
import { useNavigate } from "react-router";

const Signup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
  });

  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupUser,
    onSuccess: (data: signupRes) => {
      console.log(data);
      toast.success(data.message);
    },
    onError: (error) => {
      console.error(error.message);
      toast.error(error.message || "Signup failed");
    },
  });

  const handleSignup = (data: SignupInput) => {
    signup(data);
    reset();
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
    window.location.href = "http://localhost:8080/auth/google";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center px-4">
      <div className="w-full max-w-5xl bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl flex overflow-hidden">
        {/* Left Section */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-indigo-500/70 to-blue-600/20 items-center justify-center p-8">
          <img
            src={assets.authImg}
            alt="auth"
            className="max-h-[420px] drop-shadow-xl"
          />
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 p-10">
          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
              Create account
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Get started with your account
            </p>
          </div>

          <form onSubmit={handleSubmit(handleSignup)} className="space-y-6">
            {/* Google Login */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 py-2.5 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 transition"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="google"
                className="h-5 w-5"
              />
              <span className="text-sm font-medium text-gray-700">
                Continue with Google
              </span>
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-xs text-gray-500">OR</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* Username */}
            <div>
              <label className="text-sm text-gray-600">Username</label>
              <input
                type="text"
                {...register("username")}
                className="mt-1 w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white/60 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                {...register("email")}
                className="mt-1 w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white/60 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-600">Password</label>
              <input
                type="password"
                {...register("password")}
                className="mt-1 w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white/60 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full py-2.5 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {isPending ? "Creating..." : "Create Account"}
            </button>
          </form>

          {/* Footer */}
          <p className="text-xs text-gray-500 mt-6 text-center">
            Already have an account?{" "}
            <span
              className="text-indigo-600 font-medium cursor-pointer hover:underline"
              onClick={() => navigate("/signin")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
