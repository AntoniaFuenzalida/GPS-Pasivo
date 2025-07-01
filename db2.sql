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

INSERT INTO `Localizacion` (`id`, `mascota_id`, `latitud`, `longitud`, `fecha`) VALUES
(14,	11,	40.4168,	-3.7038,	'2025-06-09 00:01:03'),
(15,	14,	-35.421,	-71.6457,	'2025-06-08 22:06:12'),
(16,	14,	-35.4264,	-71.6379,	'2025-06-08 22:06:33'),
(17,	16,	-33.4521,	-70.6536,	'2025-06-08 23:44:40'),
(18,	16,	-33.4521,	-70.6536,	'2025-06-09 16:41:58'),
(19,	16,	-33.4521,	-70.6536,	'2025-06-09 17:43:35'),
(20,	16,	-35.435,	-71.6644,	'2025-06-09 17:49:29'),
(21,	14,	-34.9241,	-71.313,	'2025-06-15 18:22:52'),
(22,	14,	-34.9241,	-71.313,	'2025-06-15 18:24:06'),
(28,	12,	-34.1683,	-70.7443,	'2025-06-15 18:55:18'),
(44,	14,	-35.4124,	-71.6341,	'2025-06-16 16:46:42'),
(45,	14,	-35.002,	-71.2299,	'2025-06-16 16:47:39'),
(46,	14,	-35.002,	-71.2299,	'2025-06-16 16:47:40'),
(47,	16,	-35.002,	-71.2299,	'2025-06-16 18:06:36'),
(48,	14,	-35.0025,	-71.229,	'2025-06-16 21:10:44'),
(49,	14,	-3.7058,	40.418,	'2025-06-16 21:16:59'),
(50,	14,	-33.4594,	-70.6576,	'2025-06-16 21:17:27'),
(51,	14,	-35.0025,	-71.229,	'2025-06-16 21:18:12'),
(52,	14,	-35.0025,	-71.229,	'2025-06-16 21:18:12'),
(53,	14,	-34.9074,	-71.2948,	'2025-06-18 02:11:32');

