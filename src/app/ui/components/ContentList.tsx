import Link from "next/link";

export default function ContentList({ title = "" }) {
  return (
    <section className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h5 className="text-xl font-bold text-title-light">{title}</h5>
        <button className="cursor-pointer text-blue-400 hover:text-mainBlue duration-100">
          Ver todos &gt;
        </button>
      </div>
      <div className="grid grid-cols-3 gap-5">
        <Item />
        <Item />
        <Item />
      </div>
    </section>
  );
}

export function Item({
  title = "Título aqui",
  description = "Descrição",
  href = "",
}) {
  return (
    <Link
      href={href}
      className="rounded-xl border-2 border-border-lightC shadow-md hover:border-mainBlue flex flex-col justify-between p-5 w-full min-h-[250px] duration-100 gap-4"
    >
      <div>
        <h6 className="font-bold text-lg text-text-light">{title}</h6>
        <p className="text-sm text-text-lightSub">00/00 tópicos estudados</p>
      </div>
      <p className="text-sm text-text-lightSub leading-6 justify-items-end flex h-[100px] overflow-hidden">
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
