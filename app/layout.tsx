import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "ramrs - the original qb stock list",
    description: "the original qb stock list",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className="dark">
            <body className={`antialiased`}>
                {children}
            </body>
        </html>
    );
}
