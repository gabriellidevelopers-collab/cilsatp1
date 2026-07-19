# API Escuela de Fútbol Infantil - Escuelita FC

API REST para la gestión de una escuela de fútbol infantil, construida con Node.js, Express y Sequelize (ORM para PostgreSQL). Incluye un frontend estático servido directamente desde Express.

---

## 🔗 Links del Proyecto

| Servicio | URL |
|----------|-----|
| **Frontend (Render)** | [https://cilsatpbackend.onrender.com/index.html](https://cilsatpbackend.onrender.com/index.html) |
| **Backend API** | [https://cilsatpbackend.onrender.com/api](https://cilsatpbackend.onrender.com/api) |
| **Documentación Swagger** | [https://cilsatpbackend.onrender.com/api-docs](https://cilsatpbackend.onrender.com/api-docs) |
| **Repositorio GitHub** | [https://github.com/gabriellidevelopers-collab/cilsatp1](https://github.com/gabriellidevelopers-collab/cilsatp1) |

---

## 👥 Equipo de Trabajo

| Nombre | Rol | Responsabilidad |
|--------|-----|-----------------|
| **Gabriel Gabrielli** | Desarrollador Backend | API REST, base de datos, deploy |
| **Gaston Carabajal** | Desarrollador Frontend | Interfaces HTML/CSS/JS, diseño |
| **Aylu** | Documentación | Documentación del proyecto |
| **Ana** | Integrante | Soporte general |

---

## 🚀 Deploy

### Backend y Frontend (Render)
El proyecto está deployado en **Render** (free tier):
- Backend Node.js + Express
- PostgreSQL gestionado por Render
- Frontend estático servido desde la carpeta `public/`

### Cuenta de Render
- **Usuario**: gabriellidevelopers
- **Correo**: gabriellidevelopers@gmail.com

---

## 🚀 Instalación y Configuración

### 1. Requisitos previos
- Node.js (versión 16 o superior)
- PostgreSQL (servidor local o remoto)
- npm o yarn

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto (usa `.env.example` como plantilla):

**Desarrollo local:**
```env
PORT=3001
DB_USER=postgres
DB_PASSWORD=tu_contraseña
DB_HOST=localhost
DB_PORT=5432
DB_NAME=escuela_futbol
```

**Producción (Render):**
```env
PORT=3001
DATABASE_URL=postgresql://user:pass@host:5432/escuela_futbol
```

### 4. Iniciar el servidor
```bash
# Modo desarrollo
npm run dev

# Modo producción
npm start
```

---

## 📦 Dependencias

| Paquete | Versión | Descripción |
|---------|---------|-------------|
| `express` | ^4.18.2 | Framework para crear el servidor API REST |
| `cors` | ^2.8.5 | Permite solicitudes desde dominios externos |
| `dotenv` | ^16.3.1 | Carga variables de entorno desde un archivo |
| `pg` | ^8.22.0 | Driver nativo para conectarse a PostgreSQL |
| `sequelize` | ^6.37.8 | ORM para bases de datos |
| `swagger-jsdoc` | ^6.3.0 | Genera documentación Swagger |
| `swagger-ui-express` | ^5.0.1 | UI de Swagger para probar la API |
| `bcrypt` | ^5.1.1 | Encriptación de contraseñas |
| `nodemon` | ^3.0.1 | Reinicio automático (dev) |

---

## 🌐 Frontend

El frontend es un sitio estático (HTML, CSS, JS puro) servido desde la carpeta `public/`.

### Páginas disponibles
| Página | Archivo | Descripción |
|--------|---------|-------------|
| Inicio | `index.html` | Hero carousel, estadísticas, misión/visión/valores |
| Nosotros | `nosotros.html` | Historia y equipo técnico |
| Categorías | `categorias.html` | Cards Sub-8, Sub-10, Sub-12 |
| Contacto | `contacto.html` | Formulario de contacto |
| Inscripción | `inscribite.html` | Formulario conectado a la API |

### Funcionalidades
- **Hero Carousel**: 4 slides automáticos (Escuelita FC, Campamento, Escuela de Fútbol, Campeonatos)
- **SweetAlert2**: Notificaciones estilizadas para formularios
- **Formulario de inscripción**: Crea tutor y jugador en la API
- **Sugerencia automática**: Categoría según fecha de nacimiento
- **Diseño responsive**: Se adapta a móviles y tablets

---

## 📊 Base de Datos

- **Motor**: PostgreSQL
- **ORM**: Sequelize
- **Hosting**: Render (free tier)

### Tablas
| Tabla | Descripción |
|-------|-------------|
| `Tutores` | Datos de los tutores/responsables |
| `Entrenadores` | Cuerpo técnico |
| `Categorias` | Sub-8, Sub-10, Sub-12 |
| `Jugadores` | Datos de los jugadores (vinculados a tutor y categoría) |
| `Asistencias` | Control de asistencia por jugador y fecha |
| `Cuotas` | Cuotas de pago por jugador |

---

## 🛠️ Rutas API

| Recurso | Método | Endpoint |
|---------|--------|----------|
| **Tutores** | GET | `/api/tutores` |
| | GET | `/api/tutores/:id` |
| | POST | `/api/tutores` |
| | PUT | `/api/tutores/:id` |
| | DELETE | `/api/tutores/:id` |
| | GET | `/api/tutores/:id/jugadores` |
| **Entrenadores** | GET | `/api/entrenadores` |
| | GET | `/api/entrenadores/:id` |
| | POST | `/api/entrenadores` |
| | PUT | `/api/entrenadores/:id` |
| | DELETE | `/api/entrenadores/:id` |
| | GET | `/api/entrenadores/:id/categorias` |
| **Categorías** | GET | `/api/categorias` |
| | GET | `/api/categorias/:id` |
| | POST | `/api/categorias` |
| | PUT | `/api/categorias/:id` |
| | DELETE | `/api/categorias/:id` |
| | GET | `/api/categorias/:id/jugadores` |
| **Jugadores** | GET | `/api/jugadores` |
| | GET | `/api/jugadores/:id` |
| | POST | `/api/jugadores` |
| | PUT | `/api/jugadores/:id` |
| | DELETE | `/api/jugadores/:id` |
| **Asistencias** | GET | `/api/asistencias` |
| | GET | `/api/asistencias/:id` |
| | POST | `/api/asistencias` |
| | PUT | `/api/asistencias/:id` |
| | DELETE | `/api/asistencias/:id` |
| | GET | `/api/asistencias/jugador/:id` |
| | GET | `/api/asistencias/fecha/:fecha` |
| **Cuotas** | GET | `/api/cuotas` |
| | GET | `/api/cuotas/:id` |
| | POST | `/api/cuotas` |
| | PUT | `/api/cuotas/:id` |
| | DELETE | `/api/cuotas/:id` |
| | PATCH | `/api/cuotas/:id/pagar` |
| | GET | `/api/cuotas/pendientes` |
| | GET | `/api/cuotas/jugador/:id` |

---

## 📁 Estructura del Proyecto

```
backend/
├── config/              # Configuración de DB y Swagger
│   ├── database.js      # Conexión a PostgreSQL
│   └── swagger.js       # Configuración de Swagger
├── controllers/         # Lógica de negocio
│   ├── tutorController.js
│   ├── entrenadorController.js
│   ├── categoriaController.js
│   ├── jugadorController.js
│   ├── asistenciaController.js
│   └── cuotaController.js
├── models/              # Modelos de datos
│   ├── Tutor.js
│   ├── Entrenador.js
│   ├── Categoria.js
│   ├── Jugador.js
│   ├── Asistencia.js
│   └── Cuota.js
├── routes/              # Rutas API
│   ├── tutorRoutes.js
│   ├── entrenadorRoutes.js
│   ├── categoriaRoutes.js
│   ├── jugadorRoutes.js
│   ├── asistenciaRoutes.js
│   └── cuotaRoutes.js
├── middleware/
│   └── errorHandler.middleware.js
├── services/
│   └── encryption.service.js
├── public/              # Frontend estático
│   ├── index.html
│   ├── nosotros.html
│   ├── categorias.html
│   ├── contacto.html
│   ├── inscribite.html
│   ├── styles.css
│   ├── script.js
│   └── img/
├── postman/
│   └── Escuela-Futbol-API.postman_collection.json
├── docs/
│   └── API-REFERENCE.md
├── app.js               # Archivo principal
├── package.json
├── .env.example
├── .env.render.example
├── Procfile
└── README.md
```

---

## 📝 Pruebas con Postman

Importa la colección de Postman desde `postman/Escuela-Futbol-API.postman_collection.json`. La URL base ya está configurada apuntando a Render.

---

## 📄 Licencia
Este proyecto está licenciado bajo la Licencia ISC.
