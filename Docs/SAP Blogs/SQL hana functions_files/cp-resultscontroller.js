'use strict';
/* Results Controller */
var cpResultsController = angular.module('cpResultsController', ['infinite-scroll']);

/* 
Sections in this controller: 
- Default variable setup
- API instantiation
- Initialize parameters and filters values function
- Search Content function
- Filter edit/selection handling functions
- UI visibility handling functions
*/

cpResultsController.controller('ResultsCtrl', ['$scope', '$location', '$cookies', '$translate', 'parameterHandler', 'filterHandler', 'resultsHandler', 'advancedSearchHandler', '$filter',
    function($scope, $location, $cookies, $translate, parameterHandler, filterHandler, resultsHandler, advancedSearchHandler, $filter) {		
		
		if ($scope.showByFeatureFlag("ppsearch")) {
			$scope.$parent.viewTitle = null;
			$scope.$parent.showSearchIcon = false;
		}
	
		//APIs
		var searchApi = new SearchApi();
		
		var isLoggedOn = function() {
			var sapuacpuserid = $cookies.get('sapuacpuserid');
			return sapuacpuserid;
		};
		
		//Adobe tracker and page-specific tracking data
		var adobeTracker = new AdobeTrackingService();
		
		var pageName = "Help Portal Search Page";
		var language = $translate.use() || $translate.proposedLanguage();
		var loginStatus = isLoggedOn();	
	
		adobeTracker.setPageData(pageName, language, loginStatus);
		
        var query = $location.search().q;
        
        if(!query) {
        	adobeTracker.trackData();
		}
		
		//Initialize parameters and filters values
		$scope.initialize = function() {
			
			parameterHandler.generateParameters($location.search());

			$scope.parameters = parameterHandler.parameters;
						
			if ($scope.parameters.q) {
				$scope.currentQ = $scope.parameters.q;
				$scope.searchAll();
			} else {
				$scope.currentQ = "";
				$scope.advancedSearch = true; 
				$scope.toggleHelp()		
				$scope.results = {}		
			}
			
			$scope.parameters.transtype = parameterHandler.convertType($scope.parameters.transtype);
			$scope.parameters.state = parameterHandler.convertType($scope.parameters.state);

			filterHandler.generateFilters($scope.parameters);
			$scope.filters = filterHandler.filters;

			if($scope.parameters.product) {
				filterHandler.productsPromise.then(function(allProducts) {
					parameterHandler.findProductValue(allProducts);
					$scope.selectedProduct = $scope.parameters.product.value;
				});

				filterHandler.versionsPromise.then(function(allVersions) {
					if($scope.parameters.version) {
						parameterHandler.findVersionValue(allVersions);						
					} else {
						filterHandler.setVersionSelection();
						$scope.parameters.version = $scope.filters.versions[0];
						parameterHandler.updateUrl($scope.parameters);
					}
				})
			}
		}
		
		//search selector

		
		$scope.selectSearchType = function(){
			var query = $("#searchfield").val();
			
				
				if(query) {
					return '/viewer/product-finder?q=' + query;					
				} else {
					return '/viewer/product-finder';										
				}
				
		}

		//Search Content function
		$scope.searchAll = function() {
			
			if($scope.productOnlyDisplay) { 
				resultsHandler.searchProducts($scope.parameters); 
			} else { 
				resultsHandler.searchTopProducts($scope.parameters);
				resultsHandler.searchContent($scope.parameters);
				resultsHandler.resultsPromise.then(function() {
					
					var noResults = true;
					if($scope.results.products.length || $scope.results.content.length) {
						noResults = false;
					}
					
					adobeTracker.trackSearchData($scope.parameters.q, noResults);
				})
			}

			$scope.results = resultsHandler.results;
		};

		$scope.queryToSearch = function() {

			if($scope.currentQ === "") {
				return;
			}

			if($scope.currentQ != $scope.parameters.q) {
				parameterHandler.updateQuery($scope.currentQ);
				$scope.searchAll();
			}
		}

		$scope.toggleHelp = function() {

			if($scope.advancedSearch) {
				advancedSearchHandler.getOperatorContent();
				advancedSearchHandler.getFilterContent();
	
				advancedSearchHandler.operatorContentPromise.then(function(content) {
					$scope.operatorHelpContent = content;
				})
	
				advancedSearchHandler.filterContentPromise.then(function(content){
					$scope.filterHelpContent = content;				
				})
			} 
		}

		//Filter edit/selection handling functions
		$scope.onSelectLanguage = function() {
			parameterHandler.clearProductSelection();
			filterHandler.clearVersions()

			filterHandler.filterProducts($scope.parameters);

			$scope.updateSelection();
		}

		$scope.onProductEdit = function() {
			if (!$scope.selectedProduct) {

				parameterHandler.clearProductSelection();
				filterHandler.clearVersions()

				filterHandler.filterProducts($scope.parameters);
				filterHandler.filterLanguages($scope.parameters);

				$scope.updateSelection();
			}
		}
		
		$scope.getProductSuggestions = function(userInput) {

			userInput = userInput.toLowerCase();
			var productSuggestions = [];
			var matchingProducts = $filter('filter')($scope.filters.products , {'$': userInput});

			for(var i=0; i<matchingProducts.length; i++) {
				
				var product = matchingProducts[i];
				
				if(product.value.toLowerCase().indexOf(userInput) !== -1) {
					product.displayValue = product.value;
					productSuggestions.push(product);
				} else {
					var alternativeProductNames = product.alternativeProductNames;
					for(var j=0; j<alternativeProductNames.length; j++) {
						var alternativeProductName = alternativeProductNames[j];
						if(alternativeProductName.toLowerCase().indexOf(userInput) !== -1) {
							product.displayValue = product.value +' (' + alternativeProductName +')';
							productSuggestions.push(product);
							break;
						}
					}
				}
			}

			return productSuggestions;
		}

		$scope.onSelectProduct = function() {

			$scope.parameters.product =  $scope.selectedProduct;
			$scope.selectedProduct = $scope.selectedProduct.value;
			
			$scope.parameters.version = ""
			
			filterHandler.clearVersions()

			filterHandler.filterVersions($scope.parameters);

			filterHandler.versionsPromise.then(function(allVersions) {
				filterHandler.setVersionSelection();
				$scope.parameters.version = $scope.filters.versions[0];
				parameterHandler.updateUrl($scope.parameters);
			})

			$scope.updateSelection();
		}

		$scope.onSelectVersion = function(newVersion) {

			$scope.parameters.version = newVersion

			filterHandler.filterLanguages($scope.parameters);

			$scope.updateSelection()
		}

		$scope.onSelectFormat = function() {
			parameterHandler.clearProductSelection();
			filterHandler.clearVersions()

			if(parameterHandler.allOptionsDeselected($scope.parameters.transtype)) {
				$scope.parameters.transtype.standard = true;
			} 

			filterHandler.filterProducts($scope.parameters);			
			
			$scope.updateSelection();
		}

		$scope.onSelectStatus = function() {
			parameterHandler.clearProductSelection();
			filterHandler.clearVersions()

			if(parameterHandler.allOptionsDeselected($scope.parameters.state)) {
				$scope.parameters.state.PRODUCTION = true;
			} 
						
			filterHandler.filterProducts($scope.parameters);
			filterHandler.filterLanguages($scope.parameters);
			
			$scope.updateSelection();
		}

		$scope.updateSelection = function() {
			$scope.parameters.to = ""
			$scope.searchAll();
			parameterHandler.updateUrl($scope.parameters)
		}

		//UI visibility handling functions
		$scope.expandProducts = function() {
			$scope.productOnlyDisplay = true;
			resultsHandler.searchProducts($scope.parameters);
		};
		
		$scope.collapseProducts = function() {
        	$scope.productOnlyDisplay = false;
        	$scope.searchAll();
		};
		
		$scope.expandContent = function() {
			resultsHandler.searchContent($scope.parameters);
		}

		$scope.toggleFilter = function(val) {
        	var spanEl = $("#"+val);
        	if (spanEl.hasClass("expanded")) {
        		spanEl.removeClass("expanded");
        	}
        	else {
        		spanEl.addClass("expanded");
        	}
        }
		
		$scope.toggleGroupDetails = function(content) {
			if(content.showGroupDetails) {
				content.showGroupDetails = false
			} else {
				content.showGroupDetails = true;
				resultsHandler.searchGroupDetails(content.loio);
			}
		}

		$scope.onSelectResult = function() {

			var linkRank = this.$index+1;
			var linkDescription;

			if(this.product) {
				linkDescription = this.product.title;
			} else {
				linkDescription = this.content.title;
			}

			adobeTracker.trackResultClick(linkRank, linkDescription);
		}
		
		$scope.initialize();
	    
 }]);