import { Products } from "@/types/products-related-types";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
  size?: string;
  isFeatured?: boolean;
  category?: string;
}

const getProducts = async (query: Query): Promise<Products[]> => {
  const queryString = qs.stringify({
    size: query.size,
    isFeatured: query.isFeatured,
    category: query.category,
  });

  const url = `${URL}?${queryString}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: Products[] = await res.json();

  return data;
};

export default getProducts;
