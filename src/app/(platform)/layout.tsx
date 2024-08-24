"use client";

import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "../ui/components/Navbar";
import Sidebar from "../ui/components/Sidebar";
import { SidebarProvider } from "../context/SidebarContext";
import { UserProvider } from "../context/UserContext";
import PremiumCard from "../ui/components/Cardpremium";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showCard, setShowCard] = useState(false);
  const [title, setTitle] = useState("IAcademy");
  const pathname = usePathname();

  useEffect(() => {
    const lastShown = localStorage.getItem("lastShownTime");

    if (!lastShown || Date.now() - parseInt(lastShown) > 1800000) {
      setShowCard(true);
      localStorage.setItem("lastShownTime", Date.now().toString());
    }

    const interval = setInterval(() => {
      setShowCard(true);
      localStorage.setItem("lastShownTime", Date.now().toString());
    }, 1800000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setTitle(
      `${
        pathname.includes("/trilhas")
          ? "Trilhas"
          : pathname.includes("/premium")
          ? "Premium"
          : "Home"
      } | IAcademy`
    );

    document.title = title;
  });

  return (
    <html lang="pt-br">
      <head>
        <link rel="icon" href="/whiteIcon.svg" />
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
                {showCard && (
                  <div className="fixed inset-0 flex items-center justify-center z-50">
                    <PremiumCard onClose={() => setShowCard(false)} />
                  </div>
                )}
              </section>
            </main>
          </SidebarProvider>
        </UserProvider>
      </body>
    </html>
  );
}
