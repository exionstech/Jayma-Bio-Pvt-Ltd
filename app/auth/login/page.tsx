import { LoginForm } from "@/components/auth/login-form";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Jayman Bio Innovations | Login",
};


const LoginPage = () => {
  return (
    <LoginForm />
  );
}
 
export default LoginPage;