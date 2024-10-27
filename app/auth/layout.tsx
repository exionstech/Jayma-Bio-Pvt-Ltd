"use client"
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const swiperTexts = [
    "Kickstart your innovation with Exlan—where tech minds unite and ideas come alive!",
    "Collaborate, innovate, and build the future with Exlan's powerful platform.",
    "Join a community of creators and turn your vision into reality with Exlan."
  ];

  return (
    <main className="w-full flex flex-col md:flex-row h-full overflow-y-hidden bg-white">
      <div className="w-1/2 hidden min-h-screen overflow-hidden md:flex flex-col justify-center items-center z-0 auth bg-black">
        <div className="w-[85%] h-[90%] flex flex-col justify-between px-10 py-5 border border-gray-200/50 rounded-lg bg-white/5 backdrop-blur-sm text-white z-10">
          <div className="flex-grow"></div>
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            effect={"fade"}
            fadeEffect={{ crossFade: true }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              el: '.swiper-pagination',
              type: 'bullets',
            }}
            modules={[Autoplay, Pagination, EffectFade]}
            className="w-full mb-8"
          >
            {swiperTexts.map((text, index) => (
              <SwiperSlide key={index} className="flex">
                <p className="text-3xl">{text}</p>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="swiper-pagination !flex !justify-start !ml-10"></div>
        </div>
      </div>
      <div className="w-full md:w-1/2 max-h-screen">{children}</div>
    </main>
  );
};

export default AuthLayout;