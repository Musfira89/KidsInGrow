import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VerifyReport = () => {
  const [reports, setReports] = useState([]);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('http://localhost:8082/api/reports/metadata');
        setReports(response.data);
      } catch (error) {
        setError('Error fetching reports');
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, []);

  const handleViewReport = async (reportId) => {
    try {
      const response = await axios.get(`http://localhost:8082/api/reports/pdf/${reportId}`, {
        responseType: 'arraybuffer'
      });

      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(pdfBlob);

      setSelectedPdfUrl(url);
    } catch (error) {
      setError('Error fetching PDF');
      console.error('Error fetching PDF:', error);
    }
  };

  const handleApproveReport = async (id) => {
    try {
      await axios.post(`http://localhost:8082/api/reports/approve/${id}`);
      setReports(reports.map(r => (r.report_id === id ? { ...r, status: 'Approved' } : r)));
      toast.success("Report Approve Successfully")
    } catch (error) {
      console.error('Error approving report:', error);
      setError('Error approving report');
    }
  };

  const handleDeclineReport = async (id) => {
    try {
      await axios.post(`http://localhost:8082/api/reports/decline/${id}`);
      setReports(reports.map(r => (r.report_id === id ? { ...r, status: 'Declined' } : r)));
    } catch (error) {
      console.error('Error declining report:', error);
      setError('Error declining report');
    }
  };

  return (
    <div className="p-10 pb-10 mt-10 shadow-md block bg-gradient-to-r bg-gray-300 text-black py-3 px-8 rounded-lg">
      <h2 className="text-2xl font-semibold mb-5 mt-5">Verify Report</h2>
      {error && <p className="text-red-500">{error}</p>}
      <table className="w-full bg-white border border-gray-200 rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 border-b">Child Name</th>
            <th className="p-3 border-b">Month</th>
            <th className="p-3 border-b">Reports</th>
            <th className="p-3 border-b">Status</th>
            <th className="p-3 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {reports.map(report => (
            <tr key={report.report_id} className="text-center">
              <td className="p-3 border-b">{report.child_name}</td>
              <td className="p-3 border-b">{report.month}</td>
              <td className="p-3 border-b">
                <button
                  className="text-blue-500 hover:underline mr-2"
                  onClick={() => handleViewReport(report.report_id)}
                >
                  View Report
                </button>
              </td>
              <td className="p-3 border-b">{report.status}</td>
              <td className="p-3 border-b">
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                  onClick={() => handleApproveReport(report.report_id)}
                >
                  Approve
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleDeclineReport(report.report_id)}
                >
                  Decline
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedPdfUrl && (
        <div className="mt-5">
          <iframe
            src={selectedPdfUrl}
            style={{ width: '100%', height: '600px', border: 'none' }}
            title="Report PDF"
          />
          <button
            className="bg-gray-500 text-white px-3 py-1 rounded mt-2"
            onClick={() => setSelectedPdfUrl(null)}
          >
            Close
          </button>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default VerifyReport;
