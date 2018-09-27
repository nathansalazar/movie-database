const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const pool = require('../modules/pool.js');

router.use(bodyParser.json());

router.post('/',(req,res)=>{
    console.log('req.body is',req.body);
    pool.query(`INSERT INTO "movies"
        ("title", "genre_id", "release_date", "run_time")
        VALUES ($1, $2, $3, $4);`,
        [req.body.title, req.body.genre, req.body.date, req.body.runtime]
    ).then((results)=>{
        res.send(results.rows);
    }).catch((error)=>{
        console.log('Error in POST:',error);
        res.sendStatus(500);
    })
})

module.exports = router;