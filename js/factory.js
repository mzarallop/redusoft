app.factory('colegiosFac', ['$resource', function($resource){

	return $resource(api, {id:'@id'},
		{ 'get':    {method:'GET', isArray:true},
		  'save':   {method:'POST'},
		  'query':  {method:'GET', isArray:true},
		  'remove': {method:'DELETE'},
		  'delete': {method:'DELETE'} 
		}
	)
}])