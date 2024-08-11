import InputGroup from "@/app/ui/components/authenticationForm/InputGroup";
import SubmitButton from "@/app/ui/components/authenticationForm/SubmitButton";

export default function Admin() {
  return (
    <div className="h-full gap-16 flex flex-col mt-20">
      <h1 className="text-4xl font-bold text-mainBlue">Login Administrador</h1>
      <form className="flex flex-col gap-5 h-full">
        <InputGroup />
        <InputGroup
          label="Senha"
          inputType="password"
          placeholder="Digite sua senha"
          isRecoveryInput={true}
        />
        <SubmitButton text="Acessar" />
      </form>
    </div>
  );
}
