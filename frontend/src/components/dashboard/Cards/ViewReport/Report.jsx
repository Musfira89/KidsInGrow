import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom"; // import useNavigate
import axios from "axios";
import logo from "../../../../assets/logo.png";
import bgImage from "../../../../assets/kidsbg.jpg";
import DownloadIcon from "@mui/icons-material/Download";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ChildReport = () => {
  const { childId } = useParams();
  const navigate = useNavigate(); // useNavigate hook to programmatically navigate
  const yearMonths = {
    1: [
      { month: 2 },
      { month: 4 },
      { month: 6 },
      { month: 8 },
      { month: 9 },
      { month: 10 },
      { month: 12 },
    ],
    2: [
      { month: 14 },
      { month: 16 },
      { month: 18 },
      { month: 20 },
      { month: 22 },
      { month: 24 },
    ],
    3: [
      { month: 27 },
      { month: 30 },
      { month: 33 },
    ],
    4: [
      { month: 36 },
      { month: 42 },
    ],
    5: [
      { month: 48 },
      { month: 54 },
      { month: 60 },
    ],
  };

  const years = Object.keys(yearMonths).map(Number);
  const [error, setError] = useState(null);

  const handleDownloadPdfReport = async (month) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/reports/pdf/${childId}/${month}`,
        {
          responseType: "arraybuffer",
        }
      );

      if (response.status === 404) {
        toast.error("Report not found");
        return;
      }

      const pdfBlob = new Blob([response.data], { type: "application/pdf" });
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `child_report_${childId}_${month}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("Report not found");
      } else {
        setError("Error fetching PDF");
        console.error("Error fetching PDF:", error);
      }
    }
  };

  const handleViewReport = (month) => {
    // Navigate to the new route for viewing the report
    navigate(`/view-report/${childId}/${month}`);
  };

  return (
    <div
      className="min-h-screen bg-fixed bg-cover bg-center bg-gray-300"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="container mx-auto p-8">
        {/* Top Section */}
        <div className="absolute top-0 left-0 w-full bg-blue-950 bg-opacity-100 shadow-md p-4 z-10">
          <div className="flex justify-center items-center">
            <img src={logo} alt="Logo" className="h-12 mr-4" />
            <h1 className="text-4xl font-extrabold text-white text-center mb-2">
              Download Monthly Reports
            </h1>
          </div>
        </div>

        {/* Months and Buttons Section */}
        <div className="mt-32">
          {years.map((year) => (
            <div
              key={year}
              className="mb-8 bg-blue-950 bg-opacity-90 rounded-lg p-6"
            >
              <h2 className="text-2xl font-semibold text-white mb-4">
                Year {year}
              </h2>
              <div className="grid grid-cols-4 gap-4">
                {yearMonths[year].map(({ month }) => (
                  <div
                    key={month}
                    className="bg-white rounded-lg p-2 w-60 ml-10 border-r-orange-500 border-r-8 border-x-orange-500"
                  >
                    <button
                      onClick={() => handleViewReport(month)}
                      className="bg-white text-black font-semibold py-2 px-4 rounded-lg w-full flex items-center justify-between"
                    >
                      <div className="flex flex-col items-center">
                        <span className="text-lg font-bold">Month {month}</span>
                        <hr className="border-t-2 w-full mt-2 mb-2" />
                      </div>
                      <DownloadIcon
                        className="text-blue-950"
                        onClick={(e) => {
                          e.stopPropagation(); // prevent view navigation on download click
                          handleDownloadPdfReport(month);
                        }}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Error Message */}
        {error && <div className="text-red-500 mt-4">{error}</div>}

        {/* Toast Container */}
        <ToastContainer />
      </div>
    </div>
  );
};

export default ChildReport;
