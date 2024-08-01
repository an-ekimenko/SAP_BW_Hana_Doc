'use strict';
/* User Service */
var cpContentApiService = angular.module('cpContentApiService', []);

cpContentApiService.factory('contentApiService', ['contentApiResult','$location', function(contentApiResult,$location) {
	var contentApiService = {};
	
	
	contentApiService.getDefaultParameters = function() {
		var data = {
				topic: '', 
				language: 'en-US',
				deliverable: '',
				version: '', 
				state: 'PRODUCTION', 
				transtype: 'html5.uacp',
				nocontent: false
		};
		return data;
	};
	
	contentApiService.getContent = function(parameters,fnCallback) {
		var data = parameters;
		contentApiResult.query(data,
		        function(response) {
					// invoke callback function: response.data --> object with the following attributes: query, maxResults, results, productResults, products
					if (response.data.content) {
						fnCallback(response.data.content);
					}
		        },
		        function(error) {
		        	console.log(error);
		        });
	};
		
	return contentApiService;
}]);


cpContentApiService.factory('contentApiResult', ['$resource',
                                    function($resource) {
                                		var results;
										return $resource('/http.svc/getcontent', {}, {
											query: {	method:'GET', 
														params:{
															'topic' : '@topic' 
														},
														isArray:false,
														cache:false},
											
										});
                                    }
                                ]);

