const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const pool = require('../modules/pool.js');

router.use(bodyParser.json());

router.post('/',(req,res)=>{
    console.log('req.body is',req.body);
    pool.query(`INSERT INTO "genre"
        ("name")
        VALUES ($1);`,
        [req.body.name]
    ).then((results)=>{
        res.send(results.rows);
    }).catch((error)=>{
        console.log('Error in POST:',error);
        res.sendStatus(500);
    })
})

router.get('/',(req,res)=>{
    console.log('In server GETting genres');
    pool.query(`
    SELECT "name", COUNT("movies_genres".genre) FROM "movies" 
    JOIN "movies_genres" ON "movies".tmdb_id="movies_genres".tmdb_id
    JOIN "genres" ON "genres".tmdb_id="movies_genres".genre
    GROUP BY "movies_genres".genre, "genres"."name";`).then((results)=>{
        res.send(results.rows);
    }).catch((error)=>{
        console.log('Error in GET:',error);
    })
})


// router.get('/',(req,res)=>{
//     console.log('In server GETting genres');
//     pool.query(`SELECT "genre"."id", "name", COUNT("genre_id") FROM "movies"
//     JOIN "genre" ON "genre"."id"="movies"."genre_id"
//     GROUP BY "movies"."genre_id", "name", "genre"."id";;`).then((results)=>{
//         res.send(results.rows);
//     }).catch((error)=>{
//         console.log('Error in GET:',error);
//     })
// })

// router.delete('/',(req,res)=>{
//     console.log('req.query.id is',req.query.id);
//     pool.query(`DELETE FROM "movies" 
//     WHERE "id"=$1;`,[req.query.id]).then((results)=>{
//         res.sendStatus(200);
//     }).catch((error)=>{
//         console.log('Error in DELETE:',error);
//     })
// })

module.exports = router;