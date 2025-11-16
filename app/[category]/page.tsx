import Category from "../components/category/category";
import Content from "../components/content/content";
import Copyright from "../components/copyright/copyright";
import NavBar from "../components/navbar/navbar";
import Top from "../components/top/top";

export default async function Page({ params }: { params: Promise<{ category: string }> }) {
    let { category } = await params;

    const data = await fetch(`${process.env.API_ENDPOINT}/clues/${category}`, { cache: "no-store" });
    const clues = await data.json();

    category = decodeURI(category);

    return (
        <div className="page">
            <NavBar />
            <div>
                <div className="p-10">
                    <h1>{category}</h1>
                    <h2>{category} clues</h2>
                </div>
                <Content categoryElements={[<Category key={category} name={category} data={clues} />]} />
            </div>
            <Top />
            <Copyright />
        </div>
    );
}
