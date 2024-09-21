"use client";

import { TrendingUp } from "lucide-react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A radar chart with a grid filled";

const chartData = [
  { month: "Skill", desktop: 186 },
  { month: "Skill 1", desktop: 285 },
  { month: "Skill 2", desktop: 237 },
  { month: "Skill 3", desktop: 203 },
  { month: "Skill 4", desktop: 209 },
  { month: "Skill 5", desktop: 264 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#1865F2",
  },
} satisfies ChartConfig;

export function Fifagrafico() {
  return (
    <Card className="h-full">
      <CardHeader className="items-center pb-4">
        <CardTitle className="text-xl">Radar de habilidades</CardTitle>
        <CardDescription>Visualize seus pontos fortes e fracos</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-h-[350px]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarGrid className="fill-[--color-desktop] opacity-20" />
            <PolarAngleAxis dataKey="month" />
            <Radar
              dataKey="desktop"
              fill="var(--color-desktop)"
              fillOpacity={0.5}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Uma melhoria de x.y% neste mês <TrendingUp className="h-4 w-4" />
        </div>
        <div className="flex items-center gap-2 leading-none text-muted-foreground">
          Jane - June 2024
        </div>
      </CardFooter> */}
    </Card>
  );
}
