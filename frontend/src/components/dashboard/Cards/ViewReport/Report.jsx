import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import logo from "../../../../assets/logo.png";
import bgImage from "../../../../assets/bg6.jpg";
import DownloadIcon from "@mui/icons-material/Download";
import ReportDetails from "./ReportDetails"; // Import the new component

const ChildReport = () => {
  const { childId } = useParams();
  const [childData, setChildData] = useState(null);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReportDetails, setShowReportDetails] = useState(false);

  const categories = [
    "Communication",
    "Gross Motor ",
    "Fine Motor",
    "Problem Solving",
    "Social Interaction",
  ];

  const COLORS = ["#FFBB28", "#FF8042", "#0088FE", "#00C49F", "#FF4C61"];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const childResponse = await fetch(
          `http://localhost:8080/api/${childId}`
        );
        if (!childResponse.ok)
          throw new Error(`HTTP error! Status: ${childResponse.status}`);
        const childData = await childResponse.json();
        setChildData(childData);

        const responsesResponse = await fetch(
          `http://localhost:8080/api/responses/${childId}`
        );
        if (!responsesResponse.ok)
          throw new Error(`HTTP error! Status: ${responsesResponse.status}`);
        const responsesData = await responsesResponse.json();
        setResponses(responsesData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [childId]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const calculateTotalScores = () => {
    return categories.map((category, index) => {
      const categoryId = index;
      const totalScore = responses[categoryId] || 0;

      return {
        category,
        totalScore,
        fill: COLORS[index % COLORS.length],
      };
    });
  };

  const handleDownloadPdfReport = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/reports/pdf/${childId}`,
        {
          responseType: "arraybuffer",
        }
      );

      const pdfBlob = new Blob([response.data], { type: "application/pdf" });
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `child_report_${childId}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      setError("Error fetching PDF");
      console.error("Error fetching PDF:", error);
    }
  };

  const totalScores = calculateTotalScores();

  const allResponsesZero = totalScores.every(
    (score) => score.totalScore === 0
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div
      className="relative font-poppins"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 p-6">
        {/* Card Layout Container */}
        <div className="max-w-4xl mx-auto grid grid-cols-4 gap-6">
          {/* Left Card - Child Report */}
          <div className="col-span-4 bg-white shadow-lg rounded-lg p-6 flex flex-col">
            {/* Header */}
            <div className="flex justify-center items-center bg-blue-950 text-white text-4xl font-bold p-4 mb-4 rounded-t-lg">
              <img src={logo} alt="Logo" className="h-12 mr-4" />
              <h1>Child Report</h1>
            </div>
            {/* Child Basic Data */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="flex flex-col gap-4">
                <div>
                  <strong>Name:</strong> {childData?.babyName}{" "}
                  {childData?.babyLastName}
                </div>
                <div>
                  <strong>Date of Birth:</strong> {childData?.dob ? formatDate(childData.dob) : ""}
                </div>
                <div>
                  <strong>Gender:</strong> {childData?.gender}
                </div>
                <div>
                  <strong>User Name:</strong> {childData?.parentName}
                </div>
                <div>
                  <strong>Relationship:</strong> {childData?.relationship}
                </div>
              </div>
            </div>

            {/* Assessment Report Section */}
            <div>
              <h3 className="text-xl font-bold text-blue-950 mb-4">
                Assessment Report
              </h3>
              {allResponsesZero ? (
                <div className="bg-gray-100 p-4 rounded-lg text-center text-gray-700">
                  No report data found.
                </div>
              ) : (
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                  <thead className="bg-blue-950 text-white">
                    <tr>
                      <th className="py-3 px-6 border-b border-gray-300">
                        AREA
                      </th>
                      <th className="py-3 px-6 border-b border-gray-300">
                        TOTAL SCORE
                      </th>
                      <th className="py-3 px-6 border-b border-gray-300">
                        SCORE INTERPRETATION
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {totalScores.map((item, index) => (
                      <tr
                        key={index}
                        className={`text-center ${
                          index % 2 === 0 ? "bg-gray-100" : "bg-white"
                        }`}
                      >
                        <td className="py-3 px-6 border-b border-gray-300">
                          {item.category}
                        </td>
                        <td className="py-3 px-6 border-b border-gray-300">
                          {item.totalScore}
                        </td>
                        <td className="py-3 px-6 border-b border-gray-300">
                          <div
                            className={`h-2 w-full rounded ${
                              item.totalScore < 50
                                ? "bg-red-500"
                                : item.totalScore > 50
                                ? "bg-green-500"
                                : "bg-yellow-500"
                            }`}
                          />
                          {item.totalScore < 50
                            ? "Needs Improvement"
                            : item.totalScore > 50
                            ? "Good"
                            : "Satisfactory"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Button Container */}
            <div className="mt-6 flex justify-between">
              {/* See Detail Report Button */}
              <button
                onClick={() => setShowReportDetails(!showReportDetails)}
                className="bg-blue-950 text-white px-4 py-2 rounded-lg"
              >
                See Detail Report
              </button>

              {/* Download PDF Button */}
              <button
                onClick={handleDownloadPdfReport}
                className="bg-blue-950 text-white px-4 py-2 rounded-lg flex items-center"
              >
                <DownloadIcon className="mr-2" />
                Download PDF Report
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-red-500 mt-4 text-center">{error}</div>
            )}
          </div>
        </div>
        {/* Right Container - Report Details */}
        {showReportDetails && (
          <div
            className="absolute inset-0 w-[76%] shadow-lg rounded-lg p-6 flex flex-col z-20"
            style={{ height: "80vh" }}
          >
            {/* Pass setShowReportDetails as a prop */}
            <ReportDetails
              totalScores={totalScores}
              setShowReportDetails={setShowReportDetails}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChildReport;
