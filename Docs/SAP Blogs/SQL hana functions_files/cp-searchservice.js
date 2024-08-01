'use strict';
/* User Service */
var cpSearchService = angular.module('cpSearchService', []);

cpSearchService.factory('searchServiceApi', ['searchResult','filterResult','$location', function(searchResult,filterResult,$location) {
	var searchServiceApi = {};
	
	searchServiceApi.setParameters = function(data) {
		this.data = data;
	}
	
	searchServiceApi.getParameters = function() {
		return this.data;
	}
	
	searchServiceApi.getDefaultParameters = function() {
		var data = {q: '', language: 'en-US', area: 'all', deliverable: '', product: '', version: '', state: 'PRODUCTION', format: ["standard","html","pdf","others"], ppdependencysearch: 0, navrefsearch: 0};
		return data;
	}
	
	searchServiceApi.data = searchServiceApi.getDefaultParameters();
	
	searchServiceApi.onSearchRequested = function (searchString, fnSearchHandler) {
		var data = {};
		
		data.q = searchString;
		
		data.transtype = this.getParameters().format.toString();
		data.area = this.getParameters().area;
		data.language = this.getParameters().language;
		data.product = this.getParameters().product;
		data.version = this.getParameters().version;
		data.state = this.getParameters().state;
		data.deliverable = this.getParameters().deliverable;
		data.ppdependencysearch = this.getParameters().ppdependencysearch;
		
		if (this.getParameters().to) data.to = this.getParameters().to;
		if (this.getParameters().searchtype) data.searchtype = this.getParameters().searchtype;
		searchResult.query(data,
	        function(response) {
				// invoke callback function: response.data --> object with the following attributes: query, maxResults, results, productResults, products
	          	fnSearchHandler(response.data);
	        },
	        function(error) {
	        	console.log('Error: '+error);
	        });
	}
	
	
	searchServiceApi.onFilterValuesRequested = function(element, parameters,fnCallback) {
		var data = {};
		data.q = parameters.prefix;
		data.element = element;
		data.product = parameters.product;
		data.version = parameters.version;
		if (element !== "state") data.state = parameters.state;
		if (element !== "language") data.language = parameters.language;
		filterResult.query(data,
				function(response) {
					fnCallback(response.data,element);
				},
				function(error) {
					console.log('Error: '+error);	
				}
			);
	}
	
	searchServiceApi.onLoioInfoRequested = function(loios,parameters,fnCallback) {
		var data = {};
		data.area = "groupinfo";
		data.topic = loios.toString();
		if (parameters.product) data.product =parameters.product;
		if (parameters.version) data.version =parameters.version;
		if (parameters.language) data.language =parameters.language;
		if (parameters.format) data.transtype = parameters.format.toString();
		if (parameters.state) data.state = parameters.state.toString();
		searchResult.query(data,
		        function(response) {
					// invoke callback function: response.data --> object with the following attributes: query, maxResults, results, productResults, products
					fnCallback(response);
		        },
		        function(error) {
		            // TO DO: error handler
		        	console.log('Error: '+error);
		        });
	}
	
	searchServiceApi.onLoioDetailsRequested = function(loio,parameters,fnCallback) {
		var data = {};
		data.area = "groupdetail";
		data.topic = loio;
		if (parameters.product) data.product =parameters.product;
		if (parameters.version) data.version =parameters.version;
		if (parameters.language) data.language =parameters.language;
		if (parameters.format) data.transtype = parameters.format.toString();
		if (parameters.state) data.state = parameters.state.toString();
		searchResult.query(data,
		        function(response) {
					// invoke callback function: response.data --> object with the following attributes: query, maxResults, results, productResults, products
					fnCallback(response);
		        },
		        function(error) {
		            // TO DO: error handler
		        	console.log('Error: '+error);
		        });
	}	
	
	return searchServiceApi;
}]);


cpSearchService.factory('searchResult', ['$resource',
                                    function($resource) {
                                		var results;
										return $resource('/http.svc/search', {}, {
											query: {	method:'GET', 
														params:{	
															'q':'@q',
															'language': '@language'
															
																		
													}, isArray:false, cache:false},
											
										});
                                    }
                                ]);

cpSearchService.factory('suggestionResult', ['$resource',
                                         function($resource) {
                                     	
     										return $resource('/http.svc/suggestion', {}, {
     											query: {method:'GET', params:{q:'@q'}, isArray:false,cache:false}
     										});
									}
								]);     		

cpSearchService.factory('filterResult', ['$resource',
                                             function($resource) {
                                         	
         										return $resource('/http.svc/filter', {}, {
         											query: {method:'GET', params:{q:'@q',element: '@element',product:'@product',state:'@state',language:'@language',version:'@version',nocache:new Date().getTime()}, isArray:false,cache:false}
         										});
    									}
    								]);     	

cpSearchService.factory('localResult', function($rootScope) {
	var keywordVariable;
    return {
        subscribe: function(scope, callback) {
            var handler = $rootScope.$on('notifying-service-event', function(){
            	console.log(arguments);
            	callback(arguments[1]);
            });
            scope.$on('$destroy', handler);
        },

        notify: function(keywords) {
        	keywordVariable = keywords;
            $rootScope.$emit('notifying-service-event', keywords);
        },
        
        getKeyword: function() {
        	return keywordVariable;
        }
    };
});