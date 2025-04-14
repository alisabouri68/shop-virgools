import React, { useEffect, useRef, useState } from 'react'
import { FaPenAlt } from "react-icons/fa";
import Container from '../header/Container'
import { UseDataStore } from '@/app/zustand/useDataStore';
import Link from 'next/link';
import Card from '../cardItem/Card';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

function SliderProduct() {
    const { SetDataProduct, dataProduct } = UseDataStore();
    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false);
    const slidref = useRef();

    useEffect(() => {
        fetch("https://67cd78d0dd7651e464ee7491.mockapi.io/api/v1/products")
            .then(response => response.json())
            .then(data => SetDataProduct(data))
            .catch(error => console.error('Error fetching products:', error));
    }, [SetDataProduct]);

    useEffect(() => {
        const slider = slidref.current;
        if (!slider) return;

        const handleScroll = () => {
            setIsAtStart(slider.scrollLeft === 0);
            setIsAtEnd(slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 1);
        };

        slider.addEventListener('scroll', handleScroll);
        return () => slider.removeEventListener('scroll', handleScroll);
    }, [dataProduct]);

    const nextSlideHandler = () => {
        if (!slidref.current) return;
        const slideWidth = slidref.current.children[0]?.children[0]?.offsetWidth || 0;
        slidref.current.scrollBy({
            left: slideWidth * 2,
            behavior: "smooth",
        });
    };

    const prevSlideHandler = () => {
        if (!slidref.current) return;
        const slideWidth = slidref.current.children[0]?.children[0]?.offsetWidth || 0;
        slidref.current.scrollBy({
            left: -slideWidth * 2, 
            behavior: "smooth",
        });
    };

    return (
        <Container>
            <section className="w-full bg-rose-700 bg-gradient-to-r from-rose-700 to-rose-600 rounded-2xl relative overflow-hidden shadow-lg bgimage">
                <div className='w-full flex flex-col relative'>
                    <div className="text-white flex items-center gap-5 py-5 px-6">
                        <div className='text-3xl'><FaPenAlt /></div>
                        <h2 className='text-2xl font-bold'>لوازم تحریر</h2>
                        <Link
                            href="/category/writing-supplies"
                            className="bg-white rounded-lg px-4 py-1.5 text-rose-700 hover:bg-gray-100 transition-colors font-medium text-sm"
                        >
                            مشاهده همه
                        </Link>
                    </div>

                    <div className='w-full overflow-x-hidden pb-4' ref={slidref}>
                        <div className='flex px-6 gap-4 w-max *:shrink-0 *:w-[180px] *:lg:w-[220px]'>
                            {dataProduct?.map(item => (
                                <Card
                                    key={item.id}
                                    xxx={item}
                                    styleSlide="min-w-[200px] lg:min-w-[240px] max-h-[260px] pl-10"
                                    darkstyle="bg-white text-black"
                                />
                            ))}
                        </div>
                    </div>

                    {!isAtEnd && (
                        <button
                            onClick={prevSlideHandler}
                            className='absolute top-1/2 -translate-y-1/2 left-2 bg-white/90 text-rose-700 p-2 text-xl rounded-full shadow-md hover:bg-white transition-all z-10'
                            aria-label="اسلاید قبلی"
                        >
                            <FaAngleRight />
                        </button>
                    )}

                    {!isAtStart&& dataProduct?.length > 2 && (
                        <button
                            onClick={ nextSlideHandler}
                            className='absolute top-1/2 -translate-y-1/2 right-2 bg-white/90 text-rose-700 p-2 text-xl rounded-full shadow-md hover:bg-white transition-all z-10'
                            aria-label="اسلاید بعدی"
                        >
                            <FaAngleLeft />
                        </button>
                    )}
                </div>
            </section>
        </Container>
    )
}

export default SliderProduct;