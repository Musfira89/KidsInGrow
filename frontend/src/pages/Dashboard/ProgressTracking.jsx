import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // Added `useNavigate` for navigation

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const ProgressTracking = () => {
  const { childId } = useParams();
  const [graphData, setGraphData] = useState({});
  const [months, setMonths] = useState([]);
  const [comparisonData, setComparisonData] = useState([]);
  const navigate = useNavigate(); // Use for navigation

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8082/api/progress-tracking/${childId}`
        );
        if (response.data && response.data.groupedData) {
          setGraphData(response.data.groupedData);
          const fetchedMonths = Object.keys(response.data.groupedData);
          setMonths(fetchedMonths);

          // Comparing the last two filled months
          if (fetchedMonths.length >= 2) {
            const secondLastMonthData =
              response.data.groupedData[
                fetchedMonths[fetchedMonths.length - 2]
              ];
            const lastMonthData =
              response.data.groupedData[
                fetchedMonths[fetchedMonths.length - 1]
              ];

            const comparison = Object.keys(secondLastMonthData).map(
              (skill, index) => ({
                skill,
                secondLastMonth: secondLastMonthData[skill],
                lastMonth: lastMonthData[skill],
                improvement: lastMonthData[skill] - secondLastMonthData[skill],
                color: getColorByIndex(index), // Updated colors
              })
            );

            setComparisonData(comparison);
          }
        }
      } catch (error) {
        console.error("Error fetching progress data:", error);
      }
    };

    fetchProgressData();
  }, [childId]);

  // Function to generate the new modern color palette
  const getColorByIndex = (index) => {
    const colors = [
      "#FF8C00", // Dark Orange
      "#FFA500", // Light Orange
    ];
    return colors[index % colors.length];
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `Progress: ${tooltipItem.raw}%`;
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { display: false },
      y: { beginAtZero: true, max: 100 },
    },
    barThickness: 50,
  };

  // Navigation handler for the activities page
  const handleViewActivitiesClick = () => {
    navigate(`/activities/${childId}`);
  };

  return (
    <div className="min-h-screen w-[90%] bg-white p-4 sm:p-6 ml-20">
      <header className="bg-gradient-to-r from-blue-950 to-blue-900 text-white p-16 sm:p-12 rounded-lg shadow-lg mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between">
        <div className="flex flex-col justify-center text-center sm:text-left">
          <p className="text-lg">WELCOME!</p>
          <h1 className="text-4xl sm:text-4xl font-bold tracking-wide">
            CHILD Monthly Progress Tracking
          </h1>
        </div>
      </header>

      <main className="p-4 sm:p-6 mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mt-8">
            Progress Tracking Overview
          </h2>
          <p className="text-base text-gray-700">
            Compare your child's progress across months.
          </p>
        </div>

        {/* Progress Tracking */}
        {/* Progress Tracking */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {months.length > 0 ? (
            months.map((month, index) => (
              <div key={index} className="mb-8 w-full">
                <h3 className="text-xl font-semibold text-gray-700 text-center mb-2">{`Month ${month} Progress`}</h3>
                <div className="h-80">
                  <Bar
                    data={{
                      labels: Object.keys(graphData[month]),
                      datasets: [
                        {
                          label: `Month ${month} Progress`,
                          data: Object.values(graphData[month]),
                          backgroundColor: Object.values(graphData[month]).map(
                            (value, i) =>
                              i % 2 === 0
                                ? "#f56565" // red-500
                                : "#ed8936" // orange-500
                          ),
                          hoverBackgroundColor: Object.values(
                            graphData[month]
                          ).map(
                            (value, i) =>
                              i % 2 === 0
                                ? "#e53e3e" // red-600
                                : "#dd6b20" // orange-600
                          ),
                        },
                      ],
                    }}
                    options={chartOptions}
                  />
                </div>
              </div>
            ))
          ) : (
            <p>No progress data available.</p>
          )}
        </div>

        {/* Progress Comparison */}
        {comparisonData.length > 0 && (
          <div className="mt-8 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Progress Comparison
            </h3>
            <p className="text-base text-gray-700 mb-4">
              Comparing progress between Month {months[months.length - 2]} and
              Month {months[months.length - 1]}.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {comparisonData.map((data, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 rounded-lg shadow-inner"
                >
                  <h4 className="text-md font-semibold text-gray-700">
                    {data.skill}
                  </h4>
                  <div className="flex items-center mt-2">
                    <div
                      className="h-4 rounded-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
                      style={{ width: `${data.lastMonth}%` }}
                    ></div>
                    <div className="ml-2 text-gray-600">
                      {data.secondLastMonth}% → {data.lastMonth}%
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Improvement: {data.improvement}%
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProgressTracking;
