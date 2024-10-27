"use client";

import Link from "next/link";
import Generic from "@/app/ui/components/flows/Generic";
import { ArrowLeft, Download, MessageCircleQuestion } from "lucide-react";
import Button from "@/app/ui/utilities/Button";
import { usePathname } from "next/navigation";

export default function Overview({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <section className="py-10 px-[200px] relative flex flex-col items-center gap-5">
      <div className="bg-bg-light border-2 border-borders-light p-5 pb-0 rounded-md flex flex-col gap-5 w-[800px]">
        <div className="flex justify-between items-center">
          <Link
            href={"/trilhas"}
            className="text-text-lightSub opacity-60 hover:opacity-100 flex items-center duration-100 w-fit h-fit"
          >
            <ArrowLeft />
            <p className="text-sm">Todas as trilhas</p>
          </Link>
          <Button title="Download" bg="bg-yellow-400">
            <Download size={20} />
          </Button>
        </div>
        <div>
          <h1 className="text-text-light text-3xl font-bold">
            Preparando-se para os vestibulares
          </h1>
          <p className="text-text-lightSub mt-2">
            Nesta trilha você aprenderá o passo-a-passo para se preparar e ir
            bem nos vestibulares de 2024.
          </p>
        </div>
        <div className="flex gap-4">
          <Link
            href={"/trilhas/overview"}
            className={`${
              pathname.includes(`/overview`)
                ? "border-b-mainBlue font-semibold"
                : "opacity-50 hover:opacity-100 hover:border-opacity-75 hover:border-b-mainBlue"
            } *:text-text-light border-b-2 p-2 duration-100`}
          >
            <p>Visão da Trilha</p>
          </Link>
          <Link
            href={"/trilhas/contents"}
            className={`${
              pathname.includes("/contents")
                ? "border-b-mainBlue font-semibold"
                : "opacity-50 hover:opacity-100 hover:border-opacity-75 hover:border-b-mainBlue"
            } *:text-text-light border-b-2 p-2 duration-100`}
          >
            <p>Conteúdos</p>
          </Link>
          <Link
            href={"/trilhas/tests"}
            className={`${
              pathname.includes("/test")
                ? "border-b-mainBlue font-semibold"
                : "opacity-50 hover:opacity-100 hover:border-opacity-75 hover:border-b-mainBlue"
            } *:text-text-light border-b-2 p-2 duration-100`}
          >
            <p>Quizzes</p>
          </Link>
        </div>
      </div>
      <div className="bg-bg-light border-2 border-borders-light p-3 px-5 rounded-md flex justify-between gap-5 w-[800px] *:text-sm">
        <div className="flex items-center gap-2">
          <span className="bg-yellow-200 px-2 py-1 rounded-md">
            0% concluído
          </span>
          <p>0 de 200 concluídos</p>
        </div>
        <button className="*:text-text-lightSub *:text-sm flex items-center gap-2 *:opacity-50 *:duration-100 group cursor-pointer">
          <MessageCircleQuestion className="group-hover:opacity-100" />
          <p className="group-hover:opacity-100">
            Como rastrear meu progresso?
          </p>
        </button>
      </div>
      <Generic />
    </section>
  );
}
