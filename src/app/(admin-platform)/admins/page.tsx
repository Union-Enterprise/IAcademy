"use client";

export default function Admins() {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold text-title-light">Administradores</h1>
        <button
          type="submit"
          className="bg-mainBlue bg-opacity-90 px-4 py-2 rounded-md hover:bg-opacity-100 duration-100 *:text-white flex items-center gap-2"
        >
          <p className="font-semibold text-sm">Download</p>
        </button>
      </div>
      <table className="shadow-md rounded-lg overflow-hidden text-left">
        <thead>
          <tr className="border-b-[1px] border-border-lightB text-left *:px-[24px] *:py-[18px] bg-background-lightCard">
            <th className="text-text-light font-bold">ID</th>
            <th className="text-text-light font-bold">Nome</th>
            <th className="text-text-light font-bold">E-mail</th>
            <th className="text-text-light font-bold">Senha</th>
            <th className="text-text-light font-bold">Ações</th>
          </tr>
        </thead>
        <tbody>
          <Admin />
          <Admin />
          <Admin />
          <Admin />
        </tbody>
      </table>
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
