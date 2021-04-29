create database tienda;
create table productos(
    id integer not null auto_increment,
    nombre varchar(255),
    precio decimal(9, 2),
    fecuc varchar(10),
    primary key(id)
);
create table usuarios(
    id integer not null auto_increment,
    correo varchar(255) NOT NULL UNIQUE,
    palabra_secreta varchar(255) NOT NULL,
    primary key(id)
);
/*
Usuario por defecto
Correo: parzibyte@gmail.com
Contraseña: 123
*/
INSERT INTO `usuarios`(correo, palabra_secreta) VALUES ('parzibyte@gmail.com','$2a$10$7h671u1hAW.8NvbXB6zLw.gD3qxPcSbkR7lUHqIcvTEf1dcbTiePe');