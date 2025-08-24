import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProductDetail from "./pages/ProductDetail";
import ProductListing from "./pages/ProductListing";
import Admin from "./pages/Admin";
import { ToastProvider } from "@/components/ui/toast"; 
import { Toaster } from "@/components/ui/toaster"; 

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <>
    <ToastProvider>
      <Navbar />

      <Routes>
        <Route path="/" element={<ProductListing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/product/:id" element={<ProductDetail />} />

        {/* Protected Admin Route without extra component */}
        <Route
          path="/admin"
          element={
            isAuthenticated ? <Admin /> : <Navigate to="/login" replace />
          }
        />

        <Route path="*" element={<ProductListing />} />
      </Routes>
      <Toaster/>
      </ToastProvider>
      </>
  );
}

export default App;
