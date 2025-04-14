import { create } from "zustand";
export const ModalHandler = create(
    (set)=>(
        {
            modal:false,
            setModal:()=>set((state)=>({modal:!state.modal}))
        }
    )
)