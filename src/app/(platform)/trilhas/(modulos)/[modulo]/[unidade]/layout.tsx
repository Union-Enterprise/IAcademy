"use client";

import { usePageTitle } from "@/app/hooks/usePageTitle";
import Header from "@/app/ui/components/trilhas/Header";
import { useParams, usePathname } from "next/navigation";
import { getModulosData } from "@/app/ui/components/modulos/data"; 
import normalizeString from "@/app/ui/components/modulos/normalizeString";
import { useEffect, useState } from "react";
import HeaderUnidade from "@/app/ui/components/trilhas/HeaderUnidade";

type ModuloKey = string;

export default function UnidadeTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  usePageTitle();

  const pathname = usePathname();
  const [isPathnameLoaded, setIsPathnameLoaded] = useState(false);

  const params = useParams();
  const moduloKey = decodeURIComponent(params.modulo);
  const unidadeKey = decodeURIComponent(params.unidade);
  const moduloLink = params.modulo as string;
  const unidadeLink = params.unidade as string;

  const [modulosData, setModulosData] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log(moduloKey)

  useEffect(() => {
    const fetchModulosData = async () => {
      try {
        const data = await getModulosData();
        setModulosData(data);
      } catch (err) {
        setError("Erro ao carregar os dados dos módulos.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchModulosData();
  }, []);

  useEffect(() => {
    if (pathname) {
      setIsPathnameLoaded(true);
    }
  }, [pathname]);

  if (!isPathnameLoaded || loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!modulosData || !(moduloKey in modulosData)) {
    return <p>Módulo não encontrado2.</p>;
  }

  const modulo = modulosData[moduloKey as ModuloKey];

  const isUnidadeOrTopicosPath =
    pathname.endsWith(unidadeLink) || pathname.endsWith(`${unidadeLink}/topicos`);

  if (!isUnidadeOrTopicosPath) {
    return children;
  }

  const unidade = modulo.unidades.find(
    (unidade: any) => normalizeString(unidade.title) === unidadeKey
  );

  if (!unidade) {
    return <p>Unidade não encontrada.</p>;
  }

  return (
    <section className="flex flex-col gap-5">
      <HeaderUnidade
        title={unidade.title}
        description={unidade.description}
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
