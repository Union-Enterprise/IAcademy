"use client";

import { useParams } from "next/navigation";
import { getModulosData } from "@/app/ui/components/modulos/data";
import { ContentsSection } from "@/app/ui/trilha/ContentsSection";
import normalizeString from "@/app/ui/components/modulos/normalizeString";
import { usePageTitle } from "@/app/hooks/usePageTitle";
import Header from "@/app/ui/components/trilhas/Header";
import { useEffect, useState } from "react";

type ModuloKey = string;
export default function Unidades() {
  usePageTitle();
  const params = useParams();
  const modulo = decodeURIComponent(params.modulo);

  const [modulosData, setModulosData] = useState<Record<string, any> | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!modulo || !modulosData || !(modulo in modulosData)) {
    return <div>Módulo não encontrado6.</div>;
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
        {moduleData.unidades.map((unidade: any, idx: number) => (
          <ContentsSection
            key={idx}
            title={unidade.title}
            className="h-fit"
            href={`/trilhas/${modulo}/${normalizeString(unidade.title)}`}
          >
            <p>{unidade.description}</p>
          </ContentsSection>
        ))}
      </section>
    </>
  );
}
