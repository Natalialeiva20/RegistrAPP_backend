// services/classService.js
import { v4 as uuidv4 } from 'uuid';
import pool from '../config/db.js';

export const createClass = async ({ profesor_id, section_id, nombre_class }) => {
  const connection = await pool.getConnection();
  const class_id = uuidv4(); // Generamos un UUID para la clase

  try {
    const [result] = await connection.query(
      `INSERT INTO asist_class (class_id, profesor_id, section_id, nombre_class, fecha_hora) 
       VALUES (?, ?, ?, ?, NOW())`, // NOW() para la fecha y hora actuales
      [class_id, profesor_id, section_id, nombre_class]
    );

    return {
      class_id,
      profesor_id,
      section_id,
      nombre_class,
      fecha_hora: new Date(), // Incluimos la fecha actual en la respuesta para referencia
    };
  } finally {
    connection.release();
  }
};

export const getClassesBySectionId = async (sectionId) => {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query(
        `SELECT 
           c.class_id,
           c.nombre_class,
           c.fecha_hora,
           u.nombre AS profesor_nombre,
           s.nombre_seccion AS nombre_seccion
         FROM asist_class c
         JOIN asist_user u ON c.profesor_id = u.user_id
         JOIN asist_section s ON c.section_id = s.section_id
         WHERE c.section_id = ?`,
        [sectionId]
      );
      return rows;
    } finally {
      connection.release();
    }
  };
