"use client"

import { Info } from "@/app/_components/info";
import { ClueType } from "@/types/clues";
import Link from "next/link";
import { SetStateAction, useCallback, useEffect, useState } from "react";

interface CategoryProps {
    name: string
    data: ClueType[]
    isModerator: boolean
}

interface FiltersType {
    wildcards: boolean
    unverified: boolean
}

interface FiltersProps {
    filters: FiltersType
    setFilters: React.Dispatch<SetStateAction<FiltersType>>
}

interface CheckboxFilterProps {
    label: string
    info?: string
    value: boolean
    setValue: React.ChangeEventHandler<HTMLInputElement>
}

export interface ExportType {
    [clue: string]: string
}

interface ClueProps {
    clue: ClueType
    allSelected: boolean
    filters: FiltersType
    setExports: React.Dispatch<SetStateAction<ExportType>>
}

export default function Category({ name, data, isModerator }: CategoryProps) {
    const [expanded, setExpanded] = useState(true);
    const [allSelected, setAllSelected] = useState(false);
    const [filters, setFilters] = useState({ wildcards: false, unverified: false });
    const [exports, setExports] = useState({} as ExportType);

    const clues: React.ReactNode[] = [];
    for (let i = 0; i < data.length; i++) {
        clues.push(
            <Clue key={i} clue={data[i]} allSelected={allSelected} filters={filters} setExports={setExports} />
        );
    }

    let moderatorRoute = undefined;
    if (isModerator) {
        const params = new URLSearchParams();
        params.set("category", name);
        params.set("nresults", "100");
        moderatorRoute = `/dashboard?${params}`;
    }

    return (
        <div>
            <div>
                <div className="p-10">
                    <h1>{name}</h1>
                    <h2>{name} clues</h2>
                    <div className="flex flex-col md:flex-row mt-10 gap-2">
                        <Export exports={exports} />
                        {moderatorRoute !== undefined && (
                            <Link className="button" href={moderatorRoute}>Edit this category</Link>
                        )}
                    </div>
                </div>
            </div>
            <Filters filters={filters} setFilters={setFilters} />
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
        </div>
    );
}

function Export({ exports }: { exports: ExportType }) {
    let result = "";
    for (const clue in exports) {
        result += `${clue}\t${exports[clue]}\n`;
    }

    const [showing, setShowing] = useState(false);
    const [copied, setCopied] = useState(false);

    const copy = () => {
        navigator.clipboard.writeText(result);
        setCopied(true);
    }

    const exit = () => {
        setShowing(false);
        setCopied(false);
    }

    const show = () => {
        setShowing(true);
        window.addEventListener("keydown", (event) => {
            if (event.key == "Escape") {
                exit();
            }
        });
    }

    return (
        <>
            <div className="relative flex flex-col">
                <button className="button cursor-pointer" onClick={show}>
                    Export Terms
                </button>
                <div className="absolute top-1 right-1">
                    <Info onButton info="Export selected clues to a format usable by flashcard apps so that you can study stock using flashcards, quizzes, and games." />
                </div>
            </div>
            <div className={`contents ${showing ? "block" : "hidden"}`}>
                <div onClick={exit} className={
                    `hidden
                    z-500
                    fixed
                    top-0
                    left-0
                    w-full
                    h-full
                    bg-foreground
                    opacity-50
                    md:block`
                }></div>
                <div className={
                    `z-600
                    flex
                    flex-col
                    p-10
                    bg-background-secondary
                    fixed
                    w-full
                    h-full
                    left-0
                    top-0
                    md:w-2/3
                    md:h-5/7
                    md:left-1/2
                    md:top-1/2
                    md:-translate-1/2
                    md:rounded-xl
                    md:shadow-2xl`
                }>
                    <button className="p-3 absolute top-0 right-0 cursor-pointer" onClick={exit}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <h2>export clues</h2>
                    <div className="relative mt-10 grow">
                        <textarea readOnly value={result} className={
                            `input
                            w-full
                            h-full
                            resize-none`
                        }></textarea>
                        <button onClick={copy} disabled={copied} className={
                            `bg-background-secondary
                            absolute
                            bottom-2
                            right-2
                            p-2
                            rounded
                            ${copied ? "cursor-default" : "cursor-pointer"}`
                        }>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 md:size-5">
                                <path className={`${copied ? "hidden" : "inline-block"}`} strokeLinecap="round" strokeLinejoin="round" d="M16.5 8.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v8.25A2.25 2.25 0 0 0 6 16.5h2.25m8.25-8.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-7.5A2.25 2.25 0 0 1 8.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 0 0-2.25 2.25v6" />
                                <path className={`${copied ? "inline-block" : "hidden"}`} strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                        </button>
                    </div>
                    <p className="mt-10 text-xs">
                        Navigate to your favorite flashcard app and find a section that allows you to &quot;import&quot; terms from an external source. Copy and paste the text above into the field provided by your platform of choice.
                    </p>
                </div>
            </div>
        </>
    );
}

function Filters({ filters, setFilters }: FiltersProps) {
    const [wildcards, setWildcards] = useState(filters.wildcards);
    const [unverified, setUnverified] = useState(filters.unverified);

    const showWildcards = () => {
        setFilters({ ...filters, wildcards: !filters.wildcards });
        setWildcards(!wildcards);
    };

    const showUnverified = () => {
        setFilters({ ...filters, unverified: !filters.unverified });
        setUnverified(!unverified);
    };

    return (
        <div className="filters bg-background-secondary p-5">
            <CheckboxFilter
                label="Show wildcard clues"
                info="These clues are too broad to guarantee a single answer; however, the answer you see is probably a good guess."
                value={wildcards}
                setValue={showWildcards}
            />
            <CheckboxFilter label="Show unverified clues" value={unverified} setValue={showUnverified} />
        </div>
    );
}

function CheckboxFilter({ label, info, value, setValue }: CheckboxFilterProps) {
    return (
        <div>
            <label>
                <input
                    type="checkbox"
                    checked={value}
                    onChange={setValue}
                ></input>
                <span> {label}</span>
            </label>
            {info && <Info info={info} />}
        </div>
    );
}

function Clue({ clue, allSelected, filters, setExports }: ClueProps) {
    const visible = (
        ((!filters.wildcards && !filters.unverified) && (clue.verified && !clue.wildcard))
        || ((filters.wildcards && !filters.unverified) && (clue.verified || clue.wildcard))
        || ((!filters.wildcards && filters.unverified) && !clue.wildcard)
        || (filters.wildcards && filters.unverified)
    );

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
