import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { User, LogOut, Menu, X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setShowNavbar(false); // hide navbar on scroll down
      } else {
        setShowNavbar(true); // show navbar on scroll up
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200 transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Desktop Menu */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate("/")}
              className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300"
            >
              E-Commerce Store
            </button>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-4">
              <button
                onClick={() => navigate("/")}
                className="px-4 py-2 rounded-lg text-gray-600 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 font-medium"
              >
                Products
              </button>
            </div>
          </div>

          {/* Right Side Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <User
                  className="w-6 h-6 text-gray-600 hover:text-blue-600 cursor-pointer transition-colors duration-300"
                  onClick={() => navigate("/admin")}
                />
                <span className="text-gray-700 font-medium">{user?.name}</span>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 border-gray-300 hover:border-red-500 hover:text-red-500"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </Button>
              </div>
            ) : (
              <>
                <Button
                  onClick={() => navigate("/login")}
                  variant="outline"
                  size="sm"
                  className="border-gray-300 hover:border-blue-500 hover:text-blue-500"
                >
                  Login
                </Button>
                <Button
                  onClick={() => navigate("/signup")}
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-md hover:bg-gray-100 transition-all duration-200"
            >
              {menuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden px-4 py-4 space-y-3 bg-white shadow-inner rounded-b-xl border-t border-gray-200 animate-slide-down">
          <button
            onClick={() => {
              navigate("/");
              setMenuOpen(false);
            }}
            className="block w-full text-left px-4 py-2 rounded-lg text-gray-600 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 transition-all duration-300"
          >
            Products
          </button>

          {isAuthenticated ? (
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 border-gray-300 hover:border-blue-500 hover:text-blue-500 w-full justify-center"
              >
                <User
                  className="w-6 h-6 text-gray-600 hover:text-blue-600 cursor-pointer transition-colors duration-300"
                  onClick={() => {
                    navigate("/admin");
                    setMenuOpen(false);
                  }}
                />
                <span className="text-gray-700 font-medium">{user?.name}</span>
              </Button>

              <Button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                variant="outline"
                size="sm"
                className="flex items-center gap-2 border-gray-300 hover:border-red-500 hover:text-red-500 w-full justify-center"
              >
                <LogOut className="w-4 h-4" /> Logout
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Button
                onClick={() => {
                  navigate("/login");
                  setMenuOpen(false);
                }}
                variant="outline"
                size="sm"
                className="border-gray-300 hover:border-blue-500 hover:text-blue-500 w-full"
              >
                Login
              </Button>
              <Button
                onClick={() => {
                  navigate("/signup");
                  setMenuOpen(false);
                }}
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white w-full"
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
