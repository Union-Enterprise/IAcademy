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
} from "lucide-react";

export default function Admins() {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-3xl font-bold text-title-light">Usuários</h1>
      <section className="grid grid-cols-4 gap-5">
        <StatResume
          title="Sessões"
          value="0"
          lucideIcon={UsersRound}
          description="Total de usuários"
        />
        <StatResume
          title="Premium"
          value="0"
          lucideIcon={UserRoundPlus}
          description="Usuários Premium"
          iconColor="text-mainBlue"
          iconBg="bg-blue-100"
        />
        <StatResume
          title="Ativos"
          value="0"
          lucideIcon={UserRoundCheck}
          description="Usuários ativos"
          iconColor="text-green-500"
          iconBg="bg-green-100"
        />
        <StatResume
          title="Suspensos"
          value="0"
          lucideIcon={UserRoundMinus}
          description="Usuários banidos / suspensos"
          iconColor="text-red-500"
          iconBg="bg-red-100"
        />
      </section>
      <section className="bg-background-light rounded-lg *:p-6 border-2 border-border-light flex flex-col">
        <form className="grid grid-cols-3 gap-5">
          <h2 className="text-text-light col-span-3 font-semibold text-xl">
            Filtros
          </h2>
          <div className="group/select">
            <select
              id="category"
              className="w-full px-4 h-[40px] border-2 border-border-light text-zinc-500 rounded-md outline-none duration-100 bg-background-light group-hover/select:border-mainBlue"
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
              className="w-full px-4 h-[40px] border-2 border-border-light text-zinc-500 rounded-md outline-none duration-100 bg-background-light group-hover/select:border-mainBlue"
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
              className="w-full px-4 h-[40px] border-2 border-border-light text-zinc-500 rounded-md outline-none duration-100 bg-background-light group-hover/select:border-mainBlue"
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
              className="px-4 h-[40px] border-2 border-border-light text-zinc-500 rounded-md outline-none duration-100 bg-background-light group-hover/select:border-mainBlue"
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
            <Input className="h-10" placeholder="Procurar usuário" />
            <ExportButton />
            <AddButton />
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
            <tr className="text-left w-full *:py-4 flex items-center justify-between px-6">
              <th className="px-5">
                <input type="checkbox" />
              </th>
              <td className="w-full pl-3 text-text-lightSub">0</td>
              <td className="w-full pl-3 text-text-lightSub">Junin</td>
              <td className="w-full pl-3 text-text-lightSub">Usuário</td>
              <td className="w-full pl-3 text-text-lightSub">Básico</td>
              <td className="w-full pl-3 text-text-lightSub">Ativo</td>
              <td className="w-full pl-3 text-text-lightSub">12312312312</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}

function Admin() {
  return (
    <tr className="border-b-[1px] border-border-lightB *:px-[24px] *:py-[12px] hover:bg-background-lightHover duration-100">
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
