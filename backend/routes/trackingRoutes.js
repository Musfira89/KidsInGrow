import express from 'express';
import { fetchProgressTracking} from '../Controllers/ProgressTracking.js';

const router = express.Router();
router.get('/progress-tracking/:childId',fetchProgressTracking );



export default router;