import { ResetForm } from "@/components/auth/reset-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jayman Bio Innovations | Reset Password",
};

const ResetPage = () => {
  return <ResetForm />;
};

export default ResetPage;
