"use client";

import { PenLine, Camera } from "lucide-react";
import Image from "next/image";
import ProfileSidebar from "@/app/ui/components/profile/ProfileSidebar";
import { useState } from "react";
import SettingsImage from "@/app/ui/components/profile/SettingsImage";

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showImageView, setShowImageView] = useState(false);

  return (
    <>
      <div className=" grid grid-cols-3 gap-5 px-[200px] pt-[70px]">
        <div className="col-span-1 flex flex-col gap-5">
          <div className="border-2 flex flex-col items-center pt-[70px] border-whiteBorder bg-[rgba(253,253,253)] rounded-md relative">
            <div className="absolute left-0 top-0 w-full h-[40%] bg-[rgba(240,240,240)] p-3 flex justify-end">
              <PenLine className="h-[40px] w-[40px] bg-white text-whiteText rounded-md p-2 cursor-pointer hover:bg-mainBlue hover:text-white duration-200" />
            </div>
            <div className="relative z-10 overflow-hidden rounded-[70px] group cursor-pointer">
              <Image
                src="/blueIcon.svg"
                alt="Profile Image"
                width={60}
                height={60}
                className="bg-blue-200 w-[175px]"
              />
              <button
                className="bg-black opacity-0 duration-200 absolute left-0 top-0 w-full h-full *:text-white justify-center items-center flex group-hover:opacity-100 group-hover:bg-opacity-35"
                onClick={() => setShowImageView(true)}
              >
                <Camera className="w-[50px] h-[50px]" />
              </button>
            </div>
            <h1 className="text-2xl font-bold mt-5">Nome de exibição</h1>
            <h2 className="text-gray-600 font-semibold">@nome-do-usuário</h2>
            <p className="text-gray-500 text-sm flex mt-12 py-5 border-t-2 border-whiteBorder w-full justify-center">
              Aluno IAcademy desde 00/00/0000
            </p>
          </div>
          <ProfileSidebar />
        </div>
        <div className=" col-span-2 flex flex-col gap-5">{children}</div>
      </div>
      {showImageView && (
        <SettingsImage closeView={() => setShowImageView(false)} />
      )}
    </>
  );
}
