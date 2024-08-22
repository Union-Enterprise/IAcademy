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
import SubmitButton from "@/app/ui/components/authenticationForm/SubmitButton";
import { useUser } from "@/app/context/UserContext";

// Função para validar CPF
const validarCPF = (cpf: string): boolean => {
  cpf = cpf.replace(/[^\d]/g, '');
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
    return false;
  }
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let primeiroDigitoVerificador = 11 - (soma % 11);
  if (primeiroDigitoVerificador >= 10) primeiroDigitoVerificador = 0;
  if (primeiroDigitoVerificador != parseInt(cpf.charAt(9))) {
    return false;
  }
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  let segundoDigitoVerificador = 11 - (soma % 11);
  if (segundoDigitoVerificador >= 10) segundoDigitoVerificador = 0;
  if (segundoDigitoVerificador != parseInt(cpf.charAt(10))) {
    return false;
  }
  return true;
};

export default function User() {
  const [showView, setShowView] = useState(false);
  const { user } = useUser();

  // Dados do usuário
  const [nickname, setNickName] = useState("");
  const [username, setUsername] = useState("");
  const [birth, setBirth] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");
  const [cpfError, setCpfError] = useState("");

  // Dados de endereço
  const [CEP, setCEP] = useState("");
  const [bairro, setBairro] = useState("");
  const [city, setCity] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [comp, setComp] = useState("");
  const [state, setState] = useState("");

  // Mensagens de erro para dados do usuário
  const [nicknameError, setNicknameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [birthError, setBirthError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [formError, setFormError] = useState("");

  // Mensagens de erro para dados de endereço
  const [cepError, setCepError] = useState("");
  const [bairroError, setBairroError] = useState("");
  const [cityError, setCityError] = useState("");
  const [houseNumberError, setHouseNumberError] = useState("");
  const [compError, setCompError] = useState("");
  const [stateError, setStateError] = useState("");

  // Função para lidar com a mudança no campo CPF
  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cpfInput = e.target.value;
    setCpf(cpfInput);

    if (!cpfInput) {
      setCpfError("CPF é obrigatório.");
    } else if (!validarCPF(cpfInput)) {
      setCpfError("CPF inválido! Por favor, verifique e tente novamente.");
    } else {
      setCpfError("");
    }
  };

  // Função para verificar se todos os campos obrigatórios estão preenchidos
  const validateForm = (): boolean => {
    let isValid = true;

    if (!nickname) {
      setNicknameError("Nome de exibição é obrigatório.");
      isValid = false;
    } else {
      setNicknameError("");
    }

    if (!username) {
      setUsernameError("Nome do usuário é obrigatório.");
      isValid = false;
    } else {
      setUsernameError("");
    }

    if (!birth) {
      setBirthError("Data de nascimento é obrigatória.");
      isValid = false;
    } else {
      setBirthError("");
    }

    if (!gender || gender === "nulo") {
      setGenderError("Gênero é obrigatório.");
      isValid = false;
    } else {
      setGenderError("");
    }

    if (!phone) {
      setPhoneError("Telefone é obrigatório.");
      isValid = false;
    } else {
      setPhoneError("");
    }

    if (!cpf) {
      setCpfError("CPF é obrigatório.");
      isValid = false;
    } else if (!validarCPF(cpf)) {
      setCpfError("CPF inválido! Por favor, verifique e tente novamente.");
      isValid = false;
    } else {
      setCpfError("");
    }

    // Verificar campos de endereço
    if (!CEP) {
      setCepError("CEP é obrigatório.");
      isValid = false;
    } else {
      setCepError("");
    }

    if (!bairro) {
      setBairroError("Bairro é obrigatório.");
      isValid = false;
    } else {
      setBairroError("");
    }

    if (!city) {
      setCityError("Cidade é obrigatória.");
      isValid = false;
    } else {
      setCityError("");
    }

    if (!houseNumber) {
      setHouseNumberError("Número é obrigatório.");
      isValid = false;
    } else {
      setHouseNumberError("");
    }

    if (!state) {
      setStateError("Estado é obrigatório.");
      isValid = false;
    } else {
      setStateError("");
    }

    return isValid;
  };

  // Função para enviar dados do formulário
  const handleSubmitUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Verificar se todos os campos estão preenchidos
    if (!validateForm()) {
      return;
    }

    // Código para enviar os dados do usuário para o banco
    console.log({
      nickname,
      username,
      birth,
      gender,
      phone,
      cpf,
    });
  };

  // Função para enviar dados do endereço
  const handleSubmitAddress = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Verificar se todos os campos obrigatórios estão preenchidos
    if (!validateForm()) {
      return;
    }

    // Código para enviar os dados de endereço para o banco
    console.log({
      CEP,
      bairro,
      city,
      houseNumber,
      comp,
      state,
    });
  };

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
          onSubmit={handleSubmitUser}
        >
          <div className="mt-3">
            <InputGroup
              label="Nome de exibição"
              labelFor="nickname"
              placeholder="Nome de exibição"
              isRequired={false}
              onChange={(e) => setNickName(e.target.value)}
            />
            {nicknameError && (
              <p className="text-red-500 text-sm mt-3">
                {nicknameError}
              </p>
            )}
          </div>

          <div className="mt-3">
            <InputGroup
              label="Nome do usuário"
              labelFor="username"
              placeholder="Nome do usuário"
              isRequired={false}
              onChange={(e) => setUsername(e.target.value)}
            />
            {usernameError && (
              <p className="text-red-500 text-sm mt-3">
                {usernameError}
              </p>
            )}
          </div>

          <div className="mt-3">
            <InputGroup
              label="Data de Nascimento"
              labelFor="date"
              placeholder={user.birth || "00/00/0000"}
              isRequired={false}
              onChange={(e) => setBirth(e.target.value)}
            />
            {birthError && (
              <p className="text-red-500 text-sm mt-3">
                {birthError}
              </p>
            )}
          </div>

          <div className="mt-3">
            <InputGroup
              label="Gênero"
              labelFor="gender"
              placeholder="Gênero"
              isRequired={false}
              onChange={(e) => setGender(e.target.value)}
            />
            {genderError && (
              <p className="text-red-500 text-sm mt-3">
                {genderError}
              </p>
            )}
          </div>

          <div className="mt-3">
            <InputGroup
              label="Telefone"
              labelFor="phone"
              placeholder="Telefone"
              isRequired={false}
              onChange={(e) => setPhone(e.target.value)}
            />
            {phoneError && (
              <p className="text-red-500 text-sm mt-3">
                {phoneError}
              </p>
            )}
          </div>

          <div className="mt-3">
            <InputGroup
              label="CPF"
              labelFor="cpf"
              placeholder="CPF"
              isRequired={false}
              onChange={handleCpfChange}
            />
            {cpfError && (
              <p className="text-red-500 text-sm mt-3">
                {cpfError}
              </p>
            )}
          </div>

          <div className="col-span-2 flex justify-end mt-5">
            <SubmitButton text="Salvar Dados" />
          </div>
        </form>

        <div className="mt-12">
          <div className="flex items-center gap-5">
            <CreditCard />
            <h3 className="font-bold text-xl">Endereço</h3>
          </div>

          <form
            className="grid grid-cols-2 gap-x-3 gap-y-5"
            onSubmit={handleSubmitAddress}
          >
            <div className="mt-3">
              <InputGroup
                label="CEP"
                labelFor="cep"
                placeholder="CEP"
                isRequired={false}
                onChange={(e) => setCEP(e.target.value)}
              />
              {cepError && (
                <p className="text-red-500 text-sm mt-3">
                  {cepError}
                </p>
              )}
            </div>

            <div className="mt-3">
              <InputGroup
                label="Bairro"
                labelFor="bairro"
                placeholder="Bairro"
                isRequired={false}
                onChange={(e) => setBairro(e.target.value)}
              />
              {bairroError && (
                <p className="text-red-500 text-sm mt-3">
                  {bairroError}
                </p>
              )}
            </div>

            <div className="mt-3">
              <InputGroup
                label="Cidade"
                labelFor="city"
                placeholder="Cidade"
                isRequired={false}
                onChange={(e) => setCity(e.target.value)}
              />
              {cityError && (
                <p className="text-red-500 text-sm mt-3">
                  {cityError}
                </p>
              )}
            </div>

            <div className="mt-3">
              <InputGroup
                label="Número"
                labelFor="houseNumber"
                placeholder="Número"
                isRequired={false}
                onChange={(e) => setHouseNumber(e.target.value)}
              />
              {houseNumberError && (
                <p className="text-red-500 text-sm mt-3">
                  {houseNumberError}
                </p>
              )}
            </div>

            <div className="mt-3">
              <InputGroup
                label="Complemento"
                labelFor="comp"
                placeholder="Complemento"
                isRequired={false}
                onChange={(e) => setComp(e.target.value)}
              />
              {compError && (
                <p className="text-red-500 text-sm mt-3">
                  {compError}
                </p>
              )}
            </div>

            <div className="mt-3">
              <InputGroup
                label="Estado"
                labelFor="state"
                placeholder="Estado"
                isRequired={false}
                onChange={(e) => setState(e.target.value)}
              />
              {stateError && (
                <p className="text-red-500 text-sm mt-3">
                  {stateError}
                </p>
              )}
            </div>

            <div className="col-span-2 flex justify-end mt-5">
              <SubmitButton text="Salvar Endereço" />
            </div>
          </form>
        </div>
      </SettingsSection>
    </>
  );
}
