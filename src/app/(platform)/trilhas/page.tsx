import { Item } from "../../ui/components/ContentList";

export default function Trilhas() {
  return (
    <div className="mx-[100px] mt-[40px] mb-[140px]">
      <h1 className="text-3xl font-bold mb-5">Trilhas de Aprendizado</h1>
      <div className="flex flex-col gap-5 mb-8 bg-mainBlue px-[32px] py-[60px] rounded-lg *:text-white">
        <h2 className="text-2xl font-bold">Aprendizado rápido e organizado</h2>
        <p className="max-w-3xl text-text-light">
          Descubra o universo da matemática com nosso catálogo de trilhas.
          Navegue por uma coleção de tópicos essenciais para os vestibulares e
          mergulhe em conteúdos feitos para expandir seus conhecimentos.
        </p>
      </div>

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-title-light">Matemática</h2>
        <div className="grid grid-cols-4 gap-5">
          <Item
            title="Geometria"
            href="/trilhas/overview"
            description="A geometria plana é um ramo fundamental da matemática que lida com as
            propriedades e relações de figuras em um plano bidimensional.
            Compreender a geometria plana é essencial não apenas para a matemática
            pura, mas também para a resolução de problemas práticos em diversas
            áreas, como arquitetura, engenharia e design."
          />

          <Item
            title="Geometria plana"
            href="/trilhas/overview"
            description="Geometria plana estuda figuras bidimensionais, 
            como triângulos, quadriláteros e círculos.
             Ela se baseia em conceitos de pontos, 
             linhas e ângulos. Triângulos são classificados por lados e ângulos,
              enquanto quadriláteros incluem formas como quadrados e retângulos.
              Círculos envolvem conceitos de raio, diâmetro e área.
              A geometria plana também abrange perímetro,
               área e o Teorema de Pitágoras, que relaciona os lados de triângulos retângulos."
          />

          <Item
            title="Geometria Analitica"
            href="/trilhas/overview"
            description="Geometria analítica é o estudo das figuras geométricas usando um sistema de coordenadas,
              como o plano cartesiano.
              Ela combina álgebra e geometria para analisar pontos, retas, curvas e suas propriedades.
              Com ferramentas como a equação da reta, a fórmula da distância entre dois pontos e a equação das cônicas (circunferências, parábolas, elipses e hipérboles),
              a geometria analítica permite resolver problemas geométricos de forma precisa e algébrica.
              É uma área fundamental para a matemática e para a compreensão de diversas aplicações científicas e tecnológicas."
          />

          <Item
            title="Geometria não euclidiana"
            href="/trilhas/overview"
            description="Geometria não-euclidiana explora sistemas geométricos que não seguem o quinto postulado de Euclides, 
            que afirma que, para um ponto fora de uma linha, há exatamente uma linha paralela à linha dada passando pelo ponto.
            Em vez disso, a geometria não-euclidiana considera alternativas, como a geometria hiperbólica,
            onde existem infinitas linhas paralelas, e a geometria elíptica, onde todas as linhas se encontram eventualmente.
            Essas abordagens são essenciais para compreender espaços curvos e têm aplicações significativas em teorias físicas e outras áreas da ciência."
          />

          <Item
            title="Geometria Algébrica"
            href="/trilhas/overview"
            description="Geometria algébrica é o estudo das figuras geométricas definidas por equações polinomiais.
            Ela explora a relação entre álgebra e geometria ao analisar conjuntos de soluções de equações algébricas e suas propriedades geométricas.
            Esse ramo é essencial para entender a forma e a estrutura de curvas e superfícies no espaço, e é amplamente utilizado em matemática pura, 
            física teórica e em diversas áreas da ciência e engenharia."
          />

          <Item
            title="Geometria Fractal"
            href="/trilhas/overview"
            description="Geometria fractal estuda formas que se repetem em diferentes escalas,
            exibindo auto-semelhança. Esses padrões complexos são usados para modelar fenômenos naturais e têm dimensões fracionárias.
            Fractais ajudam a entender e representar a complexidade na natureza e em sistemas artificiais."
          />

          <Item
            title="Topologia"
            href="/trilhas/overview"
            description="Topologia é o ramo da matemática que estuda as propriedades dos espaços que permanecem invariantes sob deformações contínuas,
             como esticar ou dobrar, mas sem rasgar ou colar. Em vez de se preocupar com medidas precisas e distâncias, 
             a topologia foca em conceitos como conectividade e limites. 
             É essencial para entender a estrutura de formas e espaços complexos e tem aplicações em várias áreas, incluindo física,
             biologia e ciência da computação."
          />

          <Item
            title="Geometria do Espaço tempo"
            href="/trilhas/overview"
            description="Geometria do espaço-tempo combina espaço e tempo em uma única entidade de quatro dimensões.
            É fundamental para a teoria da relatividade, que descreve como a gravidade resulta da curvatura do espaço-tempo causada pela massa e energia. 
            Essa abordagem altera nossa compreensão de gravidade e tem aplicações importantes na cosmologia e astrofísica."
          />
        </div>
      </section>
    </div>
  );
}
