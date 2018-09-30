movieApp.controller('MovieController',['$http',function($http){
    let vm = this;
    vm.message="AngularJS is working.";
    vm.movies=[];
    vm.addMovie = function(movieToAdd){
        console.log(movieToAdd);
        //set tmdb_id to the negative of its SQL id
        movieToAdd.tmdb_id = -(largestID+1);
        $http.post('/movies',movieToAdd).then(function(response){
            console.log('POST response is',response.data);
            vm.getMovies();
        }).catch(function(error){
            console.log('Error in POST:', error);
        })
        //also insert the movie into the "movies_genres" table
        $http.post('/movies_genres',movieToAdd).then(function(response){
            console.log('Movie and its genres added');
        }).catch(function(error){
            console.log('Error in movies_genres POST:',error);
        })
        vm.movieToAdd={};
    }

    vm.getMovies = function(){
        $http.get('/movies').then(function(response){
            vm.movies=response.data;
            for(movie of vm.movies){
                if(movie.image==null){
                    //if no image given, use a default image
                    movie.image='https://www.studiobinder.com/wp-content/uploads/2017/12/Movie-Poster-Template-Dark-with-Image.jpg'
                }
            }
            largestID=vm.movies[vm.movies.length-1].id;
            console.log('The largest ID is', largestID);
        }).catch(function(error){
            console.log('Error in GET:',error);
        })
    }

    vm.deleteMovie = function(movie){
        console.log('We shall delete',movie.title);
        //delete movie from "movies" table
        $http.delete('/movies', {params: movie}).then(function(response){
            console.log('response is:',response);
            vm.getMovies();
        }).catch(function(error){
            console.log('Error in DELETE:',error);
        })
        //delete from "movies_genres" table
        $http.delete(`/movies_genres`, {params: movie}).then(function(response){
            console.log('response is:',response);
        }).catch(function(error){
            console.log('Error in DELETE:',error);
        })
    }
    vm.getMovies();

    vm.getGenreIds = function(){
        $http.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=797ed4d5689b21e1820bd0a7a0a7b994&language=en-US
        `).then(function(response){
            // console.log('Response.data.genres is ',response.data.genres);
            vm.genres=response.data.genres;
        }).catch(function(error){
            console.log('Error getting genre ids:',error);
        })
    }
    vm.getGenreIds();

    vm.rateMovie = function(movie){
        $http.put('/movies',movie).then(function(response){
            console.log('Successfully updated '+ movie.title+ '?');
        }).catch(function(error){
            console.log('Error in update:',error);
        })
        movie.buttonClicked=false;
    }

}])