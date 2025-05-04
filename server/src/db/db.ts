import mongoose from 'mongoose';

const db = async () => {
  try {
    mongoose.set('strictQuery', false);

    if (!process.env.MONGODB_URL) {
      throw new Error('MONGODB_URL is not defined in .env file');
    }
    await mongoose.connect(process.env.MONGODB_URL as string);

    if (process.env.NODE_ENV === 'development') {
      mongoose.set('debug', true);
    }

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
};

export default db;
