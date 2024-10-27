import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/app/globals.css";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { auth } from "@/auth";
import React from "react";
import ClientUsernameModalSetter from "@/components/renderers/ClientUsernameModalSetter";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { ModalProvider } from "@/providers/modal-provider";
import { ConfettiProvider } from "@/providers/confetti-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Jayma Bio Innovations",
  description:
    "JAYMA BIO INNOVATIONS: Sustainable health products like kombucha, bacterial cellulose, and the SapStudio device, creating music from plants. Building a meaningful digital connection with our audience.",
  icons: {
    icon: "/logos/logo.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  const showUsernameModal =
    session?.user.username === null || session?.user.username === undefined;

  return (
    <SessionProvider session={session}>
      <html lang="en" suppressHydrationWarning>
        <body className={cn("", poppins.className)}>
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          {showUsernameModal && <ClientUsernameModalSetter />}
          <ModalProvider />
          <ConfettiProvider />
          <ThemeProvider
            defaultTheme="light"
            attribute="class"
            enableSystem={false}
          >
            {children}
          </ThemeProvider>
          <Toaster />
          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    </SessionProvider>
  );
}
