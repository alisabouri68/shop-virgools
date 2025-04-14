import React from 'react'
import {
    CiDeliveryTruck,
    CiTimer,
    CiDollar
} from "react-icons/ci";
import { HiOutlineArrowPathRoundedSquare } from "react-icons/hi2";
import { PiGooglePlayLogoThin } from "react-icons/pi";
import { AiOutlineAndroid, AiOutlineApple } from "react-icons/ai";
import { SlSocialInstagram } from "react-icons/sl";
import Container from '../header/Container';
import clsx from 'clsx';
import Link from 'next/link';

function Footer() {
    const services = [
        { icon: <CiTimer />, text: 'خدمات 24 ساعته' },
        { icon: <CiDeliveryTruck />, text: 'ارسال رایگان و به موقع' },
        { icon: <HiOutlineArrowPathRoundedSquare />, text: 'امکان مرجوع و تعویض' },
        { icon: <CiDollar />, text: 'امکان مقایسه قیمت' }
    ];

    const footerLinks = [
        {
            title: 'راهنما',
            items: [
                'چگونگی ثبت سفارش',
                'چگونگی پرداخت',
                'چگونگی ارسال کالا'
            ]
        },
        {
            title: 'خدمات مشتریان',
            items: [
                'چگونگی بازگشت کالا',
                'اطلاع رسانی',
                'پرسش‌های متداول'
            ]
        }
    ];

    const socialIcons = [
        { icon: <SlSocialInstagram />, label: 'اینستاگرام' },
        { icon: <PiGooglePlayLogoThin />, label: 'گوگل پلی' },
        { icon: <AiOutlineAndroid />, label: 'اندروید' },
        { icon: <AiOutlineApple />, label: 'اپل' }
    ];

    return (
        <footer className="bg-amber-50 dark:bg-gray-800">
            <div className="py-8 border-b border-amber-100 dark:border-gray-700">
                <Container>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="text-center p-4 hover:bg-amber-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
                            >
                                <span className="text-5xl lg:text-6xl text-amber-600 dark:text-amber-400 block mb-3">
                                    {service.icon}
                                </span>
                                <p className="text-gray-700 dark:text-gray-300 font-medium">
                                    {service.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </Container>
            </div>

            <div className="py-8 text-gray-600 dark:text-gray-300">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {footerLinks.map((section, index) => (
                            <div key={index} className="space-y-4">
                                <h3 className="text-lg font-semibold text-amber-700 dark:text-amber-400">
                                    {section.title}
                                </h3>
                                <ul className="space-y-2">
                                    {section.items.map((item, idx) => (
                                        <li key={idx}>
                                            <Link href="#" className="hover:text-amber-600 dark:hover:text-amber-300 transition-colors">
                                                {item}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-amber-700 dark:text-amber-400 text-center lg:text-right">
                                درباره ما
                            </h3>
                            <p className="leading-relaxed text-justify">
                                فروشگاه اینترنتی لوازم تحریر ویرگول آماده ارائه خدمات 24 ساعته به شما عزیزان است.
                                این فروشگاه از سال 96 تاسیس شده و یکی از بهترین و کامل‌ترین مراکز فروش لوازم مورد نیاز شماست.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-amber-700 dark:text-amber-400 text-center">
                                ارتباط با ما
                            </h3>
                            <div className="flex justify-center flex-wrap gap-4">
                                {socialIcons.map((social, index) => (
                                    <Link
                                        key={index}
                                        href="#"
                                        className={clsx(
                                            "p-3 rounded-full text-2xl",
                                            "bg-amber-100 hover:bg-amber-200",
                                            "dark:bg-gray-700 dark:hover:bg-gray-600",
                                            "transition-colors duration-300"
                                        )}
                                        aria-label={social.label}
                                    >
                                        {social.icon}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </footer>
    )
}

export default Footer