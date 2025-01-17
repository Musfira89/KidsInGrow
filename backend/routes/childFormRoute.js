//childFormRoutes.js

import express from 'express';
import { submitChildForm, getChildData,getChildrenByParent } from '../Controllers/childForm.js';

const router = express.Router();

router.post('/submit', submitChildForm);
router.get('/:childId', getChildData); 
router.get('/children/parent/:parentId', getChildrenByParent);


export default router;