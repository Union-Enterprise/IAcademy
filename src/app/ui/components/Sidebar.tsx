"use client";

import {
  faHouse,
  faCompass,
  faDashboard,
  faUserAstronaut,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useSidebar } from "./context/SidebarContext";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const Sidebar = ({ isUserLayout = true }) => {
  const { isOpen } = useSidebar();
  const pathname = usePathname();

  const [selectedItem, setSelectedItem] = useState(pathname);

  useEffect(() => {
    setSelectedItem(pathname);
  }, [pathname]);

  return (
    <section
      className={`h-full ${
        isOpen ? "w-[300px]" : "w-[90px]"
      } flex flex-col gap-[10px] px-3 py-6 bg-whiteBorder duration-300`}
    >
      {isUserLayout ? (
        <>
          <Item
            title="Home"
            isOpen={isOpen}
            href="/"
            isSelected={selectedItem === "/"}
            onClick={() => setSelectedItem("/")}
          />
          <Item
            title="Trilhas"
            icon={faCompass}
            isOpen={isOpen}
            href="/trilhas"
            isSelected={selectedItem.startsWith("/trilhas")}
            onClick={() => setSelectedItem("/trilhas")}
          />
          <Item
            title="Premium"
            isPremium={true}
            isOpen={isOpen}
            href="/premium"
            isSelected={selectedItem === "/premium"}
            onClick={() => setSelectedItem("/premium")}
          />
        </>
      ) : (
        <>
          <Item
            title="Dashboard"
            icon={faDashboard}
            isOpen={isOpen}
            href="/dashboard"
            isSelected={selectedItem === "/dashboard"}
            onClick={() => setSelectedItem("/dashboard")}
          />
          <Item
            title="Administradores"
            icon={faUserAstronaut}
            isOpen={isOpen}
            href="/admins"
            isSelected={selectedItem === "/admins"}
            onClick={() => setSelectedItem("/admins")}
          />
        </>
      )}
    </section>
  );
};

interface ItemProps {
  title: string;
  href: string;
  icon?: typeof faHouse;
  isSelected?: boolean;
  isPremium?: boolean;
  isOpen: boolean;
  onClick: () => void;
}

function Item({
  title = "",
  href = "",
  icon = faHouse,
  isSelected = false,
  isPremium = false,
  isOpen,
  onClick,
}: ItemProps) {
  return (
    <Link
      onClick={onClick}
      href={href}
      className={`flex overflow-hidden gap-6 px-5 h-[50px] rounded-md items-center cursor-pointer hover:opacity-100 duration-200 
        ${
          isSelected
            ? isPremium
              ? "opacity-100"
              : "opacity-100 bg-white *:text-mainBlue *:font-bold"
            : "opacity-50"
        } 
        
        ${isPremium ? "bg-mainBlue text-white" : "text-whiteText"}`}
    >
      {isPremium ? (
        <Image
          src="/premiumIcon.svg"
          alt="Premium Icon"
          width={25}
          height={25}
        />
      ) : (
        <FontAwesomeIcon icon={icon} className="bg-red h-[25px] w-[25px]" />
      )}
      {isOpen && <p className="whitespace-nowrap">{title}</p>}
    </Link>
  );
}

export default Sidebar;
