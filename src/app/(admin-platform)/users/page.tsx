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
  UsersRound,
  X,
} from "lucide-react";

import axios from "axios";
import { useEffect, useState } from "react";
import UserItem from "@/app/ui/components/adminUtils/UserItem";
import SubmitButton from "@/app/ui/components/authenticationForm/SubmitButton";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPremiumUsers, setTotalPremiumUsers] = useState(0);
  const [totalBannedUsers, setTotalBannedUsers] = useState(0);
  const [totalNotBannedUsers, setTotalNotBannedUsers] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  let address: string;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    type: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    {
      if (formData.type == "admin") {
        address = "http://localhost:5002/create_adm";
      } else {
        address = "http://localhost:5002/create_user_adm";
      }
      console.log(address)
      sendData();
    }
  };

  const handleEditUser = (id: string) => {
    console.log("Editando usuário com ID:", id);
  };

  const handleDeleteUser = async (email: string) => {
    try {
      await axios.delete(`http://localhost:5002/delete_user`, {
        data: { email },
        withCredentials: true,
      });

      console.log("Usuário excluído com sucesso:", email);

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.email === email ? { ...user, is_banned: true } : user
        )
      );
    } catch (error) {
      console.error("Erro ao excluir o usuário:", error);
    }
  };

  const handleRestoreUser = async (email: string) => {
    try {
      await axios.post(`http://localhost:5002/restore_user`, {
        email
      }, {
        withCredentials: true,
      });

      console.log("Usuário restaurado com sucesso:", email);

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.email === email ? { ...user, is_banned: false } : user
        )
      );
    } catch (error) {
      console.error("Erro ao restaurar o usuário:", error);
    }
  };

  const sendData = () => {
    setIsSubmitting(true);
    const { name, email, password, } = formData;
    axios
      .post(
        address,
        { name, email, password },
        { withCredentials: true }
      )
      .then((response) => {
        console.log("Cadastrado com sucesso");
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleAddButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [category, setCategory] = useState("");
  const [plan, setPlan] = useState("");
  const [status, setStatus] = useState("");
  const [nameRegex, setNameRegex] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5002/users", {
        params: {
          category,
          plan,
          status,
          nameRegex,
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
  }, [category, plan, status, nameRegex]);

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
      <h1 className="text-3xl font-bold text-title-light">Usuários</h1>
      <section className="grid grid-cols-4 gap-5">
        <StatResume
          title="Sessões"
          value={`${totalUsers ? totalUsers : 0}`}
          lucideIcon={UsersRound}
          description="Total de usuários"
        />
        <StatResume
          title="Premium"
          value={`${totalPremiumUsers ? totalPremiumUsers : 0}`}
          lucideIcon={UserRoundPlus}
          description="Usuários Premium"
          iconColor="text-mainBlue"
          iconBg="bg-blue-100"
        />
        <StatResume
          title="Ativos"
          value={`${totalNotBannedUsers ? totalNotBannedUsers : 0}`}
          lucideIcon={UserRoundCheck}
          description="Usuários ativos"
          iconColor="text-green-500"
          iconBg="bg-green-100"
        />
        <StatResume
          title="Suspensos"
          value={`${totalBannedUsers ? totalBannedUsers : 0}`}
          lucideIcon={UserRoundMinus}
          description="Usuários banidos / suspensos"
          iconColor="text-red-500"
          iconBg="bg-red-100"
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
                Selecione um Plano
              </option>
              <option key="basic" value="basic">
                Básico
              </option>
              <option key="premium" value="premium">
                Premium
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
                Ativo
              </option>
              <option key="sus" value="sus">
                Suspenso
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
            <Input className="h-10" placeholder="Procurar usuário"
             onChange={(e) => setNameRegex(e.target.value)}/>
            <ExportButton />
            <AddButton onClick={handleAddButtonClick} />
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
                Categoria
              </th>
              <th className="text-text-lightSub font-semibold w-full pl-3">
                Plano
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
            {users.length > 0 ? (
              users.map((user: any, index: number) => (
                <UserItem
                  key={index}
                  id={`${index}`}
                  name={user.name}
                  email={user.email}
                  category={user.is_adm ? "Administrador" : "Usuário"}
                  plan={user.is_premium ? "Premium" : "Básico"}
                  status={user.is_banned ? "Suspenso" : "Ativo"}
                  onEdit={(id) => handleEditUser(id)}
                  onDelete={(email) => handleDeleteUser(email)}
                  onUnban={(email) => handleRestoreUser(email)}
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
      {/* Modal */}
      <section
        className={`fixed inset-0 z-50 flex items-end justify-end ${isModalOpen ? "pointer-events-auto group" : "pointer-events-none"
          }`}
      >
        <div
          className={`
            bg-black fixed inset-0 duration-300 pointer-events-none
            ${isModalOpen ? " opacity-50 pointer-events-auto" : "opacity-0"}`}
          onClick={handleCloseModal}
        />

        <div
          className={`bg-white w-full max-w-md p-8 h-screen shadow-lg transform transition-transform duration-300 ease-in-out flex flex-col gap-5 ${isModalOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <X
            className="hover:text-text-light duration-100 cursor-pointer text-text-lightSub"
            onClick={handleCloseModal}
          />
          <h2 className="text-xl font-semibold">Adicionar novo usuário</h2>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <Input inputType="text" placeholder="Nome" className="h-[48px]"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <Input
              inputType="email"
              placeholder="E-mail"
              className="h-[48px]"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <Input
              inputType="password"
              placeholder="Informe a senha"
              className="h-[48px]"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <Input
              inputType="password"
              placeholder="Confirme a senha"
              className="h-[48px]"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            />
            <Select
              options={[
                { value: "", label: "Categoria" },
                { value: "user", label: "Usuário" },
                { value: "admin", label: "Administrador" },
              ]}
              value={formData.type}
              onChange={
                (e) => setFormData({ ...formData, type: e.target.value })

              }
            />
            <SubmitButton text="Adicionar usuário" />
          </form>
        </div>
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