"use client";

import { useEffect, useState } from "react";
import Highcharts, { Options } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useGetTransactionChartData } from "@/api/finance/finance.hooks";
import { CgSpinner } from "react-icons/cg";

type TStockChartProps = {
  type?: "income" | "expense" | "due" | "overdue" | string; 
};

export default function IncomeChart({
  type = "income",
}: TStockChartProps) {
  const [options, setOptions] = useState<Options | null>(null);

  const { data: dbData, isPending } = useGetTransactionChartData({ type });

  useEffect(() => {
    if (!dbData) return;

    const allMonths = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const monthMap: Record<number, number> = {};
    dbData?.data?.chartData?.forEach((d: {_id: {month: number}, totalAmount: number}) => {
      monthMap[d._id.month] = d.totalAmount;
    });

    const amounts = allMonths.map((_, index) => monthMap[index + 1] || 0);

    const chartOptions: Options = {
      chart: {
        type: "areaspline",
        backgroundColor: "transparent",
        spacingLeft: 0,
        spacingRight: 0,
        marginRight: 0,
        height: 250,
      },
      title: { text: "" },
      legend: { enabled: false },
      xAxis: {
        categories: allMonths,
        title: { text: "" },
        lineColor: "#ccc",
        startOnTick: false,
        endOnTick: true,
        minPadding: 0,
        maxPadding: 0,
      },
      yAxis: {
        title: { text: "" },
        gridLineColor: "#eee",
        opposite: false,
        labels: { align: "left", x: 0 },
      },
      tooltip: {
        headerFormat: "",
        pointFormat: "${point.y}",
        shared: true,
        borderColor: "#F4D03F",
      },
      plotOptions: {
        series: {
          connectNulls: false,
          lineWidth: 3,
          marker: {
            enabled: true,
            radius: 3,
            fillColor: "#FAE27C",
            lineWidth: 1,
            lineColor: "#F4D03F",
          },
        },
      },
      series: [
        {
          data: amounts,
          color: "#F4D03F",
          type: "areaspline",
          fillColor: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
              [0, "rgba(250, 226, 124, 0.7)"],
              [1, "rgba(250, 226, 124, 0)"],
            ],
          },
        },
      ],
      credits: { enabled: false },
    };

    setOptions(chartOptions);
  }, [dbData]);


  if (!options) return <div>Loading chart...</div>;

  return (
    <div className="flex items-center justify-center w-full h-full">
      {isPending ? (
        <div className="w-full h-[250px]">
          <CgSpinner size={25} className="animate-spin" />
        </div>
      ) : (
        <div className="w-[90%] max-w-3xl">
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
      )}

    </div>
  );
}
