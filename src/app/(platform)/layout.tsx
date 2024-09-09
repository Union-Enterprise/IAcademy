import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "../ui/components/Navbar";
import { SidebarProvider } from "../context/SidebarContext";
import Sidebar from "../ui/components/Sidebar";
import { UserProvider } from "../context/UserContext";
import { ToastProvider } from "../context/ToastContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.svg" />
      </head>
      <body
        className={`${inter.className} relative h-[100vh] pt-20 select-none bg-background-light overflow-hidden`}
      >
        <UserProvider>
          <SidebarProvider>
            <Navbar />
            <main className="flex w-full h-full">
              <Sidebar />
              <section className="flex flex-col overflow-auto w-full">
                <ToastProvider>{children}</ToastProvider>
              </section>
            </main>
          </SidebarProvider>
        </UserProvider>
      </body>
    </html>
  );
}
