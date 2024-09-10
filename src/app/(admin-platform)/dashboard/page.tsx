"use client";

import StatResume from "@/app/ui/components/adminUtils/StatResume";
import {
  PiggyBank,
  Users,
  CreditCard,
  GitBranchPlus,
  Download,
} from "lucide-react";
import LineChart from "@/app/ui/components/adminUtils/charts/LineChart";
import AvatarResume from "@/app/ui/components/adminUtils/AvatarResume";
import axios from "axios";

import { useEffect, useState } from "react";
import ExportButton from "@/app/ui/components/adminUtils/ExportButton";

export default function Dashboard() {
  const [recentUsers, setRecentUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5002/recent_users",
          { qtd: 5 },
          { withCredentials: true }
        );

        setRecentUsers(response.data);
      } catch (error) {
        console.log("Erro ao buscar usuários", error);
      }

      try {
        const response = await axios.get("http://localhost:5002/users_total", {
          withCredentials: true,
        });
        setTotalUsers(response.data.commonUsers);
      } catch (error) {
        console.log("Erro ao buscar usuários", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-7 gap-5 *:shadow-sm">
      <div className="flex flex-col p-6 bg-background-light col-span-5 rounded-lg gap-10">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-title-light font-bold text-xl">
              Resumo rápido
            </h3>
            <p className="text-text-lightSub text-sm mt-2">Visão geral</p>
          </div>
          <ExportButton />
        </div>
        <div className=" grid grid-cols-1 gap-5 *:col-span-1 lg:grid-cols-2 2xl:grid-cols-4">
          <StatResume title="Receita" value="$1997,00" lucideIcon={PiggyBank} />
          <StatResume title="Assinaturas" value="+2" lucideIcon={CreditCard} />
          <StatResume
            title="Usuários na plataforma"
            value={`${totalUsers ? totalUsers : 0}`}
            lucideIcon={Users}
          />
          <StatResume
            title="Trilhas cadastradas"
            value="1"
            lucideIcon={GitBranchPlus}
          />
        </div>
      </div>
      <div className="flex flex-col bg-background-light col-span-2 rounded-lg gap-5">
        <div className="p-6 pb-3 border-b-2 border-border-lightA border-opacity-30">
          <h3 className="text-title-light font-bold">Usuários Recentes</h3>
          <p className="text-text-lightSub text-sm mt-1">
            Últimos usuários registrados.
          </p>
        </div>
        <div className="flex flex-col overflow-hidden">
          {recentUsers.length > 0 ? (
            recentUsers.map((user: any, index: number) => (
              <AvatarResume
                key={index}
                name={user.name}
                email={user.email}
                avatarUrl={user.img || "/default_user.jpg"}
              />
            ))
          ) : (
            <p>Nenhum usuário recente encontrado.</p>
          )}
        </div>
      </div>
      <div className="p-6 pb-14 bg-background-light col-span-5 rounded-lg h-[350px] flex flex-col gap-5">
        <h3 className="text-title-light text-xl font-bold">
          Usuários registrados - 2024
        </h3>
        <LineChart />
      </div>
      <div className="flex flex-col bg-background-light col-span-2 rounded-lg gap-5">
        <div className="p-6 pb-3 border-b-2 border-border-lightA border-opacity-30">
          <h3 className="text-title-light font-bold">Notificações recentes</h3>
          <p className="text-text-lightSub text-sm mt-1">
            Últimas notificações recebidas.
          </p>
        </div>
        <div className="flex flex-col px-6 gap-[32px]">
          <p>Nenhuma nova mensagem por enquanto.</p>
        </div>
      </div>
    </div>
  );
}
