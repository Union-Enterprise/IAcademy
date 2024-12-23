"use client";

import { usePageTitle } from "@/app/hooks/usePageTitle";
import TrilhaMenu from "@/app/ui/components/trilhas/TrilhaMenu";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  usePageTitle();
  return (
    <section className="my-[50px] mx-[100px]">
      <TrilhaMenu />
      {children}
    </section>
  );
}
