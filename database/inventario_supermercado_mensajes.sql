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
-- Table structure for table `mensajes`
--

DROP TABLE IF EXISTS `mensajes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mensajes` (
  `id_mensaje` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `contenido` text NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id_mensaje`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `mensajes_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mensajes`
--

LOCK TABLES `mensajes` WRITE;
/*!40000 ALTER TABLE `mensajes` DISABLE KEYS */;
INSERT INTO `mensajes` VALUES (1,15,'Hola!','2025-04-17 14:47:13'),(2,15,'Hola!','2025-04-17 14:51:59'),(3,15,'Hola!','2025-04-17 14:54:31'),(4,34,'Hola 2!','2025-04-19 14:27:23'),(5,34,'Hola 3!','2025-04-19 14:27:27'),(6,34,'Hola 3!','2025-04-19 14:56:32'),(7,34,'Hola 3!','2025-04-19 14:56:36'),(8,34,'Hola 3!','2025-04-19 14:56:37'),(9,34,'Hola 3!','2025-04-19 14:56:38'),(10,34,'Hola 3!','2025-04-19 14:56:38'),(11,15,'Hola 3!','2025-04-19 14:57:16'),(12,15,'Hola 3!','2025-04-19 14:57:17'),(13,15,'Hola 3!','2025-04-19 14:57:18'),(14,15,'Nuevo mensaje','2025-04-19 15:46:47'),(15,15,'ttt','2025-04-19 15:47:33'),(16,34,'holaa\n','2025-04-19 15:48:05'),(17,15,'oo','2025-04-20 13:53:14'),(18,15,'dvcv','2025-04-24 18:41:42'),(19,15,'bb','2025-04-24 18:41:45'),(20,35,'jj','2025-05-01 10:24:39'),(21,35,'hh','2025-05-01 10:29:29'),(22,35,'n','2025-05-01 10:29:36'),(23,35,'g','2025-05-01 10:32:44'),(24,35,'hhhh','2025-05-01 10:32:59'),(25,15,'gg','2025-05-02 14:16:33'),(26,15,'ggggg','2025-05-11 16:52:23'),(27,15,'bbb','2025-05-11 16:52:33'),(28,15,'bbb','2025-05-11 16:52:40'),(29,15,'b','2025-05-11 16:53:48'),(30,15,'ddd','2025-05-11 16:53:52'),(31,15,'aa','2025-05-11 16:54:43'),(32,15,'dd','2025-05-11 16:54:47'),(33,35,'ff','2025-05-11 16:56:29');
/*!40000 ALTER TABLE `mensajes` ENABLE KEYS */;
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
