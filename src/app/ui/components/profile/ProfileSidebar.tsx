"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  BadgeCheck,
  KeyRound,
  LayoutGrid,
  ChevronRight,
  UsersRound,
  LogOut,
} from "lucide-react";
import { useUser } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";
import axios from "axios";

const ProfileSidebar = () => {
  const pathname = usePathname();
  const [selectedItem, setSelectedItem] = useState(pathname);
  const { setAuth } = useUser();
  const router = useRouter();

  useEffect(() => {
    setSelectedItem(pathname);
  }, [pathname]);

  const exitAccount = () => {
    axios
      .delete("http://localhost:5002/exit", { withCredentials: true })
      .then(function (response) {
        console.log(response.data); // mensagem de sucesso / erro (e.g email ou senha incorreto)
      })
      .catch(function (error) {
        console.error(error);
      })
      .finally(() => {
        console.log("puxando...");
        router.push("/login");
      });
  };

  return (
    <section className="border-border-light border-2 rounded-xl">
      <Item
        title="Visão Geral"
        href="/profile"
        isSelected={selectedItem === "/profile"}
        onClick={() => setSelectedItem("/profile")}
      />
      <Item
        title="Assinaturas"
        href="/profile/purchases"
        iconId={1}
        isSelected={selectedItem.includes("/purchases")}
        onClick={() => setSelectedItem("/purchases")}
      />
      <Item
        title="Dados de acesso"
        href="/profile/access"
        iconId={2}
        isSelected={selectedItem.includes("/access")}
        onClick={() => setSelectedItem("/access")}
      />
      <Item
        title="Dados pessoais"
        href="/profile/user"
        iconId={3}
        isSelected={selectedItem.includes("/user")}
        onClick={() => setSelectedItem("/user")}
      />
      <Item
        title="Sair da conta"
        iconId={4}
        onClick={() => {
          exitAccount();
        }}
        classname="*:text-red-600 opacity-70"
      />
    </section>
  );
};

interface ItemProps {
  title: string;
  href?: string;
  iconId?: number;
  classname?: string;
  isSelected?: boolean;
  onClick?: () => void;
}

function Item({
  title = "",
  href = "",
  iconId = 0,
  isSelected = false,
  classname,
  onClick,
}: ItemProps) {
  const iconsList = [
    <LayoutGrid />,
    <BadgeCheck />,
    <KeyRound />,
    <UsersRound />,
    <LogOut />,
  ];

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${classname} ${
        isSelected &&
        "opacity-100 border-l-mainBlue *:text-mainBlue *:font-semibold bg-background-lightA"
      } text-text-lightSub items-center px-5 h-[60px] flex border-l-4 border-transparent justify-between hover:bg-background-lightA duration-200`}
    >
      <div className="flex gap-5">
        {iconsList[iconId]}
        <p>{title}</p>
      </div>
      <ChevronRight />
    </Link>
  );
}

export default ProfileSidebar;
