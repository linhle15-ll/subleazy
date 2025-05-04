import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import db from './db/db';
import postRoutes from './routes/postRoutes';

const app: Application = express();

// ------ Middlewares -------
// Middleware to parse incoming JSON request body in Express
app.use(express.json());

// CORS config
app.use(cors());

// Connect to MongoDB
db();

// Set up routes
app.use('/api/posts', postRoutes);

// Basic Error Handling Middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

export default app;
