"use client";

import Image from "next/image";
import { useSidebar } from "./context/SidebarContext";
import Link from "next/link";
import { Menu, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Searchbar, { SearchView } from "./Searchbar";

const Navbar = () => {
  const { toggleSidebar } = useSidebar();

  const [showSearchView, setShowSearchView] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <nav className="h-20 bg-background-light px-3 py-2 flex justify-between items-center border-b-2 border-b-border-light">
      <div className="flex gap-5 items-center">
        <Menu
          onClick={toggleSidebar}
          className="cursor-pointer border-2 border-border-light rounded-md text-mainBlue w-[65px] h-[45px] p-2 hover:bg-background-lightA duration-200"
        />
        <Link href="/">
          <Image
            src="/blueLogo.svg"
            alt="Descrição da Imagem"
            width={160}
            height={40}
          />
        </Link>
      </div>
      <Searchbar setShowSearchView={setShowSearchView} inputRef={inputRef} />
      <div className="flex gap-3 items-center">
        <Link
          href="/login"
          className="px-7 bg-white rounded-md py-3 flex items-center text-whiteText bg-opacity-80 border-2 hover:bg-background-lightA border-border-light hover:bg-opacity-100 duration-100"
        >
          <p className="font-semibold">Entrar</p>
        </Link>
        <Link
          href="/register"
          className="px-7 bg-mainBlue text-white bg-opacity-80 hover:bg-opacity-100 rounded-md py-3 flex items-center duration-100"
        >
          <p className="font-semibold">Cadastrar-se</p>
        </Link>
        <Link href="/profile">
          <Image
            src="/blueIcon.svg"
            alt="Descrição da Imagem"
            width={60}
            height={60}
            className="border-whiteBorder border-2 rounded-[20px] bg-blue-200"
          />
        </Link>
      </div>
      {showSearchView && (
        <SearchView setShowSearchView={setShowSearchView} inputRef={inputRef} />
      )}
    </nav>
  );
};

export default Navbar;
