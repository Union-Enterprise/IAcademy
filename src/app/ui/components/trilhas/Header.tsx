import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { usePathname } from "next/navigation";

interface HeaderProps {
  title?: string;
  description?: string;
  linkLabel?: string;
  hrefs?: string[];
}

export default function Header({
  title = "Preparando-se para os vestibulares",
  description = "Aprenda tudo que você precisa para passar nos vestibulares.",
  linkLabel = "Conteúdos",
  hrefs = ["/trilhas/overview", "/trilhas/modulos", "/trilhas"],
}: HeaderProps) {
  const pathname = usePathname();

  console.log(pathname);
  console.log(hrefs);

  return (
    <div className="h-fit flex flex-col justify-between px-[200px] pt-[60px] bg-bg-lightA gap-5">
      <div className="flex flex-col gap-3">
        <Link
          href={hrefs[2]}
          className="text-mainBlue opacity-60 hover:opacity-100 flex gap-2 items-center duration-100 w-fit mb-3"
        >
          <ArrowLeft />
          <p className="text-lg">Voltar</p>
        </Link>
        <h1 className="text-5xl font-bold text-title-light">{title}</h1>
        <p className="text-text-lightSub text-lg">{description}</p>
      </div>
      <div className="flex gap-4">
        <Link
          href={hrefs[0]}
          className={`${
            pathname.endsWith(hrefs[0].replaceAll(" ", "%20"))
              ? "border-b-mainBlue font-semibold"
              : "opacity-50 hover:opacity-100 hover:border-opacity-75 hover:border-b-mainBlue "
          } *:text-text-light border-b-2 p-2 text-lg duration-100`}
        >
          <p>Visão Geral</p>
        </Link>
        <Link
          href={hrefs[1]}
          className={`${
            pathname.endsWith(hrefs[1].replaceAll(" ", "%20"))
              ? "border-b-mainBlue font-semibold"
              : "opacity-50 hover:opacity-100 hover:border-opacity-75 hover:border-b-mainBlue "
          } *:text-text-light border-b-2 p-2 text-lg duration-100`}
        >
          <p>{linkLabel}</p>
        </Link>
        {/* <Link
          href={hrefs[2]}
          className={`${
            pathname.includes("/quizzes") || pathname.includes("/ Quizzes")
              ? "border-b-mainBlue font-semibold"
              : "opacity-50 hover:opacity-100 hover:border-opacity-75 hover:border-b-mainBlue "
          } *:text-text-light border-b-2 p-2 text-lg duration-100`}
        >
          <p>Quizzes</p>
        </Link> */}
      </div>
    </div>
  );
}
