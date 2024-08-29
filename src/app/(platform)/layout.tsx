"use client";

import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "../ui/components/Navbar";
import Sidebar from "../ui/components/Sidebar";
import { SidebarProvider } from "../context/SidebarContext";
import { UserProvider } from "../context/UserContext";
import { usePageTitle } from "../hooks/usePageTitle";
import PremiumCardManager from "../ui/components/PremiumCardManager";

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
        className={`${inter.className} h-[100vh] select-none bg-background-light overflow-hidden`}
      >
        <UserProvider>
          <SidebarProvider>
            <Navbar />
            <main className="flex w-full h-full">
              <Sidebar />
              <section className="flex flex-col overflow-auto w-full">
                {children}
                <PremiumCardManager />
              </section>
            </main>
          </SidebarProvider>
        </UserProvider>
      </body>
    </html>
  );
}
