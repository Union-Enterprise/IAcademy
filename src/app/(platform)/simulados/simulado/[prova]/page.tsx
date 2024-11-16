"use client";
import { useParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Prova() {
  const params = useParams();

  const router = useRouter();
  return (
    <section className=" px-[100px] my-[80px] grid grid-cols-3 relative gap-10">
      <div className="col-span-2 gap-16 flex flex-col ">
        <h1 className="text-3xl font-bold">{params.prova}</h1>
        <Questão id="1" />
        <Questão id="2" />
        <Questão id="3" />
        <Questão id="4" />
        <Questão id="5" />
        <Questão id="6" />
      </div>
      <div className="sticky top-28 h-fit justify-self-center p-5 rounded-md w-full border-2 border-black border-opacity-5">
        <div className="flex justify-between items-center pb-3 border-b-2">
          <div>
            <h3 className="text-lg font-semibold">Tempo restante</h3>
            <p>00h 00min 00s</p>
          </div>
          <ChevronDown />
        </div>
        <div className="mt-3 flex flex-col gap-3">
          <div className="flex justify-between items-center *:font-medium *:text-lg">
            <h3>Mapa de questões</h3>
            <p>0/45</p>
          </div>
          <Mapa />
          <p className="text-sm text-text-lightSub">
            Faltam x questões para você finalizar o simulado.
          </p>
          <button
            onClick={() => {
              router.push("/simulados/simulado/qualquer-prova/resultado");
            }}
            className="px-10 py-2 text-white font-bold bg-mainBlue hover:text-mainBlue hover:bg-transparent rounded-md duration-100 border-2 border-transparent hover:border-mainBlue"
          >
            Finalizar
          </button>
        </div>
      </div>
    </section>
  );
}

export function Questão({
  id = "",
  imagens = [],
  enunciado = "Enunciado da questão",
}) {
  return (
    <div className="flex flex-col gap-5" id={id}>
      <h2 className="text-xl font-semibold">Questão {id}</h2>
      <p>"Aparecer imagem se tiver"</p>
      <p>{enunciado}</p>
      <Respostas />
    </div>
  );
}

export function Respostas() {
  return (
    <div className="flex flex-col gap-2">
      <Alternativa />
      <Alternativa alternativa="B" />
      <Alternativa alternativa="C" />
      <Alternativa alternativa="D" />
      <Alternativa alternativa="E" />
    </div>
  );
}

export function Alternativa({ alternativa = "A", opcao = "10,21cm" }) {
  return (
    <div className="flex gap-5 px-2 py-4 border-2 border-black border-opacity-5 hover:border-opacity-40 cursor-pointer duration-100 rounded-md">
      <p>{alternativa}</p>
      <p>{opcao}</p>
    </div>
  );
}

export function Mapa() {
  const questoes = [1, 2, 3, 4, 5, 6];
  return (
    <div className="grid grid-cols-8 gap-1">
      {questoes.map((id) => (
        <QuestaoMapa key={id} id={id.toString()} />
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
      {id}
    </a>
  );
}
