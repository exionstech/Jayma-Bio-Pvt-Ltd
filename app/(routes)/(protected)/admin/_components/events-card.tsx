import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { EventsSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { UploadDropzone } from "@/lib/uplaodthing";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { ClientUploadedFileData } from "uploadthing/types";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Facebook,
  Instagram,
  Link,
  Linkedin,
  Trash2,
  Twitter,
} from "lucide-react";

const MAX_CHARS = 230;

enum SocialTypes {
  Facebook = "facebook",
  Instagram = "instagram",
  Twitter = "twitter",
  Linkedin = "linkedin",
}

interface Social {
  name?: SocialTypes;
  url?: string;
}

export type Event = {
  id: string;
  title: string;
  description: string;
  venue: string;
  date: string;
  link: string;
  image: string[];
  socials?: {
    name: "facebook" | "instagram" | "twitter" | "linkedin";
    url: string;
  }[];
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
  const [selectedSocialType, setSelectedSocialType] = useState<string>("");
  const [socialLink, setSocialLink] = useState<string>("");
  const [socialDialogOpen, setSocialDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof EventsSchema>>({
    resolver: zodResolver(EventsSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      venue: initialData?.venue || "",
      link: initialData?.link || "",
      image: initialData?.image || [],
      socials: initialData?.socials || [],
      date: initialData?.date
        ? new Date(initialData.date).toISOString().split("T")[0]
        : "",
    },
  });

  useEffect(() => {
    setCharCount(form.getValues("description").length);
  }, []);

  const onSubmit = async (data: z.infer<typeof EventsSchema>) => {
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

  const handleAddSocial = () => {
    if (selectedSocialType && socialLink) {
      const currentSocials = form.getValues("socials") || [];
      const newSocial: Social = {
        name: selectedSocialType as SocialTypes,
        url: socialLink,
      };

      form.setValue("socials", [...currentSocials, newSocial], {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });

      setSelectedSocialType("");
      setSocialLink("");
      setSocialDialogOpen(false);
      toast.success("Social media link added successfully");
    }
  };

  const handleDeleteSocial = (index: number) => {
    const currentSocials = form.getValues("socials") || [];
    const updatedSocials = currentSocials.filter((_, i) => i !== index);
    form.setValue("socials", updatedSocials, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    toast.success("Social media link deleted successfully");
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold">
        {initialData ? "Update Event" : "Add Event"}
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
          <div className="flex gap-10 my-5">
            <div className="flex flex-col">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <UploadDropzone
                        endpoint="imageUploader"
                        onClientUploadComplete={(
                          res: ClientUploadedFileData<{ uploadedBy: string }>[]
                        ) => {
                          if (res && res.length > 0) {
                            const fileUrls = res.map((file) => file.url);
                            field.onChange(fileUrls);
                            toast.success("Image uploaded successfully");
                          }
                        }}
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
              <div className="mt-4">
                {form.watch("socials")?.map((social, index: number) => {
                  let SocialIcon;
                  switch (social.name) {
                    case SocialTypes.Facebook:
                      SocialIcon = Facebook;
                      break;
                    case SocialTypes.Instagram:
                      SocialIcon = Instagram;
                      break;
                    case SocialTypes.Twitter:
                      SocialIcon = Twitter;
                      break;
                    case SocialTypes.Linkedin:
                      SocialIcon = Linkedin;
                      break;
                    default:
                      SocialIcon = Link;
                  }

                  return (
                    <div
                      key={index}
                      className="flex items-center gap-2 mb-2 group bg-gray-300/50 p-2 rounded-lg"
                    >
                      <SocialIcon className="h-6 w-6 text-gray-600" />
                      <span className="text-sm text-gray-600">
                        {social.url}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity ml-auto h-8 w-8"
                        onClick={() => handleDeleteSocial(index)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  );
                })}
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
                      <Input {...field} placeholder="Link" className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2 w-full space-y-0">
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Date"
                        className="w-full"
                        type="date"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between items-center">
                <Dialog
                  open={socialDialogOpen}
                  onOpenChange={setSocialDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button type="button">Add Social</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <div className="grid gap-4 py-4">
                      <div className="flex flex-col gap-4">
                        <FormItem>
                          <FormLabel>Social Media Platform</FormLabel>
                          <Select
                            value={selectedSocialType}
                            onValueChange={setSelectedSocialType}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select platform" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.values(SocialTypes).map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type.charAt(0).toUpperCase() + type.slice(1)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                        <FormItem>
                          <FormLabel>Social Media Link</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter social media link"
                              value={socialLink}
                              onChange={(e) => setSocialLink(e.target.value)}
                            />
                          </FormControl>
                        </FormItem>
                        <Button
                          onClick={handleAddSocial}
                          type="button"
                          className="mt-2"
                          disabled={!selectedSocialType || !socialLink}
                        >
                          Add Social Link
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button type="submit">
                  {initialData ? "Update Event" : "Add Event"}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EventsCard;
