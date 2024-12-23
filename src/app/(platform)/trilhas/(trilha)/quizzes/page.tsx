"use client";

import { ContentsSection } from "@/app/ui/trilha/ContentsSection";
import { getModulosData } from "@/app/ui/components/modulos/data";
import normalizeString from "@/app/ui/components/modulos/normalizeString";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ModuloProps {
  title: string;
  index: string;
  link: string;
  unidades: {
    title: string;
    description: string;
    topicos: { title: string; description: string }[];
  }[];
}

export default function Modulos() {
  const [modulosData, setModulosData] = useState<Record<
    string,
    ModuloProps
  > | null>(null);
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

  if (!modulosData) {
    return <p>Nenhum dado disponível.</p>;
  }

  return (
    <section className="flex flex-col items-center gap-14 relative mt-14 *:w-full">
      {Object.entries(modulosData).map(([moduloLink, modulo]) => (
        <Modulo key={modulo.index} link={moduloLink} {...modulo} />
      ))}
    </section>
  );
}

function Modulo({ title, index, unidades, link }: ModuloProps) {
  return (
    <div className="flex flex-col gap-3">
      {unidades.map((unidade, unidadeIdx) => (
        <div key={unidadeIdx} className="flex flex-col gap-1">
          {unidade.topicos.map((topico, topicoIdx) => (
            <ContentsSection
              key={topicoIdx}
              title={topico.title}
              href={`/trilhas/quiz`}
            >
              <p>{topico.description}</p>
            </ContentsSection>
          ))}
        </div>
      ))}
    </div>
  );
}
