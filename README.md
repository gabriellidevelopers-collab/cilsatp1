# API Escuela de Fútbol Infantil

API REST para la gestión de una escuela de fútbol infantil, construida con Node.js, Express y Sequelize (ORM para PostgreSQL).


## 🚀 Instalación y Configuración

### 1. Requisitos previos
- Node.js (versión 16 o superior)
- PostgreSQL (servidor local o remoto)
- npm o yarn

### 2. Instalar dependencias
#### Comando completo
```bash
npm install
```

#### Dependencias individuales (si necesitas instalar una por una)
```bash
# Dependencias principales
npm install express cors dotenv pg sequelize

# Dependencias para documentación Swagger
npm install swagger-jsdoc swagger-ui-express

# Dependencia de desarrollo (recarga automática)
npm install --save-dev nodemon
```


## 📦 Dependencias Usadas

### Principales
| Paquete           | Versión | Descripción                                  |
|-------------------|---------|----------------------------------------------|
| `express`         | ^4.18.2 | Framework para crear el servidor API REST   |
| `cors`            | ^2.8.5  | Permite solicitudes desde dominios externos |
| `dotenv`          | ^16.3.1 | Carga variables de entorno desde un archivo |
| `pg`              | ^8.22.0 | Driver nativo para conectarse a PostgreSQL  |
| `sequelize`       | ^6.37.8 | ORM (Object-Relational Mapper) para bases de datos |

### Documentación
| Paquete               | Versión | Descripción                                  |
|-----------------------|---------|----------------------------------------------|
| `swagger-jsdoc`       | ^6.3.0  | Genera documentación Swagger desde JSDoc    |
| `swagger-ui-express`  | ^5.0.1  | Muestra la UI de Swagger para probar la API |

### Desarrollo
| Paquete     | Versión | Descripción                                  |
|-------------|---------|----------------------------------------------|
| `nodemon`   | ^3.0.1  | Reinicia el servidor automáticamente al cambiar archivos |

### Seguridad
| Paquete     | Versión | Descripción                                  |
|-------------|---------|----------------------------------------------|
| `bcrypt`    | ^5.1.1  | Encriptación segura de contraseñas           |

### 3. Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto (puedes usar `.env.example` como plantilla):

```env
# Puerto del servidor
PORT=3001

# Credenciales de PostgreSQL
DB_USER=postgres
DB_PASSWORD=tu_contraseña_de_postgres
DB_HOST=localhost
DB_PORT=5432
DB_NAME=escuela_futbol

# JWT Secret (opcional, para uso futuro)
JWT_SECRET=tu_super_secreto_key
```

### 4. Iniciar el servidor
```bash
# Modo desarrollo (con nodemon)
npm run dev

# Modo producción
npm start
```


## 📊 Base de Datos
- **Motor**: PostgreSQL
- **ORM**: Sequelize

La base de datos se creará automáticamente si no existe la primera vez que se inicie el servidor.


## 📖 Documentación API
La API está documentada con Swagger. Accede a la UI en:
```
http://localhost:3001/api-docs
```


## 🏗️ Arquitectura del Proyecto
El backend sigue una arquitectura **MVC (Model-View-Controller)** simplificada para APIs REST:
- **Modelos (Models)**: Definen la estructura de los datos y las relaciones entre tablas.
- **Controladores (Controllers)**: Contienen la lógica de negocio y manejan las solicitudes/respuestas.
- **Rutas (Routes)**: Definen los endpoints API y conectan las URLs con los controladores.
- **Config**: Almacena la configuración de la base de datos y herramientas como Swagger.


## 📁 Estructura del Proyecto
```
backend/
├── config/              # Configuración de DB y Swagger
│   ├── database.js      # Conexión y setup de Sequelize
│   └── swagger.js       # Configuración de Swagger
├── controllers/         # Lógica de negocio (MVC: Controllers)
│   ├── tutorController.js
│   ├── entrenadorController.js
│   ├── categoriaController.js
│   ├── jugadorController.js
│   ├── asistenciaController.js
│   └── cuotaController.js
├── docs/                # Documentación adicional
│   └── API-REFERENCE.md
├── middleware/          # Middlewares de la app
│   └── errorHandler.middleware.js  # Manejo centralizado de errores
├── models/              # Modelos de datos (MVC: Models)
│   ├── Tutor.js
│   ├── Entrenador.js
│   ├── Categoria.js
│   ├── Jugador.js
│   ├── Asistencia.js
│   └── Cuota.js
├── postman/             # Colecciones de Postman para pruebas
│   └── Escuela-Futbol-API.postman_collection.json
├── routes/              # Rutas API (MVC: Routes)
│   ├── tutorRoutes.js
│   ├── entrenadorRoutes.js
│   ├── categoriaRoutes.js
│   ├── jugadorRoutes.js
│   ├── asistenciaRoutes.js
│   └── cuotaRoutes.js
├── services/            # Servicios de la app
│   └── encryption.service.js  # Encriptación de contraseñas
├── app.js               # Archivo principal de la app (inicia el servidor)
├── package.json         # Dependencias y scripts
├── package-lock.json
├── .env                 # Variables de entorno (no se sube a Git)
├── .env.example         # Plantilla de variables de entorno
├── .gitignore
└── README.md            # Este archivo
```


## 🛠️ Rutas API
| Recurso       | Métodos CRUD                          |
|---------------|---------------------------------------|
| Tutores       | GET /api/tutores, POST /api/tutores, etc. |
| Entrenadores  | GET /api/entrenadores, POST /api/entrenadores, etc. |
| Categorías    | GET /api/categorias, POST /api/categorias, etc. |
| Jugadores     | GET /api/jugadores, POST /api/jugadores, etc. |
| Asistencias   | GET /api/asistencias, POST /api/asistencias, etc. |
| Cuotas        | GET /api/cuotas, POST /api/cuotas, etc. |

Para ver todas las rutas y probarlas, usa la documentación Swagger o la colección de Postman en la carpeta `postman/`.


## 📝 Pruebas con Postman
Importa la colección de Postman desde la carpeta `postman/` para probar todas las rutas de la API.


## 📄 Licencia
Este proyecto está licenciado bajo la Licencia ISC.
"# backCilsa" 
