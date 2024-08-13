import InputGroup from "@/app/ui/components/authenticationForm/InputGroup";
import SubmitButton from "@/app/ui/components/authenticationForm/SubmitButton";
import axios from "axios";
import { useState } from "react";

export default function Admin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const sendData = () => {
    axios
      .post("http://localhost:5002/login", {
        email: email,
        password: password,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <div className="h-full gap-16 flex flex-col mt-20">
      <h1 className="text-4xl font-bold text-mainBlue">Login Administrador</h1>
      <form
        className="flex flex-col gap-5 h-full"
        onSubmit={(e) => {
          e.preventDefault();
          sendData();
        }}
      >
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
          placeholder="Digite sua senha"
          isRecoveryInput={true}
          onChange={(e) => setPassword(e.target.value)}
        />
        <SubmitButton text="Acessar" />
      </form>
    </div>
  );
}
