import type { Metadata } from "next";
import "./globals.css";

import { ThemeProvider } from "./providers";
import { Auth0Provider } from "@auth0/nextjs-auth0";

export const metadata: Metadata = {
    title: "ramrs - the original qb stock list",
    description: "the original qb stock list",
    icons: {
        icon: [
            {
                rel: "icon",
                media: "(prefers-color-scheme: light)",
                url: "/icon-light.svg",
            },
            {
                rel: "icon",
                media: "(prefers-color-scheme: dark)",
                url: "/icon-dark.svg",
            },
        ],
    },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`antialiased`}>
                <Auth0Provider>
                    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                        {children}
                    </ThemeProvider>
                </Auth0Provider>
            </body>
        </html>
    );
}
