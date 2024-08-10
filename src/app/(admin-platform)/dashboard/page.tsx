"use client";

import StatResume from "@/app/ui/components/adminUtils/StatResume";
import { FilePlus } from "lucide-react";
import LineChart from "@/app/ui/components/adminUtils/charts/LineChart";
import LineChartStepped from "@/app/ui/components/adminUtils/charts/LineChartStepped";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          type="submit"
          className="bg-mainBlue bg-opacity-90 px-5 py-[10px] rounded-md hover:bg-opacity-100 duration-100 *:text-white flex items-center gap-2"
        >
          <FilePlus />
          <p className="font-bold">Gerar relatório PDF</p>
        </button>
      </div>
      <div className="grid grid-cols-3 gap-5">
        <StatResume />
        <StatResume />
        <StatResume />
      </div>
      <div className="grid grid-cols-3 h-[500px] gap-5 mt-5">
        <div className="col-span-2 rounded-md border-2 border-whiteBorder bg-secondaryWhite p-5">
          <LineChartStepped />
        </div>
        <div className="col-span-1 rounded-md border-2 border-whiteBorder bg-secondaryWhite">
          <p>Usuarios_talvez_aqui</p>
        </div>
        <div className="col-span-3 rounded-md border-2 border-whiteBorder bg-secondaryWhite p-5">
          <LineChart />
        </div>
      </div>
    </div>
  );
}
