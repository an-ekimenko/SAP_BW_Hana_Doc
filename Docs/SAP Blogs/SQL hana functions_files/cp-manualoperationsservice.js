cpServices.factory("manualOperationsService", ['$resource',
                                       function($resource) {
	return $resource('/http.svc/manual_edit', {}, {
		getCategories: {
			method: 'GET',
			isArray: false
		},
		updateMetadata: {
			method: 'POST',
			params: {
				deliverableIds: '@deliverableIds',
				metadata: '@metadata'
			},
			isArray: false
		}
	});
}]);