-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 29, 2021 at 06:29 AM
-- Server version: 8.0.22
-- PHP Version: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `crud`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(64) NOT NULL,
  `cart` text NOT NULL,
  `status` varchar(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `email`, `cart`, `status`) VALUES
('62e545db-7b64-41c9-9372-1e0d5379e1f6', 'pastigo.info@gmail.com', '[{\"idCategory\":\"1\",\"strCategory\":\"Beef\",\"strCategoryThumb\":\"https://www.themealdb.com/images/category/beef.png\",\"strCategoryDescription\":\"Beef is the culinary name for meat from cattle, particularly skeletal muscle. Humans have been eating beef since prehistoric times.[1] Beef is a source of high-quality protein and essential nutrients.[2]\"}]', '1'),
('b7b15ac0-e2a0-4890-8b5b-1d36e3af7918', 'pastigo.info@gmail.com', '[{\"idCategory\":\"1\",\"strCategory\":\"Beef\",\"strCategoryThumb\":\"https://www.themealdb.com/images/category/beef.png\",\"strCategoryDescription\":\"Beef is the culinary name for meat from cattle, particularly skeletal muscle. Humans have been eating beef since prehistoric times.[1] Beef is a source of high-quality protein and essential nutrients.[2]\"}]', '1'),
('b8d05351-396c-4d66-ae44-402b32e63a56', 'pastigo.info@gmail.com', '[{\"idCategory\":\"1\",\"strCategory\":\"Beef\",\"strCategoryThumb\":\"https://www.themealdb.com/images/category/beef.png\",\"strCategoryDescription\":\"Beef is the culinary name for meat from cattle, particularly skeletal muscle. Humans have been eating beef since prehistoric times.[1] Beef is a source of high-quality protein and essential nutrients.[2]\"}]', '1'),
('e772d9b1-20b0-4e93-beba-5d671b228b11', 'pastigo.info@gmail.com', '[{\"idCategory\":\"1\",\"strCategory\":\"Beef\",\"strCategoryThumb\":\"https://www.themealdb.com/images/category/beef.png\",\"strCategoryDescription\":\"Beef is the culinary name for meat from cattle, particularly skeletal muscle. Humans have been eating beef since prehistoric times.[1] Beef is a source of high-quality protein and essential nutrients.[2]\"}]', '1'),
('f880ca34-c6b9-42cd-b3df-71821fd10da9', 'pastigo.info@gmail.com', '[{\"idCategory\":\"1\",\"strCategory\":\"Beef\",\"strCategoryThumb\":\"https://www.themealdb.com/images/category/beef.png\",\"strCategoryDescription\":\"Beef is the culinary name for meat from cattle, particularly skeletal muscle. Humans have been eating beef since prehistoric times.[1] Beef is a source of high-quality protein and essential nutrients.[2]\"}]', '1');

-- --------------------------------------------------------

--
-- Table structure for table `data_karyawan`
--

CREATE TABLE `data_karyawan` (
  `username` varchar(64) NOT NULL,
  `email` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `passwordText` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `data_karyawan`
--

INSERT INTO `data_karyawan` (`username`, `email`, `password`, `passwordText`) VALUES
('ITD-20210001', 'bantartrisna@gmail.com', '$2a$10$/TPXjLkhNIqb9Pwp4fGsju9JucNpOWBG253F.xl0oN4pns.Yy8e8e', '1'),
('pastigo.info@gmail.com', 'bantartrisna@gmail.com', '$2a$10$YPf9YygwamAGjFSTcZejReLMdUDjyj22.55qtthA6xcnB4JPgCGy6', '1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `data_karyawan`
--
ALTER TABLE `data_karyawan`
  ADD PRIMARY KEY (`username`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
