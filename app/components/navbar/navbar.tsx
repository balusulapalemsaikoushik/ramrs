"use client"

import { useEffect, useRef, useState } from "react";

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
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
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
