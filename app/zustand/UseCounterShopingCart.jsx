import { create } from "zustand";
export const UseCounterShopingCart = create((set) => ({
    counter: 1,
    increaseCounters: () => set((state) => {
        if (state.counter < 10) {
            return { counter: state.counter + 1 }
        }else{
            return { counter: 10 }
        }
    }),
    decreaseCounters: () => set((state) => {
        if (state.counter > 1) {
            return {
                counter: state.counter - 1
            }
        }else{
         return{
          counter: 1   
        }   
        }
    })
}))