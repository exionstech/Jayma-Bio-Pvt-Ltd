"use client";

import { LeadersDetails } from "@/constants/leaders/leaders";
import Link from "next/link";
import { MovingCards } from "@/components/shared/moving-card";
import LeadersMobile from "./leaders-mobile";

const AboutUsSection = () => {
  return (
    <section
      id="about"
      className="w-full h-full mt-6 md:mt-12 flex items-center justify-center"
    >
      <div className="py-4 md:py-8 px-5 md:px-10 lg:px-12 flex flex-col items-center gap-7 md:gap-12 max-w-screen-2xl mx-auto min-h-screen">
        <div className="w-full flex flex-col items-center justify-center py-3 gap-8 md:gap-12 pb-4 md:pb-6">
          <h1 className="text-4xl md:text-6xl font-semibold text-green select-none">
            About Us
          </h1>
          <p className="text-sm md:text-lg font-medium text-green text-center w-full md:w-[80%] leading-[1.5rem] md:leading-[2.1rem]">
            Welcome to{" "}
            <span className="font-semibold">
              JAYMA BIO INNOVATIONS PRIVATE LIMITED
            </span>
            , founded in 2022 in Rourkela, dedicated to creating biobased,
            sustainable products for a healthier planet. Our journey began with
            kombucha, symbolizing eco-conscious wellness, and led to innovations
            like bacterial cellulose for sustainable textiles and packaging.
            Collaborating with NIT Rourkela students, we bridge research with
            real-world applications, fueling creativity in biotechnology. Our
            latest product, the Sap Symphony, transforms plant signals into
            music, deepening our connection with nature. At JAYMA,
            sustainability drives every choice. Join us in pioneering a future
            where responsible living is accessible to all.
          </p>
        </div>
        <div className="w-full flex items-center justify-center flex-col gap-5 md:gap-10">
          <h1 className="text-3xl md:text-5xl font-semibold text-green select-none">
            Meet Our Leaders
          </h1>
          <h1 className="text-2xl md:text-3xl font-medium text-green md:hidden">
            Executive Profiles
          </h1>
          <div className="w-full flex flex-col gap-4 md:gap-8 items-center justify-center md:mt-10 pb-7 md:pb-10">
            <h1 className="text-2xl md:text-3xl font-medium text-green hidden md:flex">
              Executive Profiles
            </h1>
            {/* Laptop view */}
            <div className="w-full h-full md:grid-cols-9 lg:grid-cols-12 gap-4 hidden md:grid">
              {LeadersDetails.map((leader, index) => (
                <div
                  key={index}
                  className="col-span-3  h-[400px] border border-green/30 flex flex-col items-start justify-start rounded-lg bg-white shadow-md"
                >
                  <div className="w-full h-[60%] object-contain border-b border-green/40">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-full rounded-t-lg object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-2 items-start px-3 pt-2">
                    <h1 className="text-sm font-semibold text-green">
                      {leader.name}
                    </h1>
                    <p className="text-[14px] text-green min-h-[60px]">
                      {leader.role}
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      {leader.instagram && (
                        <Link href={leader.instagram}>
                          <img
                            src="/social-icons/instagram.svg"
                            alt="instagram"
                            className="size-4 shrink-0"
                          />
                        </Link>
                      )}
                      {leader.linkedin && (
                        <Link href={leader.linkedin}>
                          <img
                            src="/social-icons/linkedin.svg"
                            alt="linkedin"
                            className="size-4 shrink-0"
                          />
                        </Link>
                      )}
                      {leader.facebook && (
                        <Link href={leader.facebook}>
                          <img
                            src="/social-icons/facebook.svg"
                            alt="facebook"
                            className="size-4 shrink-0"
                          />
                        </Link>
                      )}
                      {leader.x && (
                        <Link href={leader.x}>
                          <img
                            src="/social-icons/x.svg"
                            alt="x"
                            className="size-4 shrink-0"
                          />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile view */}
            <LeadersMobile />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
