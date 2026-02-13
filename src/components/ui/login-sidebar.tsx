"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import {
  X,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Loader2,
  ArrowRight,
  ArrowLeft,
  KeyRound,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import {
  Sheet,
  SheetTitle,
  SheetTrigger,
  SheetPortal,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Loader from "./loader";

// Create axios instance
const axiosInstance = axios.create({
  baseURL: "https://sell-sync.kyptronix.us",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

interface LoginSidebarProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  className?: string;
  triggerText?: string;
}

// Extended ViewState to include OTP steps
type ViewState = "login" | "signup" | "signup-otp" | "forgot" | "forgot-otp";

export const LoginSidebar: React.FC<LoginSidebarProps> = ({ variant = "ghost", className, triggerText }) => {
  // Navigation & UI State
  const [view, setView] = useState<ViewState>("login");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginType, setLoginType] = useState<"pos" | "builder">("pos");
  const navigate = useNavigate();

  // Form Data States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState(""); // For forgot password flow

  // Login details object for API
  const [loginDetails, setLoginDetails] = useState({
    identifier: "",
    password: "",
  });

  // Visibility Toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Validation Errors
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [otpError, setOtpError] = useState("");

  // Countdown Timer for Resend OTP
  const [timer, setTimer] = useState(30);

  // Timer Logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if ((view === "signup-otp" || view === "forgot-otp") && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [view, timer]);

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setName("");
    setOtp("");
    setNewPassword("");
    setEmailError("");
    setPasswordError("");
    setOtpError("");
    setIsLoading(false);
    setTimer(30);
  };

  const handleViewChange = (newView: ViewState) => {
    // Only reset form data if we are completely switching contexts (e.g. login -> signup)
    // Don't reset if moving from signup -> signup-otp
    if (
      (view === "signup" && newView === "signup-otp") ||
      (view === "forgot" && newView === "forgot-otp")
    ) {
      setOtp(""); // Just clear OTP input
      setTimer(30);
    } else {
      resetForm();
    }
    setView(newView);
  };

  const validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const validatePassword = (value: string) => value.length >= 8;

  // Handle input changes
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if (name === "email") {
      setEmail(value);
      setLoginDetails((prev) => ({ ...prev, identifier: value }));
    } else if (name === "password") {
      setPassword(value);
      setLoginDetails((prev) => ({ ...prev, password: value }));
    }
  };

  // Login handler
  const loginHandler = async () => {
    setIsLoading(true);

    const loginPayload = {
      email: loginDetails.identifier,
      password: loginDetails.password,
    };

    try {
      // Call login API
      const reqLogin = await axiosInstance.post(
        "/api/v1/auth/login",
        loginPayload,
        {
          headers: {
            "x-api-key": "b1d1I0p7A2Er2n0eD2b0As8c0kT8p2M9",
          },
        }
      );

      if (reqLogin.status === 200 && reqLogin.data) {
        toast.success("Login Success");

        // Store all cookies
        const userType = reqLogin.data.user_type;
        console.log("Login Response:", reqLogin.data);
        console.log("User Type:", userType);

        Cookies.set("authToken", reqLogin.data.token, {
          expires: 1,
          path: "/",
        });
        Cookies.set("u_id", reqLogin.data.user_id, {
          expires: 1,
          path: "/",
        });
        Cookies.set("u_type", userType, {
          expires: 1,
          path: "/",
        });

        // Verify cookie was set
        const savedUserType = Cookies.get("u_type");
        console.log("Saved u_type cookie:", savedUserType);

        // Route to appropriate dashboard based on loginType
        setIsLoading(false);
        setIsOpen(false);

        // Add a small delay to ensure cookies are set before navigation
        setTimeout(() => {
          if (loginType === "builder") {
            console.log("Routing to /builder");
            navigate("/builder");
          } else {
            console.log("Routing to POS system");
            window.location.href = "https://sellsync.netlify.app/";
          }
        }, 100);
      }
    } catch (error: any) {
      // Detailed error logging
      console.error("Login Error - Full Details:", {
        status: error?.response?.status,
        statusText: error?.response?.statusText,
        data: error?.response?.data,
        headers: error?.response?.headers,
        requestPayload: loginPayload,
      });

      // Extract error message
      const errorMessage =
        error?.response?.data?.error?.password ||
        error?.response?.data?.error?.email ||
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        `Login failed! Status: ${error?.response?.status}`;

      toast.error(errorMessage);
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;

    // Clear previous errors
    setEmailError("");
    setPasswordError("");
    setOtpError("");

    // --- Validation Logic based on View ---

    // 1. Initial Login/Signup/Forgot validation
    if (["login", "signup", "forgot"].includes(view)) {
      if (!validateEmail(email)) {
        setEmailError("Please enter a valid email address.");
        valid = false;
      }
    }

    // 2. Password validation for Login/Signup
    if (["login", "signup"].includes(view)) {
      if (!validatePassword(password)) {
        setPasswordError("Password must be at least 8 characters.");
        valid = false;
      }
    }

    // 3. Name validation for Signup
    if (view === "signup" && name.trim().length < 2) {
      valid = false; // Add specific name error if needed
    }

    // 4. OTP Validation
    if (["signup-otp", "forgot-otp"].includes(view)) {
      if (otp.length !== 6) {
        setOtpError("Please enter a valid 6-digit code.");
        valid = false;
      }
    }

    // 5. New Password Validation (Forgot Flow)
    if (view === "forgot-otp") {
      if (!validatePassword(newPassword)) {
        setPasswordError("New password must be at least 8 characters.");
        valid = false;
      }
    }

    if (valid) {
      // For login view, call the actual login handler
      if (view === "login") {
        await loginHandler();
      } else {
        setIsLoading(true);

        // Simulate API Network Request for other views
        setTimeout(() => {
          setIsLoading(false);

          if (view === "signup") {
            // API: Send OTP to email
            handleViewChange("signup-otp");
          } else if (view === "forgot") {
            // API: Send OTP to email
            handleViewChange("forgot-otp");
          } else if (view === "signup-otp") {
            // API: Verify OTP & Create Account
            console.log("Account Created!", { name, email, password });
            setIsOpen(false);
            resetForm(); // Reset everything
            setView("login");
          } else if (view === "forgot-otp") {
            // API: Verify OTP & Reset Password
            console.log("Password Reset!", { email, newPassword });
            handleViewChange("login");
            alert("Password changed successfully! Please login.");
          }
        }, 1500);
      }
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant={variant} className={className} onClick={() => handleViewChange("login")}>
          {triggerText || "Log In"}
        </Button>
      </SheetTrigger>
      <SheetPortal>
        <SheetPrimitive.Content className="fixed inset-y-0 right-0 z-50 h-full w-full border-l bg-background p-0 shadow-2xl transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-md flex flex-col">

          {/* Header Section */}
          <div className="relative p-6 pt-12 pb-2 flex flex-col items-center">
            <SheetPrimitive.Close className="absolute right-6 top-6 rounded-full p-2 opacity-70 ring-offset-background transition-all hover:bg-secondary hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </SheetPrimitive.Close>

            {/* Logo */}
            <div className="mb-4">
              <img src="https://sellsync.netlify.app/assets/FullLogo2-BHrAzKAZ.png" alt="SellSync Logo" className="h-24 w-auto" />
            </div>

            <SheetTitle className="text-2xl font-semibold tracking-tight text-center text-foreground">
              {view === "login" && "Welcome back"}
              {view === "signup" && "Create an account"}
              {view === "forgot" && "Reset Password"}
              {(view === "signup-otp" || view === "forgot-otp") && "Verify Email"}
            </SheetTitle>

            <p className="mt-2 text-center text-sm text-muted-foreground max-w-xs">
              {view === "login" && "Enter your credentials to access your personalized dashboard."}
              {view === "signup" && "Enter your details to get started with SellSync today."}
              {view === "forgot" && "Enter your email address and we'll send you a code."}
              {(view === "signup-otp" || view === "forgot-otp") && (
                <span>
                  We've sent a 6-digit code to <span className="font-medium text-foreground">{email}</span>
                </span>
              )}
            </p>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            <div className="flex flex-col gap-6">

              {/* Toggle POS / Website Builder */}
              {(view === "login" || view === "signup") && (
                <div className="flex bg-muted p-1 rounded-lg mb-2">
                  <button
                    type="button"
                    onClick={() => setLoginType("pos")}
                    className={`flex-1 text-sm font-medium py-2 rounded-md transition-all ${loginType === "pos" ? "bg-white shadow text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    POS System
                  </button>
                  <button
                    type="button"
                    onClick={() => setLoginType("builder")}
                    className={`flex-1 text-sm font-medium py-2 rounded-md transition-all ${loginType === "builder" ? "bg-white shadow text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    Website Builder
                  </button>
                </div>
              )}



              {loginType === "pos" ? (
                <div className="flex flex-col gap-6 py-8 items-center text-center animate-in fade-in duration-300">
                  <div className="bg-orange-50 p-4 rounded-full">
                    <img src="https://sellsync.netlify.app/assets/FullLogo2-BHrAzKAZ.png" alt="POS" className="h-12 w-auto opacity-80" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">Access POS System</h3>
                    <p className="text-sm text-muted-foreground">
                      Navigate directly to your Point of Sale dashboard. No additional login required here.
                    </p>
                  </div>
                  <Button
                    onClick={() => window.open("https://sellsync.netlify.app/", "_blank")}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 rounded-md transition-all shadow-sm"
                  >
                    Go to POS Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                  {/* --- INPUT FIELDS --- */}

                  {/* Name (Signup Only) */}
                  {view === "signup" && (
                    <div className="space-y-2 animate-in slide-in-from-right-4 fade-in duration-300">
                      <label className="text-sm font-medium leading-none">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <input type="text" placeholder="John Doe" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500" value={name} onChange={(e) => setName(e.target.value)} required />
                      </div>
                    </div>
                  )}

                  {/* Email (Visible in Login, Signup, Forgot - Hidden in OTP unless you want to show it read-only) */}
                  {(view === "login" || view === "signup" || view === "forgot") && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <input type="email" name="email" placeholder="name@example.com" className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 pl-10 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 transition-all ${emailError ? "border-red-500 focus-visible:ring-red-500" : "border-input focus-visible:ring-orange-500"}`} value={email} onChange={handleOnChange} />
                      </div>
                      {emailError && <p className="text-[0.8rem] font-medium text-red-500">{emailError}</p>}
                    </div>
                  )}

                  {/* Password (Login & Signup Only) */}
                  {(view === "login" || view === "signup") && (
                    <div className="space-y-2 animate-in slide-in-from-bottom-2 fade-in duration-300">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium leading-none">Password</label>
                        {view === "login" && (
                          <button type="button" onClick={() => handleViewChange("forgot")} className="text-xs font-medium text-orange-600 hover:text-orange-500 hover:underline">
                            Forgot password?
                          </button>
                        )}
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <input type={showPassword ? "text" : "password"} name="password" placeholder="••••••••" className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 pl-10 pr-10 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 transition-all ${passwordError ? "border-red-500 focus-visible:ring-red-500" : "border-input focus-visible:ring-orange-500"}`} value={password} onChange={handleOnChange} />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground focus:outline-none">
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {passwordError && <p className="text-[0.8rem] font-medium text-red-500">{passwordError}</p>}
                    </div>
                  )}

                  {/* --- OTP & RESET FIELDS --- */}

                  {(view === "signup-otp" || view === "forgot-otp") && (
                    <div className="space-y-4 animate-in zoom-in-95 fade-in duration-300">
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none">One-Time Password</label>
                        <div className="relative">
                          <ShieldCheck className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <input
                            type="text"
                            placeholder="123456"
                            maxLength={6}
                            className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 pl-10 text-sm tracking-[0.5em] font-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 transition-all ${otpError ? "border-red-500 focus-visible:ring-red-500" : "border-input focus-visible:ring-orange-500"}`}
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                          />
                        </div>
                        {otpError && <p className="text-[0.8rem] font-medium text-red-500">{otpError}</p>}

                        <div className="flex justify-end">
                          <button
                            type="button"
                            disabled={timer > 0}
                            onClick={() => setTimer(30)}
                            className={`text-xs font-medium ${timer > 0 ? "text-muted-foreground cursor-not-allowed" : "text-orange-600 hover:underline"}`}
                          >
                            {timer > 0 ? `Resend code in ${timer}s` : "Resend code"}
                          </button>
                        </div>
                      </div>

                      {/* New Password Field (Only for Forgot OTP flow) */}
                      {view === "forgot-otp" && (
                        <div className="space-y-2">
                          <label className="text-sm font-medium leading-none">New Password</label>
                          <div className="relative">
                            <KeyRound className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <input
                              type={showNewPassword ? "text" : "password"}
                              placeholder="••••••••"
                              className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 pl-10 pr-10 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 transition-all ${passwordError ? "border-red-500 focus-visible:ring-red-500" : "border-input focus-visible:ring-orange-500"}`}
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground focus:outline-none">
                              {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                          {passwordError && <p className="text-[0.8rem] font-medium text-red-500">{passwordError}</p>}
                        </div>
                      )}
                    </div>
                  )}

                  {/* --- SUBMIT BUTTON --- */}

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="mt-2 w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 rounded-md transition-all shadow-sm active:scale-[0.98]"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait...
                      </>
                    ) : (
                      <>
                        {view === "login" && <>Sign In <ArrowRight className="ml-2 h-4 w-4" /></>}
                        {view === "signup" && <>Create Account <ArrowRight className="ml-2 h-4 w-4" /></>}
                        {view === "signup-otp" && <>Verify & Create <CheckCircle2 className="ml-2 h-4 w-4" /></>}
                        {view === "forgot" && <>Send OTP <Mail className="ml-2 h-4 w-4" /></>}
                        {view === "forgot-otp" && <>Reset Password <CheckCircle2 className="ml-2 h-4 w-4" /></>}
                      </>
                    )}
                  </Button>

                  {/* Back button for secondary views */}
                  {view !== "login" && (
                    <Button
                      type="button"
                      variant="ghost"
                      disabled={isLoading}
                      onClick={() => {
                        if (view === "signup-otp") handleViewChange("signup");
                        else if (view === "forgot-otp") handleViewChange("forgot");
                        else handleViewChange("login");
                      }}
                      className="w-full text-muted-foreground hover:text-foreground"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      {(view === "signup-otp" || view === "forgot-otp") ? "Back" : "Back to Login"}
                    </Button>
                  )}

                </form>
              )}

              {/* Toggle Login/Signup (Only visible on main screens) */}

            </div>
          </div>

          {/* Footer Section */}
          <div className="p-6 bg-muted/20 border-t border-border/40 mt-auto">
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            </div>
            <p className="text-center text-[10px] text-muted-foreground/60 mt-4">
              © 2025 SellSync. All rights reserved.
            </p>
          </div>

        </SheetPrimitive.Content>
        {isLoading && <Loader />}
      </SheetPortal>
    </Sheet>
  );
};