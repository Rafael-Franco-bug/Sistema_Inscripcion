-- =========================================================
-- Llenado de tablas (datos de prueba)
-- Igual a tus datos originales, con 2 agregados:
--   - password_hash en estudiante (contraseña de prueba para todos: Estudiante123!)
--   - pago_matricula para cada registro de matricula
-- =========================================================

-- facultad
INSERT INTO facultad (nombre_facultad)
VALUES ('Facultad de Ciencias y Tecnología'),
    ('Facultad de Ciencias Económicas'),
    ('Facultad de Medicina'),
    ('Facultad de Odontología'),
    ('Facultad de Ciencias Jurídicas'),
    ('Facultad de Humanidades');

-- carrera
INSERT INTO carrera (id_facultad, nombre_carrera, codigo_carrera)
VALUES (1,'Ingeniería de Sistemas','SIS'),
    (1,'Ingeniería Informática','INF'),
    (1,'Ingeniería Civil','CIV'),
    (1,'Ingeniería Industrial','IND'),
    (2,'Economía','ECO'),
    (2,'Administración de Empresas','ADM'),
    (2,'Contaduría Pública','CON'),
    (3,'Medicina','MED'),
    (4,'Odontología','ODO'),
    (5,'Derecho','DER'),
    (6,'Psicología','PSI'),
    (6,'Comunicación Social','COM');

