import Link from "next/link";
import { ContentsSection } from "@/app/ui/trilha/ContentsSection";

export default function TrilhaContent() {
  return (
    <>
      <ContentsSection title="Introdução à Geometria">
        <p>
          Este módulo oferece uma imersão nos fundamentos da programação em Go,
          preparando você para o projeto prático Guessing Game. Abordamos desde
          as razões para escolher Go até a criação do seu primeiro programa,
          proporcionando uma compreensão detalhada da linguagem. Este módulo é
          essencial para estabelecer uma base sólida em Go e desenvolver
          projetos robustos com confiança.
        </p>
      </ContentsSection>
      <ContentsSection title="Seno, Cosseno e Tangente">
        <p>
          Este módulo oferece uma imersão nos fundamentos da programação em Go,
          preparando você para o projeto prático Guessing Game. Abordamos desde
          as razões para escolher Go até a criação do seu primeiro programa,
          proporcionando uma compreensão detalhada da linguagem. Este módulo é
          essencial para estabelecer uma base sólida em Go e desenvolver
          projetos robustos com confiança.
        </p>
      </ContentsSection>
      <ContentsSection title="Ângulos">
        <p>
          Este módulo oferece uma imersão nos fundamentos da programação em Go,
          preparando você para o projeto prático Guessing Game. Abordamos desde
          as razões para escolher Go até a criação do seu primeiro programa,
          proporcionando uma compreensão detalhada da linguagem. Este módulo é
          essencial para estabelecer uma base sólida em Go e desenvolver
          projetos robustos com confiança.
        </p>
      </ContentsSection>
    </>
  );
}

function Item({ title = "", text = "" }) {
  return (
    <div className="flex flex-col  justify-between p-5 rounded-md w-full h-[200px] border-whiteBorder border-2  hover:border-mainBlue">
      <div>
        <h6 className="font-bold text-lg text-whiteText mb-1">{title}</h6>
        <p className="text-sm text-[rgba(0,0,0,0.57)]">{text}</p>
      </div>
    </div>
  );
}
