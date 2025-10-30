import { TiArrowUp } from "react-icons/ti";

const ShortGraphView = () => {

  // const data = [ { "_id": { "year": 2025, "month": 1 }, "totalAmount": 1200 }, { "_id": { "year": 2025, "month": 2 }, "totalAmount": 900 } ]

  // const options = {
  //   chart: {
  //     type: "spline",
  //     backgroundColor: "transparent",
  //     height: 40,
  //     margin: [0, 0, 0, 0],
  //   },
  //   title: { text: null },
  //   credits: { enabled: false },
  //   xAxis: { visible: false },
  //   yAxis: { visible: false },
  //   legend: { enabled: false },
  //   tooltip: { enabled: false },
  //   plotOptions: {
  //     series: {
  //       lineWidth: 2,
  //       color: "#ffffff",
  //       marker: { enabled: false },
  //     },
  //   },
  //   series: [
  //     {
  //       data: data.map(item => item.totalAmount),
  //     },
  //   ],
  // };

    return (
        <>
          <div className="flex items-start justify-between">
            <div className="min-h-12">
              {/* <SmallLines /> */}
            </div>
            <div className="bg-white text-green-700 flex items-center px-1 pr-2 py-0.5 rounded-full text-sm font-medium">
              <TiArrowUp className="flex-shrink-0" size={16} />
              <span className="text-xs">10%</span>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-2xl">৳126,450</h3>
            <p>Total Amounts</p>
          </div>
        </>
    );
};

export default ShortGraphView;