-- estudiante (incluye password_hash; contraseña de prueba para TODOS: Estudiante123!)
INSERT INTO estudiante (id_carrera,cod_sis,nombres,apellidos,ci,fecha_nacimiento,genero,correo,telefono,datos_biograficos,password_hash)
VALUES
(1,'20260001','Rafael','Franco','9515601','2006-08-29','Masculino','rafael.franco@est.umss.edu.bo','63845413','Estudiante de Ingeniería de Sistemas.','100000.20260001.c11cf9e62b21e24ebe8d8db3f985fabc9ccaf2f7cefa6095dcdedbfa91c331fce979f1d02134bb2e4b7e9b62bc2691bfd96dbb08c7a7f518a0c912b8bd9a4f21'),
(1,'20260002','Diego','Mamani','9876542','2003-08-11','Masculino','diego.mamani@est.umss.edu.bo','70011112','Estudiante regular.','100000.20260002.ebfc2971a2cd757c09289d1293f9c30f5fa1033b94a01d66674ea19dc003bd8431250f4fc501f129c82499226a1148e32d7d60267143e135a3ab17514b8e1436'),
(2,'20260003','Andrea','Quispe','9876543','2004-10-09','Femenino','andrea.quispe@est.umss.edu.bo','70011113','Interesada en desarrollo de software.','100000.20260003.b0a25507f91cca73a9c3c98a4b4735a75133d31627566ade3373653dc9c7315184f365d2b0f00c43b4d0d8f553e40c0bbac6ba3b5a3a8c00715fc16e2f482341'),
(2,'20260016','Marcos','Choque','9876556','2004-02-14','Masculino','marcos.choque@est.umss.edu.bo','70011126','Estudiante de Ingeniería Informática.','100000.20260016.4d459ddd9e86dce80393edb808f6309cd4e190195ff06cb0a27eea7ebb1112f72c91008e3b90f958c66f1dc1411839bd61a5a7bb849137037cb7416f69a4582f'),
(3,'20260004','José','Rojas','9876544','2002-12-18','Masculino','jose.rojas@est.umss.edu.bo','70011114','Estudiante de Ingeniería Civil.','100000.20260004.5a39ca645a625a691dd4312258d02c2cbfc5f1b0e27e006addec06bdfdddab8c99be828b485ac7b4c5545df84de0c3119c3e0c2d6886e46049a5785499eddbb4'),
(3,'20260015','Cristian','Arce','9876555','2003-01-29','Masculino','cristian.arce@est.umss.edu.bo','70011125','Estudiante de Ingeniería Civil.','100000.20260015.0945b7d59f889cdd041c8ff91e2d593663061a80cf13484ffc934367e0643c9954b909a680a0d2bced7b708d56747818e43c54ed4c96758f71e1cd67385d5ef2'),
(4,'20260017','Fernanda','Villarroel','9876557','2003-10-05','Femenino','fernanda.villarroel@est.umss.edu.bo','70011127','Estudiante de Ingeniería Industrial.','100000.20260017.fbf2f45844c3f633ce6e581f2d3593ac93b44534de45ebfaca71086c76b38a3eba28b449e6476caef7ce32b158abeaf1357a2bf9641b16d2f0f10c2cfb795a08'),
(4,'20260005','Camila','Torrez','9876545','2005-02-28','Femenino','camila.torrez@est.umss.edu.bo','70011115','Estudiante de Ingeniería Industrial.','100000.20260005.aa3340d193d31b0ee62eb1493ad9c1ddc0c83f685c7a711d9215188f83fcfb1aac4a03129ac874bef720fe0b3aa05b5ea7db4a3eafce05e3416df1e821f0d019'),
(5,'20260006','Miguel','Soria','9876546','2004-03-17','Masculino','miguel.soria@est.umss.edu.bo','70011116','Estudiante de Economía.','100000.20260006.40e2cd66913cf0dc69919c1e64afa9e788bb2b890d7a55ab72a292c668807cce7ea95bab95276c086ece99d1b2095d1644f5a7d4bfccf0f3b90b26374402f391'),
(5,'20260014','Natalia','Suárez','9876554','2004-09-17','Femenino','natalia.suarez@est.umss.edu.bo','70011124','Estudiante de Economía.','100000.20260014.e251c0bca1af671c4ee6658aa9c91b9727fd43d6b9ebc16b00540c1741a52a2ce722fd53239a103d6a7a82f989af55dec9de7084701f48b980f3c4422f170ef4'),
(6,'20260018','Diego','Céspedes','9876558','2002-11-20','Masculino','diego.cespedes@est.umss.edu.bo','70011128','Estudiante de Administración de Empresas.','100000.20260018.9527e95e35e740570b01a1886d3e2da59965c25a08f90e9d0ad575bab105b49517a55b7b4f07ad154d1fbf40281e5717249c0112103d0541cb4a5ce538b38ba1'),
(6,'20260007','Paola','Guzmán','9876547','2003-06-21','Femenino','paola.guzman@est.umss.edu.bo','70011117','Estudiante de Administración.','100000.20260007.a46dfef6d43818d672218b885254a8a43b3b1e02f104c5d177bf8558548b50fd837268a871ffc74d23d750998d5cc6faf20315aaff09be0819727aa44320b108'),
(7,'20260011','Gabriela','Ortiz','9876551','2004-04-12','Femenino','gabriela.ortiz@est.umss.edu.bo','70011121','Estudiante de Contaduría Pública.','100000.20260011.4e0ddcad50dc3f07152e17ec28bd770e185a4158ee04eebff965924e2d5ab99ab7e2533afe946f6a49b6e40399852fc32929e321ab58ad143f91b1ef885ed03a'),
(7,'20260019','María','Salinas','9876559','2004-07-09','Femenino','maria.salinas@est.umss.edu.bo','70011129','Estudiante de Contaduría Pública.','100000.20260019.8501b979f44b17053a8bc0da86860267d9057b9790fa938aadf7e58a47c4ac52c39dc8338a8a619c2eaf90828b336b78c3f7dff55e0da18e6abe751ee7ea4d15'),
(8,'20260008','Fernando','Salazar','9876548','2002-09-30','Masculino','fernando.salazar@est.umss.edu.bo','70011118','Estudiante de Medicina.','100000.20260008.13c51ea1de54439a78197eda039d0eb75be2190ccec54a99402ae2fb0e93157027012ffa58e01b31073424faf4b3b695ee67ff7565ac4d3aa3e35ca24c7435a5'),
(8,'20260020','Alejandro','Paredes','9876560','2003-01-16','Masculino','alejandro.paredes@est.umss.edu.bo','70011130','Estudiante de Medicina.','100000.20260020.9135b70d62f596f71320538e5c0fc41633ab1cc2b61cd1532e2024a19b67236f259a183f32ac055fc41c6e6b75c828f507e770b8302f3af864c06776a2d678b1'),
(9,'20260009','Lucía','Rivera','9876549','2005-01-08','Femenino','lucia.rivera@est.umss.edu.bo','70011119','Estudiante de Odontología.','100000.20260009.1e4047021e910acf2c5fae5b848887d2b1f4f5c5ac950524a7d53e418931c748810853a3bcab38ac1f0095e0104a54ae397aa85d4f4c89b9816e4893860a444a'),
(9,'20260021','Daniela','Molina','9876561','2005-04-23','Femenino','daniela.molina@est.umss.edu.bo','70011131','Estudiante de Odontología.','100000.20260021.4d71d18e6b3d5431e63f57f29e79e4d5d0a1098be0a61a0744eb58ee1396a1728f5f2010a79c2e62fb3527c2d37c4e425bbb235a1c70e5d8d0bd63164fcce747'),
(10,'20260010','Kevin','Morales','9876550','2003-07-14','Masculino','kevin.morales@est.umss.edu.bo','70011120','Estudiante de Derecho.','100000.20260010.a408d34d28b9d68318dfee05a644fc63fd7683a9a8ceb1741424fab85ba6a736854103315d85e5f948c282a4cff41e14d2963ebf6d0ece7501077e4cb319d52e'),
(10,'20260022','Sergio','Velasco','9876562','2002-08-18','Masculino','sergio.velasco@est.umss.edu.bo','70011132','Estudiante de Derecho.','100000.20260022.984e4bb47dfdc958de47ce1668df3f0de9f55031c2ed26d70203e9ecf71df9dbc7ecd4eae731f0ce86e5bd289d90169599030d68e61f6c5a2edc291b3f7fba6f'),
(11,'20260012','Valeria','Castro','9876552','2003-11-25','Femenino','valeria.castro@est.umss.edu.bo','70011122','Estudiante de Psicología.','100000.20260012.a0ad76844cd7921a0c7356160e1ffce40c04b01a94d68695720a663c9c58a37854f2e9d2f9df9abce8981650365b303f68076c9ea733b13ee48ecd89ac3c2db1'),
(11,'20260023','Carla','Aguilar','9876563','2004-12-02','Femenino','carla.aguilar@est.umss.edu.bo','70011133','Estudiante de Psicología.','100000.20260023.6f561f46f7a8741d947de49dfc7c91ba1c287cafa41cb39feb075239ed97facbf9d4c4f03130958e19ef0c1fbc67c0bc277be1fbbee6545e01bd81a35a9ba79b'),
(12,'20260013','Ricardo','Navarro','9876553','2002-06-08','Masculino','ricardo.navarro@est.umss.edu.bo','70011123','Estudiante de Comunicación Social.','100000.20260013.f963913e26e1a9683d776eed9d64d2954ab54b893a267e4e1c15abb56cb0c5091c66228a11898fad097a01d927a3d88347db0d87446e111e908ba28b2e53f7ec'),
(12,'20260024','Mauricio','Zambrana','9876564','2003-09-11','Masculino','mauricio.zambrana@est.umss.edu.bo','70011134','Estudiante de Comunicación Social.','100000.20260024.74d6bd0695560dd7dd7ed492c68192c706a3b0e597b205886386da425318dc3020975df3cb3c11467bc8d15daa19ec3ee8b945e39aa94e451c4e9d0bd700bdb9');

