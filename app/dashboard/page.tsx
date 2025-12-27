import { auth0 } from "@/lib/auth0";
import NavBar from "../_components/navbar";
import { redirect } from "next/navigation";
import Dashboard from "./_components/dashboard";
import Top from "../_components/top";
import Copyright from "../_components/copyright";
import { getClue, getClues } from "@/lib/clues";

interface PageProps {
    searchParams: Promise<{ category?: string, nresults?: string, clue?: string }>
}

export default async function Page({ searchParams }: PageProps) {
    const session = await auth0.getSession();

    if (!session) {
        const params = new URLSearchParams();
        params.set("returnTo", "/dashboard");
        redirect(`/auth/login?${params.toString()}`);
    }

    const { category, nresults, clue } = await searchParams;
    let clues = undefined;
    let error = undefined;
    if ((clue !== undefined) && (category !== undefined || nresults !== undefined)) {
        error = "You are trying to search for a clue and apply filters at the same time. Please choose one to continue.";
    } else {
        if (category !== undefined) {
            clues = await getClues(category, nresults, false).catch((errorData) => {
                error = errorData.message;
            });
        } else if (clue !== undefined) {
            if (clue.length == 0) {
                error = "No clue was provided. Please search for a valid one."
            } else {
                const result = await getClue(clue).catch((errorData) => {
                    error = errorData.message;
                });
                clues = result !== undefined ? [result] : undefined;
            }
        }
    }

    return (
        <div>
            <NavBar username={session.user.name} />
            <div className="p-10">
                <h1>dashboard</h1>
                <h2>moderator dashboard</h2>
            </div>
            <Dashboard category={category} nresults={nresults} clue={clue} clues={clues} error={error} />
            <Top />
            <Copyright />
        </div>
    );
}