CREATE TABLE `LocalizacionDispositivoInfo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `localizacion_id` int DEFAULT NULL,
  `info` text,
  PRIMARY KEY (`id`),
  KEY `localizacion_id` (`localizacion_id`),
  CONSTRAINT `LocalizacionDispositivoInfo_ibfk_1` FOREIGN KEY (`localizacion_id`) REFERENCES `Localizacion` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `LocalizacionDispositivoInfo` (`id`, `localizacion_id`, `info`) VALUES
(1,	14,	'hgcvujvkhjvhvjh'),
(5,	14,	'otra nota'),
(6,	14,	'oootra nota!');

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

INSERT INTO `Mascota` (`id`, `nombre`, `descripcion`, `fecha_registro`, `estado`, `id_dueno`, `nombre_dueno`, `tipo`, `raza`, `edad`, `alergias`) VALUES
(11,	'dsfds',	'Perro maldito',	'2025-06-08',	'monitoreada',	4,	'antonia',	NULL,	NULL,	NULL,	NULL),
(12,	'jejeje',	'Perro gordo',	'2025-06-08',	'monitoreada',	4,	'antonia',	NULL,	NULL,	NULL,	NULL),
(14,	'Fifi',	'',	'2025-06-08',	'monitoreada',	9,	'Erik Soza',	NULL,	NULL,	NULL,	NULL),
(16,	'Chester',	'',	'2025-06-08',	'monitoreada',	9,	'Erik Soza',	NULL,	NULL,	NULL,	NULL),
(17,	'Cheeto',	'Gatito en busca de gatitas',	'2025-06-11',	'monitoreada',	13,	'Gustavo Sánchez',	NULL,	NULL,	NULL,	NULL),
(20,	'laurita maria muñoz',	'',	'2025-06-21',	'monitoreada',	23,	'kekedueno',	'Perro',	'Pastor Alemán',	'2 meses',	'Ta chiquita'),
(21,	'blacky',	'',	'2025-06-21',	'monitoreada',	23,	'kekedueno',	'Perro',	'Kiltro',	'2 años',	''),
(22,	'blacky2',	'',	'2025-06-21',	'monitoreada',	23,	'kekedueno',	'Perro',	'poodle',	'2 años',	'perrito con sinusitis'),
(23,	'Fito',	'',	'2025-06-30',	'monitoreada',	25,	'Miguel Eberhard',	'Perro',	'Sayajin',	'12',	'Es medio choro');

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

INSERT INTO `Usuario` (`telefono`, `id`, `nombre`, `contrasena`, `correo`, `tipo`, `estado`, `fecha`) VALUES
(757749080,	4,	'Antonia Belen ',	'$2b$10$u22bcZWq8thTokEF29rQZ.i49mPeCD4f2n4wyuCo2yglx4d5WQSKC',	'a@hotmail.com',	'dueno',	'Activo',	'2025-06-08'),
(75774908,	6,	'keke2',	'1234',	'keke2@mail.com',	'dueno',	'Activo',	'2025-06-08'),
(75774999,	8,	'hola',	'$2b$10$yIS03TrcH7UVZifpMHAq/eeSC7AF2KKyLElLQhLMcQwCPaNkPKkfK',	'anto@hotmail.com',	NULL,	'Activo',	'2025-06-09'),
(932705775,	9,	'Erik Soza',	'$2b$10$BpPVj//gYBxM30xWriX3MOjHzBhwagxcQoFClqGG.7nav/ql/Lz3e',	'erik@gmail.com',	NULL,	'Activo',	'2025-06-09'),
(NULL,	12,	'Benjamin Pasante',	'$2b$10$Xx7WDcS9NSHTM3sjwq909eePxhmPH2b2xBG4YdDOFkoaecuc8g3be',	'benja@pasante.cl',	NULL,	'Activo',	'2025-06-11'),
(NULL,	13,	'Gustavo Sánchez',	'$2b$10$WFDoDc/BX3jZXheCOEMbHed1W9i4ZfhoKf.7buP.e4mAQS4AFMAOe',	'gustavo@gmail.com',	NULL,	'Activo',	'2025-06-11'),
(NULL,	14,	'Prueba',	'$2b$10$GmbgSHKGqVDlFTbjA0rWeuYlrJmd1ZgwEuEiCw4XZafDjTdD9HueS',	'test@gmail.com',	NULL,	'Activo',	'2025-06-14'),
(NULL,	22,	'keke3',	'$2b$10$HSIBIr77.vBxZD1LwAmDuuX9DF3GEOM2szDMuAKqp8Jahp.7t6TDm',	'keke@mail.com',	'administrador',	'Activo',	'2025-06-16'),
(NULL,	23,	'kekedueno',	'$2b$10$cZeQRZH.FJKAFMxjpdZAyOZYL8secVf829unS5a3PCWpLI4OTph6u',	'keked@mail.com',	NULL,	'Activo',	'2025-06-16'),
(NULL,	24,	'Admin Principal',	'$2b$10$sgkJ.tc8UDUzmKxGXlYY3.58ekbCBvVWg8tScE3di.9eJ0/JgWTUS',	'admin@hotmail.com',	'administrador',	'Activo',	'2025-06-18'),
(NULL,	25,	'Miguel Eberhard',	'$2b$10$ho3rxnDHnv/JYFUj25.oeOYiEqw0YTwE1zp5f4W6rKaFjQXs48ZzG',	'meberhard19@alumnos.utalca.cl',	NULL,	'Activo',	'2025-07-01'),
(NULL,	26,	'Juanito JAJA',	'$2b$10$x03BpbJx6MWFm92xAhJcJubj9XMUgIQhyoLKhv4NRR.EKM5CwuquW',	'miguel.eberhard@hotmail.cl',	'dueno',	'Activo',	'2025-07-01');

-- 2025-07-01 16:03:52 UTC