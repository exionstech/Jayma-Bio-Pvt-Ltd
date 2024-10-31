"use client";

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
import { EventsSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { UploadDropzone } from "@/lib/uplaodthing";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import type { ClientUploadedFileData } from "uploadthing/types";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { sendNewsletter } from "@/lib/mail";
import { sendEventMail } from "@/actions/event-newsletter";

const MAX_CHARS = 230;

export type Event = {
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

interface EventsCardProps {
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  initialData?: Event;
  onSuccess?: () => Promise<void>;
}

const EventsCard = ({
  setDialogOpen,
  initialData,
  onSuccess,
}: EventsCardProps) => {
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
      archived: initialData?.archived || true,
    },
  });

  useEffect(() => {
    setCharCount(form.getValues("description").length);
  }, []);

  const onSubmit = async (data: z.infer<typeof EventsSchema>) => {
    setLoading(true);
    console.log(data);
    try {
      const endpoint = initialData ? "/api/events/update" : "/api/events/add";
      const method = "POST";

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          id: initialData?.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      if (data.notify) {
        //send mail to subscribed users
        const res = await sendEventMail(
          data.title,
          data.description,
          data.date
        );

        if (!res.success) {
          toast.error("Failed to send mail to subscribed users");
        } else {
          toast.success("Mail sent successfully");
        }
      }
      
      toast.success(
        initialData ? "Event updated successfully" : "Event added successfully"
      );
      if (onSuccess) await onSuccess();
      setDialogOpen(false);
    } catch (error) {
      console.error("There was a problem with the operation:", error);
      toast.error(
        initialData ? "Failed to update event" : "Failed to add event"
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

  const handleRemoveImage = async (indexToRemove: number, name: string) => {
    const updatedImages = uploadedImages.filter(
      (_, index) => index !== indexToRemove
    );
    setUploadedImages(updatedImages);
    toast.success("Image deleted");
    form.setValue("image", updatedImages);
  };

  return (
    <div className="w-full overflow-auto">
      <h1 className="text-2xl font-semibold">
        {initialData ? "Update Event" : "Add Event"}
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full"
        >
          <div className="flex md:flex-row flex-col justify-between gap-5 my-5 w-full">
            <div className="flex flex-col">
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
              <div className="w-full flex gap-2 flex-wrap py-5">
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
                      onClick={() => handleRemoveImage(index, imageUrl)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col md:flex-row flex-1 w-full gap-2">
              <div className="flex flex-col gap-2 w-full">
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
                          className="w-full border-black h-[100px] resize-none"
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
                  name="eventType"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2 w-full space-y-0">
                      <FormLabel>Event Type</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Event Type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="FEATURED">Featured</SelectItem>
                            <SelectItem value="UPCOMMING">Upcomming</SelectItem>
                            <SelectItem value="PAST">Past</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <FormField
                  control={form.control}
                  name="venue"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2 w-full space-y-0">
                      <FormLabel>Venue</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Venue"
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="link"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2 w-full space-y-0">
                      <FormLabel>Registration Link</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Link"
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date of Event</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          placeholder="Pick a Date"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="notify"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Send Mail</FormLabel>
                      <div className="flex gap-2 leading-none">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormDescription>
                          Tick the checkbox to send mail to subscribed users.
                        </FormDescription>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="archived"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Archive</FormLabel>
                      <div className="flex gap-2 leading-none">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormDescription>
                          Archive the event.
                        </FormDescription>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end items-end">
            <Button type="submit" disabled={loading}>
              {loading
                ? initialData
                  ? "Updating..."
                  : "Submitting..."
                : initialData
                ? "Update"
                : "Submit"}
              {loading && (
                <Loader2 className="ml-2 size-5 shrink-0 animate-spin" />
              )}
            </Button>
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

export default EventsCard;
