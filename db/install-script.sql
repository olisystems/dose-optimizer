
DROP TABLE IF EXISTS "tenant";
CREATE TABLE "tenant" (
	"pk"	TEXT NOT NULL UNIQUE,
	"name"	TEXT NOT NULL,
	"active"	INTEGER CHECK("active" IN (0, 1)),
	PRIMARY KEY("pk")
);


DROP TABLE IF EXISTS "optimizations"; 
CREATE TABLE "optimizations" (
	"pk"	INTEGER NOT NULL UNIQUE,
	"tenant"	TEXT NOT NULL,
	"start_date"	TEXT NOT NULL,
	"in_progress"	INTEGER NOT NULL CHECK("in_progress" IN (0, 1)),
	"data"	INTEGER,
	PRIMARY KEY("pk" AUTOINCREMENT),
	CONSTRAINT "fk_tenant" FOREIGN KEY("tenant") REFERENCES "tenant"("pk")
);


DROP TABLE IF EXISTS "load_static";
CREATE TABLE "load_static" (
	"pk"	INTEGER NOT NULL UNIQUE,
	"oli_id"	TEXT NOT NULL UNIQUE,
	"tenant"	TEXT NOT NULL,
	"data"	TEXT NOT NULL DEFAULT '',
	PRIMARY KEY("pk" AUTOINCREMENT),
	CONSTRAINT "fk_tenant" FOREIGN KEY("tenant") REFERENCES "tenant"("pk")
);


DROP TABLE IF EXISTS "supply" ;
CREATE TABLE "supply" (
	"pk"	INTEGER NOT NULL UNIQUE,
	"oli_id"	TEXT NOT NULL UNIQUE,
	"tenant"	TEXT NOT NULL,
	"data"	TEXT NOT NULL DEFAULT '',
	PRIMARY KEY("pk" AUTOINCREMENT),
	CONSTRAINT "fk_tenant" FOREIGN KEY("tenant") REFERENCES "tenant"("pk")
);


DROP TABLE IF EXISTS "lu_weather_condition";
CREATE TABLE "lu_weather_condition" (
	"code"	INTEGER NOT NULL,
	"description"	TEXT NOT NULL,
	PRIMARY KEY("description")
);



/* -------------------------------------------------------------------------------



-- Data inserts


-- insert supply values
-- --------------------------------------------------

DELETE FROM "supply";

INSERT INTO "supply" ("tenant", "oli_id", "data") 
VALUES ('OLI_1', 'OLI_11', '{"oliBox":"OLI_11","type":"activeEnery","interval":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96],"value":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,14,21,41,93,173,203,226,322,367,373,438,967,858,750,1577,1695,1736,1781,1794,1786,1768,1785,1778,1714,1687,1603,1492,1422,1290,1290,1005,821,844,677,525,355,229,146,82,22,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}' );

INSERT INTO "supply" ("tenant", "oli_id", "data") 
VALUES ('OLI_1', 'OLI_21', '{"oliBox":"OLI_11","type":"activeEnery","interval":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96],"value":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,14,21,41,93,173,203,226,322,367,373,438,967,858,750,1577,1695,1736,1781,1794,1786,1768,1785,1778,1714,1687,1603,1492,1422,1290,1290,1005,821,844,677,525,355,229,146,82,22,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}' );

INSERT INTO "supply" ("tenant", "oli_id", "data") 
VALUES ('OLI_1', 'OLI_31', '{"oliBox":"OLI_11","type":"activeEnery","interval":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96],"value":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,14,21,41,93,173,203,226,322,367,373,438,967,858,750,1577,1695,1736,1781,1794,1786,1768,1785,1778,1714,1687,1603,1492,1422,1290,1290,1005,821,844,677,525,355,229,146,82,22,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}' );


-- insert static load values
-- --------------------------------------------------

DELETE FROM "load_static";

INSERT INTO "load_static" ("tenant", "oli_id", "data") 
VALUES ('OLI_1', 'OLI_12', '{"oliBox":"OLI_11","type":"activeEnery","interval":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96],"value":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,14,21,41,93,173,203,226,322,367,373,438,967,858,750,1577,1695,1736,1781,1794,1786,1768,1785,1778,1714,1687,1603,1492,1422,1290,1290,1005,821,844,677,525,355,229,146,82,22,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}' );

INSERT INTO "load_static" ("tenant", "oli_id", "data") 
VALUES ('OLI_1', 'OLI_22', '{"oliBox":"OLI_11","type":"activeEnery","interval":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96],"value":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,14,21,41,93,173,203,226,322,367,373,438,967,858,750,1577,1695,1736,1781,1794,1786,1768,1785,1778,1714,1687,1603,1492,1422,1290,1290,1005,821,844,677,525,355,229,146,82,22,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}' );

INSERT INTO "load_static" ("tenant", "oli_id", "data") 
VALUES ('OLI_1', 'OLI_32', '{"oliBox":"OLI_11","type":"activeEnery","interval":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96],"value":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,14,21,41,93,173,203,226,322,367,373,438,967,858,750,1577,1695,1736,1781,1794,1786,1768,1785,1778,1714,1687,1603,1492,1422,1290,1290,1005,821,844,677,525,355,229,146,82,22,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}' );


-- insert weather conditions
-- --------------------------------------------------

delete from lu_weather_condition;
insert into lu_weather_condition (code, description) values (1, 'clear sky');
insert into lu_weather_condition (code, description) values (2, 'few clouds');
insert into lu_weather_condition (code, description) values (2, 'scattered clouds');
insert into lu_weather_condition (code, description) values (2, 'broken clouds');
insert into lu_weather_condition (code, description) values (2, 'shower rain');
insert into lu_weather_condition (code, description) values (3, 'rain');
insert into lu_weather_condition (code, description) values (3, 'thunderstorm');
insert into lu_weather_condition (code, description) values (3, 'snow');
insert into lu_weather_condition (code, description) values (3, 'mist');



------------------------------------------------------------------------------- */

