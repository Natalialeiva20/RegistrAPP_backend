// services/attendanceService.js
import pool from '../config/db.js';
import moment from 'moment-timezone';

export const getAttendancesByStudentAndSection = async (studentId, sectionId) => {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query(
      `SELECT 
         a.attendance_id,
         a.estado,
         a.fecha_registro,
         c.nombre_class,
         c.fecha_hora AS fecha_clase,
         s.nombre_seccion
       FROM asist_attendance a
       JOIN asist_class c ON a.class_id = c.class_id
       JOIN asist_section s ON c.section_id = s.section_id
       WHERE a.student_id = ? AND s.section_id = ?`,
      [studentId, sectionId]
    );
    return rows;
  } catch (error) {
    console.error('Error en getAttendancesByStudentAndSection:', error);
    throw error;
  } finally {
    connection.release();
  }
};
export const validateStudentInSection = async (studentId, sectionId) => {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query(
        `SELECT 1
         FROM asist_user_section
         WHERE user_id = ? AND section_id = ?`,
        [studentId, sectionId]
      );
      return rows.length > 0;
    } catch (error) {
      console.error('Error en validateStudentInSection:', error);
      throw error;
    } finally {
      connection.release();
    }
  };
  
  export const checkAttendanceExists = async (studentId, classId) => {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query(
        `SELECT 1
         FROM asist_attendance
         WHERE student_id = ? AND class_id = ?`,
        [studentId, classId]
      );
      return rows.length > 0;
    } catch (error) {
      console.error('Error en checkAttendanceExists:', error);
      throw error;
    } finally {
      connection.release();
    }
  };
  
  export const generateNewAttendanceId = async () => {
    const connection = await pool.getConnection();
    try {
      // Consulta el último `attendance_id` registrado
      const [rows] = await connection.query(
        `SELECT MAX(attendance_id) AS maxId FROM asist_attendance`
      );
      const maxId = rows[0].maxId || 0; // Si no hay registros, comienza en 0
      return maxId + 1; // Incrementa en 1 para obtener un nuevo ID único
    } catch (error) {
      console.error('Error en generateNewAttendanceId:', error);
      throw error;
    } finally {
      connection.release();
    }
  };
  
  export const registerAttendance = async (studentId, classId) => {
    const connection = await pool.getConnection();
    try {
      // Obtener la fecha actual con la zona horaria de Santiago de Chile y formatearla correctamente
      const fechaRegistro = moment().tz('America/Santiago').format('YYYY-MM-DD HH:mm:ss');
  
      const attendanceId = await generateNewAttendanceId(); // Generar nuevo ID único
  
      await connection.query(
        `INSERT INTO asist_attendance (attendance_id, student_id, class_id, estado, fecha_registro)
         VALUES (?, ?, ?, 'presente', ?)`,
        [attendanceId, studentId, classId, fechaRegistro]
      );
  
      return { message: 'Asistencia registrada correctamente', attendanceId };
    } catch (error) {
      console.error('Error en registerAttendance:', error);
      throw error;
    } finally {
      connection.release();
    }
  };