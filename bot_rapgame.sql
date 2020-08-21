-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  ven. 21 août 2020 à 20:22
-- Version du serveur :  10.4.10-MariaDB
-- Version de PHP :  7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `bot_rapgame`
--

-- --------------------------------------------------------

--
-- Structure de la table `acquisitions`
--

DROP TABLE IF EXISTS `acquisitions`;
CREATE TABLE IF NOT EXISTS `acquisitions` (
  `id_acquisition` int(11) NOT NULL AUTO_INCREMENT,
  `id_rappeur` int(11) NOT NULL,
  `id_joueur` varchar(50) NOT NULL,
  PRIMARY KEY (`id_acquisition`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `acquisitions`
--

INSERT INTO `acquisitions` (`id_acquisition`, `id_rappeur`, `id_joueur`) VALUES
(3, 4, '153518315107516416'),
(4, 1, '153518315107516416');

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id_categorie` int(11) NOT NULL AUTO_INCREMENT,
  `intitule_categorie` varchar(25) NOT NULL,
  PRIMARY KEY (`id_categorie`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`id_categorie`, `intitule_categorie`) VALUES
(1, 'Rappeurs Français'),
(2, 'Rappeurs US');

-- --------------------------------------------------------

--
-- Structure de la table `joueurs`
--

DROP TABLE IF EXISTS `joueurs`;
CREATE TABLE IF NOT EXISTS `joueurs` (
  `id_joueur` varchar(50) NOT NULL,
  PRIMARY KEY (`id_joueur`)
) ENGINE=MyISAM AUTO_INCREMENT=153518315107516417 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `joueurs`
--

INSERT INTO `joueurs` (`id_joueur`) VALUES
('153518315107516416');

-- --------------------------------------------------------

--
-- Structure de la table `rappeurs`
--

DROP TABLE IF EXISTS `rappeurs`;
CREATE TABLE IF NOT EXISTS `rappeurs` (
  `id_rappeur` int(11) NOT NULL AUTO_INCREMENT,
  `nom_rappeur` varchar(50) NOT NULL,
  `dob_rappeur` varchar(10) NOT NULL,
  `img_rappeur` varchar(255) NOT NULL,
  `style_rappeur` varchar(25) NOT NULL,
  `rarete_rappeur` char(1) NOT NULL,
  `dispo_rappeur` tinyint(1) NOT NULL,
  `id_categorie` int(11) NOT NULL,
  PRIMARY KEY (`id_rappeur`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `rappeurs`
--

INSERT INTO `rappeurs` (`id_rappeur`, `nom_rappeur`, `dob_rappeur`, `img_rappeur`, `style_rappeur`, `rarete_rappeur`, `dispo_rappeur`, `id_categorie`) VALUES
(1, 'Booba', '09/12/1976', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Festival_des_Vieilles_Charrues_2019_-_Booba_-_038.jpg/1200px-Festival_des_Vieilles_Charrues_2019_-_Booba_-_038.jpg', 'Trap', 'S', 1, 1),
(3, 'Kaaris', '30/01/1980', 'https://cdn.radiofrance.fr/s3/cruiser-production/2018/08/2fe40a6a-d738-4248-a25c-68fb659f50e8/400x400_kaaris_-_credit_edilson.jpg', 'Trap', 'S', 1, 1),
(4, 'Damso', '10/05/1992', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Festival_des_Vieilles_Charrues_2018_-_Damso_-_009_%28cropped%29.jpg/1200px-Festival_des_Vieilles_Charrues_2018_-_Damso_-_009_%28cropped%29.jpg', 'Trap', 'S', 1, 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
