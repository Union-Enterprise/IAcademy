"use client";

import { usePageTitle } from "@/app/hooks/usePageTitle";
import HeaderTopic from "@/app/ui/components/trilhas/HeaderTopic";

export default function RotLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  usePageTitle();
  return (
    <>
      <HeaderTopic />
      {children}
    </>
  );
}
