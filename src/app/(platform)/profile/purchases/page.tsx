import Link from "next/link";
import { ChevronLeft, LaptopMinimal } from "lucide-react";
import SettingsSection from "@/app/ui/components/profile/SettingsSection";

export default function Purchases() {
  return (
    <>
      <Link
        href="/profile"
        className="*:text-mainBlue opacity-50 hover:opacity-100 flex gap-2 items-center duration-100 w-fit"
      >
        <ChevronLeft className="w-5 h-5" />
        <p className="text-lg">Voltar</p>
      </Link>
      <SettingsSection>
        <div className="flex items-center gap-5">
          <LaptopMinimal />
          <h3 className="font-bold text-xl">Minhas assinaturas</h3>
        </div>
        <div>
          <h4 className="text-title-light font-semibold">
            Você não possui nenhuma assinatura ativa no momento.
          </h4>
          <p className="text-text-lightSub mt-2">
            Assine o plano IAcademy premium e tenha benefícios exclusivos que te
            ajudarão na sua jornada de estudos.
          </p>
        </div>
        <Link
          href="/premium"
          className="text-white font-bold px-4 py-2 rounded-md bg-mainBlue opacity-80 hover:opacity-100 w-fit duration-100"
        >
          <p>Assinar agora</p>
        </Link>
      </SettingsSection>
    </>
  );
}
