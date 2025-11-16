import Link from "next/link";
import NavBar from "./components/navbar/navbar";
import Copyright from "./components/copyright/copyright";
import Top from "./components/top/top";

export default async function Home() {
    return (
        <div className="page">
            <NavBar />
            <div>
                <div className="p-10">
                    <h1>ramrs</h1>
                    <h2>the original qb stock list</h2>
                    <p className="mt-10">ramrs is a grand list of Quiz Bowl (QB) &quot;stock,&quot; or clues that frequently appear in QB questions and generally point to a single answer. The current database has ~60k clues (and growing!) and serves as a helpful study tool for players looking to win their next QB tournament. To get started, click on one of the categories below:</p>
                    <div className="mt-10 flex flex-col md:flex-row gap-5 flex-wrap justify-center">
                        <Link className="homepage-category" href="/history">History</Link>
                        <Link className="homepage-category" href="/literature">Literature</Link>
                        <Link className="homepage-category" href="/science">Science</Link>
                        <Link className="homepage-category" href="/arts">Fine Arts</Link>
                        <Link className="homepage-category" href="/geography">Geography</Link>
                        <Link className="homepage-category" href="/trash">Trash</Link>
                        <Link className="homepage-category" href="/mythology">Mythology</Link>
                        <Link className="homepage-category" href="/social science">Social Science</Link>
                        <Link className="homepage-category" href="/philosophy">Philosophy</Link>
                        <Link className="homepage-category" href="/religion">Religion</Link>
                    </div>
                </div>
                <div className="bg-background-tertiary grid md:grid-cols-2">
                    <div className="p-10">
                        <h2>frequently asked questions</h2>
                        <FAQSection title="Where are QB questions downloaded from?">
                            Question sets are downloaded off of the <Link className="link" href="https://quizbowlpackets.com/" target="_blank">High School Quizbowl Packet Archive</Link> and parsed by a script that converts them into a more accessible format. ramrs is not affiliated with the Quizbowl Packet Archive or its partners and sponsors.
                        </FAQSection>
                        <FAQSection title="How are clues extracted from QB questions?">
                            The clue extraction process combines regular expression-based pattern matching and natural language processing steps.
                        </FAQSection>
                        <FAQSection title="How do we update clues?">
                            We have a dedicated team of players that delete unnecessary clues and maintain existing ones to ensure that ramrs only contains pure &quot;stock.&quot;
                        </FAQSection>
                    </div>
                    <div className="p-10">
                        <h2>contributing</h2>
                        <p className="mt-10">ramrs isn&apos;t perfect. If you would like to contribute to the ramrs codebase, see the <Link className="link" href="https://github.com/balusulapalemsaikoushik/ramrs" target="_blank">GitHub repo</Link> for more information.</p>
                    </div>
                </div>
            </div>
            <Top />
            <Copyright />
        </div>
    );
}

function FAQSection({ title, children }: { title: string, children?: string | React.ReactNode[] }) {
    return (
        <div className="mt-10">
            <h3>{title}</h3>
            <p className="mt-5">{children}</p>
        </div>
    )
}
