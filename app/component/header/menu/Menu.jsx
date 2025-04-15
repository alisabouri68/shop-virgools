"use client";
import React from 'react'
import Nav from '../Nav'
import NavList from '../NavList'
import { FaPenAlt } from "react-icons/fa";
import Link from "next/link";
import { useContainerSize } from "@/app/zustand/UseContainerSiza";
import { dbmegamenu } from '../db';
import { ModalHandler } from "@/app/zustand/ModalStore";
export default function Menu() {
    const { modal, setModal } = ModalHandler();
    const { size } = useContainerSize();
    return (

        <Nav>
            {dbmegamenu?.map((item, index) => (
                <NavList
                    href={`/category/${item.menu[1]}`}
                    title={item.menu[0]}
                    key={`${item.menu[1]}-${index}`}
                    icons={<FaPenAlt />}
                    onClick={setModal}
                >

                    {modal && <ul
                        className="fixed top-0  min-h-screen z-50 bg-[var(--background)] dark:border-gray-600 border-l shadow-lg overflow-y-hidden p-4"
                        style={{
                            width: `${Math.min(size * 0.8, 600)}px`,
                            right: Math.min(size / 5, 400) + "px"
                        }}
                    >
                        <div className="grid grid-cols-3 gap-4">
                            {item.submenu?.map((subItem, i) => (
                                <li
                                    key={`${subItem[1]}-${i}`}
                                    className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                                >
                                    <Link
                                        href={`/category/${item.menu[1]}/${subItem[1]}`}
                                        className="block p-3 text-sm hover:text-amber-500 transition-colors border-r-4 border-transparent hover:border-amber-500"
                                        onClick={setModal}
                                    >
                                        {subItem[0]}
                                    </Link>
                                </li>
                            ))}
                        </div>
                    </ul>}
                </NavList>
            ))}
        </Nav>

    )
}





