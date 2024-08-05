"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "../ui/components/Navbar";
import Sidebar from "../ui/components/Sidebar";
import { SidebarProvider } from "../ui/components/context/SidebarContext";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "IAcademy",
//   description: "A sua plataforma de ensino por IA",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <html lang="pt-br">
      <body
        className={`${inter.className} h-[100vh] overflow-hidden select-none`}
      >
        <SidebarProvider>
          <Navbar />
          <main className="flex w-full h-full">
            <Sidebar />
            <section className="px-[200px] pt-[40px] pb-[140px] gap-10 flex flex-col overflow-auto w-full">
              {children}
            </section>
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
