import Editor from "@/components/editor/editor";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UploadDropzone } from "@/lib/uplaodthing";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImagePlus, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ClientUploadedFileData } from "uploadthing/types";
import * as z from "zod";

const BlogSchema = z.object({
  thumbnail: z.string().min(1, "Thumbnail is required"),
  title: z.string().min(1, "Title is required"),
  content: z.array(z.string().optional()),
  likes: z.number(),
});

type BlogFormValues = z.infer<typeof BlogSchema>;

interface BlogCardProps {
  initialData?: BlogFormValues;
  mode?: "add" | "update";
  onSubmit?: (data: BlogFormValues) => Promise<void>;
}

const BlogCard: React.FC<BlogCardProps> = ({
  initialData,
  mode = "add",
  onSubmit,
}) => {
  const [uploadedImage, setUploadedImage] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(BlogSchema),
    defaultValues: initialData || {
      thumbnail: "",
      title: "",
      content: [],
      likes: 0,
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  const handleImageUpload = (
    res: ClientUploadedFileData<{ uploadedBy: string }>[]
  ) => {
    if (res && res.length > 0) {
      setUploadedImage(res[0].url);
      form.setValue("thumbnail", res[0].url);
      toast.success("Image uploaded successfully");
    }
  };

  // const handleImageClick = (imageUrl: string) => {
  //   setSelectedImage(imageUrl);
  //   setShowImageDialog(true);
  // };

  // const handleRemoveImage = async (indexToRemove: number, name: string) => {
  //   const updatedImages = uploadedImages.filter(
  //     (_, index) => index !== indexToRemove
  //   );
  //   setUploadedImage(updatedImages);
  //   toast.success("Image deleted");
  //   form.setValue("thumbnail", updatedImages);
  // };

  const handleSubmit = async (data: BlogFormValues) => {
    try {
      setLoading(true);
      if (onSubmit) {
        await onSubmit(data);
      }
      toast.success(
        mode === "add"
          ? "Blog created successfully!"
          : "Blog updated successfully!"
      );
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto p-6 h-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="flex justify-end items-end">
            <Button type="submit" className="" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {mode === "add" ? "Creating..." : "Updating..."}
                </>
              ) : (
                <>{mode === "add" ? "Create Blog" : "Update Blog"}</>
              )}
            </Button>
          </div>
          <FormField
            control={form.control}
            name="thumbnail"
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

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter blog title" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Editor />
        </form>
      </Form>
    </div>
  );
};

export default BlogCard;
