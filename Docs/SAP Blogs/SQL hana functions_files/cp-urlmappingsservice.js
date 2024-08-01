cpServices.factory("urlMappingsService", ['$resource',
                                       function($resource) {
	return $resource('/http.svc/help_portal_url_mappings', {}, {
		downloadHelpPortalMappings: {
			url: '/http.svc/help_portal_url_mappings',
			method: 'GET',
			params: {}
		},
		downloadSMPMappings: {
			url: '/http.svc/smp_url_mappings',
			method: 'GET',
			params: {}
		},
		downloadCPMappings: {
			url: '/http.svc/cp_url_mappings',
			method: 'GET',
			params: {}
		}
	});
}]);