"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

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
const chartData = [
  { componente: "topicos", conteudos: 15, fill: "#1865F2" },
  { componente: "simulados", conteudos: 2, fill: "#C7CEDB" },
];

const chartConfig = {
  conteudos: {
    label: "conteudos",
  },
  topicos: {
    label: "Tópicos",
    color: "hsl(var(--chart-1))",
  },
  modulos: {
    label: "Módulos",
    color: "hsl(var(--chart-2))",
  },
  simulados: {
    label: "Simulados",
    color: "hsl(var(--chart-4))",
  },
  unidades: {
    label: "Unidades",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function AproveitamentoChart() {
  const totalconteudos = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.conteudos, 0);
  }, []);
  return (
    <Card className="flex flex-col p-0 m-0 bg-none shadow-none border-none *:m-0 *:p-0">
      <CardHeader className="pb-0">
        <CardTitle className="font-semibold text-lg">
          Seu aproveitamento de estudos
        </CardTitle>
        <CardDescription className="text-center mx-14">
          Quanto dos conteúdos da plataforma você já utilizou Em porcentagem %
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="conteudos"
              nameKey="componente"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalconteudos.toLocaleString() + "%"}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Aproveitamento
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total conteudos for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  );
}
