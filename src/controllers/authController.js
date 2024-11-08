import { loginUser, verifyPasswordById } from '../services/authService.js';

import { changePassword } from '../services/authService.js';

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email y contraseña son requeridos' });
  }

  try {
    const user = await loginUser(email, password);
    res.status(200).json({ message: 'Inicio de sesión exitoso', user });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
export const comparePasswordById = async (req, res) => {
  const { userId, password } = req.body;

  if (!userId || !password) {
    return res.status(400).json({ message: 'El ID del usuario y la contraseña son requeridos' });
  }

  try {
    const isMatch = await verifyPasswordById(userId, password);
    res.status(200).json({ isMatch });
  } catch (error) {
    res.status(500).json({ message: 'Error al verificar la contraseña', error: error.message });
  }
};
export const updatePassword = async (req, res) => {
  const { userId, newPassword } = req.body;

  if (!userId || !newPassword) {
    return res.status(400).json({ message: 'El ID del usuario y la nueva contraseña son requeridos' });
  }

  try {
    const response = await changePassword(userId, newPassword);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: 'Error al cambiar la contraseña', error: error.message });
  }
};