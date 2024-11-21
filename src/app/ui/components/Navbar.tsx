"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";
import Searchbar, { SearchIcon, SearchView } from "./Searchbar";
import { useUser } from "@/app/context/UserContext";
import Skeleton from "./Skeleton";
import { useSidebar } from "@/app/context/SidebarContext";

const Navbar = () => {
  const [showSearchView, setShowSearchView] = useState(false);
  const { user, isAuthenticated, loading } = useUser();
  const { toggleSidebar } = useSidebar();

  if (loading) {
    return (
      <nav className="absolute top-0 left-0 z-50 h-20 bg-bg-light px-5 flex justify-between items-center shadow-sm w-full">
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
    <nav className="absolute top-0 left-0 h-20 w-full bg-bg-light px-4 flex justify-between items-center shadow-sm">
      <div className="flex gap-2 lg:gap-3 xl:gap-5 items-center">
        <Menu
          onClick={toggleSidebar}
          size={50}
          className="cursor-pointer rounded-md w-10 h-10 lg:h-12 lg:w-12 text-text-light p-2 bg-bg-lightA hover:bg-bg-lightHover duration-200"
        />
        <Link href="/">
          <Image
            src="/blueLogo.svg"
            alt="Logo IAcademy"
            width={150}
            height={30}
            className="hidden lg:flex"
          />
          <Image
            src="/blueIcon.svg"
            alt="Logo IAcademy"
            width={30}
            height={30}
            className="lg:hidden"
          />
        </Link>
      </div>
      {/* <Searchbar setShowSearchView={setShowSearchView} /> */}
      <div className="flex gap-2 lg:gap-3 items-center justify-end">
        <SearchIcon setShowSearchView={setShowSearchView} />
        {isAuthenticated ? (
          <Link
            href="/profile"
            className="flex justify-center items-center bg-mainBlue opacity-80 hover:opacity-100 duration-100 text-white h-10 w-10 overflow-hidden rounded-[15px]"
          >
            {!user.img ? (
              <p className="text-white text-xl xl:text-2xl uppercase">
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
              className="px-5 lg:px-6 h-10 lg:h-12 text-sm lg:text-base bg-white rounded-md flex items-center text-whiteText bg-opacity-80 border-2 hover:bg-bg-lightA border-border-light hover:bg-opacity-100 duration-100"
            >
              <p className="font-bold">Entrar</p>
            </Link>
            <Link
              href="/register"
              className="px-5 lg:px-6 h-10 lg:h-12 text-sm lg:text-base bg-mainBlue text-white bg-opacity-80 hover:bg-opacity-100 rounded-md flex items-center duration-100"
            >
              <p className="font-bold">Cadastrar</p>
            </Link>
          </>
        )}
      </div>
      {showSearchView && <SearchView setShowSearchView={setShowSearchView} />}
    </nav>
  );
};

export default Navbar;
