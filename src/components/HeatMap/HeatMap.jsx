
import { Chart } from "react-google-charts";

export const data = [
  ["Country", "Popularity"],
  ["Germany", 200],
  ["United States", 300],
  ["Brazil", 400],
  ["Canada", 500],
  ["France", 600],
  ["RU", 700],
  ["Guatemala", 1200],
];

export const HeatMap = () => {
  return (
    <Chart
      chartEvents={[
        {
          eventName: "select",
          callback: ({ chartWrapper }) => {
            const chart = chartWrapper.getChart();
            const selection = chart.getSelection();
            if (selection.length === 0) return;
            const region = data[selection[0].row + 1];
            console.log("Selected : " + region);
          },
        },
      ]}
      chartType="GeoChart"
      width="100%"
      height="300px"
      data={data}
      options={{
        region: "world",
        displayMode: "regions",
        colorAxis: { colors: ["red", "yellow", "green"] },
        backgroundColor: "white",
        datalessRegionColor: "gray",
        defaultColor: "#f5f5f5",
      }}
    />
  );
}
