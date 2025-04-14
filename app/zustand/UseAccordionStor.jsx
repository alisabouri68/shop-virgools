import { create } from "zustand";
export const useAccordionStore = create((set)=>({
    isOpen :null,
    setIsopen:(index)=>set((state)=>({isOpen:state.isOpen === index ? null : index}))
}))