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

export const servePDFByMonth = (req, res) => {
  const { childId, month } = req.params;

  const query = 'SELECT pdf_content FROM reports WHERE child_id = ? AND month = ?';
  db.query(query, [childId, month], (err, results) => {
    if (err || results.length === 0) {
      console.error('Error fetching report:', err || 'No results found');
      return res.status(404).json({ error: 'Report not found' });
    }

    const pdfContent = results[0].pdf_content;

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="child_report_${childId}_${month}.pdf"`);
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


