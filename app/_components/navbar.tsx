"use client"

import Link from "next/link";
import { useState } from "react";

export default function NavBar({ username }: { username?: string }) {
    const [expanded, setExpanded] = useState(false);
    const [showCategories, setShowCategories] = useState(false);
    const [showUserActions, setShowUserActions] = useState(false);

    const expand = () => {
        setExpanded((expanded) => !expanded);
        setShowCategories(true);
        setShowUserActions(true);
    }

    return (
        <div className={
            `z-400
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
            <button className="p-5 cursor-pointer md:hidden ml-auto" onClick={expand}>
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
                    <button className={
                        `navbar-item
                        flex!
                        w-full
                        md:inline!
                        md:w-auto`
                    } onClick={() => setShowCategories((showCategories) => !showCategories)}>
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
                {username !== undefined ? (
                    <div className="relative">
                        <button className={
                            `navbar-item
                            w-full
                            md:w-auto`
                        } onClick={() => setShowUserActions((showUserActions) => !showUserActions)}>
                            {username}
                        </button>
                        <div className={
                            `bg-background-tertiary
                            ${showUserActions ? "flex": "hidden"}
                            flex-col
                            md:bg-background-secondary
                            md:absolute
                            md:right-0
                            md:w-full
                            overflow-auto`
                        }>
                            <Link className="navbar-item" href="/dashboard">Dashboard</Link>
                            {
                                /* eslint-disable @next/next/no-html-link-for-pages */
                                <a className="navbar-item flex!" href="/auth/logout">
                                    <span>Logout </span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ml-auto">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                                    </svg>
                                </a>
                                /* eslint-enable @next/next/no-html-link-for-pages */
                            }
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col justify-center p-5 md:px-3 md:py-0">
                        {
                            /* eslint-disable @next/next/no-html-link-for-pages */
                            <a className="text-center bg-background-primary rounded p-5 md:px-3 md:py-2" href="/auth/login">
                                <span>Login </span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 inline align-text-bottom">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
                                </svg>
                            </a>
                            /* eslint-enable @next/next/no-html-link-for-pages */
                        }
                    </div>
                )}
            </div>
        </div>
    );
}

function Version({ text }: { text: string }) {
    return <span className={`p-1 text-version border border-version rounded`}>{text}</span>
}
