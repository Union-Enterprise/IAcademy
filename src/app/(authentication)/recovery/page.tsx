"use client";

import InputGroup from "@/app/ui/components/authenticationForm/InputGroup";
import SubmitButton from "@/app/ui/components/authenticationForm/SubmitButton";
import Link from "next/link";
import axios from "axios";
import React, { useState, useRef } from "react";
import { ArrowLeft } from "lucide-react";

export default function Recovery() {
  const [email, setEmail] = useState("kleberbanban@gmail.com");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isCodeValid, setIsCodeValid] = useState(false);

  return (
    <>
      <h1 className="text-2xl font-bold text-mainBlue">Esqueci minha senha</h1>
      <form
        className="flex flex-col gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          console.log(code);

          if (!isEmailValid) {
            // escrever código pra comparar "email" com o email no bd e definir "isEmailValid"
            console.log("Não passa daqui pois nao informou o email ainda");
            return;
          }

          if (!isCodeValid) {
            // escrever código pra comparar "code" com o código enviado no email do caba
            console.log("Não passa daqui pois nao informou o email ainda");
            return;
          }

          // se email e code validos então redefinir senha
          const sendData = () => {};
          password !== "" && password === confirmPassword && sendData();
        }}
      >
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
                <InputGroup
                  label="Nova senha"
                  labelFor="password"
                  inputType="password"
                  placeholder="Precisa ter no mínimo 7 caracteres"
                  onChange={(e) => setPassword(e.target.value)}
                />

                <InputGroup
                  label="Confirme sua nova senha"
                  labelFor="confirm"
                  inputType="password"
                  placeholder="Precisa ter no mínimo 7 caracteres"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </>
            ) : (
              <div className="grid grid-cols-6 *:col-span-1 gap-3 h-[80px]">
                <CodeInput setCode={setCode} />
                <CodeInput setCode={setCode} />
                <CodeInput setCode={setCode} />
                <CodeInput setCode={setCode} />
                <CodeInput setCode={setCode} />
                <CodeInput setCode={setCode} />
              </div>
            )}
          </>
        ) : (
          <InputGroup
            label="E-mail"
            labelFor="email"
            inputType="email"
            placeholder="Digite o e-mail registrado"
            onChange={(e) => setEmail(e.target.value)}
          />
        )}

        <SubmitButton
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

function CodeInput({
  setCode,
}: {
  setCode: React.Dispatch<React.SetStateAction<string>>;
}) {
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
