// import express from 'express';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import userRoutes from './routes/user.route.js';
// import authRoutes from './routes/auth.route.js';
// import postRoutes from './routes/post.route.js';
// import commentRoutes from './routes/comment.route.js';
// import cookieParser from 'cookie-parser';
// import path from 'path';
// import net from 'net';

// dotenv.config();

// console.log('MongoDB URI:', process.env.MONGO_URI);
// console.log('Port:', process.env.PORT);
// console.log('JWT Secret:', process.env.JWT_SECRET);
// console.log('Google Client ID:', process.env.GOOGLE_CLIENT_ID);
// console.log('Google Client Secret:', process.env.GOOGLE_CLIENT_SECRET);

// if (!process.env.MONGO_URI) {
//   throw new Error('MongoDB URI is not defined in environment variables');
// }

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log('MongoDb is connected');
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// const __dirname = path.resolve();

// const app = express();

// app.use(express.json());
// app.use(cookieParser());

// const findAvailablePort = (startPort) => {
//   return new Promise((resolve, reject) => {
//     const server = net.createServer();
//     server.listen(startPort, () => {
//       server.once('close', () => {
//         resolve(startPort);
//       });
//       server.close();
//     });
//     server.on('error', () => {
//       resolve(findAvailablePort(startPort + 1));
//     });
//   });
// };

// (async () => {
//   const port = await findAvailablePort(parseInt(process.env.PORT, 10) || 3004);
//   app.listen(port, () => {
//     console.log(`Server is running on port ${port}!`);
//   });
// })();

// app.use('/api/user', userRoutes);
// app.use('/api/auth', authRoutes);
// app.use('/api/post', postRoutes);
// app.use('/api/comment', commentRoutes);

// app.use(express.static(path.join(__dirname, '/client/dist')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
// });

// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500;
//   const message = err.message || 'Internal Server Error';
//   res.status(statusCode).json({
//     success: false,
//     statusCode,
//     message,
//   });
// });
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import net from 'net';

// Load environment variables
dotenv.config();

// Debugging information
console.log('MongoDB URI:', process.env.MONGO_URI);
console.log('Port:', process.env.PORT);
console.log('JWT Secret:', process.env.JWT_SECRET);
console.log('Google Client ID:', process.env.GOOGLE_CLIENT_ID);
console.log('Google Client Secret:', process.env.GOOGLE_CLIENT_SECRET);

if (!process.env.MONGO_URI) {
  throw new Error('MongoDB URI is not defined in environment variables');
}

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB is connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const __dirname = path.resolve();
const app = express();

app.use(express.json());
app.use(cookieParser());

// Function to find an available port
const findAvailablePort = (startPort) => {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.listen(startPort, () => {
      server.once('close', () => resolve(startPort));
      server.close();
    });
    server.on('error', () => resolve(findAvailablePort(startPort + 1)));
  });
};

// Start the server
(async () => {
  const port = await findAvailablePort(parseInt(process.env.PORT, 10) || 3004);
  app.listen(port, () => {
    console.log(`Server is running on port ${port}!`);
  });
})();

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
