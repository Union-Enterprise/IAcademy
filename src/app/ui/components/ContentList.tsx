import Link from "next/link";

export default function ContentList({ title = "" }) {
  return (
    <section className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h5 className="text-xl font-bold">{title}</h5>
        <p className="text-blue-500">Ver todos &gt;</p>
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
    <div className="flex flex-col justify-between p-5 rounded-md w-full h-[200px] border-whiteBorder border-2">
      <div>
        <h6 className="font-bold text-lg text-whiteText mb-1">Geometria</h6>
        <p className="text-sm text-[rgba(0,0,0,0.4)]">
          00/00 tópicos estudados
        </p>
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
      className="hover:border-mainBlue flex flex-col justify-between p-5 rounded-md w-full min-h-[250px] duration-100 border-whiteBorder border-2 gap-4"
    >
      <div>
        <h6 className="font-bold text-lg text-whiteText">Geometria</h6>
        <p className="text-sm text-[rgba(0,0,0,0.4)]">
          00/00 tópicos estudados
        </p>
      </div>
      <p className="text-sm leading-6 justify-items-end flex">{description}</p>
      <div className="flex gap-2 *:text-sm overflow-hidden">
        <Tag name="Intermediário" />
        <Tag name="Geometria" />
        <Tag name="Matemática" />
      </div>
    </Link>
  );
}

function Tag({ name = "" }) {
  return (
    <div className="flex justify-center items-center rounded-md px-[15px] border-whiteBorder border-2">
      <p className="whitespace-nowrap">{name}</p>
    </div>
  );
}
