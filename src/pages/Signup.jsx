import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signupUser } from "../features/authThunks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { User } from "lucide-react";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(signupUser({ name, email, password })).unwrap();
      toast({
        title: "Signup Successful",
        description: "Please login to continue",
        variant: "success",
      });
      navigate("/login");
    } catch (err) {
      toast({
        title: "Signup Failed",
        description: err.message || "Try again",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background pulses */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-300/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-pink-300/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-3/4 w-64 h-64 bg-blue-300/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000" />
      </div>

      {/* Signup Card */}
      <div className="relative z-10 w-full max-w-md animate-in fade-in slide-in-from-bottom duration-1000">
        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-md overflow-hidden">
          <CardHeader className="relative pb-8 pt-8 bg-gradient-to-br from-purple-600 via-pink-600 to-indigo-600 text-white text-center">
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative z-10 space-y-4">
              <div className="mx-auto w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 animate-pulse">
                <User 
                  className="w-6 h-6 text-gray-600 hover:text-blue-600 cursor-pointer transition-colors duration-300"   />
              </div>
              <CardTitle className="text-3xl font-bold tracking-tight">Sign Up</CardTitle>
              <p className="text-purple-100 text-sm">Create your account to get started</p>

              <div className="flex justify-center gap-2 mt-4">
                <Badge className="bg-white/20 text-white border-white/30 text-xs px-3 py-1 flex items-center gap-1">
                  🔒 Secure
                </Badge>
                <Badge className="bg-white/20 text-white border-white/30 text-xs px-3 py-1 flex items-center gap-1">
                  ✔ Free
                </Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-8 space-y-6">
            <form className="flex flex-col gap-4" onSubmit={handleSignup}>
              <Input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="px-4 py-3 text-base md:text-lg border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-300 bg-gray-50/50 hover:bg-white"
              />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="px-4 py-3 text-base md:text-lg border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-300 bg-gray-50/50 hover:bg-white"
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="px-4 py-3 text-base md:text-lg border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-300 bg-gray-50/50 hover:bg-white"
              />
              <Button
                type="submit"
                disabled={loading}
                className="w-full py-4 text-lg font-semibold rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-700 hover:via-pink-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Signing up..." : "Sign Up"}
              </Button>
            </form>

            <p className="mt-4 text-sm md:text-base text-center text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-purple-600 hover:text-purple-700 underline">
                Login
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
