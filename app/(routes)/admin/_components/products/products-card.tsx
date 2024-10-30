import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ProductsSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { ClientUploadedFileData } from "uploadthing/types";
import { Loader2 } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadDropzone } from "@/lib/uplaodthing";

const MAX_CHARS = 230;

interface ProductsCardProps {
  setDialogOpen: (open: boolean) => void;
  initialData?: {
    id: string;
    title: string;
    description: string;
    price: string;
    link: string;
    image: string[];
  } | null;
  onSuccess?: (newData: any) => void;
}

const ProductsCard = ({
  setDialogOpen,
  initialData,
  onSuccess,
}: ProductsCardProps) => {
  const [charCount, setCharCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>(
    initialData?.image || []
  );
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const isEditMode = !!initialData;

  const form = useForm<z.infer<typeof ProductsSchema>>({
    resolver: zodResolver(ProductsSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      price: initialData?.price || "",
      link: initialData?.link || "",
      image: initialData?.image || [],
    },
  });

  useEffect(() => {
    setCharCount(form.getValues("description").length);
  }, []);

  const onSubmit = async (data: z.infer<typeof ProductsSchema>) => {
    setLoading(true);
    try {
      const endpoint = isEditMode
        ? "/api/products/update"
        : "/api/products/add";
      const requestData = {
        ...data,
        image: uploadedImages,
        ...(isEditMode && { id: initialData.id }),
      };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();

      if (onSuccess) {
        onSuccess(result.data);
      }

      toast.success(
        isEditMode
          ? "Product updated successfully"
          : "Product added successfully"
      );
      setDialogOpen(false);
    } catch (error) {
      console.error("Operation failed:", error);
      toast.error(
        isEditMode ? "Failed to update product" : "Failed to add product"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    field: any
  ) => {
    const input = e.target.value;

    if (input.length <= MAX_CHARS) {
      field.onChange(input);
      setCharCount(input.length);
      form.clearErrors("description");
    } else {
      const truncated = input.slice(0, MAX_CHARS);
      field.onChange(truncated);
      setCharCount(MAX_CHARS);
      form.setError("description", {
        type: "manual",
        message: "Description cannot exceed 230 characters",
      });
    }
  };
  
  const handleImageUpload = (
    res: ClientUploadedFileData<{ uploadedBy: string }>[]
  ) => {
    if (res && res.length > 0) {
      const fileUrls = res.map((file) => file.url);
      // Update both uploadedImages state and form value
      const updatedImages = [...uploadedImages, ...fileUrls];
      setUploadedImages(updatedImages);
      form.setValue("image", updatedImages);
      toast.success("Image uploaded successfully");
    }
  };
  
  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setShowImageDialog(true);
  };
  
  const handleRemoveImage = (indexToRemove: number) => {
    const updatedImages = uploadedImages.filter(
      (_, index) => index !== indexToRemove
    );
    setUploadedImages(updatedImages);
    form.setValue("image", updatedImages);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold">
        {isEditMode ? "Update Product" : "Add Product"}
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
          <div className="flex gap-10 my-5">
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <UploadDropzone
                        endpoint="imageUploader"
                        onClientUploadComplete={handleImageUpload}
                        onUploadError={(error: Error) => {
                          console.error(`Upload error: ${error.message}`);
                          toast.error("Image upload failed");
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-full flex gap-2 flex-wrap">
                {uploadedImages.map((imageUrl, index) => (
                  <div key={index} className="relative group">
                    <div
                      className="cursor-pointer"
                      onClick={() => handleImageClick(imageUrl)}
                    >
                      <img
                        src={imageUrl}
                        alt={`Uploaded Image ${index}`}
                        className="w-14 rounded-md h-auto"
                      />
                    </div>
                    <button
                      type="button"
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleRemoveImage(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col flex-1 w-full gap-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2 w-full space-y-0">
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Title"
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2 w-full space-y-0">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Description"
                        className="w-full border-black h-[140px] resize-none"
                        onChange={(e) => handleDescriptionChange(e, field)}
                      />
                    </FormControl>
                    <div className="flex justify-end items-end">
                      <p
                        className={`text-xs ${
                          charCount === MAX_CHARS ? "text-red-500" : ""
                        }`}
                      >
                        {charCount}/{MAX_CHARS}
                      </p>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="link"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2 w-full space-y-0">
                    <FormLabel>Link</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Link" className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2 w-full space-y-0">
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Price"
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-green hover:bg-green/90"
                  disabled={loading}
                >
                  {loading
                    ? isEditMode
                      ? "Updating..."
                      : "Submitting..."
                    : isEditMode
                    ? "Update"
                    : "Submit"}
                  {loading && (
                    <Loader2 className="ml-2 size-5 shrink-0 animate-spin" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>

      <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
        <DialogContent>
          {selectedImage && (
            <div className="w-full h-full flex justify-center items-center">
              <Image
                src={selectedImage}
                alt="Selected Image"
                width={800}
                height={600}
                className="max-w-full max-h-[80vh] object-contain rounded-xl"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductsCard;
