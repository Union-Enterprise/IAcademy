import InputGroup from "@/app/ui/components/authenticationForm/InputGroup";
import SubmitButton from "@/app/ui/components/authenticationForm/SubmitButton";
import RedirectLink from "@/app/ui/components/authenticationForm/RedirectLink";

export default function Register() {
  return (
    <>
      <h1 className="text-4xl font-bold text-mainBlue">Cadastrar</h1>
      <form className="flex flex-col gap-5">
        <InputGroup label="Nome" placeholder="Digite seu Nome" />
        <InputGroup
          label="E-mail"
          inputType="email"
          placeholder="Digite seu E-mail"
        />
        <InputGroup
          label="Senha"
          inputType="password"
          placeholder="Digite sua senha"
        />
        <InputGroup
          label="Confirmação"
          inputType="password"
          placeholder="Confirme sua senha"
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
