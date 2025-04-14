'use client'
import Link from 'next/link';
import React from 'react'
import { CiShoppingBasket } from "react-icons/ci";
import { UseButtonAddBascket } from '@/app/zustand/UseButtonAddBascket';
function ShopingCart() {
    const { shoppingCart } = UseButtonAddBascket()
    return (
        <div className='h-full flex items-center relative px-2 lg:px-5'>
            <Link href='/shoppingcart'>
                <CiShoppingBasket className='text-2xl' />
            </Link>
            {
              shoppingCart&& shoppingCart.length > 0 ?
                    <span className='bg-red-500 min-w-6 min-h-6  rounded-full flex items-center justify-center text-white absolute top-4 right-0'>
                            {shoppingCart.length}
                    </span>:null
            }

        </div>
    )
}

export default ShopingCart