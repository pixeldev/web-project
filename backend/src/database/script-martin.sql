create table usuario
(
    id_usuario       serial primary key,
    nombre           varchar(30),
    apellido_paterno varchar(20),
    apellido_materno varchar(20),
    telefono         bigint,
    calle            varchar(35),
    colonia          varchar(35),
    numero_ext       varchar(25),
    numero_int       varchar(25),
    alcaldia         varchar(35)
);

create table tecnico
(
    id_tecnico      serial primary key,
    nombre_completo varchar(70),
    zona            int,
    salario         int,
    estado          varchar(35)
);

create table tipo_servicio
(
    id_tipo_servicio serial primary key,
    nombre           varchar(70),
    precio           int
);

create table material
(
    id_material serial primary key,
    nombre      varchar(80),
    precio      int,
    descripcion varchar(120)
);

create table almacen
(
    id_almacen serial primary key,
    nombre     varchar(50),
    ubicacion  varchar(100)
);

create table servicio
(
    id_servicio      serial primary key,
    fecha            timestamp without time zone,
    descripcion      varchar(400),
    estado           varchar(15),
    id_usuario       int,
    foreign key (id_usuario) references usuario (id_usuario),
    id_tecnico       int,
    foreign key (id_tecnico) references tecnico (id_tecnico),
    id_tipo_servicio int,
    foreign key (id_tipo_servicio) references tipo_servicio (id_tipo_servicio)
);

create table tipo_servicio_material
(
    id_tipo_servicio int,
    foreign key (id_tipo_servicio) references tipo_servicio (id_tipo_servicio),
    id_material      int,
    foreign key (id_material) references material (id_material),
    cantidad         int
);

create table almacen_material
(
    id_material   int,
    foreign key (id_material) references material (id_material),
    id_almacen    int,
    foreign key (id_almacen) references almacen (id_almacen),
    fecha_restock date,
    cantidad      int
);

INSERT INTO tipo_servicio (nombre, precio)
VALUES ('Mantenimiento preventivo y lavado de tinacos', 1300),
       ('Reparación de fuga de agua', 1200),
       ('Instalación calentador de agua', 1600);

INSERT INTO usuario (nombre, telefono, calle, colonia, numero_ext, numero_int, alcaldia)
VALUES ('Juan Perez', 5551234, 'Av. Siempre Viva', 'Centro', '100', '100', 'Benito Juárez'),
       ('Maria Lopez', 5334321, 'Calle Falsa', 'Norte', '200', '200', 'Coyoacán'),
       ('Pedro marin', 5558934, 'av.centenario', 'Sur', '300', '300', 'Milpa Alta'),
       ('Luis Rodriguez', 5563321, '5 de mayo', 'oeste', '400', '400', 'Iztapalapa');

INSERT INTO tecnico (nombre_completo, zona, salario, estado)
VALUES ('Juan Patricio', 1, 450, 'Activo'),
       ('Shohei Ohtani', 2, 450, 'Activo'),
       ('Mario Castillo', 3, 450, 'Activo'),
       ('Jhon Cena', 4, 450, 'Activo'),
       ('Oscar Parado', 1, 450, 'Activo'),
       ('Julio Iglesias', 2, 450, 'Activo'),
       ('David Rojas', 3, 450, 'Activo'),
       ('Pedro picapiedra', 450, 'Activo');

INSERT INTO material (nombre, precio, descripcion)
VALUES ('Filtro de tinaco', 300, '  '),
       ('Solución sanitizante antibacterial', 100, '  '),
       ('Cepillo con extensor', 70, '  '),
       ('Tubo de cobre de 1/2 pulgada', 200, '  '),
       ('Codo de 1/2 pulgada', 15, '  '),
       ('Soldadura', 120, '  '),
       ('Tubo de gas butano de 1/2 litro', 60, '  '),
       ('Kit de mangueras de agua caliente, fria y gas', 350, '  '),
       ('Cinta Teflón', 40, '  '),
       ('Válvula de presión inversa de 1/2 pulgada', 300, '  ');

insert into almacen (nombre, ubicacion)
VALUES ('bodega', 'centrocentro');

insert into tipo_servicio_material(id_material, id_tipo_servicio, cantidad)
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

insert into almacen_material(id_material, id_almacen, fecha_restock, cantidad)
VALUES (1, 1, '2023-06-21', 10),
       (2, 1, '2023-06-21', 20),
       (3, 1, '2023-06-21', 30),
       (4, 1, '2023-06-21', 40),
       (5, 1, '2023-06-21', 50),
       (6, 1, '2023-06-21', 60),
       (7, 1, '2023-06-21', 70),
       (8, 1, '2023-06-21', 80),
       (9, 1, '2023-06-21', 90),
       (10, 1, '2023-06-21', 100);

----INSERT INTO servicio (Fecha, descripcion, estado, id_usuario, id_tecnico, id_tipo_servicio) VALUES