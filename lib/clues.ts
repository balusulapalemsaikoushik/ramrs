import "server-only";

export async function getClue(clue: string) {
    const response = await fetch(
        `${process.env.API_ENDPOINT}/clues/${clue}`,
        { cache: "no-store" }
    );
    if (!response.ok) {
        let message = "Something went wrong.";
        if (response.status == 404) {
            const error = await response.json();
            message = `404: ${error.detail || "Not Found"}`;
        }
        throw new Error(message);
    }
    return await response.json();
}

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

    const response = await fetch(endpoint, { cache: "no-store" });
    if (!response.ok) {
        let message = "Something went wrong.";
        if (response.status == 400) {
            const error = await response.json();
            message = `400: ${error.detail || "Bad Request"}`;
        } else if (response.status == 404) {
            const error = await response.json();
            message = `404: ${error.detail || "Not Found"}`;
        } else if (response.status == 422) {
            message = "422: One or more of your query strings aren't in the correct format. Please enter acceptable values.";
        }
        throw new Error(message);
    }
    return await response.json();
}
