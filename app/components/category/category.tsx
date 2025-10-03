"use client"

import { useState } from "react";

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
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ml-auto">
                    <path className={expanded ? "inline-block" : "hidden"} strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    <path className={expanded ? "hidden" : "inline-block"} strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
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
