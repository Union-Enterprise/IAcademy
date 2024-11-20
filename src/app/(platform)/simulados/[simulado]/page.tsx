"use client";

import { ArrowLeft, ArrowRight, ChevronRight, Dot } from "lucide-react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingFrame from "@/app/ui/components/LoadingFrame";
import { useUser } from "@/app/context/UserContext";

interface ResultadoData {
  simulado: string;
  prova: string;
  respostas: string[];
  gabarito: string[];
  acertos: number;
  _id: string;
}

interface Simulado {
  _id: string;
  titulo: string;
  gerado_por_ia: boolean;
  provas: {
    questoes: {
      _id: string;
      titulo: string;
      enunciado: string;
      alternativas: string[];
      alternativa_correta: string;
      explicacao: string;
      radar_de_habilidades: string;
    }[];
    _id: string;
    titulo: string;
  }[];
  qtdQuestoes: number;
}

export default function Simulado() {
  const router = useParams();
  const simuladoId = router.simulado;
  const [simulado, setSimulado] = useState<Simulado | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [resultado, setResultado] = useState<ResultadoData[] | null>(null);

  const { user } = useUser();
  const userId = user._id;

  const getTotalQuestoes = (provas: any[]) => {
    return provas.reduce(
      (total, prova) => total + (prova.questoes?.length || 0),
      0
    );
  };

  useEffect(() => {
    if (!simuladoId) return;

    const fetchSimulado = async () => {
      try {
        const response = await axios.get<Simulado>(
          `http://localhost:5002/simulado/${simuladoId}`
        );
        setSimulado(response.data);
      } catch (error) {
        console.error("Erro ao carregar o simulado:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchResultado = async () => {
      try {
        const response = await axios.get<ResultadoData[]>(
          `http://localhost:5002/results/${userId}/${simuladoId}`
        );
        setResultado(response.data);
      } catch (error) {
        console.error("Erro ao carregar os resultados:", error);
      }
    };

    Promise.all([fetchSimulado(), fetchResultado()]).finally(() =>
      setIsLoading(false)
    );

    fetchSimulado();
  }, [userId, simuladoId]);

  if (isLoading) {
    return <LoadingFrame />;
  }

  if (!simulado) {
    return <p>Simulado não encontrado.</p>;
  }

  if (!resultado) {
    console.log("Sem resultado");
  }

  const provasConcluidas = resultado
    ?.map((res) => {
      const prova = simulado.provas.find(
        (p, index) => index.toString() === res.prova
      );
      return { ...res, ...prova };
    })
    .filter((res) => res);

  const provasPendentes = simulado.provas
    .map((prova, index) => {
      const correspondente = resultado?.some(
        (res) => res.prova === index.toString()
      );
      return !correspondente ? prova : null;
    })
    .filter((prova) => prova);

  const totalRespostasUsuario = resultado
    ? resultado.reduce(
        (total, res) => total + res.respostas.filter((r) => r).length,
        0
      )
    : 0;

  return (
    <div className="flex flex-col px-[100px] my-[80px] gap-16">
      <div className="flex flex-col w-full gap-5">
        <div>
          <Link
            href={"/simulados"}
            className="mb-5 flex gap-2 w-fit *:text-mainBlue opacity-80 hover:opacity-100 duration-100"
          >
            <ArrowLeft />
            <p>Voltar</p>
          </Link>
          {simulado.gerado_por_ia && (
            <div className="flex gap-5 bg-mainBlue px-5 py-3 items-center *:text-white rounded-md">
              <Sparkles size={20} />
              <div>
                <p className="mb-1">
                  Esse simulado é gerado pela Inteligência Artifical da IAcademy
                  baseado nas áreas em que você possui menos afinidade.
                </p>
                <p className="text-xs opacity-80">
                  A Inteligência Artifical pode cometer erros, então considere
                  revisar e reportar informações se necessário.
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="w-full flex">
          <div className="flex flex-col gap-5 w-full py-10">
            <h2 className="text-4xl font-bold">{simulado.titulo}</h2>
            <div>
              <p className="text-lg font-bold">Concluídas:</p>

              <div className="grid grid-cols-2 gap-x-10 *:opacity-60 gap-3 mt-2">
                {simulado.provas.map((prova) => (
                  <li key={prova._id}>{prova.titulo}</li>
                ))}
              </div>
            </div>
          </div>
          <div className="border-l-2 border-borders-lightB px-4 py-10 w-[300px]">
            <p className="text-lg uppercase font-medium">Feitas até agora:</p>
            <h3 className="text-5xl font-black mt-1">
              {totalRespostasUsuario}/{getTotalQuestoes(simulado.provas)}
            </h3>
          </div>
        </div>
      </div>
      <section>
        <h4 className="text-2xl font-bold mb-5">
          Como funciona esse simulado?
        </h4>
        <div className="grid grid-cols-3 px-[100px] justify-center border-t-2 gap-20 border-borders-lightB py-8">
          <div>
            <h5 className="text-xl font-semibold">Modelo da prova</h5>
            <p className="leading-7 mt-5">
              Ao todo serão x provas cada uma abordando tópicos específicos. Ao
              final das x, você saberá seu desempenho no total.
            </p>
          </div>
          <div>
            <h5 className="text-xl font-semibold">Resultados</h5>
            <p className="leading-7 mt-5">
              As provas são realizadas separadamente. Ao final de cada uma
              delas, você poderá ver seu desempenho.
            </p>
          </div>
          <div>
            <h5 className="text-xl font-semibold">Gabarito</h5>
            <p className="leading-7 mt-5">
              Ao finalizar uma prova, o gabarito dela fica disponível para você.
              Nele, ficam as soluções e explicações analisadas e corrigidas pela
              IA para cada questão.
            </p>
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-5">
        <h4 className="text-2xl font-bold mb-5">Provas Disponíveis</h4>
        {provasPendentes.map((prova, index) => (
          <Prova
            key={prova._id}
            titulo={prova.titulo}
            qtdQuestoes={prova.questoes.length}
            link={`${simuladoId}/${index + provasConcluidas?.length}`}
          />
        ))}
      </section>
      <section className="flex flex-col gap-5">
        <h4 className="text-2xl font-bold">Provas Concluídas</h4>
        {provasConcluidas?.map((res) => (
          <ProvaConcluida
            key={res._id}
            titulo={res.titulo}
            acertos={res.acertos}
            totalQuestoes={res.questoes.length}
            link={`${simuladoId}/${res.prova}/resultado`}
          />
        ))}
      </section>
    </div>
  );
}

function Prova({
  titulo,
  qtdQuestoes,
  link,
}: {
  titulo: string;
  qtdQuestoes: number;
  link: string;
}) {
  return (
    <Link
      href={link}
      className="shadow-sm rounded-xl p-8 flex justify-between items-center gap-5 border-2 border-borders-light hover:shadow-md duration-100"
    >
      <div className="flex flex-col gap-3">
        <h5 className="font-semibold text-xl">{titulo}</h5>
        <div className="flex items-center *:text-text-lightSub *:font-medium">
          <Dot size={30} />
          <p>{qtdQuestoes} questões</p>
          <Dot size={30} />
          <p>Duração Máxima de 2h35m</p>
        </div>
      </div>
      <div className="px-10 py-2 text-white h-fit bg-mainBlue rounded-md border-2 border-transparent hover:bg-transparent hover:text-mainBlue hover:border-mainBlue duration-100">
        Começar
      </div>
    </Link>
  );
}

function ProvaConcluida({
  titulo,
  acertos,
  totalQuestoes,
  link,
}: {
  titulo: string;
  acertos: number;
  totalQuestoes: number;
  link: string;
}) {
  const porcentagemAcerto = (acertos / totalQuestoes) * 100;
  return (
    <Link
      href={link}
      className="shadow-sm rounded-xl p-8 flex flex-col gap-5 border-2 border-borders-light hover:shadow-md duration-100"
    >
      <div className="flex justify-between *:font-semibold *:text-xl items-center">
        <h5>{titulo}</h5>
        <div className="flex gap-3 items-center">
          <h5>{acertos} pontos</h5>
          <ArrowRight />
        </div>
      </div>
      <div className="bg-gray-100 rounded-full w-full">
        <div
          className="bg-mainBlue h-3 rounded-full"
          style={{ width: `${porcentagemAcerto}%` }}
        />
      </div>
      <div>
        <h5 className="font-medium text-text-lightSub">
          Você acertou {acertos}/{totalQuestoes} questões
        </h5>
      </div>
    </Link>
  );
}
