const app = angular.module('MovieApp',['ngMaterial']);

app.controller('MovieController',['$http',function($http){
    let vm = this;
    vm.message="AngularJS is working.";
    vm.movies=[];
    vm.genres=[{
        text: 'Action',
        id: 1
    },{
        text: 'Adventure',
        id: 2
    }];
    // vm.movieToAdd={};
    vm.addMovie = function(movieToAdd){
        console.log(movieToAdd);
        $http.post('/movies',movieToAdd).then(function(response){
            vm.getMovies();
        }).catch(function(error){
            console.log('Error in POST:', error);
        })
        vm.movieToAdd={};
    }

    vm.getMovies = function(){
        $http.get('/movies').then(function(response){
            vm.movies=response.data;
            for(movie of vm.movies){
                if(movie.image==null){
                    movie.image='https://www.studiobinder.com/wp-content/uploads/2017/12/Movie-Poster-Template-Dark-with-Image.jpg'
                }
            }
            console.log('The movies in the db are:',vm.movies);
        }).catch(function(error){
            console.log('Error in GET:',error);
        })
    }

    vm.deleteMovie = function(movie){
        console.log('We shall delete',movie.title);
        $http.delete('/movies', {params: movie}).then(function(response){
            console.log('response is:',response);
            vm.getMovies();
        }).catch(function(error){
            console.log('Error in DELETE:',error);
        })
    }
    vm.getMovies();
}])