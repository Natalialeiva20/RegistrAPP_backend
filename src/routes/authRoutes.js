import { Router } from 'express';
import { comparePasswordById, login, updatePassword } from '../controllers/authController.js';


const router = Router();

router.post('/login', login);
router.post('/compare-password',  comparePasswordById);
router.post('/change-password', updatePassword);

export default router;
