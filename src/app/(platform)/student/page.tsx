"use client";

import { ChevronRight, NotebookPen, Search } from "lucide-react";
import { useUser } from "../../context/UserContext";
import { Flame } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import UtilizationChart from "@/app/ui/components/Student/UtilizationChart";

export default function Home() {
  const { user, isAuthenticated } = useUser();
  const now = new Date().getHours();

  return (
    <section className="p-10 flex flex-col gap-10">
      <div>
        <h1 className="text-2xl font-bold">Meus Estudos</h1>
        <h2 className="text-lg">
          {now < 12 ? "Bom-dia" : now < 18 ? "Boa tarde" : "Boa noite"}{" "}
          {user.name}
        </h2>
      </div>
      <div className="grid grid-cols-10 gap-10">
        <div className="col-span-6 flex flex-col gap-12">
          <div>
            <h3 className="p-5 rounded-tl-xl rounded-tr-xl font-semibold shadow-sm border-2 border-borders-light mb-2">
              Resumo rápido
            </h3>
            <div className="grid grid-cols-3 gap-2">
              <div className="p-5 flex flex-col gap-1 rounded-xl border-2 border-borders-light">
                <h4 className="text-3xl font-black">00/00</h4>
                <p>Tópicos Estudados</p>
              </div>
              <div className="p-5 flex flex-col gap-1 rounded-xl border-2 border-borders-light">
                <h4 className="text-3xl font-black">0</h4>
                <p>Avaliações realizadas</p>
              </div>
              <div className="p-5 flex flex-col gap-1 rounded-xl border-2 border-borders-light">
                <h4 className="text-3xl font-black">1</h4>
                <p>Trilhas iniciadas</p>
              </div>
              <div className="col-span-3 flex flex-col rounded-xl shadow-sm border-2 border-borders-light">
                <p className="font-medium mx-5 pt-5 pb-3 border-b-2 border-gray-300">
                  Continue de onde você parou
                </p>
                <Link
                  href={"#"}
                  className="px-5 py-4 flex flex-col gap-1 hover:bg-bg-lightA duration-100"
                >
                  <h5 className="text-xl font-bold">Tópico</h5>
                  <p className="text-text-lightSub">
                    Descriçaõ Descriçaõ Descriçaõ Descriçaõ
                  </p>
                </Link>
              </div>
            </div>
          </div>
          <div className="border-2 border-borders-light p-5 rounded-xl">
            <h3 className="font-semibold text-lg">Aproveitamento de Estudos</h3>
            <div className="bg-blue-300 flex">
              <UtilizationChart />
            </div>
          </div>
        </div>
        <div className="col-span-4 flex flex-col gap-10">
          <div className="rounded-xl p-5 pr-44 flex relative items-center shadow-sm border-2 border-borders-light">
            <div>
              <p className="text-xl font-bold text-[#FF9600]">Você está à</p>
              <span className="text-8xl font-black text-[#FF9600]">22</span>
              <p className="text-xl font-bold text-[#FF9600]">
                dias se preparando para os vestibulares!
              </p>
            </div>
            <Flame
              size={180}
              className="absolute right-5"
              fill="#FFC700"
              stroke="#FF9600"
              strokeWidth={3}
            />
          </div>
          <div className="border-2 border-borders-light p-5">
            <h3>Feedbacks</h3>
          </div>
        </div>
      </div>
    </section>
  );
}

{
  /* <p>Avaliações realizadas</p>
            <p>Trilhas iniciadas</p> */
}
