"use client"

import { useState } from "react";
import Link from "next/link";

import { ExportContext, ExportType, FiltersContext } from "@/app/context";
import Filters from "./filters";
import Export from "./export";

interface ContentProps {
    isModerator: boolean
    category: string
    categoryElements: React.ReactNode[]
}

export default function Content({ isModerator, category, categoryElements }: ContentProps) {
    const [filters, setFilters] = useState({ wildcards: false, unverified: false });
    const [exports, setExports] = useState({} as ExportType);

    let moderatorRoute = undefined;
    if (isModerator) {
        const params = new URLSearchParams();
        params.set("category", category);
        moderatorRoute = `/dashboard?${params}`
    }

    return (
        <FiltersContext.Provider value={{ filters, setFilters }}>
            <ExportContext.Provider value={{ exports, setExports }}>
                <div>
                    <div className="p-10">
                        <h1>{category}</h1>
                        <h2>{category} clues</h2>
                        <div className="flex flex-col md:flex-row mt-10 gap-2">
                            <Export />
                            {moderatorRoute !== undefined && (
                                <Link className="button" href={moderatorRoute}>Edit this category</Link>
                            )}
                        </div>
                    </div>
                </div>
                <Filters />
                <div>{categoryElements}</div>
            </ExportContext.Provider>
        </FiltersContext.Provider>
    )
}
