"use client";

import AdminPanelLayout from "@/components/admin-sidebar-layout/sidebar-layout";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useUserData } from "@/hooks/user-data";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user } = useUserData();

  useEffect(() => {
    if (user?.role === "USER") {
      router.replace("/");
    }
  }, [user, router]);

  return (
    <AdminPanelLayout>
      <TooltipProvider>{children}</TooltipProvider>
    </AdminPanelLayout>
  );
}
