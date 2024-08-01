var advancedSearchService = angular.module('advancedSearchService', []);

/* 
Sections in the advancedSearchHandler service: 
- Get operator advanced search help
- Get filter advanced search help
*/

advancedSearchService.factory('advancedSearchHandler', [ 'contentApiService', '$q', function(contentApiService, $q) {
	
	var advancedSearchHandler = {}

	var operatorContentDeferred = $q.defer();	
	var filterContentDeferred = $q.defer();

	advancedSearchHandler.setParameters = function()  {
		advancedSearchHandler.parameters = contentApiService.getDefaultParameters();

		advancedSearchHandler.parameters.deliverable = "23c66fe61c7a435ca98d1211d5fa8b33";
		advancedSearchHandler.parameters.version = "2.0.0.0.x";
		advancedSearchHandler.parameters.transtype = "xhtml.body";
	}

	advancedSearchHandler.setParameters();

	advancedSearchHandler.getOperatorContent = function() {
		advancedSearchHandler.operatorContentPromise = operatorContentDeferred.promise;

		advancedSearchHandler.parameters.topic = "e69cf272a40d425489434258329f4599"
		contentApiService.getContent(advancedSearchHandler.parameters, advancedSearchHandler.onAdvancedSearchContentRetrieved);		
	}

	advancedSearchHandler.getFilterContent = function() {
		advancedSearchHandler.filterContentPromise = filterContentDeferred.promise;

		advancedSearchHandler.parameters.topic = "3cb1d4e9042347cda26b38355760f6ec"
		contentApiService.getContent(advancedSearchHandler.parameters, advancedSearchHandler.onAdvancedSearchContentRetrieved);				
	}

	advancedSearchHandler.parseContent = function(content) {
		var html = $.parseHTML(content);
		var body = $(html).find(".body"); 
		content = body.html();

		return content;
	}

	advancedSearchHandler.onAdvancedSearchContentRetrieved = function(results) {

		if(results.title === "Search Operators") {
			var operatorHelpContent = advancedSearchHandler.parseContent(results.content);
			operatorContentDeferred.resolve(operatorHelpContent);
		}

		if(results.title === "Filters") {
			var filterHelpContent = advancedSearchHandler.parseContent(results.content);
			filterContentDeferred.resolve(filterHelpContent);			
		}
	}

	return advancedSearchHandler;
}]);