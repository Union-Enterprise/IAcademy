"use client";

import Link from "next/link";
import { ChevronLeft, KeyRound, UsersRound } from "lucide-react";
import SettingsSection from "@/app/ui/components/profile/SettingsSection";
import { useState } from "react";
import InputGroup from "@/app/ui/components/authenticationForm/InputGroup";
import SettingsView from "@/app/ui/components/profile/SettingsView";
import SubmitButton from "@/app/ui/components/authenticationForm/SubmitButton";

export default function User() {
  const [showView, setShowView] = useState(false);
  const [pagamentView, setPagamentView] = useState(false);

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
          <UsersRound />
          <h3 className="font-bold text-xl">Dados do Usuário</h3>
        </div>

        <div className="grid grid-cols-2 gap-x-3 gap-y-5">
          <div className="flex flex-col">
            <label className="text-whiteText mb-3">Nome de exibição</label>
            <div className="relative flex items-center overflow-hidden rounded-md">
              <input
                type="text"
                placeholder="Nome do exibição"
                className="w-full p-[10px] pr-[65px] border-2 rounded-md focus:outline-none focus:border-mainBlue hover:border-mainBlue peer duration-100"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-whiteText mb-3">Nome do usuário</label>
            <div className="relative flex items-center overflow-hidden rounded-md">
              <input
                type="text"
                placeholder="Nome de usuário"
                className="w-full p-[10px] pr-[65px] border-2 rounded-md focus:outline-none focus:border-mainBlue peer duration-100"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-whiteText mb-3">CPF</label>
            <div className="relative flex items-center overflow-hidden rounded-md">
              <input
                type="text"
                disabled
                placeholder="___.___.___-__"
                className="w-full p-[10px] pr-[65px] border-2 rounded-md focus:outline-none focus:border-mainBlue peer duration-100"
              />
              <button
                className="text-mainBlue text-sm absolute right-0 px-[10px] h-full"
                onClick={() => setShowView(true)}
              >
                Alterar
              </button>
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-whiteText mb-3">Forma de pagamento</label>
            <div className="relative flex items-center overflow-hidden rounded-md">
              <input
                type="text"
                disabled
                placeholder="coloque a forma de pagamento"
                className="w-full p-[10px] pr-[65px] border-2 rounded-md focus:outline-none focus:border-mainBlue peer duration-100"
              />
              <button
                className="text-mainBlue text-sm absolute right-0 px-[10px] h-full"
                onClick={() => setPagamentView(true)}
              >
                Alterar
              </button>
            </div>
          </div>

          <div className="col-span-2 grid grid-cols-3 gap-x-3 grid-rows-1">
            <div className="flex flex-col">
              <label className="text-whiteText mb-3">Data de Nascimento</label>
              <div className="relative flex items-center overflow-hidden rounded-md">
                <input
                  type="text"
                  placeholder="99/99/9999"
                  className="w-full p-[10px] pr-[65px] border-2 rounded-md focus:outline-none focus:border-mainBlue hover:border-mainBlue peer duration-100"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-whiteText mb-3">Gênero</label>
              <div className="relative flex items-center overflow-hidden rounded-md">
                <select className="w-full p-[10px] border-2 rounded-md focus:outline-none focus:border-mainBlue hover:border-mainBlue peer duration-100 bg-white text-black appearance-none">
                  <option value="" selected>
                    Selecione uma opção
                  </option>
                  <option value="machoAlpha">Masculino</option>
                  <option value="femea">Feminino</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-whiteText mb-3">Telefone</label>
              <div className="relative flex items-center overflow-hidden rounded-md">
                <input
                  type="text"
                  placeholder="(99) 99999-9999"
                  className="w-full p-[10px] pr-[65px] border-2 rounded-md focus:outline-none focus:border-mainBlue hover:border-mainBlue peer duration-100"
                />
              </div>
            </div>
          </div>
          <div className="col-span-2 grid grid-cols-3 gap-x-3 grid-rows-1">
            <div className="flex flex-col">
              <label className="text-whiteText mb-3">CEP</label>
              <div className="relative flex items-center overflow-hidden rounded-md">
                <input
                  type="text"
                  placeholder="00000-000"
                  className="w-full p-[10px] pr-[65px] border-2 rounded-md focus:outline-none focus:border-mainBlue hover:border-mainBlue peer duration-100"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-whiteText mb-3">Bairro</label>
              <div className="relative flex items-center overflow-hidden rounded-md">
              <div className="relative flex items-center overflow-hidden rounded-md">
                <input
                  type="text"
                  placeholder="Digite seu bairro"
                  className="w-full p-[10px] pr-[65px] border-2 rounded-md focus:outline-none focus:border-mainBlue hover:border-mainBlue peer duration-100"
                />
              </div>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-whiteText mb-3">Cidade</label>
              <div className="relative flex items-center overflow-hidden rounded-md">
                <input
                  type="text"
                  placeholder="Digite sua cidade"
                  className="w-full p-[10px] pr-[65px] border-2 rounded-md focus:outline-none focus:border-mainBlue hover:border-mainBlue peer duration-100"
                />
              </div>
            </div>
          </div>
          <div className="col-span-2 grid grid-cols-3 gap-x-3 grid-rows-1">
            <div className="flex flex-col">
              <label className="text-whiteText mb-3">Numero</label>
              <div className="relative flex items-center overflow-hidden rounded-md">
                <input
                  type="text"
                  placeholder="Digite o numero"
                  className="w-full p-[10px] pr-[65px] border-2 rounded-md focus:outline-none focus:border-mainBlue hover:border-mainBlue peer duration-100"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-whiteText mb-3">Complemento</label>
              <div className="relative flex items-center overflow-hidden rounded-md">
              <div className="relative flex items-center overflow-hidden rounded-md">
                <input
                  type="text"
                  placeholder="Digite o complemento"
                  className="w-full p-[10px] pr-[65px] border-2 rounded-md focus:outline-none focus:border-mainBlue hover:border-mainBlue peer duration-100"
                />
              </div>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-whiteText mb-3">Estado</label>
              <div className="relative flex items-center overflow-hidden rounded-md">
                <input
                  type="text"
                  placeholder="Digite seu estado"
                  className="w-full p-[10px] pr-[65px] border-2 rounded-md focus:outline-none focus:border-mainBlue hover:border-mainBlue peer duration-100"
                />
              </div>
            </div>
          </div>
          <SubmitButton text="Slavar"/>
        </div>
      </SettingsSection>
      {showView && (
        <SettingsView closeView={() => setShowView(false)}>
          <InputGroup
            label="Novo CPF"
            inputType="text"
            placeholder="Digite seu novo CPF"
          />
        </SettingsView>
      )}
      {pagamentView && (
        <SettingsView closeView={() => setPagamentView(false)}>
          <InputGroup
            label="Numero do cartão"
            inputType="text"
            placeholder="Digite o numero do cartão"
          />
          <InputGroup
            label="Nome do cartão"
            inputType="text"
            placeholder="Digite o nome do cartão"
          />
          <InputGroup
            label="Data de validade"
            inputType="text"
            placeholder="99/99"
          />
          <InputGroup
            label="Codigo de segurança"
            inputType="text"
            placeholder="Digite o codigo do cartão"
          />
          <InputGroup
            label="CPF/CNPJ"
            inputType="text"
            placeholder="___.___.___-__"
          />
          

        </SettingsView>
      )}
    </>
  );
}
