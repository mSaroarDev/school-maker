"use client";

import { useEffect, useState } from "react";
import Highcharts, { Options } from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface IncomeData {
  month: string;
  amount: number;
}

export default function IncomeChart() {
  const [options, setOptions] = useState<Options | null>(null);

  useEffect(() => {
    (async () => {
      const data: IncomeData[] = [
        { month: "Jan", amount: 1200 },
        { month: "Feb", amount: 1500 },
        { month: "Mar", amount: 1800 },
        { month: "Apr", amount: 1000 },
        { month: "May", amount: 2200 },
        { month: "Jun", amount: 1700 },
        { month: "Jul", amount: 2500 },
        { month: "Aug", amount: 2000 },
        { month: "Sep", amount: 2300 },
        { month: "Oct", amount: 1900 },
      ];

      const allMonths = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];

      const amounts = allMonths.map((month) => {
        const found = data.find((d) => d.month === month);
        return found ? found.amount : null;
      });

      const chartOptions: Options = {
        chart: {
          type: "areaspline",
          backgroundColor: "transparent",
          spacingLeft: 0,
          spacingRight: 0,
          // marginLeft: 60,
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
          endOnTick: false,
          minPadding: 0,
          maxPadding: 0,
        },
        yAxis: {
          title: { text: "" },
          gridLineColor: "#eee",
          opposite: false,
          labels: {
            align: "left",
            x: 0,
          },
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
    })();
  }, []);

  if (!options) return <div>Loading chart...</div>;

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="w-[90%] max-w-3xl">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </div>
  );
}
