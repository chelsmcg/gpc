-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 18, 2016 at 09:52 AM
-- Server version: 10.1.13-MariaDB
-- PHP Version: 7.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gpc_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `files`
--

CREATE TABLE `files` (
  `id` int(30) NOT NULL,
  `type` varchar(90) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ftpConfig`
--

CREATE TABLE `ftpConfig` (
  `id` int(11) NOT NULL,
  `hostName` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `username` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `ftpConfig`
--

INSERT INTO `ftpConfig` (`id`, `hostName`, `username`, `password`) VALUES
(1, 'ftp2.success-systems.com.au', 'PortalTest', 'PortalTest');

-- --------------------------------------------------------

--
-- Table structure for table `issueReplies`
--

CREATE TABLE `issueReplies` (
  `id` int(11) NOT NULL,
  `status` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `replyText` text COLLATE utf8_unicode_ci,
  `timestamp` int(30) DEFAULT NULL,
  `userId` int(30) NOT NULL,
  `iId` int(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `issues`
--

CREATE TABLE `issues` (
  `id` int(11) NOT NULL,
  `issueSubject` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `issueText` text COLLATE utf8_unicode_ci,
  `status` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `timestamp` int(30) NOT NULL,
  `userId` int(30) NOT NULL,
  `pId` int(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `packages`
--

CREATE TABLE `packages` (
  `id` int(11) NOT NULL,
  `name` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `type` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `category` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `priority` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `vendor` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `version` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `operatingSystem` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `appID` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `revision` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `comments` text COLLATE utf8_unicode_ci,
  `docFile` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sourceFile` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `added` int(15) DEFAULT NULL,
  `addedBy` int(20) DEFAULT NULL,
  `assignedPackager` int(20) DEFAULT NULL,
  `assignedQA` int(20) DEFAULT NULL,
  `assignedUAT` int(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(30) NOT NULL,
  `type` varchar(90) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `type`) VALUES
(1, 'Administrator');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(90) COLLATE utf8_unicode_ci DEFAULT NULL,
  `userName` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `fName` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `lName` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `hasLoggedin` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `userName`, `password`, `fName`, `lName`, `hasLoggedin`) VALUES
(1, 'jim.mcguinness@success-systems.com.au', 'jim.mcguinness', '$2y$11$gdFGi.hyW4IVe6Ylf9Sdcugn/R/RaG0laqIO7UtBsxqSp9mXYRAqm', 'Jim', 'McGuinness', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`id`,`type`);

--
-- Indexes for table `ftpConfig`
--
ALTER TABLE `ftpConfig`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `issueReplies`
--
ALTER TABLE `issueReplies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `iId` (`iId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `issues`
--
ALTER TABLE `issues`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pId` (`pId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `packages`
--
ALTER TABLE `packages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`,`type`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ftpConfig`
--
ALTER TABLE `ftpConfig`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `issueReplies`
--
ALTER TABLE `issueReplies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT for table `issues`
--
ALTER TABLE `issues`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT for table `packages`
--
ALTER TABLE `packages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `files`
--
ALTER TABLE `files`
  ADD CONSTRAINT `files_ibfk_1` FOREIGN KEY (`id`) REFERENCES `packages` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `issueReplies`
--
ALTER TABLE `issueReplies`
  ADD CONSTRAINT `issuereplies_ibfk_1` FOREIGN KEY (`iId`) REFERENCES `issues` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `issuereplies_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `issues`
--
ALTER TABLE `issues`
  ADD CONSTRAINT `issues_ibfk_1` FOREIGN KEY (`pId`) REFERENCES `packages` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `issues_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `roles`
--
ALTER TABLE `roles`
  ADD CONSTRAINT `roles_ibfk_1` FOREIGN KEY (`id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
