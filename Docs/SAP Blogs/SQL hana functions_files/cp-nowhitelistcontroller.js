var cpNoWhitelistController = angular.module('cpNoWhitelistController', []);

cpNoWhitelistController.controller('cpNoWhitelistController', ['$rootScope', '$scope', '$http', '$cookies',
                                                         '$log', '$translate', 
                                                         '$location', '$interval', 'securityService',
                                                         'contentApiService',
                                                         function($rootScope, $scope, $http, $cookies, 
                                                        		 $log, $translate, $location, $interval, 
                                                        		 securityService, contentApiService) {
	try{ sap_s.trackData(); } catch(e) {console.log(e);}

	$scope.$parent.viewTitle = null;
	$scope.$parent.productLink = null;
	$scope.$parent.showSearchIcon = false;
	$scope.$parent.viewerOn.value = false;
	
	// starts the search requests
	$scope.searchContent = function(keywords) {

		$location.url('/search?q=' + keywords );
		
	};

	}
]);
