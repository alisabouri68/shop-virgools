"use client";
import React, { useEffect, useMemo, useState } from "react";
import Container from "../header/Container";
import { UseDataStore } from "@/app/zustand/useDataStore";
import Card from "../cardItem/Card";
import Filtering from "../filtering/Filtering";
import { UseMinePriceStore } from '@/app/zustand/UseMinePriceStore';
import { UseFilterCountry } from '@/app/zustand/UseFilterCountryIndex'
import { UseFilterCountryStore } from '@/app/zustand/UseFilterCountryStore';
import FilteringMobile from "../filtering/FilteringMobile";
import ModalParent from "../modal/ModalParent";
import { ModalParentHandler } from "@/app/zustand/ModalStoreParent";
import FilterPrice from "../filtering/filterprice/FilterPrice";
import FilterCountry from "../filtering/filtercountry/FilterCountry";
import clsx from "clsx";
import SliderCategory from "../slidercategory/SliderCategory";
function Category({ id }) {

    const { index } = ModalParentHandler();
    const { dataProduct, SetDataProduct } = UseDataStore()
    const [dataProductSlice, setDataProductSlice] = useState([])
    const [flagPagination, setFlagPagination] = useState(1)
    const { setCountryIndex } = UseFilterCountry()
    const { countryValue } = UseFilterCountryStore()
    const { minPrice, maxPrice, changeValueMax } = UseMinePriceStore()
    const [dataFilter, setDataFilter] = useState([]);
    const PAGINATION_COUNT = 8;

    const totalPages = useMemo(
        () => Math.ceil(dataFilter.length / PAGINATION_COUNT),
        [dataFilter.length]
    );
    const renderProducts = useMemo(
        () => dataProductSlice.map(items => (
            <Card
                key={items.id}
                xxx={items}
                styleSlide="lg:flex"
                darkstyle="'shadow-sm shadow-gray-200 dark:shadow-gray-700 '"
            />
        )),
        [dataProductSlice]
    );
    const paginationButtonClass = (isActive) =>
        clsx("px-3 py-1 rounded", {
            "bg-amber-600 text-white": isActive,
            "bg-amber-400 hover:bg-amber-500": !isActive,
        });

    useEffect(() => {
        fetch("https://67cd78d0dd7651e464ee7491.mockapi.io/api/v1/products")
            .then(response => response.json())
            .then(data => SetDataProduct(data))
            .catch(error => console.error('Error fetching products:', error));
    }, [SetDataProduct]);
    useEffect(() => {
        const filterProducts = () => {
            const filtered = dataProduct.filter(item => {
                const price = Number(item.price) || 0;
                return (
                    (countryValue === "تمام کشور ها" || item.country === countryValue) &&
                    (price >= minPrice && price <= maxPrice)
                );
            });
            setDataFilter(filtered);
        };

        filterProducts();
    }, [id, minPrice, maxPrice, countryValue, dataProduct]);
    useEffect(() => {
        setCountryIndex(dataProduct);
        if (dataProduct.length > 0) {
            const validPrices = dataProduct
                .map(item => Number(item.price))
                .filter(price => !isNaN(price))

            if (validPrices.length > 0) {
                const currentMax = Math.max(...validPrices)
                changeValueMax(currentMax)
            }
        }
    }, [dataProduct]);
    useEffect(() => {
        if (dataProduct.length === 0) return;
        const paginationCount = 8;
        const startIndex = (flagPagination - 1) * paginationCount;
        const endIndex = flagPagination * paginationCount;
        setDataProductSlice(dataFilter.slice(startIndex, endIndex));
    }, [flagPagination, dataFilter]);



    const renderPagination = useMemo(() => (
        <div className="flex justify-center items-center gap-4 my-4 min-w-full">
            <button
                className={clsx("px-4 py-2 rounded", {
                    "bg-gray-300 cursor-not-allowed": flagPagination === 1,
                    "bg-amber-500 hover:bg-amber-600": flagPagination !== 1,
                })}
                onClick={() => setFlagPagination(prev => Math.max(1, prev - 1))}
                disabled={flagPagination === 1}
            >
                قبلی
            </button>

            <div className="flex gap-2">
                {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                        key={index}
                        className={paginationButtonClass(flagPagination === index + 1)}
                        onClick={() => setFlagPagination(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            <button
                className={clsx("px-4 py-2 rounded", {
                    "bg-gray-300 cursor-not-allowed": dataProductSlice.length < PAGINATION_COUNT,
                    "bg-amber-500 hover:bg-amber-600": dataProductSlice.length >= PAGINATION_COUNT,
                })}
                onClick={() => setFlagPagination(prev => prev + 1)}
                disabled={dataProductSlice.length < PAGINATION_COUNT}
            >
                بعدی
            </button>
        </div>
    ), [flagPagination, totalPages, dataProductSlice.length]);
    return (
        <section className="my-3 mx-4">
            <Container>
                <div className="flex flex-col gap-10">
                    <SliderCategory id={id} />

                    <div className="flex flex-wrap ">
                        <div className="hidden lg:flex lg:w-[30%] px-3">
                            <Filtering />
                        </div>
                        <div className="flex lg:hidden w-full px-3">
                            <FilteringMobile />
                        </div>
                        <div className="flex flex-wrap lg:w-[70%] *:w-full *:md:w-[50%] *:lg:w-[33%] *:2xl:w-[25%]">
                            {dataProductSlice && renderProducts}
                            <div className="flex justify-center items-center gap-4 my-4  min-w-full">
                                <button
                                    className={`px-4 py-2 rounded ${flagPagination === 1
                                        ? 'bg-gray-300 cursor-not-allowed'
                                        : 'bg-amber-500 hover:bg-amber-600'
                                        }`}
                                    onClick={() => setFlagPagination(prev => Math.max(1, prev - 1))}
                                    disabled={flagPagination === 1}
                                >
                                    قبلی
                                </button>

                                <div className="flex gap-2">
                                    {Array.from({ length: Math.ceil(dataFilter.length / 8) }).map(
                                        (_, index) => (
                                            <button
                                                key={index}
                                                className={`px-3 py-1 rounded ${flagPagination === index + 1
                                                    ? "bg-amber-600 text-white"
                                                    : "bg-amber-400 hover:bg-amber-500"
                                                    }`}
                                                onClick={() => setFlagPagination(index + 1)}
                                            >
                                                {index + 1}
                                            </button>
                                        )
                                    )}
                                </div>
                                <button
                                    className={`px-4 py-2 rounded ${dataProductSlice.length < 8
                                        ? 'bg-gray-300 cursor-not-allowed'
                                        : 'bg-amber-500 hover:bg-amber-600'
                                        }`}
                                    onClick={() => setFlagPagination(prev => prev + 1)}
                                    disabled={dataProductSlice.length < 8}
                                >
                                    بعدی
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <ModalParent >
                    {index === 2 ? <FilterPrice /> :
                        index === 0 ? <FilteringBrand /> :
                            index === 1 ? <FilterCountry styles="rounded-lg bg-red-500 min-w-full grid gap-5" styles2="flex items-center justify-around border-4 border-red-900" /> :
                                null}
                </ModalParent>
            </Container>
        </section>
    );
}

export default Category;
// export async function generateStaticParams() {
//     const res = await fetch("https://67cd78d0dd7651e464ee7491.mockapi.io/api/v1/products");
//     const products = await res.json();

//     return products.map(product => ({
//         id: product.id.toString(),
//         slug: product.title+product.id?.toLowerCase().replace(/\s+/g, "-") || "no-slug",
//     }));
// }