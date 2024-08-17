"use client";

import {
  House,
  Compass,
  Map,
  BadgeCheck,
  PanelsTopLeft,
  UserRoundPlus,
} from "lucide-react";
import Link from "next/link";
import { useSidebar } from "./context/SidebarContext";
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
        isOpen ? "w-[300px]" : "w-[95px]"
      } flex flex-col gap-2 px-5 py-6 duration-200`}
    >
      {isUserLayout ? (
        <>
          <Item
            title="Início"
            lucideIcon={House}
            isOpen={isOpen}
            href="/"
            isSelected={selectedItem === "/"}
            onClick={() => setSelectedItem("/")}
          />
          <Item
            title="Trilhas"
            lucideIcon={Compass}
            isOpen={isOpen}
            href="/trilhas"
            isSelected={selectedItem.startsWith("/trilhas")}
            onClick={() => setSelectedItem("/trilhas")}
          />
          <Item
            title="Premium"
            isPremium={true}
            lucideIcon={BadgeCheck}
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
            lucideIcon={PanelsTopLeft}
            isOpen={isOpen}
            href="/dashboard"
            isSelected={selectedItem === "/dashboard"}
            onClick={() => setSelectedItem("/dashboard")}
          />
          <Item
            title="Administradores"
            lucideIcon={UserRoundPlus}
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
  lucideIcon?: React.ElementType;
  isSelected?: boolean;
  isPremium?: boolean;
  isOpen: boolean;
  onClick: () => void;
}

function Item({
  title,
  href,
  lucideIcon: LucideIcon,
  isSelected = false,
  isPremium = false,
  isOpen,
  onClick,
}: ItemProps) {
  return (
    <Link
      onClick={onClick}
      href={href}
      className={`relative pl-[55px] flex overflow-hidden gap-4 h-[50px] rounded-md items-center cursor-pointer hover:opacity-100 duration-200 w-full
        ${
          isSelected
            ? isPremium
              ? "opacity-100"
              : "opacity-100 bg-cyan-100 *:text-mainBlue"
            : "opacity-50"
        }

        ${!isSelected && !isPremium && "hover:bg-background-lightHover"}

        ${isPremium ? "bg-mainBlue text-white" : "text-title-light "}`}
    >
      {LucideIcon && (
        <LucideIcon className="absolute left-[15px] h-[25px] w-[25px]" />
      )}
      {isOpen && <p className="whitespace-nowrap">{title}</p>}
    </Link>
  );
}

export default Sidebar;
