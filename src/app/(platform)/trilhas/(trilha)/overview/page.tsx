import { Home, List, Clock } from "lucide-react";
import { OverviewSection } from "@/app/ui/trilha/TrilhaSection";

export default function TrilhaGeneral() {
  return (
    <>
      <OverviewSection title="Detalhes da Trilha">
        <div className="grid grid-cols-2 gap-3">
          <DetailItem label="Nível de dificuldade" value="Básico" />
          <DetailItem
            label="Atividades"
            value="6 tópicos e 2 quizzes"
            LucideIcon={List}
          />
          <DetailItem
            label="Duração média"
            value="2 horas"
            LucideIcon={Clock}
          />
        </div>
      </OverviewSection>
      <OverviewSection title="Sobre a Trilha">
        <p>Nessa trilha você irá aprender os conceitos de...</p>
      </OverviewSection>
    </>
  );
}

function DetailItem({
  label = "",
  value = "",
  LucideIcon = Home,
}: {
  label: string;
  value: string;
  LucideIcon?: typeof Home;
}) {
  return (
    <div className="flex gap-5 col-span-1">
      <LucideIcon
        size={40}
        className="bg-background-lightHover text-text-lightSub rounded-xl p-2"
      />
      <div>
        <p className="text-xs text-text-lightSub">{label}</p>
        <h4 className="text-sm text-text-light font-semibold">{value}</h4>
      </div>
    </div>
  );
}
