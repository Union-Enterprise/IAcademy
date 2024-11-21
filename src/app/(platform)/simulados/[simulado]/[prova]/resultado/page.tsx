"use client";

import { ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { useUser } from "@/app/context/UserContext";
import { Alternativa, Mapa } from "../page";

interface ResultadoData {
  simulado: string;
  prova: string;
  respostas: string[];
  gabarito: string[];
  acertos: number;
  _id: string;
}

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
    imagem?: string;
  }[];
  qtdQuestoes: number;
}

export default function Resultado() {
  const [prova, setProva] = useState<Prova | null>(null);
  const [resultado, setResultado] = useState<ResultadoData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();
  const router = useParams();
  const provaId = router.prova;
  const simuladoId = router.simulado;
  const userId = user._id;

  useEffect(() => {
    const fetchProva = async () => {
      try {
        const response = await axios.get<Prova>(
          `http://localhost:5002/simulado/${simuladoId}/${provaId}`
        );
        setProva(response.data);
      } catch (error) {
        console.error("Erro ao carregar o simulado:", error);
      }
    };

    const fetchResultado = async () => {
      try {
        const response = await axios.get<ResultadoData>(
          `http://localhost:5002/results/${userId}/${simuladoId}/${provaId}/`
        );
        setResultado(response.data);
      } catch (error) {
        console.error("Erro ao carregar os resultados:", error);
      }
    };

    Promise.all([fetchProva(), fetchResultado()]).finally(() =>
      setIsLoading(false)
    );
  }, [simuladoId, provaId, userId]);

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  if (!prova || !resultado) {
    return <p>Não foi possível carregar os dados.</p>;
  }

  const questoesRespondidas = resultado.respostas.filter(
    (resposta) => resposta !== undefined
  ).length;

  return (
    <section className="px-[100px] my-[80px] grid grid-cols-3 relative gap-10">
      <div className="flex flex-col gap-5 col-span-3">
        <Link
          href={`/simulados/${simuladoId}`}
          className="flex w-fit gap-3 opacity-80 hover:opacity-100 duration-100"
        >
          <ArrowLeft />
          <p>Voltar</p>
        </Link>
      </div>
      <div className="flex gap-36 col-span-3 border-b-2 border-borders-light pb-10">
        <div>
          <p className="uppercase text-text-lightSub text-lg">Acertos</p>
          <h2 className="font-black text-8xl mt-1 mb-3">
            {resultado.acertos}/{prova.questoes.length}
          </h2>
          <p className="text-text-lightSub">
            Você acertou {resultado.acertos} de {prova.questoes.length}{" "}
            questões.
          </p>
        </div>
      </div>
      <div className="col-span-2 gap-16 flex flex-col">
        {prova.questoes.map((questao, index) => {
          const resposta = resultado.respostas[index];
          const correta = resultado.gabarito[index];
          const acertou = resposta === correta;

          return (
            <QuestaoRespondida
              index={index}
              key={questao._id}
              questao={questao}
              resposta={resposta}
              status={acertou}
            />
          );
        })}
      </div>
      <div className="sticky top-28 h-fit justify-self-center rounded-md w-full border-2 border-black border-opacity-5 p-5 flex flex-col gap-5">
        <h3>Mapa de questões</h3>
        <Mapa
          isFromResult={true}
          questoes={prova.questoes}
          respostas={resultado.respostas}
        />
      </div>
    </section>
  );
}

function QuestaoRespondida({
  index,
  questao,
  resposta,
  status,
}: {
  questao: {
    _id: string;
    titulo: string;
    enunciado: string;
    alternativas: string[];
    alternativa_correta: string;
    explicacao: string;
    imagem?: string;
  };
  resposta: string;
  index: number;
  status: boolean;
}) {
  let imageLocal: string | undefined;
  if(questao.imagem){
    if(questao.imagem.includes("/") || questao.imagem.includes("\\")){
      imageLocal = `http://localhost:5000/${questao.imagem}`;
    }else{
      imageLocal = `http://localhost:5002/files/${questao.imagem}`;
    }
  }

  return (
    <div className="flex flex-col gap-5" id={`questao-${index}`}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold mb-2">Questão {index + 1}</h2>
          <h3 className="text-lg font-medium text-text-lightSub">
            {questao.titulo}
          </h3>
        </div>
        <span
          className={`${
            resposta === questao.alternativa_correta
              ? "text-green-500"
              : "text-red-500"
          } font-bold text-lg`}
        >
          {resposta === questao.alternativa_correta
            ? "Você acertou"
            : "Você errou"}
        </span>
      </div>
      <p>{questao.enunciado}</p>

      {imageLocal && (
        <img src={imageLocal} alt={`Imagem da questão ${index + 1}`} className="w-[60%] rounded-md mt-4" />
      )}

      <div className="flex flex-col gap-2">
        {questao.alternativas.map((alternativa, index) => (
          <Alternativa
            key={index}
            className={`${
              alternativa[0] === questao.alternativa_correta
                ? "bg-green-200"
                : alternativa[0] === resposta &&
                  resposta !== questao.alternativa_correta
                ? "bg-red-200"
                : ""
            } `}
          >
            {alternativa}
          </Alternativa>
        ))}
      </div>
      {questao.explicacao && (
        <div>
          <p className="text-mainBlue text-lg font-medium flex gap-2">
            <Sparkles />
            Explicação:
          </p>
          <p 
            className="text-text-lightSub" 
            dangerouslySetInnerHTML={{ __html: questao.explicacao.replaceAll("\\n", "<br>") }}>
          </p>
        </div>
      )}
    </div>
  );
}
