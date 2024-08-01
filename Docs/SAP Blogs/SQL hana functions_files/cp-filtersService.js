var filtersService = angular.module('filtersService', []);

/* 
Sections in the filtersHandler service: 
- API instantiation
- Variable setup
- Filter generation function
- Individual filter request setup functions
- Filter request success/error handlers
- Filter modification functions - clearing versions
*/

filtersService.factory('filterHandler', [ 'parameterHandler', '$q', function(parameterHandler, $q) {
	
	var filterHandler = {}
	
	var filterApi = {
		language: new LanguageFilterApi(),
		product: new ProductFilterApi(),
		state: new StateFilterApi(),
		version: new VersionFilterApi()
	}
	
	filterHandler.filters = {};

	//A promise to be resolved when all product filters are received
	//We need to know when this occurs in order to find the value of any url product parameter on initialisation in the controller 
	var productsDeferred = $q.defer();
	filterHandler.productsPromise = productsDeferred.promise;
	
	var versionsDeferred;

	//Filter generation function
	filterHandler.generateFilters = function(parameters) {

		filterHandler.filterLanguages(parameters);
		filterHandler.filterState(parameters);		
		filterHandler.filterProducts(parameters);
		if(parameters.product) {
			filterHandler.filterVersions(parameters);
		}
	}

	//Individual filter request setup functions
	filterHandler.filterLanguages = function(parameters) {
		var state = parameterHandler.convertType(parameters.state);
		filterApi.language.setState(state);

		if(parameters.product) {
			filterApi.language.setProduct(parameters.product.key);
		}

		if(parameters.version) {
			filterApi.language.setVersion(parameters.version.key);			
		}

		filterApi.language.queryLanguages(filterHandler.onFilterValuesRetrieved, filterHandler.onFilterValuesError);
	}

	filterHandler.filterState = function(parameters) {
		filterApi.state.setLanguage(parameters.language);
		filterApi.state.queryStates(filterHandler.onFilterValuesRetrieved, filterHandler.onFilterValuesError);
	}

	filterHandler.filterProducts = function(parameters) {

		var state = parameterHandler.convertType(parameters.state);
		filterApi.product.setState(state);	
			
		filterApi.product.setLanguage(parameters.language);
		filterApi.product.queryProducts(filterHandler.onFilterValuesRetrieved, filterHandler.onFilterValuesError);
	}

	filterHandler.filterVersions = function(parameters) {
		versionsDeferred = $q.defer();
		filterHandler.versionsPromise = versionsDeferred.promise;
		
		filterApi.version.setLanguage(parameters.language);

		var state = parameterHandler.convertType(parameters.state);
		filterApi.version.setState(state);
		
		filterApi.version.setProduct(parameters.product.key);		
		filterApi.version.queryVersions(filterHandler.onFilterValuesRetrieved, filterHandler.onFilterValuesError);
	}

	//Filter request success/error handlers
	filterHandler.onFilterValuesRetrieved = function(data) {

		if(data.language) {
			filterHandler.filters.languages = data.language;
		}

		if(data.state) {
			if(data.state.length === 1) { 
				filterHandler.filters.state = false; //There is only one choice of state, therefore the ability to filter state is useless
			} else {
				var tempArray = [];
				filterHandler.filters.state = {};

				for(var i=0; i<data.state.length; i++) {
					tempArray.push(data.state[i].value);
				}

				for(var i=0; i<tempArray.length; i++) {
					filterHandler.filters.state[tempArray[i]] = true;
				}
			}
		}

		if(data.product) {
			filterHandler.filters.products = data.product;
			productsDeferred.resolve(data.product);
		}
		
		if(data.version) {
			filterHandler.filters.versions = data.version;
			versionsDeferred.resolve(data.version);
		}

	}

	filterHandler.onFilterValuesError = function(error) {
	}

	//Filter modification functions - clearing versions
	filterHandler.setVersionSelection = function() {
		var defaultSelection;
		if(filterHandler.filters.versions.length > 1) {
			defaultSelection = {
				value: "All versions",
				key: null
			}
			filterHandler.filters.versions.unshift(defaultSelection);	
		}
	}

	filterHandler.clearVersions = function() {
		filterHandler.filters.versions = "";
	}

	return filterHandler;
}]);