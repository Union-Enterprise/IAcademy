"use client";

import Link from "next/link";
import { ChevronLeft, KeyRound, X } from "lucide-react";
import SettingsSection from "@/app/ui/components/profile/SettingsSection";
import { useState } from "react";
import InputGroup from "@/app/ui/components/authenticationForm/InputGroup";
import { useUser } from "@/app/context/UserContext";
import axios from "axios";
import SubmitButton from "@/app/ui/components/authenticationForm/SubmitButton";

export default function Access() {
  const [modalType, setModalType] = useState<"email" | "password" | null>(null);
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { user } = useUser();

  const userPassword = user.password;

  return (
    <>
      <Link
        href="/profile"
        className="*:text-mainBlue opacity-50 hover:opacity-100 flex gap-2 items-center duration-100 w-fit"
      >
        <ChevronLeft className="w-5 h-5" />
        <p className="text-lg">Voltar</p>
      </Link>
      <SettingsSection>
        <div className="flex items-center gap-5">
          <KeyRound />
          <h3 className="font-bold text-xl">Dados de Acesso</h3>
        </div>
        <div className="flex gap-3">
          <div className="w-full flex flex-col">
            <label className="text-whiteText mb-3">E-mail</label>
            <div className="relative flex items-center overflow-hidden rounded-md">
              <input
                type="email"
                disabled
                placeholder={user.email}
                className="bg-background-lightA w-full p-[10px] pr-[65px] border-2 rounded-md focus:outline-none focus:border-mainBlue peer duration-100"
              />
              <button
                className="text-mainBlue text-sm absolute right-0 px-[10px] h-full"
                onClick={() => setModalType("email")}
              >
                Alterar
              </button>
            </div>
          </div>
          <div className="w-full flex flex-col">
            <label className="text-title-light mb-3">Senha</label>
            <div className="relative flex items-center overflow-hidden rounded-md">
              <input
                type="password"
                disabled
                value={user.password}
                className="bg-background-lightA text-text-lightSub text-opacity-60 w-full p-[10px] pr-[65px] border-2 rounded-md focus:outline-none focus:border-mainBlue peer duration-100"
              />
              <button
                className="text-mainBlue text-sm absolute right-0 px-[10px] h-full"
                onClick={() => setModalType("password")}
              >
                Alterar
              </button>
            </div>
          </div>
        </div>
      </SettingsSection>
      {modalType && (
        <div className="bg-black bg-opacity-60 absolute m-auto w-full h-full top-0 left-0 z-20 flex items-center justify-center">
          <form
            className="w-[500px] p-6 gap-5 flex flex-col border-2 border-border-light rounded-md bg-background-light relative pt-14"
            onSubmit={(e) => {
              e.preventDefault();

              if (modalType === "password") {
                if (
                  oldPassword === userPassword &&
                  password === confirmPassword
                ) {
                  // Código de post no axios que muda a senha atual pelo da const "password"
                }
              } else {
                // Código de post no axios que muda o email atual pelo da const "email"
              }
            }}
          >
            <X
              className="cursor-pointer opacity-40 hover:text-red-600 hover:opacity-100 duration-200 w-[30px] h-[30px] absolute right-6 top-6"
              onClick={() => setModalType(null)}
            />
            {modalType === "email" ? (
              <InputGroup
                label="Novo e-mail"
                labelFor="email"
                inputType="email"
                placeholder="Digite seu novo e-mail"
                onChange={(e) => setEmail(e.target.value)}
              />
            ) : (
              <>
                <InputGroup
                  label="Senha"
                  labelFor="password"
                  inputType="password"
                  placeholder="Digite sua senha atual"
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <InputGroup
                  label="Nova senha"
                  labelFor="newPassword"
                  inputType="password"
                  placeholder="Digite sua nova senha"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputGroup
                  label="Confirme a nova senha"
                  labelFor="confirmNewPassword"
                  inputType="password"
                  placeholder="Confirme sua nova senha"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </>
            )}
            <SubmitButton text="Alterar" />
          </form>
        </div>
      )}
    </>
  );
}
