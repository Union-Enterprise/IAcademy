"use client";

import {
  House,
  Compass,
  BadgeCheck,
  UserRoundPlus,
  ChartPie,
  BellRing,
  Library,
  FileQuestion,
} from "lucide-react";
import Link from "next/link";
import { useSidebar } from "../../context/SidebarContext";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useUser } from "@/app/context/UserContext";
import Skeleton from "../components/Skeleton";

const Sidebar = ({ isUserLayout = true }) => {
  const { isOpen } = useSidebar();
  const pathname = usePathname();
  const { user, loading } = useUser();

  const [selectedItem, setSelectedItem] = useState(pathname);
  const isTrilha = pathname.startsWith("/overview");

  useEffect(() => {
    setSelectedItem(pathname);
  }, [pathname]);

  if (loading) {
    return (
      <section
        className={`h-full ${
          isOpen ? "w-[300px]" : "w-[95px]"
        } flex flex-col gap-2 px-5 py-10 duration-200`}
      >
        <Skeleton className="h-[50px] w-full" />
        <Skeleton className="h-[50px] w-full" />
        <Skeleton className="h-[50px] w-full" />
      </section>
    );
  }

  return (
    <section
      className={`h-fit w-[300px]
        
        
        ${
          !isTrilha &&
          "lg:h-full lg:relative lg:left-0 lg:top-0 lg:px-4 lg:py-6 lg:rounded-none lg:gap-2"
        }
        absolute left-4 top-24 rounded-md overflow-hidden z-50 bg-bg-lightA flex flex-col duration-100 border-borders-light`}
    >
      {!user.is_adm ? (
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
            title="Meus estudos"
            lucideIcon={Library}
            isOpen={isOpen}
            href="/tudent"
            isSelected={selectedItem.startsWith("/student")}
            onClick={() => setSelectedItem("/student")}
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
            lucideIcon={ChartPie}
            isOpen={isOpen}
            href="/dashboard"
            isSelected={selectedItem === "/dashboard"}
            onClick={() => setSelectedItem("/dashboard")}
          />
          <Item
            title="Usuários"
            lucideIcon={UserRoundPlus}
            isOpen={isOpen}
            href="/users"
            isSelected={selectedItem === "/users"}
            onClick={() => setSelectedItem("/users")}
          />
          <Item
            title="Notificações"
            lucideIcon={BellRing}
            isOpen={isOpen}
            href="/notifications"
            isSelected={selectedItem === "/notifications"}
            onClick={() => setSelectedItem("/notifications")}
          />
          <Item
            title="Questões"
            lucideIcon={FileQuestion}
            isOpen={isOpen}
            href="/questions"
            isSelected={selectedItem === "/questions"}
            onClick={() => setSelectedItem("/questions")}
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
      className={`px-6 py-4 lg:px-4 flex overflow-hidden gap-4 lg:rounded-md items-center cursor-pointer hover:opacity-100 duration-200 w-full
        ${
          isSelected
            ? isPremium
              ? "opacity-100"
              : "opacity-100 bg-cyan-100 *:text-mainBlue *:font-semibold"
            : "opacity-50"
        }

        ${!isSelected && !isPremium && "hover:bg-bg-lightHover"}

        ${isPremium ? "bg-mainBlue text-white" : "text-title-light "}`}
    >
      {LucideIcon && <LucideIcon size={25} className="flex-shrink-0" />}
      {isOpen && <p className="whitespace-nowrap">{title}</p>}
    </Link>
  );
}

export default Sidebar;
