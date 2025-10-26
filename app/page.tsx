import categories from "@/data/categories.json";
import Category from "./components/category/category";
import NavBar from "./components/navbar/navbar";
import Top from "./components/top/top";
import Content from "./components/content/content";

export default async function Home() {
    const data = await fetch(`${process.env.API_ENDPOINT}/clues`, { cache: "no-store" });
    const clues = await data.json();
    const categoryElements: React.ReactNode[] = [];
    for (const category in categories) {
        categoryElements.push(<Category key={category} name={category} data={clues[category]} />);
    }
    
    return (
        <div className="page">
            <NavBar />
            <div>
                <div className="p-10">
                    <h1>ramrs</h1>
                    <h2>the original qb stock list</h2>
                </div>
                <Content categoryElements={categoryElements} />
            </div>
            <Top />
        </div>
    );
}
