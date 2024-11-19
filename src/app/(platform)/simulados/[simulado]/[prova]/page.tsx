"use client";
import { useParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import LoadingFrame from "@/app/ui/components/LoadingFrame";
import { useRouter } from "next/navigation";

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
  className,
}: {
  children: React.ReactNode;
  selecionada?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <div
      onClick={onClick}
      className={`${className} flex gap-5 px-2 py-4 border-2 ${
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
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [maxHeight, setMaxHeight] = useState<string>("0px");
  const [padding, setPadding] = useState<string>("0px");
  const contentRef = React.useRef<HTMLDivElement>(null);

  const questoesRespondidas = Object.values(respostas).filter(
    (resposta) => resposta !== undefined
  ).length;

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

  let acertos = 0;
  let gabarito: string[] = [];
  let acertadas: string[] = [];
  let placeholder: string[] = [];

  let skills = {
    Raciocinio: 0,
    Criatividade: 0,
    Calculos: 0,
    Conhecimento: 0,
    Texto: 0,
    Teoria: 0,
  };

  let resultados = {
    simulado: simulado,
    prova: prova,
    respostas: placeholder,
    gabarito: placeholder,
    acertos: 0,
  };

  const sendData = () => {
    axios
      .put(
        "http://localhost:5002/finish_test",
        {
          skills: skills,
          resultados: resultados,
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    resultados.respostas = [];
    resultados.gabarito = [];
  };

  const checkGabarito = (questoes: Record<string, any>) => {
    for (let i = 0; i < qtdQuestoes; i++) {
      gabarito.push(questoes[i].alternativa_correta);
      resultados.respostas.push(respostas[i]);
      if (respostas[i] == undefined) {
        respostas[i] = "none";
      }
      if (gabarito[i] == respostas[i]) {
        acertos += 1;
        acertadas.push("Questão " + (i + 1) + ": " + respostas[i]);
        let skill = questoes[i].radar_de_habilidades;
        if (skill == "Raciocínio lógico") {
          skills.Raciocinio += 1;
        }
        if (skill == "Criatividade") {
          skills.Criatividade += 1;
        }
        if (skill == "Conhecimento de fórmulas") {
          skills.Conhecimento += 1;
        }
        if (skill == "Interpretação de Texto") {
          skills.Texto += 1;
        }
        if (skill == "Calculos avançados") {
          skills.Calculos += 1;
        }
        if (skill == "Teoria") {
          skills.Teoria += 1;
        }
      }
    }
    resultados.acertos = acertos;
    resultados.gabarito = gabarito;
    sendData();
    gabarito = [];
    acertadas = [];
    acertos = 0;
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
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
          <p>
            {questoesRespondidas}/{qtdQuestoes}
          </p>
        </div>
        <Mapa questoes={questoes} respostas={respostas} />
        <p className="text-sm text-text-lightSub">
          Faltam {qtdQuestoes - questoesRespondidas} questões para você
          finalizar o simulado.
        </p>
        <button
          onClick={() => {
            checkGabarito(questoes);
            router.push(`/simulados/${simulado}/${prova}/resultado`);
          }}
          className="px-10 py-2 text-white font-bold bg-mainBlue hover:text-mainBlue hover:bg-transparent rounded-md duration-100 border-2 border-transparent hover:border-mainBlue"
        >
          Finalizar
        </button>
      </div>
    </form>
  );
}

export function Mapa({
  questoes,
  respostas,
  isFromResult = false,
}: {
  questoes: Prova["questoes"];
  respostas: Record<number, string>;
  isFromResult?: boolean;
}) {
  return (
    <div className="grid grid-cols-8 gap-1">
      {questoes.map((questao, index) => (
        <QuestaoMapa
          questao={questao}
          key={index}
          id={index}
          resposta={respostas[index]}
          isFromResult={isFromResult}
        />
      ))}
    </div>
  );
}

export function QuestaoMapa({
  id,
  resposta,
  questao,
  isFromResult,
}: {
  questao: {
    _id: string;
    titulo: string;
    enunciado: string;
    alternativas: string[];
    alternativa_correta: string;
    explicacao: string;
    radar_de_habilidades: string;
  };
  id: number;
  resposta?: string;
  isFromResult?: boolean;
}) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById(`questao-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  let backgroundColor = "";
  const isRespondida = !!resposta;

  if (isFromResult) {
    const respostaCorreta = resposta === questao.alternativa_correta;
    backgroundColor = isRespondida
      ? respostaCorreta
        ? "bg-green-500"
        : "bg-red-400"
      : "bg-black bg-opacity-10";
  } else {
    backgroundColor = isRespondida ? "bg-green-500" : "bg-black bg-opacity-10";
  }

  return (
    <a
      className={`text-lg ${backgroundColor} flex items-center justify-center rounded-md h-8 opacity-70 hover:opacity-100 duration-100 cursor-pointer`}
      href={`#${id}`}
      onClick={handleClick}
    >
      {id + 1}
    </a>
  );
}
