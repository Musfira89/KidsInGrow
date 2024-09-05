import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa"; // Icons for more visual cues

ChartJS.register(ArcElement, Tooltip, Legend);

const ReportDetails = ({ totalScores, setShowReportDetails }) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-gray-50 shadow-md rounded-lg p-8 relative max-w-4xl w-full">
        {/* Header Section */}
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h3 className="text-2xl font-semibold text-blue-900">
            Performance Report
          </h3>
          <button
            onClick={() => setShowReportDetails(false)}
            className="text-red-500 text-base"
          >
            &times;
          </button>
        </div>

        {/* Report Summary */}
        <div className="flex justify-between items-center bg-blue-100 p-3 rounded-lg mb-4 shadow-sm">
          <div>
            <h4 className="text-base font-medium text-blue-800">Summary</h4>
            <p className="text-sm text-gray-700">
              This report provides an overview of the performance metrics
              evaluated.
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs text-gray-600">
              Report Date: August 2024
            </span>
          </div>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {totalScores.map((item, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-md font-semibold text-gray-800">
                  {item.category}
                </h4>
                {item.totalScore >= 50 ? (
                  <FaCheckCircle className="text-green-500 text-lg" />
                ) : (
                  <FaExclamationCircle className="text-red-500 text-lg" />
                )}
              </div>
              <div className="flex items-center mb-3">
                <div
                  className="w-12 h-12 flex items-center justify-center rounded-full text-white font-bold text-md"
                  style={{ backgroundColor: item.fill }}
                >
                  {item.totalScore}
                </div>
                <span className="ml-3 text-gray-600 text-sm">
                  Total Score: {item.totalScore}
                </span>
              </div>

              {/* Pie Chart Section */}
              <div className="h-28 mb-3 relative">
                <Pie
                  data={{
                    labels: [item.category],
                    datasets: [
                      {
                        data: [item.totalScore],
                        backgroundColor: [item.fill],
                      },
                    ],
                  }}
                  options={{
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { display: false },
                      tooltip: {
                        callbacks: {
                          label: function (context) {
                            return `${context.label}: ${context.raw}`;
                          },
                        },
                      },
                    },
                  }}
                />
              </div>

              {/* Recommendation and Details */}
              <div className="mt-3">
                <p className="text-sm text-gray-800">
                  <strong>Recommendation:</strong>{" "}
                  {item.totalScore < 50
                    ? "Needs Improvement"
                    : item.totalScore > 50
                    ? "Good"
                    : "Satisfactory"}
                </p>
                <div className="text-xs text-gray-600 mt-1">
                  <p>Progress: {item.totalScore}%</p>
                  {/* Optional: Add a progress bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${item.totalScore}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportDetails;
