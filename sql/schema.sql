DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS issuesReplies;
DROP TABLE IF EXISTS issues;
DROP TABLE IF EXISTS files;
DROP TABLE IF EXISTS packages;
DROP TABLE IF EXISTS ftpConfig;
DROP TABLE IF EXISTS users;

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
	added INT(15) DEFAULT NULL,
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
	issueText TEXT DEFAULT NULL,
	status VARCHAR(20) DEFAULT NULL,
	timestamp INT(30) NOT NULL,
	userId INT(30) NOT NULL,
	pId INT(30) NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (pId) REFERENCES packages(id) ON DELETE CASCADE,
	FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE issueReplies (
	id INT NOT NULL AUTO_INCREMENT,
	status VARCHAR(100) DEFAULT NULL,
	replyText TEXT,
	timestamp INT(30),
	userId INT(30) NOT NULL,
	iId INT(30) NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (iId) REFERENCES issues(id) ON DELETE CASCADE,
	FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
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


insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Quo Lux', 'ThinApp', 'UAT', 'Low', 'New', 'Gigabox', 3, 'Windows 10', 'fTCgCQiyf', 1474380813, 1, 3);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Andalax', 'ThinApp', 'UAT', 'Low', 'New', 'Innotype', 4.6, 'Windows 7', 'tQWGlGIOBlw2', 1474380813, 2, 2);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Zaam-Dox', 'ThinApp', 'UAT', 'Low', 'New', 'Feednation', 1, 'Windows 10', '7Nvb61vc0Xv', 1474380813, 2, 1);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Domainer', 'ThinApp', 'UAT', 'Low', 'New', 'Wikivu', 1, 'Windows 7', 'wXX9iP8', 1474380813, 2, 3);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Home Ing', 'ThinApp', 'UAT', 'Low', 'New', 'BlogXS', 2, 'Windows 10', 'V532b9V7iO8e', 1474380813, 2, 1);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Span', 'ThinApp', 'UAT', 'Low', 'New', 'Trunyx', 3.2, 'Windows 8.1', 'tnHD6RM7', 1474380813, 1, 1);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Biodex', 'ThinApp', 'UAT', 'Low', 'New', 'Ntags', 3.2, 'Windows 10', 'u0hVP57a', 1474380813, 2, 1);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Tempsoft', 'ThinApp', 'UAT', 'Low', 'New', 'Zoonder', 3, 'Windows 10', '1NMtyToD', 1474380813, 1, 3);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Temp', 'ThinApp', 'UAT', 'Low', 'New', 'Brainsphere', 3, 'Windows 8.1', 'qxiI81Kua', 1474380813, 1, 2);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Fintone', 'ThinApp', 'UAT', 'Low', 'New', 'Chatterbridge', 4.6, 'Windows 7', 'SXequTnB1RRd', 1474380813, 2, 2);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Flexidy', 'ThinApp', 'UAT', 'Low', 'New', 'Divavu', 1, 'Windows 10', '8BDPjNtQ8y', 1474380813, 1, 1);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Gembucket', 'ThinApp', 'UAT', 'Low', 'New', 'Midel', 3.2, 'Windows 7', 'ZL9pIyr', 1474380813, 1, 3);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Job', 'ThinApp', 'UAT', 'Low', 'New', 'Browseblab', 3, 'Windows 7', 'BSLt4wLAO', 1474380813, 1, 2);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Tin', 'ThinApp', 'UAT', 'Low', 'New', 'Devcast', 3, 'Windows 7', 'mirzoaf', 1474380813, 2, 1);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Biodex', 'ThinApp', 'UAT', 'Low', 'New', 'Shufflebeat', 1, 'Windows 8.1', 'Pc7sp1NNi', 1474380813, 2, 3);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Alphazap', 'ThinApp', 'UAT', 'Low', 'New', 'Kazu', 2, 'Windows 8.1', 'xr6GBwH', 1474380813, 1, 1);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Viva', 'ThinApp', 'UAT', 'Low', 'New', 'Flipstorm', 1, 'Windows 7', 'KyLSXNs', 1474380813, 1, 3);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Konklux', 'ThinApp', 'UAT', 'Low', 'New', 'Agimba', 1, 'Windows 8.1', 's7HA0SpNX', 1474380813, 2, 2);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Tres-Zap', 'ThinApp', 'UAT', 'Low', 'New', 'Skidoo', 3, 'Windows 7', 'KLgix2RRUDv', 1474380813, 1, 2);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Tresom', 'ThinApp', 'UAT', 'Low', 'New', 'Yakidoo', 3.2, 'Windows 7', 'yPl6gC', 1474380813, 1, 2);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Zaam-Dox', 'ThinApp', 'UAT', 'Low', 'New', 'Tagchat', 3, 'Windows 8.1', 'Unrv0c2vEyE', 1474380813, 1, 2);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Stronghold', 'ThinApp', 'UAT', 'Low', 'New', 'Photobug', 4.6, 'Windows 10', 'oDhXltFG', 1474380813, 2, 1);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Ventosanzap', 'ThinApp', 'UAT', 'Low', 'New', 'Flashspan', 2, 'Windows 10', 'kgJvDbCv', 1474380813, 2, 3);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Cookley', 'ThinApp', 'UAT', 'Low', 'New', 'Zazio', 3, 'Windows 10', 'Kyz8DOxVu', 1474380813, 1, 1);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Alphazap', 'ThinApp', 'UAT', 'Low', 'New', 'Tambee', 3, 'Windows 7', 'K38hBs0UcgL', 1474380813, 1, 3);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Aerified', 'ThinApp', 'UAT', 'Low', 'New', 'Flipstorm', 4.6, 'Windows 8.1', 'ODrBrsk', 1474380813, 2, 1);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Keylex', 'ThinApp', 'UAT', 'Low', 'New', 'Divavu', 2, 'Windows 8.1', 'GmuI6RFnYT4', 1474380813, 2, 2);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Zathin', 'ThinApp', 'UAT', 'Low', 'New', 'Myworks', 3, 'Windows 10', 'PwJH9y', 1474380813, 2, 1);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Subin', 'ThinApp', 'UAT', 'Low', 'New', 'Devbug', 1, 'Windows 7', 'v7Y1D11d', 1474380813, 2, 2);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Andalax', 'ThinApp', 'UAT', 'Low', 'New', 'Realblab', 2, 'Windows 7', 'SVKFRC', 1474380813, 2, 2);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Bitwolf', 'ThinApp', 'UAT', 'Low', 'New', 'Meevee', 4.6, 'Windows 10', 'K29L5Lgm', 1474380813, 1, 1);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Latlux', 'ThinApp', 'UAT', 'Low', 'New', 'Kimia', 2, 'Windows 7', 'kaxxKxluLvoB', 1474380813, 1, 1);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Flowdesk', 'ThinApp', 'UAT', 'Low', 'New', 'Tagcat', 3, 'Windows 8.1', 'SZzGnJ60je4', 1474380813, 2, 3);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Flowdesk', 'ThinApp', 'UAT', 'Low', 'New', 'Skyba', 4.6, 'Windows 8.1', 'sQQlb8lwee', 1474380813, 2, 1);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Flowdesk', 'ThinApp', 'UAT', 'Low', 'New', 'Skimia', 2, 'Windows 10', '4xz2jrCeGN', 1474380813, 2, 2);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Viva', 'ThinApp', 'UAT', 'Low', 'New', 'Dablist', 3.2, 'Windows 10', 'qRipWxB', 1474380813, 2, 3);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Span', 'ThinApp', 'UAT', 'Low', 'New', 'Jamia', 1, 'Windows 10', 'PQojD4', 1474380813, 2, 2);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Stim', 'ThinApp', 'UAT', 'Low', 'New', 'Thoughtstorm', 3, 'Windows 7', 'i7VSSlrRIsjE', 1474380813, 2, 1);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Rank', 'ThinApp', 'UAT', 'Low', 'New', 'Camido', 4.6, 'Windows 7', 'gaIx4GBXxn3', 1474380813, 2, 3);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Stim', 'ThinApp', 'UAT', 'Low', 'New', 'Skinder', 3, 'Windows 8.1', 'zLh99n7jASZZ', 1474380813, 2, 3);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Vagram', 'ThinApp', 'UAT', 'Low', 'New', 'Vinte', 3.2, 'Windows 7', 'oox6l376WjyZ', 1474380813, 1, 2);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Job', 'ThinApp', 'UAT', 'Low', 'New', 'Kwimbee', 3.2, 'Windows 7', 'zgWBCggDb7', 1474380813, 2, 1);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Bitwolf', 'ThinApp', 'UAT', 'Low', 'New', 'Skiba', 4.6, 'Windows 7', 'vGkEcM', 1474380813, 2, 2);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Alpha', 'ThinApp', 'UAT', 'Low', 'New', 'Fiveclub', 2, 'Windows 7', 's85c05537Kl', 1474380813, 2, 2);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Matsoft', 'ThinApp', 'UAT', 'Low', 'New', 'Gevee', 1, 'Windows 10', 'k3NRZAYho4', 1474380813, 1, 2);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Fintone', 'ThinApp', 'UAT', 'Low', 'New', 'Trilith', 3.2, 'Windows 8.1', '6JYFi1', 1474380813, 2, 2);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Ronstring', 'ThinApp', 'UAT', 'Low', 'New', 'Miboo', 1, 'Windows 8.1', 'tYHMQ7ovW', 1474380813, 2, 1);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Cardguard', 'ThinApp', 'UAT', 'Low', 'New', 'Camimbo', 3.2, 'Windows 10', '9GcnKwKJ', 1474380813, 1, 1);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Daltfresh', 'ThinApp', 'UAT', 'Low', 'New', 'Oozz', 3, 'Windows 8.1', 'KCI4LxUzx', 1474380813, 2, 1);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Cardify', 'ThinApp', 'UAT', 'Low', 'New', 'Gigashots', 2, 'Windows 8.1', '8MV99gFS55', 1474380813, 2, 2);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Asoka', 'ThinApp', 'UAT', 'Low', 'New', 'Trunyx', 4.6, 'Windows 10', 'FBiIOLVdie9L', 1474380813, 2, 3);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Transcof', 'ThinApp', 'UAT', 'Low', 'New', 'Tanoodle', 4.6, 'Windows 8.1', 'p7c2rw', 1474380813, 2, 2);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Fix San', 'ThinApp', 'UAT', 'Low', 'New', 'Avaveo', 2, 'Windows 10', 'T1aL8cTZmS7', 1474380813, 2, 2);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Subin', 'ThinApp', 'UAT', 'Low', 'New', 'Quimba', 4.6, 'Windows 10', 'IORp9Qukvd', 1474380813, 1, 3);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Tresom', 'ThinApp', 'UAT', 'Low', 'New', 'Kare', 3, 'Windows 10', 'wdIdc4OLJk0k', 1474380813, 1, 1);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Zaam-Dox', 'ThinApp', 'UAT', 'Low', 'New', 'Eidel', 3, 'Windows 8.1', 'r3A6yPYm', 1474380813, 1, 3);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Trippledex', 'ThinApp', 'UAT', 'Low', 'New', 'Zoomzone', 3, 'Windows 10', 'VmYmemw3', 1474380813, 2, 2);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Zamit', 'ThinApp', 'UAT', 'Low', 'New', 'Blogtags', 2, 'Windows 7', 's8n7gonhmlM', 1474380813, 2, 1);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Tin', 'ThinApp', 'UAT', 'Low', 'New', 'Devbug', 4.6, 'Windows 7', 'O5mvlxm', 1474380813, 1, 3);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Lotlux', 'ThinApp', 'UAT', 'Low', 'New', 'Vinder', 3, 'Windows 7', 'JxEeJM9xDe', 1474380813, 1, 2);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Hatity', 'ThinApp', 'UAT', 'Low', 'New', 'Twitterwire', 3, 'Windows 7', 'KVWEXF34', 1474380813, 1, 3);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Rank', 'ThinApp', 'UAT', 'Low', 'New', 'Gigazoom', 1, 'Windows 10', '60BM04bkZMwI', 1474380813, 1, 1);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Prodder', 'ThinApp', 'UAT', 'Low', 'New', 'Gigashots', 3.2, 'Windows 10', 'adt8HcGC0', 1474380813, 1, 2);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Pannier', 'ThinApp', 'UAT', 'Low', 'New', 'Oyoyo', 1, 'Windows 7', 'WvEVvFJ', 1474380813, 1, 2);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Cookley', 'ThinApp', 'UAT', 'Low', 'New', 'Topicstorm', 4.6, 'Windows 7', 'v7gXeADreI2M', 1474380813, 2, 2);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Cardify', 'ThinApp', 'UAT', 'Low', 'New', 'Kwimbee', 3, 'Windows 8.1', '5fx5iq5z', 1474380813, 1, 2);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Aerified', 'ThinApp', 'UAT', 'Low', 'New', 'Dynava', 3.2, 'Windows 10', 'BkuOQP9', 1474380813, 2, 2);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Namfix', 'ThinApp', 'UAT', 'Low', 'New', 'Photobean', 4.6, 'Windows 10', 'tu5uhe', 1474380813, 2, 3);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Quo Lux', 'ThinApp', 'UAT', 'Low', 'New', 'Rhynyx', 4.6, 'Windows 7', 't68lUkbqPn', 1474380813, 2, 3);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Sonair', 'ThinApp', 'UAT', 'Low', 'New', 'Kwinu', 3, 'Windows 8.1', 'Ko9IJo', 1474380813, 1, 3);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Y-find', 'ThinApp', 'UAT', 'Low', 'New', 'Livefish', 2, 'Windows 10', 'C1xUDzm', 1474380813, 2, 3);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Treeflex', 'ThinApp', 'UAT', 'Low', 'New', 'Jabberbean', 4.6, 'Windows 7', 'QUiHYdRNZI0', 1474380813, 1, 3);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Alphazap', 'ThinApp', 'UAT', 'Low', 'New', 'Voonte', 1, 'Windows 10', 'qIaKrHFVv', 1474380813, 2, 2);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Ronstring', 'ThinApp', 'UAT', 'Low', 'New', 'Blognation', 2, 'Windows 7', 'NrbQzEUP', 1474380813, 2, 1);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Stim', 'ThinApp', 'UAT', 'Low', 'New', 'Yakidoo', 3.2, 'Windows 10', '9rVUYHmmm4hP', 1474380813, 2, 2);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Gembucket', 'ThinApp', 'UAT', 'Low', 'New', 'Yacero', 2, 'Windows 7', '4IHMy7khpsT4', 1474380813, 2, 1);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Alphazap', 'ThinApp', 'UAT', 'Low', 'New', 'Devpulse', 3.2, 'Windows 7', '7f9VCtV', 1474380813, 2, 3);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Redhold', 'ThinApp', 'UAT', 'Low', 'New', 'Eare', 2, 'Windows 7', 'MiFdm6zcfE', 1474380813, 1, 2);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Rank', 'ThinApp', 'UAT', 'Low', 'New', 'Cogibox', 3, 'Windows 8.1', 'VRKXELvu', 1474380813, 1, 3);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Namfix', 'ThinApp', 'UAT', 'Low', 'New', 'Jetpulse', 1, 'Windows 8.1', 'WcsVRdQvi6f', 1474380813, 1, 2);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Matsoft', 'ThinApp', 'UAT', 'Low', 'New', 'Centizu', 3, 'Windows 8.1', 'Gms6Zz3K5VR', 1474380813, 1, 3);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Aerified', 'ThinApp', 'UAT', 'Low', 'New', 'Skidoo', 2, 'Windows 7', 'fPSBF4Ev0NV', 1474380813, 2, 3);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Namfix', 'ThinApp', 'UAT', 'Low', 'New', 'Skyvu', 3.2, 'Windows 10', 'BroFGSjtVDM', 1474380813, 2, 2);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Regrant', 'ThinApp', 'UAT', 'Low', 'New', 'Rooxo', 4.6, 'Windows 7', 'sdy7SV', 1474380813, 2, 2);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Lotlux', 'ThinApp', 'UAT', 'Low', 'New', 'Pixonyx', 4.6, 'Windows 8.1', 'Dk1y17', 1474380813, 2, 1);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Y-find', 'ThinApp', 'UAT', 'Low', 'New', 'Skiptube', 3.2, 'Windows 8.1', '7GD823', 1474380813, 1, 1);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Sonair', 'ThinApp', 'UAT', 'Low', 'New', 'Quinu', 2, 'Windows 10', '1LNip0u', 1474380813, 1, 1);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Redhold', 'ThinApp', 'UAT', 'Low', 'New', 'Meeveo', 3, 'Windows 7', 'DmsAHZWIp', 1474380813, 2, 1);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Rank', 'ThinApp', 'UAT', 'Low', 'New', 'Tekfly', 1, 'Windows 7', 'yB3ekL8n', 1474380813, 1, 3);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Ronstring', 'ThinApp', 'UAT', 'Low', 'New', 'Mymm', 2, 'Windows 10', 'TBVPhSKzF', 1474380813, 1, 2);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Flexidy', 'ThinApp', 'UAT', 'Low', 'New', 'Kamba', 3.2, 'Windows 8.1', 'LibeRBFmy9KC', 1474380813, 2, 3);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Konklab', 'ThinApp', 'UAT', 'Low', 'New', 'Meedoo', 2, 'Windows 7', 'O7bINnbNygC', 1474380813, 2, 3);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Job', 'ThinApp', 'UAT', 'Low', 'New', 'Skinder', 3, 'Windows 10', 'AA681eQ', 1474380813, 2, 1);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Stronghold', 'ThinApp', 'UAT', 'Low', 'New', 'Devpulse', 4.6, 'Windows 10', 'mewWlkMp', 1474380813, 2, 1);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Domainer', 'ThinApp', 'UAT', 'Low', 'New', 'Zazio', 2, 'Windows 8.1', 'NnaDSeU', 1474380813, 1, 1);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Pannier', 'ThinApp', 'UAT', 'Low', 'New', 'Blogtags', 2, 'Windows 10', 'c0sURuT', 1474380813, 2, 3);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Bamity', 'ThinApp', 'UAT', 'Low', 'New', 'Skynoodle', 2, 'Windows 10', 'HCJVNhSk1HoR', 1474380813, 1, 3);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Zaam-Dox', 'ThinApp', 'UAT', 'Low', 'New', 'Vinder', 2, 'Windows 7', '7Ilk7a83j', 1474380813, 2, 2);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Quo Lux', 'ThinApp', 'UAT', 'Low', 'New', 'Jazzy', 1, 'Windows 8.1', 'J0YOKdIu0Yj', 1474380813, 1, 3);
insert into packages (name, type, category, priority, status, vendor, version, operatingSystem, appID, added, addedBy, revision) values ('Rank', 'ThinApp', 'UAT', 'Low', 'New', 'Yodo', 4.6, 'Windows 7', 'h1mZ1No6aHc', 1474380813, 2, 3);

