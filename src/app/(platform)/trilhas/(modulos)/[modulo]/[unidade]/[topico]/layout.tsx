"use client";

import { usePageTitle } from "@/app/hooks/usePageTitle";
import { useParams } from "next/navigation";
import { modulosData } from "@/app/ui/components/modulos/data";
import normalizeString from "@/app/ui/components/modulos/normalizeString";
import Link from "next/link";

type ModuloKey = keyof typeof modulosData;

export default function TopicoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  usePageTitle();

  const params = useParams();
  const moduloKey = params.modulo as ModuloKey;
  const unidadeKey = params.unidade;
  const topicoKey = params.topico;

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

  const topico = unidade.topicos.find(
    (topico) => normalizeString(topico.title) === topicoKey
  );

  if (!topico) {
    return <p>Tópico não encontrado.</p>;
  }

  return (
    <section className="grid grid-cols-3 gap-5 h-full">
      <div className="col-span-2 *:w-full m-10 overflow-auto pr-5 flex flex-col gap-5">
        <Link href={`/trilhas/${moduloKey}/${unidadeKey}`}>Voltar</Link>
        {children}
      </div>
      <div className="col-span-1 bg-bg-lightA border-2 border-borders-lightA rounded-lg p-10">
        <p>Chat do PT</p>
      </div>
    </section>
  );
}
