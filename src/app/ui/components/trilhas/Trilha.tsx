import Link from "next/link";

export default function Trilha({
  title,
  modulos,
  href,
  lucideIcon: LucideIcon,
}: {
  title: string;
  modulos: string[];
  href: string;
  lucideIcon: React.ElementType;
}) {
  return (
    <Link
      href={href}
      className="rounded-lg border-2 border-border-lightC shadow-md hover:border-mainBlue flex flex-col gap-5 p-5 w-full duration-100"
    >
      <div className="flex items-center gap-4 border-b-[1px] border-borders-lightA pb-2">
        {LucideIcon && (
          <LucideIcon
            size={40}
            className="flex-shrink-0 text-white bg-mainBlue p-2 rounded-full"
          />
        )}
        <h3 className="font-semibold text-xl text-text-light flex">
          {title}
        </h3>
      </div>
      <div className="grid grid-cols-2 grid-rows-3 gap-y-3">
        {modulos.map((modulo, index) => (
          <span key={index} className="text-text-lightSub">
            {modulo}
          </span>
        ))}
      </div>
    </Link>
  );
}

function Topicos({ modulos }: { modulos: string[] }) {
  return (
    <ul className="list-disc pl-5">
      {modulos?.map((modulo, index) => (
        <li key={index}>
          <Link href={`/modulos/${modulo.toLowerCase().replace(/ /g, "-")}`}>
            <span className="text-text-lightSub hover:underline">{modulo}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
