'use client'
import React, { useEffect, useState } from 'react'
import { UseButtonAddBascket } from '../zustand/UseButtonAddBascket'
import Image from 'next/image'
import { RiDeleteBin6Line } from "react-icons/ri";
import Container from '../component/header/Container'
import img from '../../public/img/logo.png'
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
function ShoppingCart() {
    const { shoppingCart, removeShopingCart, increaseCounter, decreaseCounter } = UseButtonAddBascket()
    const [priceList, setPriceList] = useState([])
    const formatPrice = (price) =>
        new Intl.NumberFormat('fa-IR').format(price);
    useEffect(() => {
        const newPrices = shoppingCart.map(item => {
            const itemPrice = item.discount
                ? item.price * (1 - item.discount / 100) * item.counter
                : item.price * item.counter;
            return itemPrice;
        });
        setPriceList(newPrices);
    }, [shoppingCart]);

    const totalPrice = priceList.reduce((sum, price) => sum + price, 0);
    return (

        <main className='flex  grow h-[70vh] overflow-y-scroll scrollbar-hide'>
            <Container>
                <div className='flex flex-wrap '>
                    <div className=" lg:w-[65%] w-full overflow-x-auto shadow-sm dark:shadow-gray-600 sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs  text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-5 py-3">
                                        تصویر
                                    </th>
                                    <th scope="col" className="px-1 py-3">
                                        محصول
                                    </th>
                                    <th scope="col" className="px-1 py-3">
                                        تعداد
                                    </th>
                                    <th scope="col" className="px-1 py-3 hidden lg:table-cell">
                                        قیمت
                                    </th>
                                    <th scope="col" className="px-1 py-3 hidden lg:table-cell">
                                        جمع جزء
                                    </th>
                                    <th scope="col" className="px-1 py-3">
                                        حذف
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {shoppingCart && shoppingCart.length > 0 ? shoppingCart.map((product) => (

                                    <tr key={product.id} className="bg-white border-b  dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="px-5 py-4">
                                            <Image
                                                className="w-16 md:w-32 max-w-full max-h-full rounded-lg"
                                                src={product.img && product.img[0] ? product.img[0] : img}
                                                alt={product.title || "logo"}
                                                width={200}
                                                height={200}
                                                quality={1}
                                            />

                                        </td>
                                        <td className="px-1 py-4 font-semibold text-gray-900 dark:text-white">
                                            <div className='flex flex-col'>
                                                <span>{product.description}</span>
                                                <span className="lg:hidden text-amber-500">
                                                    {
                                                        formatPrice(
                                                            product.discount
                                                                ? product.price * (1 - product.discount / 100) * product.counter
                                                                : product.price * product.counter)
                                                    }
                                                <span className="mr-2 text-foreground">تومان</span>
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-1 py-4">
                                            <div className='flex gap-5'>
                                                <div>
                                                    <button className='border rounded-lg p-1' onClick={() => increaseCounter(product.id)}>
                                                        <span>
                                                            <FaPlus />
                                                        </span>
                                                    </button>
                                                </div>
                                                <div className='min-w-4 max-w-4 flex items-center justify-center'>
                                                    <span>
                                                        {product.counter}
                                                    </span>
                                                </div>
                                                <div>
                                                    <button className='border rounded-lg p-1' onClick={() => decreaseCounter(product.id)}>
                                                        <span>
                                                            <FaMinus />
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-1 py-4 font-semibold text-gray-900 dark:text-white hidden lg:table-cell">
                                            {
                                                formatPrice(
                                                    product.discount
                                                        ? product.price * (1 - product.discount / 100)
                                                        : product.price)
                                            }
                                        </td>
                                        <td className="px-1 py-4 font-semibold text-gray-900 dark:text-white hidden lg:table-cell">
                                            <span className="">
                                                {
                                                    formatPrice(
                                                        product.discount
                                                            ? product.price * (1 - product.discount / 100) * product.counter
                                                            : product.price * product.counter)
                                                }
                                            </span>
                                            <span className="mr-2">تومان</span>
                                        </td>
                                        <td className="px-1 py-4">
                                            <button href="#" className="font-medium text-amber-600 text-3xl hover:underline cursor-pointer ml-2" onClick={() => removeShopingCart(product.id)}>
                                                <RiDeleteBin6Line />
                                            </button>
                                        </td>
                                    </tr>
                                )) : <tr>
                                    <td colSpan="6" className="text-center h-[65vh]">سبد خرید خالی است</td>
                                </tr>

                                }

                            </tbody>
                        </table>
                    </div>
                    <div className='lg:w-[35%] text-sm w-full shadow-sm dark:shadow-gray-600 p-4'>
                        <div className='*:py-3 sticky top-0 shadow-sm dark:shadow-gray-600 sm:rounded-lg p-4'>
                            <h6 className='text-xl font-bold mb-4'>جمع کل سبد خرید</h6>
                            <div className='flex justify-between mb-2 border-b'>
                                <span>جمع جزء:</span>
                                <span>
                                    {formatPrice(totalPrice)}
                                    <span className='mr-1'>تومان</span>
                                </span>
                            </div>
                            <div className='flex items-center'>
                                <div><span>حمل و نقل</span></div>
                                <div className='flex flex-col gap-3 items-end justify-end grow'>
                                    <div><span>ارسال پستی: 60,000 تومان</span></div>
                                    <div><span>گزینه های حمل و نقل در هنگام پرداخت به روز می شوند.</span></div>
                                    <div><span>محاسبه حمل و نقل</span></div>
                                </div>
                            </div>
                            <div className='border-t pt-2 border-b'>
                                <div className='flex justify-between font-bold'>
                                    <span>مبلغ قابل پرداخت:</span>
                                    <span className='text-amber-500'>
                                        {formatPrice(totalPrice + 60000)}
                                        <span className='mr-1 text-foreground'>تومان</span>
                                    </span>
                                </div>
                            </div>
                            <div className='flex'><button className='bg-amber-500 text-white w-full rounded-lg py-3'><span>ادامه جهت تسویه حساب</span></button></div>
                        </div>
                    </div>
                </div>
            </Container>
        </main>

    )
}

export default ShoppingCart