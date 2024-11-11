"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getModulosData } from "@/app/ui/components/modulos/data";
import normalizeString from "@/app/ui/components/modulos/normalizeString";
import { marked } from "marked";
import katex from "katex";
import "katex/dist/katex.min.css";

export default function Topico() {
  const [showOtherFeedback, setShowOtherFeedback] = useState(false);
  const [otherFeedback, setOtherFeedback] = useState("");
  const [modulosData, setModulosData] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    console.log("Feedback enviado:", otherFeedback);
    setOtherFeedback("");
    setShowOtherFeedback(false);
  };


  let index;
  for (let topicos in unidade['topicos']) {
    if (normalizeString(unidade['topicos'][topicos].title) == topicoKey) {
      index = topicos;
      break;
    }
  }

  const data = unidade['topicos'][index];

  return (
    <div>
      <article aria-live="polite">
        <h1 className="text-5xl font-bold mb-4" tabIndex={0}>
          {data.title}
        </h1>
        <p className="mb-4" tabIndex={0}>
          {data.description}
        </p>

        {Object.keys(data.content).map((key) => {
          if (key !== "images_google_search") {
            return (
              <section key={key} aria-labelledby={key}>
                <h2 id={key} className="text-xl font-semibold mb-2" tabIndex={0}>
                  {key}
                </h2>
                <p
                  className="mb-4"
                  tabIndex={0}
                  dangerouslySetInnerHTML={{
                    __html: renderContent(data.content[key]) // Função para renderizar Markdown e LaTeX
                  }}
                ></p>
              </section>
            );
          }
        })}

        <div className="flex justify-center mb-10 pt-10">
          <img
            src={data.content.images_google_search.replace('<img href="', '').replace('">', '')}
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
          <FeedbackButton text="Não gostei do estilo" onClick={undefined} />
          <FeedbackButton text="Conteúdo incoerente" onClick={undefined} />
          <FeedbackButton text="Não correspondeu às expectativas" onClick={undefined} />
          <FeedbackButton text="Confuso" onClick={undefined} />
          <FeedbackButton text="Entediante" onClick={undefined} />
          <FeedbackButton text="Outro" onClick={() => setShowOtherFeedback(true)} />
        </div>

        {showOtherFeedback && (
          <div className="mt-4">
            <textarea
              value={otherFeedback}
              onChange={(e) => setOtherFeedback(e.target.value)}
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

// Função para renderizar Markdown e LaTeX
function renderContent(content: string) {
  // Primeiro, converter o markdown em HTML
  const markdownHtml = marked(content);

  // Renderizar expressões inline (entre '$' símbolos)
  const inlineLatexRenderedHtml = markdownHtml.replace(/\$(.+?)\$/g, (match, expr) => {
    return katex.renderToString(expr, { throwOnError: false, displayMode: false });
  });

  // Renderizar expressões de bloco (entre '$$' símbolos)
  const blockLatexRenderedHtml = inlineLatexRenderedHtml.replace(/\$\$(.+?)\$\$/g, (match, expr) => {
    return katex.renderToString(expr, { throwOnError: false, displayMode: true });
  });

  return blockLatexRenderedHtml;
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
