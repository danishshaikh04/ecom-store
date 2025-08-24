import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

// Zod schema
const productSchema = z.object({
  title: z.string().min(1, "Title is required"),
  price: z.number().min(1, "Price must be at least 1"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  categoryId: z.number().min(1, "Category is required"),
  images: z
    .array(z.string().url("Invalid image URL"))
    .min(1, "At least one image is required"),
});

export default function Admin() {
  const { toast } = useToast();
  const [imagePreviews, setImagePreviews] = useState([]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      images: [""], // Start with one image input
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "images",
  });

  // Watch images to preview
  const watchedImages = watch("images");

  // Update image previews
  React.useEffect(() => {
    setImagePreviews(
      watchedImages.map((url) => (url && isValidUrl(url) ? url : null))
    );
  }, [watchedImages]);

  const isValidUrl = (url) => {
    try {
      return Boolean(new URL(url));
    } catch {
      return false;
    }
  };

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        "https://api.escuelajs.co/api/v1/products/",
        data
      );
      toast({
        title: "Product Added",
        description: `Product added successfully! ID: ${res.data.id}`,
      });
      reset();
      setImagePreviews([]);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add product. Check console for details.",
      });
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pulses */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-300/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-purple-300/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-3/4 w-64 h-64 bg-pink-300/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000" />
      </div>

      <div className="relative z-10 w-full max-w-lg animate-in fade-in slide-in-from-bottom duration-1000 mt-20">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 text-lg">
            Add new products to your inventory
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Card */}
        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-md overflow-hidden">
          <CardHeader className="relative pb-8 pt-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center rounded-t-lg">
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative z-10">
              <CardTitle className="text-3xl font-bold">
                Add New Product
              </CardTitle>
              <p className="text-blue-100 text-sm mt-2">
                Fill all details to add a new product
              </p>
            </div>
          </CardHeader>

          <CardContent className="p-8 space-y-6">
            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* Product Title */}
              <div className="space-y-2">
                <Label>Product Title</Label>
                <Input
                  {...register("title")}
                  placeholder="Enter product title"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Price */}
              <div className="space-y-2">
                <Label>Price</Label>
                <Input
                  type="number"
                  {...register("price", { valueAsNumber: true })}
                  placeholder="Enter price"
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  {...register("description")}
                  placeholder="Enter description"
                  rows={4}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Category ID */}
              <div className="space-y-2">
                <Label>Category ID</Label>
                <Input
                  type="number"
                  {...register("categoryId", { valueAsNumber: true })}
                  placeholder="Enter category ID"
                />
                {errors.categoryId && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.categoryId.message}
                  </p>
                )}
              </div>

              {/* Multiple Images */}
              <div className="space-y-2">
                <Label>Product Images</Label>
                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2">
                    <Input
                      {...register(`images.${index}`)}
                      placeholder={`Image URL ${index + 1}`}
                    />
                    {fields.length > 1 && (
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => remove(index)}
                        size="icon"
                      >
                        ×
                      </Button>
                    )}
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => append("")}
                  className="w-full"
                >
                  + Add Image
                </Button>

                {errors.images && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.images.message}
                  </p>
                )}
              </div>

              {/* Image Preview */}
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {imagePreviews.map(
                    (url, index) =>
                      url && (
                        <img
                          key={index}
                          src={url}
                          alt={`Preview ${index}`}
                          className="w-full h-32 object-cover rounded border"
                        />
                      )
                  )}
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 text-lg font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Adding Product..." : "Add Product"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
