import { createWorker } from 'tesseract.js';
import jsQR from 'jsqr';

export interface ImageExtractResult {
  text: string;
  hasQr: boolean;
  qrPayload?: string;
}

/**
 * Checks an image file or blob for embedded QR codes and extracts visible text via OCR.
 */
export async function extractFromImage(
  fileOrBlob: File | Blob,
  onProgress?: (progress: number, status: string) => void
): Promise<ImageExtractResult> {
  const imageUrl = URL.createObjectURL(fileOrBlob);

  try {
    // 1. Check for QR Code via Canvas
    let qrPayload: string | undefined;
    const img = new Image();
    img.src = imageUrl;
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, img.width, img.height);
      const qrCode = jsQR(imageData.data, imageData.width, imageData.height);
      if (qrCode && qrCode.data) {
        qrPayload = qrCode.data.trim();
      }
    }

    // 2. Extract visible text via Tesseract OCR
    onProgress?.(20, 'Reading text from image...');
    const worker = await createWorker('eng');
    
    const ret = await worker.recognize(fileOrBlob);
    await worker.terminate();

    const ocrText = ret.data.text.trim();

    let combinedText = '';
    if (qrPayload) {
      combinedText = `[QR Code Scanned Payload: ${qrPayload}]\n${ocrText}`;
    } else {
      combinedText = ocrText;
    }

    return {
      text: combinedText,
      hasQr: !!qrPayload,
      qrPayload,
    };
  } finally {
    URL.revokeObjectURL(imageUrl);
  }
}
