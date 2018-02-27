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
  	$scope.series = ['Backend'];
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
app.controller("colegiosController", ["$scope", "ColegiosFac","$localStorage", "$routeParams", function($scope, ColegiosFac, $localStorage, $routeParams){
  
  $scope.pageClass='page-colegios';

  var dato_rbd = $localStorage.rbd;
  var list_col = ColegiosFac.get({rbd:dato_rbd});  
            list_col.$promise.then(function(data){
            $scope.listar_colegios = JSON.parse(JSON.stringify(data));
  })

  $scope.buscar_colegio = function(){
          if($scope.rbd != undefined){
          dato_rbd = 0;

                  if($scope.rbd === $localStorage.rbd){
                    dato_rbd = $scope.rbd;
                  }else{
                    $localStorage.rbd = $scope.rbd;
                    console.log('no son iguales', $scope.rbd, $localStorage.rbd)
                    dato_rbd = $scope.rbd;                   
                  }
                var list_col = ColegiosFac.get({rbd:dato_rbd});  
                list_col.$promise.then(function(data){
                $scope.listar_colegios = JSON.parse(JSON.stringify(data));
                })
          }  
  }
 
}]);

app.controller("fichaController", ["$scope", "FichaColegios", "$routeParams", "$window", function($scope, FichaColegios, $routeParams, $window){
  
  $scope.pageClass='page-fichacolegio';
  var fichaColegio = FichaColegios.get({rbd:$routeParams.rbd});
      fichaColegio.$promise.then(function(data){
        $scope.ficha = JSON.parse(JSON.stringify(data));
         $scope.colors = ['#ff8e72'];
        //grafica SNED
        $scope.labels = $scope.ficha[0].sned.titulos;
        $scope.series = ['SNED'];
        $scope.data = [$scope.ficha[0].sned.data];
        //grafica promedio
        $scope.label_avg = ['Promedio', 'Total'];
        $scope.series_avd = ['Promedios'];
        $scope.data_avg = [$scope.ficha[0].sned.promedio];
  })
  $scope.back = function() { 
    $window.history.back(-1);
  };
}]);
