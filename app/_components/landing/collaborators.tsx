"use client"
import AnimatedButton from "@/components/animation/button";
import { MovingCards } from "@/components/shared/moving-card";
import Image from "next/image";

const reviews = [
  {
    imgUrl: "/landing/collaborators/c1.svg",
  },
  {
    imgUrl: "/landing/collaborators/c2.svg",
  },
  {
    imgUrl: "/landing/collaborators/c1.svg",
  },
  {
    imgUrl: "/landing/collaborators/c2.svg",
  },
  {
    imgUrl: "/landing/collaborators/c1.svg",
  },
  {
    imgUrl: "/landing/collaborators/c2.svg",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);

const Collaborators = () => {
  return (
    <section className="w-full px-5 md:px-10 flex flex-col max-w-screen-2xl mx-auto h-full py-10 lg:pt-16 gap-[2rem] md:gap-[7rem]">
      <div className="">
        <h2 className="text-3xl leading-[2.8rem] md:leading-[4.3rem] 2xl:leading-[5.3rem] 2xl:text-6xl md:text-5xl font-bold md:font-semibold text-green line-clamp-6">
          Recent Collaborations <br />&{" "}
          <span className="bg-lightGreen text-green py-0.5 px-3 leading-[2.8rem] md:leading-[4.3rem] 2xl:leading-[5.3rem] md:px-4 rounded-full text-3xl 2xl:text-6xl md:text-5xl font-bold md:font-semibold items-center justify-center">
            Innovations
          </span>
        </h2>
      </div>

      <div className="h-[40vh] w-full flex items-center justify-center md:gap-5 gap-2">
        <MovingCards pauseOnHover className="[--duration:50s]">
          {firstRow.map((image, index) => (
            <Image
              src={image.imgUrl}
              alt={index.toString()}
              height={350}
              width={350}
              className="shrink-0 rounded-2xl"
            />
          ))}
        </MovingCards>
      </div>
      <div className="w-full flex items-center justify-center py-2">
        <AnimatedButton buttonText="All Products" link={"/"} />
      </div>
    </section>
  );
};

export default Collaborators;