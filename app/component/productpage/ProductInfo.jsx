"use client"
import React from 'react'
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { FaPlus, FaMinus } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { UseButtonAddBascket } from '@/app/zustand/UseButtonAddBascket';
import { UseDataStore } from '@/app/zustand/useDataStore';
import clsx from 'clsx';

function ProductInfo({ product }) {
  const { dataProduct } = UseDataStore();
  const { shoppingCart, setShoppingCart, removeShopingCart, increaseCounter, decreaseCounter } = UseButtonAddBascket();

  const selectedProduct = dataProduct.find(item =>
    `${item.title}-${item.id}` === product
  );

  const isInCart = shoppingCart.some(item => item.id === selectedProduct?.id);

  const formatPrice = (price) =>
    new Intl.NumberFormat('fa-IR').format(price);

  if (!selectedProduct) {
    return <div className="p-5 text-red-500 dark:text-red-400">محصول یافت نشد</div>;
  }

  const buttonStyle = clsx(
    "p-2 rounded-lg transition-all duration-300",
    "ring-2 ring-gray-300 hover:ring-amber-500",
    "dark:ring-gray-600 dark:hover:ring-amber-400"
  );

  return (
    <div className='p-5 max-w-4xl mx-auto'>
      <div className={clsx(
        "flex flex-col gap-5 w-full h-full p-5 rounded-2xl",
        "shadow-lg dark:shadow-gray-800 shadow-gray-200",
        "bg-white dark:bg-gray-800"
      )}>
        <div className='flex items-center border-b pb-3 border-gray-200 dark:border-gray-600'>
          <MdOutlineKeyboardArrowLeft className='text-4xl text-amber-500 hover:text-amber-600 transition-colors' />
          <h3 className='pr-2 text-xl font-bold text-gray-800 dark:text-gray-100'>
            {selectedProduct.description}
          </h3>
        </div>

        <div className='flex flex-wrap items-center gap-4'>
          {selectedProduct.discount && (
            <s className="text-gray-400 dark:text-gray-500 text-lg">
              {formatPrice(selectedProduct.price)} تومان
            </s>
          )}
          <div className='flex items-center gap-2'>
            <span className="text-2xl font-bold text-amber-600 dark:text-amber-500">
              {formatPrice(
                selectedProduct.discount
                  ? selectedProduct.price * (1 - selectedProduct.discount / 100)
                  : selectedProduct.price
              )}
            </span>
            <span className="text-lg text-gray-600 dark:text-gray-300">تومان</span>
          </div>
        </div>

        <div className='space-y-4'>
          <div className='space-y-2'>
            <h6 className='text-lg font-semibold text-gray-700 dark:text-gray-300'>ویژگی‌های محصول:</h6>
            <div className='space-y-1 text-gray-600 dark:text-gray-400'>
              {selectedProduct.Feature?.length > 0 ? (
                selectedProduct.Feature.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-amber-500">•</span>
                    <span>{item}</span>
                  </div>
                ))
              ) : <span className="text-gray-400">---</span>}
            </div>
          </div>

          <div className='space-y-2'>
            <h6 className='text-lg font-semibold text-gray-700 dark:text-gray-300'>رنگ:</h6>
            <div className="flex flex-wrap gap-2">
              {selectedProduct.color?.length > 0 ? (
                selectedProduct.color.map((color, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 rounded-full border-2 border-white shadow-md"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))
              ) : <span className="text-gray-400">---</span>}
            </div>
          </div>

          <div className='space-y-2'>
            <h6 className='text-lg font-semibold text-gray-700 dark:text-gray-300'>کشور سازنده:</h6>
            <p className="text-gray-600 dark:text-gray-400">{selectedProduct.country || '---'}</p>
          </div>
        </div>

        {selectedProduct.select && (
          <div className='space-y-2'>
            <label className='text-lg font-semibold text-gray-700 dark:text-gray-300'>انتخاب گزینه:</label>
            <select className={clsx(
              "w-full px-4 py-2 rounded-lg border",
              "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200",
              "focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            )}>
              <option value="">یک گزینه انتخاب کنید</option>
              {selectedProduct.select.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        )}

        <div className='mt-6'>
          <div className='flex flex-col items-center gap-4'>
            {isInCart ? (
              <div className='flex items-center gap-4 flex-wrap justify-center'>
                <button
                  className={buttonStyle}
                  onClick={() => increaseCounter(selectedProduct.id)}
                  aria-label="افزایش تعداد"
                >
                  <FaPlus className="text-amber-600 dark:text-amber-400" />
                </button>

                <span className="text-2xl font-medium min-w-[40px] text-center text-gray-700 dark:text-gray-300">
                  {shoppingCart.find(item => item.id === selectedProduct.id)?.counter || 0}
                </span>

                <button
                  className={buttonStyle}
                  onClick={() => decreaseCounter(selectedProduct.id)}
                  aria-label="کاهش تعداد"
                >
                  <FaMinus className="text-amber-600 dark:text-amber-400" />
                </button>

                <button
                  className={clsx(buttonStyle, "text-red-500 hover:ring-red-500")}
                  onClick={() => removeShopingCart(selectedProduct.id)}
                  aria-label="حذف از سبد خرید"
                >
                  <RiDeleteBin6Line className="text-lg" />
                </button>
              </div>
            ) : (
              <button
                className={clsx(
                  "flex items-center gap-3 px-6 py-3 rounded-lg",
                  "bg-amber-500 hover:bg-amber-600 text-white",
                  "transition-colors duration-300 shadow-md",
                  "dark:bg-amber-600 dark:hover:bg-amber-700"
                )}
                onClick={() => setShoppingCart(selectedProduct)}
              >
                <CiShoppingCart className="text-2xl" />
                <span className='text-lg'>افزودن به سبد خرید</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductInfo

