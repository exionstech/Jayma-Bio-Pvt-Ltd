import { Products } from "@prisma/client";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

const getProuct = async (id: string): Promise<Products> => {
  const res = await fetch(`${URL}/${id}`);

  return res.json();
};

export default getProuct;
