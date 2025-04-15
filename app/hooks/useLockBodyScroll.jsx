"use client";
import { useEffect } from "react";

export const useLockBodyScroll = (locked) => {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;

    if (locked) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [locked]);
};