"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
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
  { date: "2024-11-21", topicos: 2, atividades: 1 },
  { date: "2024-11-22", topicos: 0, atividades: 2 },
  { date: "2024-11-23", topicos: 0, atividades: 3 },
  { date: "2024-11-24", topicos: 1, atividades: 0 },
  { date: "2024-11-25", topicos: 3, atividades: 1 },
  { date: "2024-11-26", topicos: 0, atividades: 1 },
  { date: "2024-11-27", topicos: 5, atividades: 2 },
  { date: "2024-11-28", topicos: 1, atividades: 0 },
  { date: "2024-11-29", topicos: 1, atividades: 4 },
  { date: "2024-11-30", topicos: 2, atividades: 0 },
  { date: "2024-11-31", topicos: 1, atividades: 1 },
  { date: "2024-11-01", topicos: 4, atividades: 0 },
  { date: "2024-11-02", topicos: 4, atividades: 0 },
  { date: "2024-11-03", topicos: 8, atividades: 0 },
  { date: "2024-11-04", topicos: 11, atividades: 5 },
  { date: "2024-11-05", topicos: 1, atividades: 2 },
  { date: "2024-11-06", topicos: 1, atividades: 0 },
  { date: "2024-11-07", topicos: 1, atividades: 3 },
  { date: "2024-11-08", topicos: 2, atividades: 3 },
  { date: "2024-11-09", topicos: 8, atividades: 0 },
  { date: "2024-11-10", topicos: 9, atividades: 1 },
  { date: "2024-11-11", topicos: 8, atividades: 0 },
  { date: "2024-11-12", topicos: 5, atividades: 2 },
  { date: "2024-11-13", topicos: 2, atividades: 0 },
  { date: "2024-11-14", topicos: 1, atividades: 0 },
  { date: "2024-11-15", topicos: 2, atividades: 1 },
  { date: "2024-11-16", topicos: 4, atividades: 2 },
  { date: "2024-11-17", topicos: 9, atividades: 5 },
  { date: "2024-11-18", topicos: 8, atividades: 4 },
  { date: "2024-11-19", topicos: 6, atividades: 3 },
  { date: "2024-11-20", topicos: 3, atividades: 0 },
  { date: "2024-11-21", topicos: 3, atividades: 1 },
  { date: "2024-11-22", topicos: 2, atividades: 2 },
];

const chartConfig = {
  interacoes: {
    label: "Interações",
  },
  topicos: {
    label: "Tópicos estudados",
    color: "#1865F2",
  },
  atividades: {
    label: "Atividades realizadas",
    color: "#438FFB",
  },
} satisfies ChartConfig;

export function AtividadesChart() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("topicos");

  const total = React.useMemo(
    () => ({
      topicos: chartData.reduce((acc, curr) => acc + curr.topicos, 0),
      atividades: chartData.reduce((acc, curr) => acc + curr.atividades, 0),
    }),
    []
  );

  return (
    <Card className="w-full border-none bg-none shadow-none rounded-xl overflow-hidden">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle className="font-semibold text-lg">
            Suas atividades - Mês
          </CardTitle>
          <CardDescription>
            Todas as suas interações com a plataforma neste mês
          </CardDescription>
        </div>
        <div className="flex">
          {["topicos", "atividades"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("pt-BR", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="interacoes"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("pt-BR", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
