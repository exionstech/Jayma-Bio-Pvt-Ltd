"use client";

import { ExecutiveLeadersDetails } from "@/constants/leaders/leaders";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const AboutUsSection = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <section
      id="about"
      className="w-full min-h-screen py-8 md:py-12 mt-4 md:mt-10"
    >
      <div className="max-w-screen-2xl mx-auto px-5 md:px-8 lg:px-12 w-full flex flex-col gap-4 md:gap-10">
        {/* About Section */}
        <div className="flex flex-col items-center gap-6 md:gap-12 mb-12 md:mb-16 pt-4 md:pt-0">
          <h1 className="text-4xl md:text-7xl font-semibold text-green select-none">
            About Us
          </h1>
          <p className="text-sm md:text-lg text-green leading-relaxed text-center w-full md:max-w-[80%]">
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

        {/* Leaders Section */}
        <div className="flex flex-col items-center gap-7 md:gap-12">
          <h2 className="text-3xl md:text-5xl font-semibold text-green">
            Meet Our Leaders
          </h2>
          <div className="w-full flex items-center justify-center md:justify-start md:mt-5">
            <h3 className="text-xl md:text-3xl font-medium text-green">
              Executive Profiles
            </h3>
          </div>

          {/* Mobile Slider */}
          <div className="w-full md:hidden">
            <Swiper
              spaceBetween={10}
              slidesPerView={1}
              centeredSlides={true}
              loop={true}
              autoplay={{
                delay: 1600,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
              className="w-full px-4"
            >
              {ExecutiveLeadersDetails.map((leader, index) => (
                <SwiperSlide key={index}>
                  <div className="w-full h-[420px] bg-white rounded-lg shadow-md border border-green/30">
                    <div className="w-full h-[60%] relative">
                      <img
                        src={leader.image}
                        alt={leader.name}
                        className="w-full h-full object-cover rounded-t-lg"
                      />
                    </div>
                    <div className="pt-2 px-4 h-[40%] space-y-2 relative">
                      <h4 className="text-medium font-semibold text-green">
                        {leader.name}
                      </h4>
                      <p className="text-sm text-green">{leader.role}</p>
                      <div className="flex gap-4 absolute bottom-4 left-4">
                        {leader.instagram && (
                          <Link href={leader.instagram}>
                            <img
                              src="/social-icons/instagram.svg"
                              alt="instagram"
                              className="w-5 h-5"
                            />
                          </Link>
                        )}
                        {leader.linkedin && (
                          <Link href={leader.linkedin}>
                            <img
                              src="/social-icons/linkedin.svg"
                              alt="linkedin"
                              className="w-5 h-5"
                            />
                          </Link>
                        )}
                        {leader.facebook && (
                          <Link href={leader.facebook}>
                            <img
                              src="/social-icons/facebook.svg"
                              alt="facebook"
                              className="w-5 h-5"
                            />
                          </Link>
                        )}
                        {leader.x && (
                          <Link href={leader.x}>
                            <img
                              src="/social-icons/x.svg"
                              alt="x"
                              className="w-5 h-5"
                            />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-5 gap-y-6 w-full">
            {ExecutiveLeadersDetails.map((leader, index) => (
              <div
                key={index}
                className="col-span-1 h-[400px] bg-white rounded-lg shadow-md border border-green/30"
              >
                <div className="w-full h-[60%] relative">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                </div>
                <div className="pt-2 px-3 space-y-3 relative h-[40%]">
                  <h4 className="text-medium font-semibold text-green">
                    {leader.name}
                  </h4>
                  <p className="text-sm text-green">{leader.role}</p>
                  <div className="flex gap-4 absolute bottom-4 left-4">
                    {leader.instagram && (
                      <Link href={leader.instagram}>
                        <img
                          src="/social-icons/instagram.svg"
                          alt="instagram"
                          className="w-5 h-5"
                        />
                      </Link>
                    )}
                    {leader.linkedin && (
                      <Link href={leader.linkedin}>
                        <img
                          src="/social-icons/linkedin.svg"
                          alt="linkedin"
                          className="w-5 h-5"
                        />
                      </Link>
                    )}
                    {leader.facebook && (
                      <Link href={leader.facebook}>
                        <img
                          src="/social-icons/facebook.svg"
                          alt="facebook"
                          className="w-5 h-5"
                        />
                      </Link>
                    )}
                    {leader.x && (
                      <Link href={leader.x}>
                        <img
                          src="/social-icons/x.svg"
                          alt="x"
                          className="w-5 h-5"
                        />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
