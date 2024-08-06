import Link from "next/link";
//fiz só a parte do texto sobre o plano premiun pq n sabia como fazer a parte de trilhas do plano premiun😭😭😭😭

export default function Premium() {
    return  (
      <div className="max-h-screen  p-6">
        <title>Geometria Espacial</title>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2  p-8 rounded-lg sh">
            <h1 className="text-2xl font-bold mb-4">Geometria Espacial</h1>
            <p className="mb-4">
              A geometria espacial, também conhecida como geometria tridimensional, é a área
              da matemática que estuda as propriedades e relações de figuras no espaço
              tridimensional.
            </p>
            <p className="mb-4">
              Diferente da geometria plana, que trata de figuras bidimensionais como triângulos e círculos, a
              geometria espacial lida com sólidos e figuras que possuem três dimensões: comprimento, largura e
              altura.
            </p>
            <h2 className="text-xl font-semibold mb-2">Principais Conceitos da Geometria Espacial</h2>
            <ul className="list-disc list-inside mb-4">
              <li><strong>Ponto:</strong> Indica uma posição no espaço e não possui dimensões.</li>
              <li><strong>Linha:</strong> Conjunto infinito de pontos alinhados em uma única direção. Pode ser reta ou curva.</li>
              <li><strong>Plano:</strong> Superfície bidimensional que se estende infinitamente em todas as direções.</li>
            </ul>
            <h2 className="text-xl font-semibold mb-2">Sólidos Geométricos</h2>
            <p className="mb-4">
              Os sólidos geométricos são as figuras tridimensionais estudadas na geometria espacial. Alguns
              exemplos comuns incluem:
            </p>
            <ul className="list-disc list-inside mb-4">
              <li><strong>Cubo:</strong> Seis faces quadradas iguais, doze arestas e oito vértices.</li>
              <li><strong>Paralelepípedo:</strong> Seis faces retangulares, doze arestas e oito vértices.</li>
              <li><strong>Pirâmide:</strong> Base poligonal e faces triangulares que se encontram em um vértice comum. A mais comum
                é a pirâmide de base quadrada.</li>
              <li><strong>Prisma:</strong> Duas bases poligonais paralelas e faces laterais retangulares.</li>
              <li><strong>Cilindro:</strong> Duas bases circulares paralelas e uma superfície lateral curva.</li>
              <li><strong>Cone:</strong> Base circular e uma superfície lateral que se afunila até um ponto (vértice).</li>
              <li><strong>Esfera:</strong> Superfície totalmente curva onde todos os pontos estão a uma distância constante do centro.</li>
            </ul>
          </div>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Premium</h2>
              <p className="mb-4">
                Estude sem preocupações ou distrações a qualquer momento.
              </p>
              <button className="w-full bg-mainBlue text-white py-2 rounded-md hover:bg-mainBlue">Assinar</button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Pergunte à IA</h2>
              <p className="mb-4">
                Ficou com dúvida em alguma parte desse conteúdo? Basta digitar logo abaixo.
              </p>
              <textarea
                className="w-full border border-gray-300 rounded-md p-2 mb-4"
                placeholder="Escreva sua pergunta"
              ></textarea>
              <button className="w-full bg-mainBlue text-white py-2 rounded-md hover:bg-blue-600">Enviar</button>
            </div>
          </div>
        </div>
        <div className="max-w mx-auto bg-white  rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Conte-nos o motivo:</h2>
        <div className="flex gap-2">
          <button className="w-full bg-gray-200 text-gray-800 py-1 rounded-md hover:bg-gray-300">Não gostei do estilo</button>
          <button className="w-full bg-gray-200 text-gray-800 py-1 rounded-md hover:bg-gray-300">Conteúdo incoerente</button>
          <button className="w-full bg-gray-200 text-gray-800 py-1 rounded-md hover:bg-gray-300">Não correspondeu às expectativas</button>
          <button className="w-full bg-gray-200 text-gray-800 py-1 rounded-md hover:bg-gray-300">Confuso</button>
          <button className="w-full bg-gray-200 text-gray-800 py-1 rounded-md hover:bg-gray-300">Outro</button>
        </div>
      </div>
      </div>
  
  );
}
