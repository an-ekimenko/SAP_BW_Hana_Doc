cpServices.factory("searchOptionsService", ['$resource',
                                       function($resource) {
	return $resource('/http.svc/search_options', {}, {
		updateSearchOptions: {
			method: 'POST',
			params: {
				deliverableIds: '@deliverableIds',
				searchOptionValues: '@searchOptionValues'
			}
		}
	});
}]);