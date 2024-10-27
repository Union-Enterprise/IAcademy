import { ContentsSection } from "@/app/ui/trilha/ContentsSection";
import { modulosData } from "@/app/ui/components/modulos/data";
import normalizeString from "@/app/ui/components/modulos/normalizeString";
import Link from "next/link";

interface ModuloProps {
  title: string;
  index: string;
  link: string;
  topics: { title: string; description: string }[];
}

export default function Modulos() {
  return (
    <section className="flex flex-col items-center gap-14 px-[200px] relative mt-14">
      {Object.entries(modulosData).map(([moduloLink, modulo]) => (
        <Modulo key={modulo.index} link={moduloLink} {...modulo} />
      ))}
    </section>
  );
}

function Modulo({ title, index, topics, link }: ModuloProps) {
  return (
    <div className="flex flex-col gap-3">
      <Link
        href={`/trilhas/${link}`}
        className="*:duration-200 w-fit group"
      >
        <span className="text-text-lightSub group-hover:text-mainBlue">
          Módulo {index}
        </span>
        <h2 className="text-2xl text-text-light font-bold group-hover:text-mainBlue">
          {title}
        </h2>
      </Link>
      {topics.map((topic, idx) => (
        <ContentsSection
          key={idx}
          title={topic.title}
          href={`/trilhas/${link}/${normalizeString(topic.title)}`}
        >
          <p>{topic.description}</p>
        </ContentsSection>
      ))}
    </div>
  );
}
