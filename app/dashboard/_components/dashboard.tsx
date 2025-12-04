"use client"

import categories from "@/data/categories.json";
import { deleteClue, updateClue } from "@/lib/actions";
import { ClueType, ClueUpdateType } from "@/types/clues";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChangeEventHandler, MouseEventHandler, SetStateAction, useCallback, useEffect, useState } from "react";

interface ConfirmationType {
    visible: boolean
    clue_id: string
    action: "verification" | "deletion"
    clue: string
    data?: ClueUpdateType
    setClueVisible: React.Dispatch<SetStateAction<boolean>>
}

interface ConfirmationProps {
    confirmation: ConfirmationType
    setConfirmation: React.Dispatch<SetStateAction<ConfirmationType>>
}

interface ClueProps {
    clue: ClueType
    setConfirmation: React.Dispatch<SetStateAction<ConfirmationType>>
}

interface InputProps {
    label: string
    value: string
    onChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>
    options?: string[]
}

interface ActionButtonProps {
    text: string
    action: "verification" | "deletion"
    onClick: MouseEventHandler<HTMLButtonElement>
}

export default function Dashboard({ category, clues }: { category?: string, clues?: ClueType[] }) {
    const [confirmation, setConfirmation] = useState({} as ConfirmationType);

    const categoryKeys = Object.keys(categories);
    const categoryOptions = [];
    for (let i = 0; i < categoryKeys.length; i++) {
        const category = categoryKeys[i];
        categoryOptions.push(<option key={category}>{category}</option>);
    }

    const [searchCategory, setSearchCategory] = useState(category !== undefined ? category : categoryKeys[0]);

    const pathname = usePathname();
    const search = async () => {
        const params = new URLSearchParams();
        params.set("category", searchCategory);
        window.location.href = `${pathname}?${params.toString()}`;
    };
    const clear = async () => {
        window.location.href = pathname;
    }

    const clueElements = [];
    if (clues !== undefined) {
        for (let i = 0; i < clues.length; i++) {
            const clue = clues[i];
            if (!clue.verified) {
                clueElements.push(<Clue key={i} clue={clue} setConfirmation={setConfirmation} />);
            }
        }
    }

    return (
        <>
            <div>
                <div className="filter-bar justify-end">
                    <label>
                        {category !== undefined ? (
                            <Link className="link" href={`/${category}`}>Category:</Link>
                        ) : (
                            <span>Category:</span>
                        )}
                        <span> </span>
                        <select
                            className="input"
                            value={searchCategory}
                            onChange={(e) => setSearchCategory(e.target.value)}
                        >
                            {categoryOptions}
                        </select>
                    </label>
                    <div className="grid grid-cols-2 gap-1 md:flex">
                        <FilterButton text="Search" onClick={search} />
                        <FilterButton text="Clear" onClick={clear} />
                    </div>
                </div>
                {clueElements.length > 0 ? (
                    <div>{clueElements}</div>
                ) : (
                    <div className="p-10 text-center">
                        <p>Perform a search to get started...</p>
                    </div>
                )}
            </div>
            <Confirmation confirmation={confirmation} setConfirmation={setConfirmation} />
        </>
    );
}

function FilterButton({ text, onClick }: { text: string, onClick: MouseEventHandler<HTMLInputElement> }) {
    return (
        <input
            className="bg-background-primary rounded px-3 py-2 cursor-pointer"
            type="submit"
            value={text}
            onClick={onClick}
        />
    )
}

