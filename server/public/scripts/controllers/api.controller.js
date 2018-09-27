movieApp.controller('apiController',['$http',function($http){
    let vm = this;
    vm.message='apiController is working.';
    vm.searchResults=[];

    vm.searchForMovie = function(){
        console.log('vm.search is', vm.search);
        $http.get(`https://api.themoviedb.org/3/search/movie?api_key=797ed4d5689b21e1820bd0a7a0a7b994&language=en-US&query=${vm.search.title}&page=1&include_adult=false`
        ).then(function(response){
            console.log('response.data is', response.data);
            vm.searchResults = response.data.results;
            console.log('vm.searchResults is ', vm.searchResults);
        }).catch(function(error){
            console.log('Error in API search:',error);
        });
    }
}])