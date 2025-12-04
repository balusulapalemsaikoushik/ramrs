import { notFound } from "next/navigation";
import "server-only";

export async function getClues(category: string) {
    return await fetch(
        `${process.env.API_ENDPOINT}/categories/${category}`,
        { cache: "no-store" }
    ).then((response) => {
        if (response.status == 404) {
            notFound();
        }
        return response.json();
    });
}
