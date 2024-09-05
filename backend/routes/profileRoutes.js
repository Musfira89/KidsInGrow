import express from 'express';
import { submitProfilePic, getProfilePic, upload , updateProfilePic, deleteProfilePic } from '../Controllers/profileController.js';

const router = express.Router();

// Route to upload profile picture by child ID
router.post('/upload-profile-pic/:childId', upload.single('profilePic'), submitProfilePic);

// Route to get profile picture by child ID
router.get('/profile-pic/:childId', getProfilePic);


// Route to update profile picture
router.post('/api/update-profile-pic/:childId', upload.single('profilePic'), updateProfilePic);

// Route to delete profile picture
router.delete('/api/delete-profile-pic/:childId', deleteProfilePic);

export default router;
