DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS issues;
DROP TABLE IF EXISTS files;
DROP TABLE IF EXISTS packages;


CREATE TABLE users (
	id INT NOT NULL AUTO_INCREMENT,
	email VARCHAR(90),
	userName VARCHAR(200),
	password VARCHAR(200),
	fName VARCHAR(100),
	lName VARCHAR(100),
	hasLoggedin BOOLEAN DEFAULT 0,
	PRIMARY KEY (id)
);

CREATE TABLE roles (
	id INT(30),
	type VARCHAR(90),
	CONSTRAINT pk_roleId PRIMARY KEY (id, type),
	FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE
);


CREATE TABLE packages (
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(200) DEFAULT NULL,
	type VARCHAR(10) DEFAULT NULL,
	category VARCHAR(30) DEFAULT NULL,
	priority VARCHAR(10) DEFAULT NULL,
	status VARCHAR(20) DEFAULT NULL,
	vendor VARCHAR(200) DEFAULT NULL,
	version VARCHAR(20) DEFAULT NULL,
	operatingSystem VARCHAR(100) DEFAULT NULL,
	appID VARCHAR(100) DEFAULT NULL,
	revision VARCHAR(50) DEFAULT NULL,
	comments TEXT DEFAULT NULL,
	added DATETIME,
	PRIMARY KEY (id)
);


CREATE TABLE files (
	id INT(30),
	type VARCHAR(90),
	name VARCHAR(100),
	CONSTRAINT pk_filesId PRIMARY KEY (id, type),
	FOREIGN KEY (id) REFERENCES packages(id) ON DELETE CASCADE
);


CREATE TABLE issues (
	id INT NOT NULL AUTO_INCREMENT,
	pId INT(30),
	issue TEXT,
	PRIMARY KEY (id),
	FOREIGN KEY (pId) REFERENCES packages(id) ON DELETE CASCADE
);