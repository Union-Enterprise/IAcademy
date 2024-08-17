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

  return (
    <nav className="h-[72px] *:h-full bg-background-light px-5 py-3 flex justify-between items-center shadow-sm">
      <div className="flex gap-5 items-center">
        <Menu
          onClick={toggleSidebar}
          size={50}
          className="cursor-pointer rounded-md text-text-light p-3 hover:bg-background-lightHover duration-200"
        />
        <Link href="/">
          <Image
            src="/blueLogo.svg"
            alt="Descrição da Imagem"
            width={150}
            height={30}
          />
        </Link>
      </div>
      <Searchbar setShowSearchView={setShowSearchView} />
      <div className="flex gap-3 items-center *:h-full">
        <Link
          href="/login"
          className="px-7 bg-white rounded-md flex items-center text-whiteText bg-opacity-80 border-2 hover:bg-background-lightA border-border-light hover:bg-opacity-100 duration-100"
        >
          <p className="font-semibold">Entrar</p>
        </Link>
        <Link
          href="/register"
          className="px-7 bg-mainBlue text-white bg-opacity-80 hover:bg-opacity-100 rounded-md flex items-center duration-100"
        >
          <p className="font-semibold">Cadastrar-se</p>
        </Link>
        <Link href="/profile">
          <Image
            src="/blueIcon.svg"
            alt="Descrição da Imagem"
            width={48}
            height={48}
            className="rounded-lg bg-blue-200 h-full w-full"
          />
        </Link>
      </div>
      {showSearchView && <SearchView setShowSearchView={setShowSearchView} />}
    </nav>
  );
};

export default Navbar;
