"use client";

import Image from "next/image";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSidebar } from "./context/SidebarContext";
import Link from "next/link";

const Navbar = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <section className="h-20 *:h-full bg-secondaryWhite px-3 py-2 flex justify-between items-center border-b-2 border-b-whiteBorder">
      <div className="flex gap-5 items-center">
        <Image
          src="./menuIcon.svg"
          alt="Descrição da Imagem"
          width={45}
          height={45}
          onClick={toggleSidebar}
          className="cursor-pointer bg-white rounded-md"
        />
        <Link href="/">
          <Image
            src="./blueLogo.svg"
            alt="Descrição da Imagem"
            width={160}
            height={40}
          />
        </Link>
      </div>
      <form className="bg-white rounded-md border-2 py-2 px-4 h-[60px] w-[400px] border-whiteBorder flex gap-2">
        <input
          type="search"
          name=""
          id=""
          placeholder="Busque por conteúdos aqui"
          className="h-full w-full border-none focus:outline-none focus:ring-0 bg-transparent"
        />
        <button
          type="submit"
          className="bg-mainBlue opacity-80 duration-100 h-full hover:opacity-100 px-5 rounded-md"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} className="text-white" />
        </button>
      </form>
      <div className="flex gap-3 items-center">
        <p>Moedas</p>
        <Link
          href="/login"
          className="px-7 bg-white rounded-md py-3 flex items-center text-whiteText bg-opacity-80 border-2 border-whiteBorder hover:bg-opacity-100 duration-100"
        >
          <p className="font-semibold">Entrar</p>
        </Link>
        <Link
          href="/register"
          className="px-7 bg-mainBlue text-white bg-opacity-80 hover:bg-opacity-100 rounded-md py-3 flex items-center duration-100"
        >
          <p className="font-semibold">Cadastrar-se</p>
        </Link>
        {/* <Image
          src="./blueIcon.svg"
          alt="Descrição da Imagem"
          width={60}
          height={60}
          className="border-whiteBorder border-2 rounded-full"
        /> */}
      </div>
    </section>
  );
};

export default Navbar;
