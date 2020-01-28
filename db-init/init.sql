DROP TABLE IF EXISTS `employee_directory.employee`;
CREATE TABLE `employee_directory.employee` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `first_name` varchar(45) NOT NULL,
	`last_name` varchar(45) NOT NULL,
	`email` varchar(45) NOT NULL,
    PRIMARY KEY(`id`)
);