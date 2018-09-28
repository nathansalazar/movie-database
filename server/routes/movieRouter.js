const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const pool = require('../modules/pool.js');

router.use(bodyParser.json());

router.post('/',(req,res)=>{
    // console.log('req.body is',req.body);
    if(req.body.vote_average==undefined){
        req.body.vote_average=null;
    }
    pool.query(`INSERT INTO "movies"
        ("title", "genre_id", "release_date", "run_time", "image", "tmdb_id", "rating")
        VALUES ($1, $2, $3, $4, $5, $6, $7);`,
        [req.body.title, req.body.genre_id, req.body.release_date, 
            req.body.runtime, req.body.image, req.body.tmdb_id, req.body.vote_average*10]
    ).then((results)=>{
        res.send(results.rows);
    }).catch((error)=>{
        console.log('Error in POST:',error);
        res.sendStatus(500);
    })
})

router.get('/',(req,res)=>{
    pool.query(`SELECT * FROM "movies";`).then((results)=>{
        res.send(results.rows);
    }).catch((error)=>{
        console.log('Error in GET:',error);
    })
})

router.delete('/',(req,res)=>{
    pool.query(`DELETE FROM "movies" 
    WHERE "id"=$1;`,[req.query.id]).then((results)=>{
        res.sendStatus(200);
    }).catch((error)=>{
        console.log('Error in DELETE:',error);
    })
    //delete from "movies_genres" table
    pool.query(`DELETE FROM "movies_genres" 
        WHERE "tmdb_id"=$1;`,[req.query.id]);
})

module.exports = router;