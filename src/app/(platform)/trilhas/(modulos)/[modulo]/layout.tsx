"use client";

import { usePageTitle } from "@/app/hooks/usePageTitle";
import Header from "@/app/ui/components/trilhas/Header";
import { useParams } from "next/navigation";
import { modulosData } from "@/app/ui/components/modulos/data";

type ModuloKey = keyof typeof modulosData;

export default function ModuloLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  usePageTitle();

  const params = useParams();
  const modulo = params.modulo as string;

  if (!modulo || !(modulo in modulosData)) {
    return <div>Módulo não encontrado.</div>;
  }

  const moduleData = modulosData[modulo as ModuloKey];
  return (
    <>
      <Header
        title={moduleData.title}
        description={moduleData.description}
        linkLabel="Tópicos"
        hrefs={[
          `/trilhas/${modulo}/overview`,
          `/trilhas/${modulo}/topics`,
          "/trilhas/overview",
        ]}
      />
      {children}
    </>
  );
}
