import React from "react";
import ImageGrid from "../../_components/image-grid";
import { Button } from "@/components/ui/button";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  images: { url: string }[];
  isFeatured: boolean;
  isArchived: boolean;
  category: string;
  size: string;
  qty: number;
};

interface ProductDetailsProps {
  prodcut: Product;
}

const ProductDetails = ({ prodcut }: ProductDetailsProps) => {
  return (
    <div className="w-full h-full flex flex-col gap-4 max-w-screen-xl mx-auto">
      <div className="w-full flex gap-10 items-start justify-start">
        <div className="w-full  flex-1 items-start justify-start">
          <ImageGrid images={prodcut.images} title={prodcut.name} />
        </div>
        <div className="w-full flex flex-col items-start justify-start py-3 px-3 gap-8">
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-semibold">{prodcut.name}</h1>
            <p className="text-lg font-medium">{prodcut.description}</p>
          </div>
          <div className="w-full flex items-center justify-between py-3">
            <div className="flex items-center justify-center gap-2">
              {prodcut.discount > 0 && (
                <span className="text-xl font-medium text-[#CC0C39]">
                  {" "}
                  - {prodcut.discount}%
                </span>
              )}
              <h1 className="text-2xl md:text-3xl font-medium md:font-semibold text-green flex items-start ml-2">
                <span className="text-xl -pt-2 pr-">₹</span>
                {typeof prodcut.price === "number"
                  ? (
                      prodcut.price -
                      ((prodcut?.discount || 0) / 100) * prodcut.price
                    ).toFixed(0)
                  : ""}
                /-
              </h1>
            </div>
            <div className="flex items-center gap-5">
              <Button variant="outline" className="px-4 rounded-lg">
                Add to cart
              </Button>
              <Button className="px-4 rounded-lg">Buy Now</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
