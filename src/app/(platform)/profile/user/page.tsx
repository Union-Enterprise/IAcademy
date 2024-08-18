"use client";

import Link from "next/link";
import {
  ChevronLeft,
  UsersRound,
  CreditCard,
  Home,
  ArrowDown,
  ChevronDown,
} from "lucide-react";
import SettingsSection from "@/app/ui/components/profile/SettingsSection";
import { useState } from "react";
import InputGroup from "@/app/ui/components/authenticationForm/InputGroup";
import SettingsView from "@/app/ui/components/profile/SettingsView";
import SubmitButton from "@/app/ui/components/authenticationForm/SubmitButton";

export default function User() {
  const [showView, setShowView] = useState(false);
  const [pagamentView, setPagamentView] = useState(false);
  const [hasPaymentMethod, setHasPaymentMethod] = useState(false);

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

        <form className="grid grid-cols-2 gap-x-3 gap-y-5">
          <InputGroup
            label="Nome de exibição"
            labelFor="nickname"
            placeholder="Nome de exibição"
          />
          <InputGroup
            label="Nome do usuario"
            labelFor="username"
            placeholder="Nome do usuário"
          />
          <div className="col-span-2 grid grid-cols-3 gap-3">
            <InputGroup
              label="Data de Nascimento"
              labelFor="date"
              placeholder="00/00/0000"
            />

            <div className="flex flex-col gap-[10px]">
              <label
                className="text-title-light w-fit text-lg font-semibold"
                htmlFor="gender"
              >
                Gênero
              </label>
              <div className="relative flex items-center overflow-hidden rounded-md *:text-text-lightSub group/select">
                <select
                  id="gender"
                  className="w-full py-[12px] p-[10px] border-2 border-border-light rounded-md focus:outline-none focus:border-mainBlue group-hover/select:border-mainBlue peer duration-100 bg-background-light appearance-none"
                >
                  <option value="" selected>
                    Selecione uma opção
                  </option>
                  <option value="machoAlpha">Masculino</option>
                  <option value="femea">Feminino</option>
                </select>
                <ChevronDown
                  className="absolute right-[10px] pointer-events-none"
                  size={20}
                />
              </div>
            </div>
            <InputGroup
              label="Telefone"
              labelFor="tel"
              placeholder="(99) 99999-9999"
            />
          </div>
          <div className="col-span-2">
            <SubmitButton text="Enviar" />
          </div>
        </form>
      </SettingsSection>
      <SettingsSection>
        <div className="flex items-center gap-5">
          <CreditCard />
          <h3 className="font-bold text-xl">Métodos de pagamento</h3>
        </div>
        {!hasPaymentMethod ? (
          <div className="col-span-2 gap-5 grid grid-cols-2">
            <InputGroup
              label="CPF"
              labelFor="cpf"
              placeholder="000_000_000-00"
              isDisabled={true}
              onClick={() => setShowView(true)}
            />
            <InputGroup
              label="Número"
              labelFor="cardNumber"
              inputType="text"
              placeholder="Número do cartão"
              isDisabled={true}
              onClick={() => setShowView(true)}
            />
            <InputGroup
              label="Nome"
              labelFor="cardName"
              inputType="text"
              placeholder="Nome impresso no cartão"
              isDisabled={true}
              onClick={() => setShowView(true)}
            />
            <InputGroup
              label="Validade"
              labelFor="date"
              inputType="text"
              placeholder="00/00"
              isDisabled={true}
              onClick={() => setShowView(true)}
            />
            <InputGroup
              label="Código de segurança"
              labelFor="cvv"
              inputType="text"
              placeholder="CVV"
              isDisabled={true}
              onClick={() => setShowView(true)}
            />
            <button className="h-[52px] text-white font-bold rounded-md bg-mainBlue opacity-80 hover:opacity-100 duration-100 self-end flex items-center justify-center gap-3">
              <CreditCard />
              <p>Nova forma de pagamento</p>
            </button>
          </div>
        ) : (
          <p>
            Parece que você não possui nenhuma assinatura ativa ainda.
            <Link
              className="text-mainBlue opacity-80 hover:opacity-100 duration-100 mx-1"
              href={"/premium"}
            >
              Clique aqui
            </Link>
            e conheça as opções.
          </p>
        )}
      </SettingsSection>

      <SettingsSection>
        <div className="flex items-center gap-5">
          <Home />
          <h3 className="font-bold text-xl">Endereço</h3>
        </div>
        <form className="grid grid-cols-3 gap-5">
          <InputGroup
            label="CEP"
            labelFor="cep"
            inputType="text"
            placeholder="00000-00"
          />
          <InputGroup
            label="Bairro"
            labelFor="bairro"
            inputType="text"
            placeholder="Seu bairro"
          />
          <InputGroup
            label="Cidade"
            labelFor="city"
            inputType="text"
            placeholder="Sua cidade"
          />
          <InputGroup
            label="Número"
            labelFor="number"
            inputType="text"
            placeholder="Número da casa"
          />
          <InputGroup
            label="Complemento"
            labelFor="complement"
            inputType="text"
            placeholder="Complemento"
            isRequired={false}
          />
          <InputGroup
            label="Estado"
            labelFor="state"
            inputType="text"
            placeholder="Estado"
          />
          <div className="col-span-3">
            <SubmitButton text="Enviar" />
          </div>
        </form>
      </SettingsSection>
      {showView && (
        <SettingsView closeView={() => setShowView(false)}>
          <InputGroup
            label="Novo CPF"
            labelFor="cpf"
            inputType="text"
            placeholder="Digite seu novo CPF"
          />
        </SettingsView>
      )}
    </>
  );
}
