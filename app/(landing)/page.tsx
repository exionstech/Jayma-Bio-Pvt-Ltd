import { HeroSection } from "@/app/_components/landing/hero";
import { MaxWrapper } from "@/components/shared/max-wrapper";
import { Metadata } from "next";
import Services from "../_components/landing/services";
import MissionSection from "../_components/landing/our-misson";
import LatestProducts from "../_components/landing/latest-products";
import { Testimonials } from "../_components/landing/testimonials";
import { Collaborations } from "../_components/landing/collaborations";


export const metadata: Metadata = {
  title: "Jayman Bio Innovations | Home",
};

const LandingPage = () => {
  return (
    <MaxWrapper>
      <HeroSection />
      <Services />
      <MissionSection/>
      <LatestProducts/>
      <Collaborations/>
      <Testimonials/>
    </MaxWrapper>
  );
};
export default LandingPage;
