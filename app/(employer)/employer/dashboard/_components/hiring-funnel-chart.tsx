"use client";

import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { LuCalendar } from "react-icons/lu";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const HiringFunnelChart = () => {
  const [timeframe, setTimeframe] = useState("30d");

  const data = {
    labels: ["Applied", "AI Screened", "Interviewed", "Offered", "Hired"],
    datasets: [
      {
        label: "Candidates",
        data: [148, 96, 42, 12, 7],
        backgroundColor: "#244034",
        hoverBackgroundColor: "#1B3127",
        borderRadius: 4,
        barPercentage: 0.62,
        categoryPercentage: 0.8,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#18181B",
        titleFont: {
          size: 12,
          weight: "bold",
          family: "var(--font-primary), sans-serif",
        },
        bodyFont: { size: 12, family: "var(--font-primary), sans-serif" },
        padding: 10,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: (context) => `${context.parsed.y} Candidates`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: "#6B7280",
          font: {
            size: 11.5,
            weight: 500,
            family: "var(--font-primary), sans-serif",
          },
          padding: 8,
        },
      },
      y: {
        min: 0,
        max: 160,
        ticks: {
          stepSize: 40,
          color: "#9CA3AF",
          font: {
            size: 11,
            family: "var(--font-primary), sans-serif",
          },
          padding: 6,
        },
        grid: {
          color: "#F1F5F9",
        },
        border: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="flex-1 w-full min-w-0 bg-white rounded p-4 sm:p-5 lg:p-6 border border-zinc-200/80 shadow-xs flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4">
        <div>
          <h3 className="text-sm sm:text-base font-semibold text-zinc-900">
            Hiring Funnel
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5 hidden sm:block">
            Candidate progression across current active pipelines
          </p>
        </div>

        {/* Timeframe pill selector */}
        <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-zinc-500 bg-zinc-50 border border-zinc-200/80 px-2 sm:px-2.5 py-1 rounded select-none shrink-0">
          <LuCalendar className="size-3 sm:size-3.5 text-zinc-400" />
          <span>Last 30 Days</span>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="w-full h-52 sm:h-64 lg:h-72">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default HiringFunnelChart;