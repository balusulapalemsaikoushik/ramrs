"use client"

import Image from "next/image";
import { useState } from "react";

import ArrowLeft from "@/public/keyboard_arrow_left_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"
import ArrowDown from "@/public/keyboard_arrow_down_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"

export default function Category({ name }: { name: string }) {
    const [expanded, setExpanded] = useState(true);

    return (
        <div>
            <div className="flex p-5 bg-white hover:cursor-pointer" onClick={() => setExpanded((expanded) => !expanded)}>
                <h3>{name}</h3>
                <Image
                    className="ml-auto"
                    src={expanded ? ArrowDown : ArrowLeft}
                    width={24}
                    height={24}
                    alt="Expand/Collapse"
                />
            </div>
            <div className={`${expanded ? "block" : "hidden"} p-10`}>
                <p>test</p>
            </div>
        </div>
    );
}
