"use client";

import {
  ChartSpline,
  Circle,
  Pyramid,
  Search,
  Superscript,
  ChartLine,
} from "lucide-react";
import FilterSection from "../ui/components/FilterSection";
import ContentList, { Item } from "../ui/components/ContentList";
import { useUser } from "../context/UserContext";
import Link from "next/link";

import {
  Box,
  CircleAlert,
  Cone,
  Cuboid,
  Diameter,
  TriangleRight,
  Calculator,
  Brain,
  Percent,
} from "lucide-react";

export default function Home() {
  const { user, isAuthenticated } = useUser();

  return (
    <div className="p-8">
      <div className="flex flex-col gap-[40px]">
        <div>
          <h1 className="text-title-light text-4xl">
            Bem-vindo
            <span className="ml-1 font-semibold capitalize">{user.name}</span>.
          </h1>
          {!isAuthenticated && (
            <p className="text-text-lightSub mt-2">
              Faça
              <Link
                href="/login"
                className="text-blue-400 hover:text-mainBlue mx-1"
              >
                Login
              </Link>
              e aproveite todos os recursos da plataforma IAcademy.
            </p>
          )}
        </div>
        <div className="bg-blue-400 bg-[url('/wave2.svg')] bg-no-repeat bg-cover flex flex-col gap-8 justify-center items-center *:text-white py-[80px] rounded-xl">
          <h2 className="text-5xl font-bold">Tá afim de estudar o que hoje?</h2>
          <div className="relative flex w-[30%] h-[45px] items-center">
            <input
              placeholder="Busque os conteúdos da IAcademy"
              className="w-full h-full px-4 ring-0 outline-none rounded-md flex items-center text-text-light"
            />
            <Search size={25} className="absolute right-3 text-text-lightSub" />
          </div>
        </div>
        <div className="flex gap-[40px]">
          <div className="flex flex-col gap-[40px] w-full col-span-2">
            <ContentList title="Seus módulos">
              <Item
                title="Geometria espacial"
                href="http://localhost:3000/trilhas/geometria%20espacial"
                lucideIcon={Pyramid}
                description="Geometria Plana explora figuras bidimensionais."
              />

              <Item
                title="Probabilidade e Estatística"
                href="http://localhost:3000/trilhas/probabilidade%20e%20estat%C3%ADstica"
                lucideIcon={Calculator}
                description="Conceitos básicos de probabilidade, análise de dados e medidas de tendência central."
              />

              <Item
                title="Funções"
                href="http://localhost:3000/trilhas/fun%C3%A7%C3%B5es"
                lucideIcon={ChartSpline}
                description="Conceitos básicos de funções, tipos de funções e suas propriedades."
              />
            </ContentList>
            <ContentList title="Tópicos interessantes" cols={true}>
              <Item
                title="Círculos"
                href="http://localhost:3000/trilhas/geometria%20plana/figuras-planas/circulos"
                lucideIcon={Circle}
                description="Abordaremos as propriedades, definições e fórmulas relacionadas aos círculos, incluindo circunferência, área, relações com outros elementos geométricos e aplicações em problemas do ENEM."
              />

              <Item
                title="Juros Simples"
                href="http://localhost:3000/trilhas/matem%C3%A1tica%20financeira/juros-simples/juros-simples"
                lucideIcon={Percent}
                description="Cálculo de juros simples e montantes."
              />
              <Item
                title="Potenciação"
                href="http://localhost:3000/trilhas/n%C3%BAmeros%20e%20opera%C3%A7%C3%B5es/potenciacao-e-radiciacao/potenciacao"
                lucideIcon={Superscript}
                description="Propriedades de potenciação e radiciação."
              />
              <Item
                title="Funções para cima e baixo"
                href="http://localhost:3000/trilhas/fun%C3%A7%C3%B5es/analise-de-graficos/crescimento-e-decrescimento"
                lucideIcon={ChartLine}
                description="Aprenda a identificar se uma função é crescente ou decrescente em um determinado intervalo, utilizando conceitos chave como a derivada e a análise do comportamento do gráfico."
              />
            </ContentList>
            {/* <ContentList title="Tópicos mais estudados" /> */}
          </div>
          {/* <FilterSection /> */}
        </div>
      </div>
    </div>
  );
}
