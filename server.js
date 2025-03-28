import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import urlRoutes from './routes/urlRoutes.js';
import QRCode from 'qrcode';  // Added QR Code package

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => {
    console.error('❗ MongoDB connection error:', err);
    process.exit(1);
  });

// Routes
app.use('/api', urlRoutes);

// ✅ QR Code Generation Route
app.get('/url/qrcode', async (req, res) => {
    const { url } = req.query;
    
    if (!url) {
        return res.status(400).json({ error: "URL is required" });
    }

    try {
        // Generate QR code as a Data URL
        const qrCode = await QRCode.toDataURL(url);
        res.json({ qrCode });
    } catch (error) {
        res.status(500).json({ error: "Failed to generate QR Code" });
    }
});

// ✅ Test Route
app.get('/', (req, res) => {
  res.send('Welcome to the URL Shortener API!');
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
