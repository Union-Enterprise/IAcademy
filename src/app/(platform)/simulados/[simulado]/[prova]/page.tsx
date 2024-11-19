"use client";
import { useParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
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

const ALFABETO = ["a", "b", "c", "d", "e"];

export default function Prova() {
  const router = useParams();
  const provaId = router.prova;
  const simuladoId = router.simulado;
  const [prova, setProva] = useState<Prova | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [respostas, setRespostas] = useState<Record<number, string>>({});

  const handleAlternativaSelecionada = (
    questaoIndex: number,
    alternativaIndex: number
  ) => {
    const letra = ALFABETO[alternativaIndex];
    setRespostas((prev) => ({
      ...prev,
      [questaoIndex]: letra,
    }));
  };

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
    <section className="px-[100px] my-[80px] grid grid-cols-3 relative gap-10">
      <div className="col-span-2 gap-16 flex flex-col">
        <h1 className="text-3xl font-bold">{prova.titulo}</h1>
        {prova.questoes.map((questao, index) => (
          <Questao
            key={index}
            index={index}
            enunciado={questao.enunciado}
            titulo={questao.titulo}
            alternativas={questao.alternativas}
            alternativaSelecionada={respostas[index]}
            onAlternativaSelecionada={handleAlternativaSelecionada}
          />
        ))}
      </div>
      <Menu
        questoes={prova.questoes}
        respostas={respostas}
        simulado={simuladoId}
        prova={provaId}
        qtdQuestoes={prova.questoes.length}
      />
    </section>
  );
}

export function Questao({
  index,
  titulo,
  enunciado,
  alternativas,
  alternativaSelecionada,
  onAlternativaSelecionada,
}: {
  index: number;
  titulo: string;
  enunciado: string;
  alternativas: string[];
  alternativaSelecionada?: string;
  onAlternativaSelecionada: (
    questaoIndex: number,
    alternativaIndex: number
  ) => void;
}) {
  return (
    <div className="flex flex-col gap-5" id={`questao-${index}`}>
      <div>
        <h2 className="text-xl font-semibold mb-2">Questão {index + 1}</h2>
        <h3 className="text-lg font-medium text-text-lightSub">{titulo}</h3>
      </div>
      <p>{enunciado}</p>
      <Respostas
        alternativas={alternativas}
        questaoIndex={index}
        alternativaSelecionada={alternativaSelecionada}
        onAlternativaSelecionada={onAlternativaSelecionada}
      />
    </div>
  );
}

export function Respostas({
  alternativas,
  questaoIndex,
  alternativaSelecionada,
  onAlternativaSelecionada,
}: {
  alternativas: string[];
  questaoIndex: number;
  alternativaSelecionada?: string;
  onAlternativaSelecionada: (
    questaoIndex: number,
    alternativaIndex: number
  ) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      {alternativas.map((alternativa, index) => (
        <Alternativa
          key={index}
          selecionada={ALFABETO[index] === alternativaSelecionada}
          onClick={() => onAlternativaSelecionada(questaoIndex, index)}
        >
          {alternativa}
        </Alternativa>
      ))}
    </div>
  );
}

export function Alternativa({
  children,
  selecionada,
  onClick,
}: {
  children: React.ReactNode;
  selecionada?: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`flex gap-5 px-2 py-4 border-2 ${
        selecionada
          ? "border-mainBlue bg-mainBlue bg-opacity-10"
          : "border-black border-opacity-5"
      } hover:border-opacity-40 cursor-pointer duration-100 rounded-md`}
    >
      {children}
    </div>
  );
}

export function Menu({
  questoes,
  respostas,
  simulado,
  prova,
  qtdQuestoes,
}: {
  questoes: Prova["questoes"];
  respostas: Record<number, string>;
  simulado: string | string[];
  prova: string | string[];
  qtdQuestoes: number;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log("Respostas:", respostas);
        console.log(simulado, prova);
        console.log(qtdQuestoes);
        // sendData();
      }}
      className="sticky top-28 h-fit justify-self-center rounded-md w-full border-2 border-black border-opacity-5"
    >
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
      <div className="px-5 flex flex-col gap-3">
        <button className="px-10 py-2 text-white font-bold bg-mainBlue hover:text-mainBlue hover:bg-transparent rounded-md duration-100 border-2 border-transparent hover:border-mainBlue">
          Finalizar
        </button>
      </div>
    </form>
  );
}
