"use client";

import Link from "next/link";
import { ChevronLeft, KeyRound, X } from "lucide-react";
import SettingsSection from "@/app/ui/components/profile/SettingsSection";
import { useEffect, useState } from "react";
import InputGroup from "@/app/ui/components/authenticationForm/InputGroup";
import { useUser } from "@/app/context/UserContext";
import axios from "axios";
import SubmitButton from "@/app/ui/components/authenticationForm/SubmitButton";
import Modal from "@/app/ui/components/profile/Modal";
import RestrictInput from "@/app/ui/components/profile/RestrictInput";

export default function Access() {
  const [modalType, setModalType] = useState<"email" | "password" | null>(null);
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { user } = useUser();
  const [visible, setVisible] = useState(false);

  const handleModalClose = () => {
    setVisible(false);
    setTimeout(() => {
      setModalType(null);
    }, 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (modalType === "password") {
        if ( password === confirmPassword) {
          sendData();
        }
      } else {
          sendEmail();
      }
    } catch (error) {
      console.error(error);
    } finally {
      handleModalClose();
    }
  };

  const sendData = () => {

    axios
      .put(
        "http://localhost:5002/compare",
        {password},
        { withCredentials: true,
          headers: {
            'oldPass': oldPassword
          }
         },
      )
      .then(function (response) {
        console.log(response.data); // mensagem de sucesso / erro (e.g email ou senha incorreto)
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  
  const sendEmail = () => {
    axios
      .put(
        "http://localhost:5002/update_email",
        {email},
        {withCredentials: true}
      )
      .then(function (response) {
        console.log(response.data); // mensagem de sucesso / erro (e.g email ou senha incorreto)
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <>
      <Link
        href="/profile"
        className="*:text-mainBlue opacity-50 hover:opacity-100 flex gap-2 items-center duration-100 w-fit"
      >
        <ChevronLeft className="w-5 h-5" />
        <p className="text-lg">Voltar</p>
      </Link>
      <div className="flex items-center gap-3">
        <KeyRound />
        <h3 className="font-bold text-xl">Dados de Acesso</h3>
      </div>
      <SettingsSection>
        <div className="flex gap-3">
          <RestrictInput
            label="E-mail"
            value={user.email}
            onChangeClick={() => setModalType("email")}
          />
          <RestrictInput
            label="Senha"
            value={user.password}
            onChangeClick={() => setModalType("password")}
          />
        </div>
      </SettingsSection>
      {modalType && (
        <Modal
          title={modalType === "email" ? "e-mail" : "senha"}
          onClose={handleModalClose}
          onSubmit={handleSubmit}
          visible={visible}
          setVisible={setVisible}
        >
          {modalType === "email" ? (
            <InputGroup
              label="Novo e-mail"
              labelFor="email"
              inputType="email"
              placeholder="Digite seu novo e-mail"
              onChange={(e) => setEmail(e.target.value)}
            />
          ) : (
            <>
              <InputGroup
                label="Senha"
                labelFor="password"
                inputType="password"
                placeholder="Digite sua senha atual"
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <InputGroup
                label="Nova senha"
                labelFor="newPassword"
                inputType="password"
                placeholder="Digite sua nova senha"
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputGroup
                label="Confirme a nova senha"
                labelFor="confirmNewPassword"
                inputType="password"
                placeholder="Confirme sua nova senha"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </>
          )}
        </Modal>
      )}
    </>
  );
}
