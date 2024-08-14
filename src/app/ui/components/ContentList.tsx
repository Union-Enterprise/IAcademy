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

function Item() {
  return (
    <div className="flex flex-col justify-between p-5 rounded-md w-full h-[200px] border-border-light shadow-sm border-2">
      <div>
        <h6 className="font-bold text-lg text-title-light mb-1">Geometria</h6>
        <p className="text-sm text-text-lightSub">00/00 tópicos estudados</p>
      </div>
      <div className="flex gap-2 *:text-sm overflow-hidden">
        <Tag name="Intermediário" />
        <Tag name="Geometria" />
        <Tag name="Matemática" />
      </div>
    </div>
  );
}

export function Trail({ description = "", href = "" }) {
  return (
    <Link
      href={href}
      className="hover:border-mainBlue flex flex-col justify-between p-5 rounded-md w-full min-h-[250px] duration-100 border-border-light border-2 gap-4"
    >
      <div>
        <h6 className="font-bold text-lg text-text-light">Geometria</h6>
        <p className="text-sm text-text-lightSub">00/00 tópicos estudados</p>
      </div>
      <p className="text-sm text-text-light leading-6 justify-items-end flex">
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
