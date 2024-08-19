"use client";

import { Search } from "lucide-react";
import FilterSection from "../ui/components/FilterSection";
import ContentList from "../ui/components/ContentList";
import { useUser } from "../context/UserContext";
import Link from "next/link";

export default function Home() {
  const { user, isAuthenticated } = useUser();

  console.log(user);

  return (
    <div className="mx-[32px] mt-[40px]">
      <div className="flex flex-col gap-[40px]">
        <div>
          <h1 className="text-title-light text-4xl">
            Bem-vindo <span className="font-semibold">{user.name}</span>.
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
