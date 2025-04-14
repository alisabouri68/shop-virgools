"use client"
import React, { useEffect, useState, useCallback } from 'react'
import Container from './Container'
import { FaFire, FaSearch } from "react-icons/fa";
import { PulseLoader } from 'react-spinners'
import Link from 'next/link';
import { ModalParentHandler } from '@/app/zustand/ModalStoreParent'
import clsx from 'clsx'

function SearchInput() {
    const { setIsModal } = ModalParentHandler()
    const [val, setVal] = useState("")
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [isTyping, setIsTyping] = useState(false)

    useEffect(() => {
        const controller = new AbortController()
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "https://67cd78d0dd7651e464ee7491.mockapi.io/api/v1/products",
                    { signal: controller.signal }
                )
                if (!response.ok) throw new Error('خطا در دریافت داده‌ها')
                setData(await response.json())
            } catch (err) {
                if (err.name !== 'AbortError') {
                    setError(err.message || 'خطا در دریافت اطلاعات')
                }
            } finally {
                setLoading(false)
            }
        }
        fetchData()
        return () => controller.abort()
    }, [])

    const filteredData = useCallback(() => {
        if (!val) return [];
        const searchTerm = val.toLowerCase();
        return data.filter(item =>
            item.description?.toLowerCase().includes(searchTerm)
        );
    }, [val, data]);

    const popularSearches = data.slice(0, 5)

    return (
        <div className='w-full h-full px-5 ml-3 rounded-lg bg-[var(--background)]'>
            <Container>
                <div className='w-full flex flex-col gap-5 p-5'>
                    <div className='relative '>
                        <input
                            className={clsx(
                                "px-5 py-3 w-full shadow-sm outline-none",
                                "rounded-2xl pr-12 transition-all duration-300",
                                "dark:bg-gray-800 dark:border-gray-700",
                                "focus:ring-2 focus:ring-amber-500"
                            )}
                            placeholder='جستجو...'
                            value={val}
                            onChange={(e) => {
                                setVal(e.target.value)
                                setIsTyping(true)
                            }}
                            onBlur={() => setIsTyping(false)}
                            type="text"
                            aria-label='جستجوی محصولات'
                        />
                        <FaSearch className='absolute right-4 top-1/2 -translate-y-1/2 opacity-50' />
                    </div>

                    {loading && (
                        <div className='flex justify-center py-8' aria-live="polite">
                            <PulseLoader color='#6b7280' size={10} />
                        </div>
                    )}

                    {error && (
                        <div className='text-red-500 text-center py-4 flex flex-col items-center gap-2'>
                            <span>⚠️</span>
                            {error}
                        </div>
                    )}

                    {!val && (
                        <div className='grid gap-4'>
                            <div className='flex gap-3 items-center text-orange-500'>
                                <FaFire aria-hidden="true" />
                                <h6 className='font-semibold'>جستجوهای پرطرفدار</h6>
                            </div>
                            <div
                                className='flex flex-wrap gap-3'
                                role="listbox"
                                aria-label='جستجوهای پرطرفدار'
                            >
                                {popularSearches.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setVal(item.description)}
                                        className={clsx(
                                            "px-4 py-2 rounded-xl transition-colors",
                                            "bg-gray-100 hover:bg-gray-200",
                                            "dark:bg-gray-700 dark:hover:bg-gray-600"
                                        )}
                                        aria-label={`جستجوی ${item.description}`}
                                    >
                                        {item.description}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {!loading && !error && val && (
                        <div
                            className={clsx(
                                "grid min-w-full max-h-[500px] overflow-y-auto",
                                "pb-4 rounded-lg p-3 space-y-3",
                                "scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent",
                                "dark:scrollbar-thumb-gray-600"
                            )}
                            role="region"
                            aria-live="polite"
                        >
                            {filteredData().length > 0 ? (
                                <>
                                    <p className='text-sm text-gray-500'>
                                        {filteredData().length} نتیجه یافت شد
                                    </p>
                                    {filteredData().map((item) => (
                                        <Link
                                            href={`/products/${encodeURIComponent(item.title)}-${item.id}`}
                                            key={item.id}
                                            className={clsx(
                                                "p-4 rounded-xl shadow-sm transition-shadow",
                                                "bg-white hover:shadow-md",
                                                "dark:bg-gray-800 dark:hover:bg-gray-700"
                                            )}
                                            onClick={setIsModal}
                                            aria-label={`مشاهده جزئیات ${item.description}`}
                                        >
                                            <h3 className='font-medium'>{item.description}</h3>
                                            {item.title && (
                                                <p className='text-gray-500 mt-1 dark:text-gray-400'>
                                                    {item.title}
                                                </p>
                                            )}
                                        </Link>
                                    ))}
                                </>
                            ) : (
                                <div className='text-center py-6 text-gray-500 flex flex-col items-center gap-2'>
                                    <span>🔍</span>
                                    نتیجه‌ای یافت نشد
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </Container>
        </div>
    )
}

export default SearchInput