"use client";

import { usePageTitle } from "@/app/hooks/usePageTitle";
import Header from "@/app/ui/components/trilhas/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  usePageTitle();
  return (
    <>
      <Header />
      {children}
    </>
  );
}
