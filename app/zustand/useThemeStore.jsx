import {create} from "zustand"
import {persist}from 'zustand/middleware'
export const useThemestore = create((persist(
    (set)=>({
        isDark:false,
        toggleTheme:()=>set((state)=>({isDark: !state.isDark}))
    }),
    {
        name:'theme'
    }
)))