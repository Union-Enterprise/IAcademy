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
  BookCheck,
  CircleX,

} from "lucide-react";

import axios from "axios";
import { useEffect, useState } from "react";
import UserItem from "@/app/ui/components/adminUtils/UserItem";
import LineChart from "@/app/ui/components/adminUtils/charts/LineChart";
import LineStudent from "@/app/ui/components/LineStudent";


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
        <h1 className="text-3xl font-bold text-title-light">Meus estudos</h1>
        <section className="grid grid-cols-4 gap-5">
            <StatResume
            title="Perguntas para a IA"
            value={`0`}
            lucideIcon={MessagesSquare}
            description=""
            />
            <StatResume
            title="Acertos nos quizzes"
            value={`0`}
            lucideIcon={CheckCheck}
            description=""
            iconColor="text-green-500"
           
            />
            <StatResume
            title=" Quizzes resolvidos"
            value={`0`}
            lucideIcon={BookCheck}
            description=""
            iconColor="text-green-500"
            
            />
            <StatResume
            title="Respostas erradas"
            value={`0`}
            lucideIcon={CircleX}
            description=""
            iconColor="text-red-500"
       
            />
        </section>
        <div className="grid grid-cols-2 gap-96">
            <div className="p-6 pb-14 bg-background-light  rounded-lg h-[480px] w-[800px] flex flex-col gap-5 ">
                <h3 className="text-title-light text-xl font-bold">
                Frequencia de estudos - 2024
                </h3>
                <LineStudent /> 
            </div>
            <div className="flex justify-center bg-background-light border rounded-lg  gap-5 w-[400px]">
                <div className="p-6 pb-3 border-b-2 border-border-lightA border-opacity-30">
                    <h3 className="text-title-light font-bold">Historico de quizzes feitos</h3>
                   
                </div>
               
            </div>
        </div>
    </div>
        
  
    
  );
}

