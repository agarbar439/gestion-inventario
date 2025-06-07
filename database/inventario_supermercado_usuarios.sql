-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: inventario_supermercado
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.27-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `nombre_usuario` varchar(50) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `rol` enum('administrador','empleado') NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `nombre_usuario` (`nombre_usuario`),
  UNIQUE KEY `correo` (`correo`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'prueba2','prueba12','prue2ba','$2b$10$nZMDNReF4dB/lzqP8xq1mOO4L6tX9CKo8w4JGBr8QsABCCkqUbd1i','prueb2a@gmail.com','administrador'),(15,'antonio','garcia','antonio','$2a$10$dIUGuo49/ZiTvug2xQmICeT4kiE59RoWJRpQAU/ECYzlzqW9wJKIi','antonio@gmail.com','administrador'),(22,'prueba2','prueba2','prueba2','$2a$10$wyw8N80kdJSF8BKf5ABg8eJrBXExAq2iyrEG7P3AGPIsXWK8.228.','prueba2@gmail.com','empleado'),(25,'usuario','usuario','usuario','$2a$10$XDtz/x/rwKkIEA3COJGxoud3qG.N0tPmW1.gG3YDaTJFTm3H/l60y','usuario@gmail.com','empleado'),(34,'prueba12','prue','prueba12','$2a$10$wTBClrbmJvePpnnuHf5zk.zXvosrDeeMsf79rs7LrKg/Nse1Tkb7a','prueba12@gmail.com','empleado'),(35,'invitado','invitado','invitado','$2a$10$w8Wjev8rCI/YoepPenA.SeDhjAYYOIYcKzLUOxHyxrh.xcq.HPJT6','invitado@gmail.com','empleado'),(36,'gg','gg','ggg33','$2a$10$f3D1AkHlkRkiMdyVNpOSL.iJqNwzXdFK71gCAusjxcbjxkOyEQrCO','dd@gmail.com','administrador');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-29 16:59:28
