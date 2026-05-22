
import express, { json, static as serveStatic } from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

import generate from './api/generate.js';
import generatePublic from './api/generate-public.js';

const corsOptions = {
    origin: /\.edualex\.uy$/,
    methods: ['GET']
};

app.use(helmet());
app.use(compression());
app.use(json());
app.use(serveStatic(join(__dirname, 'public')));
app.use('/api/generate', generate);
app.get('/api/qr', cors(corsOptions), generatePublic);

app.use((req, res) => {
    res.status(404).sendFile(join(__dirname, 'public', '404.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});