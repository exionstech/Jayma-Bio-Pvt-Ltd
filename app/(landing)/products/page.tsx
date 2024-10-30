import { MaxWrapper } from "@/components/shared/max-wrapper";
import React from "react";
import ProductsSection from "./_components/products-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products | Jayma Bio Innovations",
};

const ProductsPage = () => {
  return (
    <MaxWrapper>
      <ProductsSection />
    </MaxWrapper>
  );
};

export default ProductsPage;
