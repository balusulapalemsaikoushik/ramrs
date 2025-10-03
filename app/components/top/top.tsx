"use client"

import { useEffect, useState } from "react";
import Image from "next/image";

import Up from "@/public/arrow_upward_36dp_000000_FILL0_wght400_GRAD0_opsz40.svg";

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
            bottom-7
            right-7
            p-3
            hover:cursor-pointer
            rounded-full
            bg-background-secondary`
        } onClick={scrollToTop}>
            <Image
                className="dark:invert"
                src={Up}
                width={36}
                height={36}
                alt="Go to Top"
            />
        </button>
    );
}
