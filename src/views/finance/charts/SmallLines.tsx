"use client";

import { useEffect, useState } from "react";
import Highcharts, { Options } from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function MiniLineChart() {
  const [options, setOptions] = useState<Options | null>(null);

    const data = [ { "_id": { "year": 2025, "month": 1 }, "totalAmount": 1200 }, { "_id": { "year": 2025, "month": 2 }, "totalAmount": 900 } ]


  useEffect(() => {
    if (!data) return;

    const allMonths = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const monthMap: Record<number, number> = {};
    data.forEach((d: { _id: { month: number }, totalAmount: number }) => {
      monthMap[d._id.month] = d.totalAmount;
    });

    const amounts = allMonths.map((_, index) => monthMap[index + 1] || 0);

    const chartOptions: Options = {
      chart: {
        type: "spline",
        backgroundColor: "transparent",
        height: 60,
        width: 100,
        margin: [0, 0, 10, 0],
      },
      title: { text: "" },
      credits: { enabled: false },
      xAxis: { visible: false },
      yAxis: { visible: false },
      legend: { enabled: false },
      tooltip: { enabled: false },
      plotOptions: {
        series: {
          lineWidth: 3,
          color: "#ffffff",
          marker: { enabled: false },
        },
      },
      series: [
        {
          data: amounts,
          type: "spline",
        },
      ],
    };

    setOptions(chartOptions);
  }, [data]);

  if (!options) return null;

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
