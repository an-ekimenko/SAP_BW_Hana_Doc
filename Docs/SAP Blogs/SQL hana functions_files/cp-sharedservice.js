'use strict';

/* User Management Services */

// user http responses
var cpSharedService = angular.module('cpSharedService', []);
 
// used this share service to communicate between controllers
cpSharedService.factory('userSharedService', ['$rootScope', '$window', 'PATHS', 'Notification', '$translate', '$state', '$location', '$cookies', function($rootScope, $window, PATHS, Notification, $translate, $state, $location, $cookies) {
    var sharedService = {}; // init shared service
    sharedService.group = undefined; // used as a group to communicate between controllers
    sharedService.user = undefined; // used as a user to communicate between controllers
    sharedService.deliverable = undefined; // used as a deliverable to communicate between controllers
    sharedService.deliverableList = [];
    sharedService.groupName = ''; // used as a Group Name to communicate between controllers
    sharedService.userName = ''; // temporary
    sharedService.singleUsergroup = {}; // used as a single usergroup to communicate between controllers
    sharedService.masterList = [];
    sharedService.projMasterList = [];
    sharedService.allPrivs = ["READ","REVIEW","UPLOAD","DELETE","PUBLISH","GRANT_ACCESS"];
    sharedService.privString='';
    sharedService.userList = [];
    sharedService.usergroupList = [];
    sharedService.state = '';
    sharedService.currentPage = '';
    sharedService.projectID = '';

    // used checkboxes in two different controllers created this shared service
    sharedService.checkboxPrivileges = [
        {'label': "Read", 'name': "READ", 'val':false},
        {'label': "Review", 'name': "REVIEW", 'val':false},
        {'label': "Upload", 'name': "UPLOAD", 'val':false},
        {'label': "Delete", 'name': "DELETE", 'val':false},
        {'label': "Publish", 'name': "PUBLISH", 'val':false},
        {'label': "Grant Access",'name': "GRANT_ACCESS", 'val':false}
    ];


        // functions
    
	    sharedService.isRestricted = function(feature) {
	        var restrictedFeatures = $cookies.get("sapuacprestrictedfeaturelist");
	        if (restrictedFeatures.length < 4 || restrictedFeatures === "\"[]\"") {
	            return false;
	        }
	        restrictedFeatures = restrictedFeatures.replace(/["\s\+\[\]]/g,'').split(",");
	        if (restrictedFeatures.indexOf(feature) > -1) {
	            return true;
	        }
	    }
	    
        sharedService.findIDX = function(groupOrUser,data,type) {
            var index = -1;
            if (type == "user") {
                for (var i=0; i < data.length; i++) {
                    if (data[i].type == "user" && data[i].id == groupOrUser.user_id) {
                        index = i;
                        return index;
                    }
                }
            }
            else {
                for (var i=0; i < data.length; i++) {
                    if (data[i].type == "usergroup" && data[i].id == groupOrUser.group_id) {
                        index = i;
                        return index;
                    }
                }
            }
            return index;
        };
        
        sharedService.storePrivilges = function (privileges) {
            var privs = "";
            for (var i=0; i<privileges.length; i++) {
                if(privileges[i].val == true) {
                    privs = privs + (privileges[i].name) + ",";
                }
            }
            //trims the excess ','
            sharedService.privString = privs.slice(0,-1);
        }

    sharedService.checkProject = function (deliverables) {
        var project = deliverables[0].projectName;
        
        if (project == "Manual_upload") {
            return true;
        }

    	for (var i = 0; i < deliverables.length; i++) {
    		var deliverable = deliverables[i];
    		if (project != deliverable.projectName) {
    			return true;
    		}
    	}

    	return false;
    }

    // to clear checkboxes before a modal pops up
    sharedService.clearCheckboxes = function() {
        for (var i=0; i<sharedService.checkboxPrivileges.length ;i++) {
            sharedService.checkboxPrivileges[i].val = false;
        }
    }

    sharedService.errorHandler = function(sentError) {
    	var message = sentError.data.message;
    	if (sentError.status == 404) {
    		$state.go('pageNotFound', {frontendUrl: $location.absUrl()}, {
    			location: 'replace'
    		});
    		return;
    	}
    	if (message) {
    		$translate(sentError.data.message).then(function (message) {
        		var errorMsg = sentError.status ? sentError.status + ": " : "";
        		
        		errorMsg += message;
        		
            	var messageText = sentError.data.message_text;
        		if (messageText) {
        			errorMsg += " - " + messageText;
        		}

        		Notification.error(errorMsg);
        		$rootScope.$emit('error-happened-event');
        	}, function (translationId) {
        		Notification.error(translationId);
        		$rootScope.$emit('error-happened-event');
        	});
    	} else {
    		Notification.error(sentError.status + ": " + sentError.statusText);
    	}
    }
    
    // for creating url links
    sharedService.getViewerURLAlias = function(alias, filePath, state, loio, version, language, currentTopic) {
        
		if(alias && filePath) {
            return PATHS.BASE_URL + aliasURL(state, alias)+'/'
                    +(currentTopic? currentTopic: filePath)
                    +'?loadlandingpageontopicnotfound=true';
		}
		else 
		{
			if (alias) {
                return PATHS.BASE_URL + aliasURL(state, alias)+'/'
                        +(currentTopic? currentTopic: '')
                        +'?loadlandingpageontopicnotfound=true';
			} 
			else
			{
                return PATHS.BASE_URL + url(state) + '/' + loio + '/' + version + '/' + language + '/' 
                        + (currentTopic? currentTopic: filePath)
                        +'?loadlandingpageontopicnotfound=true';
			}
		}
    }
    function aliasURL(state, alias) {                
		return url(state) + '/' + alias;
    }
    function url(s) {
		return (s === 'PRODUCTION') ? '' : '/' + s;
    }
    sharedService.getRawContentURL = function(alias, state, rootPage, loio, version, locale) {
		if (alias) {
			if (state === 'PRODUCTION') {
				return '/' + oData.alias + '/' + rootPage;
			} else if (state) {
				return '/' + state + '/' + alias + '/' + rootPage;
			} else {
				console.error("missing state");
			}
		} else {
			if (state === 'PRODUCTION') {
				return PATHS.RESOURCE_URL + '/'  + loio + '/' 
					+ version + '/' +  locale + '/' 
					+ encodeURIComponent(rootPage).replace(/%2F/g, "/");
			} else {
				return PATHS.RESOURCE_URL + '/' + state + '/' 
					+ loio + '/' + version + '/' +  locale + '/' 
					+ encodeURIComponent(rootPage).replace(/%2F/g, "/");
			}
		}
    }
    sharedService.getProductURL = function(state, product, version, locale) {
        
        return PATHS.BASE_URL + '/product/' + state + '/' 
                + encodeURIComponent(encodeURIComponent(product)) + '/' 
                + encodeURIComponent(encodeURIComponent(version)) + '/' 
                + locale;
    }
    sharedService.getRedirectLink = function(release, topic) {
        if(release.transtype == 'html5.uacp') {
            return this.getViewerURLAlias(release.alias, release.p, release.state, release.loio, release.v, release.l, topic);
        } else {
            return this.getRawContentURL(release.alias, release.state, release.rootPage, release.loio, release.v, release.l);
        }
    }
    sharedService.redirectToRelease = function(release, topic) {
		if(release.transtype == 'html5.uacp') {
			$window.location = this.getViewerURLAlias(release.alias, release.p, release.state, release.loio, release.v, release.l, topic);
		} else {
			$window.location = this.getRawContentURL(release.alias, release.state, release.rootPage, release.loio, release.v, release.l);
		}
    }
    sharedService.subscribeErrorEvent = function(scope, callback) {
        var handler = $rootScope.$on('error-happened-event', callback);
        scope.$on('$destroy', handler);
    }
    
    // setters
    sharedService.sendGroup = function(group) {
        this.group = group; // don't really need
    };
    sharedService.sendUser = function(user) {
        this.user = user; // don't really need
    };
    sharedService.sendDeliverable = function(deliverables) {
        this.deliverable = deliverables[0];
        this.deliverableList = deliverables;
        this.broadcastDelivSet();
    };
    sharedService.sendGroupName = function(groupName) {
        this.groupName = groupName;
        this.broadcastGroupName();
    };

    // broadcasts
    sharedService.broadcastEditAlias = function(data) {
        $rootScope.$broadcast('handleEditAlias', data);
    };
    sharedService.broadcastUGRefresh = function() {
        $rootScope.$broadcast('handleUGrefresh');
    };
    sharedService.broadcastGroupName = function() {
        $rootScope.$broadcast('handleGroupName');
    };
    sharedService.broadcastUGDelete = function() {
        $rootScope.$broadcast('handleUGDelete');
    };
    sharedService.broadcastUserAdd = function() {
        $rootScope.$broadcast('handleUserAdd');
    };
    sharedService.broadcastDelivAdd = function() {
        $rootScope.$broadcast('handleDelivAdd');
    };
    sharedService.broadcastDelivSet = function () {
        $rootScope.$broadcast('handleDelivSet');
    }
    sharedService.broadcastDeleteDeliv = function() {
        $rootScope.$broadcast('handleDeleteDeliv');
    }
    sharedService.broadcastPublication = function() {
        $rootScope.$broadcast('handlePublication');
    }
    sharedService.broadcastManageGroup = function () {
        $rootScope.$broadcast('handleManageGroup');
    }
    sharedService.broadcastAuthorize= function () {
        $rootScope.$broadcast('handleAuthorize');
    }
    sharedService.broadcastProjectAuthorize = function () {
        $rootScope.$broadcast('handleProjectAuthorize');
    }
    sharedService.broadcastDownload= function () {
        $rootScope.$broadcast('handleDownload');
    }
    sharedService.broadcastUpload= function () {
        $rootScope.$broadcast('handleUpload');
    }        
    sharedService.handleViewImportFailedJobs= function () {
        $rootScope.$broadcast('handleViewImportFailedJobs');
    } 
    sharedService.handleViewPublishFailedJobs= function () {
        $rootScope.$broadcast('handleViewPublishFailedJobs');
    }
    sharedService.broadcastPublish= function () {
        $rootScope.$broadcast('handlePublish');
    }
    sharedService.broadcastReloadDT = function () {
        $rootScope.$broadcast('handleReloadDT');
    }
    /*sharedService.broadcastProjectPublish= function () {
        $rootScope.$broadcast('handleProjectPublish');
    }*/
    sharedService.broadcastDelete= function () {
        $rootScope.$broadcast('handleDelete');
    }
    sharedService.broadcastDeleteComment = function (array, comment, reply) {
        $rootScope.$broadcast('handleDeleteComment', { array: array, comment: comment, reply: reply });
    }
    return sharedService;
}]);
