CREATE TABLE IF NOT EXISTS User (
	id integer ,
	Email varchar NOT NULL UNIQUE,
	Name varchar,
	Registration_Date date,
	date_of_birth date,
	Password varchar(60),
	Address varchar,
	Phone integer,
	Mobile integer,
	PRIMARY KEY (id),
	CONSTRAINT phone CHECK (Phone>0),
	CONSTRAINT mobile CHECK (Mobile>0),
	CONSTRAINT emailaccept CHECK (Email LIKE '%@%'),
	CONSTRAINT name CHECK (Name NOT LIKE '%[0-9]%'),
	CONSTRAINT address CHECK (Address NOT LIKE '%[0-9]%'),
	CONSTRAINT phoneISNUMBER CHECK (Phone NOT LIKE '%[a-z]%'),
	CONSTRAINT mobileISNYMBER CHECK (Mobile NOT LIKE '%[a-z]%')
	
);

CREATE TABLE IF NOT EXISTS Reservation (
	resid integer,
	user_id integer NOT NULL,
	court_id integer NOT NULL,
	coach_id integer,
	res_date date NOT NULL,
	start_time time NOT NULL,
	is_past boolean,
	PRIMARY KEY (resid),
	FOREIGN KEY (user_id) REFERENCES User(id)
	ON	DELETE	CASCADE		ON	UPDATE		CASCADE,
	FOREIGN KEY (court_id) REFERENCES Court(id)
	ON	DELETE	CASCADE		ON	UPDATE		CASCADE,
	FOREIGN KEY (coach_id) REFERENCES Coach(id)
	ON	DELETE	CASCADE		ON	UPDATE		CASCADE,
	UNIQUE (court_id, res_date, start_time),
	UNIQUE (coach_id, res_date, start_time)
);

CREATE TABLE IF NOT EXISTS Court (
	id integer ,
	Court_type varchar,
	PRIMARY KEY (id)
	
);

CREATE TABLE IF NOT EXISTS Coach (
	id integer ,
	Name varchar,
	Phone integer,
	date_of_birth date,
	PRIMARY KEY (id),
	CONSTRAINT phone CHECK (Phone>0),
	CONSTRAINT phoneISNUMBER CHECK (Phone NOT LIKE '%[a-z]%'),
	CONSTRAINT name CHECK (Name NOT LIKE '%[0-9]%')
);

INSERT INTO  User (id, Email, Name, Registration_Date,date_of_birth, Password,  Address, Phone, Mobile) VALUES (1, "dd732@gmail.com","Dimitris Dimitriou", "2021-01-01","1980-10-5", "Dimitris123",  "Athens", 2101234567, 6954234567);
INSERT INTO  User (id, Email, Name, Registration_Date,date_of_birth, Password,  Address, Phone, Mobile) VALUES (2, "ss123@gmail.com","Sofia Sofiou", "2023-03-06","1995-2-12", "Sofia123",  "Athens", 2101236667, 6971276567);
INSERT INTO  User (id, Email, Name, Registration_Date, date_of_birth, Password,  Address, Phone, Mobile) VALUES (3, "ad23@yahoo.com","Anna Dimitriou", "2022-8-10","2000-4-26", "Anna123",  "Athens", 2124345567, 6971267677);
INSERT INTO  User(id, Email, Name, Registration_Date, date_of_birth, Password,  Address, Phone, Mobile) VALUES (4, "Al834@gmail.com","Alexandros Papadopoulos","2023-3-4", "1998-3-25", "Alexpap834",  "Athens", 2101221367, 6933345647);
INSERT INTO  User (id, Email, Name, Registration_Date,date_of_birth, Password,  Address, Phone, Mobile) VALUES (5, "mm536@outlook.com","Maria Mavrou", "2022-11-11","1975-9-12","Maria536",  "Athens", 2109999999, 6980393939);

INSERT INTO  Coach (id, Name, Phone, date_of_birth) VALUES (1, "Dimitris Papadopoulos", 6987456987, "1990-01-01");
INSERT INTO  Coach (id, Name, Phone, date_of_birth) VALUES (2, "Maria Georgiou", 6912365455, "1995-04-26");
INSERT INTO  Coach (id, Name, Phone, date_of_birth) VALUES (3, "Petros Konstantinou", 6985987456, "1975-07-12");
INSERT INTO  Coach (id, Name, Phone, date_of_birth) VALUES (4, "Anna Papadopoulou", 6985256687, "1980-01-01");

INSERT INTO  Court (id, Court_type) VALUES (1, "Clay Court #1");
INSERT INTO  Court (id, Court_type) VALUES (2, "Clay Court #2");
INSERT INTO  Court (id, Court_type) VALUES (3, "Clay Court #3");
INSERT INTO  Court (id, Court_type) VALUES (4, "Hard Court #1");
INSERT INTO  Court (id, Court_type) VALUES (5, "Grass Court #1");
INSERT INTO  Court (id, Court_type) VALUES (6, "Grass Court #2");

