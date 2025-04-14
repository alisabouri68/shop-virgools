"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import img from '../../../public/img/logo.png'
import { UseDataStore } from '@/app/zustand/useDataStore';
import clsx from 'clsx'

function ProductSlider({ product }) {
    const { dataProduct } = UseDataStore()
    const [selectedImageIndex, setSelectedImageIndex] = useState(0)

    const currentProduct = dataProduct.find(item =>
        `${item.title}-${item.id}` === product
    )

    useEffect(() => {
        setSelectedImageIndex(0)
    }, [product])

    if (!currentProduct) {
        return (
            <div className="relative aspect-square bg-gray-100 rounded-2xl animate-pulse">
                <Image
                    src={img}
                    fill
                    alt="محصول یافت نشد"
                    className="object-contain p-8 opacity-50"
                />
            </div>
        )
    }

    return (
        <div className="relative group">
            <div className="relative aspect-square bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden">
                <Image
                    src={currentProduct.img[selectedImageIndex] || img}
                    fill
                    sizes="(max-width: 768px) 100vw, 75vw"
                    className="object-contain p-4 hover:scale-105 transition-transform"
                    alt={`تصویر اصلی ${currentProduct.title}`}
                    priority
                />
            </div>

            <div className="absolute bottom-4 inset-x-0 px-4">
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent dark:scrollbar-thumb-gray-600">
                    {currentProduct.img.map((imgSrc, index) => (
                        <button
                            key={`${currentProduct.id}-${index}`}
                            onClick={() => setSelectedImageIndex(index)}
                            className={clsx(
                                "shrink-0 p-1 rounded-lg transition-all",
                                "ring-2 ring-transparent hover:ring-amber-500",
                                index === selectedImageIndex
                                    ? 'bg-amber-500/20 ring-amber-500'
                                    : 'bg-gray-800/20 hover:bg-amber-500/10'
                            )}
                            aria-label={`انتخاب تصویر ${index + 1}`}
                        >
                            <div className="relative w-16 h-16">
                                <Image
                                    src={imgSrc || img}
                                    fill
                                    sizes="64px"
                                    className="rounded-md object-cover"
                                    alt={`تصویر ${index + 1} از ${currentProduct.title}`}
                                    loading="lazy"
                                />
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProductSlider
