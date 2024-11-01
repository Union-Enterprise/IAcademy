"use client";

import Link from "next/link";
import GenericIA from "@/app/ui/components/flows/GenericIA";
import { useParams } from "next/navigation";
import { modulosData } from "@/app/ui/components/modulos/data";
import Header from "@/app/ui/components/trilhas/Header";

type ModuloKey = keyof typeof modulosData;

export default function Overview({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        linkLabel="Unidades"
        hrefs={[
          `/trilhas/${modulo}`,
          `/trilhas/${modulo}/unidades`,
          "/trilhas/overview",
        ]}
      />
      <section className="grid grid-cols-3 mb-10 gap-10 relative h-full">
        <div className="col-span-2">
          <GenericIA />
        </div>
      </section>
    </>
  );
}
