"use client"
import React from 'react'
import { IoSunnyOutline} from "react-icons/io5";
import { useThemestore } from '@/app/zustand/useThemeStore';
import { PiMoonThin } from "react-icons/pi";

function BtnToggleTheme() {
    const {isDark,toggleTheme} = useThemestore()
  return (
    <div className='h-full flex items-center px-2 lg:px-5'>
        <button onClick={toggleTheme}>
            <span className='text-2xl'>
                {isDark ? <IoSunnyOutline />: <PiMoonThin />}
            </span>
        </button>

    </div>
  )
}

export default BtnToggleTheme