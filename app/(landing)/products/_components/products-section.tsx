import { Products } from "@/constants/products/products";
import { cn } from "@/lib/utils";
import Image from "next/image";

const ProductsSection = () => {
  return (
    <section className="mt-8 md:mt-10 py-4 md:py-8 px-5 md:px-10 lg:px-14 flex flex-col items-center gap-6">
      <div className="w-full flex items-center justify-center pt-2 md:pt-5">
        <h1 className="text-4xl md:text-7xl font-semibold text-green select-none">
          Products
        </h1>
      </div>
      <div className="w-full h-full py-4 flex flex-col items-center gap-10 mt-10">
        {Products.map((product, index) => {
          return (
            <div
              key={index}
              className={cn(
                "w-full flex py-6",
                index % 2 !== 0 && "flex-row-reverse"
              )}
            >
              <div
                className={cn(
                  "w-full md:w-1/2 flex items-center justify-start gap-10",
                  index % 2 !== 0 && "justify-end"
                )}
              >
                <div className="pt-3 w-[550px] h-auto p-[2px] object-contain flex items-center justify-center">
                  <img
                    src={product.image[0]}
                    alt={product.title}
                    className="w-full object-cover border border-dashed rounded-lg border-green"
                  />
                </div>
              </div>
              <div
                className={cn(
                  "w-full md:w-1/2 flex items-start justify-start",
                  index % 2 === 0 && "pl-10"
                )}
              >
                <div className="flex flex-col gap-4">
                  <h1 className="text-xl md:text-3xl font-medium tracking-tight text-green">{product.title}</h1>
                  <p>{product.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProductsSection;
