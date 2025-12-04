import { auth0 } from "@/lib/auth0";
import NavBar from "../_components/navbar";
import { redirect } from "next/navigation";
import Dashboard from "./_components/dashboard";
import Top from "../_components/top";
import Copyright from "../_components/copyright";
import { getClues } from "@/lib/clues";

export default async function Page({ searchParams }: { searchParams: Promise<{ category: string }> }) {
    const session = await auth0.getSession();

    if (!session) {
        const params = new URLSearchParams();
        params.set("returnTo", "/dashboard");
        redirect(`/auth/login?${params.toString()}`);
    }

    let clues = undefined;
    const { category } = await searchParams;
    if (category !== undefined) {
        clues = await getClues(category);
    }

    return (
        <div>
            <NavBar username={session.user.name} />
            <div className="p-10">
                <h1>dashboard</h1>
                <h2>moderator dashboard</h2>
            </div>
            <Dashboard category={category} clues={clues} />
            <Top />
            <Copyright />
        </div>
    );
}
