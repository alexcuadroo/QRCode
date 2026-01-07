## QR Code GEN

Generador de Códigos QR con backend en Node.js (Express) y frontend estático.

### Descripción

Esta aplicación genera códigos QR a partir de texto o URLs. La API usa la librería `qrcode` y devuelve un Data URL (base64) que puede mostrarse como imagen en el frontend.

### Cambios recientes

- `package.json` actualizado: nombre del paquete cambiado a `qrcode-generator` y descripción ajustada.
- Dependencias principales: `express` (5.x), `qrcode` (1.5.x), `body-parser` (2.x).
- Script de inicio: `start` ejecuta `node --watch server.js`.

### Características

- Generación de códigos QR desde texto o URLs.
- API HTTP simple con `POST /api/generate`.
- Opciones: tamaño, color y color de fondo.
- Frontend estático en la carpeta `public`.

### Instalación

1. Clona el repositorio:
```sh
git clone https://github.com/alexcuadroo/QRCode.git
cd QRCode
```

2. Instala las dependencias:
```sh
pnpm install
```

3. Inicia el servidor local:
```sh
pnpm start
```
El servidor está configurado para ejecutarse en http://localhost:3000.

### Uso

- Accede a la interfaz web en `public/index.html`.
- Endpoint API: `POST /api/generate`.

#### Parámetros aceptados (JSON)

```json
{
  "text": "https://ejemplo.com",        // Texto o URL a convertir en QR (requerido)
  "size": 200,                           // Opcional: ancho en píxeles
  "color": "#000000",                  // Opcional: color oscuro
  "backgroundColor": "#ffffff"         // Opcional: color claro
}
```

#### Ejemplo de petición API

```http
POST /api/generate
Content-Type: application/json

{
  "text": "https://ejemplo.com"
}
```

Respuesta (JSON):

```json
{
  "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANS..."
}
```

Para mostrar el QR en una página, usa el valor `qrCode` como `src` de una etiqueta `<img>`.

### Estructura del proyecto

```
QRCode/
├── api/
│   └── generate.js
├── public/
│   ├── index.html
│   ├── index.js
   ├── index.css
   ├── 404.html
   └── robots.txt
├── server.js
├── package.json
├── pnpm-lock.yaml
└── README.md
```

### Despliegue

El proyecto puede desplegarse en plataformas como Vercel o cualquier proveedor que soporte Node.js. Asegúrate de usar una versión de Node compatible con `node --watch` si quieres la recarga automática en desarrollo.

