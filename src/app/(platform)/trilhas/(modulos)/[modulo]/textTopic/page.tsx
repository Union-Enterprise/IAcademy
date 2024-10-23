"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function Topic() {
  const [showOtherFeedback, setShowOtherFeedback] = useState(false);
  const [otherFeedback, setOtherFeedback] = useState("");

  const handleOtherFeedbackSubmit = () => {
    // Aqui você pode adicionar a lógica para enviar o feedback
    console.log("Feedback enviado:", otherFeedback);
    setOtherFeedback("");
    setShowOtherFeedback(false);
  };

  return (
    <>
      <div className="pl-10 bg-bg-lightA mt-12">
        {/* <Link
            href="/trilhas/modulos"
            className="text-mainBlue opacity-60 hover:opacity-100 flex gap-2 items-center duration-100 w-fit mb-3"
            aria-label="Voltar para o conteúdo de trilhas"
          >
            <ArrowLeft />
            <p className="text-lg">Voltar</p>
          </Link> */}
        <article aria-live="polite">
          <h1 className="text-2xl font-bold mb-4" tabIndex={0}>Estatística</h1>
          <p className="mb-4" tabIndex={0}>
            A estatística é uma disciplina que se dedica à coleta, análise e interpretação de dados. Ela é fundamental para a tomada de decisões informadas em diversas áreas, como ciência, economia e saúde.
          </p>
          <p className="mb-4" tabIndex={0}>
            Dividida em estatística descritiva e inferencial, essa área permite não apenas resumir dados, mas também fazer generalizações sobre populações maiores com base em amostras.
          </p>
          <section aria-labelledby="tipos-estatistica">
            <h2 id="tipos-estatistica" className="text-xl font-semibold mb-2" tabIndex={0}>
              Tipos de Estatística
            </h2>
            <p className="mb-4" tabIndex={0}>
              A estatística descritiva foca em resumir características de um conjunto de dados, enquanto a estatística inferencial utiliza amostras para fazer previsões sobre uma população maior.
            </p>
          </section>
          <section aria-labelledby="medidas-estatisticas">
            <h2 id="medidas-estatisticas" className="text-xl font-semibold mb-2" tabIndex={0}>
              Medidas Estatísticas
            </h2>
            <p className="mb-4" tabIndex={0}>
              Algumas das principais medidas utilizadas na estatística incluem:
            </p>
            <ul className="list-disc list-inside mb-4">
              <li tabIndex={0}>
                <strong>Média:</strong> A soma de todos os valores dividida pelo número de observações, representando a tendência central.
              </li>
              <li tabIndex={0}>
                <strong>Mediana:</strong> O valor que divide o conjunto de dados em duas partes iguais.
              </li>
              <li tabIndex={0}>
                <strong>Moda:</strong> O valor que aparece com mais frequência em um conjunto de dados.
              </li>
            </ul>
          </section>
          <section aria-labelledby="visualizacao-dados">
            <h2 id="visualizacao-dados" className="text-xl font-semibold mb-2" tabIndex={0}>
              Visualização de Dados
            </h2>
            <p className="mb-4" tabIndex={0}>
              A visualização de dados é crucial para facilitar a compreensão. Gráficos, como histogramas e gráficos de barras, ajudam a ilustrar tendências e comparações de forma clara.
            </p>
          </section>
          <section aria-labelledby="aplicacoes-estatistica">
            <h2 id="aplicacoes-estatistica" className="text-xl font-semibold mb-2" tabIndex={0}>
              Aplicações da Estatística
            </h2>
            <p className="mb-4" tabIndex={0}>
              A estatística é amplamente utilizada em várias áreas, como na saúde para a análise de ensaios clínicos e na economia para prever tendências de mercado. Ela também é vital nas ciências sociais, onde ajuda a entender comportamentos e opiniões.
            </p>
          </section>
        </article>
        <div className="w-full bg-bg-lightA p-5 rounded-md mt-5 shadow-md">
          <h2 className="text-xl font-semibold mb-4" tabIndex={0}>Conte-nos o motivo:</h2>
          <div className="flex flex-wrap w-full justify-center gap-2">
            <FeedbackButton text="Não gostei do estilo" onClick={undefined} />
            <FeedbackButton text="Conteúdo incoerente" onClick={undefined} />
            <FeedbackButton text="Não correspondeu às expectativas" onClick={undefined} />
            <FeedbackButton text="Confuso" onClick={undefined} />
            <FeedbackButton text="Entediante" onClick={undefined} />
            <FeedbackButton text="Outro" onClick={() => setShowOtherFeedback(true)} />
          </div>

          {showOtherFeedback && (
            <div className="mt-4">
              <input
                type="text"
                value={otherFeedback}
                onChange={(e) => setOtherFeedback(e.target.value)}
                placeholder="Seu feedback aqui"
                className="border border-gray-300 rounded-md p-2 w-full focus:border-mainBlue"
              />
              <button
                onClick={handleOtherFeedbackSubmit}
                className="bg-mainBlue text-white px-4 py-2 rounded-md mt-2"
              >
                Enviar
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
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
