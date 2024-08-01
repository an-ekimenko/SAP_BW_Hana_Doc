cpServices.factory('versionService', ['$resource',
    function($resource) {
        return $resource('/http.svc/:handler', {}, {
            getVersionNames: {
            	handler: 'manual_upload',
            	url: '/http.svc/manual_upload',
                method: 'GET',
                params: {
                	isVersion: true,
                    product: '@product'
                },
                isArray: false
            },    
            editVersion: {
            	url: '/http.svc/edit_version',
                method: 'POST',
                params: {
                	product: '@product',
                	version: '@version',
                	version_name: '@versionName',
                	version_sapid: '@version_sapid',
                    deliverable_id: '@deliverable_id'
                },
                isArray: false
            },
            createVersion: {
            	url: '/http.svc/create_version',
                method: 'POST',
                params: {
                	product: '@product',
                	version: '@version',
                	version_name: '@versionName',
                	version_sapid: '@version_sapid',
                    deliverable_id: '@deliverable_id'
                },            
                isArray: false
            }                        
    });

}]);