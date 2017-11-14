var api = 'http://max.app/api/'
var app = angular.module('app', ['ngRoute', 'ngAnimate', 'chart.js']);
app.config(["$routeProvider", function($routeProvider){
	$routeProvider
	.when('/', {templateUrl:'dist/templates/home.html',controller: 'homeController', title:'@mzarallop - Redusoft'})
	.when('/habilidades', {templateUrl:'dist/templates/skills.html',controller: 'habilidadesController', title:'@mzarallop - Habilidades'})
	.when('/trabajos', {templateUrl:'dist/templates/trabajos.html',controller: 'trabajosController', title:'@mzarallop - Proyectos que he desarrollado'})
	.when('/colegios', {templateUrl:'dist/templates/colegios.html',controller: 'colegiosController', title:'@mzarallop - Colegios'})
	.otherwise({redirecTo:'/'});
}])

.run(function($location, $rootScope) {
	$rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
	     //mobile
	 	$rootScope.host = 'http://'+$location.host()+'/';

	    if (current.hasOwnProperty('$$route')) {
	        document.title = current.$$route.title;
	    }

	})
})
