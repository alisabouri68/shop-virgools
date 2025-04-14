'use client'
import Image from 'next/image'
import React, { useRef, useState, useEffect } from 'react'
import x1 from '../../../public/img/Rectangle 99.jpg'
import x2 from '../../../public/img/Rectangle 99.jpg'
import x3 from '../../../public/img/Slider_Element_BOSS_Original_Pastel_1860x750px 1.jpg'
import x4 from '../../../public/img/Rectangle 100.jpg'
import img from '../../../public/img/logo.png'
function Slider() {
    const imgSrc = [x1, x2, x3, x4]
    const [activeIndex, setActiveIndex] = useState(0)
    const sliderRef = useRef(null)
    useEffect(() => {
        const interval = setInterval(() => {
            if (activeIndex === imgSrc.length) setActiveIndex(0)
            else setActiveIndex(prev => prev + 1)
        }, 6000)
        return () => clearInterval(interval)
    }, [imgSrc.length])
    useEffect(() => {
        if (sliderRef.current && activeIndex < imgSrc.length) {
            sliderRef.current.scrollTo({
                left: -(activeIndex * sliderRef.current.offsetWidth),
                behavior: 'smooth',
            });
        } else {
            sliderRef.current.scrollTo({
                left: 0,
                behavior: 'auto',
            });
            setActiveIndex(0)
        }
    }, [activeIndex])
    return (
        <div className="relative h-96 w-full">
            <div
                ref={sliderRef}
                className="flex h-full w-full snap-x snap-mandatory overflow-x-auto scrollbar-hide"
            >
                {imgSrc.map((item, index) => (
                    <div
                        key={index}
                        className="relative h-full min-w-full shrink-0 snap-center"
                    >
                        <Image
                            src={item || img}
                            alt={`Slider image ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="(min-width: 768px) 100vw, 75vw"
                            priority={index === 0}
                        />
                    </div>
                ))}
            </div>
            <div className="absolute bottom-4 left-[50%] flex -translate-x-[50%] gap-2">
                {imgSrc.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={`h-3 rounded-full transition-all duration-300 ${activeIndex === index
                            ? 'w-6 bg-white'
                            : 'w-3 bg-white/50'
                            }`}
                    />
                ))}
            </div>
        </div>
    )
}
export default Slider