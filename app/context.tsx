import { createContext, SetStateAction } from "react";

interface FiltersType {
    wildcards: boolean
    unverified: boolean
}

interface FiltersContextType {
    filters: FiltersType
    setFilters: React.Dispatch<SetStateAction<FiltersType>>
}

export const FiltersContext = createContext<FiltersContextType | null>(null);

export interface ExportType {
    [clue: string]: string
}

interface ExportContextType {
    exports: ExportType
    setExports: React.Dispatch<SetStateAction<ExportType>>
}

export const ExportContext = createContext<ExportContextType | null>(null);
