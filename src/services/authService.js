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
