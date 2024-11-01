import getProuct from "@/actions/products/get-product";
import getProducts from "@/actions/products/get-products";
import ProductDetails from "./_components/product-details";

interface ProductPageProps {
  params: {
    productId: string;
  };
}
const SingleProductPage = async ({ params }: ProductPageProps) => {
  const product = await getProuct(params.productId);
  const suggestedProducts = await getProducts({
    category: product.category,
  });
  return (
    <section className="w-full h-full flex flex-col mt-8 md:mt-10 gap-5 min-h-screen">
      <ProductDetails prodcut={product} />
    </section>
  );
};

export default SingleProductPage;
