
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
VALUES ('{"prop2": "computer", "prop4": 15, "prop1": true}', 'secondJSON');

SELECT "jsonData"->>'prop1' AS prop1 FROM "testJSON";

SELECT "jsonData"->>'prop4' AS prop1 FROM "testJSON";