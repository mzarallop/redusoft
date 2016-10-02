var app = angular.module('app', ['ngRoute', 'ngAnimate', 'chart.js']);
app.config(["$routeProvider", function($routeProvider){
	$routeProvider
	.when('/', {title:'Inicio',templateUrl:'templates/home.html',controller: 'homeController', title:'@mzarallop - Redusoft'})
	.when('/habilidades', {title:'Habilidades',templateUrl:'templates/skills.html',controller: 'habilidadesController', title:'@mzarallop - Habilidades'})
	.when('/trabajos', {title:'Trabajos',templateUrl:'templates/trabajos.html',controller: 'trabajosController', title:'@mzarallop - Proyectos que he desarrollado'})
	.otherwise({redirecTo:'/'});
}])
.run(function($location, $rootScope) {
	$rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
	     //tweets
	    var config_desktop = {
          "id": '636151242830516224',
          "domId": 'textTweet',
          "maxTweets": 5,
          "enableLinks": true,
          "showUser": false,
          "showTime": false,
          "dateFunction": '',
          "showRetweet": true,
          "showImages": true,
          "customCallback": handleTweets,
          "showInteraction": false,
          "lang": 'es'
        };

        //escritorio
        twitterFetcher.fetch(config_desktop);
        //mobile
	 	$rootScope.host = 'http://'+$location.host()+'/';

	    if (current.hasOwnProperty('$$route')) {
	        document.title = current.$$route.title;
	    }

	    if(current.loadedTemplateUrl === 'templates/home.html'){
	    	random_twitter('textTweet')
	    }

	    if(current.loadedTemplateUrl === 'templates/skills.html'){

	    }

	});
});