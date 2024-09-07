"use client";

import Link from "next/link";
import { ChevronLeft, KeyRound, X } from "lucide-react";
import SettingsSection from "@/app/ui/components/profile/SettingsSection";
import { useEffect, useState } from "react";
import InputGroup from "@/app/ui/components/authenticationForm/InputGroup";
import { useUser } from "@/app/context/UserContext";
import axios from "axios";
import Modal from "@/app/ui/components/profile/Modal";
import RestrictInput from "@/app/ui/components/profile/RestrictInput";
import SubmitButton from "@/app/ui/components/authenticationForm/SubmitButton";

export default function Access() {
  const [modalType, setModalType] = useState<
    "email" | "password" | "blocked" | null
  >(null);
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { user, setAuth } = useUser();
  const [visible, setVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errors, setErrors] = useState({
    emailError: "",
    oldPasswordError: "",
    passwordError: "",
    confirmPasswordError: "",
  });

  useEffect(() => {
    validatePassword(password, confirmPassword);
  }, [password, confirmPassword]);

  const validatePassword = (password: string, confirmPassword: string) => {
    const lower = /[a-z]/.test(password);
    const upper = /[A-Z]/.test(password);
    const number = /\d/.test(password);

    let passwordError = "";
    let confirmPasswordError = "";

    if (password.length > 0) {
      if (password.length <= 8 || !lower || !upper || !number) {
        passwordError =
          "A senha deve ter no mínimo 8 caracteres, incluindo letras minúsculas, maiúsculas e números.";
      }
    }
    if (password !== confirmPassword) {
      confirmPasswordError = "As senhas não coincidem.";
    }

    setErrors((prev) => ({ ...prev, passwordError, confirmPasswordError }));

    return !passwordError && !confirmPasswordError;
  };

  const handleModalClose = () => {
    setVisible(false);
    setTimeout(() => {
      setModalType(null);
    }, 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (modalType === "password") {
        if (validatePassword(password, confirmPassword)) {
          sendPassword();
        }
      } else if (modalType === "email") {
        sendEmail();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const sendPassword = () => {
    axios
      .put(
        "http://localhost:5002/compare",
        { password },
        {
          withCredentials: true,
          headers: {
            oldPass: oldPassword,
          },
        }
      )
      .then(function (response) {
        if (response.data.message !== "Insira uma senha correta.") {
          setErrors((prev) => ({ ...prev, oldPasswordError: "" }));
          handleModalClose();
        } else {
          setErrors((prev) => ({
            ...prev,
            oldPasswordError: "Senha incorreta. Tente novamente.",
          }));
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const sendEmail = () => {
    axios
      .put(
        "http://localhost:5002/update_email",
        { email },
        { withCredentials: true }
      )
      .then(function (response) {
        if (response.data[0] === "Esse email já está em uso") {
          setErrors((prev) => ({
            ...prev,
            emailError: "E-mail já em uso.",
          }));
        } else {
          setErrors((prev) => ({
            ...prev,
            emailError: "",
          }));
          const updatedUser = { ...user, email: response.data.user.email };
          setAuth(true, updatedUser);
          handleModalClose();
        }
      })
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
        <KeyRound />
        <h3 className="font-bold text-xl">Dados de Acesso</h3>
      </div>
      <SettingsSection>
        <div className="flex gap-3">
          <RestrictInput
            label="E-mail"
            value={user.email}
            onChangeClick={() =>
              setModalType(user.googleId !== "" ? "blocked" : "email")
            }
          />
          <RestrictInput
            label="Senha"
            value={"*******"}
            onChangeClick={() => setModalType("password")}
          />
        </div>
      </SettingsSection>
      {modalType && (
        <Modal
          title={
            modalType === "email" || modalType === "blocked"
              ? "Alterar e-mail"
              : "Alterar senha"
          }
          onClose={handleModalClose}
          visible={visible}
          setVisible={setVisible}
          loading={isSubmitting}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {modalType === "email" ? (
              <div>
                <InputGroup
                  label="Novo e-mail"
                  labelFor="email"
                  inputType="email"
                  placeholder="Digite seu novo e-mail"
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.emailError && email !== "" && (
                  <p className="text-red-500 text-sm mt-3">
                    {errors.emailError}
                  </p>
                )}
              </div>
            ) : modalType === "password" ? (
              <>
                <div>
                  <InputGroup
                    label="Senha"
                    labelFor="oldPassword"
                    inputType="password"
                    placeholder="Digite sua senha atual"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                  {errors.oldPasswordError && (
                    <p className="text-red-500 text-sm mt-3">
                      {errors.oldPasswordError}
                    </p>
                  )}
                </div>
                <div>
                  <InputGroup
                    label="Nova senha"
                    labelFor="newPassword"
                    inputType="password"
                    placeholder="Digite sua nova senha"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors.passwordError && (
                    <p className="text-red-500 text-sm mt-3">
                      {errors.passwordError}
                    </p>
                  )}
                </div>
                <div>
                  <InputGroup
                    label="Confirme a nova senha"
                    labelFor="confirmNewPassword"
                    inputType="password"
                    placeholder="Confirme sua nova senha"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  {errors.confirmPasswordError && (
                    <p className="text-red-500 text-sm mt-3">
                      {errors.confirmPasswordError}
                    </p>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Trocar por um alert futuramente */}
                <p>
                  Parece que sua conta foi registrada via Google, Apple ou
                  Facebook e isso impossibilita a alteração do seu e-mail.
                </p>
              </>
            )}
            {!user.googleId && (
              <SubmitButton
                text={
                  modalType === "email" ? "Alterar e-mail" : "Alterar senha"
                }
                classname="w-full"
                isDisabled={isSubmitting}
                loading={isSubmitting}
              />
            )}
          </form>
        </Modal>
      )}
    </>
  );
}
