"use client";

import { Inter } from "next/font/google";
import "../globals.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import { usePathname } from "next/navigation";
import { usePageTitle } from "../hooks/usePageTitle";
import TypingText from "../ui/components/TypingText";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  usePageTitle();

  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

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

  return (
    <html lang="pt-br">
      <head>
        <link rel="icon" href="/favicon.svg" />
      </head>
      <body
        className={`${inter.className} h-[100vh] w-[100vw] overflow-hidden select-none xl:flex`}
      >
        {pathname.includes("/admin") ? (
          <div className="w-full h-full bg-[url('/wave.svg')] bg-center bg-cover bg-no-repeat bg-blue-500 flex flex-col gap-4 items-center justify-center">
            <Image alt="" src="/whiteIcon.svg" width={80} height={80} />
            <main className="bg-bg-light p-6 lg:p-10 w-fit h-fit rounded-lg">
              {children}
            </main>
          </div>
        ) : (
          <>
            <div className="w-full bg-gradient-to-b hidden xl:flex from-mainBlue to-blue-900 flex-col gap-10 h-[100vh] px-[100px] py-[100px]">
              <Image
                src="/whiteIcon.svg"
                alt="Descrição da Imagem"
                width={80}
                height={80}
              />
              <div className="flex flex-col gap-10 max-w-[80%]">
                <div className="flex flex-col gap-2">
                  <h1 className="text-white text-6xl font-semibold">
                    Bem-vindo
                  </h1>
                  <h1 className="text-white text-6xl font-semibold">
                    à <span className="text-8xl font-bold">IAcademy!</span>
                  </h1>
                </div>
                <TypingText
                  texts={[
                    "Frustrado com a falta de acesso a bons materiais de estudo? Nossa plataforma foi criada para fornecer todas as ferramentas que você precisa para se preparar para o ENEM, sem gastar um centavo.",
                    "Cansado de estudar em todo lugar sobre matemática e não entender nada? Na IAcademy você pode obter explicações claras e recursos acessíveis para ajudar você a dominar conceitos difíceis, sem se preocupar com custos.",
                    "Sentindo-se perdido ao tentar se preparar para o vestibular? Deixe nossa plataforma guiá-lo com materiais de estudo gratuitos e suporte especializado. Tá esperando o quê?",
                  ]}
                />
              </div>
              <p className="absolute bottom-[100px] text-blue-400 font-light">
                @IAcademy 2024 - Todos os direitos reservados.
              </p>
            </div>
            <main className="xl:min-w-[560px] bg-bg-light p-7 xl:p-20 xl:py-14 flex flex-col h-full overflow-auto">
              <img width={200} src="./bluelogo.svg" alt="IAcademy Logo" />
              <div
                className={`${
                  loading && "pointer-events-none"
                } flex flex-col gap-6 mt-8`}
              >
                {children}
              </div>
            </main>
          </>
        )}
      </body>
    </html>
  );
}
