cpServices.factory("commentService", ['$resource',
                                       function($resource) {
	return $resource('/http.svc/comments', {}, {
		toggleResolve: {
			method: 'PUT',
			params: {
				id: '@id',
				status: '@status'
			},
			isArray: false
		},
		toggleHide: {
			method: 'PUT',
			params: {
				id: '@id',
				display: '@display'
			},
			isArray: false
		},
		deleteComment: {
			method: 'DELETE',
			params: {
				id: '@id'
			},
			isArray: false
		},
		queryExcel: {
			method: 'GET',
			params: {
				title: '@title',
				versionName: '@versionName',
				status: '@status',
				topic: '@topic',
				comment: '@comment',
				commenter: '@commenter',
				state: '@state',
				display: '@display',
				version: '@version',
				locale: '@locale',
				projectId: '@projectId',
				projectName: '@projectName',
				$page_size: '@page_size',
				$order_by: '@$order_by'
			},
			isArray: false
		}
	});
}]);