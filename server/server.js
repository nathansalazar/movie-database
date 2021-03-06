console.log('Node is working.');

const express = require('express');
const app = express();
const movieRouter = require('./routes/movieRouter.js');
const genreRouter = require( './routes/genreRouter.js');
const movieGenreRouter = require('./routes/movieGenreRouter.js');
const allInGenreRouter = require('./routes/allInGenreRouter.js');

app.use(express.static('server/public'));

const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log('Server is listening to port', port);
});

app.use('/movies',movieRouter);

app.use('/genreDB',genreRouter);

app.use('/movies_genres',movieGenreRouter);

app.use('/all_in_genre',allInGenreRouter);