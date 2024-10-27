"use client";

import Button from "../../utilities/Button";
import { ArrowLeft, Download } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function TrilhaMenu() {
  const pathname = usePathname();
  return (
    <div className="mx-auto bg-bg-light border-2 border-borders-light p-5 pb-0 rounded-md flex flex-col gap-5 w-[800px]">
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
          Nesta trilha você aprenderá o passo-a-passo para se preparar e ir bem
          nos vestibulares de 2024.
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
  );
}
