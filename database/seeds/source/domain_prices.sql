/*
SQLyog Community v11.52 (64 bit)
MySQL - 5.7.31 : Database - bizinabo_site
*********************************************************************
*/


/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`bizinabox_db` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `bizinabox_db`;

/*Table structure for table `domain_prices` */

DROP TABLE IF EXISTS `domain_prices`;

CREATE TABLE `domain_prices` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `tld` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Action` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Duration` int(11) NOT NULL,
  `DurationType` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Price` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `PricingType` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `AdditionalCost` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `RegularPrice` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `RegularPriceType` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `RegularAdditionalCost` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `RegularAdditionalCostType` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `YourPrice` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `YourPriceType` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `YourAdditonalCost` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `YourAdditonalCostType` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `PromotionPrice` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Currency` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `addPrice` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9505 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `domain_prices` */


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;