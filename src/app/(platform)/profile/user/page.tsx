"use client";

import Link from "next/link";
import { ChevronLeft, UsersRound, CreditCard, Building2 } from "lucide-react";
import SettingsSection from "@/app/ui/components/profile/SettingsSection";
import { useReducer, useState } from "react";
import InputGroup, {
  Select,
} from "@/app/ui/components/authenticationForm/InputGroup";
import SubmitButton from "@/app/ui/components/authenticationForm/SubmitButton";
import { useUser } from "@/app/context/UserContext";
import RestrictInput from "@/app/ui/components/profile/RestrictInput";
import Modal from "@/app/ui/components/profile/Modal";
import axios from "axios";
import { cpf } from "cpf-cnpj-validator";
import { useToast } from "@/app/context/ToastContext";

const formatPhone = (value: string) => {
  const cleanValue = value.replace(/\D/g, "");

  if (cleanValue.length <= 2) {
    return cleanValue;
  }

  if (cleanValue.length <= 7) {
    return cleanValue.replace(/^(\d{2})(\d{0,5})(\d{0,4})$/, "($1) $2");
  }

  return cleanValue.replace(/^(\d{2})(\d{0,5})(\d{0,4})$/, "($1) $2-$3");
};

const formatCep = (value: string) => {
  const cleanValue = value.replace(/\D/g, "");

  if (cleanValue.length <= 5) {
    return cleanValue;
  }

  return cleanValue.replace(/^(\d{5})(\d{0,3})$/, "$1-$2");
};
const initialState = {
  userFormData: {
    username: "",
    birth: "",
    genero: "",
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
    genero: "",
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

const fetchAddress = async (cep: string) => {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json`);
    if (response.data.erro) {
      return null;
    }
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar o endereço:", error);
    return null;
  }
};

export default function User() {
  const { user } = useUser();
  const [modalType, setModalType] = useState<"cpf" | null>(null);
  const [visible, setVisible] = useState(false);
  const [userCpf, setUserCpf] = useState(user.cpf || "");
  const [confirmPassword, setConfirmPassword] = useState("");
  const addToast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleModalClose = () => {
    setVisible(false);
    setTimeout(() => {
      setModalType(null);
    }, 300);
  };
  const [state, dispatch] = useReducer(formReducer, initialState);

  // Função para mostrar ou esconder o erro de acordo com a mudança nos inputs
  const handleUserInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    if (id === "birth") {
      dispatch({ type: "SET_USER_FIELD", field: id, value });
      return;
    }

    let formattedValue = value;

    if (id === "phone") {
      formattedValue = formatPhone(value);
    }

    dispatch({ type: "SET_USER_FIELD", field: id, value: formattedValue });
  };

  const handleAddressInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    let formattedValue = value;

    if (id === "cep") {
      formattedValue = formatCep(value);
    }

    dispatch({ type: "SET_ADDRESS_FIELD", field: id, value: formattedValue });
  };

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

    return isValid;
  };

  // Função para enviar dados do formulário
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);

    let formId = e.currentTarget.id;

    if (formId === "user" && validateUserForm()) {
      addToast("Dados de usuário enviados com sucesso!", "success");
      sendProfileData();
      setIsSubmitting(false);
      return;
    }

    if (formId === "address" && validateAddressForm()) {
      addToast("Dados de endereço enviados com sucesso!", "success");
      sendAddress();
      handleCepBlur();
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
  };

  const handleCepBlur = async () => {
    const cep = state.addressFormData.cep;
    if (cep.length === 9) {
      const addressData = await fetchAddress(cep);
      if (addressData) {
        dispatch({
          type: "SET_ADDRESS_FIELD",
          field: "street",
          value: addressData.logradouro,
        });
        dispatch({
          type: "SET_ADDRESS_FIELD",
          field: "bairro",
          value: addressData.bairro,
        });
        dispatch({
          type: "SET_ADDRESS_FIELD",
          field: "city",
          value: addressData.localidade,
        });
        dispatch({
          type: "SET_ADDRESS_FIELD",
          field: "state",
          value: addressData.uf,
        });
        return;
      }
      dispatch({
        type: "SET_ERROR",
        field: "cep",
        error: "CEP não encontrado.",
      });
    } else {
      dispatch({
        type: "SET_ERROR",
        field: "cep",
        error: "O CEP deve conter 8 dígitos.",
      });
    }
  };

  const sendProfileData = () => {
    axios
      .put(
        "http://localhost:5002/update_profile",
        {
          name: state.userFormData.username,
          nascimento: state.userFormData.birth,
          genero: state.userFormData.genero,
          telefone: state.userFormData.phone,
        },
        { withCredentials: true }
      )
      .then(function (response) {})
      .catch(function (error) {
        console.error(error);
      });
  };

  const sendAddress = () => {
    axios
      .put(
        "http://localhost:5002/update_address",
        {
          cep: state.addressFormData.cep,
          rua: state.addressFormData.street,
          numero: state.addressFormData.houseNumber,
          complemento: state.addressFormData.comp,
          bairro: state.addressFormData.bairro,
          cidade: state.addressFormData.city,
          estado: state.addressFormData.state,
        },
        { withCredentials: true }
      )
      .then(function (response) {})
      .catch(function (error) {
        console.error(error);
      });
  };

  const sendCPF = () => {
    axios
      .put(
        "http://localhost:5002/update_cpf",
        {
          cpf: userCpf,
        },
        { withCredentials: true }
      )
      .then(function (response) {})
      .catch(function (error) {
        console.error(error);
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
            inputType="date"
            value={state.userFormData.birth}
            isRequired={false}
            onChange={handleUserInputChange}
            error={state.formErrors.birth}
            cols="col-span-2"
          />
          <Select
            label="Gênero"
            labelFor="genero"
            options={[
              { value: "", label: "Selecione uma opção" },
              { value: "masculino", label: "Masculino" },
              { value: "feminino", label: "Feminino" },
              { value: "nb", label: "Não-binário" },
              { value: "outro", label: "Outro" },
            ]}
            isRequired={false}
            value={state.userFormData.genero}
            onChange={handleUserInputChange}
            error={state.formErrors.genero}
            cols="col-span-2"
          />
          <InputGroup
            label="Telefone"
            labelFor="phone"
            value={state.userFormData.phone}
            placeholder={"(99) 99999-9999"}
            maxLength={15}
            isRequired={false}
            onChange={handleUserInputChange}
            error={state.formErrors.phone}
            cols="col-span-3 ml-24"
          />
        </SettingsSection>
        <SubmitButton
          text="Salvar"
          classname="self-end"
          loading={isSubmitting}
        />
      </form>

      <SettingsSection>
        <div className="border-b-2 border-border-lightC pb-2 flex items-center gap-3">
          <CreditCard />
          <h4 className="text-lg font-semibold">Informações de Pagamento</h4>
        </div>
        {user.is_premium ? (
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
              value={state.addressFormData.cep}
              maxLength={9}
              isRequired={false}
              onChange={handleAddressInputChange}
              onBlur={handleCepBlur}
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
              value={state.addressFormData.street}
              cols="col-span-5"
            />
            <InputGroup
              label="Número"
              labelFor="houseNumber"
              placeholder="0000"
              maxLength={4}
              isRequired={false}
              onChange={handleAddressInputChange}
              error={state.formErrors.houseNumber}
              value={state.addressFormData.houseNumber}
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
              value={state.addressFormData.bairro}
              cols="col-span-3"
            />
            <InputGroup
              label="Cidade"
              labelFor="city"
              placeholder="Cidade"
              isRequired={false}
              onChange={handleAddressInputChange}
              error={state.formErrors.city}
              value={state.addressFormData.city}
              cols="col-span-3"
            />
            <InputGroup
              label="UF"
              labelFor="state"
              placeholder="XX"
              maxLength={2}
              isRequired={false}
              onChange={handleAddressInputChange}
              error={state.formErrors.state}
              value={state.addressFormData.state}
              cols="col-span-1"
            />
          </div>
        </SettingsSection>
        <SubmitButton
          text="Salvar"
          classname="self-end"
          loading={isSubmitting}
        />
      </form>
      {modalType && (
        <Modal
          isDisabled={!cpf.isValid(userCpf)}
          title="CPF"
          onClose={handleModalClose}
          visible={visible}
          setVisible={setVisible}
        >
          <form
            className="flex flex-col gap-5"
            onSubmit={(e) => {
              e.preventDefault();
              // fazer comparação da "confirmPassword" com a senha no banco de dados
              if (cpf.isValid(userCpf) && confirmPassword) {
                //requisição que altera o cpf
                sendCPF();
                handleModalClose();
              }
            }}
          >
            <InputGroup
              label="CPF"
              labelFor="cpf"
              inputType="text"
              placeholder="Digite seu novo CPF"
              maxLength={11}
              value={cpf.format(userCpf)}
              onChange={(e) => {
                setUserCpf(e.target.value);
              }}
              error={
                userCpf !== "" && !cpf.isValid(userCpf) ? "CPF inválido" : ""
              }
            />
            <InputGroup
              label="Senha"
              labelFor="confirmPassword"
              inputType="password"
              placeholder="Para confirmar, digite sua senha"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <SubmitButton text="Alterar" />
          </form>
        </Modal>
      )}
    </>
  );
}
