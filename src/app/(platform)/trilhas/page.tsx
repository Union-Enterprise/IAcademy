import { Item } from "../../ui/components/ContentList";

export default function Trilhas() {
  return (
    <div className="mx-[32px] mt-[40px]">
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
            href="/trilhas/general"
            description="A geometria plana é um ramo fundamental da matemática que lida com as
          propriedades e relações de figuras em um plano bidimensional.
          Compreender a geometria plana é essencial não apenas para a matemática
          pura, mas também para a resolução de problemas práticos em diversas
          áreas, como arquitetura, engenharia e design. Aqui estão os principais
          conceitos e tópicos que nós vamos abordar sobre geometria plana:"
          />
          <Item />
          <Item />
          <Item />
          <Item />
        </div>
      </section>
    </div>
  );
}
