// routes/classRoutes.js
import { Router } from 'express';
import { addClass, getClassesBySection } from '../controllers/classController.js';

const router = Router();

router.post('/classes', addClass);
router.get('/classes/section/:sectionId', getClassesBySection);

export default router;
