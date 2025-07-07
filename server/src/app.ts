/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import db from './db/db';
import cookieParser from 'cookie-parser';
import postRoutes from './routes/post.routes';
import wishRoutes from './routes/wish.routes';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import groupRoutes from './routes/group.routes';
import messageRoutes from './routes/message.routes';

const app: Application = express();

// ------ Middlewares -------
// Middleware to parse incoming JSON request body in Express
app.use(express.json());

// Middleware to parse cookies from the request headers
app.use(cookieParser());

// CORS config
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.options(
  /(.*)/,
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// Connect to MongoDB
db();

// post routes
app.use('/api/posts', postRoutes);

// wish routes
app.use('/api/wishes', wishRoutes);

// user routes
app.use('/api/users', userRoutes);

// auth routes
app.use('/api/auth', authRoutes);

// group routes
app.use('/api/groups', groupRoutes);

// message routes
app.use('/api/messages', messageRoutes);

// Basic Error Handling Middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  // _next is intentionally unused
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

export default app;
