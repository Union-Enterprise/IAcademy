"use client";

import { useState, useEffect } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip, Cell } from "recharts";

const chartData = [
  { month: "Janeiro", "frequencia de estudos": 86 },
  { month: "Fevereiro", "frequencia de estudos": 285 },
  { month: "Março", "frequencia de estudos": 297 },
  { month: "Abril", "frequencia de estudos": 203 },
  { month: "Maio", "frequencia de estudos": 209 },
  { month: "Junho", "frequencia de estudos": 264 },
  { month: "Julho", "frequencia de estudos": 214 },
  { month: "Agosto", "frequencia de estudos": 234 },
  { month: "Setembro", "frequencia de estudos": 264 },
  { month: "Outubro", "frequencia de estudos": 204 },
  { month: "Novembro", "frequencia de estudos": 264 },
  { month: "Dezembro", "frequencia de estudos": 304 },
];

export default function Component() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const getBarColor = (value: number) => {
    return value > 250 ? "#FF5733" : "#1865F2";
  };


  return (
    <div className="p-4">
      <div className="pb-0">
        <div className="mx-auto">
          <BarChart width={700} height={300} data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={true}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <Tooltip />
            <Bar dataKey="frequencia de estudos" radius={5} barSize={20}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry["frequencia de estudos"])} />
              ))}
            </Bar>
          </BarChart>
        </div>
      </div>
    </div>
  );
}
