"use server"

import { ClueUpdateType } from "@/types/clues";
import { auth0 } from "./auth0";

export async function updateClue(clue_id: string, clue: ClueUpdateType) {
    const { token } = await auth0.getAccessToken();
    await fetch(
        `${process.env.API_ENDPOINT}/clues/${clue_id}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(clue),
        }
    )
}

export async function deleteClue(clue_id: string) {
    const { token } = await auth0.getAccessToken();
    await fetch(
        `${process.env.API_ENDPOINT}/clues/${clue_id}`,
        {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        }
    )
}
