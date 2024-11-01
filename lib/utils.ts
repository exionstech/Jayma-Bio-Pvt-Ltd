import { CategoryBasedProductDetails } from "@/constants/constant-product-details/details";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const scrollToNext = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }
};

export function getProductAboutDetailsByCategory(categoryName: string) {
  return CategoryBasedProductDetails.find(
    (product) => product.categoryName === categoryName
  );
}
