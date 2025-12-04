import { getUsername } from "@/lib/auth";
import Category from "./_components/category";
import Content from "./_components/content";
import Copyright from "../_components/copyright";
import NavBar from "../_components/navbar";
import Top from "../_components/top";
import { getClues } from "@/lib/clues";

export default async function Page({ params }: { params: Promise<{ category: string }> }) {
    let { category } = await params;

    const clues = await getClues(category);

    category = decodeURI(category);

    const username = await getUsername();

    return (
        <div className="page">
            <NavBar username={username} />
            <Content
                isModerator={username !== undefined}
                category={category}
                categoryElements={[<Category key={category} name={category} data={clues} />]}
            />
            <Top />
            <Copyright />
        </div>
    );
}
