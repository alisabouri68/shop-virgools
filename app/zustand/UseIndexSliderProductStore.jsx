import { create } from "zustand";
export const UseIndexSliderProductStore = create((set)=>({
    indexImgSliderPruduct:[],
    setIndexImgSliderPruduct:(a)=>set({indexImgSliderPruduct:a})
}))