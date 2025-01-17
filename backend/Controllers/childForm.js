// controllers/childForm.js
import { dbPromise } from '../connect.js';

export const submitChildForm = async (req, res) => {
    const { parent_id } = req.body;

    if (!parent_id) {
        return res.status(400).json({ error: 'Parent ID is required.' });
    }

    const sql = `
        INSERT INTO child_form (
            babyName, middleName, babyLastName, dob, gender, parentName, relationship,
            otherRelationship, city, state, zip, country, homeTelephone, otherTelephone,
            email, assistingPeople, parent_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        req.body.babyName, req.body.middleName, req.body.babyLastName, req.body.dob, req.body.gender,
        req.body.parentName, req.body.relationship, req.body.otherRelationship, req.body.city, req.body.state,
        req.body.zip, req.body.country, req.body.homeTelephone, req.body.otherTelephone, req.body.email,
        req.body.assistingPeople, parent_id,
    ];

    try {
        const [result] = await dbPromise.query(sql, values);
        res.status(201).json({ message: 'Child form submitted successfully', child_id: result.insertId, parent_id });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const getChildData = async (req, res) => {
    const { childId } = req.params;

    const sql = 'SELECT * FROM child_form WHERE child_id = ?';

    try {
        const [results] = await dbPromise.query(sql, [childId]);

        if (results.length === 0) {
            return res.status(404).json({ error: 'Child data not found' });
        }

        res.status(200).json(results[0]);
    } catch (err) {
        console.error('Error fetching child data:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller function to get children by parent ID
export const getChildrenByParent = async (req, res) => {
    const { parentId } = req.params; // Get parentId from request parameters
  
    try {
        const query = 'SELECT child_id, babyName, babyLastName, dob, parentName, assistingPeople FROM child_form WHERE parent_id = ?';
        const [children] = await dbPromise.query(query, [parentId]); 
  
        // Check if any children were found
        if (children.length === 0) {
            return res.status(404).json({ message: 'No children found for this parent.' });
        }
  
        // Respond with the children data
        res.status(200).json(children);
    } catch (error) {
        console.error('Error fetching children:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};