import AnimatedButton from "@/components/animation/button";
import { LatestProductsDetails } from "@/constants/landing/latest-products";
import { cn } from "@/lib/utils";
import Image from "next/image";

const LatestProductsLg = () => {
  return (
    <div className="hidden lg:flex flex-col w-full">
      {LatestProductsDetails.map((product, index) => (
        <div key={index} className="flex flex-col gap-10 items-start py-5">
          <div className="flex gap-2 rounded-3xl border border-green px-16 py-3">
            <span className="text-green text-xl">0{index + 1}.</span>
            <span className="text-green text-xl">{product.name}</span>
          </div>
          <div
            className={cn(
              "w-full flex gap-8",
              index % 2 !== 0 && "flex-row-reverse"
            )}
          >
            <div className="w-[60%]">
              <Image
                key={index}
                src={product.imageUrl}
                alt={product.name}
                width={800}
                height={100}
                className="h-[70%]"
              />
            </div>
            <div className="w-[40%] flex flex-col justify-center gap-5">
              <h1 className="text-green text-3xl font-bold-custom">
                {product.name}
              </h1>
              <p className="text-green lg:text-[20px] leading-[1.3rem] lg:leading-[1.8rem]">
                {product.desc}
              </p>
              <AnimatedButton buttonText="Know More" link={"/"} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};


const LatestProductsSm = () => {
  return (
    <div className="lg:hidden w-full">
      {LatestProductsDetails.map((product, index) => (
        <div key={index} className="flex flex-col gap-10 items-start py-5">
          <div className="flex gap-2 rounded-3xl border border-green px-16 py-3">
            <span className="text-green text-xl">0{index + 1}.</span>
            <span className="text-green text-xl">{product.name}</span>
          </div>
          <div
            className="w-full flex flex-col gap-8 bg-white rounded-3xl px-4 py-4"
            >
            <div className="w-full flex items-center justify-center">
              <Image
                key={index}
                src={product.imageUrl}
                alt={product.name}
                width={800}
                height={100}
                className="h-[80%] w-full"
              />
            </div>
            <div className="w-full flex flex-col items-center justify-center gap-5 md:px-10">
              <h1 className="text-green text-3xl font-bold-custom">
                {product.name}
              </h1>
              <p className="text-green md:text-[18px] leading-[1.3rem] md:leading-[1.8rem] text-center">
                {product.desc}
              </p>
              <AnimatedButton buttonText="Know More" link={"/"} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const LatestProducts = () => {
  return (
    <div className="w-full bg-[#D9E6BA] pb-5">
      <div className="w-full px-5 lg:px-14 min-h-screen flex flex-col max-w-screen-2xl mx-auto h-full pt-10 ronded-b-[30px] gap-10">
        <div className="flex flex-col w-full mt-10">
          <h1 className="text-4xl 2xl:text-6xl lg:text-5xl font-semibold line-clamp-6 mb-3 lg:mb-0">
            Latest Products
          </h1>
          <p className="lg:hidden text-green font-extra-bold-custom text-[18px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            ultricies eu purus eget posuere.
          </p>
        </div>
        <div className="w-full">
          <LatestProductsLg />
          <LatestProductsSm/>
        </div>
        <div className="flex items-center justify-center">
        <AnimatedButton buttonText="Explore More" link={"/"} />
        </div>
      </div>
    </div>
  );
};

export default LatestProducts;
