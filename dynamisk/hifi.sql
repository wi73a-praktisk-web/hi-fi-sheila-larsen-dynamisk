-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Vært: 127.0.0.1
-- Genereringstid: 06. 10 2017 kl. 13:11:16
-- Serverversion: 10.1.26-MariaDB
-- PHP-version: 7.1.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hifi`
--

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `kategori`
--

CREATE TABLE `kategori` (
  `id` int(11) NOT NULL,
  `navn` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `kategori`
--

INSERT INTO `kategori` (`id`, `navn`) VALUES
(1, 'CD Afspillere'),
(2, 'DVD Afspillere'),
(3, 'Effektforstærkere'),
(4, 'Forforstærkere'),
(5, 'Højtalere'),
(6, 'Intforstærkere'),
(7, 'Pladespillere'),
(8, 'Rørforstærkere');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `kontakt`
--

CREATE TABLE `kontakt` (
  `id` int(11) NOT NULL,
  `navn` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `besked` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `kontakt`
--

INSERT INTO `kontakt` (`id`, `navn`, `email`, `besked`) VALUES
(1, 's', 'sheila_augusta@hotmail.com', 'ssssssssssssss');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `producent`
--

CREATE TABLE `producent` (
  `id` int(11) NOT NULL,
  `navn` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `producent`
--

INSERT INTO `producent` (`id`, `navn`) VALUES
(7, 'Boesendorfer'),
(1, 'Creek'),
(8, 'Epos'),
(2, 'Exp'),
(3, 'Exposure'),
(9, 'Harbeth'),
(11, 'Jolida'),
(5, 'Manley'),
(4, 'Parasound'),
(10, 'Pro-Ject'),
(6, 'Project');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `produkt`
--

CREATE TABLE `produkt` (
  `id` int(11) NOT NULL,
  `navn` varchar(50) NOT NULL,
  `beskrivelse` text NOT NULL,
  `pris` decimal(10,2) NOT NULL,
  `billede` varchar(250) NOT NULL,
  `fk_kategori_id` int(11) NOT NULL,
  `fk_producent_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `produkt`
--

