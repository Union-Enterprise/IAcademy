import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "../ui/components/Navbar";
import Sidebar from "../ui/components/Sidebar";
import { SidebarProvider } from "../context/SidebarContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard | IAcademy",
  description: "Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="icon" href="/favicon.svg" />
      </head>
      <body
        className={`${inter.className} h-[100vh] overflow-hidden select-none`}
      >
        <SidebarProvider>
          <Navbar />
          <main className="flex w-full h-full">
            <Sidebar isUserLayout={false} />
            <section className="gap-10 *:mx-[160px] *:mt-[40px] flex flex-col overflow-auto w-full">
              {children}
            </section>
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
