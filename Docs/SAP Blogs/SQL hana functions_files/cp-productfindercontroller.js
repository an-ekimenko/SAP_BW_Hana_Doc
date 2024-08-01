var cpProductFinderController = angular.module('cpProductFinderController', []);

cpProductFinderController.controller('cpProductFinderController', ['$scope', '$cookies', 'userSharedService', '$log', '$translate', '$location', '$filter',
                                                               function($scope, $cookies, sharedService, $log, $translate, $location, $filter) {

	
	//logged on/language functions for tracking data
	$scope.isLoggedOn = function() {
    	var sapuacpuserid = $cookies.get('sapuacpuserid');
    	return sapuacpuserid;
	};
	
	$scope.getLanguage = function() {
	    return $translate.use();
    };
    
    if ($location.search().q) {
		$scope.filterTerms = $location.search().q;
    } else {
    	$scope.filterTerms = '';
    }
    
	$location.search('q', $scope.filterTerms);
	
	//search selector
	
	$scope.selectSearchType = function(){
		var language = $scope.getLanguage();
		var query = $("#searchKeywords").val();
		

			
			if ($scope.isLoggedOn()) {
				if(query) {
					return '/viewer/search?q=' + query +'&state=DRAFT,TEST,PRODUCTION'+'&language=' + language;					
				} else {
					return '/viewer/search?state=DRAFT,TEST,PRODUCTION'+'&language=' + language;										
				}
			} else {
				if(query) {
					return '/viewer/search?q=' + query +'&language=' + language;					
				} else {
					return '/viewer/search?language=' + language;										
				}
			}
			

	}
	
	$scope.products = []
	$scope.loading = true;
	$scope.allPopulatedCategoriesExpanded = false;
	
	var api = new HierarchyApi();
	
	$scope.initialize = function() {
		api.loadHierarchyData($.proxy(this.onLoadDataLoadSuccessfull,this),$.proxy(this.onLoadDataFailed,this));
	}
	
	$scope.onLoadDataLoadSuccessfull = function(result) {
		if ($scope.filterTerms.length) {
			$scope.hierarchy = api.getFilteredHierarchy($scope.filterTerms);
			$scope.loading = false;
			autoExpandCategories();
		} else {
			$scope.hierarchy = api.getHierarchy();
			$scope.loading = false;
			$scope.allPopulatedCategoriesExpanded = false;
		}
	}
	
	$scope.onLoadDataFailed = function(result) {
		$scope.loading = false;
	}
	
	$scope.reloadHierarchy = function(terms) {
		$scope.loading = true;
		if (terms) {
			$scope.hierarchy = api.getFilteredHierarchy(terms);
			autoExpandCategories();
		} else {
			$scope.hierarchy = api.getHierarchy();
		}
		$location.search('q', terms);
		$scope.loading = false;
		$scope.checkIfPopulatedCategoriesExpanded();
	}
	
	//query if all populated categories are expanded
	$scope.checkIfPopulatedCategoriesExpanded = function() {
		for (i = 0; i < $scope.hierarchy.categories.length; i++) {
			if ($scope.hierarchy.categories[i].lines.length) {
				if (!$scope.hierarchy.categories[i].expanded) {
					//if a single populated category is expanded, set to false and return
					$scope.allPopulatedCategoriesExpanded = false;
					return;
				}
			}
		}
		//otherwise set to true
		$scope.allPopulatedCategoriesExpanded = true;
		return;
	}
	
	$scope.testFunction= function(value) {
		value.expanded = !value.expanded;
		$scope.checkIfPopulatedCategoriesExpanded();
	}
	
	//expand all categories
	$scope.expandAllCategories = function() {
		for (i = 0; i < $scope.hierarchy.categories.length; i++) {
			$scope.hierarchy.categories[i].expanded = true;
		}
		$scope.allPopulatedCategoriesExpanded = true;
	}
	
	//collapse all categories
	$scope.collapseAllCategories = function() {
		for (i = 0; i < $scope.hierarchy.categories.length; i++) {
			$scope.hierarchy.categories[i].expanded = false;
		}
		$scope.allPopulatedCategoriesExpanded = false;
	}
	
	//expand populated categories
	var autoExpandCategories = function() {
		for (i = 0; i < $scope.hierarchy.categories.length; i++) {
			if ($scope.hierarchy.categories[i].lines.length) {
				$scope.hierarchy.categories[i].expanded = true;
			} else {
				$scope.hierarchy.categories[i].expanded = false;
			}
		}
		$scope.checkIfPopulatedCategoriesExpanded();
	}
	
	//check that all categories are empty
	$scope.allCatsEmpty = function(cats) {
		if (!cats) {return false};
		for (i = 0; i < cats.length; i++) {
			if (cats[i].lines && cats[i].lines.length) {
				return false;
			}
		}
		return true;
	}
	
	$scope.initialize();

	try{ 
    	var trackingData = {};
    	trackingData.pageUrl = location.href;
    	trackingData.pageName ="Help Portal Product Finder";
    	trackingData.prop2 = $scope.getLanguage();
    	var loginStatus = "logN";
    	if ($scope.isLoggedOn() ) {
    		loginStatus = "logY";
    	}
    	trackingData.prop9 = loginStatus;
    	sap_s.trackData(trackingData); 
    } catch(e) {console.log(e);}
}]);