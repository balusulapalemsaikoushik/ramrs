"use client"

import { useContext, useState } from "react";
import { Info } from "../info/info";
import { ExportContext } from "@/app/context";

export default function Export() {
    const exportContext = useContext(ExportContext);

    if (exportContext === undefined) {
        throw new Error("Export context not found.");
    }

    const exports = exportContext!.exports;
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
                <button className="button hover:cursor-pointer" onClick={show}>
                    Export Terms
                </button>
                <div className="absolute top-1 right-1">
                    <Info onButton info="Export selected clues to a format usable by flashcard apps so that you can study stock using flashcards, quizzes, and games." />
                </div>
            </div>
            <div className={showing ? "block" : "hidden"}>
                <div onClick={exit} className={
                    `hidden
                    z-400
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
                    `z-500
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
                    <button className="p-3 absolute top-0 right-0 hover:cursor-pointer" onClick={exit}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <h2>export clues</h2>
                    <div className="relative mt-10 grow">
                        <textarea readOnly value={result} className={`
                            bg-background-primary
                            rounded
                            p-2
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
                            ${copied ? "" : "hover:cursor-pointer"}`
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
    )
}
