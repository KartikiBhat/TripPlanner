angular.module('app', ['ngRoute',
'mobile-angular-ui','mobile-angular-ui.gestures', 'toastr'])
.config(function($routeProvider, $locationProvider){
    $routeProvider.when('/screenone', {
        templateUrl: 'templates/screenone.html'
    }).when('/screentwo',{
        templateUrl: 'templates/screentwo.html'
    }).when('/screenthree',{
        templateUrl: 'templates/screenthree.html'
    })
    .otherwise('/screenone');
})

