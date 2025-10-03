"use client"

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import Menu from "@/public/menu_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg";

export default function NavBar() {
    const [height, setHeight] = useState(0);
    const ref: any = useRef(null);

    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        if (ref.current) {
            setHeight(ref.current.offsetHeight);
        }
    });

    const scrollToCategory = (category: string) => {
        if (ref.current) {
            const categoryElement = document.getElementById(category);
            if (categoryElement) {
                const scrollPosition = categoryElement.offsetTop - height;
                window.scrollTo({ top: scrollPosition });
                setExpanded(false);
            }
        }
    };

    return (
        <div ref={ref} className="sticky top-0 flex flex-wrap bg-background-secondary">
            <a className="navbar-item" href="/">ramrs <Version text="experimental" /></a>
            <a
                className="p-5 hover:cursor-pointer md:hidden ml-auto"
                onClick={() => setExpanded((expanded) => !expanded)}
            >
                <Image
                    className="dark:invert"
                    src={Menu}
                    width={24}
                    height={24}
                    alt="Expand/Collapse"
                />
            </a>
            <div className={
                `${expanded ? "block" : "hidden"}
                top-[${height}px]
                grow
                basis-full
                md:grow-0
                md:basis-auto
                md:static
                md:flex
                md:ml-auto`
            }>
                <a className="navbar-item" onClick={() => scrollToCategory("history")}>History</a>
                <a className="navbar-item" onClick={() => scrollToCategory("literature")}>Literature</a>
                <a className="navbar-item" onClick={() => scrollToCategory("science")}>Science</a>
                <a className="navbar-item" onClick={() => scrollToCategory("arts")}>Fine Arts</a>
                <a className="navbar-item" onClick={() => scrollToCategory("geography")}>Geography</a>
            </div>
        </div>
    );
}

function Version({ text }: { text: string }) {
    return <span className={`p-1 text-version border-1 border-version rounded`}>{text}</span>
}
