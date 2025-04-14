import { create } from "zustand";
import { persist } from "zustand/middleware";
export const UseButtonAddBascket = create(
  persist(
    (set, get) => ({
      shoppingCart: [],
      counter: 1,
      setShoppingCart: (newProduct) =>
        set((state) => {
          const exists = state.shoppingCart.find((item) => item.id === newProduct.id);
          if (exists) {
            return {
              shoppingCart: state.shoppingCart.map((item) =>
                item.id === newProduct.id
                  ? { ...item, counter: (item.counter || 1) + 1 }
                  : item
              ),
            };
          }
          return {
            shoppingCart: [...state.shoppingCart, { ...newProduct, counter: 1 }],
          };
        }),
      removeShopingCart: (id) =>
        set((state) => ({
          shoppingCart: state.shoppingCart.filter((item) => item.id !== id),
        })),
      increaseCounter: (id) =>
        set((state) => ({
          shoppingCart: state.shoppingCart.map((item) =>
            item.id === id && (item.counter || 1) < 10
              ? { ...item, counter: item.counter + 1 }
              : item
          ),
        })),
      decreaseCounter: (id) =>
        set((state) => ({
          shoppingCart: state.shoppingCart.map((item) =>
            item.id === id && (item.counter || 1) > 1
              ? { ...item, counter: item.counter - 1 }
              : item
          ),
        })),
    }),
    {
      name: "shoppingCart",
    }
  )
);