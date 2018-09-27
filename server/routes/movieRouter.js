const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json());

router.post('/',(req,res)=>{
    console.log('req.body is',req.body);
    res.send(200);
})

module.exports = router;