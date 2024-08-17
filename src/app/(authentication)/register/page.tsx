"use client";

import InputGroup from "@/app/ui/components/authenticationForm/InputGroup";
import SubmitButton from "@/app/ui/components/authenticationForm/SubmitButton";
import RedirectLink from "@/app/ui/components/authenticationForm/RedirectLink";
import axios from "axios";
import React, { useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const sendData = () => {
    axios
      .post("http://localhost:5002/signup", {
        name,
        email,
        password,
      })
      .then(function (response) {
        console.log(response.status); // cod da requisição
        console.log(response.data); // mensagem de erro ou de sucesso (e.g usuario ja cadastrado)
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  return (
    <>
      <h1 className="text-[24px] font-bold text-mainBlue">Cadastrar</h1>
      <form
        className="flex flex-col gap-5"
        onSubmit={(e) => {
          e.preventDefault();

          console.log(name, email, password);

          {
            password === confirmPassword
              ? sendData()
              : console.log("senhas não coincidem");
          }
        }}
      >
        <InputGroup
          label="Nome"
          labelFor="name"
          placeholder="Seu Nome"
          onChange={(e) => setName(e.target.value)}
        />
        <InputGroup
          label="E-mail"
          labelFor="email"
          inputType="email"
          placeholder="Seu e-mail"
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputGroup
          label="Senha"
          labelFor="password"
          inputType="password"
          placeholder="Deve ter no mínimo 7 caracteres"
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputGroup
          label="Confirmação"
          labelFor="confirmation"
          inputType="password"
          placeholder="Deve ter no mínimo 7 caracteres"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <SubmitButton text="Cadastrar" />
      </form>
      <RedirectLink
        message="Já tem uma conta?"
        action="Clique aqui para entrar"
        href="/login"
      />
    </>
  );
}
