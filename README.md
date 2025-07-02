# GPS Pasivo - Sistema de Localización de Mascotas

Sistema completo de localización de mascotas con frontend React, backend Node.js y base de datos MySQL.

## 🚀 Instalación en VM (Servidor)
w
### Prerequisitos
- Git
- Docker
- Docker Compose

### 1. Clonar el repositorio
```bash
git clone <TU_REPO_URL>
cd GPS-Pasivo
```

### 2. Configurar variables de entorno
```bash
# Copiar archivo de ejemplo
cp .env.example .env

# Editar variables según tu servidor
nano .env
```

**Variables importantes a cambiar:**
- `DB_HOST_EXTERNAL`: IP de tu servidor
- `DB_USER`: Usuario de base de datos
- `DB_PASSWORD`: Contraseña de base de datos
- `DB_ROOT_PASSWORD`: Contraseña root de MySQL
- `JWT_SECRET`: Clave secreta para JWT
- `FRONTEND_URL`: http://TU_IP_SERVIDOR:9009
- `BACKEND_URL`: http://TU_IP_SERVIDOR:9008

### 3. Ejecutar el sistema
```bash
# Construir y ejecutar contenedores
docker-compose up --build -d

# Ver logs
docker-compose logs -f
```

### 4. Verificar servicios
- **Frontend**: http://TU_IP_SERVIDOR:9009
- **Backend API**: http://TU_IP_SERVIDOR:9008
- **Base de datos**: Puerto 9306
- **Adminer**: http://TU_IP_SERVIDOR:9080

### 5. Crear usuario administrador (opcional)
```bash
# Ejecutar script de creación de admin
docker-compose exec backend node crearAdmin.js
```

## 🐳 Comandos Docker útiles

```bash
# Ver estado de contenedores
docker-compose ps

# Parar servicios
docker-compose down

# Reiniciar servicios
docker-compose restart

# Ver logs de un servicio específico
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f db

# Limpiar todo (¡CUIDADO! Borra datos)
docker-compose down -v
```

## 🔧 Solución de problemas

### Error de conexión a base de datos
1. Verificar que MySQL esté ejecutándose: `docker-compose ps`
2. Revisar logs: `docker-compose logs db`
3. Verificar variables de entorno en `.env`

### Frontend no carga
1. Verificar que el backend esté ejecutándose
2. Revisar `BACKEND_URL` en `.env`
3. Verificar logs: `docker-compose logs frontend`

### Puertos ocupados
Si algún puerto está ocupado, cambiar en `.env`:
- `FRONTEND_PORT`
- `BACKEND_PORT` 
- `DATABASE_PORT`
- `ADMINER_PORT`

## 📁 Estructura del proyecto

```
GPS-Pasivo/
├── backend/          # API Node.js
├── frontend/         # React App
├── docker-compose.yml
├── .env.example
└── README.md
```

## 🔒 Seguridad

- El archivo `.env` contiene información sensible y NO debe subirse a Git
- Cambiar todas las contraseñas por defecto
- Usar HTTPS en producción
- Configurar firewall para los puertos necesarios

## 📧 Soporte

Para problemas o preguntas, revisar los logs y verificar la configuración de variables de entorno.
