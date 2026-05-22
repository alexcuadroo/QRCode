import { toBuffer } from 'qrcode';

const MAX_SIZE = 1200;
const MIN_SIZE = 100;
const DEFAULT_SIZE = 600;

export default async (req, res) => {
    if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({ error: `Método ${req.method} no permitido` });
    }

    const { url, size } = req.query;

    if (!url) {
        return res.status(400).json({ error: 'El parámetro "url" es requerido' });
    }

    try {
        new URL(url);
    } catch {
        return res.status(400).json({ error: 'El parámetro "url" no es una URL válida' });
    }

    const parsedSize = Math.min(MAX_SIZE, Math.max(MIN_SIZE, parseInt(size, 10) || DEFAULT_SIZE));

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
        res.send(buffer);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al generar el QR' });
    }
};