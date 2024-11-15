"use client";

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { skill: "Raciocínio lógico", desktop: 21 },
  { skill: "Criatividade", desktop: 43 },
  { skill: "Gestão de tempo", desktop: 23 },
  { skill: "Interpretação de texto", desktop: 72 },
  { skill: "Aprendizado Contínuo", desktop: 41 },
  { skill: "Consistência", desktop: 74 },
];

const chartConfig = {
  desktop: {
    label: "Pontuação",
    color: "#1865F2",
  },
} satisfies ChartConfig;

export function RadarHabilidades() {
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
