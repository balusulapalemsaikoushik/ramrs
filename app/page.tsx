import categories from "@/data/categories.json";
import Category from "./components/category/category";
import NavBar from "./components/navbar/navbar";
import Top from "./components/top/top";

export default async function Home() {
    const categoryElements: React.ReactNode[] = [];
    for (const category in categories) {
        const data = await fetch(`${process.env.API_ENDPOINT}/${category}`);
        const clues = await data.json();
        categoryElements.push(<Category key={category} name={category} data={clues} />)
    }
    
    return (
        <div className="min-h-screen">
            <NavBar />
            <div>
                <div className="p-10">
                    <h1>ramrs</h1>
                    <h2>the original qb stock list</h2>
                </div>
                <div>{categoryElements}</div>
            </div>
            <Top />
        </div>
    );
}
