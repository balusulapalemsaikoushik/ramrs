"use client"

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function NavBar() {
    const [height, setHeight] = useState(0);
    const ref: React.RefObject<HTMLDivElement | null> = useRef(null);

    const [expanded, setExpanded] = useState(false);
    const [showCategories, setShowCategories] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (ref.current) {
                setHeight(ref.current.offsetHeight);
            }
        });
    }, []);

    const scrollToCategory = (category: string) => {
        if (ref.current) {
            const categoryElement = document.getElementById(category);
            if (categoryElement) {
                const scrollPosition = categoryElement.offsetTop - height;
                window.scrollTo({ top: scrollPosition });
                setExpanded(false);
                setShowCategories(false);
            }
        }
    };

    const expand = () => {
        setExpanded((expanded) => !expanded);
        setShowCategories(true);
    }

    return (
        <div ref={ref} className={
            `z-300
            sticky
            top-0
            flex
            flex-wrap
            bg-background-secondary
            items-start
            content-start
            overflow-auto
            ${expanded ? "h-screen": "h-auto"}
            md:h-auto
            md:overflow-visible`
        }>
            <Link className="navbar-item" href="/">ramrs <Version text="experimental" /></Link>
            <button className="p-5 hover:cursor-pointer md:hidden ml-auto" onClick={expand}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </button>
            <div className={
                `${expanded ? "block" : "hidden"}
                grow
                basis-full
                md:grow-0
                md:basis-auto
                md:static
                md:flex
                md:ml-auto`
            }>
                <div className="relative">
                    <button className="navbar-item flex! w-full md:inline! md:w-auto" onClick={() => setShowCategories((showCategories) => !showCategories)}>
                        <span>Categories </span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="inline ml-auto size-6 md:size-5 md:align-text-bottom">
                            <path className={showCategories ? "inline-block" : "hidden"} strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            <path className={showCategories ? "hidden" : "inline-block"} strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                    <div className={
                        `bg-background-primary
                        ${showCategories ? "flex": "hidden"}
                        flex-col
                        md:bg-background-secondary
                        md:absolute
                        md:right-0
                        md:w-3xs
                        md:h-80
                        overflow-auto`
                    }>
                        <a className="navbar-item" onClick={() => scrollToCategory("history")}>History</a>
                        <a className="navbar-item" onClick={() => scrollToCategory("literature")}>Literature</a>
                        <a className="navbar-item" onClick={() => scrollToCategory("science")}>Science</a>
                        <a className="navbar-item" onClick={() => scrollToCategory("arts")}>Fine Arts</a>
                        <a className="navbar-item" onClick={() => scrollToCategory("geography")}>Geography</a>
                        <a className="navbar-item" onClick={() => scrollToCategory("trash")}>Trash</a>
                        <a className="navbar-item" onClick={() => scrollToCategory("mythology")}>Mythology</a>
                        <a className="navbar-item" onClick={() => scrollToCategory("social science")}>Social Science</a>
                        <a className="navbar-item" onClick={() => scrollToCategory("philosophy")}>Philosophy</a>
                        <a className="navbar-item" onClick={() => scrollToCategory("religion")}>Religion</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Version({ text }: { text: string }) {
    return <span className={`p-1 text-version border border-version rounded`}>{text}</span>
}
