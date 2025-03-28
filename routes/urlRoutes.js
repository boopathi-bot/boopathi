import express from 'express';
import { 
  shortenUrl, 
  redirectToOriginalUrl, 
  getUrlStats, 
  deleteUrl, 
  generateQRCode 
} from '../controllers/urlController.js';

const router = express.Router();

router.post('/url/shorten', shortenUrl);
router.get('/url/:alias', redirectToOriginalUrl);
router.get('/url/stats/:alias', getUrlStats);
router.delete('/url/:alias', deleteUrl);
router.get('/url/qrcode/:alias', generateQRCode); // Added QR Code generation route

export default router;
