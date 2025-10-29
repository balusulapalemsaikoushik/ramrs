"use client"

import { useContext, useState } from "react";

import { FiltersContext } from "@/app/context";
import { Info } from "../info/info";

interface AnswerType {
    answer: string
    category: string
}

interface ClueType {
    clue: string
    label: string
    answer: AnswerType | null
    answers: AnswerType[]
    wildcard: boolean
    frequency: number
}

export default function Category({ name, data }: { name: string, data: ClueType[] }) {
    const [expanded, setExpanded] = useState(true);

    const clues: React.ReactNode[] = [];
    for (let i = 0; i < data.length; i++) {
        clues.push(
            <Clue clue={data[i]} key={i} />
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
            <div className={`${expanded ? "flex" : "hidden"} justify-center overflow-hidden p-10`}>
                <table className="w-full md:w-1/2 table-fixed text-center md:text-xl">
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

function Clue({ clue }: { clue: ClueType }) {
    const filtersContext = useContext(FiltersContext);

    if (filtersContext === undefined) {
        throw new Error("Filters context not found.");
    }

    const filters = filtersContext!.filters;
    const verified = clue.answer !== null;
    const visible = (
        ((!filters.wildcards && !filters.unverified) && (verified && !clue.wildcard))
        || ((filters.wildcards && !filters.unverified) && (verified || clue.wildcard))
        || ((!filters.wildcards && filters.unverified) && !clue.wildcard)
        || (filters.wildcards && filters.unverified)
    );
    return (
        <tr className={visible ? "table-row" : "hidden"}>
            <td>
                {(verified && !clue.wildcard) && (
                    <Info info="This clue has been verified by a ramrs moderator." confirmation />
                )}
                {clue.wildcard && (
                    <Info info="This is a wildcard." warning />
                )} {clue.clue}
            </td>
            <td>{verified ? clue.answer!.answer : clue.answers[0].answer}</td>
        </tr>
    );
}
