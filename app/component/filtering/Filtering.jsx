"use client";
import React from "react";
import { VscChevronDown } from "react-icons/vsc";
import { useAccordionStore } from "@/app/zustand/UseAccordionStor";
import FilterPrice from "./filterprice/FilterPrice";
import FilteringBrand from "./filteringbrand/FilteringBrand";
import FilterCountry from './filtercountry/FilterCountry'
import clsx from 'clsx';

function Filtering({slug}) {
  const { isOpen, setIsopen } = useAccordionStore();

  const filterItems = [
    // { id: 0, component: <FilteringBrand />, label: "بر اساس برند" },
    { id: 1, component: <FilterCountry />, label: "بر اساس کشور سازنده" },
    { id: 2, component: <FilterPrice />, label: "محدوده قیمت" },
  ];

  const handleAccordionToggle = (index) => {
    setIsopen(isOpen === index ? null : index);
  };

  return (
    <div className="sticky flex flex-col top-10 right-0 h-[80vh] shadow-sm shadow-gray-200 dark:shadow-gray-700 min-w-full rounded-2xl overflow-hidden text-foreground bg-background">
      {filterItems.map((item, index) => (
        <div
          key={item.id}
          className={clsx(
            "border-b border-gray-200 dark:border-gray-600",
            isOpen === index ? "grow" : "grow-0"
          )}
        >
          <div 
            className="flex items-center justify-between py-5 px-5 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            onClick={() => handleAccordionToggle(index)}
            role="button"
            aria-expanded={isOpen === index}
          >
            <h4 className="text-lg font-semibold">{item.label}</h4>
            <VscChevronDown
              className={clsx(
                "text-2xl transition-transform duration-300",
                isOpen === index ? "rotate-180" : "rotate-0"
              )}
            />
          </div>

          <div className={clsx(
            "overflow-hidden transition-all duration-300",
            isOpen === index ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          )}>
            <div className="px-5 pb-5">
              {React.cloneElement(item.component, {
                className: "flex flex-col gap-5"
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Filtering;