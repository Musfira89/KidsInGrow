import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement);

const Graph = () => {
  const { childId } = useParams();
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    const fetchGraphData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/graph-data/${childId}`);
        console.log('Response data:', response.data);  // Debugging log
        if (response.data && response.data.graphData) {
          setGraphData(response.data.graphData);
        } else {
          console.error('Unexpected response structure:', response.data);
          setGraphData([]); // Ensure graphData is set to an empty array if response is unexpected
        }
      } catch (error) {
        console.error('Error fetching graph data:', error);
        setGraphData([]); // Handle the error case by setting graphData to an empty array
      }
    };

    fetchGraphData();
  }, [childId]);

  // Define your own colors here
  const colors = [
    '#FFDA76', // Example color 1
    '#914F1E', // Example color 2
    '#1F316F', // Example color 3
    '#F3FF33', // Example color 4
    '#021526', // Example color 5
    '#201E43', // Example color 6
  ];

  const getChartData = (categoryData, color) => {
    const totalMarks = categoryData.totalMarks;
    // Define a value to ensure the doughnut is always filled (e.g., 100 or any high value)
    const maxValue = 100; // Adjust based on your needs
    const fillValue = maxValue - totalMarks;

    return {
      labels: [categoryData.category, 'Remaining'],
      datasets: [
        {
          label: 'Total Marks',
          data: [totalMarks, fillValue],
          backgroundColor: [color, '#e0e0e0'], // Custom color and a light grey for the remaining part
          borderColor: [color, '#e0e0e0'],
          borderWidth: 2
        }
      ]
    };
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 10
        }
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.raw}`;
          }
        }
      }
    },
    cutout: '70%' // Creates the doughnut effect
  };

  return (
    <div className="flex flex-col items-center mt-2 bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-lg font-bold mb-4 text-gray-600 border-b-2 border-blue-500 pb-2" style={{ fontFamily: 'Arial, sans-serif' }}>Performance Overview</h1>
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
