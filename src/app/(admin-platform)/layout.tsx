"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "../ui/components/Navbar";
import Sidebar from "../ui/components/Sidebar";
import { SidebarProvider } from "../context/SidebarContext";
import { usePageTitle } from "../hooks/usePageTitle";
import { UserProvider } from "../context/UserContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  usePageTitle();
  return (
    <html lang="pt-br">
      <head>
        <link rel="icon" href="/favicon.svg" />
      </head>
      <body
        className={`${inter.className} h-[100vh] overflow-hidden select-none`}
      >
        <UserProvider>
          <SidebarProvider>
            <Navbar />
            <main className="flex w-full h-full">
              <Sidebar isUserLayout={false} />
              <section className="gap-10 *:m-[40px] *:mb-[140px] flex flex-col overflow-auto w-full bg-[#FAFBFD]">
                {children}
              </section>
            </main>
          </SidebarProvider>
        </UserProvider>
      </body>
    </html>
  );
}
