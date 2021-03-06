
DROP TABLE IF EXISTS "tenant";
CREATE TABLE "tenant" (
	"pk"	TEXT NOT NULL UNIQUE,
	"name"	TEXT NOT NULL,
	"active"	INTEGER NOT NULL CHECK("active" IN (0, 1)),
	"zip_code"	TEXT NOT NULL,
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
CREATE UNIQUE INDEX "unique_tenant_start_date" ON "optimizations"("tenant", "start_date");


DROP VIEW IF EXISTS "v_optimizations";
CREATE VIEW v_optimizations AS
SELECT 
	pk,
	tenant,
	start_date as startDate, 
	in_progress as inProgress
FROM optimizations;


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
	"factor"	INTEGER NOT NULL,
	"code"	INTEGER NOT NULL,
	"description"	TEXT NOT NULL,
	PRIMARY KEY("description")
);


DROP TABLE IF EXISTS "lu_weather_temperature_factor";
CREATE TABLE "lu_weather_temperature_factor" (
	"factor"	REAL NOT NULL UNIQUE,
	"min_temperature"	INTEGER NOT NULL UNIQUE,
	"max_temperature"	INTEGER NOT NULL UNIQUE,
	PRIMARY KEY("min_temperature", max_temperature)
);


DROP TABLE IF EXISTS "oli_device_meta_info";
CREATE TABLE "oli_device_meta_info" (
	"pk"	TEXT NOT NULL,
	"tenant"	TEXT NOT NULL,
	"range_start"	INTEGER NOT NULL,
	"range_end"	INTEGER NOT NULL,
	"max_power"	INTEGER NOT NULL,
	"supply"	INTEGER NOT NULL CHECK("supply" IN (0, 1)),
	PRIMARY KEY("pk"),
	CONSTRAINT "fk_tenant" FOREIGN KEY("tenant") REFERENCES "tenant"("pk")
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


-- insert weather condition factors
-- --------------------------------------------------

DELETE FROM "lu_weather_condition";
INSERT INTO "lu_weather_condition" ("factor", "code", "description") VALUES (1, 1, 'Clear');
INSERT INTO "lu_weather_condition" ("factor", "code", "description") VALUES (0.6, 2, 'Clouds');
INSERT INTO "lu_weather_condition" ("factor", "code", "description") VALUES (0.6, 2, 'Drizzle');
INSERT INTO "lu_weather_condition" ("factor", "code", "description") VALUES (0.1, 3, 'Rain');
INSERT INTO "lu_weather_condition" ("factor", "code", "description") VALUES (0.1, 3, 'Thunderstorm');
INSERT INTO "lu_weather_condition" ("factor", "code", "description") VALUES (0.1, 3, 'Snow');


-- insert weather temperature factors
-- --------------------------------------------------

DELETE FROM "lu_weather_temperature_factor";
INSERT INTO "lu_weather_temperature_factor" ("factor", "min_temperature", "max_temperature") VALUES (0.5, -1000, -10);
INSERT INTO "lu_weather_temperature_factor" ("factor", "min_temperature", "max_temperature") VALUES (0.6, -10, 0);
INSERT INTO "lu_weather_temperature_factor" ("factor", "min_temperature", "max_temperature") VALUES (0.7, 0, 10);
INSERT INTO "lu_weather_temperature_factor" ("factor", "min_temperature", "max_temperature") VALUES (0.85, 10, 20);
INSERT INTO "lu_weather_temperature_factor" ("factor", "min_temperature", "max_temperature") VALUES (0.95, 20, 30);
INSERT INTO "lu_weather_temperature_factor" ("factor", "min_temperature", "max_temperature") VALUES (0.9, 30, 1000);


-- insert oli device meta info
-- --------------------------------------------------

DELETE FROM "oli_device_meta_info";

INSERT INTO "oli_device_meta_info" ("pk", "tenant", "range_start", "range_end", "max_power", "supply")
VALUES ('OLI_13', 'OLI_1', 45, 65, 1000, 0);
INSERT INTO "oli_device_meta_info" ("pk", "tenant", "range_start", "range_end", "max_power", "supply")
VALUES ('OLI_14', 'OLI_1', 40, 75, 2000, 0);

INSERT INTO "oli_device_meta_info" ("pk", "tenant", "range_start", "range_end", "max_power", "supply")
VALUES ('OLI_23', 'OLI_2', 45, 65, 1000, 0);
INSERT INTO "oli_device_meta_info" ("pk", "tenant", "range_start", "range_end", "max_power", "supply")
VALUES ('OLI_24', 'OLI_2', 40, 75, 2000, 0);

INSERT INTO "oli_device_meta_info" ("pk", "tenant", "range_start", "range_end", "max_power", "supply")
VALUES ('OLI_33', 'OLI_3', 45, 65, 1000, 0);
INSERT INTO "oli_device_meta_info" ("pk", "tenant", "range_start", "range_end", "max_power", "supply")
VALUES ('OLI_34', 'OLI_3', 40, 75, 2000, 0);




------------------------------------------------------------------------------- */
