import React from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const MissionSection = () => {
  const stats = [
    { number: "2022", text: "Started our journey" },
    { number: "50+", text: "Happy customers globally" },
    { number: "3", text: "Major product lines" },
    { number: "1000+", text: "Products sold" },
  ];

  return (
    <div className="w-full bg-[#D9E6BA] lg:rounded-t-[60px] rounded-t-[30px]">
      <div className="w-full flex flex-col items-center max-w-screen-2xl mx-auto h-full mt-20">
        <div className="w-full flex justify-end items-end">
          <div className="flex justify-center w-[25%] lg:w-[20%] items-center self-end bg-white lg:py-10 py-4 rounded-bl-3xl gap-2 font-semibold text-green text-xs lg:text-[18px]">
            Know More
            <ArrowRight className="size-4 lg:size-6" />
          </div>
        </div>
        <div className="px-5 lg:px-14 flex flex-col lg:flex-row w-full gap-5">
          <div className="lg:w-1/2 w-full flex flex-col justify-center gap-6 md:gap-10">
            <h1 className="text-4xl 2xl:text-6xl lg:text-5xl font-semibold line-clamp-6 mb-3 lg:mb-0">
              Our Mission
            </h1>
            <p className="w-full lg:w-[85%] text-green text-sm md:text-[18px] 2xl:text-[20px] leading-[1.3rem] lg:leading-[1.8rem]">
              Our mission is to innovate and create bio-based products that
              prioritize sustainability while fostering a deeper connection
              between people and nature. We are dedicated to developing
              solutions that enhance environmental harmony and promote health
              and well-being. By focusing on eco-friendly practices, we aim to
              inspire others to join us in cultivating a sustainable future.
              Together, we can make a positive and lasting impact on our planet.
            </p>
          </div>

          <div className="lg:w-1/2 w-full flex lg:flex-row flex-col gap-5 mt-5 lg:mt-1">
            <div className="lg:w-1/2 w-full flex flex-col gap-5 items-start justify-center">
              <div className="bg-white rounded-xl w-full flex flex-col gap-5 px-5 py-5">
                <h1 className="text-green text-4xl font-extra-bold-custom">
                  2022
                </h1>
                <p className="text-green text-sm lg:text-[15px]">
                  JAYMA BIO INNOVATIONS PVT LTD is driven by a passion for
                  sustainability and innovation.
                </p>
              </div>
              <div className="bg-white rounded-xl w-full flex flex-col gap-5 px-5 py-5">
                <h1 className="text-green text-4xl font-extra-bold-custom">
                  1000+
                </h1>
                <p className="text-green text-sm lg:text-[15px]">
                  JAYMA BIO INNOVATIONS PVT LTD has 1000+ active user everyday
                  from all over the world .
                </p>
              </div>
            </div>
            <div className="lg:w-1/2 w-full flex flex-col gap-5 items-center justify-center lg:mt-10">
              <div className="bg-white rounded-xl w-full flex flex-col gap-5 px-5 py-5 lg:mt-5">
                <h1 className="text-green text-4xl font-extra-bold-custom">
                  50+
                </h1>
                <p className="text-green text-sm lg:text-[15px]">
                  JAYMA BIO INNOVATIONS PVT LTD has more than 50 customers all
                  over the world.
                </p>
              </div>
              <div className="bg-white rounded-xl w-full flex flex-col gap-5 px-5 py-5">
                <h1 className="text-green text-4xl font-extra-bold-custom">
                  3
                </h1>
                <p className="text-green text-sm lg:text-[15px]">
                  JAYMA BIO INNOVATIONS PVT LTD has launched 3 products that are
                  available for all users
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionSection;
