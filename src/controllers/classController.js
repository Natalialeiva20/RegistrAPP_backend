// controllers/classController.js
import { createClass } from '../services/classService.js';
import { getClassesBySectionId } from '../services/classService.js';

export const addClass = async (req, res) => {
  const { profesor_id, section_id, nombre_class } = req.body;

  // Validación de los datos requeridos
  if (!profesor_id || !section_id || !nombre_class) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  try {
    const newClass = await createClass({ profesor_id, section_id, nombre_class });
    res.status(201).json({ message: 'Clase creada exitosamente', class: newClass });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la clase', error: error.message });
  }
};

export const getClassesBySection = async (req, res) => {
    const { sectionId } = req.params;
  
    try {
      const classes = await getClassesBySectionId(sectionId);
      res.status(200).json(classes);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener las clases', error: error.message });
    }
  };