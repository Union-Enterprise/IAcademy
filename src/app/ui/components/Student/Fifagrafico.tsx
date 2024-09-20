import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A radar chart with a grid filled"

const chartData = [
  { month: "Fatorial", desktop: 186 },
  { month: "Geometria", desktop: 285 },
  { month: "Matematia basica", desktop: 237 },
  { month: "Geometria plana", desktop: 203 },
  { month: "Algebra", desktop: 209 },
  { month: "Geometria analitica", desktop: 264 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export default function Fifagrafico() {
  return (
    <Card>
      <CardHeader className="items-center ">
        <CardTitle>Estatistica de estudos</CardTitle>
        <CardDescription>
          grafico das materias que foi desenvolvida melhor
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0 ">
        <ChartContainer
          config={chartConfig}
          className="aspect-square max-h-[250px] w-[400px] "
        >
          <RadarChart data={chartData}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarGrid className="fill-mainBlue opacity-30 " />
            <PolarAngleAxis
              dataKey="month"
              tick={{ fontSize: 10, fill: "#333" }} 
            />
            <Radar
              dataKey="desktop"
              fill="#1865F2"
              fillOpacity={0.5}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
