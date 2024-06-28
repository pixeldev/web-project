CREATE TABLE IF NOT EXISTS alcaldia
(
    id     SERIAL PRIMARY KEY,
    nombre VARCHAR(32) NOT NULL,
    zona   INT         NOT NULL
);

INSERT INTO alcaldia (nombre, zona)
VALUES ('Álvaro Obregón', 1),
       ('Azcapotzalco', 1),
       ('Benito Juárez', 1),
       ('Coyoacán', 4),
       ('Cuajimalpa', 1),
       ('Cuauhtémoc', 1),
       ('Gustavo A. Madero', 2),
       ('Iztacalco', 2),
       ('Iztapalapa', 2),
       ('Magdalena Contreras', 4),
       ('Miguel Hidalgo', 1),
       ('Milpa Alta', 3),
       ('Tláhuac', 3),
       ('Tlalpan', 4),
       ('Venustiano Carranza', 2),
       ('Xochimilco', 3);

CREATE TABLE IF NOT EXISTS persona_direccion
(
    id            SERIAL PRIMARY KEY,
    calle         VARCHAR(100) NOT NULL,
    colonia       VARCHAR(100) NOT NULL,
    numero_int    VARCHAR(25),
    numero_ext    VARCHAR(25)  NOT NULL,
    alcaldia      INT          NOT NULL,
    codigo_postal VARCHAR(5)   NOT NULL,
    FOREIGN KEY (alcaldia) REFERENCES alcaldia (id)
);

CREATE TYPE rol_persona AS ENUM ('admin', 'usuario', 'tecnico');

CREATE TABLE IF NOT EXISTS persona
(
    id               SERIAL PRIMARY KEY,
    nombres          VARCHAR(64)        NOT NULL,
    apellido_paterno VARCHAR(64)        NOT NULL,
    apellido_materno VARCHAR(64)        NOT NULL,
    email            VARCHAR(64) UNIQUE NOT NULL,
    contrasena       VARCHAR(512)       NOT NULL,
    telefono         VARCHAR(10)        NOT NULL,
    direccion_id     INT                NOT NULL,
    rol              rol_persona        NOT NULL DEFAULT 'usuario',
    autenticado      BOOLEAN            NOT NULL DEFAULT FALSE,
    registro         TIMESTAMP          NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (direccion_id) REFERENCES persona_direccion (id)
);

CREATE TABLE IF NOT EXISTS usuario
(
    id                    SERIAL PRIMARY KEY,
    id_persona            INT     NOT NULL,
    servicios_solicitados INT     NOT NULL DEFAULT 0,
    servicio_activo       BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (id_persona) REFERENCES persona (id)
);

CREATE TABLE IF NOT EXISTS tipo_servicio
(
    id     SERIAL PRIMARY KEY,
    costo  DECIMAL(10, 2) NOT NULL,
    nombre VARCHAR(64)    NOT NULL
);

INSERT INTO tipo_servicio (costo, nombre)
VALUES (1200, 'Mantenimiento preventivo y lavado de tinacos');
INSERT INTO tipo_servicio (costo, nombre)
VALUES (900, 'Reparación de fuga de agua');
INSERT INTO tipo_servicio (costo, nombre)
VALUES (2500, 'Instalación de calentador de agua');

CREATE TABLE IF NOT EXISTS material
(
    id     SERIAL PRIMARY KEY UNIQUE,
    nombre VARCHAR(80)    NOT NULL,
    precio DECIMAL(10, 2) NOT NULL
);

INSERT INTO material (nombre, precio)
VALUES ('Filtro de tinaco', 300),
       ('Solución sanitizante antibacterial', 100),
       ('Cepillo con extensor', 70),
       ('Tubo de cobre de 1/2 pulgada', 200),
       ('Codo de 1/2 pulgada', 15),
       ('Soldadura', 120),
       ('Tubo de gas butano de 1/2 litro', 60),
       ('Kit de mangueras de agua caliente, fria y gas', 350),
       ('Cinta Teflón', 40),
       ('Válvula de presión inversa de 1/2 pulgada', 300);

CREATE TABLE IF NOT EXISTS tipo_servicio_material
(
    id_tipo_servicio INT NOT NULL,
    id_material      INT NOT NULL,
    cantidad         INT NOT NULL,
    FOREIGN KEY (id_tipo_servicio) REFERENCES tipo_servicio (id),
    FOREIGN KEY (id_material) REFERENCES material (id)
);

INSERT INTO tipo_servicio_material(id_material, id_tipo_servicio, cantidad)
VALUES (1, 1, 1),
       (2, 1, 1),
       (3, 1, 1),
       (4, 2, 3),
       (5, 2, 5),
       (6, 2, 2),
       (7, 2, 1),
       (8, 3, 1),
       (9, 3, 1),
       (10, 3, 2);

CREATE TABLE IF NOT EXISTS tecnico
(
    id                   SERIAL PRIMARY KEY,
    id_persona           INT     NOT NULL,
    activo               BOOLEAN NOT NULL DEFAULT TRUE,
    servicios_activos    INT     NOT NULL DEFAULT 0,
    servicios_realizados INT     NOT NULL DEFAULT 0,
    FOREIGN KEY (id_persona) REFERENCES persona (id)
);

CREATE TYPE estado_servicio AS ENUM ('pendiente', 'en_curso', 'finalizado');

