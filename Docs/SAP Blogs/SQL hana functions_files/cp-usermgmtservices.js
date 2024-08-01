'use strict';

/* User Management Services */

// user http responses
var cpUserMgmtServices = angular.module('cpUserMgmtServices', ['ngResource']);
cpUserMgmtServices.factory('users', ['$resource', 
 function($resource) {
   return $resource('/http.svc/user', {}, {
       query: {
           method: 'GET',
           params: {
               $format: 'json',
               rnd: '@rnd'
           },
           isArray: false
       },
       findUser: {
           method: 'GET',
           params: {
        	   user_param: '@user_param'
           },
           isArray: false
       }
   });
}
]);

// usergroup http response
cpUserMgmtServices.factory('usergroup', ['$resource', 
  function($resource) {
    return $resource('/http.svc/usergroup', {}, {
        add: { // adds a user group
            method: 'POST',
            params: {
                name: '@name'
            },
            isArray: false
        },
        query: { // gets the users of a usergroup
            method: 'GET',
            params: {
                group_id: '@group_id',
                rnd: '@rnd'
            },
            isArray: false
        },
        queryALL: { // gets the users of a usergroup
            method: 'GET',
            params: {
                $format: 'json',
                rnd: '@rnd'
            }
        },
        remove: { // removes a usergroup
            method: 'DELETE',
            params: {
                group_id: '@group_id'
            },
            isArray: false
        },
        adduser: { // adds a user to a usergroup
            method: 'POST',
            params: {
                group_id: '@group_id',
                members: '@members'
            }
        },
        addUsers: { // adds a user to a usergroup
            method: 'POST',
            params: {
                group_id: '@group_id',
                members: '@members'
            }
        },
        removeuser: { // removes a user from a usergroup
            method: 'DELETE',
            params: {
                group_id: '@group_id',
                members: '@members'
            }
        },
        removeUsers: {
        	method: 'DELETE',
            params: {
                group_id: '@group_id',
                user_ids: '@user_ids'
            }
        },
        updategroupname: {
            method: 'PUT',
            params: {
                group_id: '@group_id',
                name: '@name'
            }
        }
    });
}
]);

cpUserMgmtServices.factory('privilegesService', ['$resource', 
                                                  function($resource) {
	return $resource('/http.svc/privileges', {}, {
		getPrivilegesForDeliverables: {
			method: 'GET',
			params: {
				deliverableIds: '@deliverableIds',
            	rnd: '@rnd'
			}
		},
		getPrivilegesForProject: {
			method: 'GET',
            params: {
            	projectId: '@projectId',
            	state: '@state',
            	rnd: '@rnd'
            }
		},
		updatePrivileges: {
			method: 'POST',
            params: {
            	groupPrivs: '@groupPrivs',
            	userPrivs: '@userPrivs',
            	usersDeleteList: '@usersDeleteList',
            	groupsDeleteList: '@groupsDeleteList',
            	deliverableIds: '@deliverableIds',
            	projectId: '@projectId',
            	state: '@state',
            	showLockForPublic: '@showLockForPublic'
            },
            isArray: false
		}
	});
}]);

// gets the deliverables for a group 
cpUserMgmtServices.factory('groupprivileges', ['$resource',
    function($resource) {
        return $resource('/http.svc/group_privileges', {}, {
            getDelivs: {
                method: 'GET',
                params: {
                    group_id: '@group_id'
                },
                isArray: false
            }
        });
    }]);

// gets the deliverables for a user
cpUserMgmtServices.factory('userprivileges', ['$resource',
    function($resource) {
        return $resource('/http.svc/user_privileges', {}, {
            getDelivs: {
                method: 'GET',
                params: {
                    user_id: '@user_id'
                },
                isArray: false
            }
        });
    }]);