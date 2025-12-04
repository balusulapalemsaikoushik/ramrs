"use client"

import { useCallback, useContext, useEffect, useState } from "react";

import { ExportContext, FiltersContext } from "@/app/context";
import { Info } from "../../_components/info";
import { ClueType } from "@/types/clues";

export default function Category({ name, data }: { name: string, data: ClueType[] }) {
    const [expanded, setExpanded] = useState(true);
    const [allSelected, setAllSelected] = useState(false);

    const clues: React.ReactNode[] = [];
    for (let i = 0; i < data.length; i++) {
        clues.push(
            <Clue clue={data[i]} allSelected={allSelected} key={i} />
        );
    }

    return (
        <div>
            <div id={name} className="flex p-5 bg-background-secondary cursor-pointer" onClick={() => setExpanded((expanded) => !expanded)}>
                <h4>{name}</h4>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ml-auto">
                    <path className={expanded ? "inline-block" : "hidden"} strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    <path className={expanded ? "hidden" : "inline-block"} strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
            </div>
            <div className={`${expanded ? "flex" : "hidden"} justify-center overflow-hidden p-10`}>
                <table className="w-full md:w-1/2 table-fixed text-center md:text-xl">
                    <tbody>
                        <tr>
                            <th>
                                <span>Clue </span>
                                <button onClick={() => setAllSelected((allSelected) => !allSelected)} className={
                                    `text-xs
                                    font-normal
                                    underline
                                    cursor-pointer`
                                }>
                                    {allSelected ? "Deselect All" : "Select All"}
                                </button>
                            </th>
                            <th>Most Frequent Answer</th>
                        </tr>
                        {clues}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function Clue({ clue, allSelected }: { clue: ClueType, allSelected: boolean }) {
    const filtersContext = useContext(FiltersContext);
    const exportContext = useContext(ExportContext);

    if (filtersContext === undefined) {
        throw new Error("Filters context not found.");
    }
    if (exportContext === undefined) {
        throw new Error("Export context not found.");
    }

    const filters = filtersContext!.filters;
    const visible = (
        ((!filters.wildcards && !filters.unverified) && (clue.verified && !clue.wildcard))
        || ((filters.wildcards && !filters.unverified) && (clue.verified || clue.wildcard))
        || ((!filters.wildcards && filters.unverified) && !clue.wildcard)
        || (filters.wildcards && filters.unverified)
    );

    const setExports = exportContext!.setExports;
    const [exported, setExported] = useState(false);
    
    const addRemoveExport = useCallback((add: boolean) => {
        if (visible) {
            setExports((exports) => {
                const value = clue.clue;
                const newExports = { ...exports };
                if (add) {
                    newExports[value] = clue.answer;
                } else {
                    delete newExports[value];
                }
                return newExports;
            });
            setExported(add);
        }
    }, [visible, clue, setExports, setExported]);

    useEffect(() => addRemoveExport(allSelected), [allSelected, addRemoveExport]);

    return (
        <tr className={visible ? "table-row" : "hidden"}>
            <td>
                {(clue.verified && !clue.wildcard) && (
                    <Info info="This clue has been verified by a ramrs moderator." confirmation />
                )}
                {clue.wildcard && (
                    <Info info="This is a wildcard." warning />
                )}
                <span>
                    <span> {clue.clue} </span>
                    <button onClick={() => addRemoveExport(!exported)} className={
                        `bg-background-tertiary
                        border
                        rounded
                        cursor-pointer`
                    }>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path className={`${exported ? "hidden" : "inline-block"}`} strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            <path className={`${exported ? "inline-block" : "hidden"}`} strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </span>
            </td>
            <td>{clue.answer}</td>
        </tr>
    );
}
