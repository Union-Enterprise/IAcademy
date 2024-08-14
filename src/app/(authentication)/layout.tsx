import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Autenticação IAcademy",
  description: "A sua plataforma de ensino por IA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${inter.className} h-[100vh] overflow-hidden select-none grid grid-cols-3`}
      >
        <div className="bg-mainBlue col-span-2 flex items-center justify-center h-full">
          <Image
            src=".\whiteIcon.svg"
            alt="Descrição da Imagem"
            width={500}
            height={460.63}
          />
        </div>
        <main className="col-span-1 bg-white px-[80px] py-[60px]">
          <div className="flex flex-col justify-between h-full">
            <img src="./bluelogo.svg" alt="" className="w-[250px]" />
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
