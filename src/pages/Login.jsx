import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, fetchProfile } from "../features/authThunks";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast"; // ShadCN toast hook
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Shield,
  CheckCircle,
  ArrowRight,
  Loader2,
} from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchProfile());
      navigate("/admin");
    }
  }, [isAuthenticated, dispatch, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser({ email, password })).unwrap();
      await dispatch(fetchProfile());
      toast({
        title: "Login Successful",
        description: "Welcome back!",
        variant: "success",
      });
      navigate("/admin");
    } catch (err) {
      toast({
        title: "Login Failed",
        description: "Incorrect email or password",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-300/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-purple-300/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-3/4 w-64 h-64 bg-pink-300/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000" />
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md animate-in fade-in slide-in-from-bottom duration-1000">
        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-md overflow-hidden">
          <CardHeader className="relative pb-8 pt-8 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 text-white text-center">
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative z-10 space-y-4">
              <div className="mx-auto w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 animate-pulse">
                <ArrowRight className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold tracking-tight">
                Welcome Back
              </CardTitle>
              <p className="text-blue-100 text-sm">
                Sign in to access your account
              </p>

              <div className="flex justify-center gap-2 mt-4">
                <Badge className="bg-white/20 text-white border-white/30 text-xs px-3 py-1 flex items-center gap-1">
                  <Shield className="w-3 h-3" /> Secure
                </Badge>
                <Badge className="bg-white/20 text-white border-white/30 text-xs px-3 py-1 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Trusted
                </Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-8 space-y-6">
            <form className="flex flex-col gap-4" onSubmit={handleLogin}>
              {/* Email Input */}
              <div className="relative group">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-12 pr-4 py-3 text-base border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 bg-gray-50/50 hover:bg-white group-hover:border-gray-300"
                />
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
              </div>

              {/* Password Input */}
              <div className="relative group">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-12 pr-12 py-3 text-base border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 bg-gray-50/50 hover:bg-white group-hover:border-gray-300"
                />
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-gray-500" />
                  ) : (
                    <Eye className="w-4 h-4 text-gray-500" />
                  )}
                </Button>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full py-4 text-lg font-semibold rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" /> Logging in...
                  </div>
                ) : (
                  "Login"
                )}
              </Button>
            </form>

            {/* Signup Link */}
            <p className="mt-4 text-sm md:text-base text-center text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-500 underline hover:text-blue-700"
              >
                Signup
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
