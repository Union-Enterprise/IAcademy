"use client";
import { usePageTitle } from "@/app/hooks/usePageTitle";
import { useParams } from "next/navigation";
import { getModulosData } from "@/app/ui/components/modulos/data";
import normalizeString from "@/app/ui/components/modulos/normalizeString";
import Link from "next/link";
import { ArrowUpFromDot, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import axios from 'axios';
import { useUser } from "@/app/context/UserContext";

const botProfilePicUrl = "/blueIcon.svg";

type ModuloKey = string;

interface ChatMessage {
  sender: 'user' | 'bot';
  content: string;
}

export default function TopicoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  usePageTitle();

  const params = useParams();
  const moduloKey = decodeURIComponent(params.modulo);
  const unidadeKey = decodeURIComponent(params.unidade);
  const topicoKey = decodeURIComponent(params.topico);

  const { user } = useUser();
  console.log(user.img);

  const [modulosData, setModulosData] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatVisible, setChatVisible] = useState(true);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [botTypingContent, setBotTypingContent] = useState("");

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

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSend = async () => {
    if (message) {
      const userMessage: ChatMessage = { sender: 'user', content: message };
      setChatMessages((prevMessages) => [...prevMessages, userMessage]);
      setMessage('');

      setIsBotTyping(true);
      setBotTypingContent("");

      try {
        const response = await axios.post("http://localhost:5000/answer_user_questions", {
          content: `${moduloKey} - ${unidadeKey} - ${topicoKey}`,
          chat: chatMessages,
          prompt: message,
        });

        animateTyping(response.data.response);
      } catch (error) {
        console.error("Erro ao enviar a mensagem:", error);
        setIsBotTyping(false);
      }
    }
  };

  const animateTyping = (fullMessage: string) => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < fullMessage.length) {
        setBotTypingContent((prevContent) => prevContent + fullMessage[currentIndex]);
        currentIndex += 1;
      } else {
        clearInterval(typingInterval);
        setChatMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'bot', content: fullMessage }
        ]);
        setIsBotTyping(false);
        setBotTypingContent("");
      }
    }, 10);
  };

  const toggleChat = () => {
    setChatVisible(!chatVisible);
  };

  
  const getInitials = (name: string) => {
    const firstName = name.split(' ')[0]; 
    const initials = firstName.charAt(0).toUpperCase(); 
    return initials;
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!modulosData || !(moduloKey in modulosData)) {
    return <p>Módulo não encontrado.</p>;
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
            <p className="text-2xl text-gray-500">IAcademy bot</p>
            <div className="flex flex-col gap-3 h-96 flex-grow overflow-y-auto overflow-hidden mb-4">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === 'user' ? 'justify-end mt-7' : 'justify-start'}`}
                >
                  <div className="flex items-center gap-3">
                    {msg.sender === 'bot' && (
                      <img
                        src={botProfilePicUrl}
                        alt="Bot profile"
                        className="w-14 h-20 rounded-full"
                      />
                    )}
                    <div
                      className={`p-3 rounded-lg ${msg.sender === 'user' ? 'bg-mainBlue text-white' : 'bg-gray-300 text-black'} max-w-xs`}
                    >
                      {msg.content}
                    </div>
                    {msg.sender === 'user' && (
                      user.img ? (
                        <img
                          src={user.img} 
                          alt="User profile"
                          className="w-14 h-14 rounded-full"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-full bg-blue-500 text-white flex items-center justify-center">
                          {getInitials(user.name)}
                        </div>
                      )
                    )}
                  </div>
                </div>
              ))}
              {isBotTyping && (
                <div className="flex justify-start mt-7">
                  <div className="flex">
                    <div className="typing-ball"></div>
                    <div className="typing-ball"></div>
                    <div className="typing-ball"></div>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-auto relative">
              <textarea
                placeholder="Mensagem IAcademy"
                value={message}
                onChange={handleTextareaChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                className="w-full p-4 border border-gray-300 rounded-xl pr-16 focus:outline-none focus:ring-2 focus:ring-mainBlue resize-none"
                rows={1}
              />
              <button
                onClick={handleSend}
                disabled={!message}
                className={`absolute right-1 top-1/3 mt-2 transform -translate-y-1/2 bg-mainBlue text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-mainBlue/90 ${!message ? 'opacity-50 cursor-not-allowed' : ''}`}
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
      <div
        onClick={toggleChat}
        className="fixed mt-5 right-4 bg-mainBlue rounded-full p-2 flex items-center justify-center hover:bg-mainBlue/80 cursor-pointer z-50"
      >
        <MessageCircle className="text-white w-9 h-9" />
      </div>
    </section>
  );
}
