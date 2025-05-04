// Import required modules
import http from 'http';
import dotenv from 'dotenv';
// Load environment variables (Note: dotenv.config() must be top of the file to be activated correctly)
dotenv.config();

import app from './app';

// Define the port
const PORT = process.env.PORT || 5001; // if there is no port, return port 5001

// create server instance
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`);
});
