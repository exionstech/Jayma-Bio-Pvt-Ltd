import { Input } from "@/components/ui/input";
import { IoIosHeartEmpty } from "react-icons/io";
import CategotyFilter from "./category-filter";
import ProductsList from "./products-list";
import { Category, Products } from "@/types/products-related-types";

interface ProductsProps {
  categories: Category[];
  products: Products[];
}

const ProductsSection = ({ categories, products }: ProductsProps) => {
  return (
    <section
      id="products"
      className="w-full flex flex-col gap-4 min-h-screen mt-8 md:mt-12 px-5 md:px-10 lg:px-12 max-w-screen-2xl mx-auto"
    >
      <div className="w-full flex items-center justify-between pt-5">
        <div className="flex items-center justify-center">
          <Input
            placeholder="Search a product"
            className="rounded-full h-[40px] w-[340px] focus:border-black/30 px-4"
          />
        </div>
        <div className="flex items-center gap-5">
          <div className="flex items-center justify-center">
            <CategotyFilter categories={categories} />
          </div>
          <div className="w-10 flex items-center justify-center cursor-pointer">
            <IoIosHeartEmpty className="size-7 shrink-0 fill-green" />
          </div>
          <div className="w-10 flex items-center justify-center cursor-pointer">
            <img
              src="/products/cart.svg"
              alt="cart-icon"
              className="size-7 shrink-0"
            />
          </div>
        </div>
      </div>
      <div>
        <ProductsList products={products} />
      </div>
    </section>
  );
};

export default ProductsSection;
