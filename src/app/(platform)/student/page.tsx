"use client";

import { MessageCircleQuestion, Layers, Split } from "lucide-react";
import { useEffect, useState } from "react";
import CardsStudent from "@/app/ui/components/Student/CardsStudent";
import { Fifagrafico } from "@/app/ui/components/Student/Fifagrafico";
import { LoginsChart } from "@/app/ui/components/Student/LoginsChart";
import { TimeChart } from "@/app/ui/components/Student/TimeChart";
import { UtilizationChart } from "@/app/ui/components/Student/UtilizationChart";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";
import LoadingFrame from "@/app/ui/components/LoadingFrame";

export default function Student() {

  const { user, loading, isAuthenticated } = useUser();

  return (
    <div className="grid grid-cols-10 gap-5 min-h-full p-8">
      <div className="col-span-6 flex flex-col gap-5">
        <div className="w-full h-full bg-mainBlue p-10 text-white flex flex-col gap-5 rounded-lg">
          <h1 className="text-4xl">
            Bem-vindo de volta, <b>{user?.name || "Usuário"}</b> 👋
          </h1>
          <p className="max-w-[60%]">
            Você concluiu <b className="font-bold">80%</b> da trilha de
            matemática neste mês! Continue assim e você estará cada vez mais
            próximo dos seus objetivos.
          </p>
        </div>
        <div className="grid grid-cols-3 col-span-1 gap-5 h-full">
          <CardsStudent
            title="Quizzes realizados"
            value={"0"}
            lucideIcon={MessageCircleQuestion}
            iconBg="bg-[#F4734C]"
          />
          <CardsStudent
            title="Tópicos lidos"
            value={"00/00"}
            lucideIcon={Layers}
            iconBg="bg-[#438FFB]"
          />
          <CardsStudent
            title="Tópicos Restantes"
            value={"0"}
            lucideIcon={Split}
          />
        </div>
      </div>
      <div className="col-span-2 h-full">
        <UtilizationChart />
      </div>
      <div className="col-span-2 h-full">
        <Fifagrafico />
      </div>
      <div className="col-span-4">
        <LoginsChart />
      </div>
      <div className="col-span-6">
        <TimeChart />
      </div>

    
    </div>
  );
}
