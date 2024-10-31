"use client";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, PackageSearch } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Products } from "@/types/products-related-types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

interface ProductsListProps {
  products: Products[];
}

// Global No Products Card Component
const GlobalNoProductsCard = () => (
  <Card className="w-full max-w-2xl mx-auto overflow-hidden bg-gray-50 rounded-xl shadow-lg">
    <CardContent className="p-12 flex flex-col items-center justify-center text-center">
      <PackageSearch className="w-24 h-24 text-gray-400 mb-6" />
      <h3 className="text-2xl font-semibold text-gray-700 mb-3">
        No Products Available
      </h3>
      <p className="text-gray-500 text-lg max-w-md">
        We currently don't have any products available. Please check back later
        for our amazing collection!
      </p>
    </CardContent>
  </Card>
);

// Product Card Skeleton Component
const ProductCardSkeleton = ({
  variant,
}: {
  variant: "brewbucha" | "merchandise" | "starterkit";
}) => {
  return (
    <Card className="overflow-hidden bg-white rounded-lg shadow-md">
      <div className="relative">
        <div className="aspect-square relative">
          <Skeleton className="absolute inset-0 w-full h-full" />
          <div className="absolute top-4 right-4 p-2">
            <Skeleton className="size-10 rounded-full" />
          </div>
        </div>

        <CardContent className="p-4 pb-6">
          <Skeleton className="h-5 w-3/4 mb-2" />
          <Skeleton className="h-3 w-full mb-2" />
          <Skeleton className="h-3 w-2/3 mb-4" />
          <div className="flex items-center justify-between mt-5">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-8 w-32" />
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

// BrewBucha Card Component
const BrewBuchaCard = ({ product }: { product: Products }) => (
  <Card className="overflow-hidden bg-white rounded-lg shadow-md">
    <div className="relative">
      <div className="aspect-square relative">
        <img
          src={product.images[0]?.url}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <button className="absolute top-4 right-4 p-2 text-green hover:text-green heart-icon">
          <Heart className="size-6 shrink-0 text-green" />
        </button>
      </div>

      <CardContent className="p-4 pb-6">
        <h3 className="text-xl font-semibold text-green mb-2">
          {product.name}
        </h3>
        <p className="text-sm text-green mb-4 line-clamp-2">{product.name}</p>
        <div className="flex items-center justify-between mt-5">
          <div className="flex items-baseline">
            <span className="text-lg font-semibold text-green">Rs</span>
            <span className="text-xl font-semibold text-green ml-1">
              {typeof product.price === "number"
                ? product.price.toFixed(0)
                : ""}
              /-
            </span>
          </div>
          <Button
            variant="default"
            className="bg-green text-white hover:bg-green/90 px-6 rounded-xl"
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </div>
  </Card>
);

// Merchandise Card Component
const MerchandiseCard = ({ product }: { product: Products }) => (
  <Card className="overflow-hidden bg-slate-50 rounded-xl shadow-lg">
    <div className="relative">
      <div className="aspect-square relative">
        <img
          src={product.images[0].url}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <button className="absolute top-4 right-4 p-2 text-gray-700 hover:text-gray-900">
          <Heart className="size-6 shrink-0 text-purple-600" />
        </button>
      </div>

      <CardContent className="p-6">
        <h3 className="text-2xl font-bold text-purple-800 mb-3">
          {product.name}
        </h3>
        <p className="text-sm text-purple-600 mb-4 line-clamp-2">
          {product.name}
        </p>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-baseline">
            <span className="text-xl font-bold text-purple-800">
              Rs{" "}
              {typeof product.price === "number"
                ? product.price.toFixed(0)
                : ""}
              /-
            </span>
          </div>
          <Button
            variant="default"
            className="bg-purple-600 text-white hover:bg-purple-700 px-8 rounded-full"
          >
            Shop Now
          </Button>
        </div>
      </CardContent>
    </div>
  </Card>
);

// Starter Kit Card Component
const StarterKitCard = ({ product }: { product: Products }) => (
  <Card className="overflow-hidden bg-orange-50 rounded-2xl shadow-md">
    <div className="relative">
      <div className="aspect-square relative">
        <img
          src={product.images[0].url}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <button className="absolute top-4 right-4 p-2 text-gray-700 hover:text-gray-900">
          <Heart className="size-6 shrink-0 text-orange-600" />
        </button>
      </div>

      <CardContent className="p-5">
        <h3 className="text-xl font-bold text-orange-800 mb-2">
          {product.name}
        </h3>
        <p className="text-sm text-orange-600 mb-3 line-clamp-2">
          {product.name}
        </p>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-baseline">
            <span className="text-lg font-bold text-orange-800">
              Rs{" "}
              {typeof product.price === "number"
                ? product.price.toFixed(0)
                : ""}
              /-
            </span>
          </div>
          <Button
            variant="default"
            className="bg-orange-600 text-white hover:bg-orange-700 px-6 rounded-lg"
          >
            Explore Kit
          </Button>
        </div>
      </CardContent>
    </div>
  </Card>
);

const ProductsList = ({ products }: ProductsListProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [displayedProducts, setDisplayedProducts] = useState<Products[]>([]);

  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setDisplayedProducts(products);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [products]);

  const brewBuchaProducts = displayedProducts.filter(
    (product) => product.category === "BrewBucha" && !product.isArchived
  );
  const merchandiseProducts = displayedProducts.filter(
    (product) => product.category === "Merchandise"
  );
  const starterKitProducts = displayedProducts.filter(
    (product) => product.category === "StarterKit"
  );

  const hasNoProducts = products.length === 0;

  if (hasNoProducts) {
    return (
      <section className="w-full py-16 px-4">
        <GlobalNoProductsCard />
      </section>
    );
  }

  const customStyles = `
  .swiper-pagination{
    margin-top:2rem;
   }
  .swiper-pagination-bullet {
    width: 8px !important;
    height: 8px !important;
    background: #0D2A25;
    opacity: 0.5 !important;
  }

  .swiper-pagination-bullet-active {
    background: #0D2A25 !important;
    opacity: 1 !important;
  }
`;
  return (
    <section className="w-full py-8 flex flex-col gap-12 mb-10">
      {/* BrewBucha Products */}
      {(isLoading || brewBuchaProducts.length > 0) && (
        <div className="w-full flex flex-col gap-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-green px-4">
            BrewBucha Beverages
          </h2>

          {/* Mobile Swiper View */}
          <div className="md:hidden w-full">
            <style>{customStyles}</style>
            {isLoading ? (
              <div className="px-4">
                <ProductCardSkeleton variant="brewbucha" />
              </div>
            ) : (
              <Swiper
                spaceBetween={16}
                slidesPerView={1}
                centeredSlides={true}
                loop={true}
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: false,
                }}
                pagination={{
                  dynamicBullets: true,
                  clickable: true,
                }}
                modules={[Autoplay, Pagination]}
                className="w-full px-4"
              >
                {brewBuchaProducts.map((product, index) => (
                  <SwiperSlide key={`brew-mobile-${product.id || index}`}>
                    <BrewBuchaCard product={product} />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>

          {/* Desktop Grid View */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
            {isLoading
              ? Array(3)
                  .fill(0)
                  .map((_, index) => (
                    <ProductCardSkeleton
                      key={`brew-skeleton-${index}`}
                      variant="brewbucha"
                    />
                  ))
              : brewBuchaProducts.map((product, index) => (
                  <BrewBuchaCard
                    key={`brew-${product.id || index}`}
                    product={product}
                  />
                ))}
          </div>
        </div>
      )}

      {/* Merchandise Products */}
      {(isLoading || merchandiseProducts.length > 0) && (
        <div className="w-full flex flex-col gap-6">
          <h2 className="text-3xl font-bold text-purple-800 px-4">
            Our Merchandise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
            {isLoading
              ? Array(3)
                  .fill(0)
                  .map((_, index) => (
                    <ProductCardSkeleton
                      key={`merch-skeleton-${index}`}
                      variant="merchandise"
                    />
                  ))
              : merchandiseProducts.map((product, index) => (
                  <MerchandiseCard
                    key={`merch-${product.id || index}`}
                    product={product}
                  />
                ))}
          </div>
        </div>
      )}

      {/* Starter Kit Products */}
      {(isLoading || starterKitProducts.length > 0) && (
        <div className="w-full flex flex-col gap-6">
          <h2 className="text-3xl font-bold text-orange-800 px-4">
            Starter Kits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
            {isLoading
              ? Array(3)
                  .fill(0)
                  .map((_, index) => (
                    <ProductCardSkeleton
                      key={`kit-skeleton-${index}`}
                      variant="starterkit"
                    />
                  ))
              : starterKitProducts.map((product, index) => (
                  <StarterKitCard
                    key={`kit-${product.id || index}`}
                    product={product}
                  />
                ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductsList;
