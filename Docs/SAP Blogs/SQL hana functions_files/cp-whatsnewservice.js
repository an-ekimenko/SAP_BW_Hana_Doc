'use strict';
/* User Service */
var cpWhatsNewModule = angular.module('cpWhatsNewModule', []);

cpWhatsNewModule.factory('cpWhatsNewService', ['usersManagement','$cookies', 'contentApiService',
    function(usersManagement, $cookies, contentApiService) {
        var cpWhatsNewService = {

            whatsNewInit: function($scope) {
                
                if (usersManagement.isUserEmployee()) {
			        whatsNewEmployee($scope);
		        } else {
			        whatsNewOtherUser($scope);
		        }
            },

            writeNoNewsCookie: function($scope) {
                var now = new Date();
                var exp = new Date(now.getFullYear()+1, now.getMonth(), now.getDate());
                
                if(usersManagement.isUserEmployee()) {
                    $cookies.put('uacpnonewsEmployee',$scope.deliverableDate,{expires: exp});
                }
                else {
                    $cookies.put('uacpnonewsOtherUser',$scope.deliverableDate,{expires: exp});
                }
            }
        }

        var whatsNewEmployee = function($scope) {
            $scope.wn = {};
            $scope.parameters = contentApiService.getDefaultParameters();
            $scope.parameters.deliverable = "9d8bfedba04642c9b2c98c8b7f442bf9";
            $scope.parameters.version = "2.0.0.0.x";
            $scope.parameters.language = "en-US";
            $scope.parameters.topic = "90f71c3b26894f95a206a98f118a4bcf";
            $scope.parameters.transtype = "xhtml.body";
            $scope.parameters.state = "PRODUCTION";
            $scope.allNewFeature={
                    "status":"OK",
                    "allData":{
                    "description":"All the new features of this version",
                    "url":	"/d85a9483dedd40afa9ca3d13eb3e7f47/2.0.0.0.x/en-US"
                        }
                    }
        }

        var whatsNewOtherUser = function($scope) {
            $scope.wn = {};
			$scope.parameters = contentApiService.getDefaultParameters();
			$scope.parameters.deliverable = "838ce9f84a6b4931a697f81405253365";
			$scope.parameters.version = "2.0.0.0.x";
			$scope.parameters.language = "en-US";
			$scope.parameters.topic = "0d90d6e849c2467189565fc30549b773";
			$scope.parameters.transtype = "xhtml.body";
			$scope.parameters.state = "PRODUCTION";
			$scope.allNewFeature={
					"status":"OK",
					"allData":{
					"description":"All the new features of this version",
					"url":	"/f5b6b9e16a0d429bbff69ec47dba3872/2.0.0.0.x/en-US/d7825a1f796647fb8b4972b7b85baa0d.html"
					}
				}
        }
        
        return cpWhatsNewService;
    }]);
