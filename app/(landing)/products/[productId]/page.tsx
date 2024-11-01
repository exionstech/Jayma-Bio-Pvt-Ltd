import getProduct from "@/actions/products/get-product";
import getProducts from "@/actions/products/get-products";
import ProductDetails from "./_components/product-details";
import { IoIosHeartEmpty } from "react-icons/io";
import RecommendedProducts from "./_components/recommended-products";
import { getProductAboutDetailsByCategory } from "@/lib/utils";
import { Metadata } from "next";

interface ProductPageProps {
  params: {
    productId: string;
  };
}

export const metadata: Metadata = {
  title: `Product | Jayma Bio Innovations`,
};

const SingleProductPage = async ({ params }: ProductPageProps) => {
  const product = await getProduct(params.productId);

  let suggestedProducts = await getProducts({
    category: product.category,
  });

  suggestedProducts = suggestedProducts.filter(
    (suggestedProduct) => suggestedProduct.id !== product.id
  );

  const aboutProduct = getProductAboutDetailsByCategory(product.category);
  return (
    <section className="w-full h-full flex flex-col mt-6 md:mt-10 gap-6 min-h-screen px-4 md:px-10 lg:px-14 max-w-screen-2xl mx-auto">
      <div className="w-full flex items-center justify-end pt-3 md:pt-5">
        <div className="flex items-center gap-3 md:gap-5">
          <div className="w-8 md:w-10 flex items-center justify-center cursor-pointer">
            <IoIosHeartEmpty className="size-6 md:size-7 shrink-0 fill-green" />
          </div>
          <div className="w-8 md:w-10 flex items-center justify-center cursor-pointer">
            <img
              src="/products/cart.svg"
              alt="cart-icon"
              className="size-5 md:size-7 shrink-0"
            />
          </div>
        </div>
      </div>
      <ProductDetails prodcut={product} aboutProduct={aboutProduct} />
      {suggestedProducts.length > 0 && (
        <RecommendedProducts products={suggestedProducts} />
      )}
    </section>
  );
};

export default SingleProductPage;
