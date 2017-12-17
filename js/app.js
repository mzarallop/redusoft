var api = window.location.origin+'/api/'

var app = angular.module('app', ['ngRoute', 'ngAnimate', 'chart.js', 'ngResource', 'ngStorage','angular-loading-bar']);
app.config(["$routeProvider","cfpLoadingBarProvider", function($routeProvider,cfpLoadingBarProvider){
	cfpLoadingBarProvider.parentSelector = '#loading-bar-container';
	cfpLoadingBarProvider.includeSpinner = false;
	cfpLoadingBarProvider.includeBar = false;
	cfpLoadingBarProvider.spinnerTemplate = '<div><span class="fa fa-spinner">Cargando...</div>';
	cfpLoadingBarProvider.latencyThreshold = 500;
	$routeProvider
	.when('/', {templateUrl:'dist/templates/home.html',controller: 'homeController', title:'@mzarallop - Redusoft'})
	.when('/habilidades', {templateUrl:'dist/templates/skills.html',controller: 'habilidadesController', title:'@mzarallop - Habilidades'})
	.when('/trabajos', {templateUrl:'dist/templates/trabajos.html',controller: 'trabajosController', title:'@mzarallop - Proyectos que he desarrollado'})
	.when('/colegios', {templateUrl:'dist/templates/colegios.html',controller: 'colegiosController', title:'@mzarallop - Colegios'})
	.when('/fichacolegios/:rbd/', {templateUrl:'dist/templates/fichacolegios.html',controller: 'fichaController', title:'@mzarallop - Ficha Colegios'})
	.otherwise({redirecTo:'/'});
}])

.run(function($location, $rootScope) {
	$rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
	     //mobile
	 	$rootScope.host = 'http://'+$location.host()+'/';

	})
})
