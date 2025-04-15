"use client"
import { ModalHandler } from '@/app/zustand/ModalStore'
import React from 'react'
import clsx from 'clsx'
export default function Modal() {
  const { modal, setModal } = ModalHandler()
    return <div className={`w-screen min-h-screen absolute top-0 right-0 bg-gray-900 opacity-80 ${modal ? 'flex' : 'hidden'}`} onClick={setModal}></div>
}
