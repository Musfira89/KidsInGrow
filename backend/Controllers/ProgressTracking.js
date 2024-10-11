import { dbPromise } from '../connect.js';

export const fetchProgressTracking = async (req, res) => {
  const { childId } = req.params;

  try {
    // Fetch all months and category-wise total marks for the child
    const query = `
      SELECT q.month, q.category_id, SUM(r.option_marks) as total_marks
      FROM responses r
      JOIN questions q ON r.question_id = q.question_id
      WHERE r.child_id = ?
      GROUP BY q.month, q.category_id
      ORDER BY q.month ASC
    `;
    
    const [responseData] = await dbPromise.query(query, [childId]);

    if (!responseData.length) {
      return res.status(404).json({ error: 'No response data found for this child' });
    }

    const categories = [
      'Communication',
      'Social Interaction',
      'Gross Motor Skill',
      'Fine Motor Skills',
      'Problem Solving'
    ];

    // Group data by month and map to categories
    const groupedData = responseData.reduce((acc, row) => {
      const { month, category_id, total_marks } = row;
      if (!acc[month]) {
        acc[month] = {};
      }
      acc[month][categories[category_id - 1]] = total_marks || 0;
      return acc;
    }, {});

    // Send the result
    res.status(200).json({ groupedData });
  } catch (error) {
    console.error('Error fetching graph data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
