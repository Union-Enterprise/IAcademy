import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

ChartJS.defaults.font.family = "__Inter_36bd41";

export default function LineChart() {
  const [monthlyData, setMonthlyData] = useState<number[]>(Array(12).fill(0));

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:5002/users_by_month", {
          withCredentials: true,
        });

        const data = response.data;

        const usersPerMonth = Array(12).fill(0);

        data.forEach((item: { _id: { month: number }; count: number }) => {
          usersPerMonth[item._id.month - 1] = item.count; 
        });

        setMonthlyData(usersPerMonth); 
      } catch (error) {
        console.error("Erro ao buscar dados de usuários por mês", error);
      }
    };

    fetchUserData();
  }, []);

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
        data: monthlyData,
        borderColor: "#1865F2",
        backgroundColor: "#1865F2",
        fill: true,
        stepped: true,
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

  return <Line data={data} options={options} />;
}
