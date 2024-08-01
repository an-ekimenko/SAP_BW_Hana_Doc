'use strict';
/* Controllers */
var cpUserMgmtControllers = angular.module('cpUserMgmtControllers', []);

// Please note that $uibModalInstance represents a modal window (instance)
// dependency.
// It is not the same as the $uibModal service used above.
cpUserMgmtControllers.controller('ModalInstanceCtrl', ['$scope', '$uibModalInstance',
    function($scope, $uibModalInstance) {
        $scope.ok = function() {
            $uibModalInstance.close();
        };
        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
]);

cpUserMgmtControllers.controller('UsersCtrl', ['$scope', '$uibModal', '$cookies', 'userSharedService', '$log', 'usersManagement', '$location', '$filter', 'users', 'usergroup', 'deliverables',
    function($scope, $uibModal, $cookies, sharedService, $log, usersManagement, $location, $filter, users, usergroup, deliverables) {

		// Get UserList
	    sharedService.userList = users.query({
	    	rnd: new Date().getTime()
	    }, 
	    function (data) {
	        // success handler
	    },
	    function(error) {
	        // error handler
	        sharedService.errorHandler(error);
	    });

	    // Get Usergroup List
	    sharedService.usergroupList = usergroup.queryALL({
	    	rnd: new Date().getTime()
	    }, 
	    function (data) {
	    },
	    function(error) {
	        // error handler
	        sharedService.errorHandler(error);
	    });
	
		var sapuacpuserid = $cookies.get('sapuacpuserid');
		$scope.isUserAdmin = $cookies.get('sapuacpuserisadmin');

        // Grabbing the User from the Cookies
        if(sapuacpuserid) {
            $scope.userid = sapuacpuserid.replace(/["]+/g, '');
        }

        // Setting user list and usergroup List
        $scope.userList = sharedService.userList;
        $scope.usergroupList = sharedService.usergroupList;

        $scope.$on('handleUGrefresh', function() {
            $scope.usergroupList.data.groups.push({
                group_id: sharedService.singleUsergroup.group_id,
                group_name: sharedService.singleUsergroup.group_name,
                is_admin: sharedService.singleUsergroup.is_admin
            });
        }); 

        // Removes a usergroup from the viewable list
        $scope.$on('handleUGDelete', function() {
            var index = $scope.usergroupList.data.groups.indexOf(sharedService.group);
            if (index != -1) {
                $scope.usergroupList.data.groups.splice(index,1);
            }
        }); 

        //modifies the group name in the viewable list
        $scope.$on('handleGroupName', function() {
            var index = sharedService.findIDX(sharedService.group,sharedService.usergroupList.data.groups,"group");
            if (index != -1) {
                sharedService.usergroupList.data.groups[index].group_name = sharedService.groupName;
                $scope.usergroupList = sharedService.usergroupList;
            }
        });         

        $scope.handleGroupClick = function(group) {
            sharedService.sendGroup(group);
        };

        $scope.handleDelivClick = function(deliverable) {
            sharedService.sendDeliverable(deliverable);
        };

        $scope.handleUserClick = function(user) {
            sharedService.sendUser(user);
        };

        // Edit Group view
        $scope.editgroup = function(size) {
             var modalInstance = $uibModal.open({
                templateUrl: '_build_938311c7a845691adeabc837/partials/editgroup-modal.html',
                controller: 'ModalInstanceCtrl',
                size: size,
                windowClass: 'app-modal-window'
            });
        };
    }
]);

//used for dropdowns
cpUserMgmtControllers.controller('DropdownCtrl', function ($scope, $log) {

   /* 
    *To handle dropdown for authorizations 
    * open1 and 2 refer to user auths
    * open 3 referred to old dropdown filter
    * open4 and 5 refer to project auths
    */
  $scope.status = {
    isopen: false, 
    isopen2: false,
    isopen3: false,
    isopen4: false,
    isopen5: false
  };

  // just to inform when dropdown is toggled
  $scope.toggled = function(open) {
    $log.log('Dropdown is now: ', open);
  };

  //to toggle dropdown
  $scope.toggleDropdown = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.status.isopen = !$scope.status.isopen;
    $scope.status.isopen2 = !$scope.status.isopen2;
    $scope.status.isopen3 = !$scope.status.isopen3;
    $scope.status.isopen4 = !$scope.status.isopen4;
    $scope.status.isopen5 = !$scope.status.isopen5;
  };

});

// Adding Group to database
cpUserMgmtControllers.controller('ModalAddGroupCtrl', ['$scope', 'userSharedService', '$uibModal', '$log', 'usersManagement', 'usergroup',
    function($scope, sharedService, $uibModal, $log, usersManagement, usergroup) {

        // initializing groupName variable
        $scope.groupName = '';
        
        // add group view
        $scope.addgroupview = function(size) {
             var modalInstance = $uibModal.open({
                templateUrl: '_build_938311c7a845691adeabc837/partials/addgroup-modal.html',
                controller: 'ModalInstanceCtrl',
                size: size
            });
        };

        // when clicking the next button when adding a group, go to this window.
        $scope.next = function(size) {
         var modalInstance = $uibModal.open({
            templateUrl: '_build_938311c7a845691adeabc837/partials/editgroup-modal.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            windowClass: 'app-modal-window'
            });
        };

        // add a user group
        $scope.addusergroup = function(name) {

            sharedService.sendGroupName(name); // send groupname to the sharedService

            // send the query to the server
            var usergroupR = usergroup.add({
                name: name
            }, 
            function (data) {
                sharedService.singleUsergroup.group_name = name;
                sharedService.singleUsergroup.group_id = usergroupR.data.new_group.id;
                sharedService.singleUsergroup.is_admin = 1;
                sharedService.broadcastUGRefresh();
                // success handler
            },
            function(error) {
            // error handler
             sharedService.errorHandler(error);
            });
        };
}]);

// For the edit group modal
cpUserMgmtControllers.controller('ModalEditGroupCtrl', ['$scope', 'userSharedService', '$uibModal', '$log', 'usersManagement', 'users', 'usergroup',
    function($scope, sharedService, $uibModal, $log, usersManagement, users, usergroup) {

		var usersDeleteList = [];
		$scope.changeGroupName = true;
		$scope.confirmed = false; // used for visual "confirmed"
		$scope.groupName = '';

		// Get UserList
	    sharedService.userList = users.query({
	    	rnd: new Date().getTime()
	    }, 
	    function (data) {
	        // success handler
	    },
	    function(error) {
	        // error handler
	        sharedService.errorHandler(error);
	    });

        // get the groupname and the users in the group
        if (sharedService.group != undefined) {
            $scope.groupName = sharedService.group.group_name;
            $scope.usersInUsergroup = usergroup.query({
                group_id: sharedService.group.group_id,
                rnd: new Date().getTime()
            }, 
            function (data) {
            	prepareUsers(data.data.members);
            },
            function(error) {
                // error handler
                sharedService.errorHandler(error);
            });
        }

        function prepareUsers(users) {
        	if (users && users.length > 0) {
        		for (var i = 0; i < users.length; i++) {
        			var user = users[i];
        			user.display_name = user.display_name == 'null, null' ?
                    		user.user_id : user.display_name;
        		}
        	}
        }

        $scope.userList = sharedService.userList;

        // find index of user or group within data array
        $scope.idxFinder = function(groupOrUser,data){
            var index = -1;
            for (var i=0; i < data.length; i++) {
                if (data[i].user_id == groupOrUser.user_id) {
                    index = i;
                    return index;
                }
            }
            return index;
        }

        // addusers to the viewable table (for editgroup modal)
        $scope.addusers = function(user) {
            var alreadyExist = ($scope.idxFinder(user,$scope.usersInUsergroup.data.members) !== -1);
            var doesExist = user.user_id != null;
            if (doesExist && !alreadyExist) {
                $scope.usersInUsergroup.data.members.push({
                    user_id: user.user_id,
                    display_name: user.display_name == 'null, null' ?
                    		user.user_id : user.display_name,
                    is_new: true
                });
            } else if (!doesExist) {
            	$scope.usersInUsergroup.data.members.push({
                    user_id: user,
                    display_name: user,
                    is_new: true
                });
            }
            else if(alreadyExist) {
                alert("The user "+user.user_id+" already exists!");
            }
        };

        // remove a user from the viewable table in edit group modal 
        $scope.removeUserView = function(user) {
            var index = $scope.idxFinder(user,$scope.usersInUsergroup.data.members);
            if (index != -1) {
                $scope.usersInUsergroup.data.members.splice(index,1);
            }
        };

        // remove users query to DB
        $scope.removeusers = function(user) {
            if (user.is_new !== true) {
            	usersDeleteList.push(user.user_id);
            }

            $scope.removeUserView(user);
        };
        
        // adding users to the DB
        $scope.confirm = function() {
        	var members = [],
        		usersInGroup = $scope.usersInUsergroup.data.members;

        	if (usersDeleteList.length > 0) {
        		usergroup.removeUsers({
        			group_id: sharedService.group.group_id,
        			user_ids: usersDeleteList.toString()
        		}, function (response) {
        			$scope.confirmed = true;
        		}, function (error) {
        			// error handler
                    sharedService.errorHandler(error);
        		})
        	}

            for (var i = 0, len = usersInGroup.length; i < len; i++) {
                if (usersInGroup[i].is_new === true) {
                	members.push(usersInGroup[i].user_id);
                }
            }

            if (members.length > 0) {
            	usergroup.addUsers({
                    group_id: sharedService.group.group_id,
                    members: members.toString()
                }, function(response) {
                    $scope.confirmed = true;
                }, function(error) {
                    // error handler
                    sharedService.errorHandler(error);
                });
            }
        }

        // changing or creating name for a usergroup in DB
        $scope.confirmname = function() {
            if(name != sharedService.group.group_name) {
                sharedService.groupName = $scope.groupName;
                sharedService.broadcastGroupName();
                usergroup.updategroupname({
                    group_id: sharedService.group.group_id,
                    name: $scope.groupName
                }, function(response) {
                		updateGroupName()
                        $scope.confirmed=true;
                }, function(error) {
                        // error handler
                        sharedService.errorHandler(error);
                });
            }
        }

        function updateGroupName() {
        	var groups = sharedService.usergroupList.data.groups,
        		id = sharedService.group.group_id,
        		name = $scope.groupName;

        	for (var i = 0; i < groups.length; i++) {
        		var group = groups[i];
        		if (id == group.group_id) {
        			group.group_name = name;
        		}
        	}
        	
        }
}]);

// Used to delete usergroup from usergroup list
// UG stands for usergroup
cpUserMgmtControllers.controller('ModalDeleteUsergroupCtrl', ['$scope', 'userSharedService', '$uibModal', '$log','usersManagement', 'usergroup',
    function($scope, sharedService, $uibModal, $log, usersManagement, usergroup ) {

    if (sharedService.group != undefined) {
        $scope.groupName = sharedService.group.group_name;
    }

    // removes the usergroup from the DB
    $scope.removeusergroup = function() {
        usergroup.remove({
            group_id: sharedService.group.group_id
        }, 
        function (data) {
            // success handler
        },
        function(error) {
            // error handler
            sharedService.errorHandler(error);
        });
        sharedService.broadcastUGDelete(); // sends a broadcast to remove the UG from the viewable table
    };

    // open deletegroup modal
    $scope.deletegroup = function () {
        var modalInstance = $uibModal.open({
            templateUrl: '_build_938311c7a845691adeabc837/partials/deletegroup-modal.html',
            controller: 'ModalInstanceCtrl',
            windowClass: 'modal-small'
        });
    };
}]);

/*
 * Huge amount of code here deals with Authoirzations of PROJECTS and USERS
 * Maybe to refactor into two seperate controllers but it may be tough due to alot
 * of interactions between project and auths.
 * This code was quickly done and probably should be re-done but is fully functional with
 * no bugs that I know of. - vvkumar
 */

cpUserMgmtControllers
	.controller('ModalUserAuth', ['$scope', 'deliverables', '$cookies',
	                              '$rootScope', 'userSharedService', '$uibModal',
	                              '$log', 'usersManagement', 'usergroup', 'users', 'privilegesService',
     function($scope, deliverables, $cookies, $rootScope, sharedService, $uibModal, $log,
    		 usersManagement, usergroup, users, privilegesService) {
 
    $scope.expandDeliv = false; // temporary
    $scope.authProject = false;
    var publicLock = 0;

    $scope.deliverablePrivileges = [];
	$scope.projectPrivileges = [];
	$scope.disableProjAuth = false;
	$scope.hasProjPrivileges = true;
	$scope.canSave = true;
	$scope.masterList = [];
	$scope.groupsDeleteList = [];
	$scope.usersDeleteList = [];
	$scope.showLockForPublic = 0;
	$scope.deliverable = sharedService.deliverable;
	$scope.deliverableList = 
		sharedService.deliverableList !== undefined ?
				sharedService.deliverableList : [];

    $scope.toggled = function(open) {
        $log.log('Dropdown is now: ', open);
    };
    
    // To close dropdown for add user and add group
    $scope.toggleCLOSEDropdown = function($event,dropdown) {
        $event.preventDefault();
        $event.stopPropagation();

        if(dropdown === "addUser") {
        	$("#dropdownMenu-addUser").dropdown('toggle');
        }
        else if (dropdown === "addGroup") {
        	$("#dropdownMenu-addGroup").dropdown('toggle');
        }
    };

    $scope.needEdit = false; // used to see if a user has the "Grant Access" right
    $scope.isSaved = false; // visual update to when user saves and recieve 200 query back

    // Get Usergroup List
    sharedService.usergroupList = usergroup.queryALL({
    	rnd: new Date().getTime()
    }, 
    function (data) {
    },
    function(error) {
        // error handler
        sharedService.errorHandler(error);
    });

    // initialize vars from sharedService
    $scope.usergroupList = sharedService.usergroupList;
 
    $scope.findUser = function(val) {
        return users.findUser({user_param: val}).$promise.then(function (response) {
            $scope.userList = response;
            return response.data.users;
        },
        function(error) {
        	sharedService.errorHandler(error)
        })
    }

    var deliverableListLength = $scope.deliverableList.length;
    if (deliverableListLength > 0) {
        // check if the ability to delete auths for current user
    	$scope.deleteAbil = true;

    	for (var i = 0; i < deliverableListLength; i++) {
    		if ($scope.deliverableList[i].grantAccess != 1) {
    			$scope.deleteAbil = false;
    			$scope.needEdit = true;
    			break;
    		}
    	}
    } else {
    	var hasGrantAccess = $scope.deliverable.grantAccess == 1 ?
    			true : false;

    	$scope.deleteAbil = hasGrantAccess;
		$scope.needEdit = !hasGrantAccess;
    }

    //get singluar deliv
    $scope.$on('handleDelivSet', function() {
        $scope.deliverable = sharedService.deliverable;
    }); 

    //get current user
    var sapuacpuserid = $cookies.get('sapuacpuserid');
    if(sapuacpuserid) {
        $scope.userid = sapuacpuserid.replace(/["]+/g, '');
    }

    $scope.editpriv = function(object, priv) {
        /* 
         * changes privilege value.
         * object is the entire privilege rule
    	*/

    	for (var i = 0; i < object.privileges.length; i++) {
    		var privilege = object.privileges[i];
    		if (privilege.name === priv.name) {
    			if (priv.val <= 0) {
    				privilege.val = 1;
    	    	} else {
    	    		privilege.val = 0;
    	    	}
    		}
    	}

    	checkLock(object);
    }

    function checkLock(privilegeObject) {
    	var readPrivilege = privilegeObject.privileges[0];
    	if (privilegeObject.type == 'usergroup' 
    		&& privilegeObject.name == 'EVERYONE') {
    		if (readPrivilege.val > 0) {
    			$scope.disableLock = true;
    		} else {
    			$scope.disableLock = false;
    		}
    	}
    }

    $scope.editPublicLock = function() {
    	if ($scope.showLockForPublic <= 0) {
    		$scope.showLockForPublic = 1;
    	} else {
    		$scope.showLockForPublic = 0;
    	}
    }

    $scope.runUserQuery = function () {
        $scope.userList = users.query(); // get users
    }

    $scope.runUsergroupQuery = function () {
        $scope.usergroupList = usergroup.queryALL(); // get usergroups
    }

    $scope.refreshPrivileges = function () {
    	getPrivileges();
    }

    // queries the backend for the users and groups privileges
    var getPrivileges = function () {
    	var projectId = $scope.deliverable.projectId,
    		state = $scope.deliverable.state;

    	// empty the privileges list
    	$scope.masterList = [];

    	if ($scope.authProject) {
    		privilegesService.getPrivilegesForProject({
    			projectId: projectId,
    			state: state,
        		rnd: new Date().getTime()
    		}, function (response) {
    			var privileges = response.data.privileges;
            	addPrivileges(privileges);
            	$scope.showLockForPublic = response.data.publicLock;
            	$scope.publicLock = angular.copy($scope.showLockForPublic);
            	$scope.disableLock = response.data.disableLock;
    		}, function (error) {
    			// error handler
                sharedService.errorHandler(error);
    		});
    	} else {
    		var ids = [],
    			deliverableListLength = $scope.deliverableList.length;

    		if (deliverableListLength > 0) {
    			for (var i = 0; i < deliverableListLength; i++) {
            		ids.push($scope.deliverableList[i].id);
            	}
    		} else {
    			ids.push($scope.deliverable.id);
    		}

        	privilegesService.getPrivilegesForDeliverables({
        		deliverableIds: ids.toString(),
        		projectId: projectId,
        		state: state,
        		rnd: new Date().getTime()
        	}, function (response) {
        		var privileges = response.data.privileges;
        		$scope.showLockForPublic = response.data.publicLock;
            	$scope.publicLock = angular.copy($scope.showLockForPublic);
            	$scope.disableLock = response.data.disableLock;
            	$scope.hasProjPrivileges = response.data.hasProjectPrivileges;
            	addPrivileges(privileges);
        	}, function (error) {
            	// error handler
                sharedService.errorHandler(error);
        	});
    	}
    }

    getPrivileges();

    var addPrivileges = function (privileges) {
    	if (privileges) {
    		angular.forEach(privileges, function(singleGroupOrUser) {
    			var type;

                if (singleGroupOrUser.group_id) {
                    type = "usergroup";
                }
                else if (singleGroupOrUser.user_id) {
                    type = "user";
                }

                $scope.masterList.push(privilegesToJSON(type, false, singleGroupOrUser));
    		});
    	}
    }

    // adding USERGROUP to the table (visually)
    $scope.addUserGroupToTable = function (group){
        var alreadyExist,
	    	doesExist = false;

	    if (group && group.group_name) {
	        for (var i = 0; i < $scope.usergroupList.data.groups.length; i++) {
	            if (group.group_name == $scope.usergroupList.data.groups[i].group_name) {
	            	group = $scope.usergroupList.data.groups[i];
	                doesExist = true;
	                break;
	            }
	        }
	    }
	
	    for (var i = 0; i < $scope.masterList.length; i++) {
	    	var privilege = $scope.masterList[i];
	    	if (privilege.type == 'usergroup' && privilege.name == group.group_name) {
	    		alreadyExist = true;
	    		break;
	    	}
	    }
	
	    if (doesExist && !alreadyExist) {
	    	if (isGroupValid(group)) {
	    		$scope.masterList.push(privilegesToJSON('usergroup', true, group));
	    	} else {
	    		alert('You can not make a "DRAFT" or "TEST" deliverable public!');
	    		return;
	    	}
	    }
	    else if (alreadyExist) {
	        alert("The group " + group.group_name + " already exists!");
	    }
	    else if (!doesExist) {
	        alert("The group " + group + " does not exist!");
	    }
    }

    // adding USER to the table (visually)
    $scope.addUserToTable = function (user){
    	var alreadyExist,
        	doesExist = false;

        if (user && user.user_id) {
            for (var i = 0; i < $scope.userList.data.users.length; i++) {
                if (user.user_id == $scope.userList.data.users[i].user_id) {
                    user = $scope.userList.data.users[i];
                    doesExist = true;
                    break;
                }
            }
        }

        for (var i = 0; i < $scope.masterList.length; i++) {
        	var privilege = $scope.masterList[i];
        	if (privilege.type == 'user' && privilege.user_id == user.user_id) {
        		alreadyExist = true;
        		break;
        	}
        }

        if (doesExist && !alreadyExist) {
        	$scope.masterList.push(privilegesToJSON('user', true, user));
        }
        else if (alreadyExist) {
            alert("The user " + user.user_id + " already exists!");
        }
        else if (!doesExist) {
            alert("The user " + user + " does not exist!");
        }
    }

    //deleting auths visually and adding it to the delete array for deletion when
    //save is ran
    $scope.deleteauth = function(object) {
    	if (object.type == 'user') {
    		$scope.usersDeleteList.push(object.user_id);
    	} else if (object.type == 'usergroup') {
    		if (object.name === "EVERYONE") {
    			$scope.disableLock = false;
    		}
    		$scope.groupsDeleteList.push(object.group_id);
    	}

    	var index = $scope.masterList.indexOf(object);
		$scope.masterList.splice(index, 1);
    }

    /*
     * The save process goes through all the lists that have been created ie
     * MASTERLIST, PROJMASTERLIST, DELETELIST, PROJDELIETELIST
     * then proceeds to run the queries for this to save the changes
     * the user has made!
     */
    $scope.save = function (isProj) {
    	var groupPrivileges = [],
    		userPrivileges = [],
    		deliverableIds = [], // deliverable ids
    		projectId = undefined,
    		ids = undefined,
    		showLockForPublic = undefined;

    	if ($scope.authProject) {
    		projectId = $scope.deliverable.projectId;
    	} else {
    		for (var i = 0; i < $scope.deliverableList.length; i++) {
        		deliverableIds.push($scope.deliverableList[i].id);
        	}
    	}

    	ids = deliverableIds.toString() !== '' ? 
    			deliverableIds.toString() : undefined;

    	angular.forEach($scope.masterList, function(groupOrUser) {
    		if (groupOrUser.modified) {
    			var privilegeRule = {},
    				privileges = groupOrUser.privileges;
    			privilegeRule.privileges = [];

    			if (isPrivilegeRuleValid(privileges)) {
    				for (var i = 0; i < privileges.length; i++) {
        				var privilege = privileges[i];
        				if (privilege.val !== 0 && privilege.val !== undefined) {
        					privilegeRule.privileges.push(privilege.name);
        				}
        			}

        			if (groupOrUser.type == "user") {
        				privilegeRule.user_id = groupOrUser.user_id;
        				userPrivileges.push(privilegeRule);
        			} else if (groupOrUser.type == "usergroup") {
        				privilegeRule.group_id = groupOrUser.group_id;
        				groupPrivileges.push(privilegeRule);
        			}
    			}
    		}
    	});

    	if ($scope.canSave && 
    			(groupPrivileges.length > 0 || userPrivileges.length > 0) ||
    			($scope.usersDeleteList.length > 0 || $scope.groupsDeleteList.length > 0) ||
    			$scope.showLockForPublic != $scope.publicLock) {

    		groupPrivileges = groupPrivileges.length > 0 ?
    				JSON.stringify(groupPrivileges) : undefined;

			userPrivileges = userPrivileges.length > 0 ?
					JSON.stringify(userPrivileges) : undefined;

			$scope.usersDeleteList = $scope.usersDeleteList.length > 0 ?
	    			$scope.usersDeleteList.toString() : undefined;

	    	$scope.groupsDeleteList = $scope.groupsDeleteList.length > 0 ?
	    			$scope.groupsDeleteList.toString() : undefined;

	    	showLockForPublic = $scope.showLockForPublic != $scope.publicLock ?
					$scope.showLockForPublic : undefined;

    		privilegesService.updatePrivileges({
    			groupPrivs: groupPrivileges,
    			userPrivs: userPrivileges,
    			usersDeleteList: $scope.usersDeleteList,
    			groupsDeleteList: $scope.groupsDeleteList,
    			deliverableIds: ids,
    			state: $scope.deliverable.state,
    			projectId: projectId,
    			showLockForPublic: showLockForPublic
    		}, function (response) {
    			// success handler
    			$scope.isSaved = true;
    		}, function (error) {
    			sharedService.errorHandler(error);
    		});
    	}
    }

    /*
     * Function that enables/disables the 'All deliverables in project' button. 
     * Checks if all deliverables are from the same project.
     * Checks if the current project is not Manual_upload (which is similar to the above condition).
     * Checks if user has privileges for all deliverables in project.
     */
    var resolveProjectAuth = function() {
    	var projectId = $scope.deliverable.projectId;
        
        if ($scope.deliverable.projectName == "Manual_upload") {
            $scope.disableProjAuth = true;
            return;
        }

    	if ($scope.deliverableList.length > 1) {
    		for (var i = 0; i < $scope.deliverableList.length; i++) {
        		var deliverable = $scope.deliverableList[i];
        		if (projectId !== deliverable.projectId) {
        			$scope.disableProjAuth = true;
        			break;
        		}
        	}
    	}
    }

    resolveProjectAuth();

    function isPrivilegeRuleValid(privileges) {
    	var privilege;

		for (var i = 0; i < privileges.length; i++) {
			if (privileges[i].val === -1) {
				return false;
			}
		}

    	return true;
    }

    function isGroupValid(group) {
    	var hasDraftOrTest = false,
    		deliverables = $scope.deliverableList,
    		isEveryone = group.group_name == 'EVERYONE';

    	if ($scope.authProject) {
    		if ((deliverables[0].state == 'DRAFT' || deliverables[0].state == 'TEST') 
    				&& isEveryone) {
    			return false;
    		}

    		return true;
    	} else {
    		for (var i = 0; i < deliverables.length; i++) {
        		if (deliverables[i].state == 'DRAFT' || deliverables[i].state == 'TEST') {
        			hasDraftOrTest = true;
        			break;
        		}
        	}

        	return !(hasDraftOrTest && isEveryone);
    	}
    }

    // check for "EVERYONE" - "READ"
    function hasEveryoneRead(groups) {
    	for (var i = 0; i < groups.length; i++) {
    		var group = groups[i];
    		if (group.group_name && group.group_name === "EVERYONE") {
    			return group.privileges.READ === 1;
    		}
    	}

    	return false;
    }

    function updateLockValues() {
    	var deliverable = undefined,
    		deliverables = $scope.deliverableList;

    	for (var i = 0; i < deliverables.length; i++) {
    		deliverable = deliverables[i];
    		deliverable.showLockForPublic = $scope.showLockForPublic;
    	}
    }

    function privilegesToJSON(type, isNew, userOrGroup) {
    	var json = {};
    	json.type = type;
    	json.modified = isNew;
    	json.privileges = [];

    	if (type == 'user') {
    		json.name = userOrGroup.user_id;
    		json.user_id = userOrGroup.user_id;
    	} else if (type == 'usergroup') {
    		json.name = userOrGroup.group_name;
    		json.group_id = userOrGroup.group_id;
    	}

    	if (isNew) {
		json.privileges.push({'name': "READ", 'val': 0});
    		if(json.name === "EVERYONE") {
                 $scope.editpriv(json, json.privileges[0]);
     		}
    		json.privileges.push({'name': "REVIEW", 'val': 0});
    		json.privileges.push({'name': "UPLOAD", 'val': 0});
    		json.privileges.push({'name': "DELETE", 'val': 0});
    		json.privileges.push({'name': "PUBLISH", 'val': 0});
    		json.privileges.push({'name': "GRANT_ACCESS", 'val': 0});
		} else {
			json.privileges.push({'name': "READ", 'val': userOrGroup.privileges.READ});
			json.privileges.push({'name': "REVIEW", 'val': userOrGroup.privileges.REVIEW});
			json.privileges.push({'name': "UPLOAD", 'val': userOrGroup.privileges.UPLOAD});
			json.privileges.push({'name': "DELETE", 'val': userOrGroup.privileges.DELETE});
			json.privileges.push({'name': "PUBLISH", 'val': userOrGroup.privileges.PUBLISH});
			json.privileges.push({'name': "GRANT_ACCESS", 'val': userOrGroup.privileges.GRANT_ACCESS});
		}

    	if (json.name === "EVERYONE") {
			json.privileges[1].val = undefined;
			json.privileges[2].val = undefined;
			json.privileges[3].val = undefined;
			json.privileges[4].val = undefined;
			json.privileges[5].val = undefined;
    	}
    	
        if (json.name === "SAP_EMPLOYEES" || json.name === "SAP_PARTNERS" || json.name === "SAP_CUSTOMERS") {
			json.privileges[2].val = undefined;
			json.privileges[3].val = undefined;
			json.privileges[4].val = undefined;
			json.privileges[5].val = undefined;
        }

    	return json;
    }
}]);
