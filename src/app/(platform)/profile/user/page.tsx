"use client";

import Link from "next/link";
import {
  ChevronLeft,
  UsersRound,
  CreditCard,
  Home,
  ChevronDown,
} from "lucide-react";
import SettingsSection from "@/app/ui/components/profile/SettingsSection";
import { useState } from "react";
import InputGroup from "@/app/ui/components/authenticationForm/InputGroup";
import UpdateModal from "@/app/ui/components/profile/UpdateModal";
import SubmitButton from "@/app/ui/components/authenticationForm/SubmitButton";
import { useUser } from "@/app/context/UserContext";

export default function User() {
  const [showView, setShowView] = useState(false);
  const { user } = useUser();

  // Dados do usuário
  const [nickname, setNickName] = useState("");
  const [username, setUsername] = useState("");
  const [birth, setBirth] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");

  // Dados de endereço
  const [CEP, setCEP] = useState("");
  const [bairro, setBairro] = useState("");
  const [city, setCity] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [comp, setComp] = useState("");
  const [state, setState] = useState("");

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

        <form
          className="grid grid-cols-2 gap-x-3 gap-y-5"
          onSubmit={(e) => {
            e.preventDefault();

            // código que envia pro banco os dados do usuário de "nickname" até "phone"
            // obs: alguns dados podem ser opcionais
          }}
        >
          <InputGroup
            label="Nome de exibição"
            labelFor="nickname"
            placeholder="Nome de exibição"
            isRequired={false}
            onChange={(e) => setNickName(e.target.value)}
          />
          <InputGroup
            label="Nome do usuario"
            labelFor="username"
            placeholder="Nome do usuário"
            isRequired={false}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="col-span-2 grid grid-cols-3 gap-3">
            <InputGroup
              label="Data de Nascimento"
              labelFor="date"
              placeholder={user.birth || "00/00/0000"}
              isRequired={false}
              onChange={(e) => setBirth(e.target.value)}
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
                  required={false}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="nulo" selected>
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
              placeholder={user.phone || "(99) 12345-6789"}
              isRequired={false}
              onChange={(e) => setPhone(e.target.value)}
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
        {user.isPremium ? (
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
            Para alterar o método de pagamento, você precisa de uma assinatura.
            <Link
              className="text-mainBlue opacity-80 hover:opacity-100 duration-100 mx-1"
              href={"/premium"}
            >
              Clique aqui
            </Link>
            e conheça os planos.
          </p>
        )}
      </SettingsSection>
      <SettingsSection>
        <div className="flex items-center gap-5">
          <Home />
          <h3 className="font-bold text-xl">Endereço</h3>
        </div>
        <form
          className="grid grid-cols-3 gap-5"
          onSubmit={(e) => {
            e.preventDefault();

            // código que envia pro banco os dados de endereço de "CEP" até "state"
          }}
        >
          <InputGroup
            label="CEP"
            labelFor="cep"
            inputType="text"
            placeholder="00000-00"
            onChange={(e) => setCEP(e.target.value)}
          />
          <InputGroup
            label="Bairro"
            labelFor="bairro"
            inputType="text"
            placeholder="Seu bairro"
            onChange={(e) => setBairro(e.target.value)}
          />
          <InputGroup
            label="Cidade"
            labelFor="city"
            inputType="text"
            placeholder="Sua cidade"
            onChange={(e) => setCity(e.target.value)}
          />
          <InputGroup
            label="Número"
            labelFor="number"
            inputType="text"
            placeholder="Número da casa"
            onChange={(e) => setHouseNumber(e.target.value)}
          />
          <InputGroup
            label="Complemento"
            labelFor="complement"
            inputType="text"
            placeholder="Complemento"
            isRequired={false}
            onChange={(e) => setComp(e.target.value)}
          />
          <InputGroup
            label="Estado"
            labelFor="state"
            inputType="text"
            placeholder="Estado"
            onChange={(e) => setState(e.target.value)}
          />
          <div className="col-span-3">
            <SubmitButton text="Enviar" />
          </div>
        </form>
      </SettingsSection>

      {showView && (
        <UpdateModal closeView={() => setShowView(false)}>
          <InputGroup
            label="Novo CPF"
            labelFor="cpf"
            inputType="text"
            placeholder="Digite seu novo CPF"
          />
        </UpdateModal>
      )}
    </>
  );
}
