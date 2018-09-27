const app = angular.module('MovieApp',[]);

app.controller('MovieController',['$http',function($http){
    let vm = this;
    vm.message="AngularJS is working.";
    vm.genres=[{
        text: 'Action',
        id: 1
    },{
        text: 'Adventure',
        id: 2
    }];
    vm.movieToAdd={};
    vm.addMovie = function(movieToAdd){
        console.log(movieToAdd);
    }
}])