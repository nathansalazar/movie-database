CREATE TABLE "movies" (
	"id" SERIAL PRIMARY KEY,
	"title" VARCHAR(120) NOT NULL,
	"genre_id" INT NOT NULL,
	"release_date" DATE NOT NULL,
	"run_time" INT NOT NULL,
	"all_genres" VARCHAR(40)
);

INSERT INTO "movies" 
("title", "genre_id", "release_date", "run_time", "all_genres")
VALUES ('Citizen Kane', 9648, '1941-04-30', 119, '9648,18');

CREATE TABLE "genre" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(20) NOT NULL,
	"api_id" INT
);

INSERT INTO "genre"
("name", "api_id")
VALUES ('Action', 28);





--this is my attempt at inserting JSON into a SQL table, and getting information back
CREATE TABLE "testJSON" (
"id" SERIAL PRIMARY KEY,
"jsonData" JSONB,
"string" VARCHAR(10)
);

INSERT INTO "testJSON" ("jsonData", "string")
VALUES ('{"prop1": "Taco", "prop2": "potato"}', 'firstJSON');

INSERT INTO "testJSON" ("jsonData", "string")
VALUES ('{"prop1": "soccer", "prop3": "hindenburg", "prop4": 10}', 'secondJSON');


INSERT INTO "testJSON" ("jsonData", "string")
VALUES ('{"prop2": "computer", "prop4": 15, "prop1": true}', 'thirdJSON');

SELECT "jsonData"->>'prop1' AS prop1 FROM "testJSON";

SELECT "jsonData"->>'prop4' AS prop4 FROM "testJSON";