-- docente
INSERT INTO docente (nombre_docente, apellido_docente, correo, telefono)
VALUES ('Juan','Pérez','juan.perez@umss.edu.bo','70700001'),
    ('María','López','maria.lopez@umss.edu.bo','70700002'),
    ('Carlos','García','carlos.garcia@umss.edu.bo','70700003'),
    ('Ana','Rodríguez','ana.rodriguez@umss.edu.bo','70700004'),
    ('Luis','Fernández','luis.fernandez@umss.edu.bo','70700005'),
    ('Patricia','Vargas','patricia.vargas@umss.edu.bo','70700006'),
    ('Roberto','Flores','roberto.flores@umss.edu.bo','70700007'),
    ('Sofía','Mendoza','sofia.mendoza@umss.edu.bo','70700008'),
    ('Jorge','Herrera','jorge.herrera@umss.edu.bo','70700009'),
    ('Daniela','Rojas','daniela.rojas@umss.edu.bo','70700010');

-- materia
INSERT INTO materia (id_carrera, nombre_materia, nivel, creditos, codigo_materia)
VALUES (1,'Programación I',1,5,'SIS101'),
    (1,'Base de Datos I',2,5,'SIS201'),
    (1,'Ingeniería de Software I',3,5,'SIS301'),
    (2,'Programación Orientada a Objetos',1,5,'INF101'),
    (2,'Redes de Computadoras',2,5,'INF201'),
    (2,'Sistemas Operativos',3,5,'INF301'),
    (3,'Cálculo I',1,5,'CIV101'),
    (3,'Física I',1,5,'CIV102'),
    (3,'Resistencia de Materiales',3,5,'CIV301'),
    (4,'Introducción a la Ingeniería Industrial',1,4,'IND101'),
    (4,'Investigación Operativa',3,5,'IND301'),
    (4,'Gestión de la Producción',4,5,'IND401'),
    (5,'Microeconomía',1,5,'ECO101'),
    (5,'Macroeconomía',2,5,'ECO201'),
    (5,'Econometría',3,5,'ECO301'),
    (6,'Administración General',1,5,'ADM101'),
    (6,'Marketing',2,4,'ADM201'),
    (6,'Gestión Financiera',3,5,'ADM301'),
    (7,'Contabilidad General',1,5,'CON101'),
    (7,'Contabilidad de Costos',2,5,'CON201'),
    (7,'Auditoría',3,5,'CON301'),
    (8,'Anatomía Humana',1,6,'MED101'),
    (8,'Fisiología',2,6,'MED201'),
    (8,'Bioquímica',2,5,'MED202'),
    (9,'Anatomía Dental',1,5,'ODO101'),
    (9,'Operatoria Dental',2,5,'ODO201'),
    (9,'Endodoncia',3,5,'ODO301'),
    (10,'Derecho Romano',1,5,'DER101'),
    (10,'Derecho Constitucional',2,5,'DER201'),
    (10,'Derecho Penal',3,5,'DER301'),
    (11,'Psicología General',1,5,'PSI101'),
    (11,'Psicología del Desarrollo',2,5,'PSI201'),
    (11,'Psicología Clínica',3,5,'PSI301'),
    (12,'Teoría de la Comunicación',1,5,'COM101'),
    (12,'Periodismo',2,5,'COM201'),
    (12,'Comunicación Digital',3,5,'COM301');