INSERT INTO `produkt` (`id`, `navn`, `beskrivelse`, `pris`, `billede`, `fk_kategori_id`, `fk_producent_id`) VALUES
(1, 'Creek Classic', 'Dette produkt: \r\n\r\nBum bummelum tralala lala. Bum bummelum tralala la.', '666.66', 'creek_classic.jpg', 1, 1),
(2, 'Creek Classic CD', 'Dette produkt: \r\n\r\nBum bummelum tralala lala. Bum bummelum tralala la.', '616.00', 'creek_classic_cd.jpg', 1, 1),
(3, 'Creek Destiny CD', 'Dette produkt: \r\n\r\nBum bummelum tralala lala. Bum bummelum tralala la.', '404.00', 'creek_Destiny_CD.jpg', 1, 1),
(4, 'Creek Evo CD', 'Dette produkt: \r\n\r\nBum bummelum tralala lala. Bum bummelum tralala la.', '505.00', 'creek_evo_cd.jpg', 1, 1),
(5, 'Exp 2010S CD', 'Dette produkt: \r\n\r\nBum bummelum tralala lala. Bum bummelum tralala la.', '999.99', 'Exp_2010S_CD.gif', 1, 2),
(6, 'Exposure 2010S', 'Dette produkt: \r\n\r\nBum bummelum tralala lala. Bum bummelum tralala la.', '587.95', 'exposure_2010S.jpg', 2, 3),
(7, 'Parasound d200', 'Dette produkt: \r\n\r\nBum bummelum tralala lala. Bum bummelum tralala la.', '789.00', 'parasound_d200.jpg', 2, 4),
(8, 'Parasound Halod3', 'Dette produkt: \r\n\r\nBum bummelum tralala lala. Bum bummelum tralala la.', '654.87', 'parasound_halod3.jpg', 2, 4),
(9, 'Manley Mahi', 'Dette produkt: \r\n\r\nBum bummelum tralala lala. Bum bummelum tralala la.', '123.95', 'manley_mahi.jpg', 3, 5),
(10, 'Manley Neoclassic 300b', 'Dette produkt: \r\n\r\nBum bummelum tralala lala. Bum bummelum tralala la.', '234.00', 'manley_neoclassic300b.jpg', 3, 5),
(11, 'Manley Snapper', 'Dette produkt: \r\n\r\nBum bummelum tralala lala. Bum bummelum tralala la.', '897.00', 'manley_snapper.jpg', 3, 5),
(12, 'Parasound Haloa23', 'Dette produkt: \r\n\r\nBum bummelum tralala lala. Bum bummelum tralala la.', '555.00', 'parasound_haloa23.jpg', 3, 4),
(13, 'Creek OBH 22 Passive Preamp', 'Dette produkt: \r\n\r\nBum bummelum tralala lala. Bum bummelum tralala la.', '0.00', 'Creek_OBH_22_Passive_Preamp.jpg', 4, 1),
(14, 'Parasound Classic 7100', 'Dette produkt: \r\n\r\nBum bummelum tralala lala. Bum bummelum tralala la.', '888.00', 'parasound_classic7100.jpg', 4, 4),
(15, 'Parasound Halop 3', 'Dette produkt: \r\n\r\nBum bummelum tralala lala. Bum bummelum tralala la.', '999.00', 'parasound_halop3.jpg', 4, 4),
(16, 'Project Prebox', 'Dette produkt: \r\n\r\nBum bummelum tralala lala. Bum bummelum tralala la.', '777.00', 'Project_prebox.jpg', 4, 6),
(17, 'Boesendorfer VCS Wall', 'Dette produkt: \r\n\r\nBum bummelum tralala lala. Bum bummelum tralala la.', '666.00', 'boesendorfer_vcs_wall.gif', 5, 7),
(18, 'Epos m5', 'Dette produkt: \r\n\r\nBum bummelum tralala lala. Bum bummelum tralala la.', '111.00', 'epos_m5.gif', 5, 8),
(19, 'Harbeth HL7es2', 'Dette produkt: \r\n\r\nBum bummelum tralala lala. Bum bummelum tralala la.', '333.00', 'harbeth_hl7es2.jpg', 5, 9),
(20, 'Harbeth Monitor 30', 'Dette produkt: \r\n\r\nBum bummelum tralala lala. Bum bummelum tralala la.', '222.00', 'harbeth_monitor30.jpg', 5, 9),
(21, 'Harbeth P3ES2', 'Dette produkt: \r\n\r\nBum bummelum tralala lala. Bum bummelum tralala la.', '753.00', 'harbeth_p3es2.jpg', 5, 9),
(67, 'Creek A50L', 'Dette produkt: \r\n\r\nBum bummelum tralala lala. Bum bummelum tralala la.', '54.00', 'creek_a50I.jpg', 6, 1),
(69, 'Creek Classic 5350SE', 'Dette produkt: \r\n\r\nBum bummelum tralala lala. Bum', '15.00', 'creek_classic5350SE.jpg', 6, 1),
(71, 'Creek Destiny AMP', 'Dette produkt: \r\n\r\nBum bummelum tralala lala. Bum', '12.00', 'creek_destinyamp.jpg', 6, 1),
(73, 'Manley Snapper Deux', 'Dette produkt: \r\n\r\nBum bummelum tralala lala. Bum ', '25.00', 'manley_snapper.jpg', 6, 5),
(74, 'Manley Stingray', 'Dette produkt: \r\n\r\nBum bummelum tralala lala. Bum bummelum tralala lala. Bum bummelum tralala lala. Bum bummelum tralala lala. ', '35.00', 'Manley_Stingray.jpg', 6, 5),
(75, 'Pro-Ject Debut 3 BLUE', 'Dette produkt: \r\n\r\nBum bummelum tralala lala. Bum bummelum tralala lala. Bum bummelum tralala lala. Bum bummelum tralala lala.', '65.00', 'Pro_ject_Debut_3_bl.jpg', 7, 10),
(76, 'Pro-Ject Debut lll RED 1', 'Dette produkt: \r\n\r\nBum bummelum tralala lala. Bum bummelum tralala lala. Bum bummelum tralala lala. Bum bummelum tralala lala.', '45.00', 'Pro_ject_Debut_III_red_1.jpg', 7, 10),
(77, 'Pro-Ject Debut III YELLOW 1', 'Dette produkt: \r\n\r\nBum bummelum tralala lala. Bum bummelum tralala lala. Bum bummelum tralala lala. Bum bummelum tralala lala.', '55.00', 'Pro_ject_Debut_III_yellow_1.jpg', 7, 10),
(78, 'Pro-Ject RPM 5', 'Dette produkt: \r\n\r\nBum bummelum tralala lala. Bum bummelum tralala lala. Bum bummelum tralala lala. Bum bummelum tralala lala.', '26.00', 'Pro_ject_rpm_5.jpg', 7, 10),
(79, 'Pro-Ject RPM 10', 'Dette produkt: \r\n\r\nBum bummelum tralala lala. Bum bummelum tralala lala. Bum bummelum tralala lala. Bum bummelum tralala lala.', '74.00', 'Pro_ject_rpm10.jpg', 7, 10),
(80, 'Jolida JD102B', 'Dette produkt: \r\n\r\nBum bummelum tralala lala. Bum bummelum tralala lala. Bum bummelum tralala lala. Bum bummelum tralala lala.', '96.00', 'jolida_JD102b.jpg', 8, 11),
(81, 'Jolida JD202A', 'Dette produkt: \r\n\r\nBum bummelum tralala lala. Bum bummelum tralala lala. Bum bummelum tralala lala. Bum bummelum tralala lala.', '79.00', 'jolida_JD202a.jpg', 8, 11),
(82, 'Jolida JD300B', 'Dette produkt: \r\n\r\nBum bummelum tralala lala. Bum bummelum tralala lala. Bum bummelum tralala lala. Bum bummelum tralala lala.', '63.00', 'jolida_JD300b.jpg', 8, 11),
(83, 'Jolida JD302B', 'Dette produkt: \r\n\r\nBum bummelum tralala lala. Bum bummelum tralala lala. Bum bummelum tralala lala. Bum bummelum tralala lala.', '111.00', 'jolida_JD302b.jpg', 8, 11),
(84, 'Jolida JD502B', 'Dette produkt: \r\n\r\nBum bummelum tralala lala. Bum bummelum tralala lala. Bum bummelum tralala lala.\r\n', '78.00', 'jolida_JD502b.jpg', 8, 11);

