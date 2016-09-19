app.service('menuService',['$http','$q', function($http, $q){
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
