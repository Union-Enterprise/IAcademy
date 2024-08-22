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
  const [passwordError, setPasswordError] = useState("");

  const validatePassword = (password: string) => {
    const lower = /[a-z]/.test(password);
    const upper = /[A-Z]/.test(password);
    const number = /\d/.test(password);

    if (password.length <= 7 || !lower || !upper || !number) {
      setPasswordError('Insira uma senha com mais de 8 caracteres, incluindo letras minúsculas, maiúsculas e números');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };

  const sendData = () => {
    axios
      .post(
        "http://localhost:5002/signup",
        {
          name,
          email,
          password,
        },
        { withCredentials: true }
      )
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
      <h1 className="text-2xl font-bold text-mainBlue">Cadastrar</h1>
      <form
        className="flex flex-col gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          const isPasswordValid = validatePassword(password);
          const isPasswordMatch = password === confirmPassword;

          if (isPasswordValid && isPasswordMatch) {
            sendData();
          } else if (!isPasswordMatch) {
            console.log("Senhas não coincidem");
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
        <div className="">
          <InputGroup
            label="Senha"
            labelFor="password"
            inputType="password"
            placeholder="Deve ter no mínimo 8 caracteres"
            onChange={(e) => {
              setPassword(e.target.value);
              validatePassword(e.target.value);
            }}
          />
          {passwordError && (
            <p className="text-red-500 text-sm mt-3">
              {passwordError}
            </p>
          )}
        </div>
        <InputGroup
          label="Confirmação"
          labelFor="confirmation"
          inputType="password"
          placeholder="Deve ter no mínimo 8 caracteres"
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
