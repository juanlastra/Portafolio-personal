import type {Metadata} from "next";
import {Mulish} from "next/font/google";
import "./globals.css";
import React from "react";
import Navbar from "@/components/layout/Navbar";
import {ThemeProvider} from "@/app/theme-provider";
import Footer from "@/components/layout/Footer";
const font = Mulish({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Juan Lastra",
    description: "",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="es" className="dark">
        <body className={font.className}>
        <ThemeProvider>
            <Navbar/>
            {children}
            <Footer/>
        </ThemeProvider>
        </body>
        </html>
    );
}
