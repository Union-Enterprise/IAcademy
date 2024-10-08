import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <div className="h-[30vh] flex flex-col justify-between px-[200px] pt-[60px] bg-bg-lightA">
      <div className="flex flex-col gap-3">
        <Link
          href="/trilhas"
          className="text-mainBlue opacity-60 hover:opacity-100 flex gap-2 items-center duration-100 w-fit mb-3"
        >
          <ArrowLeft />
          <p className="text-lg">Voltar</p>
        </Link>
        <h1 className="text-5xl font-bold text-title-light">
          Geometria
        </h1>
        <p className="text-text-lightSub text-lg">
          Aprenda tudo que você precisa para passar nos vestibulares.
        </p>
      </div>
      
    </div>
  );
}
