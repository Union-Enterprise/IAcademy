"use client";

import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import InputGroup from "@/app/ui/components/authenticationForm/InputGroup";
import SubmitButton from "@/app/ui/components/authenticationForm/SubmitButton";
import SocialOptions, {
  Option,
} from "@/app/ui/components/authenticationForm/SocialsOptions";
import RedirectLink from "@/app/ui/components/authenticationForm/RedirectLink";
import axios from "axios";
import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const sendData = () => {
    axios
      .post("http://localhost:5002/login", {
        email,
        password,
      }, { withCredentials: true })
      .then(function (response) {
        console.log(response.status); // cod da requisição
        console.log(response.data); // mensagem de sucesso / erro (e.g email ou senha incorreto)
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <>
      <h1 className="text-[24px] font-bold text-mainBlue">Entrar</h1>
      <form
        className="flex flex-col gap-5"
        onSubmit={(e) => {
          e.preventDefault();

          console.log(name, email, password);

          sendData();
        }}
      >
        <InputGroup
          label="E-mail"
          labelFor="email"
          inputType="email"
          placeholder="Digite seu E-mail"
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputGroup
          label="Senha"
          labelFor="password"
          inputType="password"
          placeholder="Digite sua senha"
          isRecoveryInput={true}
          onChange={(e) => setPassword(e.target.value)}
        />
        <SubmitButton text="Entrar" />
      </form>
      <SocialOptions>
        <Option />
        <Option icon={faGoogle} brandName="Google" />
        <Option icon={faFacebook} brandName="Facebook" />
      </SocialOptions>
      <RedirectLink
        message="Ainda não tem uma conta?"
        action="Clique aqui para se cadastrar"
        href="/register"
      />
    </>
  );
}
