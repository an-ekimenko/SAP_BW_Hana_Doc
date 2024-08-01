'use strict';
/* Search Controller */
var cpSearchHPController = angular.module('cpSearchHPController', []);

cpSearchHPController.controller('SearchHPController', ['$rootScope', '$scope', '$cookies', 'userSharedService', '$log', '$translate', '$location', '$interval', 'securityService','searchServiceApi',
    function($rootScope, $scope, $cookies, sharedService, $log, $translate, $location, $interval, securityService,searchServiceApi) {

		$scope.q= $scope.q || "";
		$scope.contentlinks = $scope.contentlinks || [];
		$scope.nothingFoundVisible = false;
		$scope.lastLoad;
		$scope.scrollLock;
		$scope.counter = 0;
		$scope.maxResults=0;
		// get default parameters
		$scope.parameters = searchServiceApi.getDefaultParameters();	
		$scope.parameters.area = "content";
		$scope.parameters.from = 0;
		$scope.parameters.to = 19;
		$scope.scrollLock = true;
		
		// reads the parameters from the url 
		$scope.readUrlParameters = function() {
			$scope.parameters.state = $location.search().state;
			$scope.parameters.deliverable = $location.search().product;
			$scope.parameters.version = $location.search().version;
			$scope.parameters.language = $location.search().language;			
		}
		
		// starts the search for a specific term
		$scope.searchContent = function() {
			// change the url parameter
			$location.search('q',$scope.q);
			$scope.parameters.from = 0;
			$scope.parameters.to = 19;
			searchServiceApi.setParameters($scope.parameters);
			if ($scope.q) {
				searchServiceApi.onSearchRequested(encodeURI($scope.q),$scope.onSearchRetrieved);
			}
		};
		
		// callback when search results are retrieved
		$scope.onSearchRetrieved = function(response) {
			$scope.contentlinks = response.results;
			$scope.maxResults = response.maxResults;
			if ($scope.contentlinks.length === 0) {
				$scope.nothingFoundVisible = true;
			}
			else {
				$scope.nothingFoundVisible = false;
				$scope.scrollLock = false;
			}
		};

		// infinite scrolling function
		$scope.onScroll = function() {
			if (($scope.getAvailableResults()+1 < $scope.maxResults && $scope.getAvailableResults() < 200)) {
				$scope.scrollLock = true;
				$scope.parameters.from = $scope.getAvailableResults();
				$scope.parameters.to = $scope.parameters.from + 20;
				searchServiceApi.setParameters($scope.parameters);
				searchServiceApi.onSearchRequested(encodeURI($scope.q),$scope.onNextSearchResultsRetrieved);
			}
		};
		
		$scope.onNextSearchResultsRetrieved = function(response) {
			console.log(response);
			$scope.scrollLock = false;
			for (var i=0;i< response.results.length;i++) {
				$scope.contentlinks.push(response.results[i]);
			}
		};
		
		$scope.getAvailableResults = function() {
			return $scope.contentlinks.length;
		};
		
		$scope.readUrlParameters();
		
		if ($location.search().q) {
			$scope.q = $location.search().q;
			$scope.searchContent();
		};
	}
]);
