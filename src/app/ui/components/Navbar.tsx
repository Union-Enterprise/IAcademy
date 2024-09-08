"use client";

import Image from "next/image";
import { useSidebar } from "../../context/SidebarContext";
import Link from "next/link";
import { Menu, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Searchbar, { SearchView } from "./Searchbar";
import { useUser } from "@/app/context/UserContext";
import Skeleton from "./Skeleton";

const Navbar = () => {
  const { toggleSidebar } = useSidebar();
  const [showSearchView, setShowSearchView] = useState(false);
  const { user, isAuthenticated, loading } = useUser();

  if (loading) {
    return (
      <nav className="h-20 bg-background-light px-5 grid grid-cols-3 items-center shadow-sm">
        <div className="flex gap-5 items-center">
          <Skeleton className="h-[45px] w-[250px]" />
        </div>
        <Skeleton className="h-[45px] w-[450px]" />
        <div className="flex gap-3 items-center justify-end">
          <Skeleton className="h-[45px] w-[250px]" />
        </div>
      </nav>
    );
  }

  return (
    <nav className="h-20 w-full bg-background-light px-5 grid grid-cols-3 items-center shadow-sm">
      <div className="flex gap-5 items-center">
        <Menu
          onClick={toggleSidebar}
          size={50}
          className="cursor-pointer rounded-md text-text-light p-3 hover:bg-background-lightHover duration-200"
        />
        <Link href="/">
          <Image
            src="/blueLogo.svg"
            alt="Logo IAcademy"
            width={150}
            height={30}
          />
        </Link>
      </div>
      <Searchbar setShowSearchView={setShowSearchView} />
      <div className="flex gap-3 items-center justify-end">
        {isAuthenticated ? (
          <Link
            href="/profile"
            className="flex justify-center items-center bg-mainBlue opacity-80 hover:opacity-100 duration-100 text-white w-[52px] h-12 overflow-hidden rounded-[15px]"
          >
            {!user.img ? (
              <p className="text-white text-2xl uppercase">
                {user.name.charAt(0)}
              </p>
            ) : (
              <Image
                src={`${user.img}`}
                alt="Avatar do usuário"
                width={175}
                height={160}
                className="h-full w-full object-cover"
              />
            )}
          </Link>
        ) : (
          <>
            <Link
              href="/login"
              className="px-6 py-[0.65rem] bg-white rounded-md flex items-center text-whiteText bg-opacity-80 border-2 hover:bg-background-lightA border-border-light hover:bg-opacity-100 duration-100"
            >
              <p className="font-bold">Entrar</p>
            </Link>
            <Link
              href="/register"
              className="px-6 py-[0.65rem] bg-mainBlue text-white bg-opacity-80 hover:bg-opacity-100 rounded-md flex items-center duration-100"
            >
              <p className="font-bold">Cadastrar-se</p>
            </Link>
          </>
        )}
      </div>
      {showSearchView && <SearchView setShowSearchView={setShowSearchView} />}
    </nav>
  );
};

export default Navbar;
