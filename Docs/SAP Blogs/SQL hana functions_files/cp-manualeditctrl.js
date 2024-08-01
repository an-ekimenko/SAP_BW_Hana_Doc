cpControllers.controller('ModalManualEditCtrl', ['$scope', 'manualOperationsService', 'userSharedService', '$cookies', 'projectService', 'productService', 'versionService', 'rfc4122', 'languageService',
                                                   function($scope, manualOperationsService, sharedService, $cookies, projectService, productService, versionService, rfc4122, languageService) {

	$scope.firstPage = true;
	$scope.secondPage = false;
	$scope.thirdPage = false;
	$scope.multipleDeliverables = false;
	$scope.MULTIPLE_VALUES = "<MULTIPLE-VALUES>";
	$scope.canSave = false;
	$scope.categories = [];
	$scope.versions = [];
	$scope.languages = languageService.getSecondaryLanguages();
	$scope.modified = {};

	$scope.metadata = {
			title: '',
			description: '',
			projectName: '',
			productId: '',
			versionName: '',
			category: '',
			language: '',
			contentWeight: ''
	};

	if (sharedService.deliverableList.length > 1) {
		$scope.multipleDeliverables = true;
		$scope.deliverables = sharedService.deliverableList;
	} else {
		$scope.deliverable = sharedService.deliverableList[0];
	}

	init();

	var sapuacpuserfirstname = $cookies.get("sapuacpuserfirstname"),
		sapuacpuserlastname = $cookies.get("sapuacpuserlastname"),
		sapuacpuserid = $cookies.get("sapuacpuserid");

	$scope.flags = {
			title: true,
			description: true,
			product_input: true,
			version_input: true,
			project_input: true,
			versionButton: $scope.multipleDeliverables ? false : true,
			category: true,
			language: true,
			content_weight: true
	}

	function init() {
		var multiple = $scope.multipleDeliverables,
			deliv = $scope.deliverable;

		$scope.metadata.title = !multiple ? deliv.title : $scope.MULTIPLE_VALUES;
		$scope.metadata.description = !multiple ? deliv.shortdesc : $scope.MULTIPLE_VALUES;
		$scope.metadata.productId = !multiple ? {
			product: deliv.product,
			name: deliv.productName
		} : $scope.MULTIPLE_VALUES;
		$scope.metadata.versionName = !multiple ? deliv.version : $scope.MULTIPLE_VALUES;
		$scope.metadata.projectName = !multiple ? deliv.projectName : $scope.MULTIPLE_VALUES;
		$scope.metadata.category = !multiple ? deliv.documentType : $scope.MULTIPLE_VALUES;
		$scope.metadata.language = !multiple ? deliv.locale : $scope.MULTIPLE_VALUES;
		$scope.metadata.contentWeight = !multiple ? deliv.weight : -1;

		if (!multiple) {
			initVersions();
		} else {
			$scope.languages.unshift({
				code:$scope.MULTIPLE_VALUES,
				native: $scope.MULTIPLE_VALUES
			});
		}
	}

	$scope.edit = function (field) {
		if ($scope.multipleDeliverables) {
			if (field == 'language') {
				$scope.languages.shift();
			}
			if (field == 'description') {
				$scope.metadata.description = '';
			}
			if (field == 'category') {
				$scope.categories.pop();
				$scope.metadata.category = $scope.categories[0];
			}

			$('#' + field).val('');
		}

		if (field == 'product_input') {
			$('#' + field).val('');
		}

		$scope.flags[field] = !$scope.flags[field];
		$scope.canSave = true;
	}

	$scope.undo = function (field) {
		$scope.flags[field] = !$scope.flags[field];
		
		var meta = $scope.metadata,
			deliv = $scope.deliverable,
			multiple = $scope.multipleDeliverables;
		switch (field) {
			case "title":
				if (!multiple) {
					meta.title = deliv.title;
				} else {
					$('#' + field).val($scope.MULTIPLE_VALUES);
				}
				break;
			case "description":
				meta.description = !multiple ? deliv.shortdesc : $scope.MULTIPLE_VALUES;
				break;
			case "project_input":
				meta.projectName = !multiple ? deliv.projectName : $scope.MULTIPLE_VALUES;
				break;
			case "product_input":
				if (!multiple) {
					$('#' + field).val(deliv.productName + ' (ID: ' + deliv.product + ')');
					meta.productId = {
							product: deliv.product,
							name: deliv.productName
					}
					meta.versionName = deliv.version;
					$scope.flags.version_input = true;
					initVersions();
				} else {
					$('#' + field).val($scope.MULTIPLE_VALUES);
					meta.versionName = $scope.MULTIPLE_VALUES;
					meta.productId = $scope.MULTIPLE_VALUES;
				}
				break;
			case "version_input":
				meta.versionName = !multiple ? deliv.version : $scope.MULTIPLE_VALUES;
				$scope.flags.versionButton = true;
				break;
			case "category":
				if (!multiple) {
					meta.category = deliv.documentType;
				} else {
					meta.category = $scope.MULTIPLE_VALUES
					$scope.categories.push($scope.MULTIPLE_VALUES);
				}
				break;
			case "language":
				if (!multiple) {
					meta.language = deliv.locale;
				} else {
					meta.language = $scope.MULTIPLE_VALUES;
					$scope.languages.unshift({code:$scope.MULTIPLE_VALUES, native: $scope.MULTIPLE_VALUES});
				}
				break;
			case "content_weight":
				meta.contentWeight = !multiple ? deliv.weight : $scope.MULTIPLE_VALUES;
				break;
		}
	}

	$scope.projects = projectService.getProjectNames({
	}, 
    function (data) {
        // success handler
    },
    function(error) {
        // error handler
        sharedService.errorHandler(error);
    });

	$scope.products = productService.getProductNames({
		rnd: new Date().getTime()
	},
    function (data) {
        // success handler
    },
    function(error) {
        // error handler
        sharedService.errorHandler(error);
    });

	// get categories from backend
	manualOperationsService.getCategories({
		//
	}, function(response) {
		var categories = response.data;
		categories.unshift('');
		$scope.categories = categories;
		setupCategory();
	}, function(error) {
		// error handler
        sharedService.errorHandler(response.data);
	});

	$scope.selectProject = function (project) {
		$('#project-input').val(project);
		$('#project-input').dropdown('toggle');
	}

	$scope.selectProduct = function (product) {
		$('#product-input').val(product.name);
		$('#product-input').dropdown('toggle');
		$scope.initVersions();
	}

	$scope.selectVersion = function (version) {
		$('#version-input').val(version.name);
		$('#version-input').dropdown('toggle');
	}

	$scope.selectCategory = function (category) {
		$('#category').val(category);
		$('#category').dropdown('toggle');
	}

	$scope.showFirst = function () {
		$scope.firstPage = true;
		$scope.secondPage = false;
		$scope.thirdPage = false;
	}

	$scope.showSecond = function () {
		if (!isEdited()) {
			alert('There are no changes!');
			return;
		}

		var validationMessage = validate($scope.metadata);

		if (validationMessage.status != 'OK') {
			alert(validationMessage.message);
			return;
		}

		$scope.modified = createModificationObject();

		$scope.firstPage = false;
		$scope.secondPage = true;
		$scope.thirdPage = false;
	}

	$scope.showThird = function () {
		$scope.firstPage = false;
		$scope.secondPage = false;
		$scope.thirdPage = true;
	}

	$scope.save = function () {
		var deliverableIds = getDeliverableIds(),
			meta = prepareMetadata();

		manualOperationsService.updateMetadata({
			deliverableIds: deliverableIds.toString(),
			metadata: JSON.stringify(meta)
		}, function(response) {
			$scope.showThird();
		}, function(error) {
			// error handler
			$scope.canSave = false;
	        sharedService.errorHandler(error);
		});
	}

	function isEdited() {
		var meta = $scope.metadata,
			deliv = $scope.deliverable;

		if (!$scope.multipleDeliverables) {
			if (meta.title != deliv.title ||
				meta.description != deliv.shortdesc ||
				meta.productId.product != deliv.product ||
				meta.versionName != deliv.version ||
				meta.projectName != deliv.projectName ||
				meta.category != deliv.documentType ||
				meta.language != deliv.locale ||
				meta.contentWeight != deliv.weight) {
				return true;
			}
		} else {
			if (meta.title != $scope.MULTIPLE_VALUES ||
				meta.description != $scope.MULTIPLE_VALUES ||
				meta.productId != $scope.MULTIPLE_VALUES ||
				meta.versionName != $scope.MULTIPLE_VALUES ||
				meta.projectName != $scope.MULTIPLE_VALUES ||
				meta.category != $scope.MULTIPLE_VALUES ||
				meta.language != $scope.MULTIPLE_VALUES ||
				meta.contentWeight != $scope.MULTIPLE_VALUES) {
				return true;
			}
		}

		return false;
	}

	function validate(meta) {
		if (!$scope.multipleDeliverables) {
			if (meta.title === '' ||
				meta.productId === '' ||
				meta.versionName === '' ||
				meta.projectName === '' ||
				meta.contentWeight === null) {
				return {
					status: 'Error',
					message: 'Please fill the empty fields!'
				};
			}
			if (!meta.productId.product) {
				return {
					status: 'Error',
					message: 'Invalid product!'
				};
			} else if (!isVersionValid(meta)) {
				return {
					status: 'Error',
					message: 'Invalid version!'
				};
			} else if (meta.contentWeight === undefined) {
				return {
					status: 'Error',
					message: 'Content weight value should be in the [0,100] range!'
				};
			}
		} else {
			if (meta.title == '') {
				return {
					status: 'Error',
					message: 'Title can\'t be empty!'
				};
			}
			if (meta.productId != $scope.MULTIPLE_VALUES) {
				if (meta.productId == '') {
					return {
						status: 'Error',
						message: 'Product can\'t be empty!'
					};
				} else if (!meta.productId.product) {
					return {
						status: 'Error',
						message: 'Invalid product!'
					};
				} else if (meta.versionName == $scope.MULTIPLE_VALUES ||
					meta.versionName == '' ||
					!isVersionValid(meta)) {
					return {
						status: 'Error',
						message: 'Invalid version!'
					};
				}
			}
		}

		return {
			status: 'OK'
		}
	}

	function isVersionValid(meta) {
		var versions = $scope.versions.data;

		for (var i = 0; i < versions.length; i++) {
			var version = versions[i];
			if (meta.versionName == version.version) {
				return true;
			}
		}

		return false;
	}

	function isValidProject(meta) {
		
	}

	function createModificationObject() {
		var modificationObject = {},
			meta = $scope.metadata,
			multiple = $scope.multipleDeliverables;

		if (!multiple) {
			var deliv = $scope.deliverable
			if (meta.title != deliv.title) {
				modificationObject.title = meta.title;
			}
			if (meta.description != deliv.shortdesc) {
				modificationObject.description = meta.description;
			}
			if (meta.productId.product != deliv.product) {
				modificationObject.product = meta.productId.name;
			}
			if (meta.versionName != deliv.version) {
				modificationObject.version = getVersionName();
			}
			if (meta.projectName != deliv.projectName) {
				modificationObject.project = meta.projectName;
			}
			if (meta.category != deliv.documentType) {
				modificationObject.category = meta.category;
			}
			if (meta.language != deliv.locale) {
				modificationObject.language = getLanguageLabel();
			}
			if (meta.contentWeight != deliv.weight) {
				modificationObject.contentWeight = meta.contentWeight;
			}
		} else {
			var multi = $scope.MULTIPLE_VALUES;
			if (meta.title != multi) {
				modificationObject.title = meta.title;
			}
			if (meta.description != multi) {
				modificationObject.description = meta.description;
			}
			if (meta.productId.product != multi) {
				modificationObject.product = meta.productId.name;
			}
			if (meta.versionName != multi) {
				modificationObject.version = getVersionName();
			}
			if (meta.projectName != multi) {
				modificationObject.project = meta.projectName
			}
			if (meta.category != multi) {
				modificationObject.category = meta.category;
			}
			if (meta.language != multi) {
				modificationObject.language = getLanguageLabel();
			}
			if (meta.contentWeight != -1) {
				modificationObject.contentWeight = meta.contentWeight;
			}
		}

		return modificationObject;
	}

	function getVersionName() {
		var versions = $scope.versions.data,
			version = $scope.metadata.versionName;

		for (var i = 0; i < versions.length; i++) {
			var current = versions[i];
			if (current.version == version) {
				return current.name;
			}
		}
	}

	function getLanguageLabel() {
		var languages = $scope.languages,
			language = $scope.metadata.language;

		for (var i = 0; i < languages.length; i++) {
			var current = languages[i];
			if (current.code == language) {
				return current.native;
			}
		}
	}

	function getDeliverableIds() {
		var deliverableIds = [];
		if ($scope.multipleDeliverables) {
			for (var i = 0; i < $scope.deliverables.length; i++) {
				deliverableIds.push($scope.deliverables[i].id);
			}
		} else {
			deliverableIds.push($scope.deliverable.id);
		}

		return deliverableIds;
	}

	function initVersions() {
		var product;

		if ($scope.multipleDeliverables) {
			product = $scope.metadata.productId.product;
		} else {
			product = $scope.metadata.productId.product ?
					$scope.metadata.productId.product : $scope.deliverable.product;
		}

		$scope.versions = versionService.getVersionNames({
			product: product,
			rnd: new Date().getTime()
		},
	    function (data) {
	        // success handler
			var numberOfVersions = $scope.versions.data.length;
			if (numberOfVersions == 1) {
				var version = $scope.versions.data[0];
				$scope.metadata.versionName = version.version;
				$scope.flags.version_input = true;
				$scope.flags.versionButton = false;
			} else if (numberOfVersions > 1) {
				$scope.flags.versionButton = true;
			} else {
				$scope.flags.versionButton = false;
				alert('No version available for product id: ' + product + ' , please create a version first!');
			}
	    },
	    function(error) {
	        // error handler
	        sharedService.errorHandler(error);
	    });
	}

	$scope.initVersions = initVersions;

	function setupCategory() {

		for (var i = 0; i < $scope.categories.length; i++) {
			var category = $scope.categories[i];
			if (category == $scope.metadata.category) {
				return;
			}
		}

		$scope.categories.push($scope.metadata.category);
	}

	function prepareMetadata() {
		var meta = $scope.metadata;
		var result = {
				title: undefined,
				description: undefined,
				productId: undefined,
				versionId: undefined,
				projectName: undefined,
				category: undefined,
				language: undefined,
				contentWeight: undefined
		};

		if (!$scope.multipleDeliverables) {
			var deliv = $scope.deliverable;

			if (meta.title != deliv.title) {
				result.title = encodeURIComponent(meta.title);
			}
			if (meta.description != deliv.shortdesc) {
				result.description = encodeURIComponent(meta.description);
			}
			if (meta.productId.product) {
				result.productId = meta.productId.product; 
			}
			if (meta.versionName != deliv.version) {
				result.versionId = meta.versionName;
			}
			if (meta.projectName != deliv.projectName) {
				result.projectName = meta.projectName;
			}
			if (meta.category != deliv.documentType) {
				result.category = meta.category;
			}
			if (meta.language != deliv.locale) {
				result.language = meta.language;
			}
			if (meta.contentWeight != deliv.weight) {
				result.contentWeight = meta.contentWeight;
			}
		} else {
			for (field in meta) {
				if (meta[field] != $scope.MULTIPLE_VALUES) {
					if (field == 'title' || field == 'description') {
						result[field] = encodeURIComponent(meta[field]);
					} else if (field == 'productId') {
						result[field] = meta[field].product;
					} else if (field == 'versionName') {
						result['versionId'] = meta[field];
					} else if (field == 'contentWeight' && meta[field] === -1) {
						result[field] = undefined;
					} else {
						result[field] = meta[field];
					}
				}
			}
		}

		return result;
	}
}]);