import { create } from "zustand";

export const useContainerSize = create((set) => ({
  size: 0,
  resizeHandler: (newSize) => set({ size: newSize }),
}));