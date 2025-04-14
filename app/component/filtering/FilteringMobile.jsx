"use client";
import React from "react";
import { VscChevronDown } from "react-icons/vsc";
import { ModalParentHandler } from "@/app/zustand/ModalStoreParent";
import clsx from "clsx";

function FilteringMobile() {
  const { isModal, setIsModal, setIndex, index } = ModalParentHandler();

  const filters = [
    { id: 1, label: "کشور سازنده" },
    { id: 2, label: "قیمت" },
  ];

  const handleFilterClick = (filterIndex) => {
    const newIndex = index === filterIndex ? null : filterIndex;
    setIndex(newIndex);
    setIsModal(newIndex !== null);
  };

  return (
    <div className="grid grid-cols-2 gap-3 mb-4 px-4">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => handleFilterClick(filter.id)}
          className={clsx(
            "group relative p-3 rounded-xl transition-all duration-300",
            "shadow-sm hover:shadow-lg",
            "bg-white/80 backdrop-blur-sm dark:bg-gray-800/80",
            "border border-gray-200 dark:border-gray-700",
            "flex items-center justify-between",
            "transform hover:-translate-y-0.5",
            "focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2",
            {
              "ring-2 ring-amber-500 ring-offset-2": isModal && index === filter.id,
              "animate-pulse-once": isModal && index === filter.id,
            }
          )}
          aria-label={`فیلتر ${filter.label}`}
          aria-expanded={isModal && index === filter.id}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-50/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
          
          <span className="relative z-10 text-sm font-medium text-gray-700 dark:text-gray-100 tracking-tight">
            {filter.label}
          </span>
          
          <VscChevronDown
            className={clsx(
              "relative z-10 text-lg transition-transform duration-300",
              "text-gray-500 dark:text-gray-400",
              isModal && index === filter.id 
                ? "rotate-180 text-amber-600 dark:text-amber-400" 
                : "rotate-0 group-hover:text-amber-500"
            )}
          />
        </button>
      ))}
    </div>
  );
}

export default FilteringMobile;