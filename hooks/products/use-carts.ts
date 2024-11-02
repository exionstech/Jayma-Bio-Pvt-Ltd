import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Products } from "@/types/products-related-types";
import { toast } from "sonner";

interface CartItem extends Products {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (data: Products) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
  updateItemQuantity: (id: string, quantity: number) => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: Products) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);

        if (existingItem) {
          toast.info("Item already in cart");
          return;
        }

        set({ items: [...currentItems, { ...data, quantity: 1 }] });
        toast.success("Item added to cart");
      },
      removeItem: (id: string) => {
        const updatedItems = get().items.filter((item) => item.id !== id);
        set({ items: updatedItems });
        toast.success("Item removed from cart");
      },
      removeAll: () => {
        set({ items: [] });
        toast.success("All items removed from cart");
      },
      updateItemQuantity: (id: string, quantity: number) => {
        if (quantity < 1) {
          toast.error("Quantity must be at least 1");
          return;
        }

        const updatedItems = get().items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        );
        set({ items: updatedItems });
        toast.success("Item quantity updated");
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
