import React from "react";

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
  return(
    <div>
      {/* Product Image */}
      </div>
  )
};

export default ProductDetails;
