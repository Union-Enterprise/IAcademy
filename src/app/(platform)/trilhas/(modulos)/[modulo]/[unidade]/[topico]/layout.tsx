"use client";

import { usePageTitle } from "@/app/hooks/usePageTitle";
import Header from "@/app/ui/components/trilhas/Header";
import { useParams } from "next/navigation";
import { modulosData } from "@/app/ui/components/modulos/data";
import normalizeString from "@/app/ui/components/modulos/normalizeString";

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

  console.log(topico);

  if (!topico) {
    return <p>Tópico não encontrado.</p>;
  }

  return <section className="flex flex-col gap-5">{children}</section>;
}
