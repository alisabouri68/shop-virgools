import { create } from "zustand";
export const ModalParentHandler = create(
    (set)=>(
        {
        isModal:false,
        index:null,
        setIsModal:()=>set((state)=>({isModal:!state.isModal})),
        setIndex:(newIndex)=>set({index:newIndex})
    }
)
)