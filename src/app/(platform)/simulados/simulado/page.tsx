import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Simulado() {
  return (
    <div className="flex flex-col px-[100px] my-[80px] gap-20">
      <div className="flex flex-col w-full">
        <div>
          <Link
            href={"/simulados"}
            className="mb-5 flex gap-2 w-fit *:text-mainBlue opacity-80 hover:opacity-100 duration-100"
          >
            <ArrowLeft />
            <p>Voltar</p>
          </Link>
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
        </div>
        <div className="w-full flex">
          <div className="flex flex-col gap-5 w-full py-10">
            <h2 className="text-4xl font-bold">Trigonometria no Enem</h2>
            <div>
              <p className="text-lg font-bold">Concluídas:</p>
              <div className="grid grid-cols-2 gap-x-10 *:opacity-60 gap-3 mt-2">
                <p>Trigonometria - A</p>
                <p>Trigonometria - B</p>
                <p>Trigonometria - C</p>
                <p>Trigonometria - D</p>
              </div>
            </div>
          </div>
          <div className="border-l-2 border-borders-lightB px-4 py-10 w-[300px]">
            <p className="text-lg uppercase font-medium">Feitas até agora:</p>
            <h3 className="text-5xl font-black mt-1">0/185</h3>
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
          <div>
            <h5 className="text-xl font-semibold">Construção</h5>
            <p className="leading-7 mt-5"></p>
          </div>
        </div>
        <h4 className="text-2xl font-bold mb-5">Provas Disponíveis</h4>
        <div>
          <div className="shadow-md rounded-md p-8 flex justify-between items-center">
            <div className="flex flex-col gap-3">
              <h5 className="text-xl font-semibold">Trigonometria - A</h5>
              <p className="opacity-60">X questões Duração Máxima de Y horas</p>
            </div>
            <Link
              href={"/simulados/simulado/qualquer-prova"}
              className="px-10 py-2 text-white h-fit bg-mainBlue rounded-md"
            >
              Começar
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
