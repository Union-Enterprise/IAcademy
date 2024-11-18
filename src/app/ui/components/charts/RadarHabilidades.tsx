"use client";

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import { useUser } from "@/app/context/UserContext";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";


const chartConfig = {
  desktop: {
    label: "Pontuação",
    color: "#1865F2",
  },
} satisfies ChartConfig;

interface Skills {
  Calculos: number;
  Conhecimento: number;
  Criatividade: number;
  Raciocinio: number;
  Teoria: number;
  Texto: number;

}


export function RadarHabilidades() {
  const { user, isAuthenticated } = useUser();
  const { Calculos, Conhecimento, Criatividade, Raciocinio, Teoria, Texto } = user.skills ?? {};

  let chartData = [
    { skill: "Raciocínio lógico", desktop: Raciocinio },
    { skill: "Criatividade", desktop: Criatividade },
    { skill: "Conhecimento de Fórmulas", desktop: Conhecimento },
    { skill: "Interpretação de texto", desktop: Texto },
    { skill: "Teoria", desktop: Teoria },
    { skill: "Cálculos Avançados", desktop: Calculos },
  ];
  return (
    <Card className="p-0 m-0 *:p-0 *:m-0 bg-transparent shadow-none border-none">
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[500px] w-full"
        >
          <RadarChart data={chartData}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarGrid className="fill-[--color-desktop] opacity-20" />
            <PolarAngleAxis dataKey="skill" />
            <Radar
              dataKey="desktop"
              fill="var(--color-desktop)"
              fillOpacity={0.5}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
