import { create } from "zustand";
export const UseFilterCountry = create((set)=>({
    country:[],
    setCountryIndex:(newCountry)=>set({country:newCountry})
}))