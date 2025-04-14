"use client"
import React, { useEffect, useCallback } from 'react'
import { ModalParentHandler } from '@/app/zustand/ModalStoreParent'
import FilterPrice from "@/app/component/filtering/filterprice/FilterPrice"
import FilterCountry from "@/app/component/filtering/filtercountry/FilterCountry"
import SearchInput from '../header/SearchInput'
import clsx from 'clsx'

const MODAL_COMPONENTS = {
  1: <FilterCountry styles="grid gap-5 min-w-full bg-[var(--background)] p-5" styles2="flex justify-around items-center" />,
  2: <FilterPrice />,
  3: <SearchInput />
}

function ModalParent() {
  const { isModal, setIsModal, index } = ModalParentHandler()

  const updateBodyClass = useCallback((shouldAdd) => {
    document.body.classList.toggle("overflow-y-hidden", shouldAdd)
  }, [])

  useEffect(() => {
    updateBodyClass(isModal)
    return () => updateBodyClass(false)
  }, [isModal, updateBodyClass])

  const modalClasses = clsx(
    'w-screen h-screen justify-center items-center fixed top-0 right-0 bg-[#0000008a] dark:bg-[#a5a3a38c]',
    {
      'flex z-50': isModal,
      'hidden z-0': !isModal,
    }
  )

  const contentClasses = clsx(
    'flex  px-5 min-w-full h-min',
    {
      'rounded-t-4xl': index === 3,
      'items-center rounded-t-2xl': index !== 3,
    }
  )

  if (!isModal) return null

  return (
    <div
      className={modalClasses}
      onClick={setIsModal}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={contentClasses}
        onClick={(e) => e.stopPropagation()}
      >
        {MODAL_COMPONENTS[index]}
      </div>
    </div>
  )
}

export default ModalParent