"use client"

import Image from "next/image";
import { useState } from "react";

import ArrowLeft from "@/public/keyboard_arrow_left_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg";
import ArrowDown from "@/public/keyboard_arrow_down_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg";

export default function Category({ name, data }: { name: string, data: any }) {
    const [expanded, setExpanded] = useState(true);

    const clues: React.ReactNode[] = [];
    for (let i = 0; i < data.length; i++) {
        const clue = data[i];
        clues.push(
            <tr key={i}>
                <td>{clue["clue"]}</td>
                <td>{clue["answers"][0]["answer"]}</td>
            </tr>
        );
    }

    return (
        <div>
            <div id={name} className="flex p-5 bg-background-secondary hover:cursor-pointer" onClick={() => setExpanded((expanded) => !expanded)}>
                <h3>{name}</h3>
                <Image
                    className="ml-auto dark:invert"
                    src={expanded ? ArrowDown : ArrowLeft}
                    width={24}
                    height={24}
                    alt="Expand/Collapse"
                />
            </div>
            <div className={`${expanded ? "block" : "hidden"} p-10`}>
                <table className="md:w-1/2 m-auto table-fixed text-center md:text-xl">
                    <tbody>
                        <tr>
                            <th>Clue</th>
                            <th>Most Frequent Answer</th>
                        </tr>
                        {clues}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
