import Link from "next/link";
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

export default function ContentList({ title = "" }: { title: string }) {
  return (
    <section className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h5 className="text-xl font-bold text-title-light">{title}</h5>
        <button className="cursor-pointer text-blue-400 hover:text-mainBlue duration-100">
          Ver todos &gt;
        </button>
      </div>
      <div className="grid grid-cols-3 gap-5">
        <Item
          title="Geometria Plana"
          href="/trilhas/overview"
          lucideIcon={Cone}
          description="Geometria Plana explora figuras bidimensionais, como triângulos, círculos e quadrados, ajudando a calcular perímetros, áreas e ângulos."
        />

        <Item
          title="Fatorial"
          href="/trilhas/overview"
          lucideIcon={CircleAlert}
          description="O fatorial é amplamente utilizado em combinatória, probabilidade e em várias áreas da matemática para calcular o número de permutações."
        />

        <Item
          title="Raciocínio Lógico"
          href="/trilhas/overview"
          lucideIcon={Brain}
          description="Raciocínio lógico é a habilidade de pensar de forma clara e resolver problemas, usando dedução e indução para chegar a conclusões. É essencial em matemática e na vida cotidiana."
        />
      </div>
    </section>
  );
}

export function Item({
  title = "Título aqui",
  description = "Descrição",
  href = "",
  lucideIcon: LucideIcon,
}: {
  title: string;
  description: string;
  href: string;
  lucideIcon: React.ElementType;
}) {
  return (
    <Link
      href={href}
      className="rounded-xl border-2 border-border-lightC shadow-md hover:border-mainBlue hover:text-mainBlue flex flex-col justify-between p-5 w-full min-h-[250px] duration-100 gap-4"
    >
      <div>
        <div className="flex gap-2">
          {LucideIcon && <LucideIcon size={25} className="flex-shrink-0" />}
          <h6 className="font-bold text-lg text-text-light flex">{title}</h6>
        </div>
        <p className="text-sm text-text-lightSub">00/00 tópicos estudados</p>
      </div>
      <p className="text-sm text-text-lightSub leading-6 justify-items-end flex h-[75px] overflow-hidden">
        {description}
      </p>
      <div className="flex gap-2 *:text-sm overflow-hidden">
        <Tag name="Intermediário" />
        <Tag name="Geometria" />
        <Tag name="Matemática" />
      </div>
    </Link>
  );
}

export function Tag({ name = "" }) {
  return (
    <div className="flex justify-center items-center rounded-md px-[15px] border-border-light border-2">
      <p className="whitespace-nowrap text-text-lightSub">{name}</p>
    </div>
  );
}
