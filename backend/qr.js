import QRCode from "qrcode";

export const generateQRCode = async (id) => {
  if (!id) {
    throw new Error("QR Code Generation Error: ID is required");
  }
  try {
    const qrCode = await QRCode.toDataURL(id);
    return qrCode;
  } catch (error) {
    console.error("QR Code Generation Error:", error);
    throw error;
  }
};
