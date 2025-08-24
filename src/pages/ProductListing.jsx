import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Heart, Eye, Star } from "lucide-react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductListing() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [limit] = useState(12);
  const [totalProducts, setTotalProducts] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://api.escuelajs.co/api/v1/products?offset=${currentPage * limit}&limit=${limit}`
        );
        setProducts(res.data);
        const totalRes = await axios.get("https://api.escuelajs.co/api/v1/products");
        setTotalProducts(totalRes.data.length);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [currentPage, limit]);

  const totalPages = Math.ceil(totalProducts / limit);

  const ProductSkeleton = () => (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <Skeleton className="h-64 w-full rounded-t-lg" />
      </CardHeader>
      <CardContent className="p-6">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-4 w-4 rounded" />
          ))}
        </div>
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(12)].map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <Card
            key={product.id}
            className="group relative overflow-hidden border-0 bg-white/70 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 cursor-pointer"
            onClick={() => navigate(`/product/${product.id}`)}
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            <CardHeader className="p-0 relative overflow-hidden">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-72 object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent transition-all duration-500 ${
                  hoveredProduct === product.id ? "opacity-100" : "opacity-0"
                }`}
              />
              <div
                className={`absolute top-4 right-4 flex flex-col gap-3 transition-all duration-500 ${
                  hoveredProduct === product.id ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                }`}
              >
                <Button
                  size="icon"
                  variant="secondary"
                  className="w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-lg"
                >
                  <Heart className="w-4 h-4 text-gray-600 group-hover:text-red-500 transition-colors duration-200" />
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  className="w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-lg"
                >
                  <Eye className="w-4 h-4 text-gray-600 group-hover:text-blue-500 transition-colors duration-200" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-6 relative z-10">
              <h3 className="font-bold text-lg text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-all duration-300">
                {product.title}
              </h3>
              <div className="flex items-center gap-2 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < 4 ? "text-yellow-400" : "text-gray-300"}`} />
                ))}
                <Badge variant="outline" className="text-xs px-2 py-0.5 bg-yellow-50 text-yellow-700 border-yellow-200">
                  4.2 (128)
                </Badge>
              </div>
            </CardContent>

            <CardFooter className="px-6 pb-6 pt-0 flex justify-between items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                ${product.price}
              </span>
              <Badge
                variant="secondary"
                className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 font-medium px-3 py-1 border-green-200"
              >
                Save 23%
              </Badge>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-10 flex flex-col items-center gap-4">
        <div className="flex justify-center items-center gap-2">
          <Button
            variant="ghost"
            size="lg"
            disabled={currentPage === 0}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </Button>

          {/* Numeric pagination */}
          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i}
              variant={currentPage === i ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(i)}
              className={currentPage === i ? "bg-blue-600 text-white" : ""}
            >
              {i + 1}
            </Button>
          ))}

          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={products.length < limit || currentPage + 1 >= totalPages}
          >
            Next <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Show message if no more products */}
        {products.length === 0 && !loading && (
          <p className="text-center text-gray-500 mt-6">No more products to display</p>
        )}
      </div>
    </div>
  );
}
