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