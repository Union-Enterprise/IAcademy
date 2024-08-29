"use client";

import Link from "next/link";
import { ChevronLeft, UsersRound, CreditCard, Building2 } from "lucide-react";
import SettingsSection from "@/app/ui/components/profile/SettingsSection";
import { useReducer, useState } from "react";
import InputGroup from "@/app/ui/components/authenticationForm/InputGroup";
import SubmitButton from "@/app/ui/components/authenticationForm/SubmitButton";
import { useUser } from "@/app/context/UserContext";
import RestrictInput from "@/app/ui/components/profile/RestrictInput";
import Modal from "@/app/ui/components/profile/Modal";

// Função para validar CPF
const validarCPF = (cpf: string): boolean => {
  cpf = cpf.replace(/[^\d]/g, "");
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

// Estado inicial
const initialState = {
  userFormData: {
    username: "",
    birth: "",
    gender: "",
    phone: "",
  },
  addressFormData: {
    cep: "",
    street: "",
    houseNumber: "",
    comp: "",
    bairro: "",
    city: "",
    state: "",
  },
  formErrors: {
    username: "",
    birth: "",
    gender: "",
    phone: "",
    cep: "",
    street: "",
    houseNumber: "",
    comp: "",
    bairro: "",
    city: "",
    state: "",
  },
};

// Tipos de ações para o reducer
type ActionType =
  | { type: "SET_USER_FIELD"; field: string; value: string }
  | { type: "SET_ADDRESS_FIELD"; field: string; value: string }
  | { type: "SET_ERROR"; field: string; error: string };

// Função reducer para gerenciar os tipos de estados
function formReducer(state: typeof initialState, action: ActionType) {
  switch (action.type) {
    case "SET_USER_FIELD":
      return {
        ...state,
        userFormData: {
          ...state.userFormData,
          [action.field]: action.value,
        },
        formErrors: {
          ...state.formErrors,
          [action.field]: "", // Limpa a mensagem de erro ao alterar o campo
        },
      };
    case "SET_ADDRESS_FIELD":
      return {
        ...state,
        addressFormData: {
          ...state.addressFormData,
          [action.field]: action.value,
        },
        formErrors: {
          ...state.formErrors,
          [action.field]: "", // Limpa a mensagem de erro ao alterar o campo
        },
      };
    case "SET_ERROR":
      return {
        ...state,
        formErrors: {
          ...state.formErrors,
          [action.field]: action.error, // Mostra uma mensagem de erro no campo
        },
      };
    default:
      return state;
  }
}

export default function User() {
  const { user } = useUser();
  const [modalType, setModalType] = useState<"cpf" | null>(null);
  const [visible, setVisible] = useState(false);
  const [cpf, setCpf] = useState(user.cpf || "");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleModalClose = () => {
    setVisible(false);
    setTimeout(() => {
      setModalType(null);
    }, 300);
  };
  const [state, dispatch] = useReducer(formReducer, initialState);

  // Função para mostrar ou esconder o erro de acordo com a mudança nos inputs
  const handleUserInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    dispatch({ type: "SET_USER_FIELD", field: id, value });
  };

  const handleAddressInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    dispatch({ type: "SET_ADDRESS_FIELD", field: id, value });
  };

  // Função para lidar com a mudança no campo CPF
  // const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const cpfInput = e.target.value;
  //   dispatch({ type: "SET_FIELD", field: "cpf", value: cpfInput });

  //   if (!cpfInput) {
  //     dispatch({ type: "SET_ERROR", field: "cpf", error: "" });
  //   } else if (!validarCPF(cpfInput)) {
  //     dispatch({
  //       type: "SET_ERROR",
  //       field: "cpf",
  //       error: "CPF inválido! Por favor, verifique e tente novamente.",
  //     });
  //   } else {
  //     dispatch({ type: "SET_ERROR", field: "cpf", error: "" });
  //   }
  // };

  const validateAddressForm = (): boolean => {
    let isValid = true;

    if (!state.addressFormData.cep) {
      dispatch({
        type: "SET_ERROR",
        field: "cep",
        error: "O CEP deve conter 8 dígitos.",
      });
      isValid = false;
    }

    if (!state.addressFormData.street) {
      dispatch({
        type: "SET_ERROR",
        field: "street",
        error: "Rua é obrigatório.",
      });
      isValid = false;
    }

    if (!state.addressFormData.houseNumber) {
      dispatch({
        type: "SET_ERROR",
        field: "houseNumber",
        error: "Número é obrigatório.",
      });
      isValid = false;
    }

    if (!state.addressFormData.bairro) {
      dispatch({
        type: "SET_ERROR",
        field: "bairro",
        error: "Bairro é obrigatório.",
      });
      isValid = false;
    }

    if (!state.addressFormData.city) {
      dispatch({
        type: "SET_ERROR",
        field: "city",
        error: "Cidade é obrigatória.",
      });
      isValid = false;
    }

    if (!state.addressFormData.state) {
      dispatch({
        type: "SET_ERROR",
        field: "state",
        error: "UF é obrigatório.",
      });
      isValid = false;
    }

    return isValid;
  };

  // Função para verificar se todos os campos obrigatórios do formulário estão preenchidos
  const validateUserForm = (): boolean => {
    let isValid = true;

    if (!state.userFormData.username) {
      dispatch({
        type: "SET_ERROR",
        field: "username",
        error: "Nome é obrigatório.",
      });
      isValid = false;
    }

    if (!state.userFormData.birth) {
      dispatch({
        type: "SET_ERROR",
        field: "birth",
        error: "Nascimento é obrigatório.",
      });
      isValid = false;
    }

    if (!state.userFormData.gender) {
      dispatch({
        type: "SET_ERROR",
        field: "gender",
        error: "Gênero é obrigatório.",
      });
      isValid = false;
    }

    if (!state.userFormData.phone) {
      dispatch({
        type: "SET_ERROR",
        field: "phone",
        error: "Telefone é obrigatório.",
      });
      isValid = false;
    }

    return isValid;
  };

  // Função para enviar dados do formulário
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let formId = e.currentTarget.id;

    if (formId === "user" && validateUserForm()) {
      // Código para enviar os dados de usuário para o banco
      console.log("dados de usuario enviado com sucesso");
      console.log(state.userFormData);
      return;
    }

    if (formId === "address" && validateAddressForm()) {
      // Código para enviar os dados de endereço para o banco
      console.log("dados de endereço enviado com sucesso");
      console.log(state.addressFormData);
      return;
    }
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
      <div className="flex items-center gap-3">
        <UsersRound />
        <h3 className="font-bold text-xl">Dados pessoais</h3>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5" id="user">
        <SettingsSection style="grid grid-cols-6 gap-5">
          <InputGroup
            label="Nome"
            labelFor="username"
            placeholder="Nome do usuário"
            isRequired={false}
            onChange={handleUserInputChange}
            cols="col-span-4"
            error={state.formErrors.username}
          />
          <RestrictInput
            label="CPF"
            value={user.cpf || "999.999.999-99"}
            onChangeClick={() => setModalType("cpf")}
            cols="col-span-2"
          />
          <InputGroup
            label="Nascimento"
            labelFor="birth"
            value={user.birth}
            placeholder={"00/0000"}
            isRequired={false}
            onChange={handleUserInputChange}
            error={state.formErrors.birth}
            cols="col-span-1"
          />
          <InputGroup
            label="Gênero"
            labelFor="gender"
            placeholder="Gênero"
            isRequired={false}
            onChange={handleUserInputChange}
            error={state.formErrors.gender}
            cols="col-span-3"
          />
          <InputGroup
            label="Telefone"
            labelFor="phone"
            value={user.phone}
            placeholder={"(99) 99999-9999"}
            isRequired={false}
            onChange={handleUserInputChange}
            error={state.formErrors.phone}
            cols="col-span-2"
          />
        </SettingsSection>
        <SubmitButton text="Salvar" classname="self-end" />
      </form>

      <SettingsSection>
        <div className="border-b-2 border-border-lightC pb-2 flex items-center gap-3">
          <CreditCard />
          <h4 className="text-lg font-semibold">Informações de Pagamento</h4>
        </div>
        {user.isPremium ? (
          ""
        ) : (
          <p className="text-text-lightSub">
            Parece que você ainda não possui nenhuma assinatura ativa.
            <Link
              href="/premium"
              className="mx-1 text-mainBlue opacity-80 hover:opacity-100"
            >
              <span>Clique aqui</span>
            </Link>
            e conheça as opções.
          </p>
        )}
      </SettingsSection>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5"
        id="address"
      >
        <SettingsSection>
          <div className="border-b-2 border-border-lightC pb-2 flex items-center gap-3">
            <Building2 />
            <h4 className="text-lg font-semibold">Endereço</h4>
          </div>
          <div className="grid grid-cols-7 gap-5">
            <InputGroup
              label="CEP"
              labelFor="cep"
              placeholder="CEP"
              isRequired={false}
              onChange={handleAddressInputChange}
              error={state.formErrors.cep}
              cols="col-span-2"
            />
            <InputGroup
              label="Rua"
              labelFor="street"
              placeholder="Nome da rua"
              isRequired={false}
              onChange={handleAddressInputChange}
              error={state.formErrors.street}
              cols="col-span-5"
            />
            <InputGroup
              label="Número"
              labelFor="houseNumber"
              placeholder="000"
              isRequired={false}
              onChange={handleAddressInputChange}
              error={state.formErrors.houseNumber}
              cols="col-span-2"
            />
            <InputGroup
              label="Complemento"
              labelFor="comp"
              placeholder="Casa, Apto..."
              isRequired={false}
              onChange={handleAddressInputChange}
              cols="col-span-5"
            />
            <InputGroup
              label="Bairro"
              labelFor="bairro"
              placeholder="Bairro"
              isRequired={false}
              onChange={handleAddressInputChange}
              error={state.formErrors.bairro}
              cols="col-span-3"
            />
            <InputGroup
              label="Cidade"
              labelFor="city"
              placeholder="Cidade"
              isRequired={false}
              onChange={handleAddressInputChange}
              error={state.formErrors.city}
              cols="col-span-3"
            />
            <InputGroup
              label="UF"
              labelFor="state"
              placeholder="XX"
              isRequired={false}
              onChange={handleAddressInputChange}
              error={state.formErrors.state}
              cols="col-span-1"
            />
          </div>
        </SettingsSection>
        <SubmitButton text="Salvar" classname="self-end" />
      </form>
      {modalType && (
        <Modal
          title="CPF"
          onClose={handleModalClose}
          onSubmit={() => {
            console.log(cpf);
            if (validarCPF(cpf) && user.password === confirmPassword) {
              // requisição no banco que altera o cpf
            }
          }}
          visible={visible}
          setVisible={setVisible}
        >
          <>
            <InputGroup
              label="CPF"
              labelFor="cpf"
              inputType="text"
              placeholder="Digite seu novo CPF"
              onChange={(e) => setCpf(e.target.value)}
            />
            <InputGroup
              label="Senha"
              labelFor="confirmPassword"
              inputType="password"
              placeholder="Para confirmar, digite sua senha"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </>
        </Modal>
      )}
    </>
  );
}
