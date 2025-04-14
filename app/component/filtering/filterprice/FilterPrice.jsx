"use client"
import React from "react";
import { UseMinePriceStore } from "@/app/zustand/UseMinePriceStore";
import clsx from "clsx";

function FilterPrice({ styles }) {
  const { minPrice, maxPrice, changeValueMax, changeValueMin } = UseMinePriceStore();
  const formatNumber = (num) => {
    return new Intl.NumberFormat('fa-IR').format(num);
  };
  const handleMinChange = (value) => {
    const numericValue = Math.abs(parseInt(value)) || 0;
    changeValueMin(numericValue);
  };

  const handleMaxChange = (value) => {
    const numericValue = Math.abs(parseInt(value) || 0);
    changeValueMax(numericValue);
  };
  const resetValues = () => {
    changeValueMin(0);
    changeValueMax(900000);
  };
  return (
    <div className={clsx("space-y-8 bg-[var(--background)] p-5", styles)}>
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] items-center gap-4">
        <label className="text-lg font-medium text-gray-700 dark:text-gray-300">
          از
        </label>
        <div className="relative group">
          <input
            value={minPrice}
            onChange={(e) => changeValueMin(e.target.value)}
            type="number"
            onBlur={(e) => {
              const formatted = formatNumber(e.target.value);
              e.target.value = formatted;
            }}
            aria-invalid={minPrice > maxPrice}
            aria-describedby="priceError"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.target.blur();
              }
            }}
            className={
              clsx(
                "w-full py-3 px-4 text-2xl md:text-3xl rounded-lg border-2",
                "bg-transparent border-gray-300 dark:border-gray-600",
                "focus:border-amber-500 focus:ring-2 focus:ring-amber-200",
                "dark:focus:ring-amber-800 transition-all duration-300",
                "placeholder-gray-400 dark:placeholder-gray-500",
                "dark:text-gray-100 pr-12",
                "hover:border-amber-400 dark:hover:border-amber-500",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            placeholder={formatNumber(minPrice)}
            aria-label="حداقل قیمت"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
            تومان
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] items-center gap-4">
        <label className="text-lg font-medium text-gray-700 dark:text-gray-300">
          تا
        </label>
        <div className="relative group">
          <input
            value={maxPrice}
            onChange={(e) => changeValueMax(e.target.value)}
            type="number"
            onBlur={(e) => {
              const formatted = formatNumber(e.target.value);
              e.target.value = formatted;
            }}
            aria-invalid={minPrice > maxPrice}
            aria-describedby="priceError"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.target.blur();
              }
            }}
            className={
              clsx(
                "w-full py-3 px-4 text-2xl md:text-3xl rounded-lg border-2",
                "bg-transparent border-gray-300 dark:border-gray-600",
                "focus:border-amber-500 focus:ring-2 focus:ring-amber-200",
                "dark:focus:ring-amber-800 transition-all duration-300",
                "placeholder-gray-400 dark:placeholder-gray-500",
                "dark:text-gray-100 pr-12",
                "hover:border-amber-400 dark:hover:border-amber-500",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            placeholder={formatNumber(maxPrice)}
            aria-label="حداکثر قیمت"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
            تومان
          </span>
        </div>
      </div>
      <button
        onClick={resetValues}
        className="mt-4 px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors"
      >
        بازنشانی محدوده قیمت
      </button>


      {minPrice > maxPrice && (
        <p id="priceError" className="text-red-500 text-sm">
          مقدار حداقل نمی‌تواند بیشتر از حداکثر باشد
        </p>
      )}
    </div>
  );
}

export default FilterPrice;