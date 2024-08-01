var cpErrorController = angular.module('cpErrorController', []);

cpErrorController.controller('cpErrorController', ['$rootScope', '$scope', '$http', '$cookies',
                                                         '$log', '$translate', 
                                                         '$location', '$interval', 'securityService',
                                                         'contentApiService', '$stateParams',
                                                         function($rootScope, $scope, $http, $cookies, 
                                                        		 $log, $translate, $location, $interval, 
                                                        		 securityService, contentApiService, $stateParams) {
	

	$scope.$parent.viewTitle = null;
	$scope.$parent.productLink = null;
	$scope.$parent.showSearchIcon = false;
	$scope.$parent.viewerOn.value = false;
	
	// starts the search requests
	$scope.searchContent = function(keywords) {
		$location.url('/search?q=' + keywords );
		
	};
	

    $scope.isLoggedOn = function() {
    	var sapuacpuserid = $cookies.get('sapuacpuserid');
    	return sapuacpuserid;
	};
	
	$scope.getReferrerUrl = function() {
		var urlParam = $location.search().url; 
		var frontendUrl = $stateParams.frontendUrl;
		if (urlParam !== undefined && urlParam.length > 0) {
			return urlParam;
		} else if (frontendUrl.length > 0) {
			$location.search('url', frontendUrl);
			return frontendUrl;
		} else {
			return '';
		}
	}
	
	var url = $scope.getReferrerUrl();

	if(url) {
		$http.get("/http.svc/get404moreinfo?url="+url).success(function(data) {
			
			if(data.data && data.data.available_versions.length) {
				$scope.availableVersions = data.data.available_versions;
			}
		})
	}

    try{ 
    	var trackingData = {};
    	trackingData.pageUrl = location.href;
		trackingData.pageName ="Help Portal Page Not Found";
		trackingData.pageType = "errorPage";
		trackingData.prop27 = $scope.getReferrerUrl();
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
