import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ChevronLeft, ChevronRight, Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://api.escuelajs.co/api/v1/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Failed to fetch product", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading)
    return (
      <div className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row gap-6">
        <Skeleton className="h-96 w-full md:w-1/2 rounded" />
        <div className="flex-1 flex flex-col gap-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-12 w-1/2" />
        </div>
      </div>
    );

  if (!product) return <p className="text-center mt-10">Product not found!</p>;

  return (
    <div className="max-w-6xl h-[44rem] mx-auto p-6 mt-20 flex flex-col md:flex-row gap-10 bg-white/80 backdrop-blur-sm shadow-lg rounded-xl">
      {/* Left: Images */}
      <div className="flex-1 flex flex-col gap-4">
        <div className="relative">
          <img
            src={product.images[currentImage]}
            alt={product.title}
            className="w-full h-100 object-cover rounded-xl transition-transform duration-500"
          />
          {product.images.length > 1 && (
            <>
              <Button
                size="icon"
                variant="ghost"
                className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full shadow"
                onClick={() =>
                  setCurrentImage((prev) =>
                    prev === 0 ? product.images.length - 1 : prev - 1
                  )
                }
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full shadow"
                onClick={() =>
                  setCurrentImage((prev) =>
                    prev === product.images.length - 1 ? 0 : prev + 1
                  )
                }
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {product.images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto">
            {product.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`thumb-${idx}`}
                onClick={() => setCurrentImage(idx)}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
                  currentImage === idx ? "border-blue-600" : "border-transparent"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Right: Product Details */}
      <div className="flex-1 flex flex-col gap-4">
        <h1 className="text-3xl font-bold mb-2">{product.title}</h1>

        <div className="flex items-center gap-4 mb-4">
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            ${product.price}
          </span>
          <Badge
            variant="secondary"
            className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 font-medium px-3 py-1"
          >
            Save 23%
          </Badge>
        </div>

        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${i < 4 ? "text-yellow-400" : "text-gray-300"}`}
            />
          ))}
          <Badge
            variant="outline"
            className="text-xs px-2 py-0.5 bg-yellow-50 text-yellow-700 border-yellow-200"
          >
            4.2 (128)
          </Badge>
        </div>

        <p className="text-gray-600 mb-6">{product.description}</p>

        <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 w-max">
          <ShoppingCart className="w-5 h-5" /> Add to Cart
        </Button>
      </div>
    </div>
  );
}
