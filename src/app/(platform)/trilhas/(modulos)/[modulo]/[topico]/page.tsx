"use client";

import { useParams } from "next/navigation";
import { modulosData } from "@/app/ui/components/modulos/data";
import { ContentsSection } from "@/app/ui/trilha/ContentsSection";
import normalizeString from "@/app/ui/components/modulos/normalizeString";
import Link from "next/link";

type ModuloKey = keyof typeof modulosData;

export default function Topico() {
  const params = useParams();
  const moduloKey = params.modulo;
  const topicoKey = params.topico;

  const modulo = modulosData[moduloKey as ModuloKey];

  if (!modulo) {
    return <p>Módulo não encontrado.</p>;
  }

  const topico = modulo.topics.find(
    (topic) => normalizeString(topic.title) === topicoKey
  );

  if (!topico) {
    return <p>Tópico não encontrado.</p>;
  }

  return (
    <div>
      <h1>{topico.title}</h1>
    </div>
  );
}
