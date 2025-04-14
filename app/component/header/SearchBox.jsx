"use client"
import React from 'react'
import { CiSearch } from "react-icons/ci";
import { ModalParentHandler} from '@/app/zustand/ModalStoreParent';
function SearchBox() {
    const {isModal,index  ,setIsModal ,setIndex }=ModalParentHandler()
    const clickHandler =()=>{
        setIsModal()
        setIndex(3)
    }
    return (
        <div className='h-full flex items-center relative px-2 lg:px-5' > 
            <button onClick={clickHandler}>
                <span className='text-2xl '>
                    <CiSearch />
                </span>
            </button>
        </div>

    )
}

export default SearchBox