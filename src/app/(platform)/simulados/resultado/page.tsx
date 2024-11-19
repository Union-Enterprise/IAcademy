import { ArrowLeft, ChevronDown, Sparkles } from "lucide-react";
import Link from "next/link";
// import { Mapa, Respostas } from "../page";

export default function Resultado() {
  return (
    <section className=" px-[100px] my-[80px] grid grid-cols-3 relative gap-20">
      <div className="flex flex-col gap-5 col-span-3 *:text-mainBlue">
        <Link
          href={"/simulados"}
          className="flex w-fit gap-3 opacity-80 hover:opacity-100 duration-100"
        >
          <ArrowLeft />
          <p>Voltar</p>
        </Link>
        <div className="flex items-center gap-5">
          <Sparkles size={40} />
          <h1 className="text-3xl font-bold">
            Recomendamos que você volte e revise os conteúdos sobre Geometria
          </h1>
        </div>
        <div className="flex justify-center gap-3">
          <DicaEstudo text="Cálculo de Áreas" />
          <DicaEstudo text="Sólidos Geométricos" />
          <DicaEstudo text="Geometria Plana" />
        </div>
      </div>
      <div className="flex gap-36 col-span-3 border-b-2 border-borders-light pb-10">
        <div>
          <p className="uppercase text-text-lightSub text-lg">Acertos</p>
          <h2 className="font-black text-8xl mt-1 mb-3">0/45</h2>
          <p className="text-text-lightSub">Você acerto 0 de 45 questões.</p>
        </div>
        <div>
          <p className="uppercase text-text-lightSub text-lg">Tempo de prova</p>
          <h2 className="font-black text-8xl mt-1 mb-3">0m</h2>
          <p className="text-text-lightSub">Menos de um minuto por questão.</p>
        </div>
      </div>
      <div className="col-span-2 gap-16 flex flex-col ">
        <QuestãoRespondida id="1" explicacao="'Explicação vem aqui'" />
        <QuestãoRespondida id="2" explicacao="'Explicação vem aqui'" />
        <QuestãoRespondida id="3" explicacao="'Explicação vem aqui'" />
        <QuestãoRespondida id="4" explicacao="'Explicação vem aqui'" />
        <QuestãoRespondida id="5" explicacao="'Explicação vem aqui'" />
        <QuestãoRespondida id="6" explicacao="'Explicação vem aqui'" />
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
          {/* <Mapa /> */}
          <p className="text-sm text-text-lightSub">
            Faltam x questões para você finalizar o simulado.
          </p>
          <button className="px-10 py-2 text-white font-bold bg-mainBlue hover:text-mainBlue hover:bg-transparent rounded-md duration-100 border-2 border-transparent hover:border-mainBlue">
            Finalizar
          </button>
        </div>
      </div>
    </section>
  );
}

function QuestãoRespondida({
  id,
  imagens,
  enunciado = "Enunciado da questão",
  explicacao,
}: {
  id: string;
  imagens?: string[];
  enunciado?: string;
  explicacao?: string;
}) {
  return (
    <div className="flex flex-col gap-5" id={id}>
      <h2 className="text-xl font-semibold">Questão {id}</h2>
      <p>{enunciado}</p>
      <p>"Aparecer imagem se tiver"</p>
      {/* <Respostas /> */}
      <div>
        <div className="flex gap-3">
          <Sparkles />
          <h4 className="font-bold text-lg mb-2">Explicação:</h4>
        </div>
        <p>{explicacao}</p>
      </div>
      <button className="font-bold text-text-lightSub self-end opacity-20 hover:opacity-60 duration-100">
        Estranhou o gabarito ou a explicação?
      </button>
    </div>
  );
}

function DicaEstudo({ text = "" }) {
  return (
    <Link
      href={"#"}
      className="bg-mainBlue text-sm text-white opacity-60 hover:opacity-100 duration-100 rounded-full px-4 py-1"
    >
      <p>{text}</p>
    </Link>
  );
}
