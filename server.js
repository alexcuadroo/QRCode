
import express, { json, static as serveStatic } from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3000;
import generate from './api/generate.js';

app.use(json());
app.use(serveStatic(join(__dirname, 'public')));
app.use('/api/generate', generate);

app.use((req, res) => {
    res.status(404).sendFile(join(__dirname, 'public', '404.html'));
});
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});