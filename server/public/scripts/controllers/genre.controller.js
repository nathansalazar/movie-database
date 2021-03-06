movieApp.controller('genreController',['$http',function($http){
    let vm = this;
    vm.message='genreController is working.';
    vm.genres = [];

    // vm.addGenre = function(genre){
    //     console.log('Add genre:',genre);
    //     $http.post('/genreDB', genre).then(function(response){
    //         console.log('response is:', response);
    //         vm.getGenres();
    //     }).catch(function(error){
    //         console.log('Error in POST:', error);
    //     })
    // }

    vm.getGenres = function(){
        $http.get('/genreDB').then(function(response){
            vm.genres = response.data;
            console.log(vm.genres);
        }).catch(function(error){
            console.log('Error in GET:', error);
        })
    }

    vm.seeAllInGenre = function(genre){
        console.log('Show all movies in the '+ genre.name + ' genre.');
        //maybe do separate router 
        $http.get(`/all_in_genre/${genre.name}`).then(function(response){
            vm.searchResults = response.data;
            console.log(vm.searchResults);
        }).catch(function(error){
            console.log('Error in GET:', error);
        })
    }
    vm.getGenres();
}])