-- periodo_academico
INSERT INTO periodo_academico (nombre_periodo, gestion)
VALUES ('Primer Semestre',2026),
    ('Segundo Semestre',2026),
    ('Verano',2026),
    ('Invierno',2026);

-- aula
INSERT INTO aula (edificio, num_aula, capacidad)
VALUES ('Edificio A','101',40),
    ('Edificio A','102',40),
    ('Edificio A','103',35),
    ('Edificio B','201',45),
    ('Edificio B','202',45),
    ('Edificio B','203',50),
    ('Laboratorio de Informática','LAB-1',30),
    ('Laboratorio de Informática','LAB-2',30),
    ('Laboratorio de Redes','LAB-3',25),
    ('Auditorio Principal','AUD-1',120);

-- horario
INSERT INTO horario (dia,hora_inicio,hora_fin)
VALUES ('Lunes','08:15','09:45'),
    ('Lunes','09:45','11:15'),
    ('Martes','08:15','09:45'),
    ('Martes','11:15','12:45'),
    ('Miércoles','08:15','09:45'),
    ('Miércoles','11:15','12:45'),
    ('Jueves','06:45','08:15'),
    ('Jueves','11:15','12:45'),
    ('Viernes','18:45','20:15'),
    ('Viernes','15:45','17:15'),
    ('Sábado','08:15','09:45'),
    ('Sábado','11:15','12:45');

