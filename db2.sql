SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

CREATE DATABASE `gps` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `gps`;

CREATE TABLE `Localizacion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mascota_id` int DEFAULT NULL,
  `latitud` float DEFAULT NULL,
  `longitud` float DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `mascota_id` (`mascota_id`),
  CONSTRAINT `Localizacion_ibfk_1` FOREIGN KEY (`mascota_id`) REFERENCES `Mascota` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `LocalizacionDispositivoInfo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `localizacion_id` int DEFAULT NULL,
  `info` text,
  PRIMARY KEY (`id`),
  KEY `localizacion_id` (`localizacion_id`),
  CONSTRAINT `LocalizacionDispositivoInfo_ibfk_1` FOREIGN KEY (`localizacion_id`) REFERENCES `Localizacion` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `Mascota` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `descripcion` text,
  `fecha_registro` date DEFAULT NULL,
  `estado` enum('perdida','monitoreada') DEFAULT NULL,
  `id_dueno` int DEFAULT NULL,
  `nombre_dueno` varchar(100) DEFAULT NULL,
  `tipo` tinytext,
  `raza` tinytext,
  `edad` tinytext,
  `alergias` text,
  PRIMARY KEY (`id`),
  KEY `id_dueno` (`id_dueno`),
  CONSTRAINT `Mascota_ibfk_1` FOREIGN KEY (`id_dueno`) REFERENCES `Usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `Usuario` (
  `telefono` int DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `contrasena` varchar(255) DEFAULT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `tipo` enum('administrador','dueno') DEFAULT NULL,
  `estado` varchar(20) DEFAULT 'Activo',
  `fecha` date NOT NULL DEFAULT (curdate()),
  PRIMARY KEY (`id`),
  UNIQUE KEY `correo` (`correo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;