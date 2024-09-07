"use client";

import { PenLine, Camera } from "lucide-react";
import Image from "next/image";
import ProfileSidebar from "@/app/ui/components/profile/ProfileSidebar";
import { useState } from "react";
import SettingsImage from "@/app/ui/components/profile/SettingsImage";
import { useUser } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";
import LoadingFrame from "@/app/ui/components/LoadingFrame";
import Modal from "@/app/ui/components/profile/Modal";

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, loading, isAuthenticated } = useUser();
  const router = useRouter();
  const [modalType, setModalType] = useState<"image" | null>(null);
  const [visible, setVisible] = useState(false);

  const handleModalClose = () => {
    setVisible(false);
    setTimeout(() => {
      setModalType(null);
    }, 300);
  };

  if (!loading && !isAuthenticated) {
    router.push("/login");
    return null;
  }

  if (loading) {
    return <LoadingFrame />;
  }

  return (
    <>
      <div className=" grid grid-cols-3 gap-5 px-[200px] pt-[70px] pb-[150px]">
        <div className="col-span-1 flex flex-col gap-5">
          <div className="border-2 flex flex-col items-center pt-[70px] border-border-light bg-background-lightCard rounded-md relative">
            <div className="absolute left-0 top-0 w-full h-[40%] bg-background-lightA p-3 flex justify-end">
              <PenLine className="h-[40px] w-[40px] bg-background-light text-title-light rounded-md p-2 cursor-pointer hover:bg-mainBlue hover:text-background-light duration-200" />
            </div>
            <div className="relative z-10 overflow-hidden rounded-[70px] group cursor-pointer bg-mainBlue w-[175px] h-[160px] flex items-center justify-center">
              {user.img ? (
                <Image
                  src={`${user.img}`}
                  alt="Profile Image"
                  width={120}
                  height={120}
                  className="h-full w-full object-cover"
                />
              ) : (
                <p className="text-white text-7xl uppercase">
                  {user.name.charAt(0)}
                </p>
              )}
              <button
                className="bg-black opacity-0 duration-200 absolute left-0 top-0 w-full h-full *:text-white justify-center items-center flex group-hover:opacity-100 group-hover:bg-opacity-35"
                onClick={() => setModalType("image")}
              >
                <Camera className="w-[50px] h-[50px]" />
              </button>
            </div>
            <h1 className="text-2xl text-title-light font-bold mt-5">
              {user.name}
            </h1>
            <h2 className="text-gray-600 font-semibold">@{user.nickname}</h2>
            <p className="text-text-lightSub text-sm flex mt-12 py-5 border-t-2 border-border-light w-full justify-center">
              Aluno IAcademy desde
              <span className="ml-1">{user.createdAt}</span>
            </p>
          </div>
          <ProfileSidebar />
        </div>
        <div className="col-span-2 flex flex-col gap-5">{children}</div>
      </div>
      {modalType && (
        <Modal
          title="foto de perfil"
          onClose={handleModalClose}
          visible={visible}
          setVisible={setVisible}
        >
          <SettingsImage closeModal={handleModalClose} />
        </Modal>
      )}
    </>
  );
}
