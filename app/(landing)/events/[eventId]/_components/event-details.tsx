"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Event } from "@/actions/events/get-events";
import { Autoplay, Pagination } from "swiper/modules";
import { Badge } from "@/components/ui/badge";

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

interface EventsDetailsProps {
  event: Event;
}
const EventsDetails = ({ event }: EventsDetailsProps) => {
  return (
    <section className="w-full mt-5 md:mt-8 min-h-screen flex flex-col gap-6 md:gap-8">
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
          {event.images.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src={img}
                  alt={`${event.title} banner ${index}`}
                  className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
                  loading={index === 0 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-start">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-white px-4 transform transition-all duration-300 hover:scale-105 pl-14 w-[55%] text-left">
                    {event.title}
                  </h1>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="w-full flex h-full px-5 md:px-10 lg:px-14">
        <div className="w-full md:w-4/6 flex flex-col gap-6">
          <h1 className="text-xl md:text-2xl font-medium md:font-semibold text-green">
            Description
          </h1>
          <p className="text-sm font-medium text-green w-[90%]">
            {event.description}
          </p>
        </div>
        <div className="w-full md:w-2/6 flex flex-col gap-4">
          <h1 className="text-xl md:text-2xl font-medium md:font-semibold text-green">
            Event Location
          </h1>
          <div className="w-full aspect-square h-[60%]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14770.632028233598!2d84.88188838715818!3d22.253051000000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a201f72bbd561c3%3A0xab5c70e76a7b5a!2sNational%20Institute%20of%20Technology%2C%20Rourkela!5e0!3m2!1sen!2sin!4v1730213691803!5m2!1sen!2sin"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen={true}
              className="w-full h-full rounded-lg border border-green/80 p-1"
            ></iframe>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-xl md:text-2xl font-medium md:font-semibold text-green">
              Kolkata, West Bengal
            </h1>
            <p className="text-sm font-medium text-green">
              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore Lorem ipsum
            </p>
          </div>
          {event.tags.length > 0 && (
            <div className="flex flex-col gap-2">
              <h1 className="text-xl md:text-2xl font-medium md:font-semibold text-green">
                Tags
              </h1>
              <div className="flex items-center gap-3">
                {event.tags.map((tag, index) => (
                  <Badge variant="outline" className="px-5 py-2" key={index}>
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default EventsDetails;
