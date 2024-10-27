import { HeroSection } from "@/app/_components/landing/hero";
import { MaxWrapper } from "@/components/shared/max-wrapper";
import { Metadata } from "next";
import Services from "../_components/landing/services";

export const metadata: Metadata = {
  title: "Jayman Bio Innovations | Home",
};

const LandingPage = () => {
  return (
    <MaxWrapper>
      <HeroSection />
      <Services />
    </MaxWrapper>
  );
};
export default LandingPage;
