'use strict';

/* Services */
var cpServices = angular.module('cpServices', ['ngResource']);

/* The service to fetch page content and other information necessary for display
 * GET parameters:
 *  deliverableInfo: 0 - no deliverable info; 1 - deliverable info included
 *  toc: 0 - no partial TOC; 1 - partial TOC included
 * Note: the service always return comments if the user has review right 
 */
cpServices.factory('page', ['$resource', 'userSharedService', function($resource, sharedService) {
	    
	    var url;
	    if(!sharedService.isRestricted("ElasticSearchViewerHandler")) {
	    	url = '/http.svc/getelasticsearchpagecontent';
	    } else {
  	      	url = '/http.svc/getpagecontent';
	    }
	
		var resource = $resource(url, {}, {
            query: {
                method: 'GET',
                params: {
                    deliverableInfo: '@deliverableInfo',
                    toc: '@toc',
                    alias: '@alias',
                    rnd: '@rnd'
                },
                isArray: false
            },
            add: {
                method: 'POST',
                params: {
                	deliverableId: '@deliverableId',
                	file_loio: '@file_loio',
                	text: '@text',
         			marked_content: '@marked_content',
         			start_node_path: '@start_node_path',
         			end_node_path: '@end_node_path',
         			start_index: '@start_index',
         			end_index: '@end_index',
         			prev: '@prev',
         			aft: '@aft',
                },
                isArray: false
            },
            edit: {
                method: 'PUT',
                params: {
                	id: '@id',
                	text: '@text',
                	process_state: '@process_state',
                	state: '@state',
                },
                isArray: false
            },
            reanchor: {
                method: 'PUT',
                params: {
                	id: '@id',
         			start_node_path: '@start_node_path',
         			end_node_path: '@end_node_path',
         			start_index: '@start_index',
         			end_index: '@end_index',
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
            reply: {
                method: 'POST',
                params: {
                	text: '@text',
                	parentComment: '@parentComment',
                },
                isArray: false
            },
            deleteReply: {
                method: 'DELETE',
                params: {
                	id: '@id'
                },
                isArray: false
            },
            editReply: {
                method: 'PUT',
                params: {
                	id: '@id',
                	text: '@text'
                },
                isArray: false
            }
        });
		
		return resource;

    }
]);

cpServices.factory("securityService", ['$resource',
   function($resource) {
	var sec = $resource('/http.svc/translation', {}, {
		query: {
			method: 'GET',
			params: {},
			isArray: false,
			cache: true,
		}
	});
	return sec;
}]);

cpServices.factory("pageService", function(){
    var pageService = {};
    pageService.getNode = function() {
    	return this.node;
    }
	return pageService;
});

cpServices.factory("stateService", ['$q', function($q){
    return {
        DRAFT: function(){
            return $q.when("DRAFT");
        },
        TEST: function(){
            return $q.when("TEST");
        },
        PRODUCTION: function(){
            return $q.when("PRODUCTION");
        },
    };
}]);

var deliverRes = cpServices.factory('deliverables', ['$resource',
    function($resource) {
        return $resource('/http.svc/deliverables?$skip=0&$expand=project', {}, {
            query: {
                method: 'GET',
                params: {
                    $format: 'json',
                    $top:200
                },
                isArray: false,
                cache: true
            },
            queryForAllDelivsInProj: {
                method: 'GET',
                params: {
                    $format: 'json',
                    $top:'@top',
                    projectId: '@projectId'
                },
                isArray: false,
                cache: true
            },
            queryExcel: {
                method: 'GET',
                params: {
                    $format: 'json',
                    $top:'@$top',
                    title: '@title',
                    transtype: '@transtype',
                    locale: '@locale',
                    loio: '@loio',
                    version: '@version',
                    versionName: '@versionName',
                    build: '@build',
                    lastModified: '@lastModified',
                    productName: '@productName',
                    product: '@product',
                    projectName: '@projectName',
                    buildableMapLOIO: '@buildableMapLOIO',
                    appUrl: '@appUrl',
                    contextType: '@contextType',
                    system: '@system',
                    state: '@state'
                },
                isArray: false,
                cache: true
            }
        });
}]);

/** Subscriptions service 
 * Url parameters:
 * deliverable_id
 * notification_option can be HOURLY, DAILY, WEEKLY, MONTHLY
 * timezone is according to Olson List.  For example, "America/New York"
*/
cpServices.factory('sub', ['$resource', 
                           function($resource) {
	return $resource('/http.svc/subscribe', {}, {
		addCommentSubscription: {
			method: 'POST',
			params: {
				deliverable_id: '@deliverable_id',
				notification_option: '@notification_option',
				timezone: '@timezone',
				isCommentSubscription: true
			},
			isArray: false
		},
		removeCommentSubscription: {
			method: 'DELETE',
			params: {
				deliverable_id: '@deliverable_id',
				isCommentSubscription: true
			},
			isArray: false
		},
		addFeedbackSubscription: {
			method: 'POST',
			params: {
				deliverable_id: '@deliverable_id',
				notification_option: '@notification_option',
				timezone: '@timezone',
				isCommentSubscription: false
			},
			isArray: false
		},
		removeFeedbackSubscription: {
			method: 'DELETE',
			params: {
				deliverable_id: '@deliverable_id',
				isCommentSubscription: false
			},
			isArray: false
		}
	});
}]);

// Delete button factory response.
cpServices.factory('deleteDeliv', ['$resource',
    function($resource) {
        return $resource('/http.svc/delete', {}, {
            'delete': {
                method: 'GET',
                params: {
                    deliverable_ids: '@deliverable_ids'
                },
                isArray: false
            },
        });
    }]);

// Publish button factory response.
cpServices.factory('publication', ['$resource',
    function($resource) {
        return $resource('/http.svc/publish', {}, {
            getProjectAuthorization: {
                method: 'GET',
                params: {
                    project_id: '@project_id',
                    state: '@state'
                },
                isArray: false
            },
            sendPub: {
                method: 'POST',
                params: {
                    deliverable_id: '@deliverable_id',
                    target_state: '@target_state'
                },
                isArray: false
            },
            sendProject: {
                method: 'POST',
                params: {
                    project_id: '@project_id',
                    source_state: '@source_state',
                    target_state: '@target_state'
                },
                isArray: false
            }
        });
    }]);

cpServices.factory('download', ['$resource',
    function($resource) {
        return $resource('/http.svc/download', {}, {
            getFile: {
                method: 'GET',
                params: {
                    deliverable_id: '@deliverable_id'
                },
            isArray: false
        }
    });
}]);

cpServices.factory('pulse', function() {
	var pulse = {};

	pulse.addPulse = function(element) {
        $(element).addClass('pulse');
        setTimeout(function() {
            $(element).removeClass('pulse');
        }, 3000);
    };

    return pulse;
});