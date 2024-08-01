var resultsService = angular.module('resultsService', []);

/* 
Sections in the resultsHandler service: 
- API instantiation
- Variable setup
- Content search functions
- Group/Variant functions
*/

resultsService.factory('resultsHandler', ['parameterHandler', '$q', function(parameterHandler, $q) {

	var contentSearchApi = new SearchApi();
	var productSearchApi = new SearchApi();
	
	contentSearchApi.setShowHighlighting(true);
	
	var resultsHandler = {}
	
	resultsHandler.results = {
			content: []
	};

	resultsHandler.setParameters = function(searchApi, parameters) {
				
		searchApi.setParameters(parameters);
		
		if(parameters.area === "topproducts") {
			parameters.to = 5;
		} 
		
		if(parameters.area === "product"){
			if(parameters.to < 21 || resultsHandler.results.products.length <= 5) {
				parameters.to = 21;
			} else {
				parameters.to = resultsHandler.results.products.length + 21;				
			}
		}

		if(parameters.area === "content") {
			if(!parameters.to || parameters.to < 21) { //remove parameters.to < 21 when removing products 
				parameters.to = 21;
			} else {
				parameters.to = resultsHandler.results.content.length + 21;				
			}
		}
	
		searchApi.setTo(parameters.to);
		
		if(parameters.product) {
			if(parameters.product.key) {
				searchApi.setProduct(parameters.product.key);
			} else {
				searchApi.setProduct(parameters.product);
			}
		}
		
		if(parameters.version) {
			if(parameters.version.key) {
				searchApi.setVersion(parameters.version.key);
			} else {
				searchApi.setVersion(parameters.version);
			}
		}
		
		if(typeof parameters.state != 'string') {	
			var state = parameterHandler.convertType(parameters.state);
			searchApi.setState(state);
		}
		
		if(typeof parameters.transtype != 'string') {	
			var transtype = parameterHandler.convertType(parameters.transtype);
			searchApi.setTranstype(transtype);
		}
	}
	
	var resultsDeferred;
	var trackSearch;
	var contentRetrieved;
	var productsRetrieved;
	
	//Product Search Functions
	resultsHandler.searchTopProducts = function(parameters) {
		
		productsRetrieved = false;
		
		resultsDeferred = $q.defer();
		resultsHandler.resultsPromise = resultsDeferred.promise;
		
		trackSearch = true;
		
		parameters.area = "topproducts"
		resultsHandler.setParameters(productSearchApi, parameters);
		productSearchApi.search(resultsHandler.onSearchProductResultsRetrieved, resultsHandler.onSearchProductResultsError);
	}

	resultsHandler.searchProducts = function(parameters) {
		
		resultsHandler.results.productsWaiting = true;
		
		parameters.area = "product";
		resultsHandler.setParameters(productSearchApi, parameters);
		productSearchApi.search(resultsHandler.onSearchProductResultsRetrieved, resultsHandler.onSearchProductResultsError);		
	}

	resultsHandler.onSearchProductResultsRetrieved = function(data) {
		
		if(data.products) {
			var to = productSearchApi.getTo()
			var numResults = data.products.length;
			
			if (numResults >= to) {
				data.products.splice(data.products.length - 1, 1);
				data.products.moreAvailable = true;
			}
			
			resultsHandler.results.products = data.products;
			resultsHandler.results.productsWaiting = false;
		} else {
			resultsHandler.results.products = [];
		}
		
		var noResults = (numResults === 0);
		
		productsRetrieved = true;
		if(trackSearch && contentRetrieved) {
			resultsDeferred.resolve(data.query);
		}
	}

	resultsHandler.onSearchProductResultsError = function(error) {
		
	};

	//Content Search Functions
	resultsHandler.getShowHighlighting = function() {
		var highlightingEnabled = contentSearchApi.getShowHighlighting();
		return highlightingEnabled;
	}
	
	resultsHandler.searchContent = function (parameters) {
		
		contentRetrieved = false;
		
		resultsHandler.results.noResults = false;
		resultsHandler.results.waiting = true;
		
		parameters.area ="content";
		resultsHandler.setParameters(contentSearchApi, parameters);

		contentSearchApi.search(resultsHandler.onSearchContentResultsRetrieved, resultsHandler.onSearchContentResultsError);
	};
	
	resultsHandler.onSearchContentResultsRetrieved = function(data) {

		resultsHandler.results.waiting = false;
		
		var to = contentSearchApi.getTo()
		var numResults = data.results.length;

		if (numResults >= to) {
			data.results.splice(data.results.length - 1, 1);
			data.results.moreAvailable = true;
		}

		resultsHandler.results.content = data.results;

		if(resultsHandler.results.content.length === 0) {
			resultsHandler.results.noResults = true;
		} else {
			resultsHandler.searchGroupInfo(resultsHandler.results.content);			
		}
		
		contentRetrieved = true;
		if(trackSearch && productsRetrieved) {
			resultsDeferred.resolve(data.query);
		}
	};
		
	resultsHandler.onSearchContentResultsError = function (error) {
		console.log(error);
	};

	//Group/Variant related functions
	resultsHandler.searchGroupInfo = function(content) {
		
		var loios=[];
		
		for ( var i=0; i<content.length; i++) {
			var topic = content[i];
			if (topic.loio) {
				loios.push(topic.loio);
			}
		}

		loios = loios.toString();
		
		contentSearchApi.setArea("groupinfo");
		contentSearchApi.setTopic(loios);
		contentSearchApi.setTo("");
		contentSearchApi.setQ("");
		contentSearchApi.setProduct("");
		
		contentSearchApi.search(resultsHandler.onSearchLoioResultsRetrieved, resultsHandler.onSearchLoioResultsError);
	}

	resultsHandler.searchGroupDetails = function(loio) {
		contentSearchApi.setArea("groupdetail");
		contentSearchApi.setTopic(loio);
		
		contentSearchApi.setQ("");
		contentSearchApi.setProduct("");

		contentSearchApi.search(resultsHandler.onSearchLoioResultsRetrieved, resultsHandler.onSearchLoioResultsError);		
	}

	resultsHandler.onSearchLoioResultsRetrieved = function(group) {
		var contentResults = resultsHandler.results.content;

		for(var i=0; i<contentResults.length; i++) {

			if(group.infos) {
				for(var j=0; j<group.infos.length; j++) {
					if(contentResults[i].loio === group.infos[j].loio) {
						contentResults[i].loioInfo = group.infos[j];
					}
				}
			}

			if(group.results) {
				for(var j=0; j<group.results.length; j++) {
					if(contentResults[i].loio === group.results[0].loio) {
						contentResults[i].loioDetails = group.results;
					}
				}
			}
		}
	}
	
	resultsHandler.onSearchLoioResultsError = function(error) {
		console.log(error);
	}
	
	return resultsHandler;
}]);