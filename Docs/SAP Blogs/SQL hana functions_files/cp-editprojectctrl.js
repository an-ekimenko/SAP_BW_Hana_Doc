cpControllers.controller('ModalEditProjectCtrl', ['$scope',  'userSharedService', '$cookies', 'projectService', '$uibModal',
                                                   function($scope,  sharedService, $cookies, projectService, $uibModal) {
	
	$scope.title = 'Edit Project';
	var projectId = sharedService.deliverable.projectId;

	$scope.project = projectService.getProjectById({id: projectId}, 
		function (data) {
		
	    },
	    function(error) {
	        // error handler
	        sharedService.errorHandler(error);
	    });

	$scope.editProjectName = true;
	$scope.editProjectPHIO = true;
	
	$scope.ok = false;
    $scope.notok = false;
    $scope.statusOKMessage;
    $scope.statusNOTOKMessage;
	
	var sapuacpuserfirstname = $cookies.get("sapuacpuserfirstname"),
		sapuacpuserlastname = $cookies.get("sapuacpuserlastname"),
		sapuacpuserid = $cookies.get("sapuacpuserid");
	

	
	$scope.user = {
			firstName:  sapuacpuserfirstname,
			lastName: sapuacpuserlastname,
			userId: sapuacpuserid
	}
	
	$scope.edit = function () {
		var validationMessage = validate();

		if (validationMessage.status == 'OK') {
			projectService.editProject({
	            name: $scope.project.data.name,
	            phio: $scope.project.data.phio,
	            dependencies: $scope.project.data.dependencies.toString()
	            }, function(data) {
	                if (data.data.status == 'OK') {
	                    $scope.ok = true;
	                    $scope.statusOKMessage = "Saved";
	                }
	                else if (data.data.status == 'Error') {
	                    sharedService.errorHandler(data);
	                }
	                else {
	                    $scope.ok = false;
	                    $scope.notok = false;
	                }
                });
		} else {
			alert(validationMessage.status);
		}
	}

	$scope.editProjectNameClicked = function () {
		document.getElementById("project-name").focus();
		$scope.editProjectName = false;
	}
	
	$scope.editProjectPHIOClicked = function () {
		document.getElementById("project-phio").focus();
		$scope.editProjectPHIO = false;
	}
	

	function validate() {
		var name = $scope.project.data.name;
		if (name == '') {
			return {
				status: 'Error',
				message: 'Please fill the required fields!'
			}
		} else {
			return {
				status: 'OK'
			}
		}
	}
	
	
	$scope.handleProjectDepedencyAddClick = function() {	

		var modalInstance = $uibModal.open({
            templateUrl: '_build_938311c7a845691adeabc837/partials/addprojectdependency-modal.html',
            controller: 'ModalInstanceCtrl',
            windowClass: 'app-modal-window',
            scope: $scope
        });				
    };
	
	
	$scope.handleProjectDepedencyDeleteClick = function(dependency) {	
		$scope.dependency = dependency;
		var modalInstance = $uibModal.open({
            templateUrl: '_build_938311c7a845691adeabc837/partials/deleteprojectdepedency-modal.html',
            controller: 'ModalInstanceCtrl',
            windowClass: 'modal-small',
            scope: $scope
        });				
    };
	
	
}]);