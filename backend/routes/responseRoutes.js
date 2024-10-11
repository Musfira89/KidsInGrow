import express from 'express';
import { saveResponse , getResponses , getCategoryFeedback} from '../Controllers/responses.js';

const router = express.Router();

router.post('/responses', saveResponse);
router.get('/responses/:childId/:month', getResponses);
router.get('/feedback/:childId/:categoryId', getCategoryFeedback);


export default router;