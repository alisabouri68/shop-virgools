import { create } from "zustand";
export const UseFilterBrandStore = create((set)=>({
    brandValue : "تمام برند ها",
    setBrandValue : (newBrandValue)=> set({brandValue:newBrandValue})
}))