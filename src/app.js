import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import sectionRoutes from './routes/sectionRoutes.js';
import classRoutes from './routes/classRoutes.js';
import subjectRoutes from './routes/subjectRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';




const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api', sectionRoutes);
app.use('/api', classRoutes); 
app.use('/api', subjectRoutes);
app.use('/api', attendanceRoutes);


export default app;
