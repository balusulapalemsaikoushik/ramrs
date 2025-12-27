import Link from "next/link";
import NavBar from "./_components/navbar";
import Copyright from "./_components/copyright";
import Top from "./_components/top";
import { getUsername } from "@/lib/auth";

export default async function Home() {
    const username = await getUsername();

    return (
        <div className="page">
            <NavBar username={username} />
            <div>
                <div className="p-10">
                    <h1>ramrs</h1>
                    <h2>the original qb stock list</h2>
                    <p className="mt-10">ramrs is a grand list of quiz bowl (QB) &quot;stock,&quot; or clues that frequently appear in QB questions and generally point to or reference a particular answer or topic. The current database has ~60k clues (and growing!) which you can look over and even export to external flashcard apps so that you can master must-know quiz bowl concepts. Whether you&apos;re a beginner looking for a place to start your QB journey or an experienced player cramming in last-minute information before a tournament, ramrs is a helpful study tool for those interested in this beautiful game.</p>
                    <p className="mt-10">To get started, click on one of the categories below:</p>
                    <div className="mt-10 flex flex-col md:flex-row gap-5 flex-wrap justify-center">
                        <Link className="button" href="/history">History</Link>
                        <Link className="button" href="/literature">Literature</Link>
                        <Link className="button" href="/science">Science</Link>
                        <Link className="button" href="/arts">Fine Arts</Link>
                        <Link className="button" href="/geography">Geography</Link>
                        <Link className="button" href="/trash">Trash</Link>
                        <Link className="button" href="/mythology">Mythology</Link>
                        <Link className="button" href="/social science">Social Science</Link>
                        <Link className="button" href="/philosophy">Philosophy</Link>
                        <Link className="button" href="/religion">Religion</Link>
                    </div>
                </div>
                <div className="bg-background-tertiary pb-15">
                    <div className="p-10">
                        <h2>frequently asked questions</h2>
                        <FAQSection title="How do you gather stock clues?">
                            Clues are automatically extracted from across hundreds of QB question sets made accessible to the public over the years. These question packets are downloaded off of the <Link className="link" href="https://quizbowlpackets.com/" target="_blank">High School Quizbowl Packet Archive</Link> and fed through a series of data preprocessing and machine learning steps before another machine learning model extracts the actual clues. The clues are then ranked based on their frequency across questions on the backend, after which they are made visible on this website. ramrs is not affiliated with the Quizbowl Packet Archive or its partners and sponsors.
                        </FAQSection>
                        <FAQSection title="So, how do you verify the accuracy of these clues?">
                            Naturally, anything automatically generated is prone to error, and the same goes for the tens of thousands of clues hosted on ramrs. To account for this, we have a dedicated team of players that moderate the website, updating and deleting clues as needed. Each moderator is an expert at their subject, and we specifically ensure that clue-answer pairs are accurate (and resemble what you&apos;d actually see at a QB tournament) before verifying them.
                        </FAQSection>
                        <FAQSection title="How can I contribute?">
                            Right now, the moderator team is only limited to a handful of selected players. However, the code that ramrs runs on certainly isn&apos;t perfect, and we&apos;re planning on revamping the underlying algorithms in a future update that could substantially increase the size of the database. If you would like to contribute to this effort, please look into the codebase <Link className="link" href="https://github.com/balusulapalemsaikoushik/ramrs" target="_blank">here</Link>.
                        </FAQSection>
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
