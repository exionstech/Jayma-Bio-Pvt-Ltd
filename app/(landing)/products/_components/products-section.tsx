"use client";
import { cn } from "@/lib/utils";
import ImageGrid from "./image-grid";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/products/get-products";
import { Skeleton } from "@/components/ui/skeleton";

const ProductsSection = () => {
  const { products, loading, error } = useProducts();

  return (
    <section className="mt-8 md:mt-10 py-4 md:py-8 px-5 md:px-10 lg:px-14 flex flex-col items-center gap-4 md:gap-6">
      <div className="w-full flex items-center justify-center pt-2 md:pt-5">
        <h1 className="text-4xl md:text-7xl font-semibold text-green select-none">
          Products
        </h1>
      </div>
      {loading ? (
        <div className="w-full h-full py-4 flex flex-col items-center gap-4 md:gap-10 md:mt-8">
          <div className="w-full flex flex-col md:flex-row py-4 md:py-6 gap-3 md:gap-4">
            <div className="w-full md:w-1/2 flex items-center justify-center">
              <Skeleton className="w-[550px] h-[250px] md:h-[350px]" />
            </div>
            <div className="w-full md:w-1/2 flex flex-col gap-4 md:gap-8">
              <div className="flex flex-col gap-2">
                <Skeleton className="w-full rounded-lg h-6 md:h-8" />
                <Skeleton className="w-[60%] rounded-lg h-2" />
              </div>
              <Skeleton className="w-full rounded-xl h-24" />
              <div className="w-full flex items-center justify-between md:pt-14">
                <Skeleton className="w-[100px] md:w-[120px] rounded-lg h-5 md:h-10" />
                <Skeleton className="w-[100px] md:w-[160px] rounded-full h-5 md:h-10" />
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col md:flex-row-reverse py-4 md:py-6 gap-3 md:gap-4">
            <div className="w-full md:w-1/2 flex items-center justify-center">
              <Skeleton className="w-[550px] h-[250px] md:h-[350px]" />
            </div>
            <div className="w-full md:w-1/2 flex flex-col gap-4 md:gap-8">
              <div className="flex flex-col gap-2">
                <Skeleton className="w-full rounded-lg h-6 md:h-8" />
                <Skeleton className="w-[60%] rounded-lg h-1 md:h-2" />
              </div>
              <Skeleton className="w-full rounded-xl h-24" />
              <div className="w-full flex items-center justify-between md:pt-14">
                <Skeleton className="w-[100px] md:w-[120px] rounded-lg h-5 md:h-10" />
                <Skeleton className="w-[100px] md:w-[160px] rounded-full h-5 md:h-10" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-full py-4 flex flex-col items-center gap-6 md:gap-10 md:mt-8">
          {products.map((product, index) => {
            return (
              <div
                key={index}
                className={cn(
                  "w-full flex flex-col md:flex-row py-4 md:py-6 gap-5",
                  index % 2 !== 0 && "md:flex-row-reverse"
                )}
              >
                <div
                  className={cn(
                    "w-full md:w-1/2 flex items-center justify-start gap-8 md:gap-10",
                    index % 2 !== 0 && "justify-end"
                  )}
                >
                  <ImageGrid images={product.image} title={product.title} />
                </div>
                <div
                  className={cn(
                    "w-full md:w-1/2 flex items-start justify-start",
                    index % 2 === 0 && "md:pl-10"
                  )}
                >
                  <div className="flex flex-col gap-3 md:gap-4 md:pr-8">
                    <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-green">
                      {product.title}
                    </h1>
                    <p className="text-sm md:text-lg font-medium text-green">
                      {product.description}
                    </p>
                    <div className="w-full flex items-center justify-between mt-4 md:mt-10">
                      <h1 className="text-2xl md:text-3xl font-semibold">
                        ₹{""} {product.price}
                      </h1>
                      <Link href={product.link}>
                        <Button className="px-8 md:px-10 rounded-full py-3 md:py-5 text-sm md:text-lg font-semibold bg-green hover:bg-green/90 text-white">
                          Buy Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default ProductsSection;
