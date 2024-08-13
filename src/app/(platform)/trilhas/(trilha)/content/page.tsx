import Link from "next/link";
//fiz só a parte do texto sobre o plano premiun pq n sabia como fazer a parte de trilhas do plano premiun😭😭😭😭
// na paz irmao tamo junto !111!

export default function TrilhaContent() {
  return (
    <>
      <div className="">
        <h1 className="text-2xl font-bold mb-4">Geometria Espacial</h1>
        <p className="mb-4">
          A geometria espacial, também conhecida como geometria tridimensional,
          é a área da matemática que estuda as propriedades e relações de
          figuras no espaço tridimensional.
        </p>
        <p className="mb-4">
          Diferente da geometria plana, que trata de figuras bidimensionais como
          triângulos e círculos, a geometria espacial lida com sólidos e figuras
          que possuem três dimensões: comprimento, largura e altura.
        </p>
        <h2 className="text-xl font-semibold mb-2">
          Principais Conceitos da Geometria Espacial
        </h2>
        <ul className="list-disc list-inside mb-4">
          <li>
            <strong>Ponto:</strong> Indica uma posição no espaço e não possui
            dimensões.
          </li>
          <li>
            <strong>Linha:</strong> Conjunto infinito de pontos alinhados em uma
            única direção. Pode ser reta ou curva.
          </li>
          <li>
            <strong>Plano:</strong> Superfície bidimensional que se estende
            infinitamente em todas as direções.
          </li>
        </ul>
        <h2 className="text-xl font-semibold mb-2">Sólidos Geométricos</h2>
        <p className="mb-4">
          Os sólidos geométricos são as figuras tridimensionais estudadas na
          geometria espacial. Alguns exemplos comuns incluem:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>
            <strong>Cubo:</strong> Seis faces quadradas iguais, doze arestas e
            oito vértices.
          </li>
          <li>
            <strong>Paralelepípedo:</strong> Seis faces retangulares, doze
            arestas e oito vértices.
          </li>
          <li>
            <strong>Pirâmide:</strong> Base poligonal e faces triangulares que
            se encontram em um vértice comum. A mais comum é a pirâmide de base
            quadrada.
          </li>
          <li>
            <strong>Prisma:</strong> Duas bases poligonais paralelas e faces
            laterais retangulares.
          </li>
          <li>
            <strong>Cilindro:</strong> Duas bases circulares paralelas e uma
            superfície lateral curva.
          </li>
          <li>
            <strong>Cone:</strong> Base circular e uma superfície lateral que se
            afunila até um ponto (vértice).
          </li>
          <li>
            <strong>Esfera:</strong> Superfície totalmente curva onde todos os
            pontos estão a uma distância constante do centro.
          </li>
        </ul>
      </div>
      <div className="w-full bg-background-lightA p-5 rounded-md mt-5 shadow-md">
        <h2 className="text-xl font-semibold mb-4">Conte-nos o motivo:</h2>
        <div className="flex flex-wrap w-full justify-center gap-2">
          <FeedbackButton text="Não gostei do estilo" />
          <FeedbackButton text="Conteúdo incoerente" />
          <FeedbackButton text="Não correspondeu às expectativas" />
          <FeedbackButton text="Confuso" />
          <FeedbackButton text="Entediante" />
          <FeedbackButton text="Outro" />
        </div>
      </div>
    </>
  );
}

function FeedbackButton({ text = "Motivo aqui" }) {
  return (
    <button className="bg-background-lightB text-sm text-gray-800 px-8 py-3 rounded-md hover:bg-gray-300 duration-200">
      {text}
    </button>
  );
}
