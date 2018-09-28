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

--add a few more columns for the "movies" table
ALTER TABLE "movies"
ADD "image" VARCHAR(255);

ALTER TABLE "movies"
ADD "tmdb_id" INT;

--SQL query to get number of movies in each genre
SELECT "name", COUNT("movies_genres".genre) FROM "movies" 
JOIN "movies_genres" ON "movies".tmdb_id="movies_genres".tmdb_id
JOIN "genres" ON "genres".tmdb_id="movies_genres".genre
GROUP BY "movies_genres".genre, "genres"."name";

--create movies_genres junction table, using the api's id for movie and genre
CREATE TABLE "movies_genres" (
"tmdb_id" INT NOT NULL,
"genre" INT NOT NULL
);



--Recreate "genres" table to include the api's genre ids and the populate it
CREATE TABLE "genres" (
"id" SERIAL PRIMARY KEY,
"name" VARCHAR(20) NOT NULL,
"tmdb_id" INT NOT NULL
);

INSERT INTO "genres"
("tmdb_id", "name")
VALUES
(28,'Action'),
    (12,'Adventure'),
    (16,'Animation'),
    (35,'Comedy'),
    (80,'Crime'),
    (99,'Documentary'),
    (18,'Drama'),
    (10751,'Family'),
    (14,'Fantasy'),
    (36,'History'),
    (27,'Horror'),
    (10402,'Music'),
    (9648,'Mystery'),
    (10749,'Romance'),
   (878,'Science Fiction'),
    (10770,'TV Movie'),
    (53,'Thriller'),
    (10752,'War'),
(37,'Western');










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