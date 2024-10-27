import React from 'react';
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const MissionSection = () => {
  const stats = [
    { number: '2022', text: 'Started our journey' },
    { number: '50+', text: 'Happy customers globally' },
    { number: '3', text: 'Major product lines' },
    { number: '1000+', text: 'Products sold' },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col items-center max-w-screen-2xl mx-auto h-full bg-[#D9E6BA] rounded-[60px] mt-20">
        <div className="w-full flex justify-end items-end">
            <div className="flex justify-center w-[20%] items-center self-end bg-white py-10 rounded-bl-3xl gap-4 font-semibold text-green">
                Know More
                <ArrowRight className="size-6" />
            </div>
        </div>
        <div className="px-5 md:px-14 flex w-full bg-red-200">
            <div className="w-1/2 flex flex-col">
                <h1>Our mission</h1>
                <p className='w-full md:w-[70%]'>Our mission is to innovate and create bio-based products that prioritize sustainability while fostering a deeper connection between people and nature. We are dedicated to developing solutions that enhance environmental harmony and promote health and well-being. By focusing on eco-friendly practices, we aim to inspire others to join us in cultivating a sustainable future. Together, we can make a positive and lasting impact on our planet.</p>
            </div>
            <div className="w-1/2">
            </div>
        </div>

    </div>
  );
};

export default MissionSection;