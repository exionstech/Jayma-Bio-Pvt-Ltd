"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
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
import AnimatedButton from "@/components/animation/button";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const CtaNewsLetterSection = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast.success("Newsletter subscription successful!");
    console.log(values);
    form.reset();
  }

  return (
    <section className="w-full h-[40vh] flex items-center justify-center px-5 md:px-10 lg:px-12 my-10">
      <div className="bg-lightGreen w-full h-full rounded-[2rem] flex items-center gap-6 px-6 md:px-10">
        <div className="w-full md:w-2/5 flex flex-col items-start justify-center gap-3">
          <h1 className="text-xl md:text-3xl tracking-tight font-medium capitalize flex flex-col gap-2">
            Subscribe to our newsletter
          </h1>
          <p className="text-medium font-medium">
            Stay Informed: Get the Latest Updates, Bio Tips, and Exclusive
            Offers Straight to Your Inbox!
          </p>
        </div>
        <div className="w-full md:w-3/5 flex flex-col gap-4 items-center justify-center pl-10">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full flex items-center justify-start gap-4"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="enter email"
                        {...field}
                        className="w-[350px] rounded-full bg-white text-black border-none"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <AnimatedButton buttonText="Subscribe" />
            </form>
          </Form>
          <p className="text-sm text-left">
            By submitting your email address, you agree to receive X-Ack's
            monthly newsletter. For more information, please read our privacy
            and policy page.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CtaNewsLetterSection;
