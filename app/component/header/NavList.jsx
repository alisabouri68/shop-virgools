
import Link from "next/link";
import React, { useState, useRef } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { ModalHandler } from "@/app/zustand/ModalStore";
import { useOnClickOutside } from "@/app/hooks/useOnClickOutside";

function NavList({ icons, title, children, href }) {
  const { setModal } = ModalHandler();
  const [isHovered, setIsHovered] = useState(false);
  const navItemRef = useRef(null);

  useOnClickOutside(navItemRef, () => {
    setIsHovered(false);
  });

  return (
    <li
      className="w-full relative"
      ref={navItemRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        className={`
          flex items-center justify-between py-3 px-4
          text-gray-700 dark:text-gray-300 hover:text-amber-500 dark:hover:text-amber-400
          transition-colors duration-200
          ${isHovered ? 'text-amber-500 dark:text-amber-400' : ''}
        `}
        href={href}
        onClick={(e) => {
          if (children) {
            setModal();
          } else {
            setModal();
          }
        }}
        aria-expanded={isHovered}
        aria-haspopup={!!children}
      >
        <div className="flex items-center gap-3 font-medium">
          <span className="text-lg hidden lg:inline-block">{icons}</span>
          <span className="text-sm lg:text-base">{title}</span>
        </div>

        {children && (
          <span className={`
            transition-transform duration-200 hidden lg:inline-block
            ${isHovered ? 'transform -rotate-90' : ''}
          `}>
            <IoIosArrowBack />
          </span>
        )}
      </Link>

      {children && (
        <div
          className={`
            absolute right-full top-0 w-max h-10
            transition-all duration-300 ease-in-out z-50
            ${isHovered ? 'opacity-100 visible' : ' opacity-0 invisible'}
          `}
        >
          {children}
        </div>
      )}
    </li>
  );
}

export default NavList;