CREATE TABLE IF NOT EXISTS servicio_solicitud
(
    id              SERIAL PRIMARY KEY,
    fecha_solicitud TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_servicio  DATE            NOT NULL,
    hora_servicio   TIME            NOT NULL,
    id_persona      INT             NOT NULL,
    id_tecnico      INT             NOT NULL,
    tipo_servicio   INT             NOT NULL,
    descripcion     TEXT,
    estado          estado_servicio NOT NULL DEFAULT 'pendiente',
    FOREIGN KEY (id_persona) REFERENCES persona (id),
    FOREIGN KEY (id_tecnico) REFERENCES tecnico (id),
    FOREIGN KEY (tipo_servicio) REFERENCES tipo_servicio (id)
);

-- Cuenta de administrador
INSERT INTO persona_direccion (calle, colonia, numero_ext, alcaldia, codigo_postal)
VALUES ('Lago Silverio', 'Anáhuac I Secc', '253', 11, '11320');

INSERT INTO persona (nombres, apellido_paterno, apellido_materno, email, contrasena, telefono, direccion_id, rol)
VALUES ('Julio Darikson', 'Mazariegos', 'Aguilar', 'admin@fugafix.com',
        '7fcf4ba391c48784edde599889d6e3f1e47a27db36ecc050cc92f259bfac38afad2c68a1ae804d77075e8fb722503f3eca2b2c1006ee6f6c7b7628cb45fffd1d',
        '5512345678', 1, 'admin');

INSERT INTO persona_direccion (calle, colonia, numero_ext, alcaldia, codigo_postal)
VALUES
    ('Calle 1', 'Colonia A', '100', 1, '01000'), -- Zona 1
    ('Calle 2', 'Colonia B', '200', 8, '02000'), -- Zona 2
    ('Calle 3', 'Colonia C', '300', 13, '03000'), -- Zona 3
    ('Calle 4', 'Colonia D', '400', 4, '04000'); -- Zona 4


INSERT INTO persona (nombres, apellido_paterno, apellido_materno, email, contrasena, telefono, direccion_id, rol)
VALUES
    ('Técnico1zona1', 'Apellido1', 'Apellido1', 'tecnico1_zona1@example.com', 'hashedpassword1', '5512345671', 2, 'tecnico'),
    ('Técnico2zona1', 'Apellido2', 'Apellido2', 'tecnico2_zona1@example.com', 'hashedpassword2', '5512345672', 2, 'tecnico'),
    ('Usuario1zona1', 'Apellido1', 'Apellido1', 'usuario1_zona1@example.com', 'hashedpassword3', '5512345681', 2, 'usuario'),
    ('Usuario2zona1', 'Apellido2', 'Apellido2', 'usuario2_zona1@example.com', 'hashedpassword4', '5512345682', 2, 'usuario');

-- Zona 2
INSERT INTO persona (nombres, apellido_paterno, apellido_materno, email, contrasena, telefono, direccion_id, rol)
VALUES
    ('Técnico3zona2', 'Apellido3', 'Apellido3', 'tecnico3_zona2@example.com', 'hashedpassword5', '5512345673', 3, 'tecnico'),
    ('Técnico4zona2', 'Apellido4', 'Apellido4', 'tecnico4_zona2@example.com', 'hashedpassword6', '5512345674', 3, 'tecnico'),
    ('Usuario3zona2', 'Apellido3', 'Apellido3', 'usuario3_zona2@example.com', 'hashedpassword7', '5512345683', 3, 'usuario'),
    ('Usuario4zona2', 'Apellido4', 'Apellido4', 'usuario4_zona2@example.com', 'hashedpassword8', '5512345684', 3, 'usuario');

-- Zona 3
INSERT INTO persona (nombres, apellido_paterno, apellido_materno, email, contrasena, telefono, direccion_id, rol)
VALUES
    ('Técnico5zona3', 'Apellido5', 'Apellido5', 'tecnico5_zona3@example.com', 'hashedpassword9', '5512345675', 4, 'tecnico'),
    ('Técnico6zona3', 'Apellido6', 'Apellido6', 'tecnico6_zona3@example.com', 'hashedpassword10', '5512345676', 4, 'tecnico'),
    ('Usuario5zona3', 'Apellido5', 'Apellido5', 'usuario5_zona3@example.com', 'hashedpassword11', '5512345685', 4, 'usuario'),
    ('Usuario6zona3', 'Apellido6', 'Apellido6', 'usuario6_zona3@example.com', 'hashedpassword12', '5512345686', 4, 'usuario');

-- Zona 4
INSERT INTO persona (nombres, apellido_paterno, apellido_materno, email, contrasena, telefono, direccion_id, rol)
VALUES
    ('Técnico7zona4', 'Apellido7', 'Apellido7', 'tecnico7_zona4@example.com', 'hashedpassword13', '5512345677', 5, 'tecnico'),
    ('Técnico8zona4', 'Apellido8', 'Apellido8', 'tecnico8_zona4@example.com', 'hashedpassword14', '5512345678', 5, 'tecnico'),
    ('Usuario7zona4', 'Apellido7', 'Apellido7', 'usuario7_zona4@example.com', 'hashedpassword15', '5512345687', 5, 'usuario'),
    ('Usuario8zona4', 'Apellido8', 'Apellido8', 'usuario8_zona4@example.com', 'hashedpassword16', '5512345688', 5, 'usuario');


INSERT INTO tecnico (id_persona)
SELECT id FROM persona WHERE rol = 'tecnico';
