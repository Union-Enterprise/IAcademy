"use client";

import Link from "next/link";
import { ChevronLeft, KeyRound } from "lucide-react";
import SettingsSection from "@/app/ui/components/profile/SettingsSection";
import { useState } from "react";
import InputGroup from "@/app/ui/components/authenticationForm/InputGroup";
import SettingsView from "@/app/ui/components/profile/SettingsView";

export default function Access() {
  const [emailView, setEmailView] = useState(false);
  const [passwordView, setPasswordView] = useState(false);

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
                placeholder="emaildousuario@email.com"
                className="w-full p-[10px] pr-[65px] border-2 rounded-md focus:outline-none focus:border-mainBlue peer duration-100"
              />
              <button
                className="text-mainBlue text-sm absolute right-0 px-[10px] h-full"
                onClick={() => setEmailView(true)}
              >
                Alterar
              </button>
            </div>
          </div>
          <div className="w-full flex flex-col">
            <label className="text-whiteText mb-3">Senha</label>
            <div className="relative flex items-center overflow-hidden rounded-md">
              <input
                type="password"
                disabled
                placeholder="********************"
                className="w-full p-[10px] pr-[65px] border-2 rounded-md focus:outline-none focus:border-mainBlue peer duration-100"
              />
              <button
                className="text-mainBlue text-sm absolute right-0 px-[10px] h-full"
                onClick={() => setPasswordView(true)}
              >
                Alterar
              </button>
            </div>
          </div>
        </div>
      </SettingsSection>
      {emailView && (
        <SettingsView closeView={() => setEmailView(false)}>
          <InputGroup
            label="Novo e-mail"
            inputType="email"
            placeholder="Digite seu novo e-mail"
          />
        </SettingsView>
      )}
      {passwordView && (
        <SettingsView closeView={() => setPasswordView(false)}>
          <InputGroup
            label="Senha"
            inputType="password"
            placeholder="Digite sua senha atual"
          />
          <InputGroup
            label="Nova senha"
            inputType="password"
            placeholder="Digite sua nova senha"
          />
          <InputGroup
            label="Confirme a nova senha"
            inputType="password"
            placeholder="Confirme sua nova senha"
          />
        </SettingsView>
      )}
    </>
  );
}
