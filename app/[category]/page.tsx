import { getUsername } from "@/lib/auth";
import Copyright from "../_components/copyright";
import NavBar from "../_components/navbar";
import Top from "../_components/top";
import { getClues } from "@/lib/clues";
import Category from "./_components/category";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ category: string }> }) {
    let { category } = await params;

    const clues = await getClues(category).catch((error) => {
        if (error.message.includes("404")) {
            notFound();
        }
    });

    category = decodeURI(category);

    const username = await getUsername();

    return (
        <div className="page">
            <NavBar username={username} />
            <Category name={category} data={clues} isModerator={username !== undefined} />
            <Top />
            <Copyright />
        </div>
    );
}
