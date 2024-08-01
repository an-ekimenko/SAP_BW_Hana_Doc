cpServices.factory('projectService', ['$resource',
    function($resource) {
        return $resource('/http.svc/:handler', {}, {
        	getAllProjectNames: {
            	url: '/http.svc/project_names',
                method: 'GET',
                isArray: false
            },
            getProjectNames: {
            	handler: 'manual_upload',
            	url: '/http.svc/manual_upload',
                method: 'GET',
                params: {
                	isProject: true
                },
                isArray: false
            },
            editProject: {
            	url: '/http.svc/project',
            	method: "POST",
            	params: {
            		name: '@name',
            		phio: '@phio',
            		dependencies: "@dependencies"            		
            	}
            },
            getProjectById: {
            	url: '/http.svc/project',
            	method: "GET",
            	params: {
            		id: '@id',            		
            	}
            }
        });
}]);