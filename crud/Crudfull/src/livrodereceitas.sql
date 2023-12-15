CREATE SCHEMA IF NOT EXISTS `livrodereceitas` DEFAULT CHARACTER SET utf8 ;
USE `livrodereceitas` ;


CREATE TABLE IF NOT EXISTS `livrodereceitas`.`receitas` (
  `idreceita` INT NOT NULL AUTO_INCREMENT,
  `nomereceita` VARCHAR(45) NOT NULL,
  `ingredientes` TEXT NOT NULL,
  `preparo` TEXT NOT NULL,
  `rendimento` varchar(50) NULL,
  `tempo` varchar(20) NULL,
  PRIMARY KEY (`idreceita`))
ENGINE = InnoDB;

