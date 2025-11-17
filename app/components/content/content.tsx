"use client"

import { useState } from "react";

import { ExportContext, ExportType, FiltersContext } from "@/app/context";
import Filters from "../filters/filters";
import Export from "../export/export";

export default function Content({ category, categoryElements }: { category: string, categoryElements: React.ReactNode[] }) {
    const [filters, setFilters] = useState({ wildcards: false, unverified: false });
    const [exports, setExports] = useState({} as ExportType);

    return (
        <FiltersContext.Provider value={{ filters, setFilters }}>
            <ExportContext.Provider value={{ exports, setExports }}>
                <div>
                    <div className="p-10">
                        <h1>{category}</h1>
                        <h2>{category} clues</h2>
                        <div className="flex flex-col md:flex-row mt-10">
                            <Export />
                        </div>
                    </div>
                </div>
                <Filters />
                <div>{categoryElements}</div>
            </ExportContext.Provider>
        </FiltersContext.Provider>
    )
}
