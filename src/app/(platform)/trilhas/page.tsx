import { Item } from "../../ui/components/ContentList";
import {
  Box,
  CircleAlert,
  Cone,
  Cuboid,
  Diameter,
  TriangleRight,
  Brain,
  Percent,
} from "lucide-react";

import Trilha from "@/app/ui/components/trilhas/Trilha";

export default function Trilhas() {
  return (
    <div className="p-8">
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
        <div className="grid grid-cols-3 gap-5">
          <Trilha
            lucideIcon={Cone}
            title="Preparando-se para os vestibulares"
            href="/trilhas/overview"
            modulos={[
              "Estatística",
              "Geometria",
              "Medidas e Trigonometria",
              "Probabilidade",
              "Álgebra 1",
              "Álgebra 2",
            ]}
          />
          <Trilha
            lucideIcon={Cone}
            title="Base Nacional Comum Curricular (BNCC)"
            href="/trilhas/overview"
            modulos={[
              "Estatística",
              "Geometria",
              "Medidas e Trigonometria",
              "Probabilidade",
              "Álgebra 1",
              "Álgebra 2",
            ]}
          />
          <Trilha
            lucideIcon={Cone}
            title="Matemática Competitiva"
            href="/trilhas/overview"
            modulos={[
              "Estatística",
              "Geometria",
              "Medidas e Trigonometria",
              "Probabilidade",
              "Álgebra 1",
              "Álgebra 2",
            ]}
          />
        </div>
      </section>
    </div>
  );
}
