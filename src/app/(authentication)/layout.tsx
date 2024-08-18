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
            src="/whiteIcon.svg"
            alt="Descrição da Imagem"
            width={500}
            height={460.63}
            className="w-[500px] h-[460px]"
          />
        </div>
        <main className="col-span-1 bg-background-light p-20">
          <div className="flex flex-col gap-8 h-full">
            <img width={200} src="./bluelogo.svg" alt="IAcademy Logo" />
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
