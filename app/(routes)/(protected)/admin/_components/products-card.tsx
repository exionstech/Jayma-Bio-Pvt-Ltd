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
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { UploadDropzone } from "@/lib/uplaodthing";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { ClientUploadedFileData } from "uploadthing/types";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";

const MAX_CHARS = 230;

interface ProductscardProps {
  setDialogOpen: (open: boolean) => void;
}

const ProductsCard = ({ setDialogOpen }: ProductscardProps) => {
  const [charCount, setCharCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof ProductsSchema>>({
    resolver: zodResolver(ProductsSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      link: "",
      image: [],
    },
  });

  useEffect(() => {
    // Initialize character count with default value
    setCharCount(form.getValues("description").length);
  }, []);

  const onSubmit = (data: z.infer<typeof ProductsSchema>) => {
    setLoading(true);
    try {
      fetch("/api/products/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((result) => {
          setLoading(false);
          toast.success("Product added successfully");
          setDialogOpen(false);
        })
        .catch((error) => {
          setLoading(false);
          console.error("There was a problem with the fetch operation:", error);
          toast.error("Failed to add product");
        });
    } catch (err) {
      setLoading(false);
      toast.error("Failed to add product");
      setDialogOpen(false);
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
      // Clear error when character count is within limit
      form.clearErrors("description");
    } else {
      // Keep the first MAX_CHARS characters
      const truncated = input.slice(0, MAX_CHARS);
      field.onChange(truncated);
      setCharCount(MAX_CHARS);

      // Show error in form
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
      form.setValue("image", fileUrls);
      setUploadedImages(fileUrls);
      toast.success("Image uploaded successfully");
    }
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setShowImageDialog(true);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold">Add Product</h1>
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
              <div className="grid grid-cols-2 gap-4">
                {uploadedImages.map((imageUrl, index) => (
                  <div
                    key={index}
                    className="cursor-pointer"
                    onClick={() => handleImageClick(imageUrl)}
                  >
                    <img
                      src={imageUrl}
                      alt={`Uploaded Image ${index}`}
                      className="w-14 rounded-md h-auto"
                    />
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
                        onChange={(e) => field.onChange(e.target.value)}
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
                  {loading ? "Submitting" : "Submit"}
                  {loading && (
                    <Loader2 className="size-5 shrink-0 animate-spin" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>

      {/* Image Dialog */}
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
