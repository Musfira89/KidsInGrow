import { db } from "../connect.js";

// Get notifications by child_id
export const getNotifications = (req, res) => {
  const { childId } = req.params;  // Get child_id from route params

  const query = `
    SELECT 
      r.report_id,
      r.status,
      CONCAT(c.babyName, ' ', c.middleName) AS child_name
    FROM 
      reports r
    JOIN
      child_form c ON r.child_id = c.child_id
    WHERE
      r.status IN ('Approved', 'Declined') 
    AND
      r.child_id = ?
  `;

  db.query(query, [childId], (error, results) => {
    if (error) {
      console.error('Error fetching notifications:', error);
      return res.status(500).json({ error: 'Error fetching notifications' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'No notifications found for this child' });
    }

    const notifications = results.map((result) => ({
      id: result.report_id,
      message: `The report for ${result.child_name} has been ${result.status}.`,
      date: new Date().toLocaleString(),
    }));

    res.status(200).json(notifications);
  });
};
