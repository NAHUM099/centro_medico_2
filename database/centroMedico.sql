CREATE DATABASE centroMedico;

USE centroMedico;

CREATE TABLE `medicos` (
  `cedula` int PRIMARY KEY,
  `nombres` varchar(100),
  `apellidos` varchar(50),
  `especialidad` varchar(150),
  `consultorio` char(3),
  `correo` varchar(100)
);ss

CREATE TABLE `pacientes` (
  `cedula` int PRIMARY KEY,
  `nombre` varchar(50),
  `apllido` varchar(100),
  `edad` int,
  `telefono` int
);

CREATE TABLE `cita_medica` (
  `id_persona` int,
  `id_medico` int,
  `fecha` date
);

ALTER TABLE `cita_medica` ADD FOREIGN KEY (`id_persona`) REFERENCES `pacientes` (`cedula`);

ALTER TABLE `cita_medica` ADD FOREIGN KEY (`id_medico`) REFERENCES `medicos` (`cedula`);

ALTER TABLE `centroMedico`.`cita_medica` 
ADD COLUMN `id` INT NOT NULL AUTO_INCREMENT FIRST,
ADD PRIMARY KEY (`id`);