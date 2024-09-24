import { Item } from "../../ui/components/ContentList";
import { Box, CircleAlert, Cone, Cuboid, Diameter, TriangleRight, Brain, Percent } from "lucide-react";

export default function Trilhas() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-5">Trilhas de Aprendizado</h1>
      <div className="flex flex-col gap-5 mb-8 bg-mainBlue px-[32px] py-[60px] rounded-lg *:text-white">
        <h2 className="text-2xl font-bold">Aprendizado rápido e organizado</h2>
        <p className="max-w-3xl text-text-light">
          Descubra o universo da matemática com nosso catálogo de trilhas.
          Navegue por uma coleção de tópicos essenciais para os vestibulares e
          mergulhe em conteúdos feitos para expandir seus conhecimentos.
        </p>
      </div>

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-title-light">Matemática</h2>
        <div className="grid grid-cols-4 gap-5">
          <Item
            title="Geometria Plana"
            href="/trilhas/overview"
            icon={<Cone />}
            description="Geometria Plana explora figuras bidimensionais, como triângulos, círculos e quadrados, ajudando a calcular perímetros, áreas e ângulos."
          />

          <Item
            title="Geometria Analitica"
            href="/trilhas/overview"
            icon={<TriangleRight />}
            description="Geometria Analítica utiliza coordenadas para unir álgebra e geometria, permitindo estudar formas e figuras no plano cartesiano"
          />

          <Item
            title="Fatorial"
            href="/trilhas/overview"
            icon={<CircleAlert />}
            description="O fatorial é amplamente utilizado em combinatória, probabilidade e em várias áreas da matemática para calcular o número de permutações."
          />

          <Item
            title="Geometria Plana"
            href="/trilhas/overview"
            icon={<Cuboid />}
            description="Geometria plana estuda figuras 2D e conceitos como perímetro, área e o Teorema de Pitágoras."
          />

          <Item
            title="Geometria Espacial"
            href="/trilhas/overview"
            icon={<Box />}
            description="Geometria Espacial examina figuras tridimensionais, como cubos, esferas e pirâmides, explorando conceitos como volume e etc"
          />

          <Item
            title="Topologia"
            href="/trilhas/overview"
            icon={<Diameter />}
            description="Topologia estuda propriedades de espaços que não mudam com deformações contínuas."
          />

          <Item
            title="Raciocínio Lógico"
            href="/trilhas/overview"
            icon={<Brain />}
            description="Raciocínio lógico é a habilidade de pensar de forma clara e resolver problemas, usando dedução e indução para chegar a conclusões. É essencial em matemática e na vida cotidiana."
          />

          <Item
            title="Probabilidade"
            href="/trilhas/overview"
            icon={<Percent />}
            description="Probabilidade é a medida da chance de um evento ocorrer, variando de 0 a 1. Ela quantifica incertezas e é usada para prever resultados."
          />
        </div>
      </section>
    </div>
  );
}
