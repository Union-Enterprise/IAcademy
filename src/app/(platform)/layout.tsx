"use client";

import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "../ui/components/Navbar";
import { SidebarProvider } from "../context/SidebarContext";
import Sidebar from "../ui/components/Sidebar";
import { UserProvider, useUser } from "../context/UserContext";
import { ToastProvider } from "../context/ToastContext";
import { usePageTitle } from "../hooks/usePageTitle";
import { useState, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  usePageTitle();

 

  return (
    <html lang="pt-br" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.svg" />
      </head>
      <body
        className={`${inter.className} relative h-[100vh] pt-20 select-none bg-bg-light flex`}
      >
        <UserProvider>
          <SidebarProvider>
            <Navbar />
            <Sidebar />
            <main className="flex flex-col overflow-auto w-full h-[calc(100% - 80px)]">
              <ToastProvider>{children}</ToastProvider>
            </main>
          </SidebarProvider>
        </UserProvider>
      </body>
      
    </html>
  );
}
