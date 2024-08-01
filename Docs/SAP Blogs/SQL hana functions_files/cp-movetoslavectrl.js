cpControllers.controller('ModalMoveToSlaveCtrl', ['$scope', 'userSharedService', 'moveToSlaveService',
                                                  function($scope, sharedService, moveToSlaveService) {

	$scope.deliverables = sharedService.deliverableList;
	$scope.canSave = false;
	$scope.indexerId = null;
	$scope.saved = false;

	$scope.save = function () {
		if ($scope.indexerId == null) {
			alert("Please fill Indexer ID!");
		}

		moveToSlaveService.updateIndexerId({
			deliverableIds: getDeliverableIds().toString(),
			indexerId: $scope.indexerId
		}, function (response) {
			// success handler
			$scope.saved = true;
		}, function (error) {
			// error handler
		})
	}

	function getDeliverableIds() {
		var deliverables = $scope.deliverables,
			result = [];

		for (var i = 0; i < deliverables.length; i++) {
			result.push(deliverables[i].id);
		}

		return result;
	}
}]);