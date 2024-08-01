cpServices.factory("moveToSlaveService", ['$resource',
                                       function($resource) {
	return $resource('/http.svc/move_to_slave', {}, {
		updateIndexerId: {
			method: 'POST',
			params: {
				deliverableIds: '@deliverableIds',
				indexerId: '@indexerId'
			},
			isArray: false
		}
	});
}]);