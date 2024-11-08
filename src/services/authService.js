import bcrypt from 'bcryptjs';
import pool from '../config/db.js';


export const loginUser = async (email, password) => {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query('SELECT * FROM asist_user WHERE email = ?', [email]);
    
    if (rows.length === 0) {
      throw new Error('Usuario no encontrado');
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      throw new Error('Contraseña incorrecta');
    }

    // Usuario autenticado correctamente, devolvemos la información básica
    return {
      userId: user.user_id,
      nombre: user.nombre,
      rol: user.rol,
      email: user.email,
    };
  } finally {
    connection.release();
  }
};
export const verifyPasswordById = async (userId, password) => {
  const connection = await pool.getConnection();
  try {
    // Consulta para obtener el hash de la contraseña del usuario por user_id
    const [rows] = await connection.query(
      `SELECT password_hash FROM asist_user WHERE user_id = ?`,
      [userId]
    );

    if (rows.length === 0) {
      throw new Error('Usuario no encontrado');
    }

    const { password_hash } = rows[0];

    // Comparar la contraseña ingresada con el hash almacenado
    const isMatch = await bcrypt.compare(password, password_hash);
    return isMatch; // Retorna true si coincide, false si no
  } catch (error) {
    console.error('Error en verifyPasswordById:', error);
    throw error;
  } finally {
    connection.release();
  }
};
export const changePassword = async (userId, newPassword) => {
  const connection = await pool.getConnection();
  try {
    // Encriptar la nueva contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Actualizar la contraseña en la base de datos
    const [result] = await connection.query(
      `UPDATE asist_user SET password_hash = ? WHERE user_id = ?`,
      [hashedPassword, userId]
    );

    if (result.affectedRows === 0) {
      throw new Error('Usuario no encontrado o contraseña no actualizada');
    }

    return { message: 'Contraseña actualizada correctamente' };
  } catch (error) {
    console.error('Error en changePassword:', error);
    throw error;
  } finally {
    connection.release();
  }
};