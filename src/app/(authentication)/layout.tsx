"use client";

// import { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "IAcademy",
//   description: "Faça login para aproveitar a plataforma.",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const [title, setTitle] = useState("IAcademy");

  useEffect(() => {
    axios
      .get("http://localhost:5002/profile", { withCredentials: true })
      .then((res) => {
        if (res.status !== 401) {
          router.push("/profile");
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  }, [router]);

  useEffect(() => {
    setTitle(
      `${
        pathname.includes("/login")
          ? "Login"
          : pathname.includes("/register")
          ? "Cadastro"
          : "Recuperação de senha"
      } | IAcademy`
    );

    document.title = title;
  });

  return (
    <html lang="pt-br">
      <head>
        <link rel="icon" href="/favicon.svg" />
      </head>
      <body
        className={`${inter.className} h-[100vh] overflow-hidden select-none grid grid-cols-3`}
      >
        <div className="bg-mainBlue col-span-2 flex items-center justify-center h-[100vh]">
          <Image
            src="/whiteIcon.svg"
            alt="Descrição da Imagem"
            width={500}
            height={460.63}
            className="w-[500px] h-[460px]"
          />
        </div>
        <main className="col-span-1 bg-background-light p-20 h-full overflow-auto">
          <div className="flex flex-col gap-8">
            <img width={200} src="./bluelogo.svg" alt="IAcademy Logo" />
            <div
              className={`${
                loading && "pointer-events-none"
              } flex flex-col gap-8`}
            >
              {children}
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
