"use client";

import InputGroup from "@/app/ui/components/authenticationForm/InputGroup";
import SubmitButton from "@/app/ui/components/authenticationForm/SubmitButton";
import Link from "next/link";
import axios from "axios";
import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";

export default function Recovery() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);

  // escrever código pra comparar com o email no bd
  const sendData = () => {
    axios
      .post("http://localhost:5002/login", {
        email,
      })
      .then(function (response) {
        console.log(response.status);
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-mainBlue">Esqueci minha senha</h1>
      <form
        className="flex flex-col gap-5"
        onSubmit={(e) => {
          e.preventDefault();

          // verificar no banco se o email existe
          setIsEmailValid(email === "joaoKleber@gmail.com");

          // se o email for válido e a senha também (7 caracter, simbolo, etc) então redefinir a senha
          {
            isEmailValid &&
              password !== "" &&
              password === confirmPassword &&
              sendData();
          }
        }}
      >
        {isEmailValid ? (
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
          <InputGroup
            label="E-mail"
            labelFor="email"
            inputType="email"
            placeholder="Digite o e-mail registrado"
            onChange={(e) => setEmail(e.target.value)}
          />
        )}

        <SubmitButton
          text={isEmailValid ? "Redefinir senha" : "Recuperar minha senha"}
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
