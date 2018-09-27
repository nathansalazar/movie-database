console.log('Node is working.');

const express = require('express');
const app = express();
const movieRouter = require('./routes/movieRouter.js');
const genreRouter = require( './routes/genreRouter.js');

app.use(express.static('server/public'));

const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log('Server is listening to port', port);
});

app.use('/movies',movieRouter);

app.use('/genreDB',genreRouter);