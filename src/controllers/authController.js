import { loginUser } from '../services/authService.js';

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
