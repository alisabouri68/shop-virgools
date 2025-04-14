"use client";
import React, {useEffect } from "react";
import { UseDataStore } from "@/app/zustand/useDataStore";
import CardItemChild from "./CardItemChild";
function CardItems({ slug }) {
const {SetDataProduct}=UseDataStore()
    useEffect(() => {
        fetch("https://67cd78d0dd7651e464ee7491.mockapi.io/api/v1/products")
            .then(response => {
                return response.json()
            })
            .then(data => {
                SetDataProduct(data)
            })
    }, [slug]);
    return (
        <>
            <CardItemChild
                 slug={slug}
            />
        </>
    );
}
export default CardItems;