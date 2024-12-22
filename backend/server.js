import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import questionnaireRoutes from './routes/questionnaireRoutes.js';
import authRoutes from './routes/auth.js';
import session from 'express-session';
import childFormRoutes from './routes/childFormRoute.js';
import responseRoutes from './routes/responseRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import graphRoutes from './routes/graphRoutes.js';
import questionRoutes from './routes/questionRoutes.js';
import dotenv from 'dotenv';
import profileRoutes from './routes/profileRoutes.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import  progressTrackingRoutes  from './routes/trackingRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';

dotenv.config();
const app = express();
app.use(express.json());

// Session middleware
app.use(session({
  secret: process.env.SECRET_KEY, // Use the environment variable for the secret key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Get __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Set up storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads/'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Initialize multer with storage configuration
const upload = multer({ storage });

// Define the file upload route
app.post('/api/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.status(200).json({ filename: file.filename });
});

// Define API routes
app.use('/api/auth', authRoutes);
app.use('/api', childFormRoutes);
app.use('/api', questionnaireRoutes);
app.use('/api', responseRoutes);
app.use('/api', reportRoutes);
app.use('/api', graphRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api', profileRoutes);
app.use('/api', progressTrackingRoutes);
app.use('/api/notifications', notificationRoutes);

const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
