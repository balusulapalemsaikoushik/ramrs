import { notFound } from "next/navigation";
import "server-only";

export async function getClues(category: string, nresults?: string, verified?: boolean) {
    let endpoint = `${process.env.API_ENDPOINT}/categories/${category}`;
    const params = new URLSearchParams();
    if (nresults !== undefined) {
        params.set("nresults", nresults);
    }
    if (verified !== undefined) {
        params.set("verified", verified.toString());
    }
    if (params.size > 0) {
        endpoint += `?${params.toString()}`;
    }

    return await fetch(
        endpoint,
        { cache: "no-store" }
    ).then((response) => {
        if (response.status == 400 || response.status == 404 || response.status == 422) {
            notFound();
        }
        return response.json();
    });
}
