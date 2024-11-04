"use client";

import { usePageTitle } from "@/app/hooks/usePageTitle";
import { useParams } from "next/navigation";
import { modulosData } from "@/app/ui/components/modulos/data";
import normalizeString from "@/app/ui/components/modulos/normalizeString";
import Link from "next/link";
import { ArrowUpFromDot, MessageCircle } from "lucide-react";
import { useState } from "react";

type ModuloKey = keyof typeof modulosData;

export default function TopicoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  usePageTitle();

  const params = useParams();
  const moduloKey = params.modulo as ModuloKey;
  const unidadeKey = params.unidade;
  const topicoKey = params.topico;

  const modulo = modulosData[moduloKey];
  if (!modulo) {
    return <p>Módulo não encontrado.</p>;
  }

  const unidade = modulo.unidades.find(
    (unidade) => normalizeString(unidade.title) === unidadeKey
  );

  if (!unidade) {
    return <p>Unidade não encontrada.</p>;
  }

  const topico = unidade.topicos.find(
    (topico) => normalizeString(topico.title) === topicoKey
  );

  if (!topico) {
    return <p>Tópico não encontrado.</p>;
  }

  const [message, setMessage] = useState('');
  const [chatVisible, setChatVisible] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSend = () => {
    if (message) {
      console.log("Mensagem enviada:", message);
      setMessage('');
    }
  };

  const toggleChat = () => {
    setChatVisible(!chatVisible);
  };

  return (
    <section className="grid grid-cols-3 gap-5 h-full overflow-x-hidden">
      <div className="col-span-2 w-full m-10 overflow-auto pr-5 flex flex-col gap-5">
        <Link href={`/trilhas/${moduloKey}/${unidadeKey}`} className="text-mainBlue opacity-60 hover:opacity-100 flex gap-2 items-center duration-100 w-fit mb-3">
          Voltar
        </Link>
        {children}
      </div>
      <div className={`col-span-1 bg-bg-lightA border-2 border-borders-lightA rounded-lg p-10 flex flex-col relative transition-transform duration-300 ${chatVisible ? 'translate-x-0' : 'translate-x-full'}`}>
        {chatVisible && (
          <>
            <p>Chat do PT</p>
            <div className="mt-auto relative"> 
              <input
                type="text"
                placeholder="Mensagem IAcademy"
                value={message}
                onChange={handleInputChange}
                className="w-full p-4 border border-gray-300 rounded-xl pr-16 focus:outline-none focus:ring-2 focus:ring-mainBlue"
              />
              <button
                onClick={handleSend}
                disabled={!message}
                className={`absolute right-1 top-1/2 transform -translate-y-1/2 bg-mainBlue text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-mainBlue/90 ${!message ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <ArrowUpFromDot />
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-500 flex justify-center">
              A IAcademy pode cometer erros. Considere verificar informações importantes.
            </p>
          </>
        )}
      </div>
      {/* Ícone fixo */}
      <div 
        onClick={toggleChat} 
        className="fixed mt-5 right-4 bg-gray-200 rounded-full p-2 flex items-center justify-center hover:bg-gray-300 cursor-pointer z-50"
      >
        <MessageCircle className="text-mainBlue w-9 h-9" />
      </div>
    </section>
  );
}
