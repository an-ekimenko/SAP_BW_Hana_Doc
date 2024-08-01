'use strict';
/* Controllers */
var cpHeaderCtrl = angular.module('cpHeaderCtrl', []);

cpHeaderCtrl.constant('PATHS', {
	'BASE_URL': '/viewer',
	'RESOURCE_URL': '/doc',
	'RESOURCE_URL_WITH_ALIAS': '/',
	'LOGIN_URL': '/http.svc/login?time='+Date.now()+'&url=',
	'LOGOUT_URL': '/http.svc/logout?time='+Date.now()+'&url=',
	'DOWNLOAD_URL': '/http.svc/download?deliverable_id=',
});

cpHeaderCtrl.controller('headerCtrl', ['$window', '$translate', '$scope', 'localResult', 'usersManagement', '$cookies', '$timeout', '$log', '$location', '$interval', 'Notification', 'PATHS', 'languageService', 'userSharedService', 'contentApiService', '$uibModal', '$rootScope', 'cpWhatsNewService', 'disclaimerService',
                                    function($window, $translate, $scope, localResult, usersManagement, $cookies, $timeout, $log, $location, $interval, Notification, PATHS, languageService, sharedService, contentApiService, $uibModal, $rootScope, cpWhatsNewService, disclaimerService) {


     var cookieChecker;
	// Initialize Title
    $scope.homeLink = PATHS.BASE_URL + '/index';
	$scope.viewTitle = null;
	$scope.productLink = null;
	$scope.showSearchIcon = true;
	
	//enable feature flags globally
	$scope.showByFeatureFlag = function(flag) {
		if (!sharedService.isRestricted(flag)) {
			return true;
		} else {
			return false;
		}
	}
	
	//turns on dark design for home page only
	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
		if(
				toState.url == "/index" ||
				toState.url == "/get-support"
				
		){
			$scope.dark = true;
		} else {
			$scope.dark = false;
		}
	});

	$scope.checkNoNewsCookie = function() {
		if(usersManagement.isUserEmployee()) {
			$scope.wncookie = $cookies.get('uacpnonewsEmployee') == $scope.deliverableDate;
		}
		else {
			$scope.wncookie = $cookies.get('uacpnonewsOtherUser') == $scope.deliverableDate;
		}
	};
	
//  Uncomment to re-enable survey pop up	
	
//	$scope.surveyRequest = false;
//	
//	var surveyStatus = $cookies.get('uacpsurvey');
//	//console.log(surveyStatus);
//	
//	if (surveyStatus !== 'rejected' && surveyStatus !== 'accepted') {
//		var randomnumber = Math.floor(Math.random() * 5) + 1;
//		//console.log(randomnumber);
//		if (randomnumber == 1 || randomnumber == 2) {
//			$timeout(function() { $scope.surveyRequest = true;}, 750);
//		}
//	}
//	
//	$scope.acceptSurvey = function() {
//		var expireDate = new Date();
//		expireDate = new Date(expireDate.getTime() +1000*60*60*24*50);
//		$window.open('https://helpportalsurvey.hana.ondemand.com/#/', '_blank');
//		document.cookie = "uacpsurvey=accepted;expires=" + expireDate + ";";
//		$scope.surveyRequest = false;
//	}
//	
//	$scope.rejectSurvey = function() {
//		var expireDate = new Date();
//		expireDate = new Date(expireDate.getTime() +1000*60*60*24*50);
//		document.cookie = "uacpsurvey=rejected;expires=" + expireDate + ";";
//		$scope.surveyRequest = false;
//	}
//	

	$scope.openDialog = function() {
		 $scope.wncookie=true;
		 cpWhatsNewService.writeNoNewsCookie($scope);
		 contentApiService.getContent($scope.parameters,$scope.onContentRetrieved);
		 $scope.pageType = 'whatsNewPopup';
		 $scope.dialog = $uibModal.open({
            templateUrl: '_build_938311c7a845691adeabc837/partials/whatsnewpopup.html',
            controller: 'ModalInstanceCtrl',
            windowClass: 'app-modal-window',
            scope: $scope
		});
	};
	
	
	$scope.disclaimerhide = false;
	$scope.disclaimerData = {};
	$scope.noDisclaimer = false;
	
	$scope.notshowAgain = function(){
				
		if ($scope.disclaimerData.disclaimerbox){	
			
			$scope.disclaimerhide = true;
			
		}else{
			
			$scope.disclaimerhide= false;
								
		}
		
	}
	
	$scope.openDisclaimer = function(disclaimerURL) {
			
		if($scope.disclaimerhide){	
			$cookies.put("disclaimerOff", "true");		
		}else {
			
			$cookies.remove("disclaimerOff");
		}
		
		if($cookies.get("disclaimerOff")){
			
			$scope.disclaimerURL = disclaimerURL;
			disclaimerService.skipDisclaimer(disclaimerURL);
			
		
		}else{
		 
		 $scope.disclaimerURL = disclaimerURL;
		 $scope.dialog = $uibModal.open({
           templateUrl: '_build_938311c7a845691adeabc837/partials/disclaimerpopup.html',
           controller: 'ModalInstanceCtrl',
           windowClass: 'app-modal-window',
           scope: $scope
           
		});
	  }
    
	};
	
	
	
	$scope.setCookieChecker = function() {
        // If we are checking already, we don't need to do it again...
        if (angular.isDefined(cookieChecker)) return;
		
		cookieChecker = $interval(function() { // monitor cookies as per Shengyu’s specs
			var sapuacpuserfirstname = usersManagement.userFirstName();
			var sapuacpuserid = usersManagement.userId();
			if (sapuacpuserfirstname) {
				if (!$scope.user.id) {
					$scope.user.id = sapuacpuserid;
					sharedService.errorHandler({
						data: {
							message: "MESSAGE_LOGGED_IN_FROM_ANOTHER_TAB"
						}
					});
				} else if (sapuacpuserid != $scope.user.id) {
					$scope.user.id = sapuacpuserid;
					sharedService.errorHandler({
						data: {
							message: "MESSAGE_LOGGED_IN_WITH_DIFFERENT_USER"
						}
					});
				}
			} else {
				if ($scope.user.id != null) {
					$scope.user.id = sapuacpuserid;//make sure user logs out
					$scope.logged_on = false;
					$scope.is_admin = false;
					$scope.is_employee = false;
					sharedService.errorHandler({
						data: {
							message: "MESSAGE_CONNECTION_LOST"
						}
					});
				}
			}
		}, 1000);
	};
    
	$scope.user = new Object(); 		// new Object();
	$scope.logged_on = null;
	$scope.is_admin = null;
	$scope.is_employee = null;

	var sapuacpuserfirstname = usersManagement.userFirstName();
	var sapuacpuserlastname = usersManagement.userLastName();
	var sapuacpuserid = usersManagement.userId();
	var sapuacpisuseradmin = usersManagement.isUserAdmin();
	var sapuacpisuseremployee = usersManagement.isUserEmployee();

	// Check cookie to see if user is logged in
	if (sapuacpuserid) {
		$scope.user.id = sapuacpuserid;
		$scope.user.name = sapuacpuserfirstname.replace(/["]+/g, '') + ' ' + sapuacpuserlastname.replace(/["]+/g, '');
		$scope.logged_on = true;
		
		if (sapuacpisuseradmin == 1) {
			$scope.is_admin = true;
		}else{
			$scope.is_admin = false;
		}

		if (sapuacpisuseremployee == 1) {
			$scope.is_employee = true;
		}else{
			$scope.is_employee = false;
		}
	}
	
	// initialize copyright/disclaimer
	
	$scope.copyrightPage = false;
	$scope.disclaimerPage = false;
	
	$scope.copyrightUrl = function() {
		return "";
	}
	
	$scope.disclaimerUrl = function() {
		return "";
	}
	
	$scope.checkCopyrightPage = function() {
		if ($scope.viewerOn.value == true && $scope.copyrightPage == true) {
			return true;
		} else {
			return false;
		}
	}
	
	$scope.checkDisclaimerPage = function() {
		if ($scope.viewerOn.value == true && $scope.disclaimerPage == true) {
			return true;
		} else {
			return false;
		}
	}
	

	// declare logout function
	$scope.logout = function() {
		usersManagement.logout($scope);
	};


	$scope.login = function() {
		$cookies.put("sapuacplogout", "false");
	};

	// produce login and logout urls
	$rootScope.$on('$viewContentLoaded', function() {
		$scope.loginurl = PATHS.LOGIN_URL + $location.absUrl().replace('#', '%23');
		$scope.logouturl = PATHS.LOGOUT_URL + PATHS.BASE_URL.replace('#', '%23');
	});


	$scope.onContentRetrieved = function(data) {
		$scope.deliverableDate = data.date;
		$scope.checkNoNewsCookie();
	};

	$scope.applicationVersion = '';
	$scope.setCookieChecker();
	cpWhatsNewService.whatsNewInit($scope);
	contentApiService.getContent($scope.parameters,$scope.onContentRetrieved);


	// Connect UI language change

	$scope.langFlag = 'us'; //default

	var languageCode;
	languageCode = $cookies.get('sapuacplanguage');  	// get language cookie
	if (languageCode) {									// check if language cookie exists
		$translate.use(languageCode.substring(0,2));
		$scope.langFlag = languageCode.substring(3).toLowerCase();
	}


	$scope.changeLang = function(language) {
		$cookies.put('sapuacplanguage', language.code);  // set language cookie
		$translate.use(language.code);
		//$scope.langFlag = language.code.substring(3).toLowerCase();
	};
	
	$scope.getPreferredLanguage = function() {
		return $translate.use();
	};
	
	$scope.getTwoDigitPrefLang = function() {
		var fullLang = $translate.use();
		
		if (fullLang !== undefined) {
			var twoDigitLang = fullLang.substring(0,2);
			return twoDigitLang;
		} else {
			return 'en';
		}
	};

	$scope.getLanguage = function() {
		return $translate.use();
	};
	
	$scope.sapCountry = function() {
		var currentLocal = $translate.use();
		var currentCountry = '';
		
		if (currentLocal == 'ar-SA') {
			currentCountry = 'mena/';
		}	
		if (currentLocal == 'bg-BG') {
			currentCountry = 'bulgaria/';
		}
		if (currentLocal == 'ca-ES') {
			currentCountry = 'spain/';
		}
		if (currentLocal == 'zh-CN') {
			currentCountry = 'china/';
		}
		if (currentLocal == 'zh-TW') {
			currentCountry = 'taiwan/';
		}
		if (currentLocal == 'hr-HR') {
			currentCountry = 'croatia/';
		}
		if (currentLocal == 'cs-CZ') {
			currentCountry = 'cz/';
		}
		if (currentLocal == 'da-DK') {
			currentCountry = 'denmark/';
		}
		if (currentLocal == 'nl-NL') {
			currentCountry = 'netherlands/';
		}
		if (currentLocal == 'et-EE') {
			currentCountry = 'estonia/';
		}
		if (currentLocal == 'fi-FI') {
			currentCountry = 'finland/';
		}
		if (currentLocal == 'fr-FR') {
			currentCountry = 'france/';
		}
		if (currentLocal == 'de-DE') {
			currentCountry = 'germany/';
		}
		if (currentLocal == 'el-GR') {
			currentCountry = 'greece/';
		}
		if (currentLocal == 'he-IL') {
			currentCountry = 'israel/';
		}
		if (currentLocal == 'hi-IN') {
			currentCountry = 'india/';
		}
		if (currentLocal == 'hu-HU') {
			currentCountry = 'hungary/';
		}
		if (currentLocal == 'it-IT') {
			currentCountry = 'italy/';
		}
		if (currentLocal == 'id-ID') {
			currentCountry = 'sea/';
		}
		if (currentLocal == 'ja-JP') {
			currentCountry = 'japan/';
		}
		if (currentLocal == 'kk-KZ') {
			currentCountry = 'cis/';
		}
		if (currentLocal == 'ko-KR') {
			currentCountry = 'korea/';
		}
		if (currentLocal == 'lt-LT') {
			currentCountry = 'lithuania/';
		}
		if (currentLocal == 'lv-LV') {
			currentCountry = 'latvia/';
		}
		if (currentLocal == 'ms-MY') {
			currentCountry = 'sea/';
		}
		if (currentLocal == 'nb-NO') {
			currentCountry = 'norway/';
		}
		if (currentLocal == 'pl-PL') {
			currentCountry = 'poland/';
		}
		if (currentLocal == 'pt-BR') {
			currentCountry = 'brazil/';
		}
		if (currentLocal == 'ro-RO') {
			currentCountry = 'romania/';
		}
		if (currentLocal == 'ru-RU') {
			currentCountry = 'cis/';
		}
		if (currentLocal == 'sr-RS') {
			currentCountry = 'westbalkans/';
		}
		if (currentLocal == 'sk-SK') {
			currentCountry = 'sk/';
		}
		if (currentLocal == 'sl-SI') {
			currentCountry = 'slovenia/';
		}
		if (currentLocal == 'es-ES') {
			currentCountry = 'latinamerica/';
		}
		if (currentLocal == 'sv-SE') {
			currentCountry = 'sweden/';
		}
		if (currentLocal == 'th-TH') {
			currentCountry = 'sea/';
		}
		if (currentLocal == 'tr-TR') {
			currentCountry = 'turkey/';
		}
		if (currentLocal == 'uk-UA') {
			currentCountry = 'cis/';
        }
        if (currentLocal == 'vi-VN') {
			currentCountry = 'sea/';
		}
		if (currentLocal == 'cy-GB') {
			currentCountry = 'uk/';
		}
		
		return currentCountry;
	}	
	
	$scope.queryDirection = function(value) {
		if (value == 'ar' || 
			value == 'he') {
				return 'rtl';
			} else {
				return 'ltr';
			}
	};
	
	$scope.getDirection = function() {
		var currentLanguage = $scope.getTwoDigitPrefLang();
		var currentDir = $scope.queryDirection(currentLanguage);
		return currentDir;
	};

	$scope.languages = languageService.getLanguages();
	
	$scope.secondaryLanguages = languageService.getSecondaryLanguages();
	
	$scope.getNativeLanguageName = function(langCode) {
		
		var langObj = $scope.secondaryLanguages.filter(function(v) {
		    return v.code === langCode;
		});
		
		if (langObj[0] !== undefined) {
			var langName = langObj[0].native;

			return langName;
		} else {
			return langCode;
		}
	}

	/*$scope.checkHomeOn = function() {
		var path = $location.path();
		var homePath = "/";
		
		if (path == homePath) {
			return true;
		}
	}*/
	
	$scope.ftInfo = function() {
		var productTitle = ' - ' + $scope.viewTitle;
		return 'SAP Help Portal' + productTitle;
	}

	$scope.ftAbsUrl = encodeURI($location.absUrl());

	$scope.viewerOn = {
			value: false //Determine whether the viewer is open
	};

	//Set tocHidden Value
	if (window.innerWidth > 1024){
		$scope.tocHidden = {
				value: false
		};
	}
	if (window.innerWidth <= 1024){
		$scope.tocHidden = {
				value: true
		};
	}

	$scope.hideToc = function() {
        if (window.innerWidth <= 1024) {
            $scope.tocHidden.value = true;
        } else {}
    }
	
	$scope.hideRw = function() {
        if (window.innerWidth <= 1024) {
            $scope.rwShown.value = false;
        } else {}
    }

	//Set rwShown Value

	$scope.rwShown = {
	        value: false
	};

	$scope.blackBlocker = function() {
        if ($scope.tocHidden.value == false) {

            $scope.tocHidden.value = true;

        } else {

            $scope.rwShown.value = false;

        }
    }
	
// This code opens and closes the toc as you change browser width
// This part of the code must be in header controller, in case the user changes screen widths outside the viewer
	
	var mobileThreshold = 1024;
    var mobileInitialDiff = (window.innerWidth > mobileThreshold) ? 1:-1;

    $(window).on('resize',function(){

        var mobileCurrentDiff = window.innerWidth - mobileThreshold;
        if(mobileCurrentDiff*mobileInitialDiff <= 0) {
            mobileInitialDiff *= -1;

            if (window.innerWidth > mobileThreshold) {
                $scope.tocHidden.value = false;
                $scope.rwShown.value = false;
            } else {
                $scope.tocHidden.value = true;
                $scope.rwShown.value = false;
            }
        }
    });

	/* Search Bar in Header */

	$scope.searchMenuShown = {
            value: false
    };

	$scope.searchScopeMenu = {
            value: "this document"
    };
	
	$scope.searchScopeChange = function() {
		$('input[focus-me="headerInputFocus"]').focus();
	};
	
	$scope.goSearch = function(keywords) {
		
		if ($scope.viewerOn.value === true) {
			
			var searchData = {
					"keywords": keywords,
					"area": $scope.searchScopeMenu.value
			}
		
	    	localResult.notify(searchData);
		}
		
    };

    
    $scope.headerSearch = {};
	
	/* Translate transtypes into user readable info */
	
	$scope.translateTranstype = function(transtype) {
		if (transtype.indexOf("pdf") !== -1) {
			return 'PDF';
		} else {
			return transtype;
		}
	}

}]);
