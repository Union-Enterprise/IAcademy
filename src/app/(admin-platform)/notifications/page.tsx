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
  MessageSquareX,
} from "lucide-react";

import axios from "axios";
import { useEffect, useState } from "react";
import ReportItem from "@/app/ui/components/adminUtils/ReportItem";

export default function Admins() {
  const [reports, setReports] = useState([]);
  const [totalProblems, setTotalProblems] = useState(0);
  const [totalSuggestions, setTotalSuggestions] = useState(0);
  const [totalSolved, setTotalSolved] = useState(0);
  const [totalUnsolved, setTotalUnsolved] = useState(0);

  const [sender, setSender] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");

  const handleSolve = async (id: string) =>{
    try{
      await axios.put(
        "http://localhost:5002/solve",
        {
          id
        },
        {
          withCredentials: true
        }
      )
      console.log("Resolvido com sucesso");
      setReports((prevReports) =>
        prevReports.map((report) =>
          report._id === id ? { ...report, solved: true } : report
        )
      );
      console.log(reports);

    }catch(error){
      console.log("Erro ao resolver", error);
    }
  };

  const handleUnsolve = async (id: string) =>{
    try{
      await axios.put(
        "http://localhost:5002/unsolve",
        {
          id
        },
        {
          withCredentials: true
        }
      )
      console.log("Colocado em análise");
      setReports((prevReports) =>
        prevReports.map((report) =>
          report._id === id ? { ...report, solved: false } : report
        )
      );
      console.log(reports);


    }catch(error){
      console.log("Erro ao resolver", error);
    }
  };

  // const handleDeleteUser = async (email: string) => {
  //   try {
  //     await axios.delete(`http://localhost:5002/delete_user`, {
  //       data: { email },
  //       withCredentials: true,
  //     });

  //     console.log("Usuário excluído com sucesso:", email);

  //     setReports((prevReports) =>
  //       prevReports.map((report) =>
  //         report.id === id ? { ...report, solved: true } : report
  //       )
  //     );
  //   } catch (error) {
  //     console.error("Erro ao excluir o usuário:", error);
  //   }
  // };

  // const handleRestoreUser = async (email: string) => {
  //   try {
  //     await axios.post(`http://localhost:5002/restore_user`, {
  //       email
  //     }, {
  //       withCredentials: true,
  //     });

  //     console.log("Usuário restaurado com sucesso:", email);

  //     setReports((prevReports) =>
  //       prevReports.map((report) =>
  //         user.email === email ? { ...user, is_banned: false } : user
  //       )
  //     );
  //   } catch (error) {
  //     console.error("Erro ao restaurar o usuário:", error);
  //   }
  // };

  const fetchReports = async () => {
    try {
      const response = await axios.get("http://localhost:5002/reports", {
        params: {
          sender,
          type,
          status,
        },
        withCredentials: true,
      });
      setReports(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("Erro ao buscar denúncias", error);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [sender, type, status]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5002/reports", {
          withCredentials: true,
        });

        setReports(response.data);
      } catch (error) {
        console.log("Erro ao buscar denúncias", error);
      }

      try {
        const response = await axios.get("http://localhost:5002/total_reports", {
          withCredentials: true,
        });
        console.log(response.data);

        setTotalSuggestions(response.data.totalSuggestions);
        setTotalProblems(response.data.totalMessages);
        setTotalSolved(response.data.solved);
        setTotalUnsolved(response.data.unsolved);
      } catch (error) {
        console.log("Erro ao buscar denúncias", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-3xl font-bold text-title-light">Notificações</h1>
      <section className="grid grid-cols-4 gap-5">
        <StatResume
          title="Problemas"
          value={`${totalProblems ? totalProblems: 0}`}
          lucideIcon={MessageSquareX}
          description="Problemas de conteúdo"
          iconColor="text-red-500"
          iconBg="bg-red-100"
        />
        <StatResume
          title="Sugestões"
          value={`${totalSuggestions ? totalSuggestions: 0}`}
          lucideIcon={MessageSquareDot}
          description="Feedbacks dos usuários"
          iconColor="text-mainBlue"
          iconBg="bg-blue-100"
        />
        <StatResume
          title="Resolvidos"
          value={`${totalSolved ? totalSolved: 0}`}
          lucideIcon={CheckCheck}
          description="Chamados atendidos"
          iconColor="text-green-500"
          iconBg="bg-green-100"
        />
        <StatResume
          title="Em análise"
          value={`${totalUnsolved ? totalUnsolved: 0}`}
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
              id="plan"
              className="w-full px-4 h-[40px] border-2 border-border-light text-zinc-500 rounded-md outline-none duration-100 bg-bg-light group-hover/select:border-mainBlue"
              onChange={(e) => setType(e.target.value)}
            >
              <option key="" value="">
                Selecione um Tipo
              </option>
              <option key="basic" value="Outro">
                Sugestão
              </option>
              <option key="premium" value="Problema">
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
              <option key="active" value="solved">
                Resolvido
              </option>
              <option key="sus" value="unsolved">
                Em análise
              </option>
            </select>
          </div>
          <div>
            <Input className="h-10" placeholder="Procurar mensagem" 
            onChange={(e) => setSender(e.target.value)}/>
          </div>
        </form>
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
                Tópico
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
          {reports.length > 0 ? (
              reports.map((report: any, index: number) => (
                <ReportItem
                  key={index}
                  id={`${index}`}
                  sender={report.sender}
                  topic={String(report.topic).charAt(0).toUpperCase()+String(report.topic).slice(1)}
                  complaint={report.complaint}
                  solved={report.solved ? "Resolvido" : "Em análise"}
                  message={report.message}
                  reportId={report._id}
                  onSolve={(id) =>handleSolve(id)}
                  onUnsolve={(id) =>handleUnsolve(id)}
                />
              ))
            ) : (
              <tr>
                <td className="text-center py-5 text-text-lightSub">
                  Nenhum usuário encontrado.
                </td>
              </tr>
            )}
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
