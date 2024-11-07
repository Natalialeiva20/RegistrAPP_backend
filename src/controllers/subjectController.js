// controllers/subjectController.js
import { getAllSubjects } from '../services/subjectService.js';

export const getSubjects = async (req, res) => {
  try {
    const subjects = await getAllSubjects();
    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las asignaturas', error: error.message });
  }
};
