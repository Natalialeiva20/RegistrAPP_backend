// controllers/attendanceController.js
import { getAttendancesByStudentAndSection } from '../services/attendanceService.js';
import {
    validateStudentInSection,
    checkAttendanceExists,
    registerAttendance,
  } from '../services/attendanceService.js';
  import pool from '../config/db.js'; 
  

export const getAttendancesForStudentInSection = async (req, res) => {
  const { studentId, sectionId } = req.params;

  if (!studentId || !sectionId) {
    return res.status(400).json({ message: 'El ID del estudiante y el ID de la sección son requeridos' });
  }

  try {
    const attendances = await getAttendancesByStudentAndSection(studentId, sectionId);
    if (attendances.length === 0) {
      return res.status(404).json({ message: 'No se encontraron asistencias para este estudiante en la sección indicada' });
    }
    res.status(200).json(attendances);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las asistencias', error: error.message });
  }
};
export const createAttendance = async (req, res) => {
    const { studentId, classId } = req.body;
  
    if (!studentId || !classId) {
      return res.status(400).json({ message: 'El ID del estudiante y el ID de la clase son requeridos' });
    }
  
    try {
      // Validar que el estudiante esté asignado a la sección de la clase
      const connection = await pool.getConnection();
      const [classInfo] = await connection.query(
        `SELECT section_id FROM asist_class WHERE class_id = ?`,
        [classId]
      );
      connection.release();
  
      if (!classInfo.length) {
        return res.status(404).json({ message: 'Clase no encontrada' });
      }
      
      const sectionId = classInfo[0].section_id;
      const isStudentInSection = await validateStudentInSection(studentId, sectionId);
      if (!isStudentInSection) {
        return res.status(403).json({ message: 'El estudiante no está asignado a la sección de la clase' });
      }
  
      // Verificar si la asistencia ya está registrada
      const attendanceExists = await checkAttendanceExists(studentId, classId);
      if (attendanceExists) {
        return res.status(409).json({ message: 'La asistencia ya está registrada para esta clase' });
      }
  
      // Registrar la asistencia
      const response = await registerAttendance(studentId, classId);
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json({ message: 'Error al registrar la asistencia', error: error.message });
    }
  };