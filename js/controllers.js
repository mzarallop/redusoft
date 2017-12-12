app.controller("baseCtr", ["$scope", "$location", function($scope, $location){
	$scope.select_menu = function(){
        setTimeout(function(){
            $(".navbar-toggle").trigger('click', function(){
                $(this).slideUp();
            })
        },500);
    }
}]);

app.controller("homeController", ["$scope", function($scope){
	$scope.pageClass='page-home';
}]);

app.controller("habilidadesController", ["$scope",function($scope){
	$scope.pageClass='page-habilidades';

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
	$scope.pageClass='page-trabajos';

  var dir = workService.trabajos()
  dir.then(function(data){
    $scope.trabajos = data;
  });

}]);
app.controller("colegiosController", ["$scope", "ColegiosFac","FichaColegios", "$routeParams", function($scope, ColegiosFac, FichaColegios, $routeParams){
  
  $scope.pageClass='page-colegios';
  $scope.buscar_colegio = function(e){
       var list_col = ColegiosFac.get({rbd:this.rbd});  
         list_col.$promise.then(function(data){
            $scope.listar_colegios = JSON.parse(JSON.stringify(data));
         }) 
  }
 
}]);

app.controller("fichaController", ["$scope", "FichaColegios", "$routeParams", function($scope, FichaColegios, $routeParams){
  
  $scope.pageClass='page-fichacolegio';
  var fichaColegio = FichaColegios.get({rbd:$routeParams.rbd});
      fichaColegio.$promise.then(function(data){
        $scope.ficha = JSON.parse(JSON.stringify(data));
  })
}]);
