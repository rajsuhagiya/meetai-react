import React, { useEffect, useState, useContext } from "react";
import ReactApexChart from "react-apexcharts";
import dashboardContext from "../context/Dashboard/DashboardContext";

const ApexChart = () => {
  const { tallyChart } = useContext(dashboardContext);
  const [chartData, setChartData] = useState({});
  const data = {
    series: [
      {
        data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
        fontFamily: "Poppins",
        toolbar: {
          show: true,
          tools: {
            download: false,
          },
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          borderRadiusApplication: "end",
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [
          "South Korea",
          "Canada",
          "United Kingdom",
          "Netherlands",
          "Italy",
          "France",
          "Japan",
          "United States",
          "China",
          "Germany",
        ],
        style: {
          fontSize: "20px",
          fontWeight: 600,
        },
      },
      colors: ["#a72ee7"],
    },
  };
  useEffect(() => {
    setChartData(data);
  }, []);
  return (
    <>
      {tallyChart && tallyChart?.series && (
        <ReactApexChart
          options={tallyChart.options}
          series={tallyChart.series}
          type="bar"
          width="100%"
        />
      )}
    </>
  );
};

export default ApexChart;
