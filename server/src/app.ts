/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import db from './db/db';
import cookieParser from 'cookie-parser';
import postRoutes from './routes/post.routes';
import wishRoutes from './routes/wish.routes';
import authRoutes from './routes/auth.routes';
// import houseRoutes from './routes/house.routes';

const app: Application = express();

// ------ Middlewares -------
// Middleware to parse incoming JSON request body in Express
app.use(express.json());

// Middleware to parse cookies from the request headers
app.use(cookieParser());

// CORS config
app.use(cors());
app.options(/(.*)/, cors());

// Connect to MongoDB
db();

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is healthy' });
});

// post routes
app.use('/api/posts', postRoutes);

// // house routes
// app.use('/api/houses', houseRoutes);

// wish routes
app.use('/api/wishes', wishRoutes);

// auth routes
app.use('/api/auth', authRoutes);

// Basic Error Handling Middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  // _next is intentionally unused
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

export default app;
