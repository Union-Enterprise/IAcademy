"use client";
import { useParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import LoadingFrame from "@/app/ui/components/LoadingFrame";

interface Prova {
  _id: string;
  titulo: string;
  tema: string;
  questoes: {
    _id: string;
    titulo: string;
    enunciado: string;
    alternativas: string[];
    alternativa_correta: string;
    explicacao: string;
    radar_de_habilidades: string;
  }[];
  qtdQuestoes: number;
}

export default function Prova() {
  const router = useParams();
  const provaId = router.prova;
  const simuladoId = router.simulado;
  const [prova, setProva] = useState<Prova | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!provaId) return;

    const fetchSimulado = async () => {
      try {
        const response = await axios.get<Prova>(
          `http://localhost:5002/simulado/${simuladoId}/${provaId}`
        );
        setProva(response.data);
      } catch (error) {
        console.error("Erro ao carregar o simulado:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSimulado();
  }, [provaId]);

  if (isLoading) {
    return <LoadingFrame />;
  }

  if (!prova) {
    return <p>Prova não encontrada.</p>;
  }

  return (
    <section className=" px-[100px] my-[80px] grid grid-cols-3 relative gap-10">
      <div className="col-span-2 gap-16 flex flex-col">
        <h1 className="text-3xl font-bold">{prova.titulo}</h1>
        {prova.questoes.map((questao, index) => (
          <Questao
            key={index}
            index={index + 1}
            enunciado={questao.enunciado}
            alternativas={questao.alternativas}
          />
        ))}
      </div>
      <Menu questoes={prova.questoes} />
    </section>
  );
}

export function Questao({
  index,
  imagens,
  enunciado,
  alternativas,
}: {
  index: number;
  imagens?: string[];
  enunciado: string;
  alternativas: string[];
}) {
  return (
    <div className="flex flex-col gap-5" id={`questao-${index}`}>
      <h2 className="text-xl font-semibold">Questão {index}</h2>
      {imagens && <p>"Aparecer imagem se tiver"</p>}
      <p>{enunciado}</p>
      <Respostas alternativas={alternativas} />
    </div>
  );
}

export function Respostas({ alternativas }: { alternativas: string[] }) {
  return (
    <div className="flex flex-col gap-2">
      {alternativas.map((alternativa, index) => (
        <Alternativa key={index}>{alternativa}</Alternativa>
      ))}
    </div>
  );
}

export function Alternativa({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-5 px-2 py-4 border-2 border-black border-opacity-5 hover:border-opacity-40 cursor-pointer duration-100 rounded-md">
      {children}
    </div>
  );
}

export function Mapa({ questoes }: { questoes: Prova["questoes"] }) {
  return (
    <div className="grid grid-cols-8 gap-1">
      {questoes.map((questao, index) => (
        <QuestaoMapa key={questao._id} id={`questao-${index + 1}`} />
      ))}
    </div>
  );
}

export function QuestaoMapa({ id }: { id: string }) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <a
      className="text-lg bg-black bg-opacity-10 flex items-center justify-center rounded-md h-8 opacity-70 hover:opacity-100 duration-100 cursor-pointer"
      href={`#${id}`}
      onClick={handleClick}
    >
      {id.replace("questao-", "")}
    </a>
  );
}

export function Menu({ questoes }: { questoes: Prova["questoes"] }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [maxHeight, setMaxHeight] = useState<string>("0px");
  const [padding, setPadding] = useState<string>("0px");
  const contentRef = React.useRef<HTMLDivElement>(null);

  const toggle = () => {
    setIsOpen(!isOpen);
    if (contentRef.current) {
      setMaxHeight(
        !isOpen ? `calc(${contentRef.current.scrollHeight}px + 48px)` : "0"
      );
      if (isOpen) {
        setTimeout(() => {
          setPadding("0");
        }, 220);
      } else {
        setPadding("12px 20px");
      }
    }
  };

  return (
    <div className="sticky top-28 h-fit justify-self-center rounded-md w-full border-2 border-black border-opacity-5">
      <button
        className="flex justify-between w-full items-center pb-3 border-b-2 p-5 hover:bg-bg-lightHover duration-200"
        onClick={toggle}
      >
        <div>
          <h3 className="text-lg font-semibold">Tempo restante</h3>
          <p className="w-fit">{isOpen ? "00h 00min 00s" : "-- : -- : --"}</p>
        </div>
        <ChevronDown
          className={`transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className="px-5 flex flex-col gap-3"
        ref={contentRef}
        style={{
          maxHeight: maxHeight,
          transition: "max-height 0.3s ease",
          overflow: "hidden",
          padding: padding,
        }}
      >
        <div className="flex justify-between items-center *:font-medium *:text-lg">
          <h3>Mapa de questões</h3>
          <p>{questoes.length}</p>
        </div>
        <Mapa questoes={questoes} />
        <p className="text-sm text-text-lightSub">
          Faltam {questoes.length} questões para você finalizar o simulado.
        </p>
        <button
          onClick={() => {
            console.log(
              "essa desgraça não redireciona sem fuder com tudo!!!!!!!!!!!!!!"
            );
          }}
          className="px-10 py-2 text-white font-bold bg-mainBlue hover:text-mainBlue hover:bg-transparent rounded-md duration-100 border-2 border-transparent hover:border-mainBlue"
        >
          Finalizar
        </button>
      </div>
    </div>
  );
}
