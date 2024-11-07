// routes/sectionRoutes.js
import { Router } from 'express';
import { getSections } from '../controllers/sectionController.js';
import { getSectionsForStudent } from '../controllers/sectionController.js';

const router = Router();

router.get('/sections', getSections);
router.get('/sections/student/:studentId', getSectionsForStudent);
export default router;

