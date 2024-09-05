import { db } from "../connect.js";

export const getReportMetadata = (req, res) => {
  const query = `
    SELECT 
      r.report_id,
      r.month,
      r.status,
      CONCAT(c.babyName, ' ', c.middleName) AS child_name
    FROM 
      reports r
    JOIN
      child_form c ON r.child_id = c.child_id
    WHERE
      r.status = "Pending"
  `;

  db.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching report metadata:', error);
      res.status(500).json({ error: 'Error fetching report metadata' });
      return;
    }

    res.json(results);
  });
};

// Serve PDF
export const servePDF = (req, res) => {
  const reportId = req.params.id;

  const query = 'SELECT pdf_content FROM reports WHERE report_id = ?';
  db.query(query, [reportId], (err, results) => {
      if (err || results.length === 0) {
          console.error('Error fetching report:', err || 'No results found');
          return res.status(404).json({ error: 'Report not found' });
      }

      const pdfContent = results[0].pdf_content;

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'inline; filename="report.pdf"');
      res.send(pdfContent);
  });
};
// Approve report
export const approveReport = (req, res) => {
  const { id } = req.params;
  const query = 'UPDATE reports SET status = "Approved" WHERE report_id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Database Error:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Report approved' });
  });
};

// Decline report
export const declineReport = (req, res) => {
  const { id } = req.params;
  const query = 'UPDATE reports SET status = "Declined" WHERE report_id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Database Error:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Report declined' });
  });
};

/// Get Report by Child ID
export const getReportByChildId = (req, res) => {
  const { childId } = req.params;
  const query = "SELECT pdf_content FROM reports WHERE child_id = ?";

  db.query(query, [childId], (err, results) => {
    if (err || results.length === 0) {
      console.error('Error fetching report:', err || 'No results found');
      return res.status(404).json({ error: 'Report not found' });
    }

    const report = results[0];
    const pdfContent = report.pdf_content;

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="report.pdf"');
    res.send(pdfContent);
  });
};

export const getLatestReportByChildId = (req, res) => {
  const { childId } = req.params;
  const query = "SELECT month FROM reports WHERE child_id = ? ORDER BY month DESC LIMIT 1";

  db.query(query, [childId], (err, results) => {
    if (err) {
      console.error('Error fetching reports:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    
    if (results.length === 0) {
      return res.json({ latestMonth: null });  // No reports found, return null
    }

    const latestMonth = results[0].month;
    res.json({ latestMonth });
  });
};

export const getApprovedReportsByChildId = (req, res) => {
  const { childId } = req.params;
  const query = `
    SELECT report_id, month, status 
    FROM reports 
    WHERE child_id = ? AND status = "Approved"
    ORDER BY month DESC`;

  db.query(query, [childId], (err, results) => {
    if (err) {
      console.error('Error fetching approved reports:', err);
      return res.status(500).json({ error: 'Error fetching approved reports' });
    }

    res.json(results);
  });
};

