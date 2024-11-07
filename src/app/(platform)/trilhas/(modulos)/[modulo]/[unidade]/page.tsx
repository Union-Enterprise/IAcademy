"use client";

import { useParams } from "next/navigation";
import { getModulosData } from "@/app/ui/components/modulos/data"; 
import { ContentsSection } from "@/app/ui/trilha/ContentsSection";
import normalizeString from "@/app/ui/components/modulos/normalizeString";
import { usePageTitle } from "@/app/hooks/usePageTitle";
import { useEffect, useState } from "react";

type ModuloKey = string; 

export default function Topicos() {
  usePageTitle();
  const params = useParams();
  const moduloKey = decodeURIComponent(params.modulo);
  const unidadeKey = decodeURIComponent(params.unidade);

  const [modulosData, setModulosData] = useState<Record<string, any> | null>(null);
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

  if (!modulosData || !(moduloKey in modulosData)) {
    return <p>Módulo não encontrado3.</p>;
  }

  const modulo = modulosData[moduloKey];
  if (!modulo) {
    return <p>Módulo não encontrado4.</p>;
  }

  const unidade = modulo.unidades.find(
    (unidade: any) => normalizeString(unidade.title) === unidadeKey
  );

  if (!unidade) {
    return <p>Unidade não encontrada.</p>;
  }

  return (
    <>
      <section className="flex flex-col gap-3 px-[200px] relative h-full mt-6">
        {unidade.topicos.map((topico: any, idx: number) => (
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
