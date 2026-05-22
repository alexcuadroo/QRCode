import { toDataURL } from 'qrcode';

export default async (req, res) => {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: `Método ${req.method} no permitido` });
    }

    const { text, size, color, backgroundColor } = req.body;

    if (!text) {
        return res.status(400).json({ error: 'Texto o URL es requerido' });
    }

    try {
        const qrCode = await toDataURL(text, {
            width: Math.min(1000, Math.max(150, Number(size) || 300)),
            color: {
                dark: color || '#000000',
                light: backgroundColor || '#ffffff'
            }
        });
        res.json({ qrCode });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al generar el QR' });
    }
};