-- grupo
INSERT INTO grupo (id_materia, id_docente, id_periodo, codigo_grupo, cupo_maximo)
VALUES (1,1,1,'SIS-A',40),
    (2,2,1,'SIS-B',40),
    (3,3,1,'SIS-C',40),
    (4,4,1,'INF-A',40),
    (5,5,1,'INF-B',40),
    (6,6,1,'INF-C',40),
    (7,7,1,'CIV-A',40),
    (8,8,1,'CIV-B',40),
    (9,9,1,'CIV-C',40),
    (10,10,1,'IND-A',40),
    (11,1,1,'IND-B',40),
    (12,2,1,'IND-C',40),
    (13,3,1,'ECO-A',40),
    (14,4,1,'ECO-B',40),
    (15,5,1,'ECO-C',40),
    (16,6,1,'ADM-A',40),
    (17,7,1,'ADM-B',40),
    (18,8,1,'ADM-C',40),
    (19,9,1,'CON-A',40),
    (20,10,1,'CON-B',40),
    (21,1,1,'CON-C',40),
    (22,2,1,'MED-A',40),
    (23,3,1,'MED-B',40),
    (24,4,1,'MED-C',40),
    (25,5,1,'ODO-A',40),
    (26,6,1,'ODO-B',40),
    (27,7,1,'ODO-C',40),
    (28,8,1,'DER-A',40),
    (29,9,1,'DER-B',40),
    (30,10,1,'DER-C',40),
    (31,1,1,'PSI-A',40),
    (32,2,1,'PSI-B',40),
    (33,3,1,'PSI-C',40),
    (34,4,1,'COM-A',40),
    (35,5,1,'COM-B',40),
    (36,6,1,'COM-C',40);

-- grupo_horario
INSERT INTO grupo_horario (id_grupo, id_horario, id_aula)
VALUES (1,1,7),(2,2,7),(3,3,8),(4,4,8),(5,5,7),(6,6,8),
    (7,7,1),(8,8,2),(9,9,3),(10,10,4),(11,11,5),(12,12,6),
    (13,1,1),(14,2,2),(15,3,3),(16,4,4),(17,5,5),(18,6,6),
    (19,7,1),(20,8,2),(21,9,3),(22,10,4),(23,11,5),(24,12,6),
    (25,1,7),(26,2,8),(27,3,9),(28,4,1),(29,5,2),(30,6,3),
    (31,7,4),(32,8,5),(33,9,6),(34,10,7),(35,11,8),(36,12,9);

-- matricula (1 por estudiante, periodo 1)
INSERT INTO matricula (id_estudiante,id_periodo,semestre)
VALUES (1,1,1),(2,1,1),(3,1,1),(4,1,1),(5,1,1),(6,1,1),(7,1,1),(8,1,1),
    (9,1,1),(10,1,1),(11,1,1),(12,1,1),(13,1,1),(14,1,1),(15,1,1),(16,1,1),
    (17,1,1),(18,1,1),(19,1,1),(20,1,1),(21,1,1),(22,1,1),(23,1,1),(24,1,1);

-- pago_matricula (un pago "Pagado" por cada matricula, habilita la inscripcion)
INSERT INTO pago_matricula (id_matricula, numero_transaccion, fecha_pago, monto, estado_pago)
SELECT id_matricula,
       'TRX-2026-' || LPAD(id_matricula::text, 5, '0'),
       '2026-01-15',
       350.00,
       'Pagado'
FROM matricula;

