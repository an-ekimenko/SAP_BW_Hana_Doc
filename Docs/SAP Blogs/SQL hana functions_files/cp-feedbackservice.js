cpServices.factory("feedbackService", ['$resource',
                                       function($resource) {
	return $resource('/http.svc/feedback', {}, {
		deleteFeedback: {
			method: 'DELETE',
			params: {
				id: '@id'
			}
		},
		queryExcel: {
			method: 'GET',
			params: {
				$page_size: '@$page_size',
				product: '@product',
				title: '@title',
				topic: '@topic',
				version: '@version',
				helpful: '@helpful',
				inaccurate: '@inaccurate',
				confusing: '@confusing',
				problem: '@problem',
				feature: '@feature',
				text: '@text',
				file_loio: '@file_loio',
				locale: '@locale',
				lastmodifieddate: '@lastmodifieddate',
				created_on: '@created_on'
			},
			isArray: false
		}
	});
}]);