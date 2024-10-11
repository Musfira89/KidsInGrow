import { dbPromise } from '../connect.js';

export const fetchGraphData = async (req, res) => {
  const { childId } = req.params;

  try {
    // Fetch child's basic information
    const childQuery = 'SELECT * FROM child_form WHERE child_id = ?';
    const [childData] = await dbPromise.query(childQuery, [childId]);

    if (!childData.length) {
      return res.status(404).json({ error: 'Child data not found' });
    }

    // Fetch the maximum month from the responses table for this child
    const maxMonthQuery = `
      SELECT MAX(q.month) as latest_month
      FROM responses r
      JOIN questions q ON r.question_id = q.question_id
      WHERE r.child_id = ?
    `;
    const [latestMonthResult] = await dbPromise.query(maxMonthQuery, [childId]);
    const latestMonth = latestMonthResult[0]?.latest_month;

    if (!latestMonth) {
      return res.status(404).json({ error: 'No response data found for this child' });
    }

    // Fetch category-wise total marks for the child, filtered by the latest month
    const responseQuery = `
      SELECT q.category_id, SUM(r.option_marks) as total_marks
      FROM responses r
      JOIN questions q ON r.question_id = q.question_id
      WHERE r.child_id = ? AND q.month = ?
      GROUP BY q.category_id
    `;
    const [responseData] = await dbPromise.query(responseQuery, [childId, latestMonth]);

    if (!responseData.length) {
      return res.status(404).json({ error: 'No response data found for the latest month and child' });
    }

    const categories = [
      'Communication',
      'Social Interaction',
      'Gross Motor Skill',
      'Fine Motor Skills',
      'Problem Solving'
    ];

    // Create a result object with category names and total marks
    const graphData = categories.map((category, index) => ({
      category,
      totalMarks: responseData.find(response => response.category_id - 1 === index)?.total_marks || 0
    }));

    // Send the result along with the latest month
    res.status(200).json({ graphData, latestMonth });
  } catch (error) {
    console.error('Error fetching graph data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
