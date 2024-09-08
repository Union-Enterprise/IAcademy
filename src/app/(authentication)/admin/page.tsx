"use client";

import InputGroup from "@/app/ui/components/authenticationForm/InputGroup";
import SubmitButton from "@/app/ui/components/authenticationForm/SubmitButton";
import axios from "axios";
import { useState } from "react";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";

export default function Admin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const { setAuth } = useUser();

  const sendData = () => {
    setIsSubmitting(true);
    axios
      .post(
        "http://localhost:5002/login_adm",
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      )
      .then(function (response) {
        if (response.status === 200) {
          setAuth(true, response.data);
          setError("");
          router.push("/dashboard");
        } else {
        }
      })
      .catch(function (error) {
        setError("Usuário não autorizado.");
      })

      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <>
      <div className="h-full gap-5 flex flex-col min-w-[300px]">
        <h1 className="text-3xl font-semibold text-mainBlue text-center">
          Acessar IAsystem
        </h1>
        <form
          className="flex flex-col gap-5 h-full"
          onSubmit={(e) => {
            e.preventDefault();
            sendData();
          }}
        >
          <p className="text-red-400">{error}</p>
          <InputGroup
            label="E-mail"
            labelFor="email"
            placeholder="Digite seu E-mail"
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputGroup
            label="Senha"
            labelFor="password"
            inputType="password"
            placeholder="Digite sua senha secreta"
            isRecoveryInput={true}
            onChange={(e) => setPassword(e.target.value)}
          />
          <SubmitButton text="Acessar" loading={isSubmitting} />
        </form>
      </div>
    </>
  );
}
