"use client";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useUserData } from "@/hooks/user-data";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TooltipProvider>{children}</TooltipProvider>;
}
