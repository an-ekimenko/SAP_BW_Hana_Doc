cpControllers.controller('ModalSearchOptionsCtrl', ['$scope', 'searchOptionsService', 'userSharedService',
                                                   function($scope, searchOptionsService, sharedService) {

	$scope.saved = false;
	$scope.deliverables = sortDeliverablesById(sharedService.deliverableList);

	$scope.editSearchVisibility = function (deliverable) {
		if (deliverable.notSearchableFromOutside == 0) {
			deliverable.notSearchableFromOutside = 1
		} else {
			deliverable.notSearchableFromOutside = 0;
		}
	}

	$scope.save = function () {
		var ids = [],
			values = [];

		populateData(ids, values);

		searchOptionsService.updateSearchOptions({
			deliverableIds: ids.toString(),
			searchOptionValues: values.toString()
		}, function(response) {
			$scope.saved = true;
		}, function(error) {
			// error handler
	        sharedService.errorHandler(response.data);
		});
	}

	function populateData(ids, values) {
		var deliverable = undefined,
			deliverables = $scope.deliverables;

		for (var i = 0; i < deliverables.length; i++) {
			deliverable = deliverables[i];
			ids.push(deliverable.id);
			values.push(deliverable.notSearchableFromOutside);
		}
	}

	function sortDeliverablesById(deliverables) {
		return deliverables.sort(function(deliv1, deliv2) {
			return deliv1.id - deliv2.id;
		})
	}
}]);