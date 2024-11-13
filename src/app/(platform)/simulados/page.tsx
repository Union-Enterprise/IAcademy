import Link from "next/link";

export default function Simulados() {
  return (
    <section className="*:px-[250px] flex flex-col gap-10 pb-10">
      <div className="w-full bg-mainBlue py-[85px] flex flex-col gap-5">
        <h1 className="text-4xl font-semibold text-white max-w-[38%]">
          Lista de simulados para o Enem
        </h1>
        <p className="max-w-[40%] text-white">
          Alunos que realizam e treinam simulados têm maiores chances de
          aprovação.
        </p>
        <button className="bg-white w-fit px-10 py-3 rounded-lg border-2 border-transparent hover:text-white hover:bg-transparent hover:border-white duration-100">
          Começar Simulado
        </button>
      </div>
      <div className="flex flex-col gap-5">
        <h2 className="text-2xl font-bold">
          Escolha um dos nossos Simulados disponíveis
        </h2>
        <p className="text-lg">
          É possível treinar com bancos de questões que a IAcademy preparou
          especialmente para você, ou com simulados convencionais. A escolha é
          sua!
        </p>
        <div className="flex flex-col mt-5 gap-5">
          <h3 className="text-xl font-semibold">
            Com base nas suas dificuldades em "Fazer a IA entender o que o
            usuário tem mais dificuldade"
          </h3>
          <div className="flex gap-5">
            <SimuladoCard isFromAI={true} text="Trigonometria no Enem" />
            <SimuladoCard isFromAI={true} text="Estatística no Enem" />
            <SimuladoCard isFromAI={true} text="Geometria no Enem" />
          </div>
        </div>
        <div className="flex flex-col mt-5 gap-5">
          <h3 className="text-xl font-semibold">Simulados Enem</h3>
          <div className="flex gap-5">
            <SimuladoCard text="Enem 2022" />
            <SimuladoCard text="Enem 2021" />
            <SimuladoCard text="Enem 2020" />
            <SimuladoCard text="Enem 2019" />
          </div>
        </div>
      </div>
    </section>
  );
}

function SimuladoCard({ isFromAI = false, text = "" }) {
  return (
    <Link
      href={"simulados/simulado"}
      className="bg-bg-lightCard p-6 rounded-lg shadow-sm w-[280px] flex flex-col gap-5 hover:shadow-lg duration-100"
    >
      <div className="flex flex-col gap-2">
        {isFromAI && (
          <span className="bg-mainBlue text-white w-fit p-1 text-sm rounded-sm">
            Gerado por IA
          </span>
        )}
        <h4 className="text-3xl font-semibold">{text}</h4>
      </div>
      <div className="border-t-borders-lightB border-t-2 pt-4">
        <p className="text-sm font-semibold">x unidades, x questões</p>
        <p className="text-xs">Duração máxima de x horas por unidade</p>
      </div>
    </Link>
  );
}
