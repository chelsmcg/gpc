DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS issues;
DROP TABLE IF EXISTS files;
DROP TABLE IF EXISTS packages;
DROP TABLE IF EXISTS ftpConfig;


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

INSERT INTO `users` (`id`, `email`, `userName`, `password`, `fName`, `lName`, `hasLoggedin`) VALUES
(1, 'm@g.com', 'm', '$2y$11$hYI8GKwUIgRs0AAFZI5z6u0U/xHAQ7GKXOYVltyJNhN9vPP/gQtBu', 'Mark', 'Ganser', 0),
(2, 'c@c.com', 'chelsmcg', '$2y$11$isJm9beZSreX/GAhDdWwtOKk88BsnVzcCZskX7LFvrnsiyCnqW8Aa', 'Chelsea', 'McGuinness', 0);

CREATE TABLE roles (
	id INT(30),
	type VARCHAR(90),
	CONSTRAINT pk_roleId PRIMARY KEY (id, type),
	FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO `roles` (`id`, `type`) VALUES
(1, 'Administrator'),
(2, 'Administrator');


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
	docFile VARCHAR(100) DEFAULT NULL,
	sourceFile VARCHAR(100) DEFAULT NULL,
	added DATETIME,
	addedBy INT(20) DEFAULT NULL,
	assignedPackager INT(20) DEFAULT NULL,
	assignedQA INT(20) DEFAULT NULL,
	assignedUAT INT(20) DEFAULT NULL,
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
	issueSubject VARCHAR(100) DEFAULT NULL,
	issue TEXT,
	resolved BOOLEAN DEFAULT 0,
	pId INT(30),
	PRIMARY KEY (id),
	FOREIGN KEY (pId) REFERENCES packages(id) ON DELETE CASCADE
);

CREATE TABLE ftpConfig (
	id INT NOT NULL AUTO_INCREMENT,
	hostName VARCHAR(100),
	username VARCHAR(100),
	password VARCHAR(100),
	PRIMARY KEY (id)
);

INSERT INTO `ftpconfig` (`id`, `hostName`, `username`, `password`) VALUES
(1, 'ftp2.success-systems.com.au', 'data3', 'dAtA3');

