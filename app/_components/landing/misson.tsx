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
    <div className="w-full min-h-screen flex flex-col items-center max-w-screen-2xl mx-auto h-full bg-[#D9E6BA] md:rounded-[60px] rounded-[30px] mt-20 pb-10">
      <div className="w-full flex justify-end items-end">
        <div className="flex justify-center w-[25%] md:w-[20%] items-center self-end bg-white md:py-10 py-4 rounded-bl-3xl gap-2 font-semibold text-green text-xs md:text-[18px]">
          Know More
          <ArrowRight className="size-4 md:size-6" />
        </div>
      </div>
      <div className="px-5 md:px-14 flex flex-col md:flex-row w-full gap-5">
        <div className="md:w-1/2 w-full flex flex-col gap-5">
          <h1 className="text-2xl leading-[2.5rem] md:leading-[4.3rem] 2xl:leading-[5.3rem] 2xl:text-6xl md:text-5xl font-semibold line-clamp-6 mb-3 md:mb-0">
            Our mission
          </h1>
          <p className="w-full md:w-[80%] text-green text-sm md:text-[18px] leading-[1.3rem] md:leading-[1.8rem]">
            Our mission is to innovate and create bio-based products that
            prioritize sustainability while fostering a deeper connection
            between people and nature. We are dedicated to developing solutions
            that enhance environmental harmony and promote health and
            well-being. By focusing on eco-friendly practices, we aim to inspire
            others to join us in cultivating a sustainable future. Together, we
            can make a positive and lasting impact on our planet.
          </p>
        </div>

        <div className="md:w-1/2 w-full flex md:flex-row flex-col gap-5">
          <div className="md:w-1/2 w-full flex flex-col gap-5 items-start justify-center">
            <div className="bg-white rounded-md w-full flex flex-col px-2 py-2">
              <h1 className="text-green text-xl font-semibold">2022</h1>
              <p className="text-green text-sm md:text-[18px]">
                JAYMA BIO INNOVATIONS PVT LTD emerged from a passion for
                sustainable living and a commitment to innovation.
              </p>
            </div>
            <div className="bg-white rounded-md w-full flex flex-col px-2 py-2">
              <h1 className="text-green text-xl font-semibold">1000+</h1>
              <p className="text-green text-sm md:text-[18px]">
                JAYMA BIO INNOVATIONS PVT LTD has 1000+ active user everyday
                from all over the world .
              </p>
            </div>
          </div>
          <div className="md:w-1/2 w-full flex flex-col gap-5 items-center justify-center md:mt-10">
          <div className="bg-white rounded-md w-full flex flex-col px-2 py-2">
              <h1 className="text-green text-xl font-semibold">2022</h1>
              <p className="text-green text-sm md:text-[18px]">
                JAYMA BIO INNOVATIONS PVT LTD emerged from a passion for
                sustainable living and a commitment to innovation.
              </p>
            </div>
            <div className="bg-white rounded-md w-full flex flex-col px-2 py-2">
              <h1 className="text-green text-xl font-semibold">1000+</h1>
              <p className="text-green text-sm md:text-[18px]">
                JAYMA BIO INNOVATIONS PVT LTD has 1000+ active user everyday
                from all over the world .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionSection;