--
-- Begrænsninger for dumpede tabeller
--

--
-- Indeks for tabel `kategori`
--
ALTER TABLE `kategori`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `navn` (`navn`);

--
-- Indeks for tabel `kontakt`
--
ALTER TABLE `kontakt`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `producent`
--
ALTER TABLE `producent`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `navn` (`navn`) USING BTREE;

--
-- Indeks for tabel `produkt`
--
ALTER TABLE `produkt`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`navn`),
  ADD KEY `fk_category_id` (`fk_kategori_id`),
  ADD KEY `fk_manufacturer` (`fk_producent_id`);

--
-- Brug ikke AUTO_INCREMENT for slettede tabeller
--

--
-- Tilføj AUTO_INCREMENT i tabel `kategori`
--
ALTER TABLE `kategori`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- Tilføj AUTO_INCREMENT i tabel `kontakt`
--
ALTER TABLE `kontakt`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- Tilføj AUTO_INCREMENT i tabel `producent`
--
ALTER TABLE `producent`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- Tilføj AUTO_INCREMENT i tabel `produkt`
--
ALTER TABLE `produkt`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;
--
-- Begrænsninger for dumpede tabeller
--

--
-- Begrænsninger for tabel `produkt`
--
ALTER TABLE `produkt`
  ADD CONSTRAINT `produkt_ibfk_1` FOREIGN KEY (`fk_kategori_id`) REFERENCES `kategori` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
