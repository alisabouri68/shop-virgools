'use client'
import React, { useState } from 'react'
import { CiShoppingBasket } from "react-icons/ci";
import Link from "next/link";
import Image from "next/image";
import fallbackImg from '../../../public/img/logo.png';
import { UseButtonAddBascket } from '@/app/zustand/UseButtonAddBascket';
import clsx from 'clsx';
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";

function Card({ xxx, styles, darkstyle, styleSlide }) {
    const { shoppingCart, setShoppingCart } = UseButtonAddBascket();
    const [imageKeys, setImageKeys] = useState({});

    const {
        id,
        img = [],
        title,
        description,
        price,
        discount,
        select,
    } = xxx;

    const formatPrice = (price) =>
        new Intl.NumberFormat('fa-IR').format(price);

    const currentImageKey = imageKeys[id] || 0;
    const discountedPrice = discount
        ? Math.abs(price - (price * (discount / 100)))
        : price;

    const handleImageChange = (productId, index) => {
        setImageKeys(prev => ({ ...prev, [productId]: index }));
    };

    return (
        <div className="pl-2 pb-2 flex">
            <div className={clsx(
                "flex flex-col grow rounded-lg overflow-hidden relative shadow-md group",
                "transition-all duration-300 hover:shadow-lg",
                darkstyle,
                discount && "before:content-[''] before:absolute before:top-2 before:left-2 before:w-8 before:h-8 before:bg-red-500 before:rounded-full"
            )}>
                <Link href={`/products/${title}-${id}`} className="flex flex-col justify-evenly duration-500 h-[85%]">
                    <div className="relative flex items-center justify-center h-48 overflow-hidden">
                        {img[currentImageKey]?.trim() ? (
                            <Image
                                className="rounded-2xl object-cover w-full h-full transition-all duration-300 group-hover:scale-105"
                                width={150}
                                height={150}
                                src={img[currentImageKey]?.trim() || fallbackImg.src}
                                alt={description}
                                unoptimized
                                onError={(e) => e.target.src = fallbackImg.src}
                                loading="lazy"
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                <span>در حال بارگذاری</span>
                            </div>
                        )}
                    </div>
                    <div className="p-2 space-y-2">
                        <p className="text-xs text-gray-700 line-clamp-2">{description}</p>

                        <div className="flex flex-col items-center">
                            {discount && (
                                <s className="text-gray-400 text-sm">{formatPrice(price)}</s>
                            )}
                            <div className="flex items-center gap-1 text-lg font-semibold">
                                <span>{formatPrice(discountedPrice)}</span>
                                <span className="text-sm">تومان</span>
                            </div>
                        </div>
                    </div>
                </Link>

                {discount && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold w-8 h-8 rounded-full flex items-center justify-center">
                        {`${discount}%`}
                    </div>
                )}

                <div className={clsx("bg-amber-500 h-[15%]", styles)}>
                    {img.length > 1 && (
                        <div className={clsx(
                            "hidden absolute items-center justify-between top-1/3 left-0 right-0 px-2",
                            "group-hover:flex",
                            styleSlide
                        )}>
                            <button
                                className="bg-white/80 p-1 rounded-full shadow-md hover:bg-white transition-all"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleImageChange(id, (currentImageKey - 1 + img.length) % img.length);
                                }}
                                aria-label="تصویر قبلی"
                            >
                                <FaAngleRight className="text-gray-800" />
                            </button>
                            <button
                                className="bg-white/80 p-1 rounded-full shadow-md hover:bg-white transition-all"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleImageChange(id, (currentImageKey + 1) % img.length);
                                }}
                                aria-label="تصویر بعدی"
                            >
                                <FaAngleLeft className="text-gray-800" />
                            </button>
                        </div>
                    )}
            <div className={clsx(
    "bg-amber-500 h-full flex items-center justify-center",
    "transition-colors duration-300 hover:bg-amber-600",
    styles
)}>
    {select === null ? (
        <button
            className="w-full h-full flex items-center justify-center text-2xl text-black hover:text-white transition-colors"
            onClick={(e) => {
                e.preventDefault();
                setShoppingCart(xxx);
            }}
            aria-label="افزودن به سبد خرید"
        >
            <CiShoppingBasket />
        </button>
    ) : (
        <Link
            href={`/products/${title}-${id}`}
            className="w-full h-full flex items-center justify-center text-sm lg:text-base font-medium text-black hover:text-white transition-colors"
        >
            انتخاب گزینه ها
        </Link>
    )}
</div>
                </div>
            </div>
        </div>
    );
}

export default Card;





















// {img.map((_, i) => (
//     <button
//         key={`${id}-${i}`}
//         onClick={() => handleImageChange(id, i)}
//         className={clsx(
//             "rounded-full transition-all duration-300 cursor-pointer",
//             currentImageKey === i
//                 ? "w-6 h-2 bg-amber-600"
//                 : "w-3 h-3 bg-amber-500 opacity-70"
//         )}
//         aria-label={`تصویر ${i + 1}`}
//     />
// ))}