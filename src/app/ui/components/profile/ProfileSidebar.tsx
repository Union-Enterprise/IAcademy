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
  DoorOpen,
} from "lucide-react";
import { useUser } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";

const ProfileSidebar = () => {
  const pathname = usePathname();
  const [selectedItem, setSelectedItem] = useState(pathname);
  const { setAuth } = useUser();
  const router = useRouter();

  useEffect(() => {
    setSelectedItem(pathname);
  }, [pathname]);

  return (
    <section className="border-border-light py-5 border-2 rounded-md">
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
        title="Dados do usuário"
        href="/profile/user"
        iconId={3}
        isSelected={selectedItem.includes("/user")}
        onClick={() => setSelectedItem("/user")}
      />
      <Item
        title="Sair da conta"
        href="#"
        iconId={4}
        onClick={() => {
          setAuth(false, {
            name: "Visitante",
            nickname: "visitante-0421032312",
            email: "email@email.com",
            password: "123456",
            isPremium: false,
            since: "00/00/0000",
            img: "",
          });
          router.push("/login");
        }}
      />
    </section>
  );
};

interface ItemProps {
  title: string;
  href: string;
  iconId?: number;
  isSelected?: boolean;
  onClick?: () => void;
}

function Item({
  title = "",
  href = "",
  iconId = 0,
  isSelected = false,
  onClick,
}: ItemProps) {
  const iconsList = [
    <LayoutGrid />,
    <BadgeCheck />,
    <KeyRound />,
    <UsersRound />,
    <DoorOpen />,
  ];

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${
        isSelected &&
        "opacity-100 border-l-mainBlue *:text-mainBlue *:font-semibold bg-background-lightA"
      } text-text-lightSub items-center px-5 h-[50px] flex border-l-4 border-transparent justify-between hover:bg-background-lightA duration-200`}
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
