'use client'
import React, { useEffect, useState } from 'react'
import Card from './Card';
import { UseMinePriceStore } from '@/app/zustand/UseMinePriceStore';
import { UseFilterCountry } from '@/app/zustand/UseFilterCountryIndex'
import { UseFilterCountryStore } from '@/app/zustand/UseFilterCountryStore';
function CardItemChild({ slug }) {
    const { setCountryIndex } = UseFilterCountry()
    const { countryValue} = UseFilterCountryStore()
    const { minPrice, maxPrice, changeValueMax} = UseMinePriceStore()
    const [allData, setAllData] = useState([]);
    const [dataFilter, setDataFilter] = useState([]);
    useEffect(() => {
        fetch("https://67cd78d0dd7651e464ee7491.mockapi.io/api/v1/products")
            .then(response => {
                return response.json()
            })
            .then(data => {
                setAllData(data)
            })
    }, []);
    useEffect(() => {
        const filtered = allData.filter(item => {
            const matchesSlug = item.title === slug
            const matchesCountry = countryValue !== "تمام کشور ها" ? item.country === countryValue : true
            const price = Number(item.price) || 0
            const matchesPrice = price >= minPrice && price <= maxPrice
            return matchesSlug && matchesCountry && matchesPrice
        })
        setDataFilter(filtered)
    }, [slug, minPrice, maxPrice, countryValue, allData]);
    useEffect(() => {
        const uniqueData = allData.filter(item => item.title === slug)
        setCountryIndex(uniqueData);
        if (uniqueData.length > 0) {
            const validPrices = uniqueData
                .map(item => Number(item.price))
                .filter(price => !isNaN(price))

            if (validPrices.length > 0) {
                const currentMax = Math.max(...validPrices)
                changeValueMax(currentMax)
            }
        }
      }, [slug , allData]);
    return (
        <>
            {dataFilter &&
                dataFilter.map((item) => {
                    if (item.title === slug)
                        return (
                            <Card xxx={item} styleSlide="lg:flex bg-background" key={item.id} darkstyle='shadow-sm shadow-gray-200 dark:shadow-gray-700 ' />
                        );
                })}
        </>
    )
}

export default CardItemChild
// export async function generateStaticParams() {
//     const res = await fetch("https://67cd78d0dd7651e464ee7491.mockapi.io/api/v1/products");
//     const products = await res.json();

//     return products.map(product => ({
//         id: product.id.toString(),
//         slug:product.title+product.id?.toLowerCase().replace(/\s+/g, "-") || "no-slug",
//     }));
// }