import { dbPromise } from '../connect.js';
import multer from 'multer';
import path from 'path';

// Set up storage engine for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Folder where images will be stored
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`); // Filename format
    }
});

// Set up multer with storage and file filter
export const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: Images Only!');
        }
    }
});

export const submitProfilePic = async (req, res) => {
    const { childId } = req.params;
    const profilePic = req.file.filename; // Store filename only

    const sql = `
        INSERT INTO profile (child_id, profilePic)
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE profilePic = VALUES(profilePic)
    `;

    const values = [childId, profilePic];

    try {
        await dbPromise.query(sql, values);
        res.status(201).json({ message: 'Profile picture uploaded successfully', profilePicUrl: `http://localhost:8082/uploads/${profilePic}` });
    } catch (err) {
        console.error('Error uploading profile picture:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getProfilePic = async (req, res) => {
    const { childId } = req.params;

    const sql = 'SELECT profilePic FROM profile WHERE child_id = ?';

    try {
        const [results] = await dbPromise.query(sql, [childId]);

        if (results.length === 0) {
            return res.status(404).json({ error: 'Profile picture not found' });
        }

        const profilePicUrl = `http://localhost:8082/uploads/${results[0].profilePic}`;

        res.status(200).json({ profilePicUrl });
    } catch (err) {
        console.error('Error fetching profile picture:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
export const updateProfilePic = async (req, res) => {
    const { childId } = req.params;
    const newProfilePic = req.file.filename; // New filename only

    // Get the old profile picture filename
    const sqlSelect = 'SELECT profilePic FROM profile WHERE child_id = ?';
    try {
        const [results] = await dbPromise.query(sqlSelect, [childId]);

        if (results.length === 0) {
            return res.status(404).json({ error: 'Profile not found' });
        }

        const oldProfilePic = results[0].profilePic;

        // Update the profile picture path in the database
        const sqlUpdate = 'UPDATE profile SET profilePic = ? WHERE child_id = ?';
        await dbPromise.query(sqlUpdate, [newProfilePic, childId]);

        // Delete the old profile picture file from the filesystem
        if (oldProfilePic) {
            const oldFilePath = path.join('uploads', oldProfilePic);
            if (fs.existsSync(oldFilePath)) {
                fs.unlinkSync(oldFilePath);
            }
        }

        res.status(200).json({ message: 'Profile picture updated successfully', profilePicUrl: `http://localhost:8082/uploads/${newProfilePic}` });
    } catch (err) {
        console.error('Error updating profile picture:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
export const deleteProfilePic = async (req, res) => {
    const { childId } = req.params;
    if (!childId) {
        return res.status(400).json({ error: 'Missing child ID' });
    }

    try {
        const [results] = await dbPromise.query('SELECT profilePic FROM profile WHERE child_id = ?', [childId]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'Profile not found' });
        }

        const profilePic = results[0].profilePic;
        if (profilePic) {
            // Delete the profile picture from the filesystem
            const filePath = path.join('uploads', profilePic);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        // Update the database to remove the profile picture
        const sqlDelete = 'UPDATE profile SET profilePic = NULL WHERE child_id = ?';
        await dbPromise.query(sqlDelete, [childId]);

        res.status(200).json({ message: 'Profile picture deleted successfully' });
    } catch (err) {
        console.error('Error deleting profile picture:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
