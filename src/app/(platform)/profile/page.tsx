"use client";

import SettingsSection from "@/app/ui/components/profile/SettingsSection";
import SettingsRemove from "@/app/ui/components/profile/SettingsRemove";
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
import { useState } from "react";
import { useUser } from "@/app/context/UserContext";
import Modal from "@/app/ui/components/profile/Modal";

export default function Profile() {
  const { user } = useUser();
  const [modalType, setModalType] = useState<"delete" | null>(null);
  const [visible, setVisible] = useState(false);

  const handleModalClose = () => {
    setVisible(false);
    setTimeout(() => {
      setModalType(null);
    }, 300);
  };

  return (
    <>
      {!user.is_adm && (
        <SettingsSection isPremium={user.is_premium}>
          <div className="flex gap-2 items-center">
            <BadgeCheck className="w-[30px] h-[30px] text-mainBlue" />
            <h3 className="text-lg font-semibold">IAcademy Premium</h3>
            <Link href="/profile/purchases">
              <p className="text-mainBlue opacity-80 hover:opacity-100 text-sm duration-100">
                Ver Assinaturas
              </p>
            </Link>
          </div>

          <p className="text-text-lightSub">
            Parece que você não possui nenhuma assinatura ativa ainda.
            <Link
              href="/premium"
              className="text-mainBlue opacity-80 hover:opacity-100 duration-100 mx-1"
            >
              Clique aqui
            </Link>
            e conheça as opções.
          </p>
        </SettingsSection>
      )}

      <SettingsSection>
        <div className="flex gap-2 items-center">
          <KeyRound className="w-[30px] h-[30px]" />
          <h3 className="text-lg font-semibold">Dados de acesso</h3>
          <Link href="/profile/access">
            <p className="text-mainBlue opacity-80 hover:opacity-100 duration-100 text-sm">
              Alterar
            </p>
          </Link>
        </div>
        <div className="flex flex-col gap-2 text-text-lightSub">
          <div className="flex gap-2 items-center">
            <Mail className="w-[20px] h-[20px]" />
            <p>{user.email}</p>
          </div>
          <div className="flex gap-2 items-center">
            <RectangleEllipsis className="w-[20px] h-[20px]" />
            <p>******************</p>
          </div>
        </div>
      </SettingsSection>

      <SettingsSection>
        <div className="flex gap-2 items-center">
          <UsersRound className="w-[30px] h-[30px]" />
          <h3 className="text-lg font-semibold">Dados do usuário</h3>
          <Link href="/profile/user">
            <p className="text-mainBlue opacity-80 hover:opacity-100 duration-100 text-sm">
              Alterar
            </p>
          </Link>
        </div>
        <div className="flex flex-col gap-2 text-text-lightSub">
          <div className="flex gap-2 items-center capitalize">
            <UserRoundPen className="w-[20px] h-[20px]" />
            <p>{user.name}</p>
          </div>
          {user.phone && (
            <div className="flex gap-2 items-center">
              <UserRoundPen className="w-[20px] h-[20px]" />
              <p>{user.phone}</p>
            </div>
          )}
          {user.birth && (
            <div className="flex gap-2 items-center">
              <UserRoundPen className="w-[20px] h-[20px]" />
              <p>{user.birth}</p>
            </div>
          )}
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
        <button
          className="px-4 py-2 bg-red-400 hover:bg-red-600 duration-200 w-fit rounded-md"
          onClick={() => {
            setModalType("delete");
          }}
        >
          <p className="text-white text-sm">Excluir minha conta</p>
        </button>
      </SettingsSection>

      {modalType && (
        <Modal
          title="Excluindo conta"
          onClose={handleModalClose}
          visible={visible}
          setVisible={setVisible}
        >
          <SettingsRemove closeModal={handleModalClose} />
        </Modal>
      )}
    </>
  );
}
