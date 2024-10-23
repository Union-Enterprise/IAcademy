"use client";

import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "../ui/components/Navbar";
import { SidebarProvider } from "../context/SidebarContext";
import Sidebar from "../ui/components/Sidebar";
import { UserProvider, useUser } from "../context/UserContext";
import { ToastProvider } from "../context/ToastContext";
import { usePageTitle } from "../hooks/usePageTitle";
import { useState, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  usePageTitle();

  //cod para aparecer o formulario logo que o usuario entrar na conta(só aparece uma vez que o usuario responder, dps q ele responder n aparece mais)
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, loading, isAuthenticated } = useUser();

  useEffect(() => {
    if (isAuthenticated) {
      setIsModalOpen(true);
    }
  }, [isAuthenticated]);

  const handleModalClose = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setIsModalOpen(false);
    console.log(selectedSubjects);
  };

  const handleCheckboxChange = (subject: string) => {
    setSelectedSubjects((prev) => {
      if (prev.includes(subject)) {
        return prev.filter((s) => s !== subject);
      } else {
        return [...prev, subject];
      }
    });
  };

  return (
    <html lang="pt-br" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.svg" />
      </head>
      <body
        className={`${inter.className} relative h-[100vh] pt-20 select-none bg-bg-light flex`}
      >
        <UserProvider>
          <SidebarProvider>
            <Navbar />
            <Sidebar />
            <main className="flex flex-col overflow-auto w-full h-[calc(100% - 80px)]">
              <ToastProvider>{children}</ToastProvider>
            </main>
          </SidebarProvider>
        </UserProvider>
      </body>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Formulário de Matemática</h2>
            <p className="mb-4">Quais matérias de matemática você se sente mais confortável?</p>
            <form className="flex flex-col gap-4" onSubmit={handleModalClose}>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value="Números e Operações"
                    onChange={() => handleCheckboxChange("Números e Operações")}
                  />
                  Números e Operações
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value="Álgebra"
                    onChange={() => handleCheckboxChange("Álgebra")}
                  />
                  Álgebra
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value="Geometria"
                    onChange={() => handleCheckboxChange("Geometria")}
                  />
                  Geometria
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value="Trigonometria"
                    onChange={() => handleCheckboxChange("Trigonometria")}
                  />
                  Trigonometria
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value="Estatística e Probabilidade"
                    onChange={() => handleCheckboxChange("Estatística e Probabilidade")}
                  />
                  Estatística e Probabilidade
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value="Matemática Financeira"
                    onChange={() => handleCheckboxChange("Matemática Financeira")}
                  />
                  Matemática Financeira
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value="Relações e Funções"
                    onChange={() => handleCheckboxChange("Relações e Funções")}
                  />
                  Relações e Funções
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value="Análise Combinatória"
                    onChange={() => handleCheckboxChange("Análise Combinatória")}
                  />
                  Análise Combinatória
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value="Matemática dos Gráficos"
                    onChange={() => handleCheckboxChange("Matemática dos Gráficos")}
                  />
                  Matemática dos Gráficos
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value="Equações e Sistemas"
                    onChange={() => handleCheckboxChange("Equações e Sistemas")}
                  />
                  Equações e Sistemas
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value="Sequências e Progressões"
                    onChange={() => handleCheckboxChange("Sequências e Progressões")}
                  />
                  Sequências e Progressões
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value="Logaritmos"
                    onChange={() => handleCheckboxChange("Logaritmos")}
                  />
                  Logaritmos
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value="Matemática Básica"
                    onChange={() => handleCheckboxChange("Matemática Básica")}
                  />
                  Matemática Básica
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value="Estatística"
                    onChange={() => handleCheckboxChange("Estatística")}
                  />
                  Estatística
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value="Geometria Analítica"
                    onChange={() => handleCheckboxChange("Geometria Analítica")}
                  />
                  Geometria Analítica
                </label>
              </div>
              <button
                type="submit"
                className="bg-mainBlue text-white py-2 rounded-md hover:bg-blue-800 duration-150"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      )}
    </html>
  );
}
