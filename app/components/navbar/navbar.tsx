"use client"

import Link from "next/link";
import { useState } from "react";

export default function NavBar() {
    const [expanded, setExpanded] = useState(false);
    const [showCategories, setShowCategories] = useState(false);

    const expand = () => {
        setExpanded((expanded) => !expanded);
        setShowCategories(true);
    }

    return (
        <div className={
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
                        `bg-background-tertiary
                        ${showCategories ? "flex": "hidden"}
                        flex-col
                        md:bg-background-secondary
                        md:absolute
                        md:right-0
                        md:w-3xs
                        md:h-80
                        overflow-auto`
                    }>
                        <Link className="navbar-item" href="/history">History</Link>
                        <Link className="navbar-item" href="/literature">Literature</Link>
                        <Link className="navbar-item" href="/science">Science</Link>
                        <Link className="navbar-item" href="/arts">Fine Arts</Link>
                        <Link className="navbar-item" href="/geography">Geography</Link>
                        <Link className="navbar-item" href="/trash">Trash</Link>
                        <Link className="navbar-item" href="/mythology">Mythology</Link>
                        <Link className="navbar-item" href="/social science">Social Science</Link>
                        <Link className="navbar-item" href="/philosophy">Philosophy</Link>
                        <Link className="navbar-item" href="/religion">Religion</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Version({ text }: { text: string }) {
    return <span className={`p-1 text-version border border-version rounded`}>{text}</span>
}
