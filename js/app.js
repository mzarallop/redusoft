var app = angular.module('app', ['ngRoute', 'ngAnimate', 'chart.js']);
app.config(["$routeProvider", function($routeProvider, AnalyticsProvider){

	AnalyticsProvider
    .logAllCalls(true)
    .startOffline(true)
    .useECommerce(true, true);

    AnalyticsProvider.useAnalytics(false);
    AnalyticsProvider.setAccount('UA-66874665-1');

    // Track all routes (default is true).
	  AnalyticsProvider.trackPages(true);

	  // Track all URL query params (default is false).
	  AnalyticsProvider.trackUrlParams(true);

	  // Ignore first page view (default is false).
	  // Helpful when using hashes and whenever your bounce rate looks obscenely low.
	  AnalyticsProvider.ignoreFirstPageLoad(true);

	  // URL prefix (default is empty).
	  // Helpful when the app doesn't run in the root directory.
	  AnalyticsProvider.trackPrefix('my-application');

	  // Change the default page event name.
	  // Helpful when using ui-router, which fires $stateChangeSuccess instead of $routeChangeSuccess.
	  AnalyticsProvider.setPageEvent('$stateChangeSuccess');

	  // RegEx to scrub location before sending to analytics.
	  // Internally replaces all matching segments with an empty string.
	  AnalyticsProvider.setRemoveRegExp(/\/\d+?$/);

	  // Activate reading custom tracking urls from $routeProvider config (default is false)
	  // This is more flexible than using RegExp and easier to maintain for multiple parameters.
	  // It also reduces tracked pages to routes (only those with a templateUrl) defined in the
	  // $routeProvider and therefore reduces bounce rate created by redirects.
	  // NOTE: The following option requires the ngRoute module
	  AnalyticsProvider.readFromRoute(true);

	$routeProvider
	.when('/', {templateUrl:'templates/home.html',controller: 'homeController', title:'@mzarallop - Redusoft'})
	.when('/habilidades', {templateUrl:'templates/skills.html',controller: 'habilidadesController', title:'@mzarallop - Habilidades'})
	.when('/trabajos', {templateUrl:'templates/trabajos.html',controller: 'trabajosController', title:'@mzarallop - Proyectos que he desarrollado'})
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