cpControllers.controller('ModalDeleteProjectDependencyCtrl', ['$scope', 
                                                   function($scope) {
		    
    
    $scope.removeProjectDependency = function(dependency) {	
    	var index = $scope.project.data.dependencies.indexOf(dependency);
        if (index != -1) {
        	$scope.project.data.dependencies.splice(index,1);
        }
    };
}]);