"use client";
import AnimatedButton from "@/components/animation/button";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  100%{
    transform: rotate(1turn);
  }
`;

const Round = styled.div`
  position: absolute;
  bottom: 2rem;
  right: 92%;
  width: 4rem;
  height: 4rem;
  border: 2px solid #ffffff;
  border-radius: 50%;
  z-index: 10;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    animation: ${rotate} 6s linear infinite reverse;
  }
  @media (max-width: 64em) {
    width: 3.5rem;
    height: 3.5rem;
    left: 1.2rem;
    right: none;
    bottom: 4rem;
  }
  @media (max-width: 48em) {
    right: 1rem;
  }
`;

const Circle = styled.span`
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  border-radius: 50%;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: #ffffff;
  color: #171617;
  font-size: 1.5rem;

  @media (max-width: 48em) {
    width: 1.3rem;
    height: 1.3rem;
    font-size: 1rem;
    align-items: center;
    right: 1rem;
  }
`;

export const HeroSection = () => {
  return (
    <main className="w-full px-5 md:px-14 md:min-h-[75vh] flex flex-col items-center justify-center max-w-screen-2xl mx-auto h-full pt-10 md:pt-6">
      <div className="w-full flex flex-col md:flex-row items-center h-full">
        <div className="md:w-1/2 w-full flex flex-col gap-3 md:gap-5">
          <div className="flex gap-2 items-center">
            <p className="text-xs md:text-[15px] text-green">
              Lorem ipsum dolor sit amet, consectetur
            </p>
            <div className="bg-green h-[1.5px] w-10 pt-[1px]" />
          </div>
          <h1 className="text-2xl md:text-5xl font-medium leading-[1.5]">
            Reimagining Bio <br />
            Products{" "}
            <span className="bg-lightGreen py-0.5 px-3 md:px-4 rounded-full">
              Greening
            </span>
            <br />
            the World
          </h1>
          <AnimatedButton buttonText="Get Started" link={"/"} />
        </div>

        <div className="w-full md:w-1/2 flex flex-col gap-[4rem] h-full mt-8 md:mt-14">
          <div className="flex flex-col w-full h-full md:h-1/2 items-end justify-center gap-3 pt-6">
            <Button
              variant="outline"
              className="text-green w-[240px] rounded-full border border-green text-medium flex items-center justify-end font-medium"
              size={"lg"}
            >
              Upcoming Events
            </Button>

            <Button
              size={"lg"}
              className="w-[380px] justify-end rounded-full bg-green text-white text-medium hover:bg-green/90"
            >
              <span className="text-white"> Our Updates</span>
            </Button>

            <Button
              size={"lg"}
              variant="outline"
              className="text-green w-[240px] rounded-full border border-green text-medium flex items-center justify-end font-medium "
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
            <div className="w-40 h-40 object-cover flex items-center justify-end relative">
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