-- inscripcion
INSERT INTO inscripcion (id_estudiante,id_grupo,fecha_inscripcion,estado,nota_final)
VALUES (1,1,'2026-01-20','Aprobado',91),(1,2,'2026-01-20','Aprobado',88),(1,3,'2026-01-20','Aprobado',95),
    (2,1,'2026-01-20','Aprobado',79),(2,2,'2026-01-20','Aprobado',82),(2,3,'2026-01-20','Reprobado',48),
    (3,4,'2026-01-20','Aprobado',87),(3,5,'2026-01-20','Aprobado',84),(3,6,'2026-01-20','Aprobado',92),
    (4,7,'2026-01-20','Aprobado',83),(4,8,'2026-01-20','Aprobado',80),(4,9,'2026-01-20','Aprobado',78),
    (5,10,'2026-01-20','Aprobado',85),(5,11,'2026-01-20','Aprobado',78),(5,12,'2026-01-20','Aprobado',90),
    (6,10,'2026-01-20','Aprobado',72),(6,11,'2026-01-20','Reprobado',45),(6,12,'2026-01-20','Aprobado',81),
    (7,13,'2026-01-20','Aprobado',88),(7,14,'2026-01-20','Aprobado',91),(7,15,'2026-01-20','Aprobado',84),
    (8,13,'2026-01-20','Aprobado',76),(8,14,'2026-01-20','Reprobado',49),(8,15,'2026-01-20','Aprobado',80),
    (9,16,'2026-01-20','Aprobado',93),(9,17,'2026-01-20','Aprobado',87),(9,18,'2026-01-20','Aprobado',90),
    (10,16,'2026-01-20','Aprobado',70),(10,17,'2026-01-20','Aprobado',75),(10,18,'2026-01-20','Reprobado',40),
    (11,19,'2026-01-20','Aprobado',86),(11,20,'2026-01-20','Aprobado',89),(11,21,'2026-01-20','Aprobado',92),
    (12,19,'2026-01-20','Aprobado',74),(12,20,'2026-01-20','Aprobado',77),(12,21,'2026-01-20','Reprobado',46),
    (13,22,'2026-01-20','Aprobado',95),(13,23,'2026-01-20','Aprobado',90),(13,24,'2026-01-20','Aprobado',88),
    (14,22,'2026-01-20','Aprobado',82),(14,23,'2026-01-20','Aprobado',79),(14,24,'2026-01-20','Reprobado',50),
    (15,7,'2026-01-20','Aprobado',89),(15,8,'2026-01-20','Aprobado',90),(15,9,'2026-01-20','Aprobado',86),
    (16,4,'2026-01-20','Aprobado',76),(16,5,'2026-01-20','Aprobado',81),(16,6,'2026-01-20','Aprobado',73),
    (17,25,'2026-01-20','Aprobado',87),(17,26,'2026-01-20','Aprobado',85),(17,27,'2026-01-20','Aprobado',91),
    (18,25,'2026-01-20','Aprobado',73),(18,26,'2026-01-20','Reprobado',44),(18,27,'2026-01-20','Aprobado',80),
    (19,28,'2026-01-20','Aprobado',84),(19,29,'2026-01-20','Aprobado',88),(19,30,'2026-01-20','Aprobado',79),
    (20,28,'2026-01-20','Aprobado',71),(20,29,'2026-01-20','Reprobado',48),(20,30,'2026-01-20','Aprobado',76),
    (21,31,'2026-01-20','Aprobado',90),(21,32,'2026-01-20','Aprobado',92),(21,33,'2026-01-20','Aprobado',89),
    (22,31,'2026-01-20','Aprobado',78),(22,32,'2026-01-20','Aprobado',81),(22,33,'2026-01-20','Reprobado',43),
    (23,34,'2026-01-20','Aprobado',86),(23,35,'2026-01-20','Aprobado',83),(23,36,'2026-01-20','Aprobado',91),
    (24,34,'2026-01-20','Aprobado',75),(24,35,'2026-01-20','Reprobado',47),(24,36,'2026-01-20','Aprobado',82);
