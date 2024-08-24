"use client";

import InputGroup from "@/app/ui/components/authenticationForm/InputGroup";
import SubmitButton from "@/app/ui/components/authenticationForm/SubmitButton";
import RedirectLink from "@/app/ui/components/authenticationForm/RedirectLink";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    passwordError: "",
    confirmPasswordError: "",
  });

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();


  const validatePassword = (password: string, confirmPassword: string) => {
    const lower = /[a-z]/.test(password);
    const upper = /[A-Z]/.test(password);
    const number = /\d/.test(password);

    let passwordError = "";
    let confirmPasswordError = "";

    if (password.length <= 7 || !lower || !upper || !number) {
      passwordError =
        "A senha deve ter no mínimo 8 caracteres, incluindo letras minúsculas, maiúsculas e números.";
    }

    if (password !== confirmPassword) {
      confirmPasswordError = "As senhas não coincidem.";
    }

    setErrors({ passwordError, confirmPasswordError });

    return !passwordError && !confirmPasswordError;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setFormData((prev) => {
      const updatedFormData = { ...prev, [id]: value };

      if (id === "password" || id === "confirmPassword") {
        validatePassword(
          updatedFormData.password,
          updatedFormData.confirmPassword
        );
      }

      return updatedFormData;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validatePassword(formData.password, formData.confirmPassword)) {
      setIsSubmitting(true);
      sendData();
    }
  };

  const sendData = () => {
    const { name, email, password } = formData;
    axios
      .post(
        "http://localhost:5002/signup",
        { name, email, password },
        { withCredentials: true }
      )
      .then((response) => {
        router.push("/profile");
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-mainBlue">Cadastrar</h1>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <InputGroup
          label="Nome"
          labelFor="name"
          placeholder="Seu Nome"
          onChange={handleChange}
        />
        <InputGroup
          label="E-mail"
          labelFor="email"
          inputType="email"
          placeholder="Seu e-mail"
          onChange={handleChange}
        />
        <div>
          <InputGroup
            label="Senha"
            labelFor="password"
            inputType="password"
            placeholder="Deve ter no mínimo 8 caracteres"
            onChange={handleChange}
          />
          {errors.passwordError && (
            <p className="text-red-500 text-sm mt-3">{errors.passwordError}</p>
          )}
        </div>
        <div>
          <InputGroup
            label="Confirmação"
            labelFor="confirmPassword"
            inputType="password"
            placeholder="Confirme sua senha"
            onChange={handleChange}
          />
          {errors.confirmPasswordError && (
            <p className="text-red-500 text-sm mt-3">
              {errors.confirmPasswordError}
            </p>
          )}
        </div>
        <SubmitButton text="Cadastrar" loading={isSubmitting} />
      </form>
      <RedirectLink
        message="Já tem uma conta?"
        action="Clique aqui para entrar"
        href="/login"
      />
    </>
  );
}
