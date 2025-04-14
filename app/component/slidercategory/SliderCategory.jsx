import clsx from 'clsx'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { useContainerSize } from "@/app/zustand/UseContainerSiza";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { dbmegamenu } from "@/app/component/header/db";
import Image from "next/image";
import Link from 'next/link';
export default function SliderCategory({ id }) {
    const sliderRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(0)
    const { size } = useContainerSize()
    const SLIDER_SENSITIVITY = 0.9;
    const scrollToLeft = useCallback(() => {
        sliderRef.current?.scrollBy({ left: -size, behavior: "smooth" });
    }, [size]);

    const scrollToRight = useCallback(() => {
        sliderRef.current?.scrollBy({ left: size, behavior: "smooth" });
    }, [size]);
    const sliderNavClass = "absolute top-[40%] overflow-hidden border border-gray-400 text-amber-500 bg-white/80 dark:bg-gray-700/80 hover:bg-white dark:hover:bg-gray-700 transition-all duration-200 text-4xl flex items-center justify-center h-20 w-10 shadow-lg backdrop-blur-sm";
    const endDrag = () => {
        setIsDragging(false);
    };
    const handleDrag = useCallback((e) => {
        if (!isDragging) return;
        const x = e.pageX - size;
        const walk = (x - startX) * SLIDER_SENSITIVITY;
        sliderRef.current.scrollLeft = scrollLeft - walk;
    }, [isDragging, size, startX, scrollLeft]);

    const handleDragStart = useCallback((e) => {
        setIsDragging(true);
        setStartX(e.pageX - size);
        setScrollLeft(sliderRef.current.scrollLeft);
    }, [size]);

    const handleTouchStart = useCallback((e) => {
        setIsDragging(true);
        setStartX(e.touches[0].pageX - size);
        setScrollLeft(sliderRef.current.scrollLeft);
    }, [size]);
    const renderSliderItems = useMemo(() => {
        if (!dbmegamenu?.length) return <p>No data available.</p>;

        return dbmegamenu.flatMap(item =>
            item.menu?.[1] === id
                ? item.submenu?.map((val, i) => (
                    <Link
                        href={`/category/${item.menu[1]}/${val[1]}`}
                        className="p-3 flex"
                        key={i}
                        style={{ minWidth: size / 6 + "px" }}
                    >
                        <div className="w-full rounded-lg gap-1 grid overflow-hidden bg-gray-100 dark:bg-gray-700 shadow-md hover:shadow-lg transition-all duration-300 p-2 hover:scale-105">
                            <Image
                                src={val[2]}
                                width={300}
                                height={300}
                                alt={val[0]}
                                className="rounded-lg w-[300px] h-[300px]"
                                draggable="false"
                            />
                            <span>{val[0]}</span>
                        </div>
                    </Link>
                ))
                : []
        );
    }, [dbmegamenu, id, size]);
    return (
        <div className="flex flex-col w-full overflow-hidden scrollbar-hide bg-gray-200 p-4 dark:bg-gray-600 rounded-lg relative text-gray-800 dark:text-gray-100 ">
            <div>
                <h6 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">دسته بندی‌ها</h6>
            </div>
            <div
                className="flex overflow-hidden *:shrink-0 cursor-grab select-none scroll-smooth"
                ref={sliderRef}
                onMouseDown={handleDragStart}
                onTouchStart={handleTouchStart}
                onMouseMove={handleDrag}
                onTouchMove={handleDrag}
                onMouseUp={endDrag}
                onTouchEnd={endDrag}
                onMouseLeave={endDrag}
            >
                {renderSliderItems}
            </div>

            <div className={clsx(sliderNavClass, "left-0 rounded-r-2xl")}>
                <button onClick={scrollToLeft}>
                    <FaAngleLeft />
                </button>
            </div>

            <div className={clsx(sliderNavClass, "right-0 rounded-l-2xl")}>
                <button onClick={scrollToRight}>
                    <FaAngleRight />
                </button>
            </div>
        </div>)
}
