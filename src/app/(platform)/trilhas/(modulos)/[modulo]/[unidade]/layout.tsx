"use client";

import { usePageTitle } from "@/app/hooks/usePageTitle";
import Header from "@/app/ui/components/trilhas/Header";
import { useParams, usePathname } from "next/navigation";
import { modulosData } from "@/app/ui/components/modulos/data";
import normalizeString from "@/app/ui/components/modulos/normalizeString";
import { useEffect, useState } from "react";

type ModuloKey = keyof typeof modulosData;

export default function UnidadeTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  usePageTitle();

  const pathname = usePathname();
  const [isPathnameLoaded, setIsPathnameLoaded] = useState(false);

  const params = useParams();
  const moduloKey = params.modulo;
  const unidadeKey = params.unidade;
  const moduloLink = params.modulo as string;
  const unidadeLink = params.unidade as string;
  const modulo = modulosData[moduloKey as ModuloKey];

  useEffect(() => {
    if (pathname) {
      setIsPathnameLoaded(true);
    }
  }, [pathname]);

  if (!isPathnameLoaded) {
    return <p>Carregando...</p>;
  }

  // Verifica se o pathname termina com unidadeLink ou unidadeLink + "/topicos"
  const isUnidadeOrTopicosPath =
    pathname.endsWith(unidadeLink) || pathname.endsWith(`${unidadeLink}/topicos`);

  if (!isUnidadeOrTopicosPath) {
    return children; // Renderiza apenas o conteúdo sem o layout
  }

  if (!modulo) {
    return <p>Modulo não encontrado</p>;
  }

  const unidade = modulo.unidades.find(
    (unidade) => normalizeString(unidade.title) === unidadeKey
  );

  if (!unidade) {
    return <p>Unidade não encontrada.</p>;
  }

  return (
    <section className="flex flex-col gap-5">
      <Header
        title={unidade.title}
        description={unidade.description}
        linkLabel="Tópicos"
        hrefs={[
          `/trilhas/${moduloLink}/${unidadeLink}`,
          `/trilhas/${moduloLink}/${unidadeLink}/topicos`,
          `/trilhas/${moduloLink}`,
        ]}
      />
      {children}
    </section>
  );
}
