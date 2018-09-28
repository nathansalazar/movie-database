movieApp.controller('apiController',['$http',function($http){
    let vm = this;
    vm.message='apiController is working.';
    vm.searchResults=[];

    vm.searchForMovie = function(){
        console.log('vm.search is', vm.search);
        $http.get(`https://api.themoviedb.org/3/search/movie?api_key=797ed4d5689b21e1820bd0a7a0a7b994&language=en-US&query=${vm.search.title}&page=1&include_adult=false`
        ).then(function(response){
            vm.searchResults = response.data.results;
        }).catch(function(error){
            console.log('Error in API search:',error);
        });
    }

    vm.addMovie = function(movie){
        console.log('You want to add '+movie.title+', don\'t you?');
        //set the api id to tmdb_id
        movie.tmdb_id=movie.id;
        //add movie and its genres to the "movies_genres" table
        for(i=0;i<movie.genre_ids.length;i++){
            let movieObject = {
                tmdb_id: movie.tmdb_id,
                genre: movie.genre_ids[i]
            }
            $http.post('/movies_genres',movieObject).then(function(response){
                console.log('Movie and its genres added');
            }).catch(function(error){
                console.log('Error in movies_genres POST:',error);
            })
        }

        //set genre_id to first genre in the list
        movie.genre_id=movie.genre_ids[0];
        //set the image path
        movie.image='http://image.tmdb.org/t/p/w500'+movie.poster_path;
        //we need to get the runtime by making another API request using the movie's ID
        $http.get(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=797ed4d5689b21e1820bd0a7a0a7b994&language=en-US`
        ).then(function(response){
            movie.runtime = response.data.runtime;
            $http.post('/movies',movie).then(function(response){
                alert('Success! '+movie.title+' was added! Check the home page to see it.');
            }).catch(function(error){
                console.log('Error in POST:', error);
            })
        }).catch(function(error){
            console.log('Error in API search:',error);
        });
        
    }
}])