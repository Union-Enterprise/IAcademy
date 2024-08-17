"use client";

import { Search } from "lucide-react";
import FilterSection from "../ui/components/FilterSection";
import ContentList from "../ui/components/ContentList";

export default function Home() {
  return (
    <div className="mx-[32px] mt-[40px]">
      <div className="flex flex-col gap-[40px]">
        <div className="flex flex-col bg-mainBlue gap-8 justify-center items-center *:text-white py-[80px] rounded-xl">
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
            <ContentList title="Conteúdos em destaque" />
            <ContentList title="Tópicos mais estudados" />
          </div>
          <FilterSection />
        </div>
      </div>
    </div>
  );
}
