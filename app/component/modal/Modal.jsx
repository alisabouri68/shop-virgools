"use client"
import React, { useEffect } from 'react'
import { ModalHandler } from '@/app/zustand/ModalStore'
function Modal() {
    const {modal , setModal}=ModalHandler()
      useEffect(() => {
        if (modal) {
          document.body.classList.add("overflow-y-hidden");
        } else {
          document.body.classList.remove("overflow-y-hidden");
        }
        return () => {
          document.body.classList.remove("overflow-y-hidden");
        };
      }, [modal]);
  return (
  
<>
<div className={`w-screen h-screen absolute top-0 right-0 bg-gray-900 opacity-80 ${modal?'flex':'hidden'}`} onClick={setModal}>

</div>

</>
)
  
}

export default Modal