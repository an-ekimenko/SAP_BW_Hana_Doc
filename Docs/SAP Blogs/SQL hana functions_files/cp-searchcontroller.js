'use strict';
/* Search Controller */
var cpSearchController = angular.module('cpSearchController', []);

cpSearchController.controller('SearchCtrl', ['$scope', '$cookies', '$translate', '$location', 'userSharedService', '$filter',
    function($scope, $cookies, $translate, $location, sharedService, $filter) {
	
		var suggestionApi = new SuggestionApi();
		var productFinderApi = new ProductFinderApi();
		
		$scope.$parent.viewTitle = null;
		$scope.$parent.showSearchIcon = false;
		
		$scope.quickResults = {};

		$scope.getLanguage = function() {
			return $translate.use();
		}

		$scope.isLoggedOn = function() {
			var sapuacpuserid = $cookies.get('sapuacpuserid');
			return sapuacpuserid;
		};

		if ($scope.isLoggedOn()) {

			var loggedOnStates = "DRAFT,TEST,PRODUCTION";

			suggestionApi.setState(loggedOnStates);
			productFinderApi.setState(loggedOnStates);
		}
		
		//search selector

		$scope.selectSearchType = function(){
			var query = $("#searchKeywords").val();
			
				
				if(query) {
					return '/viewer/product-finder?q=' + query;					
				} else {
					return '/viewer/product-finder';										
				}
				

		}

		//Search across all SAP products
		$scope.onQuickResultsRetrieved = function(result) {			
			$scope.quickResults.products = result.data.products.suggestions,
			$scope.quickResults.documents = result.data.content.suggestions				
		
			if(!$scope.quickResults.products.length && !$scope.quickResults.documents.length) {
				$scope.noQuickResults = true;
			}
		};
		
		$scope.onQuickResultsError = function (error) {
			sharedService.errorHandler(error);	
		}
		
		$scope.updateQuickSearch = function(query) {

			$scope.noQuickResults = false

			if (query) {		
    			suggestionApi.setLanguage($scope.getLanguage());
				suggestionApi.setKeywords(query);
				
				$scope.hlQuickTerms = query;
				suggestionApi.querySuggestions($scope.onQuickResultsRetrieved, $scope.onQuickResultsError);
			} else {
				$scope.quickResults = {};
			}
		};


		$scope.queryToSearch = function(keyword) {
			
			var language = $scope.getLanguage();

			var query = $("#searchKeywords").val();
			if (!query) {
				query = keyword;
			}
						
			if ($scope.isLoggedOn()) {
				if(query) {
					$location.url('/search?q=' + query +'&state=DRAFT,TEST,PRODUCTION'+'&language=' + language);					
				} else {
					$location.url('/search?state=DRAFT,TEST,PRODUCTION'+'&language=' + language);										
				}
			} else {
				if(query) {
					$location.url('/search?q=' + query +'&language=' + language);					
				} else {
					$location.url('/search?language=' + language);										
				}
			}
			
		}
		
        try{ 
            var trackingData = {};
            trackingData.pageUrl = location.href;
            trackingData.pageName ="Help Portal Home Page";
            trackingData.prop2 = "en-US";
            var loginStatus = "logN";
            if ($scope.isLoggedOn() ) {
                loginStatus = "logY";
            }
            trackingData.prop9 = loginStatus;
            sap_s.trackData(trackingData); 
        } catch(e) {console.log(e);}
}
]);