INSERT INTO  Reservation (resid, user_id, court_id, coach_id, res_date, start_time,is_past) VALUES (1, 2, 1, NULL, "2022-5-27", "11:00:00",1);
INSERT INTO  Reservation (resid, user_id, court_id, coach_id, res_date, start_time,is_past) VALUES (2, 2, 3, 2, "2022-11-15", "9:00:00",1);
INSERT INTO  Reservation (resid, user_id, court_id, coach_id, res_date, start_time,is_past) VALUES (3, 2, 3, 3, "2023-01-09", "12:00:00",1);
INSERT INTO  Reservation (resid, user_id, court_id, coach_id, res_date, start_time,is_past) VALUES (4, 2, 2, 4, "2023-04-26", "13:00:00",1);
INSERT INTO  Reservation (resid, user_id, court_id, coach_id, res_date, start_time,is_past) VALUES (5, 2, 2, NULL, "2023-05-30", "10:00:00",0);
INSERT INTO  Reservation (resid, user_id, court_id, coach_id, res_date, start_time,is_past) VALUES (6, 3, 5, 4, "2022-08-15", "15:00:00",1);
INSERT INTO  Reservation (resid, user_id, court_id, coach_id, res_date, start_time,is_past) VALUES (7, 3, 6, 4, "2023-01-18", "18:00:00",1);
INSERT INTO  Reservation (resid, user_id, court_id, coach_id, res_date, start_time,is_past) VALUES (8, 3, 6, 4, "2023-03-01", "19:00:00",1);
INSERT INTO  Reservation (resid, user_id, court_id, coach_id, res_date, start_time,is_past) VALUES (9, 3, 6, 4, "2023-04-15", "20:00:00",1);
INSERT INTO  Reservation (resid, user_id, court_id, coach_id, res_date, start_time,is_past) VALUES (10, 3, 5, 4, "2023-05-30", "11:00:00",0);
INSERT INTO  Reservation (resid, user_id, court_id, coach_id, res_date, start_time,is_past) VALUES (11, 4, 4, NULL, "2022-02-01", "9:00:00",1);
INSERT INTO  Reservation (resid, user_id, court_id, coach_id, res_date, start_time,is_past) VALUES (12, 4, 4, 4, "2022-05-15", "21:00:00",1);
INSERT INTO  Reservation (resid, user_id, court_id, coach_id, res_date, start_time,is_past) VALUES (13, 4, 2, NULL, "2022-08-09", "17:00:00",1);
INSERT INTO  Reservation (resid, user_id, court_id, coach_id, res_date, start_time,is_past) VALUES (14, 4, 2, 2, "2023-01-02", "12:00:00",1);
INSERT INTO  Reservation (resid, user_id, court_id, coach_id, res_date, start_time,is_past) VALUES (15, 4, 1, NULL, "2023-05-30", "15:00:00", 0);
INSERT INTO  Reservation (resid, user_id, court_id, coach_id, res_date, start_time,is_past) VALUES (16, 5, 5, 2, "2022-12-20", "16:00:00",1);
INSERT INTO  Reservation (resid, user_id, court_id, coach_id, res_date, start_time,is_past) VALUES (17, 5, 5, 2, "2023-01-09", "11:00:00",1);
INSERT INTO  Reservation (resid, user_id, court_id, coach_id, res_date, start_time,is_past) VALUES (18, 5, 6, 2, "2023-02-01", "14:00:00",1);
INSERT INTO  Reservation (resid, user_id, court_id, coach_id, res_date, start_time,is_past) VALUES (19, 5, 6, 2, "2023-03-15", "12:00:00",1);
INSERT INTO  Reservation (resid, user_id, court_id, coach_id, res_date, start_time,is_past) VALUES (20, 5, 5, 2, "2023-05-30", "17:00:00", 0);
INSERT INTO  Reservation (resid, user_id, court_id, coach_id, res_date, start_time,is_past) VALUES (21, 2, 1, 3, "2023-06-01", "16:00:00",0);
INSERT INTO  Reservation (resid, user_id, court_id, coach_id, res_date, start_time,is_past) VALUES (22, 3, 2, NULL, "2023-06-01", "11:00:00",0);
INSERT INTO  Reservation (resid, user_id, court_id, coach_id, res_date, start_time,is_past) VALUES (23, 2, 4, 2, "2023-06-02", "9:00:00",0);
INSERT INTO  Reservation (resid, user_id, court_id, coach_id, res_date, start_time,is_past) VALUES (24, 1, 5, NULL, "2023-05-31", "20:00:00",0);
INSERT INTO  Reservation (resid, user_id, court_id, coach_id, res_date, start_time,is_past) VALUES (25, 5, 6, 1, "2023-06-02", "10:00:00",0);




