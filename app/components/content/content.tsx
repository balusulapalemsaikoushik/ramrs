"use client"

import { useState } from "react";

import { FiltersContext } from "@/app/context";
import Filters from "../filters/filters";

export default function Content({ categoryElements }: { categoryElements: React.ReactNode[] }) {
    const [filters, setFilters] = useState({ wildcards: false, unverified: true });

    return (
        <FiltersContext.Provider value={{ filters, setFilters }}>
            <Filters />
            <div>{categoryElements}</div>
        </FiltersContext.Provider>
    )
}
