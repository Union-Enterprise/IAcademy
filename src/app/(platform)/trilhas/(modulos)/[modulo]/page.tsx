"use client";

import Link from "next/link";
import GenericIA from "@/app/ui/components/flows/GenericIA";
import { useParams } from "next/navigation";
import { getModulosData } from "@/app/ui/components/modulos/data";
import Header from "@/app/ui/components/trilhas/Header";
import { useState, useEffect } from "react";

export default function Overview({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const params = useParams();
  const modulo = decodeURIComponent(params.modulo);
  const unidadeKey = decodeURIComponent(params.unidade);

  const [modulosData, setModulosData] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModulosData = async () => {
      try {
        const data = await getModulosData();
        setModulosData(data);
      } catch (err) {
        setError("Erro ao obter os dados dos módulos.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchModulosData();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!modulo || !modulosData || !(modulo in modulosData)) {
    return <div>Módulo não encontrado1.</div>;
  }

  type ModuloKey = keyof typeof modulosData;
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
      <section className="grid grid-cols-3 mb-10 gap-10 relative h-full">
        <div className="col-span-2">
          <GenericIA />
        </div>
      </section>
    </>
  );
}
