## QR Code GEN

Generador de Códigos QR para URLs, con backend en Node.js y frontend estático.

### Descripción

Esta aplicación permite generar códigos QR a partir de URLs, utilizando una API construida con Express.js y la librería `qrcode`. El frontend es una página web simple y responsiva.

### Características

- Generación de códigos QR para cualquier URL.
- API RESTful en Node.js (Express).
- Interfaz web sencilla y fácil de usar.
- Sin dependencias de desarrollo; listo para desplegar en Vercel.

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
	El servidor estará disponible en [http://localhost:3000](http://localhost:3000).

### Uso

- Accede a la interfaz web en `/public/index.html`.
- Envía una petición POST a `/api/generate` con el parámetro `url` para obtener el código QR.

#### Ejemplo de petición API

```http
POST /api/generate
Content-Type: application/json

{
  "url": "https://ejemplo.com"
}
```

La respuesta será una imagen PNG del código QR.

### Estructura del proyecto

```
QRCode/
├── api/
│   └── generate.js
├── public/
│   ├── index.html
│   ├── index.js
│   ├── index.css
│   ├── 404.html
│   └── robots.txt
├── server.js
├── package.json
├── pnpm-lock.yaml
└── README.md
```

### Despliegue

El proyecto está preparado para ser desplegado fácilmente en Vercel. Solo sube el repositorio y configura el entorno para Node.js.

