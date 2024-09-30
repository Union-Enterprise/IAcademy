import { ContentsSection } from "@/app/ui/trilha/ContentsSection";

const modulosData = [
  {
    title: "Estatística",
    index: "1",
    contents: [
      {
        title: "Introdução à Estatística",
        content: "Aprende alguma coisa ai, sei lá",
      },
      {
        title: "Representação de dados estatísticos",
        content: "Aprende alguma coisa ai, sei lá",
      },
      {
        title: "Medidas de tendência central",
        content: "Aprende alguma coisa ai, sei lá",
      },
    ],
  },
  {
    title: "Geometria",
    index: "2",
    contents: [
      {
        title: "Introdução à Geometria",
        content: "Aprende alguma coisa ai, sei lá",
      },
      {
        title: "Ángulos e Triângulos",
        content: "Aprende alguma coisa ai, sei lá",
      },
      {
        title: "Propriedades das formas",
        content: "Aprende alguma coisa ai, sei lá",
      },
    ],
  },
  {
    title: "Medidas e Trigonometria",
    index: "3",
    contents: [
      {
        title: "Introdução à Trigonometria",
        content: "Aprende alguma coisa ai, sei lá",
      },
      {
        title: "Medidas de Ângulos",
        content: "Aprende alguma coisa ai, sei lá",
      },
      {
        title: "Funções Trigonométricas",
        content: "Aprende alguma coisa ai, sei lá",
      },
    ],
  },
  {
    title: "Probabilidade",
    index: "4",
    contents: [
      {
        title: "Contagem",
        content: "Aprende alguma coisa ai, sei lá",
      },
      {
        title: "Probabilidade e Contagem",
        content: "Aprende alguma coisa ai, sei lá",
      },
    ],
  },
];

export default function Modulos() {
  return (
    <section className="flex flex-col gap-14 px-[200px] relative mt-14">
      {modulosData.map((modulo) => (
        <Modulo
          key={modulo.index}
          title={modulo.title}
          index={modulo.index}
          contents={modulo.contents}
        />
      ))}
    </section>
  );
}

function Modulo({
  title,
  index,
  contents,
}: {
  title: string;
  index: string;
  contents: { title: string; content: string }[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <span className="text-text-lightSub">Módulo {index}</span>
        <h2 className="text-2xl text-text-light font-bold">{title}</h2>
      </div>
      {contents.map((section, idx) => (
        <ContentsSection key={idx} title={section.title}>
          <p>{section.content}</p>
        </ContentsSection>
      ))}
    </div>
  );
}
