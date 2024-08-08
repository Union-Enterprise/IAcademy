import Link from "next/link";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputGroup from "@/app/ui/components/form/InputGroup";
import SubmitButton from "@/app/ui/components/form/SubmitButton";

export default function Register() {
  return (
    <main className="flex flex-col justify-between h-full">
      <img src="./bluelogo.svg" alt="" className="w-[250px]" />
      <h1 className="text-4xl font-bold text-mainBlue">Cadastrar</h1>
      <form className="flex flex-col gap-5">
        <InputGroup
          label="Nome"
          inputType="text"
          placeholder="Digite seu Nome"
        />
        <InputGroup />
        <InputGroup
          label="Senha"
          inputType="password"
          placeholder="Digite sua senha"
          isConfirm={true}
        />
        <InputGroup
          label="Confirmação"
          inputType="password"
          placeholder="Confirme sua senha"
          isConfirm={true}
        />
        <SubmitButton text="Cadastrar" />
      </form>
      <div className="border-t-2 border-whiteBorder pt-5">
        <Link
          href="/login"
          className="bg-secondaryWhite hover:bg-[#D9D9D9D9] duration-100 p-5 rounded-md relative flex flex-col justify-center"
        >
          <p>Já tem uma conta?</p>
          <p className="text-mainBlue font-bold text-lg">
            Clique aqui para entrar
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

// function Cacilda() {
//   return (
//     <>
//       <main className="flex justify-center items-center min-h-screen bg-gray-100">
//           <form>
//             <div className="mb-6">
//               <label className="block text-gray-700">Confirmar senha</label>
//               <div className="relative">
//                 <input
//                   type="password"
//                   placeholder="Confirme sua senha"
//                   className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
//                 />
//                 <button
//                   type="button"
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
//                 ></button>
//               </div>
//             </div>
//             <p className="text-gray-600 mb-6">
//               Ao se cadastrar, você aceita nossos{" "}
//               <a href="#" className="text-blue-600 hover:underline">
//                 termos de uso
//               </a>{" "}
//               e a nossa{" "}
//               <a href="#" className="text-blue-600 hover:underline">
//                 política de privacidade
//               </a>
//               .
//             </p>
//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
//             >
//               Cadastrar
//             </button>
//           </form>
//           <div className="text-center mt-6">
//             <p>
//               Já possui uma conta?{" "}
//               <Link href="/login" className="text-blue-600 hover:underline">
//                 Clique aqui para entrar
//               </Link>
//             </p>
//           </div>
//         </div>
//       </main>
//     </>
//   );
// }
