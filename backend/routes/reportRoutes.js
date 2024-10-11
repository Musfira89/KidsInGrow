import express from 'express';
import { generateAndSaveReport} from '../Controllers/reportController.js';
import {getReportMetadata, servePDFByMonth , approveReport , declineReport , servePDF} from '../Controllers/report.js';

const router = express.Router();

router.post('/generate-report', generateAndSaveReport);

router.get('/reports/pdf/:childId/:month', servePDFByMonth); //parent side

router.get('/reports/metadata', getReportMetadata); // Admin side
router.post('/reports/approve/:id', approveReport);// Admin side
router.post('/reports/decline/:id', declineReport);// Admin side
router.get('/reports/pdf/:id', servePDF); // Admin side


export default router;
