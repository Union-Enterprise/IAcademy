"use client";

import { usePageTitle } from "@/app/hooks/usePageTitle";
import { useParams } from "next/navigation";
import { getModulosData } from "@/app/ui/components/modulos/data";
import normalizeString from "@/app/ui/components/modulos/normalizeString";
import Link from "next/link";
import { ArrowUpFromDot, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

type ModuloKey = string;

export default function TopicoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  usePageTitle();

  const params = useParams();
  const moduloKey = decodeURIComponent(params.modulo); 
  const unidadeKey = decodeURIComponent(params.unidade); 
  const topicoKey = params.topico;

  const [modulosData, setModulosData] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [message, setMessage] = useState('');
  const [chatVisible, setChatVisible] = useState(true);

  useEffect(() => {
    const fetchModulosData = async () => {
      try {
        const data = await getModulosData();
        setModulosData(data);
      } catch (err) {
        setError("Erro ao carregar os dados dos módulos.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchModulosData();
  }, []);

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

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!modulosData || !(moduloKey in modulosData)) {
    console.log(moduloKey)
    return <p>Módulo não encontrado5.</p>;
  }

  const modulo = modulosData[moduloKey];
  const unidade = modulo.unidades.find(
    (unidade: any) => normalizeString(unidade.title) === unidadeKey
  );

  if (!unidade) {
    return <p>Unidade não encontrada.</p>;
  }

  const topico = unidade.topicos.find(
    (topico: any) => normalizeString(topico.title) === topicoKey
  );

  if (!topico) {
    return <p>Tópico não encontrado.</p>;
  }

  return (
    <section className="grid grid-cols-3 gap-5 h-full overflow-x-hidden">
      <div className="col-span-2 w-full m-10 overflow-auto pr-5 flex flex-col gap-5">
        <Link
          href={`/trilhas/${moduloKey}/${unidadeKey}`}
          className="text-mainBlue opacity-60 hover:opacity-100 flex gap-2 items-center duration-100 w-fit mb-3"
        >
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
