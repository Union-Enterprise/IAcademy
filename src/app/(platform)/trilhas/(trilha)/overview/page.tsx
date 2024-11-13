"use client";

import Link from "next/link";
import Generic from "@/app/ui/components/flows/Generic";
import { MessageCircleQuestion } from "lucide-react";
import { usePathname } from "next/navigation";
import TrilhaMenu from "@/app/ui/components/trilhas/TrilhaMenu";
import { useEffect, useState } from "react";
import { getModulosData } from "@/app/ui/components/modulos/data";


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

export default function Overview({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pathname = usePathname();
  const [modulosData, setModulosData] = useState<Record<string, ModuloProps> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalTopicsCount, setTotalTopicsCount] = useState<number>(0);

  const getTotalTopicsCount = (data: Record<string, ModuloProps> | null): number => {
    if (!data) return 0;

    let totalTopics = 0;
    for (const moduleKey in data) {
      const module = data[moduleKey];
      for (const unidade of module.unidades) {
        totalTopics += unidade.topicos.length;
      }
    }
    return totalTopics;
  };

  useEffect(() => {
    const fetchModulosData = async () => {
      try {
        const data = await getModulosData();
        setModulosData(data);
        const count = getTotalTopicsCount(data);
        setTotalTopicsCount(count);

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
    return <p>Não foi possível encontrar os tópicos.</p>;
  }


  return (
    <section className="mb-10 mt-5 relative flex flex-col items-center gap-5">
      <div className="bg-bg-light border-2 border-borders-light p-3 px-5 rounded-md flex justify-between gap-5 w-full *:text-sm">
        <div className="flex items-center gap-2">
          <span className="bg-yellow-200 px-2 py-1 rounded-md">
            0% concluído
          </span>
          <p>0 de {totalTopicsCount} concluídos</p>
        </div>
        <button className="*:text-text-lightSub *:text-sm flex items-center gap-2 *:opacity-50 *:duration-100 group cursor-pointer">
          <MessageCircleQuestion className="group-hover:opacity-100" />
          <p className="group-hover:opacity-100">
            Como rastrear meu progresso?
          </p>
        </button>
      </div>
      <Generic />
    </section>
  );
}
