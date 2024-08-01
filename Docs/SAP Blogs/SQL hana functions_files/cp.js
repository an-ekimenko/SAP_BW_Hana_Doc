var cpApp = angular.module('cp', [
                                  'ngSanitize',
                                  'pascalprecht.translate',
                                  'ngRoute',
                                  'ui.bootstrap',
                                  'ui.router',
                                  'angular-loading-bar',
                                  'ngAnimate',
                                  'ngResource',
                                  'treeControl',
                                  'ngCookies',
                                  'monospaced.elastic',
                                  'ngTextTruncate',
                                  'duScroll',
                                  'ui-notification',
                                  'uuid',
                                  'cpSearchController',
                                  'cpSearchHPController',
                                  'cpResultsController',
                                  'cpWhatsNewController',
                                  'cpProductPageController',
                                  'cpSearchService',
                                  'advancedSearchService',
                                  'parametersService',
                                  'filtersService',
                                  'resultsService',
                                  'filters',
                                  'cpContentApiService',
                                  'cpLoginService',
                                  'cpControllers',
                                  'cpServices',
                                  'cpDashboardsSharedModule',
                                  'cpDirectives',
                                  'cpUserMgmtDirectives',
                                  'cpUserMgmtControllers',
                                  'cpUserMgmtServices',
                                  'cpHeaderCtrl',
                                  'cpPageContentCtrl',
                                  'cpRwCtrl',
                                  'cpPageCommentCtrl',
                                  'cpProductPageService',
                                  'cpDashboardCtrl',
                                  'cpSharedService',
                                  'cpJobService',
                                  'cpAliasService',
                                  'cpSearchApi',
                                  'cpDisclaimerPageController',
                                  'cpPrivacyPageController',
                                  'cpProductFinderController',
                                  'cpHomePageController',
                                  'cpContactUsController',
                                  'cpGetSupportController',
                                  'cpErrorController',
                                  'cpNoWhitelistController',
                                  'cpWhatsNewModule'
                                  ]);

/* Used to display deliverable.body directly in HTML */
cpApp.filter('unsafe', ['$sce', function($sce) { return $sce.trustAsHtml; }]);

cpApp.config(['$routeProvider', '$locationProvider',
              function($routeProvider, $locationProvider) {
	// use the HTML5 History API
	$locationProvider.html5Mode(true);
}
]);

/* angular-loading-bar for XHR requests */
cpApp.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
	cfpLoadingBarProvider.includeSpinner = false;
}]);

/* Notification configuration */
cpApp.config(['NotificationProvider', function(NotificationProvider) {
	NotificationProvider.setOptions({
		delay: 10000,
		startTop: 20,
		startRight: 10,
		verticalSpacing: 20,
		horizontalSpacing: 20,
		positionX: 'right',
		positionY: 'bottom'
	});
}]);

/* Scroll to hash (chunking) */
cpApp.run(['$rootScope', '$location', '$anchorScroll',
           function($rootScope, $location, $anchorScroll) {
	//when the route is changed scroll to the proper element.
	$rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
		if($location.hash()) $anchorScroll();
	});
}]);

/* Requires Login Security */
cpApp.run(['$rootScope', '$location', '$cookies', '$log',
           function($rootScope, $location, $cookies, $log) {
	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
		if (toState.access !== undefined && toState.access.requiresLogin) {
			var sapuacpuserisadmin = $cookies.get("sapuacpuserisadmin");
			var sapuacpuserisemployee = $cookies.get("sapuacpuserisemployee");
			if (!(sapuacpuserisadmin || sapuacpuserisemployee)) {
				
				if(toState.url === "/deliverables") {
					$location.search({});
		        }
				
				$location.path('/index').replace();
			}
		}
	});
}]);

/* Required for Whitelist url*/
cpApp.run(['$rootScope', '$location', 'disclaimerService',
           function($rootScope, $location, disclaimerService) {
	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

		var links = disclaimerService.white_list_urls;
		//Checking if the passed link is a whitelist url
		var isWhiteListUrl = disclaimerService.is_white_list;
		var isSAPSubdomain = disclaimerService.is_sap_subdomain;
		if(toState.url == "/disclaimer-for-links"){
			var redirectLink = $location.search().q;
			redirectLink = redirectLink.replace(/(^\w+:|^)\/\//, '');
			redirectLink = redirectLink.replace(/^www\./,'');
//			var isWhiteUrl = isWhiteListUrl(redirectLink);
//			var isSubdomain = isSAPSubdomain(redirectLink);
//			if( !isWhiteUrl ){
//				if(!isSubdomain){
//					$location.path('/index').replace();
//				}
//			}
		}
	});
}]);
