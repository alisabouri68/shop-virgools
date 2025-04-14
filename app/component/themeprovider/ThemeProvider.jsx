'use client'
import React ,{useEffect} from 'react'
import { useThemestore } from '@/app/zustand/useThemeStore'
function ThemeProvider({children}) {
const {isDark} = useThemestore()
useEffect(() => {
  const root = document.documentElement;
  if (isDark) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }}, [isDark]);
  return <>{children}</>;
}

export default ThemeProvider