import express from 'express';
import morgan from 'morgan';
import path from 'path'

const app = express();

import indexRoutes from './routes/index';

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api', indexRoutes);

// Store Public Files
app.use('/uploads', express.static(path.resolve('uploads')));

export default app;