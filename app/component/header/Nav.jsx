"use client";
import React, { useEffect, useRef } from "react";
import { RiMenuFill, RiCloseFill } from "react-icons/ri";
import { useContainerSize } from '@/app/zustand/UseContainerSiza';
import { ModalHandler } from "@/app/zustand/ModalStore";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";

function Nav({ children }) {
    const { size } = useContainerSize();
    const { modal, setModal } = ModalHandler();
    const navRef = useRef(null);

    // بهینهسازی مدیریت اسکرول
    useLockBodyScroll(modal);

    // بهینهسازی تشخیص کلیک خارج از منو
    useOnClickOutside(navRef, () => modal && setModal());

    // محاسبه عرض منو با استفاده از useMemo
    const menuWidth = Math.min(size / 5, 400);

    return (
        <nav
            ref={navRef}
            aria-label="منوی اصلی"
            className="h-full flex items-center px-5"
        >
            <div className="h-full flex items-center">
                <button
                    aria-label={modal ? "بستن منو" : "باز کردن منو"}
                    aria-expanded={modal}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => setModal()}
                >
                    {modal ? (
                        <RiCloseFill className="text-2xl" />
                    ) : (
                        <RiMenuFill className="text-2xl" />
                    )}
                </button>

                {/* Backdrop */}
                <div
                    role="presentation"
                    className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${modal
                        ? "opacity-100 visible"
                        : "opacity-0 invisible pointer-events-none"
                        }`}
                    onClick={() => setModal()}
                />

                {/* منوی سایدبار */}
                <aside
                    aria-modal="true"
                    role="dialog"
                    className={`fixed top-0 right-0 h-full z-50 transition-transform duration-300 ease-in-out ${modal ? "translate-x-0" : "translate-x-full"
                        }`}
                    style={{ width: `${menuWidth}px` }}
                >
                    <div className="h-screen bg-[var(--background)] border-l dark:border-gray-600 shadow-lg overflow-y-hidden">
                        <div className="p-4 flex justify-end">
                            <button
                                onClick={() => setModal()}
                                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                aria-label="بستن منو"
                            >
                                <RiCloseFill className="text-2xl" />
                            </button>
                        </div>
                        <nav aria-label="منوی فرعی" className="px-4 pb-8 ">
                            <ul className="space-y-2 h-screen">{children}</ul>
                        </nav>
                    </div>
                </aside>
            </div>
        </nav>
    );
}

export default Nav;