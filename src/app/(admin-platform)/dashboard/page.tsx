"use client";

import StatResume from "@/app/ui/components/adminUtils/StatResume";
import { PiggyBank, Users, CreditCard, GitBranchPlus } from "lucide-react";
import LineChartStepped from "@/app/ui/components/adminUtils/charts/LineChartStepped";
import AvatarResume from "@/app/ui/components/adminUtils/AvatarResume";
import axios from "axios";

import { useEffect, useState } from "react";

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
        const response = await axios.get(
          "http://localhost:5002/users_total",
          { withCredentials: true }
        );
        setTotalUsers(response.data); 
      } catch (error) {
        console.log("Erro ao buscar usuários", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold text-title-light">Dashboard</h1>
        <button
          type="submit"
          className="bg-mainBlue bg-opacity-90 px-4 py-2 rounded-md hover:bg-opacity-100 duration-100 *:text-white flex items-center gap-2"
        >
          <p className="font-semibold text-sm">Download</p>
        </button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <StatResume title="Receita" value="$1997,00" lucideIcon={PiggyBank} />
        <StatResume title="Assinaturas" value="+2" lucideIcon={CreditCard} />
        <StatResume
          title="Usuários na plataforma"
          value={totalUsers}
          lucideIcon={Users}
        />
        <StatResume
          title="Trilhas cadastradas"
          value="1"
          lucideIcon={GitBranchPlus}
        />
      </div>
      <div className="grid grid-cols-7 gap-4 mt-5">
        <div className="col-span-4 border-[1px] border-border-lightC rounded-xl shadow-md hover:-translate-y-1 duration-100 hover:shadow-lg">
          <h3 className="text-title-light p-[24px] font-semibold">Visão Geral</h3>
          <div className="pl-[8px] p-[24px] *:w-[100%]">
            <LineChartStepped />
          </div>
        </div>
        <div className="col-span-3 rounded-xl border-[1px] shadow-md border-border-lightC hover:-translate-y-1 duration-100 hover:shadow-lg">
          <div className="p-[24px] pb-[12px] border-b-2 border-border-lightC border-opacity-10">
            <h3 className="text-title-light font-bold">Usuários Recentes</h3>
            <p className="text-text-lightSub text-sm mt-1">
              Últimos 5 usuários cadastrados.
            </p>
          </div>
          <div className="flex flex-col pt-0 mt-[12px] p-[24px] gap-[32px]">
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
      </div>
    </div>
  );
}
