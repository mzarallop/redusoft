var app = angular.module('app', ['ngRoute', 'ngAnimate', 'chart.js']);
app.config(["$routeProvider", function($routeProvider){


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
        //mobile
	 	$rootScope.host = 'http://'+$location.host()+'/';

	    if (current.hasOwnProperty('$$route')) {
	        document.title = current.$$route.title;
	    }

	    if(current.loadedTemplateUrl === 'templates/home.html'){
	    	
	    }

	    if(current.loadedTemplateUrl === 'templates/skills.html'){

	    }

	});
});;app.controller("baseCtr", ["$scope", "$location", function($scope, $location){

	$scope.select_menu = function(){
        setTimeout(function(){
            $(".navbar-toggle").trigger('click', function(){
                $(this).slideUp();
            })
        },500);
    }
}]);

app.controller("homeController", ["$scope, $window",function($scope, $window){
	$scope.pageClass='page-home'
}]);

app.controller("habilidadesController", ["$scope",function($scope){
	$scope.pageClass='page-habilidades'

	$scope.labels_general = ["FrontEnd", "BackEnd"];
  	$scope.data_general = [80,95];


	$scope.labels = ['HTML5', 'CSS', 'JS', 'Angular', 'JSON'];
  	$scope.series = ['FrontEnd'];
    $scope.data = [
    		[95, 90, 95, 80, 100]
  	];

  	$scope.labels_back = ['PHP', 'MySQL', 'PL/Sql', 'Pg', 'Linux', 'API'];
  	$scope.series = ['FrontEnd'];
    $scope.data_back = [
    		[100, 95, 80, 80, 100, 95]
  	];
}]);

app.controller("trabajosController", ["$scope", "workService",function($scope, workService){
	$scope.pageClass='page-trabajos'

  var dir = workService.trabajos()
  dir.then(function(data){
    $scope.trabajos = data;
  });

}]);
;app.service('menuService',['$http','$q', function($http, $q){
	var deferred = $q.defer();
	function menus(){
        $http.get("./plugins/dir.json", {cache:true})
        .success(function(data){
            deferred.resolve(data);
        });
        return deferred.promise;
    }

    return {
        menus:menus
    }
}]);

app.service('workService',['$http','$q', function($http, $q){
    var deferred = $q.defer();
    function trabajos(){
        $http.get("./plugins/resource.json", {cache:true})
        .success(function(data){
            deferred.resolve(data);
        });
        return deferred.promise;
    }

    return {
        trabajos:trabajos
    }
}]);
