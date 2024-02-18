-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 13, 2024 at 01:07 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `booking`
--
CREATE DATABASE IF NOT EXISTS `booking` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `booking`;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `userId` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`userId`, `vacationId`) VALUES
(2, 1),
(6, 1),
(6, 2),
(6, 14),
(6, 22),
(7, 1),
(7, 10),
(7, 11),
(8, 1);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `roleId` int(11) NOT NULL,
  `roleName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`roleId`, `roleName`) VALUES
(1, 'Admin'),
(2, 'User');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(30) NOT NULL,
  `lastName` varchar(60) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(200) NOT NULL,
  `roleId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `email`, `password`, `roleId`) VALUES
(1, 'Admin', 'Ehab', 'ehabopto@gmail.com', '38f13a78fbfcd1fd8f2b2147107dbcc11edb051943cac07241f77875d493b1c994cc2c1a7317586a1f3d5eda1cc389c12787feda3e1ee9e511aba35efc3ae827', 1),
(2, 'Ehab', 'User', 'ehab@gmail.com', '38f13a78fbfcd1fd8f2b2147107dbcc11edb051943cac07241f77875d493b1c994cc2c1a7317586a1f3d5eda1cc389c12787feda3e1ee9e511aba35efc3ae827', 2),
(6, 'Ehab2', 'User', 'ehab2@gmail.com', '38f13a78fbfcd1fd8f2b2147107dbcc11edb051943cac07241f77875d493b1c994cc2c1a7317586a1f3d5eda1cc389c12787feda3e1ee9e511aba35efc3ae827', 2),
(7, 'Lisa', 'User', 'lisa@gmail.com', '38f13a78fbfcd1fd8f2b2147107dbcc11edb051943cac07241f77875d493b1c994cc2c1a7317586a1f3d5eda1cc389c12787feda3e1ee9e511aba35efc3ae827', 2),
(8, 'Ehab', 'Hadwan', 'ehab3@gmail.com', '38f13a78fbfcd1fd8f2b2147107dbcc11edb051943cac07241f77875d493b1c994cc2c1a7317586a1f3d5eda1cc389c12787feda3e1ee9e511aba35efc3ae827', 2);

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `destination` varchar(50) NOT NULL,
  `description` varchar(250) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` decimal(5,2) NOT NULL,
  `imageName` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `destination`, `description`, `startDate`, `endDate`, `price`, `imageName`) VALUES
(1, 'Roma', 'Home to some of the world’s most iconic paintings, the Vatican Museums attract huge crowds.', '2023-12-18', '2023-12-28', 767.74, 'c025d35d-2982-496f-965f-823160885baf.jpg'),
(2, 'Barcelona', 'Founded as a Roman city, in the Middle Ages Barcelona became the capital of the County of Barcelona.', '2023-12-20', '2023-12-31', 670.00, 'dbd760b8-a2b5-4a6b-bb86-a913cd80ba2b.webp'),
(3, 'Alaska', 'Alaska is unique and combines sea and glaciers, mountains, forests and animals.', '2024-01-17', '2024-01-26', 999.90, '711971d9-1c60-4973-a337-4c05c98f2fa8.jpeg'),
(4, 'Budapest', 'The capital of Hungary is one of the friendliest destinations for Israelis.', '2024-11-29', '2024-12-04', 500.00, 'b35a7651-a490-40d4-b10f-9b7862574652.jpg'),
(5, 'Maroko', 'Just sand and mountains? Absolutely not, fascinating culture and landscapes that are out of this world.', '2024-04-05', '2024-04-19', 580.00, '05be96f9-9314-42bf-8cc2-dbea47308545.jpg'),
(6, 'London', 'Attracts many tourists especially to the Queen\'s Guard and the famous Big Ben.', '2024-12-04', '2024-12-12', 680.00, 'ac2e3ba7-e28e-4378-9051-f4475f86e4a0.jpg'),
(7, 'Sinai', 'The Sinai Peninsula enchants the travelers with great beaches and a lot of peace.', '2024-02-10', '2024-03-11', 150.00, '0bc1e1c1-2818-42f9-a323-bce16c290372.webp'),
(8, 'Japan', 'In recent years, Japan has become one of the most desirable and popular destinations in the world.', '2024-02-22', '2024-03-05', 999.90, '3abfb489-75f4-4661-9f2b-30e98cfeee40.jpeg'),
(9, 'Cyprus', 'Republic of Cyprus, is an island country located in the eastern Mediterranean Sea, north of the Sinai Peninsula, south of the Anatolian Peninsula, and west of the Levant.', '2023-12-11', '2023-12-14', 499.00, '9c4f688a-8276-49d7-b403-71d4088e3ae8.jpeg'),
(10, 'Dubai', 'The charm of this place - from a small fishing village, has become in 60 years no less than a powerhouse.', '2024-01-02', '2024-01-15', 800.00, '8420e792-1be9-4c1a-979a-b47f82f98a06.webp'),
(11, 'Dublin', 'At the iconic Cliffs of Moher, you can spend time in the visitor’s center and take a walk along the Atlantic Ledge to take in the magnificent scenery and local wildlife. ', '2023-12-26', '2024-01-09', 580.00, 'b04ac356-7ae1-4b2d-a005-8fc16e88bf56.webp'),
(12, 'Paris', 'The city of lights, romantic and chic, beauty and French style.', '2024-02-05', '2024-02-10', 420.00, '1e2380a9-580e-42f3-aa81-d419f2d626df.jpg'),
(13, 'Brazil', 'A beautiful tropical land, a land of carnivals, samba, football and a lot of shades and colors.', '2024-02-26', '2024-03-10', 880.00, '9f05d3a0-67f8-445f-b999-1b1862fad32d.webp'),
(14, 'Arizona', 'The Grand Canyon, in northern Arizona, is one of the most impressive natural sites in the world.', '2024-01-14', '2024-01-31', 890.00, '3d3a99e5-57a6-4dd1-940c-0da85f08b9f6.jpeg'),
(15, 'India', 'You can decide what India is for you after you taste everything it has to offer.', '2024-01-01', '2024-01-13', 672.00, '2de73a08-0b93-4833-a3b2-c36ae26129ef.jpg'),
(16, 'Vitina', 'Vitina House Forest Resort lies on a small valley in the heart of  Mainalon forest.', '2024-02-01', '2024-02-15', 999.90, '4558232a-cef4-4d8c-90d8-b73c64a7ba49.webp'),
(22, 'ARMENIA', 'Republic of Armenia, is a landlocked country in the Armenian Highlands of West Asia.', '2024-01-06', '2024-01-09', 500.00, '69c8c92d-3f2a-4c18-91ef-e7d89ee87b41.jpg'),
(64, 'Nafplio', 'Nafplio or Nauplio is a coastal city located in the Peloponnese in Greece and it is the capital of the regional unit of Argolis and an important touristic destination. ', '2024-01-14', '2024-01-17', 839.00, '51523a93-fd18-4eeb-aabf-b2acf946edf0.jpg'),
(65, 'Canda', 'Canda is a comune in the Province of Rovigo in the Italian region Veneto, located about 80 km southwest of Venice and about 20 km west of Rovigo.', '2024-03-12', '2024-03-18', 999.00, 'cf1a68e8-e87f-4d41-b0ec-e720e501409a.webp');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`userId`,`vacationId`),
  ADD KEY `vacationId` (`vacationId`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`roleId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD KEY `roleId` (`roleId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `roleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`),
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`roleId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
