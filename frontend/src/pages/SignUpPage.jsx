import { useState } from "react";
import { ShipWheelIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "../lib/api";
 import useSignUp from "../hooks/useSignUp" ;
const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({}); // store local validation errors
  const queryClient = useQueryClient();

 /* const {
    mutate: signupMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: signup,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });*/
const{isPending,error,signupMutation}=useSignUp();
  const validateForm = () => {
    let formErrors = {};

    // full name check
    if (!signupData.fullName.trim()) {
      formErrors.fullName = "Full name is required";
    }

    // email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!signupData.email) {
      formErrors.email = "Email is required";
    } else if (!emailRegex.test(signupData.email)) {
      formErrors.email = "Invalid email format";
    }

    // password length check
    if (!signupData.password) {
      formErrors.password = "Password is required";
    } else if (signupData.password.length < 6) {
      formErrors.password = "Password must be at least 6 characters";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0; // valid if no errors
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (!validateForm()) return; // stop if validation fails

    signupMutation(signupData);
  };

  return (
    <div
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
      data-theme="forest"
    >
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          {/* Logo */}
          <div className="mb-4 flex items-center justify-start gap-2">
            <ShipWheelIcon className="size-9 text-primary" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              Chatify
            </span>
          </div>

          {/* server error message if any */}
          {error && (
            <div className="alert alert-error mb-4">
              <span>
                {error.response?.data?.message ||
                  error.message ||
                  "Something went wrong"}
              </span>
            </div>
          )}

          <div className="w-full">
            <form onSubmit={handleSignup}>
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">Create an Account</h2>
                  <p>Join Chatify and start to enjoy your days</p>
                </div>

                <div className="space-y-3">
                  {/* Full name */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Full Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Your name..."
                      className="input input-bordered w-full"
                      value={signupData.fullName}
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          fullName: e.target.value,
                        })
                      }
                      required
                    />
                    {errors.fullName && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="you@email.com"
                      className="input input-bordered w-full"
                      value={signupData.email}
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          email: e.target.value,
                        })
                      }
                      required
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Password */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="**********"
                    className="input input-bordered w-full"
                    value={signupData.password}
                    onChange={(e) =>
                      setSignupData({
                        ...signupData,
                        password: e.target.value,
                      })
                    }
                    required
                  />
                  {errors.password && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* terms and conditions */}
                <div className="form-control">
                  <label className="label cursor-pointer justify-start gap-2">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm"
                      required
                    />
                    <span className="text-xs leading-tight">
                      agree to the{" "}
                      <span className="text-primary hover:underline">
                        terms of service
                      </span>{" "}
                      and{" "}
                      <span className="text-primary hover:underline">
                        privacy policy
                      </span>
                    </span>
                  </label>
                </div>
              </div>

              {/* button */}
              <button
                className="btn btn-primary hover:underline mt-4"
                type="submit"
              >
                {isPending ? (
                  <>
                    <span className="loading loading-spinner loading-xs">
                      Loading...
                    </span>
                  </>
                ) : (
                  "Create Account"
                )}
              </button>

              <div className="text-centre mt-4"></div>
              <p className="text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>

        {/* right side illustration */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            <div className="relative aspect-square max-w-sm mx-auto">
              <img
                src="Halloween video call-bro.png"
                alt="Language connection illustration"
                className="w-full h-full"
              />
            </div>
            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">
                Connection with Language partners worldwide
              </h2>
              <p className="opacity-70">
                Practice conversation, make friends, improve your language
                skills together
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
