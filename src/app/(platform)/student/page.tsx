"use client";

import { ChevronRight, Dot, Router, Sparkles } from "lucide-react";
import { useUser } from "../../context/UserContext";
import { Flame } from "lucide-react";
import Link from "next/link";
import UtilizationChart from "@/app/ui/components/Student/UtilizationChart";
import { RadarHabilidades } from "@/app/ui/components/charts/RadarHabilidades";
import React, { useEffect, useState } from "react";
import { getModulosData } from "@/app/ui/components/modulos/data";
import { useRouter } from "next/navigation";
import LoadingFrame from "@/app/ui/components/LoadingFrame";
import axios from "axios";
import { AtividadesChart } from "@/app/ui/components/charts/Atividades";
import { AproveitamentoChart } from "@/app/ui/components/charts/Aproveitamento";

interface ModuloProps {
  title: string;
  index: string;
  link?: string;
  unidades: {
    title: string;
    description: string;
    topicos: { title: string; description: string }[];
  }[];
}

export default function Student() {
  const { user, isAuthenticated } = useUser();
  const router = useRouter();
  const now = new Date().getHours();
  const [modulosData, setModulosData] = useState<Record<
    string,
    ModuloProps
  > | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalTopicsCount, setTotalTopicsCount] = useState<number>(0);
  let streak = 0;
  const userId = user.id;
  async function updateStreak() {
    try {
      const response = await axios.put(
        "http://localhost:5002/update_streak",
        { userId },
        { withCredentials: true }
      );
      streak = response.data;
      if (response.data.errors && response.data.errors.length > 0) {
        console.log("Error:", response.data.errors);
      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const getTotalTopicsCount = (
    data: Record<string, ModuloProps> | null
  ): number => {
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
        updateStreak();
      } catch (err) {
        setError("Erro ao carregar os dados dos módulos.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchModulosData();
  }, [user]);

  if (loading) {
    return <LoadingFrame />;
  }

  if (!isAuthenticated) {
    router.push("/login");
  }

  if (!modulosData) {
    return <p>Não foi possível encontrar os tópicos.</p>;
  }

  return (
    <section className="p-10 flex flex-col gap-10">
      <div>
        <h1 className="text-2xl font-bold">Meus Estudos</h1>
        <h2 className="text-lg">
          {now < 12 ? "Bom-dia" : now < 18 ? "Boa tarde" : "Boa noite"}{" "}
          {user.name}
        </h2>
      </div>
      <div className="grid grid-cols-10 gap-10">
        <div className="col-span-6 flex flex-col gap-12">
          <div>
            <h3 className="p-5 rounded-tl-xl rounded-tr-xl font-semibold shadow-sm border-2 border-borders-light mb-2">
              Resumo rápido
            </h3>
            <div className="grid grid-cols-3 gap-2">
              <div className="p-5 flex flex-col gap-1 rounded-xl border-2 border-borders-light">
                <h4 className="text-3xl font-black">00/{totalTopicsCount}</h4>
                <p>Tópicos Estudados</p>
              </div>
              <div className="p-5 flex flex-col gap-1 rounded-xl border-2 border-borders-light">
                <h4 className="text-3xl font-black">0</h4>
                <p>Avaliações realizadas</p>
              </div>
              <div className="p-5 flex flex-col gap-1 rounded-xl border-2 border-borders-light">
                <h4 className="text-3xl font-black">1</h4>
                <p>Trilhas iniciadas</p>
              </div>
              <div className="col-span-3 flex flex-col rounded-xl shadow-sm border-2 border-borders-light">
                <p className="font-medium mx-5 pt-5 pb-3 border-b-2 border-gray-300">
                  Continue de onde você parou
                </p>
                <Link
                  href={"#"}
                  className="px-5 py-4 flex flex-col gap-1 hover:bg-bg-lightA duration-100"
                >
                  <h5 className="text-xl font-bold">Tópico</h5>
                  <p className="text-text-lightSub">
                    Descriçaõ Descriçaõ Descriçaõ Descriçaõ
                  </p>
                </Link>
              </div>
            </div>
          </div>
          <div className="border-2 border-borders-light p-5 rounded-xl">
            <AtividadesChart />
          </div>
        </div>
        <div className="col-span-4 flex flex-col gap-10">
          <div className="rounded-xl p-5 pr-48 flex relative items-center shadow-sm border-2 border-borders-light min-h-[260px]">
            <div>
              <p className="text-xl font-bold text-[#FF9600]">Você está há</p>
              <span className="text-8xl font-black text-[#FF9600]">
                {user.streak || "1"}
              </span>
              <p className="text-xl font-bold text-[#FF9600]">
                {user.streak ? "dias" : "dia"} se preparando para os
                vestibulares!
              </p>
            </div>
            <Flame
              size={180}
              className="absolute right-5"
              fill="#FFC700"
              stroke="#FF9600"
              strokeWidth={3}
            />
          </div>
          <div className="border-2 border-borders-light p-5 rounded-xl">
            <AproveitamentoChart />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2">
        <h3 className="font-semibold text-lg col-span-7 shadow-sm border-2 border-borders-light p-5 rounded-tl-xl rounded-tr-xl">
          Seu radar habilidades
        </h3>
        <div className="col-span-4">
          <RadarHabilidades />
        </div>
        <div className="col-span-3 p-5 shadow-sm border-2 border-borders-light rounded-bl-xl rounded-br-xl h-fit">
          <div className="flex gap-5 pb-3 border-b-2 border-borders-light *:text-mainBlue">
            <Sparkles />
            <h3 className="text-lg font-bold">Análise de perfil e feedbacks</h3>
          </div>
          <div className="py-5 flex flex-col gap-3">
            <AccordionItem
              title="Gestão de Tempo"
              priority="Importante"
              description="No vestibular, saber distribuir o tempo de forma eficaz é
                crucial para responder todas as questões."
              hints={[
                "Tente cronometrar seus simulados, dividindo o tempo por questão.",
                "Avalie o tempo gasto em cada tipo de pergunta e priorize as mais rápidas.",
              ]}
            >
              <Link
                href={"/simulados"}
                className="mt-3 inline-block py-2 bg-mainBlue text-white w-fit rounded-md border-2 border-transparent px-4 hover:bg-transparent hover:text-mainBlue hover:border-mainBlue duration-100"
              >
                Praticar Simulados
              </Link>
            </AccordionItem>
            <AccordionItem
              title="Aprendizado Contínuo"
              priority="Secundário"
              description="Procure revisar e treinar mais o que você já sabe"
              hints={[
                "Utilize métodos como resumos e mapas mentais para reforçar seu aprendizado.",
                "Priorize revisar conteúdos antes de dormir para melhor retenção.",
              ]}
            >
              <Link
                href={"#"}
                className="text-mainBlue hover:underline duration-100"
              >
                Como fazer mapas mentais
              </Link>
            </AccordionItem>
            <AccordionItem
              title="Revisar conceitos básicos"
              priority="Opcional"
              description="Você está com uma consistência muito boa, ou seja, consegue responder questões semelhantes com facilidade."
              hints={[
                "Experimente técnicas como mindfulness para manter o foco durante os estudos.",
                "Priorize revisar conteúdos antes de dormir para melhor retenção.",
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function AccordionItem({
  title,
  priority,
  description,
  hints,
  children,
}: {
  title: string;
  priority: string;
  description: string;
  hints: string[];
  children?: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [maxHeight, setMaxHeight] = useState<string>("0px");

  const contentRef = React.useRef<HTMLDivElement>(null);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
    if (contentRef.current) {
      setMaxHeight(!isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  };

  return (
    <div className="border-b border-borders-light">
      <button
        onClick={toggleAccordion}
        className="flex justify-between items-center w-full py-3 px-4 text-left"
      >
        <div className="flex flex-col gap-1">
          <span
            className={`text-xs ${
              priority === "Importante"
                ? "bg-red-500"
                : priority === "Secundário"
                ? "bg-orange-500"
                : "bg-gray-400"
            } rounded-md text-center text-white w-fit px-3 py-1`}
          >
            {priority}
          </span>
          <h4 className="font-semibold">{title}</h4>
        </div>
        <ChevronRight
          className={`transform transition-transform duration-200 ${
            isOpen ? "rotate-90" : ""
          }`}
        />
      </button>
      <div
        ref={contentRef}
        style={{
          maxHeight: maxHeight,
          transition: "max-height 0.3s ease",
          overflow: "hidden",
        }}
        className="px-4 text-text-lightSub"
      >
        {description}
        <div className="pb-3">
          <ul className="pb-2 list-disc list-inside mt-2">
            {hints.map((hint, index) => (
              <li key={index}>{hint}</li>
            ))}
          </ul>
          {children}
        </div>
      </div>
    </div>
  );
}
