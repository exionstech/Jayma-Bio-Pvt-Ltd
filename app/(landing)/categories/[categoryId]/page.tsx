import getCategory from "@/actions/products/get-category";
import getProducts from "@/actions/products/get-products";

interface CategoryDetailsProps {
  params: {
    categoryId: string;
  };
}

const CategoryDetails = async ({ params }: CategoryDetailsProps) => {
  const category = await getCategory(params.categoryId);
  const products = await getProducts({
    category: category.name,
  });
  return (
    <section
      id="category"
      className="w-full min-h-screen py-8 md:py-12 mt-4 md:mt-8"
    >
      <div className="max-w-screen-2xl mx-auto px-5 md:px-8 lg:px-12 w-full flex flex-col gap-6 md:gap-8">
        {category.name}
      </div>
      {products.map((product) => (
        <div>
            {product.name}
        </div>
      ))}
    </section>
  );
};

export default CategoryDetails;
