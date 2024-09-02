"use client"

import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import InputGroup from "@/app/ui/components/authenticationForm/InputGroup";
import SubmitButton from "@/app/ui/components/authenticationForm/SubmitButton";
import SocialOptions, { Option } from "@/app/ui/components/authenticationForm/SocialsOptions";
import RedirectLink from "@/app/ui/components/authenticationForm/RedirectLink";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const { setAuth } = useUser();

  const sendData = () => {
    axios
      .post(
        "http://localhost:5002/login",
        { email, password },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.status === 200) {
          setAuth(true, response.data);
          router.push("/profile");
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          setErrorMessage("E-mail ou senha incorretos, tente novamente.");
        }
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const loginWithGoogle = () => {
    window.location.href = "http://localhost:5002/google"; // URL do backend para o Google login
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-mainBlue">Entrar</h1>
      <form
        className="flex flex-col gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          setIsSubmitting(true);
          sendData();
        }}
      >
        <div>
          {errorMessage && (
            <p className="text-red-500 text-sm mb-2">{errorMessage}</p>
          )}
          <InputGroup
            label="E-mail"
            labelFor="email"
            inputType="email"
            placeholder="Digite seu e-mail"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <InputGroup
          label="Senha"
          labelFor="password"
          inputType="password"
          placeholder="Digite sua senha"
          isRecoveryInput={true}
          onChange={(e) => setPassword(e.target.value)}
        />
        <SubmitButton text="Entrar" loading={isSubmitting} />
      </form>
      <SocialOptions>
        <Option onClick={() => {}} />
        <Option icon={faGoogle} brandName="Google" onClick={loginWithGoogle} />
        <Option icon={faFacebook} brandName="Facebook" onClick={() => {}} />
      </SocialOptions>
      <RedirectLink
        message="Ainda não tem uma conta?"
        action="Clique aqui para se cadastrar"
        href="/register"
      />
    </>
  );
}
