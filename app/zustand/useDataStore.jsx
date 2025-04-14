import { create } from "zustand";
export const UseDataStore = create(
    (set)=>(
        {
            dataProduct:[],
            SetDataProduct:(newData)=>set((state)=>({dataProduct:newData}))
        }
    )
)