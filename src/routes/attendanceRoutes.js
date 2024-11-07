// routes/attendanceRoutes.js
import { Router } from 'express';
import { getAttendancesForStudentInSection } from '../controllers/attendanceController.js';
import { createAttendance } from '../controllers/attendanceController.js';

const router = Router();

// Ruta para obtener las asistencias de un estudiante en una sección específica
router.get('/attendances/student/:studentId/section/:sectionId', getAttendancesForStudentInSection);
router.post('/attendances', createAttendance);

export default router;
