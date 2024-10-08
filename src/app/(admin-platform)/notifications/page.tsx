"use client";

import ExportButton, {
  AddButton,
} from "@/app/ui/components/adminUtils/ExportButton";
import StatResume from "@/app/ui/components/adminUtils/StatResume";
import {
  Input,
  Select,
} from "@/app/ui/components/authenticationForm/InputGroup";
import {
  UserRoundCheck,
  UserRoundMinus,
  UserRoundPlus,
  MessagesSquare,
  CheckCheck,
  MessageSquareWarning,
  MessageSquareDot,
} from "lucide-react";

import axios from "axios";
import { useEffect, useState } from "react";
import UserItem from "@/app/ui/components/adminUtils/UserItem";

export default function Admins() {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPremiumUsers, setTotalPremiumUsers] = useState(0);
  const [totalBannedUsers, setTotalBannedUsers] = useState(0);
  const [totalNotBannedUsers, setTotalNotBannedUsers] = useState(0);

  const [category, setCategory] = useState("");
  const [plan, setPlan] = useState("");
  const [status, setStatus] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5002/users", {
        params: {
          category,
          plan,
          status,
        },
        withCredentials: true,
      });
      setUsers(response.data);
    } catch (error) {
      console.log("Erro ao buscar usuários", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [category, plan, status]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5002/users", {
          withCredentials: true,
        });

        setUsers(response.data);
      } catch (error) {
        console.log("Erro ao buscar usuários", error);
      }

      try {
        const response = await axios.get("http://localhost:5002/users_total", {
          withCredentials: true,
        });

        setTotalUsers(response.data.totalUsers);
        setTotalPremiumUsers(response.data.premiumUsers);
        setTotalBannedUsers(response.data.bannedUsers);
        setTotalNotBannedUsers(response.data.notBannedUsers);
      } catch (error) {
        console.log("Erro ao buscar usuários", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-3xl font-bold text-title-light">Notificações</h1>
      <section className="grid grid-cols-4 gap-5">
        <StatResume
          title="Mensagens"
          value={`0`}
          lucideIcon={MessagesSquare}
          description="Chamados"
        />
        <StatResume
          title="Sugestões"
          value={`0`}
          lucideIcon={MessageSquareDot}
          description="Feedbacks dos usuários"
          iconColor="text-mainBlue"
          iconBg="bg-blue-100"
        />
        <StatResume
          title="Resolvidos"
          value={`0`}
          lucideIcon={CheckCheck}
          description="Chamados atendidos"
          iconColor="text-green-500"
          iconBg="bg-green-100"
        />
        <StatResume
          title="Em análise"
          value={`0`}
          lucideIcon={MessageSquareWarning}
          description="Chamados em aberto"
          iconColor="text-yellow-500"
          iconBg="bg-yellow-100"
        />
      </section>
      <section className="bg-bg-light rounded-lg *:p-6 border-2 border-border-light flex flex-col">
        <form className="grid grid-cols-3 gap-5">
          <h2 className="text-text-light col-span-3 font-semibold text-xl">
            Filtros
          </h2>
          <div className="group/select">
            <select
              id="category"
              className="w-full px-4 h-[40px] border-2 border-border-light text-zinc-500 rounded-md outline-none duration-100 bg-bg-light group-hover/select:border-mainBlue"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option key="" value="">
                Selecione uma Categoria
              </option>
              <option key="user" value="user">
                Usuário
              </option>
              <option key="admin" value="admin">
                Administrador
              </option>
            </select>
          </div>
          <div className="group/select">
            <select
              id="plan"
              className="w-full px-4 h-[40px] border-2 border-border-light text-zinc-500 rounded-md outline-none duration-100 bg-bg-light group-hover/select:border-mainBlue"
              onChange={(e) => setPlan(e.target.value)}
            >
              <option key="" value="">
                Selecione um Tipo
              </option>
              <option key="basic" value="basic">
                Feedback
              </option>
              <option key="premium" value="premium">
                Problema
              </option>
            </select>
          </div>
          <div className="group/select">
            <select
              id="status"
              className="w-full px-4 h-[40px] border-2 border-border-light text-zinc-500 rounded-md outline-none duration-100 bg-bg-light group-hover/select:border-mainBlue"
              onChange={(e) => setStatus(e.target.value)}
            >
              <option key="" value="">
                Selecione um Status
              </option>
              <option key="active" value="active">
                Resolvido
              </option>
              <option key="sus" value="sus">
                Em análise
              </option>
            </select>
          </div>
        </form>
        <div className="border-t-2 border-border-light flex justify-between">
          <div className="group/select w-fit">
            <select
              id="amount"
              className="px-4 h-[40px] border-2 border-border-light text-zinc-500 rounded-md outline-none duration-100 bg-bg-light group-hover/select:border-mainBlue"
            >
              <option key="10" value="10">
                10
              </option>
              <option key="25" value="25">
                25
              </option>
              <option key="50" value="50">
                50
              </option>
              <option key="100" value="100">
                100
              </option>
            </select>
          </div>
          <div className="flex items-center gap-3">
            <Input className="h-10" placeholder="Procurar mensagem" />
            <ExportButton />
          </div>
        </div>
        <table>
          <thead className="border-y-2 border-border-light">
            <tr className="text-left w-full *:py-4 flex items-center justify-between px-6">
              <th className="px-5">
                <input type="checkbox" />
              </th>
              <th className="text-text-lightSub font-semibold w-full pl-3">
                ID
              </th>
              <th className="text-text-lightSub font-semibold w-full pl-3">
                Usuário
              </th>
              <th className="text-text-lightSub font-semibold w-full pl-3">
                Tipo
              </th>
              <th className="text-text-lightSub font-semibold w-full pl-3">
                Status
              </th>
              <th className="text-text-lightSub font-semibold w-full pl-3">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <p className="text-center py-5 text-text-lightSub">
                  Nenhuma mensagem encontrada.
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}

function Admin() {
  return (
    <tr className="border-b-[1px] border-border-lightB *:px-[24px] *:py-[12px] hover:bg-bg-lightHover duration-100">
      <td className=" text-text-lightSub text-sm">0</td>
      <td className=" text-text-lightSub text-sm">Admin</td>
      <td className=" text-text-lightSub text-sm">admin@email.com</td>
      <td className=" text-text-lightSub text-sm">1234</td>
      <td>
        <button className="rounded-md opacity-80 hover:opacity-100 px-4 py-1 bg-mainBlue text-white flex items-center justify-center duration-100">
          <p>Alterar</p>
        </button>
      </td>
    </tr>
  );
}
