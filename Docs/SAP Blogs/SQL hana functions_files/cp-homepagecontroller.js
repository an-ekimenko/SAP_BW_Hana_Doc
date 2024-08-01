var cpHomePageController = angular.module('cpHomePageController', []);

cpHomePageController.controller('cpHomePageController', ['$rootScope', '$scope', '$cookies', 
                                                         '$log', '$translate', 
                                                         '$location', '$window', '$interval', 'securityService',
                                                         'contentApiService', '$document',
                                                         function($rootScope, $scope, $cookies, 
                                                        		 $log, $translate, $location, $window, $interval, 
                                                        		 securityService,contentApiService,$document) {

	$scope.$parent.viewTitle = null;
	$scope.$parent.productLink = null;
	$scope.$parent.showSearchIcon = false;
	$scope.$parent.viewerOn.value = false;
	
	$scope.goToProductFinder = function() {
		$document.scrollTo(0,0);
		$location.path( '/product-finder' ).search({q: ''});
	}
	
	$scope.changeUrl = function(url) {
		$document.scrollTo(0,0);
		$window.location = url;
	}
	
	}
]);
