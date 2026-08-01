# Sistema de Inscripciones Universitarias (UMSS)

Proyecto académico para la materia de Base de Datos. Backend en Node.js/Express,
frontend en React + Vite + Tailwind, base de datos PostgreSQL.

## 1. Base de datos

1. Crea la base de datos:
   ```bash
   createdb sistema_inscripciones
   ```
2. Ejecuta los scripts EN ESTE ORDEN:
   ```bash
   psql -d sistema_inscripciones -f backend/sql/01_creacion_tablas.sql
   psql -d sistema_inscripciones -f backend/sql/02_llenado_tablas.sql
   ```

Esto crea todas las tablas de tu modelo original **más**:
- `estudiante.password_hash` (necesario para el login).
- Tabla nueva `pago_matricula` (pago separado de `matricula`, como pediste).

Los 24 estudiantes de prueba quedan con la contraseña: **Estudiante123!**
(ej. correo `rafael.franco@est.umss.edu.bo`).

## 2. Backend

```bash
cd backend
npm install
cp .env.example .env
# Edita .env con tus credenciales de PostgreSQL
npm run dev
```

El servidor queda en `http://localhost:4000`. Prueba: `GET http://localhost:4000/api/health`.

## 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

Abre `http://localhost:5173`. El proxy de Vite ya redirige `/api` hacia el backend
(puerto 4000), así que no necesitas configurar nada más.

## 4. Módulos implementados

- **Login** (JWT) — `POST /api/auth/login`
- **Dashboard** — accesos rápidos a cada módulo
- **Inscribirme** — flujo completo: carrera (fija del estudiante) → semestre →
  materias disponibles → selección de grupo → confirmación → éxito.
  Valida en el backend: pago de matrícula habilitado, cupos disponibles,
  choque de horarios y que no esté ya inscrito.
- **Mi Kardex** — historial académico con créditos aprobados y promedio.
- **Horarios** — horario semanal agrupado por día.
- **Mis Docentes** — docentes de las materias inscritas.
- **Perfil** — ver/editar correo y teléfono, cambiar contraseña.
- Endpoints administrativos ya incluidos para CRUD de **docentes**, **carreras**
  y **materias** (`POST/PUT/DELETE`), listos para conectarles una pantalla de
  administración si la necesitas más adelante.

## 5. Notas técnicas importantes

- Las contraseñas se guardan con **PBKDF2** nativo de Node (sin dependencias
  externas como bcrypt), formato `iteraciones.salt.hash`. Ver
  `backend/src/utils/password.js`.
- Todas las rutas (excepto `/auth/login`) requieren el header
  `Authorization: Bearer <token>`.
- La inscripción es transaccional: si falla una validación, no se inserta nada.
