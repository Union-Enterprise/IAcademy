"use client";

import { useParams } from "next/navigation";
import { modulosData } from "@/app/ui/components/modulos/data";
import { ContentsSection } from "@/app/ui/trilha/ContentsSection";
import normalizeString from "@/app/ui/components/modulos/normalizeString";

type ModuloKey = keyof typeof modulosData;

export default function ModuloTopics() {
  const params = useParams();
  const moduloKey = params.modulo;
  const modulo = modulosData[moduloKey as ModuloKey];

  if (!modulo) {
    return <p>Módulo não encontrado.</p>;
  }

  return (
    <section className="flex flex-col gap-3 px-[200px] relative h-full mt-6">
      {modulo.topics.map((topic, idx) => (
        <ContentsSection
          key={idx}
          title={topic.title}
          href={`/trilhas/${moduloKey}/${normalizeString(topic.title)}`}
        >
          <p>{topic.description}</p>
        </ContentsSection>
      ))}
    </section>
  );
}
