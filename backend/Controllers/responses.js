// controllers/response.js
import { dbPromise } from '../connect.js';

export const saveResponse = async (req, res) => {
  const { child_id, question_id, option_marks, month } = req.body;

  const query = 'INSERT INTO responses (child_id, question_id, option_marks, month) VALUES (?, ?, ?, ?)';

  try {
    await dbPromise.query(query, [child_id, question_id, option_marks,month]);
    res.status(201).send('Response saved successfully');
  } catch (err) {
    console.error('Error saving response:', err);
    res.status(500).send('Error saving response');
  }
};


export const getResponses = async (req, res) => {
  const { childId } = req.params;

  const query = `
    SELECT r.question_id, q.category_id, r.option_marks
    FROM responses r
    JOIN questions q ON r.question_id = q.question_id
    WHERE r.child_id = ?
  `;

  try {
    const [results] = await dbPromise.query(query, [childId]);

    const categoryTotals = results.reduce((acc, response) => {
      const { category_id, option_marks } = response;
      acc[category_id] = (acc[category_id] || 0) + option_marks;
      return acc;
    }, {});

    res.status(200).json(categoryTotals);
  } catch (err) {
    console.error('Error fetching responses:', err);
    res.status(500).send('Error fetching responses');
  }
};

export const getCategoryFeedback = async (req, res) => {
  const { childId, categoryId } = req.params;

  const query = `
    SELECT option_marks
    FROM responses r
    JOIN questions q ON r.question_id = q.question_id
    WHERE r.child_id = ? AND q.category_id = ?
  `;

  try {
    const [results] = await dbPromise.query(query, [childId, categoryId]);

    // Debug: Print results to check data
    console.log('Fetched results:', results);

    const totalResponses = results.length;

    // Validate if there are responses
    if (totalResponses === 0) {
      return res.status(200).json({ feedback: 'No responses available for this category.' });
    }

    // Calculate the total score
    let totalScore = 0;
    results.forEach(r => {
      switch (r.option_marks) {
        case 10: // Assuming 10 is 'yes'
          totalScore += 10;
          break;
        case 5: // Assuming 5 is 'sometimes'
          totalScore += 5;
          break;
        case 0: // Assuming 0 is 'no'
          totalScore += 0;
          break;
        default:
          console.warn('Unexpected option_marks value:', r.option_marks);
      }
    });

    // Determine the maximum score based on the number of questions
    const maxScore = totalResponses * 10; // 10 is the max score per question

    let feedbackMessage = '';
    if (totalScore >= maxScore * 0.75) {
      feedbackMessage = 'Great job! Your child is doing really well in this category.';
    } else if (totalScore >= maxScore * 0.37) {
      feedbackMessage = 'Good progress. There are areas where your child can improve.';
    } else {
      feedbackMessage = 'Needs improvement. Consider focusing more on this area.';
    }

    // Debug: Print calculated values
    console.log('Total Score:', totalScore);
    console.log('Max Score:', maxScore);

    res.status(200).json({ feedback: feedbackMessage });
  } catch (err) {
    console.error('Error fetching feedback:', err);
    res.status(500).send('Error fetching feedback');
  }
};
