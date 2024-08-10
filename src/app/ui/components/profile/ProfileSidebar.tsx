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
} from "lucide-react";

const ProfileSidebar = () => {
  const pathname = usePathname();
  const [selectedItem, setSelectedItem] = useState(pathname);

  useEffect(() => {
    setSelectedItem(pathname);
  }, [pathname]);

  return (
    <section className="border-whiteBorder py-5 border-2 rounded-md">
      <Item
        title="Visão Geral"
        href="/profile"
        isSelected={selectedItem === "/profile"}
        onClick={() => setSelectedItem("/profile")}
      />
      <Item
        title="Assinaturas"
        href="/profile/signatures"
        iconId={1}
        isSelected={selectedItem.includes("/signatures")}
        onClick={() => setSelectedItem("/signatures")}
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
    </section>
  );
};

interface ItemProps {
  title: string;
  href: string;
  iconId?: number;
  isSelected?: boolean;
  onClick: () => void;
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
  ];

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`items-center px-5 h-[50px] flex border-l-4 border-transparent justify-between hover:bg-secondaryWhite duration-200 ${
        isSelected &&
        "opacity-100 border-mainBlue *:text-mainBlue *:font-bold bg-secondaryWhite"
      }`}
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
