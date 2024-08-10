import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function Signatures() {
  return (
    <>
      <Link
        href="/profile"
        className="*:text-mainBlue opacity-50 hover:opacity-100 flex gap-2 items-center duration-100 w-fit"
      >
        <ChevronLeft className="w-5 h-5" />
        <p className="text-lg">Voltar</p>
      </Link>
      <h1>Página de ver as assinaturas</h1>
    </>
  );
}
