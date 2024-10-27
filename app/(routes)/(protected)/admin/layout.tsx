"use client";

import AdminPanelLayout from "@/components/admin-sidebar-layout/sidebar-layout";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check here admin or not ??
  //   const router = useRouter();
  //   const { user } = useUserData();
  //   useEffect(() => {
  //     if (!user?.onboarded) {
  //       router.replace("/");
  //     }
  //   }, [user, router]);
  return (
    <AdminPanelLayout>
      <TooltipProvider>{children}</TooltipProvider>
    </AdminPanelLayout>
  );
}
