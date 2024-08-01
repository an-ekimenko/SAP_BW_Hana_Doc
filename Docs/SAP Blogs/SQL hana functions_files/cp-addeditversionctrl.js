cpControllers.controller('ModalAddEditVersionCtrl', ['$scope',  'userSharedService', '$cookies', 'productService','versionService',
                                                   function($scope,  sharedService, $cookies, productService, versionService) {
	$scope.title = '';
	$scope.deliverable = {};

	$scope.editVersionName = true;
	$scope.editVersionSAPID = true;
	
	var sapuacpuserfirstname = $cookies.get("sapuacpuserfirstname"),
		sapuacpuserlastname = $cookies.get("sapuacpuserlastname"),
		sapuacpuserid = $cookies.get("sapuacpuserid");

	if ($scope.pageType) {
		if ($scope.pageType == 'newVersion') {
			$scope.newVersion = true;
			$scope.title = 'Create Version';
		} else if ($scope.pageType == 'editVersion') {
			$scope.editVersion = true;
			$scope.title = 'Edit Version';
		} 
	}
	
	$scope.deliverable.product = '';
	$scope.deliverable.productName='';
	$scope.deliverable.version = '';
	$scope.deliverable.versionName = '';
	$scope.deliverable.version_sapid = '';

	if (!$scope.newVersion) {
		angular.copy(sharedService.deliverable, $scope.deliverable);
	}

	$scope.user = {
			firstName:  sapuacpuserfirstname,
			lastName: sapuacpuserlastname,
			userId: sapuacpuserid
	}
	
	$scope.editVersionNameClicked = function () {
		document.getElementById("version-name").focus();
		$scope.editVersionName = false;
	}
	
	$scope.editVersionSAPIDClicked = function () {
		document.getElementById("version-sapid").focus();
		$scope.editVersionSAPID = false;
	}
	
	$scope.edit = function () {
		var validationMessage = validate();

		if (validationMessage.status == 'OK') {
			versionService.editVersion({
				product: $scope.deliverable.product,
	            version: $scope.deliverable.version,
	            versionName: $scope.deliverable.versionName,
	            version_sapid: $scope.deliverable.version_sapid,						            
	            deliverable_id: $scope.deliverable.id
	            }, function(data) {
	                if (data.status == 'OK') {
	                	$scope.ok = true;
	                    $scope.notok = false;
	                    $scope.statusOKMessage = "Saved";
	                }
	                else if (data.status == 'ERROR') {
	                    $scope.ok = false;
	                    sharedService.errorHandler(data);
	                }
	            });
		} else {
			alert(validationMessage.message);
		}
	}

	$scope.create = function () {
		var validationMessage = validate();

		if (validationMessage.status == 'OK') {
			versionService.createVersion({
				product: $scope.deliverable.product.product,
				version: $scope.deliverable.version,
				versionName: $scope.deliverable.versionName,
				version_sapid: $scope.deliverable.version_sapid
	            }, function(data) {
	                if (data.status == 'OK') {
	                    $scope.ok = true;
	                    $scope.notok = false;
	                    $scope.statusOKMessage = "Saved";
	                }
	                else if (data.status == 'ERROR') {
	                    $scope.ok = false;
	                    sharedService.errorHandler(data);
	                }
                });
		} else {
			alert(validationMessage.message);
		}
	}
	
	$scope.products = productService.getProductNames({
	},
    function (data) {
        // success handler
    },
    function(error) {
        // error handler
        sharedService.errorHandler(error);
    });
	
	$scope.selectProduct = function (product) {
		$('#product-input').val(product.name);
		$('#product-input').dropdown('toggle');
	}

	function validate() {
		var product = $scope.deliverable.product,
			version = $scope.deliverable.version
			versionName = $scope.deliverable.versionName;

		if (product == '' ||
			version == '') {
			return {
				status: 'Error',
				message: 'Please fill the required fields!'
			}
		} else if ($scope.newVersion && !product.product) {
			return {
				status: 'Error',
				message: 'Invalid product!'
			}
		} else {
			return {
				status: 'OK'
			}
		}
	}

}]);