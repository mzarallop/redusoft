app.factory('ColegiosFac', ['$resource', function($resource){
	return $resource(api+'welcome/index/:rbd', {rbd:'@_rbd'},
		{ 'get':    {method:'GET', isArray:true, params:{rbd:0}},
		  'save':   {method:'POST', isArray:true, params:{rbd:'@_rbd'}},
		  'query':   {method:'POST', isArray:true},
		  'remove': {method:'DELETE'}
		}
	)
}])

app.factory('FichaColegios', ['$resource', function($resource){
	return $resource(api+'welcome/fichaColegio/:rbd', {rbd:'@_rbd'},
		{ 'get':    {method:'GET', isArray:true},
		  'save':   {method:'POST', isArray:true},
		  'query':   {method:'POST', isArray:true},
		  'remove': {method:'DELETE'}
		}
	)
}])