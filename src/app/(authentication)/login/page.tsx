import Link from "next/link";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputGroup from "@/app/ui/components/form/InputGroup";
import SubmitButton from "@/app/ui/components/form/SubmitButton";
import SocialOptions from "@/app/ui/components/form/SocialsOptions";

export default function Login() {
  return (
    <main className="flex flex-col justify-between h-full">
      <img src="./bluelogo.svg" alt="" className="w-[250px]" />
      <h1 className="text-4xl font-bold text-mainBlue">Entrar</h1>
      <form className="flex flex-col gap-5">
        <InputGroup />
        <InputGroup
          label="Senha"
          inputType="password"
          placeholder="Digite sua senha"
        />
        <SubmitButton text="Entrar" />
      </form>
      <div className="flex gap-[10px] flex-col items-center">
        <span className="relative w-full text-center flex items-center justify-center">
          <p className="text-whiteText min-w-fit bg-white z-[1] px-4">
            Se preferir
          </p>
          <span className="absolute left-0 bg-whiteBorder h-[2px] w-full" />
        </span>
        <SocialOptions />
        <SocialOptions icon={faGoogle} brandName="Google" />
        <SocialOptions icon={faFacebook} brandName="Facebook" />
      </div>
      <div className="border-t-2 border-whiteBorder pt-5">
        <Link
          href="/register"
          className="bg-secondaryWhite hover:bg-[#D9D9D9D9] duration-100 p-5 rounded-md relative flex flex-col justify-center"
        >
          <p>Ainda não tem uma conta?</p>
          <p className="text-mainBlue font-bold text-lg">
            Clique aqui para se cadastrar
          </p>
          <FontAwesomeIcon
            icon={faChevronRight}
            className="absolute right-5 w-[25px] h-[25px]"
          />
        </Link>
      </div>
    </main>
  );
}
