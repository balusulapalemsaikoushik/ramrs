"use client"

import { useEffect, useState } from "react";

export default function Top() {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            setScrollY(window.scrollY);
        });
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0 });

    return (
        <button className={
            `${scrollY > 0 ? "fixed" : "hidden"}
            z-200
            bottom-7
            right-7
            p-4
            hover:cursor-pointer
            rounded-full
            bg-background-secondary`
        } onClick={scrollToTop}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
            </svg>
        </button>
    );
}
