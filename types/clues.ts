export interface ClueType {
    _id: string
    clue: string
    label: string
    verified: boolean
    answer: string
    category: string
    wildcard: boolean
    frequency: number
}

export interface ClueUpdateType {
    clue: string
    answer: string
    category: string
    wildcard: boolean
}
