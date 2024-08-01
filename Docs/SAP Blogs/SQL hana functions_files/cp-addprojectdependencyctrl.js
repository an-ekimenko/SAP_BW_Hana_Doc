cpControllers.controller('ModalAddProjectDependencyCtrl', ['$scope', 
                                                   function($scope) {
		    
    
    $scope.addProjectDependency = function(dependency) {
    	
    	
    	var contains = false;
    	for (var index = 0; index < $scope.project.data.dependencies.length; ++index) {
    	    var value = $scope.project.data.dependencies[index];
    	    if(value==dependency) {
    	    	contains = true;
    	    	break;
    	    }
    	}
    	
    	if(dependency && !contains) {
    		$scope.project.data.dependencies.push(dependency);
    	}    	
    };
}]);