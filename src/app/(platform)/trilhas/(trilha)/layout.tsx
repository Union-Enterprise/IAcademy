"use client";

import { Tag } from "@/app/ui/components/ContentList";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TrilhaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <div className="h-full">
      <div className="bg-background-lightA h-[300px] flex flex-col justify-between px-[200px] pt-[60px]">
        <div className="flex flex-col gap-3">
          <Link
            href="/trilhas"
            className="*:text-blue-500 opacity-50 hover:opacity-100 flex gap-2 items-center duration-100 w-fit"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="w-5 h-5" />
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
            href="/trilhas/general"
            className={`${
              pathname.includes("/general")
                ? "border-b-mainBlue font-semibold"
                : "opacity-50 hover:opacity-100 hover:border-opacity-75 hover:border-b-mainBlue "
            } *:text-text-light border-b-2 p-2 text-lg duration-100`}
          >
            <p>Visão Geral</p>
          </Link>
          <Link
            href="/trilhas/content"
            className={`${
              pathname.includes("/content")
                ? "border-b-mainBlue font-semibold"
                : "opacity-50 hover:opacity-100 hover:border-opacity-75 hover:border-b-mainBlue "
            } *:text-text-light border-b-2 p-2 text-lg duration-100`}
          >
            <p>Conteúdo</p>
          </Link>
        </div>
      </div>
      <div className="h-full mt-20 grid grid-cols-3 gap-10 px-[200px]">
        <div className="w-full col-span-2">{children}</div>
        <div className="col-span-1 gap-5 flex flex-col relative">
          <div
            className="p-6 rounded-md shadow-md sticky top-5
           bg-mainBlue"
          >
            <h2 className="text-xl font-bold mb-4 text-white">Premium</h2>
            <p className="mb-4 text-white">
              Estude sem preocupações ou distrações a qualquer momento.
            </p>
            <Link href={"/premium"}>
              <button className="w-full bg-background-light text-mainBlue py-2 rounded-md hover:bg-mainBlue border-2 hover:border-white border-transparent duration-100 hover:text-white">
                Assinar
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
