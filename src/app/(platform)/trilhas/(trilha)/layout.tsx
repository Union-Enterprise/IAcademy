"use client";

import { Tag } from "@/app/ui/components/ContentList";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TrilhaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [selectedItem, setSelectedItem] = useState(pathname);

  return (
    <div className="h-full *:px-[250px]">
      <div className="bg-secondaryWhite pt-[60px] h-[300px] flex flex-col justify-between">
        <div className="flex flex-col gap-3">
          <Link
            href="/trilhas"
            className="*:text-blue-500 opacity-50 hover:opacity-100 flex gap-2 items-center duration-100 w-fit"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="w-5 h-5" />
            <p className="text-lg">Voltar</p>
          </Link>
          <h1 className="text-5xl font-bold">Geometria</h1>
          <p className="text-gray-500 text-lg">
            Aprenda tudo sobre o universo da geometria.
          </p>
          <div className="flex gap-5">
            <Tag />
            <Tag />
            <Tag />
          </div>
        </div>
        <div className="flex gap-4">
          <Link
            href="/trilhas/general"
            className={`${
              pathname.includes("/general")
                ? "border-b-mainBlue font-semibold"
                : "opacity-50 hover:opacity-100 hover:border-opacity-75 hover:border-b-mainBlue "
            } border-b-2 p-2 text-lg duration-100`}
          >
            <p>Visão Geral</p>
          </Link>
          <Link
            href="/trilhas/content"
            className={`${
              pathname.includes("/content")
                ? "border-b-mainBlue font-semibold"
                : "opacity-50 hover:opacity-100 hover:border-opacity-75 hover:border-b-mainBlue "
            } border-b-2 p-2 text-lg duration-100`}
          >
            <p>Conteúdo</p>
          </Link>
        </div>
      </div>
      <div className="h-full mt-20 grid grid-cols-3 gap-10">
        <div className="w-full bg-blue-300 col-span-2">{children}</div>
        <div className="col-span-1">
          <p>Menu lateral</p>
        </div>
      </div>
    </div>
  );
}
