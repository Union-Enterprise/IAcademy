"use client";

import Image from "next/image";
import { useSidebar } from "./context/SidebarContext";
import Link from "next/link";
import { Menu, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const { toggleSidebar } = useSidebar();
  const [showSearchView, setShowSearchView] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <nav className="h-20 *:h-full bg-secondaryWhite px-3 py-2 flex justify-between items-center border-b-2 border-b-whiteBorder">
      <div className="flex gap-5 items-center">
        <Menu
          onClick={toggleSidebar}
          className="cursor-pointer bg-white rounded-md text-mainBlue w-[45px] h-[45px] p-2"
        />
        <Link href="/">
          <Image
            src="/blueLogo.svg"
            alt="Descrição da Imagem"
            width={160}
            height={40}
            priority
            className="w-[160px] h-[40px]"
          />
        </Link>
      </div>
      <SearchBar setShowSearchView={setShowSearchView} inputRef={inputRef} />
      <div className="flex gap-3 items-center">
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
        <Link href="/profile">
          <Image
            src="/blueIcon.svg"
            alt="Descrição da Imagem"
            width={60}
            height={60}
            className="border-whiteBorder border-2 rounded-[20px] bg-blue-200"
            priority
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

interface SearchProps {
  setShowSearchView: React.Dispatch<React.SetStateAction<boolean>>;
  inputRef: React.RefObject<HTMLInputElement>;
}

function SearchBar({ setShowSearchView, inputRef }: SearchProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "/") {
        event.preventDefault();
        setShowSearchView(true);
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setShowSearchView, inputRef]);

  return (
    <button
      className="w-[400px] px-4 py-2 h-[50px] border-2 border-whiteBorder rounded-md duration-200 cursor-pointer relative flex items-center hover:border-mainBlue group"
      onClick={() => setShowSearchView(true)}
    >
      <p className="text-gray-400">Pesquise aqui</p>
      <span className="absolute right-2 opacity-80 bg-mainBlue pointer-events-none h-fit py-1 px-5 text-sm rounded-md flex items-center justify-center text-white font-bold duration-200">
        /
      </span>
    </button>
  );
}

function SearchView({ setShowSearchView, inputRef }: SearchProps) {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowSearchView(false);
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [setShowSearchView]);

  return (
    <div className="bg-black bg-opacity-60 absolute m-auto w-full h-full top-0 left-0 z-20 flex items-center justify-center">
      <div className="w-[600px] flex flex-col overflow-hidden rounded-md">
        <div className="flex items-center relative">
          <input
            type="search"
            ref={inputRef}
            placeholder="Pesquise aqui"
            className="w-full px-5 py-2 h-[60px] pr-24 border-2 rounded-md rounded-b-none focus:outline-none focus:border-mainBlue focus:ring-transparent duration-100"
          />
          <span
            className="cursor-pointer text-sm font-bold text-white rounded-md px-4 py-1 absolute right-5 bg-mainBlue h-fit"
            onClick={() => setShowSearchView(false)}
          >
            esc
          </span>
        </div>
        <div className="*:px-5 bg-[rgba(253,253,253)] max-h-[650px] overflow-auto">
          <p className="px-5 mt-6 mb-2 text-lg font-bold text-whiteText">
            Trilhas
          </p>
          <SearchResult />
          <SearchResult />
          <SearchResult />

          <p className="px-5 mt-6 mb-2 text-lg font-bold text-whiteText">
            Assuntos
          </p>
          <SearchResult />
          <SearchResult />
          <SearchResult />
          <SearchResult />
        </div>
      </div>
    </div>
  );
}

function SearchResult() {
  return (
    <div className="border-t-2 border-whiteBorder py-5 flex flex-col justify-center gap-2 relative hover:bg-mainBlue duration-200 *:duration-200 group cursor-pointer">
      <p className="px-4 py-1 bg-whiteBorder border-2 border-transparent text-mainBlue rounded-md text-sm font-semibold w-fit group-hover:border-whiteBorder group-hover:bg-transparent group-hover:text-whiteBorder">
        Geometria
      </p>
      <p className="text-gray-500 group-hover:text-white">
        Algo_referente_ao_que_está_sendo_pesquisado
      </p>
      <ChevronRight className="absolute right-5 text-gray-500 group-hover:text-white" />
    </div>
  );
}
