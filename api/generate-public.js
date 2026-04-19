import { toBuffer } from 'qrcode';

const MAX_SIZE = 1200;
const MIN_SIZE = 100;
const DEFAULT_SIZE = 600;

export default async (req, res) => {
  const { url, size } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'El parámetro "url" es requerido' });
  }

  // Validar que sea una URL válida
  try {
    new URL(url);
  } catch {
    return res.status(400).json({ error: 'El parámetro "url" no es una URL válida' });
  }

  const parsedSize = Math.min(MAX_SIZE, Math.max(MIN_SIZE, parseInt(size) || DEFAULT_SIZE));

  try {
    const buffer = await toBuffer(url, {
      type: 'png',
      width: parsedSize,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#ffffff'
      }
    });

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=300');
    res.status(200).send(buffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al generar el QR' });
  }
};
