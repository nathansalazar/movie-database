CREATE TABLE "movies" (
	"id" SERIAL PRIMARY KEY,
	"title" VARCHAR(120) NOT NULL,
	"genre_id" INT NOT NULL,
	"release_date" DATE,
	"run_time" INT NOT NULL,
	"all_genres" VARCHAR(40),
    "image" VARCHAR(255),
    "tmdb_id" INT,
    "rating" INT,
    "user_rating" INT
);

INSERT INTO "movies" 
("title", "genre_id", "release_date", "run_time", "all_genres")
VALUES ('Citizen Kane', 9648, '1941-04-30', 119, '9648,18');

CREATE TABLE "genres" (
"id" SERIAL PRIMARY KEY,
"name" VARCHAR(20) NOT NULL,
"tmdb_id" INT NOT NULL
);

--insert all genres and their ids from TMDB (The Movie Database API)
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

--SQL query to get number of movies in each genre
SELECT "name", COUNT("movies_genres".genre) FROM "movies" 
JOIN "movies_genres" ON "movies".tmdb_id="movies_genres".tmdb_id
JOIN "genres" ON "genres".tmdb_id="movies_genres".genre
GROUP BY "movies_genres".genre, "genres"."name";

--SQL query to get all movies in a given genre
SELECT "name", "genres"."tmdb_id", "title", "image" FROM "movies" 
JOIN "movies_genres" ON "movies".tmdb_id="movies_genres".tmdb_id
JOIN "genres" ON "genres".tmdb_id="movies_genres".genre
WHERE "name"='Animation';

--create movies_genres junction table, using the api's id for movie and genre
CREATE TABLE "movies_genres" (
"tmdb_id" INT NOT NULL,
"genre" INT NOT NULL
);