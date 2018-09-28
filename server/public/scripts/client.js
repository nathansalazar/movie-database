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

let largestID = 0;