"use strict";

var searchapi = angular.module("cpSearchApi",['infinite-scroll']);

searchapi.controller("SearchApiCtrl",['$scope', '$http', '$translate', '$location', 'searchServiceApi',
    function($scope, $http, $translate, $location, searchServiceApi) {
		// initialize parameters with default values
		$scope.q = '';
		$scope.deliverable = '';
		$scope.product = '';
		$scope.version = '';
		$scope.language = 'en-US';
		$scope.state = 'PRODUCTION';
		$scope.transtypes = ["standard","html","pdf","others"];
		$scope.area = 'all';
		$scope.from = 0;
		$scope.to = 29;
		
		$scope.result = {};
	
		$scope.translate = $translate;
		
		$scope.nothingFoundVisible;
		$scope.lastLoad;
		$scope.scrollLock;
		
		$scope.counter = 0;
		
		// initialize parameters with url values
		$scope.initializeWithUrl = function() {
			var urlobj = $location.search();
			// set search-service parameters
			var data = searchServiceApi.getParameters();
			if (urlobj.q) data.q = urlobj.q;
			if (urlobj.deliverable) data.deliverable = urlobj.deliverable;
			if (urlobj.product) data.product = urlobj.product;
			if (urlobj.version) data.version = urlobj.version;
			if (urlobj.language) data.language = urlobj.language;
			if (urlobj.state) data.state = urlobj.state;
			if (urlobj.transtype) data.transtype = urlobj.transtype;
			if (urlobj.area) data.area = urlobj.area;
			searchServiceApi.setParameters(data);		
			
			// set controller parameters
			if (urlobj.q) $scope.setKeyword(urlobj.q);
			if (urlobj.deliverable) $scope.setDeliverable(urlobj.deliverable);
			if (urlobj.product) $scope.setProduct(urlobj.product);
			if (urlobj.version) $scope.setVersion(urlobj.version);
			if (urlobj.language) $scope.setLanguage(urlobj.language);
			if (urlobj.state) $scope.setState(urlobj.state);
			if (urlobj.transtype) $scope.setTranstypes(urlobj.transtype.split(','));
			if (urlobj.area) $scope.setArea(urlobj.area);
		}
		
		//start function
		$scope.goSearch = function() {
			$scope.from = 0;
			$scope.initializeWithUrl();
			searchServiceApi.onSearchRequested(encodeURI($scope.getKeyword()),$scope.onSearchRetrieved);
		}
		
		//callback function
		$scope.onSearchRetrieved = function(response) {
			$scope.result = response;
			$scope.nothingFoundVisible = response.results.length === 0;
		}
		
		
		// infinite scrolling function
		$scope.infiniteScrolling = function() {
			$scope.counter++;
			if($scope.counter===1) return;
			
			if ($scope.from===0) $scope.lastLoad = false;
			
			if ($scope.from+30 >= $scope.result.maxResults) $scope.lastLoad = true;
			if ($scope.lastLoad) return;
			$scope.scrollLock = true;
			$scope.from += 30;
			$scope.to += 30;
			if ($scope.from == 180) {
				$scope.to = 199;
				$scope.lastLoad = true;
			}
			// create the URL
			var url = "/http.svc/search?area=all";
			if ($scope.q!=='') url += "&q=" + $scope.getKeyword();
			url += "&language=" + $scope.getLanguage() + "&state=" + $scope.getState() + "&transtype=" + $scope.getTranstypesAsString() + "&deliverable=" + $scope.getDeliverable() + "&product=" + $scope.getProduct() + "&version=" + $scope.getVersion() +  "&from=" + $scope.from + "&to=" + $scope.to;
			$http({
				method: "GET",
				url: url
			}).then(function successCallback(data) {
				data.data.data.results.forEach(function(entry) {
				$scope.result.results.push(entry);
				});
			}, function errorCallback() {});				
			$scope.scrollLock = false;
		};
		
		// set functions
		$scope.setKeyword = function(value) {
			$scope.q = value;
		}
		
		$scope.setDeliverable = function(value) {
			$scope.deliverable = value;
		}
		
		$scope.setProduct = function(value) {
			$scope.product = value;
		}
		
		$scope.setVersion = function(value) {
			$scope.version = value;
		}
		
		$scope.setLanguage = function(value) {
			$scope.language = value;
		}
		
		$scope.setState = function(value) {
			$scope.state = value;
		}
		
		$scope.setTranstypes = function(value) {
			$scope.transtypes = value;
		}
		
		$scope.setTranstypesAsString = function(value) {
			var transtypes = value.split(',');
			for(var i=0;i<transtypes.length; i++) {
				$scope.transtypes.push(transtypes[i]);
			}
		}
		
		$scope.setArea = function(value) {
			$scope.area = value;
		}
		
		// get functions
		$scope.getKeyword = function() {
			return $scope.q;
		}
		
		$scope.getDeliverable = function() {
			return $scope.deliverable
		}
		
		$scope.getProduct = function() {
			return $scope.product;
		}
		
		$scope.getVersion = function() {
			return $scope.version;
		}
		
		$scope.getLanguage = function() {
			return $translate.use();
		}
		
		$scope.getState = function() {
			return $scope.state;
		}
		
		$scope.getTranstypes = function() {
			return $scope.transtypes;
		}
		
		$scope.getTranstypesAsString = function() {
			return $scope.transtypes.toString();
		}
		
		$scope.getArea = function() {
			return $scope.area;
		}
	}
]);