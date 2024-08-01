cpControllers.controller('ModalPublicationCtrl', ['$scope', '$uibModal', '$log', 'userSharedService', 'Notification', 'publication',
                                                function($scope, $uibModal, $log, sharedService, Notification, publication) {

    $scope.deliverables = [];
    $scope.publishAll = false;
    $scope.differentProjects = false;
    $scope.hasProjectPrivileges = true;
    $scope.showStateSelector = false;
    $scope.states = [
                     {
                    	 label: "----- Select State -----",
                    	 value: ""
                     },
                     {
                    	 label: "Publish all to TEST",
                    	 value: "TEST"
                     },
                     {
                    	 label: "Publish all to PRODUCTION",
                    	 value: "PRODUCTION"
                     }
                     ];

    $scope.selectedState = $scope.states[0];

    if (sharedService.deliverableList != undefined &&
    		sharedService.deliverableList.length > 0) {
    	$scope.deliverables = sharedService.deliverableList;
        var disableProjPublish = sharedService.checkProject($scope.deliverables);
        $scope.allProd = true;

        if (disableProjPublish) {
        	$scope.differentProjects = disableProjPublish;
        } else {
        	var deliverable = $scope.deliverables[0];
        	publication.getProjectAuthorization({
        		project_id: deliverable.projectId,
        		state: deliverable.state
        	}, function(response) {
        		$scope.hasProjectPrivileges = response.data.hasProjectPrivileges;
        	}, function(error) {
        		// error handler
                sharedService.errorHandler(error);
        	});
        }

        for (var i=0, len = $scope.deliverables.length; i<len; i++) {
        	$scope.deliverables[i].data = [];
        	$scope.deliverables[i].publishId = '';
        	$scope.deliverables[i].ds = {val:"TEST"};
        	$scope.deliverables[i].inProd = false;
        	
        	if ($scope.deliverables[i].state == "DRAFT" || $scope.deliverables[i].state == "TEST") {
        		$scope.allProd = false;
        	}

        	if ($scope.deliverables[i].state == "DRAFT") {
        		$scope.deliverables[i].data.push({deliverable_stage: "TEST"});
        		$scope.deliverables[i].data.push({deliverable_stage: "PRODUCTION"});
        	}
        	else if ($scope.deliverables[i].state == "TEST") {
        		$scope.deliverables[i].ds.val = "PRODUCTION";
        		$scope.deliverables[i].data.push({deliverable_stage: "PRODUCTION"});
        	}
        	else {
        		$scope.deliverables[i].inProd = true;
        	}
        }
    }

    if ($scope.deliverables.length > 1) {
    	$scope.showStateSelector = true;
    }
    
    $scope.handleDelivClick = function(deliverable) {
        sharedService.sendDeliverable(deliverable);
    };
    
    $scope.publish = function() {
    	if ($scope.allProd) {
			alert('All selected documents are already in production!');
			return;
		}
    	if ($scope.publishAll) {
    		if ($scope.deliverables[0].inProd == false) {
    			if ($scope.selectedState.value != "") {
    				$scope.deliverables[0].ds.val = $scope.selectedState.value;
    			}

    			var published = publication.sendProject({
    					project_id: $scope.deliverables[0].projectId,
    					source_state: $scope.deliverables[0].state,
    					target_state: $scope.deliverables[0].ds.val
    				}, function() {
    					$scope.confirmed = true;
    					console.log(published);
    					$scope.deliverables[0].publishId = "N/A";
    					sharedService.state = $scope.deliverables[0].ds.val
    					//sharedService.broadcastPublication();
    				});
    		}
    	}
    	else {
    		$scope.publishDeliv(0, $scope.deliverables.length - 1);
    	}
    }

    $scope.publishDeliv = function(i, len) {
    	if ($scope.deliverables[i].inProd == false) {
    		if ($scope.selectedState.value != "") {
    			if ($scope.deliverables[i].state != $scope.selectedState.value) {
    				$scope.deliverables[i].ds.val = $scope.selectedState.value;

    				var published = publication.sendPub({
        				deliverable_id: $scope.deliverables[i].id,
        				target_state: $scope.deliverables[i].ds.val
                	}, function() {
                		$scope.deliverables[i].publishId = published.data.job_id;
                		sharedService.state = $scope.deliverables[i].ds.val
                		if (i >= len) {
                			$scope.confirmed = true;
                		}
                		//sharedService.broadcastPublication();
                	});
    			}
			} else {
				var published = publication.sendPub({
    				deliverable_id: $scope.deliverables[i].id,
    				target_state: $scope.deliverables[i].ds.val
            	}, function() {
            		$scope.deliverables[i].publishId = published.data.job_id;
            		sharedService.state = $scope.deliverables[i].ds.val
            		if (i >= len) {
            			$scope.confirmed = true;
            		}
            		//sharedService.broadcastPublication();
            	});
			}
        }
        if (i != len) {
        	$scope.publishDeliv(i+1, len);
        }
    }
}]);
