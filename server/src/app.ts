import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import db from './db/db';
import postRoutes from './routes/post.routes';
import authRoutes from './routes/auth.routes';

const app: Application = express();

// ------ Middlewares -------
// Middleware to parse incoming JSON request body in Express
app.use(express.json());

// CORS config
app.use(cors());
app.options(/(.*)/, cors());

// Connect to MongoDB
db();

// Set up routes
app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);

// Basic Error Handling Middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

export default app;
