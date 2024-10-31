"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface EventsSliderProps {
  className?: string;
  data: any;
  title: string;
}

const EventsSlider = ({ className, data, title }: EventsSliderProps) => {
  return (
    <div
      className={cn(
        "w-full px-4 md:px-8 lg:px-12 max-w-screen-2xl mx-auto",
        className
      )}
    >
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-medium text-green">{title}</h2>
      </div>

      <div className="w-full">
        <Swiper
          spaceBetween={20}
          slidesPerView={1.2}
          breakpoints={{
            640: {
              slidesPerView: 1.8,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2.2,
              spaceBetween: 14,
            },
            1024: {
              slidesPerView: 3.2,
              spaceBetween: 16,
            },
            1280: {
              slidesPerView: 3.5,
              spaceBetween: 16,
            },
          }}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          modules={[Autoplay]}
          className="!pb-4 md:!pb-6"
        >
          {data.map((event: any, index: number) => (
            <SwiperSlide key={index}>
              <Card className="rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="p-0">
                  <div className="relative aspect-video">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                    />
                  </div>
                </CardHeader>
                <CardDescription className="flex gap-4 p-4">
                  <div className="flex flex-col items-center justify-start min-w-[40px] md:min-w-[50px]">
                    <span className="text-sm font-medium text-muted-foreground">
                      {event.eventMonth}
                    </span>
                    <span className="text-xl md:text-2xl text-green font-medium">
                      {event.eventDate}
                    </span>
                  </div>
                  <div className="flex flex-col items-start justify-start -mt-1">
                    <h3 className="text-lg md:text-xl font-medium text-green line-clamp-1">
                      {event.title}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
                      {event.description}
                    </p>
                  </div>
                </CardDescription>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="featured-events-pagination flex justify-center mt-4" />
      </div>
    </div>
  );
};

export default EventsSlider;
