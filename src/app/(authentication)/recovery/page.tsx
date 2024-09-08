"use client";

import InputGroup from "@/app/ui/components/authenticationForm/InputGroup";
import SubmitButton from "@/app/ui/components/authenticationForm/SubmitButton";
import Link from "next/link";
import axios from "axios";
import React, { useState, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Recovery() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [tokenRequested, setTokenRequested] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const [errors, setErrors] = useState({
    emailError: "",
    codeError: "",
    passwordError: "",
    confirmPasswordError: "",
  });

  const validatePassword = (password: string, confirmPassword: string) => {
    const lower = /[a-z]/.test(password);
    const upper = /[A-Z]/.test(password);
    const number = /\d/.test(password);

    let passwordError = "";
    let confirmPasswordError = "";

    if (password.length <= 8 || !lower || !upper || !number) {
      passwordError =
        "A senha deve ter no mínimo 8 caracteres, incluindo letras minúsculas, maiúsculas e números.";
    }

    if (password !== confirmPassword) {
      confirmPasswordError = "As senhas não coincidem.";
    }

    setErrors((prev) => ({
      ...prev,
      passwordError,
      confirmPasswordError,
    }));

    return !passwordError && !confirmPasswordError;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    if (id === "password") {
      setPassword(value);
    } else if (id === "confirm") {
      setConfirmPassword(value);
    }

    validatePassword(password, confirmPassword);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!tokenRequested) {
      axios
        .post("http://localhost:5002/forgot_password", { email })
        .then(() => {
          setIsEmailValid(true);
          setTokenRequested(true);
        })
        .catch((err) => {
          setIsEmailValid(false);
          setErrors((prev) => ({
            ...prev,
            emailError:
              "E-mail não encontrado. Verifique se ele realmente existe e tente novamente.",
          }));
          return;
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    }

    axios
      .post("http://localhost:5002/verify_token", { email, token: code })
      .then(() => {
        setIsCodeValid(true);
      })
      .catch((err) => {
        setIsCodeValid(false);
        setErrors((prev) => ({
          ...prev,
          codeError:
            "Código inválido. Verifique se você digitou corretamente e tente novamente.",
        }));
        return;
      })
      .finally(() => {
        setIsSubmitting(false);
      });

    if (validatePassword(password, confirmPassword)) {
      axios
        .post("http://localhost:5002/reset_password", {
          email,
          token: code,
          password,
        })
        .then((data) => {
          if (data.status == 200) {
            router.push("/login");
          } else {
            // erro ao trocar a senha
            // Não consegui entender a diferença desse erro
            console.log(data);
          }
        })
        .catch((err) => {
          // pra esse erro
          console.log(err);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-mainBlue">Esqueci minha senha</h1>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        {isEmailValid ? (
          <>
            <h2 className="text-title-light text-xl font-bold">
              Verifique seu endereço de email
            </h2>
            <p className="text-text-lightSub">
              Nós enviamos um email para
              <span className="mx-1 font-semibold text-text-light">
                {email}
              </span>
              contendo um código de 6 dígitos. Digite o código abaixo para
              prosseguir com a recuperação da sua senha.
            </p>
            {isCodeValid ? (
              <>
                <div>
                  <InputGroup
                    label="Nova senha"
                    labelFor="password"
                    inputType="password"
                    placeholder="Precisa ter no mínimo 7 caracteres"
                    onChange={handleChange}
                  />
                  {errors.passwordError && (
                    <p className="text-red-500 text-sm mt-3">
                      {errors.passwordError}
                    </p>
                  )}
                </div>
                <div>
                  <InputGroup
                    label="Confirme sua nova senha"
                    labelFor="confirm"
                    inputType="password"
                    placeholder="Precisa ter no mínimo 7 caracteres"
                    onChange={handleChange}
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
                <div className="grid grid-cols-6 *:col-span-1 gap-3 h-[80px]">
                  <CodeInput setCode={setCode} />
                  <CodeInput setCode={setCode} />
                  <CodeInput setCode={setCode} />
                  <CodeInput setCode={setCode} />
                  <CodeInput setCode={setCode} />
                  <CodeInput setCode={setCode} />
                </div>
                {errors.codeError && code !== "" && (
                  <p className="text-red-500 text-sm mt-3">
                    {errors.codeError}
                  </p>
                )}
              </>
            )}
          </>
        ) : (
          <div>
            <InputGroup
              label="E-mail"
              labelFor="email"
              inputType="email"
              placeholder="Digite o e-mail registrado"
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.emailError && (
              <p className="text-red-500 text-sm mt-3">{errors.emailError}</p>
            )}
          </div>
        )}

        <SubmitButton
          loading={isSubmitting}
          text={
            isEmailValid
              ? isCodeValid
                ? "Redefinir senha"
                : "Verificar"
              : "Prosseguir"
          }
        />

        <Link
          href="/login"
          className="flex gap-5 items-center justify-center p-[10px] *:text-text-lightSub group *:duration-100"
        >
          <ArrowLeft className="group-hover:text-text-light group-hover:-translate-x-2" />
          <p className="group-hover:text-text-light">Voltar para o login</p>
        </Link>
      </form>
    </>
  );
}

function CodeInput({ setCode }: any) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key, target } = e;
    const inputElement = target as HTMLInputElement;
    const previousSibling = inputElement.previousElementSibling;

    if (
      key === "Backspace" &&
      inputElement.value === "" &&
      previousSibling instanceof HTMLInputElement
    ) {
      previousSibling.focus();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, nextSibling } = e.target;

    if (value.length === 1 && nextSibling instanceof HTMLInputElement) {
      nextSibling.focus();
    }

    const parentElement = e.target.parentElement;
    if (parentElement) {
      const inputs = Array.from(
        parentElement.querySelectorAll<HTMLInputElement>("input")
      );
      const codeValue = inputs.map((input) => input.value).join("");
      setCode(codeValue);
    }
  };

  return (
    <input
      type="text"
      ref={inputRef}
      maxLength={1}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
      className="text-center border-2 border-border-light text-text-light outline-none duration-100 focus:border-mainBlue rounded-lg text-4xl font-bold"
    />
  );
}
