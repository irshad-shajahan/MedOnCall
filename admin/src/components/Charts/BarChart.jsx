import React from "react";
import Chart from "react-apexcharts";

const BarChart = ({ data }) => {
    const doctorNames = data.map(doctor => doctor.name);
    const AppointmentNumber = data.map(number => number.appointmentCount)
    const options = {
        chart: {
            id: "basic-bar"
        },
        xaxis: {
            categories: doctorNames,
            labels: {
                style: {
                    fontSize: "16px",
                    fontWeight: "bold" // Adjust the font size as per your preference
                }
            }
        }
    };

    const series = [
        {
            name: "series-1",
            data: AppointmentNumber
        }
    ];

    return (
        <div className="chart">
            <Chart
                options={options}
                series={series}
                type="bar"
                width="500"
            />
        </div>
    );
};

export default BarChart;
