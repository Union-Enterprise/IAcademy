"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getModulosData } from "@/app/ui/components/modulos/data";
import normalizeString from "@/app/ui/components/modulos/normalizeString";
import { marked } from "marked";
import katex from "katex";
import "katex/dist/katex.min.css";
import { useUser } from "@/app/context/UserContext";
import axios from "axios";

export default function Topico() {
  const [showOtherFeedback, setShowOtherFeedback] = useState(false);
  const [modulosData, setModulosData] = useState<Record<string, any> | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();
  const params = useParams();

  const moduloKey = decodeURIComponent(params.modulo);
  const unidadeKey = decodeURIComponent(params.unidade);
  const topicoKey = decodeURIComponent(params.topico);

  useEffect(() => {
    const fetchModulosData = async () => {
      try {
        const data = await getModulosData();
        setModulosData(data);
      } catch (err) {
        setError("Erro ao carregar os dados dos tópicos.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchModulosData();
  }, []);

  const [reportData, setReportData] = useState({
    sender: user.name,
    topic: topicoKey,
    complaint: "",
    message: "",
  });

  const sendReport = () => {
    const { sender, topic, complaint, message } = reportData;
    axios
      .post(
        "http://localhost:5002/report",
        { sender, topic, complaint, message },
        { withCredentials: true }
      )
      .then((response) => {
        console.log("Denuncia recebida com sucesso");
      })
      .catch((error) => {
        console.error(error);
      });
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
  if (!modulo) {
    return <p>Módulo não encontrado.</p>;
  }

  const unidade = modulo.unidades.find(
    (unidade: any) => normalizeString(unidade.title) === unidadeKey
  );

  if (!unidade) {
    return <p>Unidade não encontrada.</p>;
  }

  const handleOtherFeedbackSubmit = () => {
    console.log("Feedback enviado:", reportData);
    sendReport();
    setReportData({ ...reportData, message: "" });
    setShowOtherFeedback(false);
  };

  const openFeedback = (chosen: string) => {
    setShowOtherFeedback(true);
    setReportData({ ...reportData, complaint: chosen });
  };

  let index;
  for (let topicos in unidade["topicos"]) {
    if (normalizeString(unidade["topicos"][topicos].title) == topicoKey) {
      index = topicos;
      break;
    }
  }

  const data = unidade["topicos"][index];

  return (
    <div>
      <article aria-live="polite" className="flex flex-col gap-3">
        <div>
          <h1 className="text-6xl font-bold mb-1" tabIndex={0}>
            {data.title}
          </h1>
          <p className="mb-4 text-text-lightSub" tabIndex={0}>
            {data.description}
          </p>
        </div>

        {Object.keys(data.content).map((key) => {
          if (key !== "images_google_search") {
            return (
              <section key={key} aria-labelledby={key}>
                <h2
                  id={key}
                  className="text-2xl font-semibold mb-1"
                  tabIndex={0}
                >
                  {key}
                </h2>
                <p
                  className="mb-4 text-text-lightSub"
                  tabIndex={0}
                  dangerouslySetInnerHTML={{
                    __html: renderContent(data.content[key]),
                  }}
                ></p>
              </section>
            );
          }
        })}

        <div className="flex justify-center mb-10 pt-10">
          <img
            src={data.content.images_google_search
              .replace('<img href="', "")
              .replace('">', "")}
            alt={`Imagem relacionada a ${data.title}`}
            tabIndex={0}
          />
        </div>
      </article>

      <div className="w-full bg-bg-lightA p-5 rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4" tabIndex={0}>
          Conte-nos o motivo:
        </h2>
        <div className="flex flex-wrap w-full h-fit justify-center gap-2">
          <FeedbackButton
            text="Não gostei do estilo"
            onClick={() => openFeedback("Estilo")}
          />
          <FeedbackButton
            text="Conteúdo incoerente"
            onClick={() => openFeedback("Conteúdo incoerente")}
          />
          <FeedbackButton
            text="Não correspondeu às expectativas"
            onClick={() => openFeedback("Decepcionante")}
          />
          <FeedbackButton
            text="Confuso"
            onClick={() => openFeedback("Confuso")}
          />
          <FeedbackButton
            text="Entediante"
            onClick={() => openFeedback("Entediante")}
          />
          <FeedbackButton text="Outro" onClick={() => openFeedback("Outro")} />
        </div>

        {showOtherFeedback && (
          <div className="mt-4">
            <textarea
              value={reportData.message}
              onChange={(e) =>
                setReportData({ ...reportData, message: e.target.value })
              }
              placeholder="Seu feedback aqui"
              className="border border-gray-300 rounded-md p-2 w-full focus:border-mainBlue focus:shadow-md focus:outline-none hover:border-mainBlue hover:shadow-md"
              rows={2}
            />
            <button
              onClick={handleOtherFeedbackSubmit}
              className="bg-mainBlue text-white px-4 py-2 rounded-md mt-2 hover:bg-mainBlue/90"
            >
              Enviar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
function renderContent(content: string) {
  const markdownHtml = marked(content);

  const blockLatexRenderedHtml = markdownHtml.replace(
    /\$\$(.+?)\$\$/g,
    (match, expr) => {
      return katex.renderToString(expr, {
        throwOnError: false,
        displayMode: true,
      });
    }
  );

  const inlineLatexRenderedHtml = blockLatexRenderedHtml.replace(
    /\$(.+?)\$/g,
    (match, expr) => {
      return katex.renderToString(expr, {
        throwOnError: false,
        displayMode: false,
      });
    }
  );

  return inlineLatexRenderedHtml;
}

function FeedbackButton({ text = "Motivo aqui", onClick }) {
  return (
    <button
      className="bg-bg-lightA text-sm text-gray-800 px-8 py-3 rounded-md hover:bg-gray-300 duration-200"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
