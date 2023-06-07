import React from 'react';
import Chart from "react-apexcharts";

const Charts = () => {
  const series = [
    {
      name: "Temperature in Celsius",
      data: []
    }
  ];
  const options = {
    chart: { id: 'bar-chart'},
    xaxis: {
      categories: []
    }
  };

  return (
    <div>
      <Chart
        options={options}
        series={series}
        type="bar"
        width="450"
      />
    </div>
  )
}

export default Charts;