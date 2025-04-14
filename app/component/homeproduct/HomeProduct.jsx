"use client"
import React, { useEffect, useRef, useState } from 'react'
import Container from '../header/Container'
import { UseDataStore } from '@/app/zustand/useDataStore';
import Link from 'next/link';
import Card from '../cardItem/Card';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useContainerSize } from '@/app/zustand/UseContainerSiza';

function HomeProduct({ itemss }) {
    const { size } = useContainerSize();
    const { dataProduct, SetDataProduct } = UseDataStore();
    const [showButtons, setShowButtons] = useState(false);
    const slidref = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        fetch("https://67cd78d0dd7651e464ee7491.mockapi.io/api/v1/products")
            .then(response => response.json())
            .then(data => SetDataProduct(data))
            .catch(error => console.error('Error fetching products:', error));
    }, [SetDataProduct]);

    useEffect(() => {
        const checkOverflow = () => {
            if (slidref.current) {
                const hasOverflow = slidref.current.scrollWidth > slidref.current.clientWidth;
                setShowButtons(hasOverflow);
            }
        };

        checkOverflow();
        window.addEventListener('resize', checkOverflow);
        return () => window.removeEventListener('resize', checkOverflow);
    }, [dataProduct, size]);

    const nextSlideHandler = () => {
        if (!slidref.current) return;
        slidref.current.scrollBy({
            left: 300,
            behavior: "smooth",
        });
    };

    const prevSlideHandler = () => {
        if (!slidref.current) return;
        slidref.current.scrollBy({
            left: -300,
            behavior: "smooth",
        });
    };

    return (
        <Container>
            <section
                className="w-full shadow-sm dark:shadow-gray-700 rounded-2xl relative bg-gray-100 dark:bg-gray-800 overflow-hidden"
                ref={containerRef}
            >
                <div className='w-full flex flex-col relative'>
                    {/* هدر */}
                    <div className="flex items-center justify-between gap-5 py-4 px-6 border-b border-gray-200 dark:border-gray-600">
                        <h2 className='text-xl font-bold text-gray-800 dark:text-white'>{itemss[0]}</h2>
                        <Link
                            href={`/category/writing-supplies/${itemss[1]}`}
                            className="text-sm font-medium text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors flex items-center gap-1"
                        >
                            مشاهده همه
                            <FaAngleLeft className="text-xs" />
                        </Link>
                    </div>

                    {/* اسلایدر */}
                    <div className='w-full overflow-x-hidden py-4' ref={slidref}>
                        <div className='flex px-6 gap-4 w-max *:shrink-0 *:w-[180px] *:lg:w-[220px]'>
                            {dataProduct?.map(item => {
                                if (item.title === itemss[1]) {
                                    return (
                                        <Card
                                            key={item.id}
                                            xxx={item}
                                            styleSlide="min-w-[200px] lg:min-w-[240px] max-h-[260px] hover:shadow-md transition-shadow pl-10"
                                            darkstyle="bg-white dark:bg-gray-700 text-black dark:text-white"
                                        />
                                    )
                                }
                                return null;
                            })}
                        </div>
                    </div>

                    {/* دکمه‌های ناوبری */}
                    {showButtons && (
                        <>
                            <button
                                onClick={prevSlideHandler}
                                className="absolute top-1/2 -translate-y-1/2 right-2 bg-white/90 dark:bg-gray-700/90 text-amber-500 p-2 text-xl rounded-full shadow-lg hover:scale-110 transition-all z-10"
                                aria-label="اسلاید قبلی"
                            >
                                <FaAngleRight />
                            </button>
                            <button
                                onClick={nextSlideHandler}
                                className="absolute top-1/2 -translate-y-1/2 left-2 bg-white/90 dark:bg-gray-700/90 text-amber-500 p-2 text-xl rounded-full shadow-lg hover:scale-110 transition-all z-10"
                                aria-label="اسلاید بعدی"
                            >
                                <FaAngleLeft />
                            </button>
                        </>
                    )}
                </div>
            </section>
        </Container>
    )
}

export default HomeProduct;