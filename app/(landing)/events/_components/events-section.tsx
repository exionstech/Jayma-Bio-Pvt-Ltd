"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { EvetsPageTopbanners } from "@/constants/events/events-top-banner";
import { FeaturedEvents } from "@/constants/events/featured-event";
import EventsSlider from "./events-slider";

const customStyles = `
  .swiper-pagination-bullet {
    width: 8px !important;
    height: 8px !important;
    background: #ffffff;
    opacity: 0.5 !important;
  }

  .swiper-pagination-bullet-active {
    background: #ffffff !important;
    opacity: 1 !important;
  }
`;

const EventsSection = () => {
  return (
    <section className="w-full mt-5 md:mt-8 min-h-screen flex flex-col gap-3 md:gap-6">
      <style>{customStyles}</style>

      {/* Hero Banner Swiper */}
      <div className="w-full h-[60vh] md:h-[70vh] lg:h-[80vh] mb-2 md:mb-4">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            dynamicBullets: true,
            clickable: true,
          }}
          modules={[Autoplay, Pagination]}
          className="w-full h-full"
        >
          {EvetsPageTopbanners.map((banner, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src={banner.image}
                  alt={`${banner.title} banner`}
                  className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
                  loading={index === 0 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white text-center px-4 transform transition-all duration-300 hover:scale-105">
                    {banner.title}
                  </h1>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Featured Events Section */}
      <EventsSlider data={FeaturedEvents} title="Featured Events" />
      <EventsSlider data={FeaturedEvents} title="Upcoming Events" />
      <EventsSlider data={FeaturedEvents} title="Past Events" />
    </section>
  );
};

export default EventsSection;
