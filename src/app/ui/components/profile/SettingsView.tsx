import { Eye, SquareX, X } from "lucide-react";

export default function SettingsView({ closeView }: { closeView: () => void }) {
  return (
    <div className="bg-black bg-opacity-60 absolute m-auto w-full h-full top-0 left-0 z-20 flex items-center justify-center">
      <form className="w-[500px] p-6 gap-5 flex flex-col border-2 rounded-md bg-[rgba(253,253,253)] relative pt-14">
        <X
          className="cursor-pointer opacity-40 hover:text-red-600 hover:opacity-100 duration-200 w-[30px] h-[30px] absolute right-6 top-6"
          onClick={closeView}
        />
        <div className="w-full flex flex-col">
          <label className="text-whiteText mb-3">Senha</label>
          <div className="relative flex items-center overflow-hidden rounded-md group/input">
            <input
              type="password"
              placeholder="Digite sua senha atual"
              required
              className="w-full p-[10px] pr-[65px] border-2 rounded-md focus:outline-none group-hover/input:border-mainBlue focus:border-mainBlue peer duration-200"
            />
            <Eye className="absolute right-0 px-[10px] w-[60px] peer-focus:opacity-100 peer-focus:text-mainBlue group-hover/input:text-mainBlue group-hover/input:opacity-100 text-whiteText opacity-20 cursor-pointer duration-200" />
          </div>
        </div>
        <div className="w-full flex flex-col">
          <label className="text-whiteText mb-3">Nova senha</label>
          <div className="relative flex items-center overflow-hidden rounded-md group/input">
            <input
              type="password"
              placeholder="Digite sua nova senha"
              required
              className="w-full p-[10px] pr-[65px] border-2 rounded-md focus:outline-none group-hover/input:border-mainBlue focus:border-mainBlue peer duration-200"
            />
            <Eye className="absolute right-0 px-[10px] w-[60px] peer-focus:opacity-100 peer-focus:text-mainBlue group-hover/input:text-mainBlue group-hover/input:opacity-100 text-whiteText opacity-20 cursor-pointer duration-200" />
          </div>
        </div>
        <div className="w-full flex flex-col">
          <label className="text-whiteText mb-3">Confirme a nova senha</label>
          <div className="relative flex items-center overflow-hidden rounded-md group/input">
            <input
              type="password"
              placeholder="Confirma sua nova senha"
              required
              className="w-full p-[10px] pr-[65px] border-2 rounded-md focus:outline-none group-hover/input:border-mainBlue focus:border-mainBlue peer duration-200"
            />
            <Eye className="absolute right-0 px-[10px] w-[60px] peer-focus:opacity-100 peer-focus:text-mainBlue group-hover/input:text-mainBlue group-hover/input:opacity-100 text-whiteText opacity-20 cursor-pointer duration-200" />
          </div>
        </div>
        <button className="bg-mainBlue bg-opacity-80 hover:bg-opacity-100 duration-200 py-[10px] rounded-md">
          <p className="text-lg text-white font-bold">Alterar senha</p>
        </button>
      </form>
    </div>
  );
}
