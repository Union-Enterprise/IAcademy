"use client";

import { useParams } from "next/navigation";
import { modulosData } from "@/app/ui/components/modulos/data";
import { ContentsSection } from "@/app/ui/trilha/ContentsSection";
import normalizeString from "@/app/ui/components/modulos/normalizeString";
import { usePageTitle } from "@/app/hooks/usePageTitle";
import Header from "@/app/ui/components/trilhas/Header";

type ModuloKey = keyof typeof modulosData;

export default function Unidades() {
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
        linkLabel="Unidades"
        hrefs={[
          `/trilhas/${modulo}`,
          `/trilhas/${modulo}/unidades`,
          "/trilhas/overview",
        ]}
      />
      <section className="flex flex-col gap-3 px-[200px] relative h-full mt-6">
        {moduleData.unidades.map((unidade, idx) => (
          <ContentsSection
            key={idx}
            title={unidade.title}
            href={`/trilhas/${modulo}/${normalizeString(unidade.title)}`}
          >
            <p>{unidade.description}</p>
          </ContentsSection>
        ))}
      </section>
    </>
  );
}
