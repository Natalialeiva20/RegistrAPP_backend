// controllers/sectionController.js
import { getAllSections } from '../services/sectionService.js';
import { getSectionsByStudentId } from '../services/sectionService.js';

export const getSections = async (req, res) => {
  try {
    const sections = await getAllSections();
    res.status(200).json(sections);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las secciones', error: error.message });
  }
};

export const getSectionsForStudent = async (req, res) => {
  const { studentId } = req.params;

  if (!studentId) {
    return res.status(400).json({ message: 'El ID del estudiante es requerido' });
  }

  try {
    const sections = await getSectionsByStudentId(studentId);
    if (sections.length === 0) {
      return res.status(404).json({ message: 'No se encontraron secciones para este estudiante' });
    }
    res.status(200).json(sections);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las secciones', error: error.message });
  }
};