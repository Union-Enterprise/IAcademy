"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function Topico() {
  const [showOtherFeedback, setShowOtherFeedback] = useState(false);
  const [otherFeedback, setOtherFeedback] = useState("");

  const handleOtherFeedbackSubmit = () => {
    console.log("Feedback enviado:", otherFeedback);
    setOtherFeedback("");
    setShowOtherFeedback(false);
  };

  return (
    <div>
      <article aria-live="polite">
        <h1 className="text-2xl font-bold mb-4" tabIndex={0}>
          Geometria Espacial
        </h1>
        <p className="mb-4" tabIndex={0}>
          A geometria espacial, também conhecida como geometria tridimensional,
          é a área da matemática que estuda as propriedades e relações de
          figuras no espaço tridimensional.
        </p>
        <p className="mb-4" tabIndex={0}>
          Diferente da geometria plana, que trata de figuras bidimensionais como
          triângulos e círculos, a geometria espacial lida com sólidos e figuras
          que possuem três dimensões: comprimento, largura e altura.
        </p>
        <section aria-labelledby="principais-conceitos">
          <h2
            id="principais-conceitos"
            className="text-xl font-semibold mb-2"
            tabIndex={0}
          >
            Principais Conceitos da Geometria Espacial
          </h2>
          <div className="flex justify-center mb-10 pt-10">
            <img 
              src="https://static.mundoeducacao.uol.com.br/mundoeducacao/2022/07/principais-prismas.jpg" 
              alt="Ícone representando a geometria espacial, com formas tridimensionais em destaque" 
              tabIndex={0}
            />
          </div>
          <ul className="list-disc list-inside mb-4">
            <li tabIndex={0}>
              <strong>Ponto:</strong> Indica uma posição no espaço e não possui
              dimensões.
            </li>
            <li tabIndex={0}>
              <strong>Linha:</strong> Conjunto infinito de pontos alinhados em
              uma única direção. Pode ser reta ou curva.
            </li>
            <li tabIndex={0}>
              <strong>Plano:</strong> Superfície bidimensional que se estende
              infinitamente em todas as direções.
            </li>
          </ul>
        </section>
        <section aria-labelledby="solidos-geometricos">
          <h2
            id="solidos-geometricos"
            className="text-xl font-semibold mb-2"
            tabIndex={0}
          >
            Sólidos Geométricos
          </h2>
          <p className="mb-4" tabIndex={0}>
            Os sólidos geométricos são as figuras tridimensionais estudadas na
            geometria espacial. Alguns exemplos comuns incluem:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li tabIndex={0}>
              <strong>Cubo:</strong> Seis faces quadradas iguais, doze arestas e
              oito vértices.
            </li>
            <li tabIndex={0}>
              <strong>Paralelepípedo:</strong> Seis faces retangulares, doze
              arestas e oito vértices.
            </li>
            <li tabIndex={0}>
              <strong>Pirâmide:</strong> Base poligonal e faces triangulares que
              se encontram em um vértice comum. A mais comum é a pirâmide de
              base quadrada.
            </li>
            <li tabIndex={0}>
              <strong>Prisma:</strong> Duas bases poligonais paralelas e faces
              laterais retangulares.
            </li>
            <li tabIndex={0}>
              <strong>Cilindro:</strong> Duas bases circulares paralelas e uma
              superfície lateral curva.
            </li>
            <li tabIndex={0}>
              <strong>Cone:</strong> Base circular e uma superfície lateral que
              se afunila até um ponto (vértice).
            </li>
            <li tabIndex={0}>
              <strong>Esfera:</strong> Superfície totalmente curva onde todos os
              pontos estão a uma distância constante do centro.
            </li>
          </ul>
        </section>
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
