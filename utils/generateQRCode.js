const QRCode = require("qrcode");

const generateQRCode = async (url) => {
  try {
    return await QRCode.toDataURL(url);
  } catch (error) {
    console.error("Error generating QR code:", error);
    return null;
  }
};

module.exports = generateQRCode;
