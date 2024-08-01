var cpGetSupportController = angular.module('cpGetSupportController', []);

cpGetSupportController.controller('cpGetSupportController', ['$rootScope', '$scope', '$http', '$cookies',
	'$log', '$translate',
	'$location', '$interval', 'securityService',
	'contentApiService', '$document',
	function ($rootScope, $scope, $http, $cookies,
		$log, $translate, $location, $interval,
		securityService, contentApiService, $document) {

		$scope.$parent.viewTitle = null;
		$scope.$parent.productLink = null;
		$scope.$parent.showSearchIcon = true;
		$scope.$parent.viewerOn.value = false;

		$scope.isLoggedOn = function () {
			var sapuacpuserid = $cookies.get('sapuacpuserid');
			return sapuacpuserid;
		};
		
		$scope.goToContactUs = function() {
			$document.scrollTo(0,0);
			$location.path( '/contact-us' );
		}

		try {
			var trackingData = {};
			trackingData.pageUrl = location.href;
			trackingData.pageName = "Contact Support";
			trackingData.channel = "viewer";
			trackingData.prop2 = "en-US";
			var loginStatus = "logN";
			if ($scope.isLoggedOn()) {
				loginStatus = "logY";
			}
			trackingData.prop9 = loginStatus;
			sap_s.trackData(trackingData);
		} catch (e) { console.log(e); }
		
	}

]);
