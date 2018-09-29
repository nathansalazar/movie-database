const movieApp = angular.module('MovieApp',['ngMaterial', 'ngRoute']);

movieApp.config(['$routeProvider',function($routeProvider){
    $routeProvider.when('/',{
        templateUrl: 'views/home.html',
        controller:  'MovieController as vm'
    }).when('/search',{
        templateUrl: 'views/search.html',
        controller:  'apiController as vm'
    }).when('/genres',{
        templateUrl: 'views/genres.html',
        controller:  'genreController as vm'
    }).otherwise({
        template: '<h1>404</h1>'
    })
}])

//For movies inserted manually, there is no tmdb_id, so by default we set it equal to a 
//negative integer. Ideally, this integer will be the same as the movie's SQL id, 
//but it doesn't quite work when we start deleting movies at the end of the db.
//This doesn't appear to be a problem, however. The largestID variable is what 
//we use to keep track. 
let largestID = 0;