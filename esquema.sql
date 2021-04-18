create database tienda;
create table productos(
    id integer not null auto_increment,
    nombre varchar(255),
    precio decimal(5, 2),
    fecuc varchar(10),
    primary key(id)
);