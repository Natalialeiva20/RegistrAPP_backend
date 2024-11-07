// services/subjectService.js
import pool from '../config/db.js';

export const getAllSubjects = async () => {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query('SELECT * FROM asist_subject');
    return rows;
  } finally {
    connection.release();
  }
};
