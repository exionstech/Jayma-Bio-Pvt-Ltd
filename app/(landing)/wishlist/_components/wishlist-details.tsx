"use client";

import useWishlist from "@/hooks/products/use-wishlist";
import ProductsList from "../../products/_components/products-list";
import CategotyFilter from "../../products/_components/category-filter";
import WhictListButton from "../../products/_components/wishlist-action";
import CartActionButton from "../../products/_components/cart-action";
import { Category } from "@/types/products-related-types";

interface WishlistDetailsProps {
  categories: Category[];
}

const WishlistDetails = ({ categories }: WishlistDetailsProps) => {
  const wishlist = useWishlist();
  const products = wishlist.items;
  return (
    <section
      id="products"
      className="w-full flex flex-col gap-4 min-h-screen mt-8 md:mt-12 px-5 md:px-10 lg:px-12 max-w-screen-2xl mx-auto"
    >
      <div className="w-full flex items-center justify-center md:justify-end pt-5">
        <div className="flex items-center gap-3 md:gap-5">
          <div className="flex items-center justify-center">
            <CategotyFilter categories={categories} />
          </div>
          <WhictListButton />
          <CartActionButton />
        </div>
      </div>
      <ProductsList products={products} />
    </section>
  );
};

export default WishlistDetails;
