import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.defaults.font.family = "__Inter_36bd41";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ],
  datasets: [
    {
      label: "Usuários registrados",
      data: [65, 59, 80, 81, 56, 55, 40, 15, 0, 0, 8, 10],
      borderColor: "#1865F2",
      backgroundColor: "#1865F2",
      fill: false,
      tension: 0.1,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Usuários registrados na plataforma - 2024",
    },
  },
};

export default function LineChart() {
  return <Line data={data} options={options} />;
}
