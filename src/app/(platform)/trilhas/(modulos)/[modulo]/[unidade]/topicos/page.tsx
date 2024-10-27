"use client";

import { useParams } from "next/navigation";
import { modulosData } from "@/app/ui/components/modulos/data";
import { ContentsSection } from "@/app/ui/trilha/ContentsSection";
import normalizeString from "@/app/ui/components/modulos/normalizeString";
import { usePageTitle } from "@/app/hooks/usePageTitle";

type ModuloKey = keyof typeof modulosData;

export default function Topicos() {
  usePageTitle();
  const params = useParams();
  const moduloKey = params.modulo as ModuloKey;
  const unidadeKey = params.unidade;

  const modulo = modulosData[moduloKey];
  if (!modulo) {
    return <p>Módulo não encontrado.</p>;
  }

  const unidade = modulo.unidades.find(
    (unidade) => normalizeString(unidade.title) === unidadeKey
  );

  if (!unidade) {
    return <p>Unidade não encontrada.</p>;
  }

  console.log(modulo, moduloKey);
  console.log(unidade, unidadeKey);

  return (
    <>
      <section className="flex flex-col gap-3 px-[200px] relative h-full mt-6">
        {unidade.topicos.map((topico, idx) => (
          <ContentsSection
            key={idx}
            title={topico.title}
            href={`/trilhas/${moduloKey}/${unidadeKey}/${normalizeString(
              topico.title
            )}`}
          >
            <p>{topico.description}</p>
          </ContentsSection>
        ))}
      </section>
    </>
  );
}
