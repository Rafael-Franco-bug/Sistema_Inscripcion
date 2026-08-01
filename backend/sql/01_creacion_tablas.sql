-- =========================================================
-- Sistema de Inscripciones Universitarias
-- Script de creación de tablas (PostgreSQL)
-- Basado en el script original del usuario, con 2 cambios:
--   1) estudiante: se agrega columna password_hash (login)
--   2) nueva tabla pago_matricula (separada de matricula)
-- =========================================================

-- facultad
CREATE TABLE facultad (
    id_facultad SERIAL PRIMARY KEY,
    nombre_facultad VARCHAR(100) NOT NULL
);

-- carrera
CREATE TABLE carrera (
    id_carrera SERIAL PRIMARY KEY,
    id_facultad INT REFERENCES facultad(id_facultad),
    nombre_carrera VARCHAR(100) NOT NULL,
    codigo_carrera VARCHAR(50) UNIQUE NOT NULL
);

-- estudiante
CREATE TABLE estudiante (
    id_estudiante SERIAL PRIMARY KEY,
    id_carrera INT REFERENCES carrera(id_carrera),
    cod_sis VARCHAR(20) UNIQUE NOT NULL,
    nombres VARCHAR(50) NOT NULL,
    apellidos VARCHAR(50) NOT NULL,
    ci VARCHAR(20) UNIQUE NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    genero VARCHAR(20) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    datos_biograficos TEXT NOT NULL,
    password_hash VARCHAR(255) NOT NULL
);

-- docente
CREATE TABLE docente (
    id_docente SERIAL PRIMARY KEY,
    nombre_docente VARCHAR(50) NOT NULL,
    apellido_docente VARCHAR(50) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    telefono VARCHAR(20)
);

-- materia
CREATE TABLE materia (
    id_materia SERIAL PRIMARY KEY,
    id_carrera INT REFERENCES carrera(id_carrera),
    nombre_materia VARCHAR(100) NOT NULL,
    nivel INT NOT NULL,
    creditos INT NOT NULL,
    codigo_materia VARCHAR(50) UNIQUE NOT NULL
);

-- periodo_academico
CREATE TABLE periodo_academico (
    id_periodo SERIAL PRIMARY KEY,
    nombre_periodo VARCHAR(50) NOT NULL,
    gestion INT NOT NULL
);

-- aula
CREATE TABLE aula (
    id_aula SERIAL PRIMARY KEY,
    edificio VARCHAR(50) NOT NULL,
    num_aula VARCHAR(20) NOT NULL,
    capacidad INT NOT NULL
);

-- horario
CREATE TABLE horario (
    id_horario SERIAL PRIMARY KEY,
    dia VARCHAR(20) NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL
);

-- grupo
CREATE TABLE grupo (
    id_grupo SERIAL PRIMARY KEY,
    id_materia INT REFERENCES materia(id_materia),
    id_docente INT REFERENCES docente(id_docente),
    id_periodo INT REFERENCES periodo_academico(id_periodo),
    codigo_grupo VARCHAR(10) NOT NULL,
    cupo_maximo INT NOT NULL
);

-- grupo_horario
CREATE TABLE grupo_horario (
    id_grupo_horario SERIAL PRIMARY KEY,
    id_grupo INT REFERENCES grupo(id_grupo),
    id_horario INT REFERENCES horario(id_horario),
    id_aula INT REFERENCES aula(id_aula)
);

-- matricula
CREATE TABLE matricula (
    id_matricula SERIAL PRIMARY KEY,
    id_estudiante INT REFERENCES estudiante(id_estudiante),
    id_periodo INT REFERENCES periodo_academico(id_periodo),
    semestre INT NOT NULL
);

-- pago_matricula (tabla separada, 1 matricula -> N pagos históricos)
CREATE TABLE pago_matricula (
    id_pago SERIAL PRIMARY KEY,
    id_matricula INT NOT NULL REFERENCES matricula(id_matricula),
    numero_transaccion VARCHAR(50) UNIQUE NOT NULL,
    fecha_pago DATE NOT NULL,
    monto DECIMAL(10,2) NOT NULL,
    estado_pago VARCHAR(20) NOT NULL DEFAULT 'Pendiente' -- Pagado / Pendiente / Anulado
);

-- inscripcion
CREATE TABLE inscripcion (
    id_inscripcion SERIAL PRIMARY KEY,
    id_estudiante INT NOT NULL REFERENCES estudiante(id_estudiante),
    id_grupo INT NOT NULL REFERENCES grupo(id_grupo),
    fecha_inscripcion DATE NOT NULL,
    estado VARCHAR(20) NOT NULL, -- Inscrito / Abandonado / Aprobado / Reprobado
    nota_final DECIMAL(5,2)
);

-- Índices útiles para las consultas más comunes
CREATE INDEX idx_estudiante_correo ON estudiante(correo);
CREATE INDEX idx_inscripcion_estudiante ON inscripcion(id_estudiante);
CREATE INDEX idx_grupo_materia ON grupo(id_materia);
CREATE INDEX idx_matricula_estudiante ON matricula(id_estudiante);
