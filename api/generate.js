import { toBuffer } from 'qrcode';
import sharp from 'sharp';

export default async (req, res) => {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: `Método ${req.method} no permitido` });
    }

    const { text, size, color, backgroundColor, logo } = req.body;

    if (!text) {
        return res.status(400).json({ error: 'Texto o URL es requerido' });
    }

    try {
        const width = Math.min(1000, Math.max(150, Number(size) || 300));
        const bg = backgroundColor || '#ffffff';

        let qrBuffer = await toBuffer(text, {
            width,
            margin: 2,
            color: {
                dark: color || '#000000',
                light: bg
            }
        });

        if (logo) {
            const logoSize = Math.round(width * 0.2);
            const logoBuffer = Buffer.from(logo.split(',')[1], 'base64');
            
            const resizedLogo = await sharp(logoBuffer)
                .resize(logoSize, logoSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
                .png()
                .toBuffer();

            const qr = await sharp(qrBuffer)
                .composite([{
                    input: resizedLogo,
                    top: Math.round((width - logoSize) / 2),
                    left: Math.round((width - logoSize) / 2)
                }])
                .png()
                .toBuffer();

            qrBuffer = qr;
        }

        const qrCode = `data:image/png;base64,${qrBuffer.toString('base64')}`;
        res.json({ qrCode });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al generar el QR' });
    }
};