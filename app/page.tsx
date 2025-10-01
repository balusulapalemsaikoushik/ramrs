import categories from "@/data/categories.json";
import Category from "./components/category/category";
import NavBar from "./components/navbar/navbar";

export default function Home() {
    const categoryElements: React.ReactNode[] = [];
    for (const category in categories) {
        categoryElements.push(<Category key={category} name={category} />)
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
        </div>
    );
}
