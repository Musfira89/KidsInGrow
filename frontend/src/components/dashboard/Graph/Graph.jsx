import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const Graph = () => {
  const { childId } = useParams();
  const [graphData, setGraphData] = useState([]);
  const [latestMonth, setLatestMonth] = useState(null);

  useEffect(() => {
    const fetchGraphData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/graph-data/${childId}`);
        if (response.data && response.data.graphData) {
          setGraphData(response.data.graphData);
          setLatestMonth(response.data.latestMonth); // Set the latest month
        } else {
          setGraphData([]);
        }
      } catch (error) {
        console.error('Error fetching graph data:', error);
        setGraphData([]);
      }
    };

    fetchGraphData();
  }, [childId]);

  const colors = [
    '#FFDA76',
    '#914F1E',
    '#1F316F',
    '#F3FF33',
    '#021526',
    '#201E43',
  ];

  const getChartData = (categoryData, color) => {
    const totalMarks = categoryData.totalMarks;
    const maxValue = 100;
    const fillValue = maxValue - totalMarks;

    return {
      labels: [categoryData.category, 'Remaining'],
      datasets: [
        {
          label: 'Total Marks',
          data: [totalMarks, fillValue],
          backgroundColor: [color, '#e0e0e0'],
          borderColor: [color, '#e0e0e0'],
          borderWidth: 2,
        },
      ],
    };
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 10,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.raw}`;
          },
        },
      },
    },
    cutout: '70%',
  };

  return (
    <div className="flex flex-col items-center mt-2 bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-lg font-bold mb-4 text-gray-600 border-b-2 border-blue-500 pb-2" style={{ fontFamily: 'Arial, sans-serif' }}>
        Performance Overview
      </h1>
      {latestMonth && (
        <p className="text-lg font-semibold mb-4">Latest Month: {latestMonth}</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
        {graphData.length > 0 ? (
          graphData.map((data, index) => (
            <div key={index} className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-2 text-gray-800">{data.category}</h2>
              <Doughnut data={getChartData(data, colors[index % colors.length])} options={options} />
            </div>
          ))
        ) : (
          <p className="text-gray-500">No data available for this child.</p>
        )}
      </div>
    </div>
  );
};

export default Graph;
