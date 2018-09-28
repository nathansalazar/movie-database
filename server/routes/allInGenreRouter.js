const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const pool = require('../modules/pool.js');

router.use(bodyParser.json());


router.get('/:name', (req, res) => {
    console.log('In server GETting genres');
    console.log('req.params.name is',req.params.name);
    pool.query(`
        SELECT "name", "genres"."tmdb_id", "title", "image" AS "poster_path" FROM "movies" 
        JOIN "movies_genres" ON "movies".tmdb_id="movies_genres".tmdb_id
        JOIN "genres" ON "genres".tmdb_id="movies_genres".genre
        WHERE "name"=$1;`,[req.params.name]).then((results) => {
            res.send(results.rows);
        }).catch((error) => {
            console.log('Error in GET:', error);
        })
})


module.exports = router;