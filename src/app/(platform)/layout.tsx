"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "../ui/components/Navbar";
import Sidebar from "../ui/components/Sidebar";
import { SidebarProvider } from "../context/SidebarContext";
import { UserProvider } from "../context/UserContext";
import PremiumCard from "../ui/components/Cardpremium"
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    const showPremiumCard = () => {
      setShowCard(true);
      
    };

    showPremiumCard();

    const interval = setInterval(showPremiumCard, 180000);

    return () => clearInterval(interval);
  }, []);

  return (
    <html lang="pt-br">
      <body className={`${inter.className} h-[100vh] select-none bg-background-light`}>
        <SidebarProvider>
          <Navbar />
          <main className="flex w-full h-full">
            <Sidebar />
            <section className="gap-10 *:mb-[140px] flex flex-col overflow-auto w-full">
              {children}
              {showCard && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                  <PremiumCard onClose={() => setShowCard(false)} />
                </div>
              )}
            </section>
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
