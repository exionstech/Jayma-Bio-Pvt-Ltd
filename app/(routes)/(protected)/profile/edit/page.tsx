"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ProfileEditSchema } from "@/schemas";
import { useCurrentUser } from "@/hooks/use-current-user";
import { updateUser } from "@/actions/updateUser";
import Link from "next/link";
import { BackButton } from "@/components/auth/back-button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

const ProfilePage = () => {
  const user = useCurrentUser();

  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState<string | null>();
  const [success, setSuccess] = useState<string | null>();

  const form = useForm<z.infer<typeof ProfileEditSchema>>({
    resolver: zodResolver(ProfileEditSchema),
    defaultValues: {
      name: `${user?.name}`,
      username: `${user?.username}`,
      bio: `${!user?.bio ? "" : user?.bio}`,
    },
  });

  const onSubmit = (values: z.infer<typeof ProfileEditSchema>) => {
    startTransition(() => {
      updateUser(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }
          if (data.success) {
            setSuccess(data.success);
          }
        })
        .catch(() => {
          setError("Something went wrong!");
        });
    });
  };

  return (
    <div className="h-full">
      <div className="flex md:pt-4 h-full py-10 justify-center">
        <Card className="md:w-[600px] w-full select-none">
          <CardHeader>
            <CardTitle className="font-bold tracking-tight">
              Edit Profile
            </CardTitle>
            <CardDescription>Profile settings for {user?.name}</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input disabled={isPending} placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your full name or first name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input disabled={isPending} placeholder="johndoe_" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          disabled={isPending}
                          placeholder="Dedicated software engineer. Proficient in various programming languages, frameworks, and databases."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>This is your bio.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
                <Button disabled={isPending} variant="link" size="sm" asChild className="px-0 font-normal text-xs">
                  <Link href="/profile/edit/picture">Want to edit profile picture?</Link>
                </Button>
                <br />
                <FormError message={error!} />
                <FormSuccess message={success!} />
                <Button disabled={isPending} className="w-full" type="submit">Update</Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="text-lg">
            <BackButton href="/profile" label="Back to Profile" />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
