"use client";

import { useParams } from "next/navigation";
import { modulosData } from "@/app/ui/components/modulos/data";
import normalizeString from "@/app/ui/components/modulos/normalizeString";

type ModuloKey = keyof typeof modulosData;

export default function Unidade() {
  const params = useParams();
  const moduloKey = params.modulo;
  const unidadeKey = params.unidade;

  const modulo = modulosData[moduloKey as ModuloKey];

  if (!modulo) {
    return <p>Módulo não encontrado.</p>;
  }

  const unidade = modulo.unidades.find(
    (unidade) => normalizeString(unidade.title) === unidadeKey
  );

  if (!unidade) {
    return <p>Unidade não encontrada.</p>;
  }

  return (
    <div>
      <h1>{unidade.title}</h1>
    </div>
  );
}
