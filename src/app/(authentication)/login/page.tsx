import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import InputGroup from "@/app/ui/components/authenticationForm/InputGroup";
import SubmitButton from "@/app/ui/components/authenticationForm/SubmitButton";
import SocialOptions, {
  Option,
} from "@/app/ui/components/authenticationForm/SocialsOptions";
import RedirectLink from "@/app/ui/components/authenticationForm/RedirectLink";

export default function Login() {
  return (
    <>
      <h1 className="text-4xl font-bold text-mainBlue">Entrar</h1>
      <form className="flex flex-col gap-5">
        <InputGroup
          label="E-mail"
          inputType="email"
          placeholder="Digite seu E-mail"
        />
        <InputGroup
          label="Senha"
          inputType="password"
          placeholder="Digite sua senha"
          isRecoveryInput={true}
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
