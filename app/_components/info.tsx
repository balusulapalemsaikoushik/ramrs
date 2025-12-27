"use client"

import { useState } from "react";

interface InfoProps {
    info: string
    warning?: boolean
    confirmation?: boolean
    onButton?: boolean
}

export function Info({ info, warning, confirmation, onButton }: InfoProps) {
    const [showing, setShowing] = useState(false);

    const showInfo = () => setShowing((showing) => !showing);

    let classes = "stroke-link md:size-4 md:align-text-top"; 
    let path = <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />;
    let offset = "md:top-3 md:left-3";
    if (warning || confirmation) {
        offset = "md:top-5 md:left-5";
        if (warning) {
            classes = "stroke-warning";
            path = <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />;
        } else if (confirmation) {
            classes = "stroke-confirmation";
            path = <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />;
        }
    }

    return (
        <div className="relative inline">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                className={`inline cursor-pointer size-6 align-text-bottom ${classes}`}
                onClick={showInfo}
            >
                {path}
            </svg>
            <div className={
                `z-100
                bg-background-tertiary
                p-2
                rounded-sm
                text-left
                absolute
                top-6
                w-max
                max-w-[75vw]
                md:max-w-sm
                ${onButton ? "right-0 md:right-auto" : ""}
                ${offset}
                ${showing ? "block": "hidden"}`
            }>
                <p className="text-xs">{info}</p>
            </div>
        </div>
    );
}
