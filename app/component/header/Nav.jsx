"use client";
import React, { useState, useEffect, useRef } from "react";
import { RiMenuFill } from "react-icons/ri";
import { useContainerSize } from '@/app/zustand/UseContainerSiza';
import { ModalHandler } from "@/app/zustand/ModalStore";
import { useOnClickOutside } from "@/app/hooks/useOnClickOutside";

function Nav({ children }) {
    const { size } = useContainerSize();
    const { modal, setModal } = ModalHandler();
    const navRef = useRef(null);

    useOnClickOutside(navRef, () => {
        if (modal) setModal();
    });

    useEffect(() => {
        if (modal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [modal]);

    return (
        <nav className="h-full flex items-center px-5" ref={navRef}>
            <ul className="h-full flex items-center justify-center">
                <li className="relative">
                    <button
                        aria-label="منوی اصلی"
                        aria-expanded={modal}
                        className="cursor-pointer p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => setModal()}
                    >
                        <RiMenuFill className="text-2xl" />
                    </button>
                    <div
                        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${modal ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
                        onClick={() => setModal()}
                    />
                    <div
                        className={`fixed top-0 right-0 h-full z-50 transition-transform duration-300 ease-in-out ${modal ? "translate-x-0" : "translate-x-full"}`}
                    >
                        <div
                            className="h-full bg-[var(--background)] dark:border-gray-600 border-l shadow-lg overflow-y-auto"
                            style={{ width: Math.min(size / 5, 400) + "px" }}
                        >
                            <div className="p-4 flex justify-end">
                                <button
                                    onClick={() => setModal()}
                                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                    aria-label="بستن منو"
                                >
                                    <RiMenuFill className="text-2xl" />
                                </button>
                            </div>
                            <ul className="px-4 pb-8">
                                {children}
                            </ul>
                        </div>
                    </div>
                </li>
            </ul>
        </nav>
    );
}

export default Nav;