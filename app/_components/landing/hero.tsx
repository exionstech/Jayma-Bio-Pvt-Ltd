"use client";
import AnimatedButton from "@/components/animation/button";
import { Button } from "@/components/ui/button";
import { scrollToNext } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export const HeroSection = () => {
  return (
    <main className="w-full px-5 md:px-14 md:min-h-[76vh] min-h-[70vh] flex flex-col items-center justify-center max-w-screen-2xl mx-auto h-full pt-8 md:pt-6">
      <div className="w-full flex flex-col md:flex-row items-center h-full">
        <div className="md:w-1/2 w-full flex flex-col gap-3 md:gap-5">
          <div className="flex gap-2 items-center">
            <p className="text-xs md:text-[15px] text-green">
              Pioneering Eco-Friendly Innovations
            </p>
            <div className="bg-green h-[1.5px] w-10 pt-[1px]" />
          </div>
          <h1 className="text-2xl leading-[2.5rem] md:leading-[4.3rem] 2xl:leading-[5.3rem] 2xl:text-6xl md:text-5xl font-medium tracking-tight mb-3 md:mb-0 text-green">
            Innovating Solutions <br /> for a{" "}
            <span className="bg-lightGreen py-0.5 px-3 md:px-4 rounded-full text-4.5xl">
              Greener
            </span>
            <br />
            Tomorrow.
          </h1>
          <AnimatedButton buttonText="Get Started" link={"/auth/login"} />
        </div>

        <div className="w-full md:w-1/2 flex flex-col gap-[4rem] h-full mt-10 md:mt-14">
          <div className="flex flex-col w-full h-full md:h-1/2 items-end justify-center gap-3 pt-5 md:pt-8">
            <div className="w-full flex items-center justify-start -mb-10 md:hidden">
              <div className="flex flex-col gap-1 items-start justify-center">
                <Image
                  src={"/landing/hero/right-image.svg"}
                  alt="image"
                  height={70}
                  width={70}
                  className="rounded-full"
                />
                <p className="text-green text-xs">
                  making lives <br /> easier
                </p>
              </div>
            </div>
            <Link href="/events">
              <Button
                variant="outline"
                className="text-green w-[180px] md:w-[240px] rounded-full border border-green text-sm md:text-medium flex items-center justify-end font-medium"
                size={"lg"}
              >
                Upcoming Events
              </Button>
            </Link>

            <Button
              size={"lg"}
              className="w-[220px] md:w-[380px] justify-end rounded-full bg-green text-white text-medium hover:bg-green/90"
            >
              <span className="text-white"> Our Updates</span>
            </Button>

            <Button
              size={"lg"}
              variant="outline"
              onClick={() => {
                scrollToNext("testimonials");
              }}
              className="text-green w-[180px] md:w-[240px] rounded-full border border-green text-sm md:text-medium flex items-center justify-end font-medium "
            >
              What Clients Tell
            </Button>
          </div>

          <div className="hidden h-1/2 w-full md:flex items-center justify-end">
            <div className="h-full w-1/2 flex justify-center items-center">
              <div className="flex flex-col items-center justify-center gap-2">
                <Image
                  src={"/landing/hero/right-image.svg"}
                  alt="image"
                  height={70}
                  width={70}
                  className="rounded-full"
                />
                <p className="text-green text-sm">making lives easier</p>
              </div>
            </div>
            <div
              onClick={() => {
                scrollToNext("mission");
              }}
              className="w-[140px] aspect-square object-cover flex items-center justify-end relative cursor-pointer"
            >
              <Image
                src="/landing/hero/round.svg"
                alt="image"
                width={100}
                height={100}
                className="w-[98%] h-auto animate-smoothSpin"
              />
              <div className="absolute top-0 w-full left-0 aspect-square flex items-center justify-center">
                <Image
                  src="/landing/hero/arrow.svg"
                  alt="image"
                  width={8}
                  height={8}
                  className="size-8 shrink-0 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
