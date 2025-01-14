import express from 'express';
import {
  getNotifications,
} from '../Controllers/notificationController.js';
const router = express.Router();
router.get('/:childId', getNotifications);
export default router;