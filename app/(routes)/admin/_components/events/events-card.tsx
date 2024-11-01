import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Pencil, PlusCircle, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { UploadDropzone } from "@/lib/uplaodthing";
import { toast } from "sonner";
import Image from "next/image";

const MAX_CHARS = 230;

// Event type definition
type Event = {
  id: string;
  title: string;
  description: string;
  venue: string;
  date: string;
  link: string;
  image?: string[];
  eventType: "FEATURED" | "UPCOMMING" | "PAST";
  notify: boolean;
  archived: boolean;
  createdAt: Date;
  updatedAt: Date;
};

// Schema definition (assumed to be imported from @/schemas)
const EventsSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  venue: z.string().min(1, "Venue is required"),
  date: z.string().min(1, "Date is required"),
  link: z.string().url("Must be a valid URL"),
  image: z.array(z.string()).optional(),
  eventType: z.enum(["FEATURED", "UPCOMMING", "PAST"]),
  notify: z.boolean(),
  archived: z.boolean(),
});

interface EventsFormProps {
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  initialData?: Event;
  onSuccess?: () => Promise<void>;
}

const EventsForm = ({
  setDialogOpen,
  initialData,
  onSuccess,
}: EventsFormProps) => {
  const [charCount, setCharCount] = useState(0);
  const [uploadedImages, setUploadedImages] = useState<string[]>(
    initialData?.image || []
  );
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof EventsSchema>>({
    resolver: zodResolver(EventsSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      venue: initialData?.venue || "",
      link: initialData?.link || "",
      image: initialData?.image || [],
      date: initialData?.date || "",
      eventType: initialData?.eventType || "FEATURED",
      notify: initialData?.notify || false,
      archived: initialData?.archived || false,
    },
  });

  useEffect(() => {
    setCharCount(form.getValues("description").length);
  }, []);

  const onSubmit = async (data: z.infer<typeof EventsSchema>) => {
    setLoading(true);
    try {
      const endpoint = initialData ? "/api/events/update" : "/api/events/add";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, id: initialData?.id }),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      if (data.notify) {
        const res = await fetch("/api/events/notify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: data.title,
            description: data.description,
            date: data.date,
          }),
        });

        if (!res.ok) {
          toast.error("Failed to send notifications");
        } else {
          toast.success("Notifications sent successfully");
        }
      }

      toast.success(
        initialData ? "Event updated successfully" : "Event added successfully"
      );
      if (onSuccess) await onSuccess();
      setDialogOpen(false);
    } catch (error) {
      console.error("Operation failed:", error);
      toast.error(
        initialData ? "Failed to update event" : "Failed to add event"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-[90%] md:w-full h-[80vh] md:max-w-4xl mx-auto flex flex-col">
      <CardHeader className="border-b">
        <CardTitle className="text-2xl font-semibold">
          {initialData ? "Update Event" : "Add New Event"}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-6">
              {/* Image Upload Section */}
              <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-medium">
                        Event Images
                      </FormLabel>
                      <FormControl>
                        <div className="space-y-4">
                          <UploadDropzone
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                              if (res && res.length > 0) {
                                const fileUrls = res.map((file) => file.url);
                                const updatedImages = [
                                  ...uploadedImages,
                                  ...fileUrls,
                                ];
                                setUploadedImages(updatedImages);
                                form.setValue("image", updatedImages);
                                toast.success("Images uploaded successfully");
                              }
                            }}
                            onUploadError={(error: Error) => {
                              toast.error("Image upload failed");
                            }}
                          />
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {uploadedImages.map((imageUrl, index) => (
                              <div
                                key={index}
                                className="relative group aspect-square"
                              >
                                <div
                                  className="cursor-pointer rounded-lg overflow-hidden h-full"
                                  onClick={() => {
                                    setSelectedImage(imageUrl);
                                    setShowImageDialog(true);
                                  }}
                                >
                                  <img
                                    src={imageUrl}
                                    alt={`Event image ${index + 1}`}
                                    className="w-full h-full object-cover transition-transform hover:scale-105"
                                  />
                                </div>
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="icon"
                                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                  onClick={() => {
                                    const updatedImages = uploadedImages.filter(
                                      (_, i) => i !== index
                                    );
                                    setUploadedImages(updatedImages);
                                    form.setValue("image", updatedImages);
                                    toast.success("Image removed");
                                  }}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* Main Form Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {/* Title Field */}
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Event Title</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter event title" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Description Field */}
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Textarea
                              {...field}
                              placeholder="Enter event description"
                              className="min-h-[120px] resize-none"
                              onChange={(e) => {
                                const input = e.target.value;
                                if (input.length <= MAX_CHARS) {
                                  field.onChange(input);
                                  setCharCount(input.length);
                                }
                              }}
                            />
                            <span
                              className={`absolute bottom-2 right-2 text-xs ${
                                charCount === MAX_CHARS
                                  ? "text-red-500"
                                  : "text-gray-500"
                              }`}
                            >
                              {charCount}/{MAX_CHARS}
                            </span>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Event Type Field */}
                  <FormField
                    control={form.control}
                    name="eventType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Event Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select event type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="FEATURED">Featured</SelectItem>
                            <SelectItem value="UPCOMMING">Upcoming</SelectItem>
                            <SelectItem value="PAST">Past</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  {/* Venue Field */}
                  <FormField
                    control={form.control}
                    name="venue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Venue</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter event venue" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Link Field */}
                  <FormField
                    control={form.control}
                    name="link"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Registration Link</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter registration URL"
                            type="url"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Date Field */}
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Event Date</FormLabel>
                        <FormControl>
                          <Input {...field} type="date" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Checkboxes Container */}
                  <div className="space-y-4">
                    {/* Notification Checkbox */}
                    <FormField
                      control={form.control}
                      name="notify"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Send Notifications</FormLabel>
                            <FormDescription>
                              Notify subscribed users about this event
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />

                    {/* Archive Checkbox */}
                    <FormField
                      control={form.control}
                      name="archived"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Archive Event</FormLabel>
                            <FormDescription>
                              Move this event to the archives
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button - Fixed at bottom */}
            <div className="sticky -bottom-6 bg-white p-4 -mx-6 mb-6 mt-6 border-t flex justify-end">
              <Button
                type="submit"
                disabled={loading}
                className="min-w-[120px]"
              >
                {loading ? (
                  <>
                    {initialData ? "Updating..." : "Creating..."}
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  </>
                ) : (
                  <>
                    {initialData ? "Update" : "Create"}
                    {initialData ? (
                      <Pencil className="ml-2 h-4 w-4" />
                    ) : (
                      <PlusCircle className="ml-2 h-4 w-4" />
                    )}
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>

      {/* Image Preview Dialog */}
      <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Image Preview</DialogTitle>
          </DialogHeader>
          {selectedImage && (
            <div className="relative w-full aspect-video">
              <Image
                src={selectedImage}
                alt="Event image preview"
                fill
                className="object-contain"
                priority
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default EventsForm;
