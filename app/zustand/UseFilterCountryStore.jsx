
import { create } from "zustand";
export const UseFilterCountryStore = create((set)=>({
    countryValue:"تمام کشور ها",
   setCountryValue:(newValue)=>set({countryValue:newValue})
}))