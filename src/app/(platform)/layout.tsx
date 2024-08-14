import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "../ui/components/Navbar";
import Sidebar from "../ui/components/Sidebar";
import { SidebarProvider } from "../ui/components/context/SidebarContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IAcademy",
  description: "A sua plataforma de ensino por IA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${inter.className} h-[100vh] overflow-hidden select-none bg-background-light`}
      >
        <SidebarProvider>
          <Navbar />
          <main className="flex w-full h-full">
            <Sidebar />
            <section className="gap-10 *:mb-[140px] flex flex-col overflow-auto w-full">
              {children}
            </section>
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
