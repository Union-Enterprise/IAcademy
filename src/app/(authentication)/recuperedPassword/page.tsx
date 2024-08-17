"use client";

import InputGroup from "@/app/ui/components/authenticationForm/InputGroup";
import SubmitButton from "@/app/ui/components/authenticationForm/SubmitButton";
import Link from "next/link";
import axios from "axios";
import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";

export default function Recovery() {
  const [email, setEmail] = useState("");

  const sendData = () => {
    axios
      .post("http://localhost:5002/login", {
        email: email,
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
      <h1 className="text-[24px] font-bold text-mainBlue">
        Esqueci minha senha
      </h1>
      <form
        className="flex flex-col gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          sendData();
        }}
      >
        <InputGroup
          label="Senha antiga"
          labelFor="password"
          inputType="password"
          placeholder="Digite sua senha antiga"
          onChange={(e) => setEmail(e.target.value)}
        />

        <InputGroup
          label="Nova senha"
          labelFor="password"
          inputType="password"
          placeholder="Digite sua nova senha"
          onChange={(e) => setEmail(e.target.value)}
        />

        <Link href="/recuperedPassword" >
          <SubmitButton text="Recuperar minha senha" />
        </Link>
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
