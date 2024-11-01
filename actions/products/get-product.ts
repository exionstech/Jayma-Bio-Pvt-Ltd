
import { Products } from "@/types/products-related-types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

const getProuct = async (id: string): Promise<Products> => {
  const res = await fetch(`${URL}/${id}`);

  return res.json();
};

export default getProuct;
