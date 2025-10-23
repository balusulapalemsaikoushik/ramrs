"use client"

import { useContext, useState } from "react";

import { FiltersContext } from "@/app/context";
import { Info } from "../info/info";

interface CheckboxFilterType {
    label: string
    info?: string
    value: boolean
    setValue: React.ChangeEventHandler<HTMLInputElement>
}

export default function Filters() {
    const filtersContext = useContext(FiltersContext);
    
    if (filtersContext === undefined) {
        throw new Error("Filters context not found.");
    }
    
    const [filters, setFilters] = [filtersContext!.filters, filtersContext!.setFilters];
    const [wildcards, setWildcards] = useState(filters.wildcards);

    const showWildcards = () => {
        setFilters({ ...filters, wildcards: !filters.wildcards });
        setWildcards(!wildcards);
    };

    return (
        <div className="flex flex-col md:flex-row gap-5 bg-background-secondary p-5">
            <CheckboxFilter
                label="Show wildcard clues"
                info="These clues are too broad to guarantee a single answer; however, the answer you see is probably a good guess."
                value={wildcards}
                setValue={showWildcards}
            />
        </div>
    );
}

function CheckboxFilter({ label, info, value, setValue }: CheckboxFilterType) {
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
