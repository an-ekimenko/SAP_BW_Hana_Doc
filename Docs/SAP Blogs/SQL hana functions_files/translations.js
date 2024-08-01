'use strict';

/* Angular Translation 'pascalprecht.translate' */

cpApp
  .config(['$translateProvider',  
           function ($translateProvider) {

	$translateProvider.useSanitizeValueStrategy('escape');	
	$translateProvider.useUrlLoader('/http.svc/translation');
	$translateProvider.preferredLanguage('en-US');

}]);