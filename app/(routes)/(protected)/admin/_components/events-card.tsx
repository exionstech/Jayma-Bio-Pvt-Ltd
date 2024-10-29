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

const EventsCard = () => {
  const [charCount, setCharCount] = useState(0);
  const [selectedSocialType, setSelectedSocialType] = useState<string>("");
  const [socialLink, setSocialLink] = useState<string>("");

  const form = useForm<z.infer<typeof EventsSchema>>({
    resolver: zodResolver(EventsSchema),
    defaultValues: {
      title: "",
      description: "",
      venue: "",
      link: "",
      image: [],
      socials: [],
      date: "",
    },
  });

  useEffect(() => {
    setCharCount(form.getValues("description").length);
  }, []);

  const onSubmit = (data: z.infer<typeof EventsSchema>) => {
    console.log(data);
    try {
      fetch("/api/events/add", {
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
          toast.success("Event added successfully");
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
          toast.error("Failed to add event");
        });
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      toast.error("Failed to add event");
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
      form.setValue("socials", [
        ...currentSocials,
        { name: selectedSocialType, url: socialLink },
      ]);
      setSelectedSocialType("");
      setSocialLink("");
      toast.success("Social media link added successfully");
    }
  };

  const handleDeleteSocial = (index: number) => {
    const currentSocials = form.getValues("socials") || [];
    const updatedSocials = currentSocials.filter((_, i) => i !== index);
    form.setValue("socials", updatedSocials);
    toast.success("Social media link deleted successfully");
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold">Add Product</h1>
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
                {form.watch("socials")?.map((social: any, index: number) => {
                  // Import specific icons based on social type
                  let SocialIcon;
                  switch (social.name) {
                    case "facebook":
                      SocialIcon = Facebook;
                      break;
                    case "instagram":
                      SocialIcon = Instagram;
                      break;
                    case "twitter":
                      SocialIcon = Twitter;
                      break;
                    case "linkedin":
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
              {/* Previous form fields remain the same */}
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
                        onChange={(e) => field.onChange(e.target.value)}
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
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between items-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Add Social</Button>
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
                <Button type="submit">Submit</Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EventsCard;
