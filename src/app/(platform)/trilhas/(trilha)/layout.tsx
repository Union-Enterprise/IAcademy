"use client";

import { Tag } from "@/app/ui/components/ContentList";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function TrilhaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <div>
      {!pathname.includes("/topic") && (
        <div className="bg-bg-lightA h-[300px] flex flex-col justify-between px-[200px] pt-[60px]">
          <div className="flex flex-col gap-3">
            <Link
              href="/trilhas"
              className="text-mainBlue opacity-60 hover:opacity-100 flex gap-2 items-center duration-100 w-fit mb-3"
            >
              <ArrowLeft />
              <p className="text-lg">Voltar</p>
            </Link>
            <h1 className="text-5xl font-bold text-title-light">Geometria</h1>
            <p className="text-text-lightSub text-lg">
              Aprenda tudo sobre o universo da geometria.
            </p>
            <div className="flex gap-3">
              <Tag name="Sólidos Geométricos" />
              <Tag name="3° Ano" />
              <Tag name="Intermediário" />
            </div>
          </div>
          <div className="flex gap-4">
            <Link
              href="/trilhas/overview"
              className={`${
                pathname.includes("/overview")
                  ? "border-b-mainBlue font-semibold"
                  : "opacity-50 hover:opacity-100 hover:border-opacity-75 hover:border-b-mainBlue "
              } *:text-text-light border-b-2 p-2 text-lg duration-100`}
            >
              <p>Visão Geral</p>
            </Link>
            <Link
              href="/trilhas/contents"
              className={`${
                pathname.includes("/contents")
                  ? "border-b-mainBlue font-semibold"
                  : "opacity-50 hover:opacity-100 hover:border-opacity-75 hover:border-b-mainBlue "
              } *:text-text-light border-b-2 p-2 text-lg duration-100`}
            >
              <p>Conteúdo</p>
            </Link>
          </div>
        </div>
      )}
      <div className="h-full mt-12 grid grid-cols-3 gap-10 px-[200px] relative">
        <div className="w-full col-span-2 flex flex-col gap-5">{children}</div>
        <div className="col-span-1 gap-5 flex flex-col sticky h-fit top-12">
          <StickyCard isPremium={true} title="Premium" action="Assinar" tabIndex={0}>
            <p className="mb-4 text-white">
              Estude sem preocupações ou distrações a qualquer momento.
            </p>
          </StickyCard>
          <StickyCard title="Quizzes" action="Realizar Quiz" tabIndex={0}>
            <p className="mb-4">
              Vamos ver se você entendeu sobre o conteúdo? Clique no botão
              abaixo e teste seus conhecimentos sobre Geometria.
            </p>
          </StickyCard>
          {pathname.includes("/topic") && (
            <>
              <StickyCard title="Pergunte à IA" action="Enviar" tabIndex={0}>
                <p className="mb-4">
                  Ficou com dúvida em alguma parte desse conteúdo? Basta digitar
                  logo abaixo.
                </p>
                <textarea
                  className="w-full border-2 border-border-light rounded-md p-2 mb-4 resize-none outline-none ring-0 focus:border-mainBlue duration-100"
                  placeholder="Escreva sua pergunta"
                />
              </StickyCard>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function StickyCard({
  isPremium = false,
  title = "",
  children,
  action = "",
  tabIndex = -1,
}: {
  isPremium?: boolean;
  title: string;
  children: React.ReactNode;
  action: string;
  tabIndex?: number; 
}) {
  return (
    <div
      className={`${
        isPremium
          ? "bg-mainBlue"
          : "bg-bg-lightCard border-2 border-border-light"
      } p-6 rounded-md shadow-sm`}
      tabIndex={tabIndex} 
      onFocus={() => console.log(`${title} focused`)} 
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
       
          console.log(`${title} clicked`); 
        }
      }}
    >
      <h2
        className={`${
          isPremium ? "text-white" : "text-title-light"
        } text-xl font-bold mb-4`}
      >
        {title}
      </h2>
      {children}
      {isPremium ? (
        <Link
          href={"/premium"}
          className="w-full flex items-center justify-center bg-white text-mainBlue py-2 rounded-md hover:bg-mainBlue border-2 hover:border-white border-transparent duration-100 hover:text-white"
        >
          {action}
        </Link>
      ) : (
        <button className="w-full flex items-center justify-center bg-mainBlue opacity-80 hover:opacity-100 duration-100 text-white py-2 rounded-md">
          {action}
        </button>
      )}
    </div>
  );
}
