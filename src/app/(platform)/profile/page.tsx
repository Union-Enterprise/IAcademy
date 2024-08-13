import SettingsSection from "@/app/ui/components/profile/SettingsSection";
import {
  BadgeCheck,
  KeyRound,
  Mail,
  RectangleEllipsis,
  UsersRound,
  UserRoundPen,
  Skull,
} from "lucide-react";
import Link from "next/link";

export default function Profile() {
  return (
    <>
      <SettingsSection isPremium={true}>
        <div className="flex gap-2 items-center">
          <BadgeCheck className="w-[30px] h-[30px] text-mainBlue" />
          <h3 className="text-lg font-semibold">IAcademy Premium</h3>
          <Link href="/profile/signatures">
            <p className="text-mainBlue text-sm">Ver Assinaturas</p>
          </Link>
        </div>

        <p className="text-whiteText">
          Você ainda não possui nenhuma assinatura ativa.
          <Link href="/premium" className="text-mainBlue mx-1">
            Clique aqui
          </Link>
          e conheça as opções.
        </p>
      </SettingsSection>
      <SettingsSection>
        <div className="flex gap-2 items-center">
          <KeyRound className="w-[30px] h-[30px]" />
          <h3 className="text-lg font-semibold">Dados de acesso</h3>
          <Link href="/profile/access">
            <p className="text-mainBlue text-sm">Alterar</p>
          </Link>
        </div>
        <div className="flex flex-col gap-2 *:text-whiteText">
          <div className="flex gap-2 items-center">
            <Mail className="w-[20px] h-[20px]" />
            <p>emaildousuario@email.com</p>
          </div>
          <div className="flex gap-2 items-center">
            <RectangleEllipsis className="w-[20px] h-[20px]" />
            <p>********************</p>
          </div>
        </div>
      </SettingsSection>
      <SettingsSection>
        <div className="flex gap-2 items-center">
          <UsersRound className="w-[30px] h-[30px]" />
          <h3 className="text-lg font-semibold">Dados do usuário</h3>
          <Link href="/profile/user">
            <p className="text-mainBlue text-sm">Alterar</p>
          </Link>
        </div>
        <div className="flex flex-col gap-2 *:text-whiteText">
          <div className="flex gap-2 items-center">
            <UserRoundPen className="w-[20px] h-[20px]" />
            <p>Nome do usuário</p>
          </div>
        </div>
      </SettingsSection>
      <SettingsSection isDeleteAccount={true}>
        <div className="flex gap-2 items-center">
          <Skull className="w-[30px] h-[30px]" />
          <p>Excluir conta</p>
        </div>
        <p>
          Ao excluir sua conta, todos os dados relacionados a você e sua conta
          serão deletados e não será possível restaurá-los.
        </p>
        <button className=" px-4 py-2 bg-red-400 hover:bg-red-600 duration-200 w-fit rounded-md">
          <p className="text-white text-sm">Excluir minha conta</p>
        </button>
      </SettingsSection>
    </>
  );
}
