'use strict';

/* Angular URL routing */

cpApp.config(function($stateProvider, $urlRouterProvider) {

	// redirect logic
	$urlRouterProvider
		.when('/PRODUCTION/:deliverableLoio/:version/:languageCode', '/:deliverableLoio/:version/:languageCode')
		.when('/PRODUCTION/:deliverableLoio/:version/:languageCode/:filePath', '/:deliverableLoio/:version/:languageCode/:filePath')
		.when('/PRODUCTION/:alias', '/:alias')
		.when('/PRODUCTION/:alias/:filePath', '/:alias/:filePath')
		.when('/product/PRODUCTION/:product/:version/:languageCode', '/product/:product/:version/:languageCode')
		.when('/product/PRODUCTION/:product/:version', '/product/:product/:version')
		.when('/', '/index')
		.otherwise('/index');

	// main state definitions
	$stateProvider
		.state('index', {
			url: '/index',
			templateUrl: '_build_938311c7a845691adeabc837/partials/cp-index.html',
			controller: 'SearchCtrl'
		})
		.state('deliverables', {
			url: '/deliverables',
			controller: 'DashboardCtrl',
			templateUrl: '_build_938311c7a845691adeabc837/partials/dashboard.html',
			access: {
				requiresLogin: true
			}
		})
		.state('comments', {
			url: '/deliverable_comments?title&versionName&status&topic&comment&commenter'
				+ '&created_on&state&display&version&locale&projectId&projectName&author',
			controller: 'CommentsCtrl',
			templateUrl: '_build_938311c7a845691adeabc837/partials/comments.html',
			access: {
				requiresLogin: true
			}
		})
		.state('feedback', {
			url: '/deliverable_feedback',
			controller: 'FeedbackCtrl',
			templateUrl: '_build_938311c7a845691adeabc837/partials/feedback.html',
			access: {
				requiresLogin: true
			}
		})
		.state('aliases', {
			url: '/deliverable_aliases',
			controller: 'AliasesCtrl',
			templateUrl: '_build_938311c7a845691adeabc837/partials/dashboard-aliases.html',
			access: {
				requiresLogin: true
			}
		})
		.state('uploadStatus', {
			url: '/uploadstatus',
			controller: 'UploadStatusJobsCtrl',
			templateUrl: '_build_938311c7a845691adeabc837/partials/dashboard-upload-status-jobs.html',
			access: {
				requiresLogin: true
			}
		})
		.state('search', {
			url: '/search',
			controller: 'ResultsCtrl',
			templateUrl: '_build_938311c7a845691adeabc837/partials/search.html',
			reloadOnSearch: false
		})
		.state('searchWithParams', {
			url: '/search/:lang/:q',
			controller: 'ResultsCtrl',
			templateUrl: '_build_938311c7a845691adeabc837/partials/search.html',
			reloadOnSearch: false
		})
		.state('searchHp', {
			url: '/searchhp/',
			templateUrl: '_build_938311c7a845691adeabc837/partials/search-hp.html',
			controller: 'SearchHPController',
			reloadOnSearch: false
		})
		.state('searchFrames', {
			url: '/search-frames',
			templateUrl: '_build_938311c7a845691adeabc837/partials/search-frames.html',
			controller: 'SearchApiCtrl',
			reloadOnSearch: false
		})
		.state('whatsNew', {
			url: '/whatsnew',
			templateUrl: '_build_938311c7a845691adeabc837/partials/whatsnew.html',
			controller: 'cpWhatsNewController'
		})
		.state('disclaimer', {
			url: '/disclaimer',
			templateUrl: '_build_938311c7a845691adeabc837/partials/disclaimer-footer-page.html',
			controller: 'cpDisclaimerFooterPage'
		})
		.state('disclaimer2', {
			url: '/disclaimer/',
			templateUrl: '_build_938311c7a845691adeabc837/partials/disclaimer-footer-page.html',
			controller: 'cpDisclaimerFooterPage'
		})
		.state('disclaimerForLinks', {
			url: '/disclaimer-for-links',
			templateUrl: '_build_938311c7a845691adeabc837/partials/disclaimer-page.html',
			controller: 'cpDisclaimerPageController'
		})
		.state('privacy', {
			url: '/privacy',
			templateUrl: '_build_938311c7a845691adeabc837/partials/privacy-page.html',
			controller: 'cpPrivacyPageController'
		})
		.state('copyright', {
			url: '/copyright',
			templateUrl: '_build_938311c7a845691adeabc837/partials/copyright-page.html',
			controller: 'cpCopyrightPage'
		})
		.state('contactUs', {
			url: '/contact-us',
			templateUrl: '_build_938311c7a845691adeabc837/partials/contact-us-page.html',
			controller: 'cpContactUsController'
		})
		.state('getSupport', {
			url: '/get-support',
			templateUrl: '_build_938311c7a845691adeabc837/partials/cp-get-support.html',
			controller: 'cpGetSupportController'
		})
		.state('pageNotFound', {
			url: '/page-not-found',
			templateUrl: '_build_938311c7a845691adeabc837/partials/page-not-found.html',
			controller: 'cpErrorController',
			reloadOnSearch: false,
			params: {frontendUrl: ''}
		})
		.state('pageCannotBeAccessed', {
			url: '/page-cannot-be-accessed',
			templateUrl: '_build_938311c7a845691adeabc837/partials/page-cannot-be-accessed.html',
			controller: 'cpNoWhitelistController'
		})
		.state('productFinder', {
			url: '/product-finder',
			templateUrl: '_build_938311c7a845691adeabc837/partials/product-finder.html',
			controller: 'cpProductFinderController'
		})
		.state('product', {
			url: '/p/{state:(?:DRAFT|TEST)}/:product',
			templateUrl: '_build_938311c7a845691adeabc837/partials/productpage.html',
			controller: 'ProductPageCtrl',
			resolve: { deliverableState : ['stateService', '$stateParams', function(stateService, $stateParams) {
					var state = $stateParams.state;
	
					if (state === "DRAFT") {
						return stateService.DRAFT();
					} else {
						return stateService.TEST();
					}
				}]
			}
		})
		.state('productSlash', {
			url: '/p/{state:(?:DRAFT|TEST)}/:product/',
			templateUrl: '_build_938311c7a845691adeabc837/partials/productpage.html',
			controller: 'ProductPageCtrl',
			resolve: { deliverableState : ['stateService', '$stateParams', function(stateService, $stateParams) {
					var state = $stateParams.state;
	
					if (state === "DRAFT") {
						return stateService.DRAFT();
					} else {
						return stateService.TEST();
					}
				}]
			}
		})
		.state('productProduction', {
			url: '/p/:product',
			templateUrl: '_build_938311c7a845691adeabc837/partials/productpage.html',
			controller: 'ProductPageCtrl',
			resolve: { deliverableState : ['stateService', function(stateService) {
					return stateService.PRODUCTION();
				}]
			}
		})
		.state('productProductionSlash', {
			url: '/p/:product/',
			templateUrl: '_build_938311c7a845691adeabc837/partials/productpage.html',
			controller: 'ProductPageCtrl',
			resolve: { deliverableState : ['stateService', function(stateService) {
					return stateService.PRODUCTION();
				}]
			}
		})
		.state('productAlias', {
			url: '/product/{state:(?:DRAFT|TEST)}/:alias',
			templateUrl: '_build_938311c7a845691adeabc837/partials/productpage.html',
			controller: 'ProductPageCtrl',
			resolve: { deliverableState : ['stateService', '$stateParams', function(stateService, $stateParams) {
					var state = $stateParams.state;
	
					if (state === "DRAFT") {
						return stateService.DRAFT();
					} else {
						return stateService.TEST();
					}
				}]
			}
		})
		.state('productProductionAlias', {
			url: '/product/:alias',
			templateUrl: '_build_938311c7a845691adeabc837/partials/productpage.html',
			controller: 'ProductPageCtrl',
			resolve: { deliverableState : ['stateService', function(stateService) {
					return stateService.PRODUCTION();
				}]
			}
		})
		.state('productWithLanguage', {
			url: '/product/{state:(?:DRAFT|TEST)}/:product/:version/:languageCode',
			templateUrl: '_build_938311c7a845691adeabc837/partials/productpage.html',
			controller: 'ProductPageCtrl',
			resolve: { deliverableState : ['stateService', '$stateParams', function(stateService, $stateParams) {
					var state = $stateParams.state;
	
					if (state === "DRAFT") {
						return stateService.DRAFT();
					} else {
						return stateService.TEST();
					}
				}]
			}
		})
		.state('productWithLanguageProduction', {
			url: '/product/:product/:version/:languageCode',
			templateUrl: '_build_938311c7a845691adeabc837/partials/productpage.html',
			controller: 'ProductPageCtrl',
			resolve: { deliverableState : ['stateService', function(stateService) {
					return stateService.PRODUCTION();
				}]
			}
		})
		.state('productWithParams', {
			url: '/product/{state:(?:DRAFT|TEST)}/:product/:version',
			templateUrl: '_build_938311c7a845691adeabc837/partials/productpage.html',
			controller: 'ProductPageCtrl',
			resolve: { deliverableState : ['stateService', '$stateParams', function(stateService, $stateParams) {
					var state = $stateParams.state;
	
					if (state === "DRAFT") {
						return stateService.DRAFT();
					} else {
						return stateService.TEST();
					}
				}]
			}
		})
		.state('productWithParamsProduction', {
			url: '/product/:product/:version',
			templateUrl: '_build_938311c7a845691adeabc837/partials/productpage.html',
			controller: 'ProductPageCtrl',
			resolve: { deliverableState : ['stateService', function(stateService) {
					return stateService.PRODUCTION();
				}]
			}
		})
		.state('viewerAlias', {
			url: '/{state:(?:DRAFT|TEST)}/:alias?show_comments&comment_id',
			controller: 'PageContentCtrl',
			templateUrl: '_build_938311c7a845691adeabc837/partials/reader-frames.html',
			resolve: { deliverableState : ['stateService', '$stateParams', function(stateService, $stateParams) {
					var state = $stateParams.state;
	
					if (state === "DRAFT") {
						return stateService.DRAFT();
					} else {
						return stateService.TEST();
					}
				}]
			}
		})
		.state('viewerAliasFilePath', {
			url: '/{state:(?:DRAFT|TEST)}/:alias/:filePath?show_comments&comment_id',
			controller: 'PageContentCtrl',
			templateUrl: '_build_938311c7a845691adeabc837/partials/reader-frames.html',
			resolve: { deliverableState : ['stateService', '$stateParams', function(stateService, $stateParams) {
					var state = $stateParams.state;

					if (state === "DRAFT") {
						return stateService.DRAFT();
					} else {
						return stateService.TEST();
					}
				}]
			}
		})
		.state('viewer', {
			url: '/{state:(?:DRAFT|TEST)}/:deliverableLoio/:version/:languageCode?show_comments&comment_id',
			controller: 'PageContentCtrl',
			templateUrl: '_build_938311c7a845691adeabc837/partials/reader-frames.html',
			resolve: { deliverableState : ['stateService', '$stateParams', function(stateService, $stateParams) {
					var state = $stateParams.state;
	
					if (state === "DRAFT") {
						return stateService.DRAFT();
					} else {
						return stateService.TEST();
					}
				}]
			}
		})
		.state('viewerFilePath', {
			url: '/{state:(?:DRAFT|TEST)}/:deliverableLoio/:version/:languageCode/:filePath?show_comments&comment_id',
			controller: 'PageContentCtrl',
			templateUrl: '_build_938311c7a845691adeabc837/partials/reader-frames.html',
			resolve: { deliverableState : ['stateService', '$stateParams', function(stateService, $stateParams) {
					var state = $stateParams.state;
	
					if (state === "DRAFT") {
						return stateService.DRAFT();
					} else {
						return stateService.TEST();
					}
				}]
			}
		}).state('viewerAliasProduction', {
			url: '/:alias?show_comments&comment_id',
			controller: 'PageContentCtrl',
			templateUrl: '_build_938311c7a845691adeabc837/partials/reader-frames.html',
			resolve: { deliverableState : ['stateService', function(stateService) {
					return stateService.PRODUCTION();
				}]
			}
		})
		.state('viewerAliasFilePathProduction', {
			url: '/:alias/:filePath?show_comments&comment_id',
			controller: 'PageContentCtrl',
			templateUrl: '_build_938311c7a845691adeabc837/partials/reader-frames.html',
			resolve: { deliverableState : ['stateService', function(stateService) {
					return stateService.PRODUCTION();
				}]
			}
		})
		.state('viewerProduction', {
			url: '/:deliverableLoio/:version/:languageCode?show_comments&comment_id',
			controller: 'PageContentCtrl',
			templateUrl: '_build_938311c7a845691adeabc837/partials/reader-frames.html',
			resolve: { deliverableState : ['stateService', function(stateService) {
					return stateService.PRODUCTION();
				}]
			}
		})
		.state('viewerProductionFilePath', {
			url: '/:deliverableLoio/:version/:languageCode/:filePath?show_comments&comment_id',
			controller: 'PageContentCtrl',
			templateUrl: '_build_938311c7a845691adeabc837/partials/reader-frames.html',
			resolve: { deliverableState : ['stateService', function(stateService) {
					return stateService.PRODUCTION();
				}]
			}
		});
});