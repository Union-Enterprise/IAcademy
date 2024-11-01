import { ContentsSection } from "@/app/ui/trilha/ContentsSection";
import { modulosData } from "@/app/ui/components/modulos/data";
import normalizeString from "@/app/ui/components/modulos/normalizeString";
import Link from "next/link";

interface ModuloProps {
  title: string;
  index: string;
  link: string;
  unidades: {
    title: string;
    description: string;
    topicos: { title: string; description: string }[];
  }[];
}

export default function Modulos() {
  return (
    <section className="flex flex-col items-center gap-14 relative mt-14 *:w-full">
      {Object.entries(modulosData).map(([moduloLink, modulo]) => (
        <Modulo key={modulo.index} link={moduloLink} {...modulo} />
      ))}
    </section>
  );
}

function Modulo({ title, index, unidades, link }: ModuloProps) {
  return (
    <div className="flex flex-col gap-3">
      <Link href={`/trilhas/${link}`} className="*:duration-200 w-fit group">
        <span className="text-text-lightSub group-hover:text-mainBlue">
          Módulo {index}
        </span>
        <h2 className="text-2xl text-text-light font-bold group-hover:text-mainBlue">
          {title}
        </h2>
      </Link>
      {unidades.map((unidade, unidadeIdx) => (
        <div key={unidadeIdx} className="flex flex-col gap-1">
          <Link
            href={`/trilhas/${link}/${normalizeString(unidade.title)}`}
            className="group my-3 ml-3"
          >
            <h3 className="text-xl font-semibold group-hover:text-mainBlue duration-100">
              {unidade.title}
            </h3>
            <p className="text-sm text-gray-500 group-hover:text-mainBlue duration-100">
              {unidade.description}
            </p>
          </Link>
          {unidade.topicos.map((topico, topicoIdx) => (
            <ContentsSection
              key={topicoIdx}
              title={topico.title}
              href={`/trilhas/${link}/${normalizeString(
                unidade.title
              )}/${normalizeString(topico.title)}`}
            >
              <p>{topico.description}</p>
            </ContentsSection>
          ))}
        </div>
      ))}
    </div>
  );
}
