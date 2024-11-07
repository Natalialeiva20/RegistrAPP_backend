// routes/subjectRoutes.js
import { Router } from 'express';
import { getSubjects } from '../controllers/subjectController.js';

const router = Router();

router.get('/subjects', getSubjects);

export default router;