function Confirmation({ confirmation, setConfirmation }: ConfirmationProps) {
    const confirm = async () => {
        if (confirmation.action == "verification") {
            await updateClue(confirmation.clue_id, confirmation.data!);
        } else if (confirmation.action == "deletion") {
            await deleteClue(confirmation.clue_id);
        }
        setConfirmation({visible: false} as ConfirmationType);
        confirmation.setClueVisible(false);
    }

    const hide = useCallback(() => {
        setConfirmation((confirmation) => {
            return {...confirmation, visible: false};
        });
    }, [setConfirmation]);

    useEffect(() => {
        if (confirmation.visible == true) {
            window.addEventListener("keydown", (event) => {
                if (event.key == "Escape") {
                    hide();
                }
            });
        }
    }, [confirmation.visible, hide]);

    return (
        <div className={
            `z-300
            ${confirmation.visible ? "block" : "hidden"}
            bg-background-primary
            fixed
            bottom-0
            w-full
            p-5`
        }>
            <p className="text-center md:text-left">
                Confirm your {confirmation.action} of clue &quot;{confirmation.clue}&quot;?
            </p>
            <div className="mt-5 grid grid-cols-2 md:flex md:justify-end gap-2">
                <button className="button cursor-pointer" onClick={confirm}>Confirm</button>
                <button className="button cursor-pointer" onClick={hide}>Cancel</button>
            </div>
        </div>
    );
}

function Clue({ clue, setConfirmation }: ClueProps) {
    const [visible, setVisible] = useState(true);
    const [data, setData] = useState<ClueUpdateType>(clue);

    const updateClue = (clue: string) => setData((data) => { return {...data, clue: clue} });
    const updateAnswer = (answer: string) => setData((data) => { return {...data, answer: answer} });
    const updateCategory = (category: string) => setData((data) => { return {...data, category: category} });
    const updateWildcard = () => setData((data) => { return {...data, wildcard: !data.wildcard} });

    const verifyClue = () => {
        setConfirmation({
            visible: true,
            clue_id: clue._id,
            action: "verification",
            clue: data.clue,
            data: data,
            setClueVisible: setVisible,
        });
    };

    const deleteClue = () => {
        setConfirmation({
            visible: true,
            clue_id: clue._id,
            action: "deletion",
            clue: data.clue,
            data: undefined,
            setClueVisible: setVisible,
        });
    };

    return (
        <div className={`${visible ? "flex" : "hidden"} bg-background-tertiary flex-col md:flex-row p-5 gap-10`}>
            <div className="grow flex flex-col md:grid md:grid-cols-3 gap-5">
                <Input label="Clue" value={data.clue} onChange={(e) => updateClue(e.target.value)} />
                <Input label="Answer" value={data.answer} onChange={(e) => updateAnswer(e.target.value)} />
                <Input
                    label="Category"
                    value={data.category}
                    onChange={(e) => updateCategory(e.target.value)}
                    options={Object.keys(categories)}
                />
            </div>
            <div className="flex justify-center md:items-center">
                <label>
                    <input type="checkbox" checked={data.wildcard} onChange={updateWildcard} />
                    <span> Is Wildcard?</span>
                </label>
            </div>
            <div className="grid grid-cols-2 md:flex md:items-center gap-2">
                <ActionButton action="verification" text="Verify" onClick={verifyClue} />
                <ActionButton action="deletion" text="Delete" onClick={deleteClue} />
            </div>
        </div>
    )
}

function Input({ label, value, onChange, options }: InputProps) {
    const optionElements = [];
    if (options !== undefined) {
        for (let i = 0; i < options.length; i++) {
            optionElements.push(<option key={i}>{options[i]}</option>);
        }
    }

    return (
        <div className="flex flex-col gap-1">
            <p className="text-xs">{label}</p>
            {optionElements.length > 0 ? (
                <select className="input" value={value} onChange={onChange}>{optionElements}</select>
            ) : (
                <input className="input" value={value} onChange={onChange} placeholder={label} />
            )}
        </div>
    )
}

function ActionButton({ text, action, onClick }: ActionButtonProps) {
    let className = undefined;
    let path = undefined;
    if (action == "verification") {
        className = "text-confirmation border-confirmation";
        path = <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />;
    } else if (action == "deletion") {
        className = "text-error border-error";
        path = <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />;
    }

    return (
        <button className={
            `border
            cursor-pointer
            hover:bg-background-primary
            bg-background-secondary
            rounded
            p-2
            md:size-min
            ${className !== undefined && className}`
        } onClick={onClick}>
            <span className={`${className !== undefined && "md:hidden"}`}>{text} </span>
            {path && (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="inline size-5 md:size-6 align-text-bottom"
                >{path}</svg>
            )}
        </button>
    )
}
