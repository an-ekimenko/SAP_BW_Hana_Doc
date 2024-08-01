cpControllers.controller('ModalAddEditProductCtrl', ['$scope',  'userSharedService', '$cookies', 'productService',
                                                   function($scope,  sharedService, $cookies, productService) {
	$scope.title = '';
	$scope.product = {};
	$scope.product.productId = '';
	$scope.product.productName = '';
	$scope.product.product_sapid = '';
	$scope.product.alternateName = '';
	$scope.product.showVersionName = 0;
	$scope.product.multipleVersions = false;

	$scope.editProductName = true;
	$scope.editProductSAPID = true;

	$scope.ok = false;
    $scope.notok = false;
    $scope.statusOKMessage;
    $scope.statusNOTOKMessage;

    var deleteList = [],
    	alternateNamesList = [];

	var sapuacpuserfirstname = $cookies.get("sapuacpuserfirstname"),
		sapuacpuserlastname = $cookies.get("sapuacpuserlastname"),
		sapuacpuserid = $cookies.get("sapuacpuserid");

	if ($scope.pageType) {
		if ($scope.pageType == 'newProduct') {
			$scope.newProduct = true;
			$scope.title = 'Create Product';
		} else if ($scope.pageType == 'editProduct') {
			$scope.editProduct = true;
			$scope.title = 'Edit Product';
		}
	}

	if (!$scope.newProduct) {
		productService.getProductData({
			product: sharedService.deliverable.product
		}, function(response) {
			// success handler
			if (response.data) {
				$scope.product = response.data;
			}
		}, function(error) {
			// error handler
			sharedService.errorHandler(error);
		});
	}

	$scope.user = {
			firstName:  sapuacpuserfirstname,
			lastName: sapuacpuserlastname,
			userId: sapuacpuserid
	}
	
	$scope.edit = function () {
		var validationMessage = validate();
		var productName = $scope.product.productName;
		var productId = $scope.product.productId;
		var alternateNameListString = alternateNamesList.toString();
		var deleteListString = deleteList.toString();
		var productSapId = $scope.product.product_sapid;
		var showVersionName = $scope.product.showVersionName;
		
		if (alternateNamesList.length == 0) {
			alternateNameListString = undefined;
		}
		
		if (deleteList.length == 0) {
			deleteListString = undefined;
		}
		
		if (validationMessage.status == 'OK') {
			
			productService.editProduct({
	            product: productId,
	            product_name: productName,
	            product_sapid: productSapId,
	            alternate_names: alternateNameListString,
	            delete_list: deleteListString,
	            show_version_name: showVersionName
		    }, function(data) {
	            if (data.status == 'OK') {
	                $scope.ok = true;
	                $scope.statusOKMessage = "Saved";
	            }
	            else if (data.status == 'ERROR') {
	                sharedService.errorHandler(data);
	            }
	        });
		} else {
			alert(validationMessage.status);
		}
	}

	$scope.create = function () {
		var validationMessage = validate();

		if (validationMessage.status == 'OK') {
			productService.createProduct({
	            product: $scope.product.productId,
	            product_name: $scope.product.productName,
	            product_sapid: $scope.product.product_sapid
	        }, function(data) {
                if (data.status == 'OK') {
                    $scope.ok = true;
                    $scope.statusOKMessage = "Saved";
                }
                else if (data.status == 'ERROR') {
                    sharedService.errorHandler(data);
                }
            });
		} else {
			alert(validationMessage.message);
		}
	}

	$scope.editProductNameClicked = function () {
		document.getElementById("product-name").focus();
		$scope.editProductName = false;
	}
	
	$scope.editProductSAPIDClicked = function () {
		document.getElementById("product-sapid").focus();
		$scope.editProductSAPID = false;
	}

	function validate() {
		var product = $scope.product.productId,
			productName = $scope.product.productName;

		if (product == '') {
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

	$scope.addAlternativeName = function() {
		var name = $scope.product.alternateName;

		if (isAlternateNameValid(name)) {

			alternateNamesList.push(name);

			$scope.product.alternateNames.push({
				id: undefined,
				name: name
			});

			$scope.product.alternateName = "";
		} else {
			// display error
		}
	}

	$scope.deleteAlternativeName = function(altName) {
		var names = $scope.product.alternateNames;

		for (var i = 0; i < names.length; i++) {
			var current = names[i];

			if (current.name == altName.name) {
				names.splice(i, 1);
			}
		}

		if (altName.id) {
			deleteList.push(altName.id);
		}
	}

	function isAlternateNameValid(name) {
		var names = $scope.product.alternateNames;

		if (name == '') {
			return false;
		}

		if (names) {
			for (var i = 0; i < names.length; i++) {
				var current = names[i];

				if (current.name == name) {
					return false;
				}
			}
		}

		return true;
	}
}]);