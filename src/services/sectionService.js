// services/sectionService.js
import pool from '../config/db.js';

export const getAllSections = async () => {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query('SELECT * FROM asist_section');
    return rows;
  } finally {
    connection.release();
  }
};
export const getSectionsByStudentId = async (studentId) => {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query(
      `SELECT 
         s.section_id,
         s.nombre_seccion,
         sub.nombre_asignatura
       FROM asist_user_section us
       JOIN asist_section s ON us.section_id = s.section_id
       JOIN asist_subject sub ON s.subject_id = sub.subject_id
       WHERE us.user_id = ?`,
      [studentId]
    );
    return rows;
  } catch (error) {
    console.error('Error en getSectionsByStudentId:', error);
    throw error;
  } finally {
    connection.release();
  }
};