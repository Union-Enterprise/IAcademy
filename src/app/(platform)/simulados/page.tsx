"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import InputGroup from "@/app/ui/components/authenticationForm/InputGroup";
import SubmitButton from "@/app/ui/components/authenticationForm/SubmitButton";
import { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "@/app/context/ToastContext";
import Skeleton from "@/app/ui/components/Skeleton";

const hours = new Date().getHours;
const minutes = new Date().getMinutes;
const seconds = new Date().getSeconds;

console.log(hours, minutes, seconds);

export const getTotalQuestoes = (provas: any[]) => {
  return provas.reduce(
    (total, prova) => total + (prova.questoes?.length || 0),
    0
  );
};

export default function Simulados() {
  const addToast = useToast();
  const [qtd, setQtd] = useState("");
  const [tema, setTema] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [simulados, setSimulados] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSimulados = async () => {
      try {
        const response = await axios.get("http://localhost:5002/simulado");
        setSimulados(response.data);
      } catch (error) {
        console.error("Erro ao buscar simulados:", error);
        addToast(
          "Erro ao carregar simulados. Por favor, tente novamente.",
          "error"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchSimulados();
  }, []);

  const sendData = async () => {
    try {
      setIsSubmitting(true);
      const response = await axios.post(
        "http://localhost:5000/gen_simulado_ia",
        { tema: tema, qtd: qtd }
      );
      console.log(response.data);
      addToast("Simulado criado com sucesso", "success");
    } catch (error) {
      console.error(error);
      addToast(
        "Ocorreu um erro ao gerar o simulado. Tente novamente.",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="*:px-[100px] flex flex-col gap-10 pb-10">
      <div className="w-full bg-blue-300 py-[60px] flex flex-col gap-5 bg-[url('/wave2.svg')] bg-no-repeat bg-center bg-cover">
        <h1 className="text-5xl font-semibold text-white max-w-[45%]">
          Lista de simulados para o Enem
        </h1>
        <p className="max-w-[40%] text-white">
          Alunos que realizam e treinam com simulados têm maiores chances de
          aprovação.
        </p>
        <button className="bg-white w-fit px-10 py-3 rounded-lg border-2 border-transparent hover:text-white hover:bg-transparent hover:border-white duration-100">
          Começar Simulado
        </button>
      </div>
      <div className="flex flex-col gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">
            Escolha um dos nossos Simulados disponíveis ou{" "}
            <span className="text-mainBlue">crie o seu próprio</span>
          </h2>
          <p>
            É possível treinar com bancos de questões que a IAcademy preparou
            especialmente para você, com simulados convencionais ou se preferir,
            peça para a IAcademy criar um para você. A escolha é sua!
          </p>
        </div>
        <div className="flex flex-col mt-5 gap-5" id="simulado">
          <div>
            <h3 className="text-xl font-semibold flex gap-2 text-mainBlue">
              <Sparkles /> Gere seus próprios simulados
            </h3>
            <p className="text-sm text-text-lightSub">
              Com a Inteligência Artificial da IAcademy, agora é possível criar
              simulados feitos especialmente para você.
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendData();
            }}
            className="flex items-end gap-5 pb-5 border-b-2 border-borders-light"
          >
            <InputGroup
              label="Tema do Simulado"
              placeholder="Ex: Geometria Espacial"
              labelFor="tema"
              onChange={(e) => setTema(e.target.value)}
            />
            <InputGroup
              label="Questões por prova"
              labelFor="qtd"
              inputType="number"
              placeholder="Ex: 12"
              onChange={(e) => setQtd(e.target.value)}
            />
            <SubmitButton
              text="Gerar Simulado"
              classname="w-fit"
              loading={isSubmitting}
            />
          </form>
          <div className="gap-5 grid grid-cols-2">
            {isLoading ? (
              <>
                <Skeleton className="col-span-1 h-[250px]" />
                <Skeleton className="col-span-1 h-[250px]" />
              </>
            ) : (
              simulados.map((simulado) => (
                <SimuladoCard
                  key={simulado._id}
                  id={simulado._id}
                  title={simulado.titulo}
                  geradoPorIA={simulado.gerado_por_ia}
                  qtdProvas={simulado.provas.length}
                  qtdQuestoes={getTotalQuestoes(simulado.provas)}
                />
              ))
            )}
          </div>
        </div>
        <div className="flex flex-col mt-5 gap-5">
          <h3 className="text-xl font-semibold">
            Com base nas suas maiores dificuldades
          </h3>
          <div className="flex gap-5">
            <SimuladoCard geradoPorIA={true} title="Trigonometria" />
            <SimuladoCard geradoPorIA={true} title="Estatística" />
            <SimuladoCard geradoPorIA={true} title="Geometria" />
          </div>
        </div>
        <div className="flex flex-col mt-5 gap-5">
          <h3 className="text-xl font-semibold">Simulados Enem</h3>
          <div className="grid grid-cols-3 gap-5">
            <SimuladoCard title="Enem 2022" />
            <SimuladoCard title="Enem 2021" />
            <SimuladoCard title="Enem 2020" />
            <SimuladoCard title="Enem 2019" />
          </div>
        </div>
      </div>
    </section>
  );
}

function SimuladoCard({
  id,
  geradoPorIA = false,
  title,
  qtdProvas,
  qtdQuestoes,
}: {
  id?: string;
  geradoPorIA?: boolean;
  title: string;
  qtdProvas?: number;
  qtdQuestoes?: number;
}) {
  return (
    <Link
      href={`simulados/${id}`}
      className="bg-bg-lightCard p-6 rounded-lg shadow-sm w-full flex flex-col gap-5 hover:shadow-lg duration-100 group hover:bg-mainBlue"
    >
      <div className="flex flex-col gap-2">
        {geradoPorIA && (
          <Sparkles
            className="text-mainBlue self-end group-hover:text-white"
            size={30}
          />
        )}
        <h4 className="text-3xl font-semibold group-hover:text-white">
          {title}
        </h4>
      </div>
      <div className="border-t-borders-lightB border-t-2 pt-4">
        <p className="text-sm font-semibold group-hover:text-white">
          {qtdProvas} provas, {qtdQuestoes} questões
        </p>
        <p className="text-xs group-hover:text-white">
          Duração máxima de x horas por prova
        </p>
      </div>
    </Link>
  );
}
