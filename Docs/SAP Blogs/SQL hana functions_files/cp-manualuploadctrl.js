cpControllers.controller('ModalManualUploadCtrl', ['$scope', 'manualOperationsService', 'userSharedService', '$cookies', 'projectService', 'productService', 'versionService', 'rfc4122', 'languageService',
                                                   function($scope, manualOperationsService, sharedService, $cookies, projectService, productService, versionService, rfc4122, languageService) {

	$scope.firstPage = true;
	$scope.secondPage = false;
	$scope.thirdPage = false;
	$scope.pageTitle = '';
	var MANUAL_UPLOAD_PROJECT = 'Manual_upload';
	$scope.file = null;
	$scope.languages = languageService.getSecondaryLanguages();
	$scope.categories = [];
	$scope.versions = [];
	$scope.formats = [{name: 'custom-html', val:'custom-html'}, 
	                  {name: 'PDF', val: 'pdf'},
	                  {name: 'ZIP', val: 'zip'}];

	$scope.metadata = {
			title: '',
			description: '',
			projectName: '',
			productId: '',
			versionName: '',
			category: '',
			language: 'en-US',
			transtype: 'custom-html',
			contentWeight: '',
			rootPage: '',
			owner: '',
			build: '1',
			outputId: '',// add 'meta' infront
			mapId: '',//buildablemap
	};

	var sapuacpuserfirstname = $cookies.get("sapuacpuserfirstname"),
		sapuacpuserlastname = $cookies.get("sapuacpuserlastname"),
		sapuacpuserid = $cookies.get("sapuacpuserid");

	if ($scope.pageType) {
		if ($scope.pageType == 'newDeliverable') {
			$scope.newDeliverable = true;
			$scope.pageTitle = 'New Deliverable';
		} else if ($scope.pageType == 'newRevision') {
			$scope.newRevision = true;
			$scope.pageTitle = 'New Revision';
		} else if ($scope.pageType == 'newVersion') {
			$scope.newVersion = true;
			$scope.pageTitle = 'New Version';
		} else if ($scope.pageType == 'newTranslation') {
			$scope.newTranslation = true;
			$scope.pageTitle = 'New Translation';
		} else if ($scope.pageType == 'newFormat') {
			$scope.newFormat = true;
			$scope.pageTitle = 'New Format';
		}
	}

	$scope.flags = {
			title: 
				!$scope.newDeliverable ? true : false,
			description: 
				!$scope.newDeliverable ? true : false,
			product_input: 
				!$scope.newDeliverable ? true : false,
			version_input: 
				true,
			versionButton: false,
			category: 
				!$scope.newDeliverable ? true : false,
			language: 
				!$scope.newDeliverable && !$scope.newTranslation ? true : false,
			transtype: 
				!$scope.newDeliverable && !$scope.newFormat ? true : false,
			owner: 
				!$scope.newDeliverable ? true : false,
	}

	if ($scope.newDeliverable) {
		$scope.metadata.outputId = rfc4122.v4().replace(/-/g, '');
		$scope.metadata.mapId = rfc4122.v4().replace(/-/g, '');
		$scope.metadata.owner = sapuacpuserid;
	} else {
		$scope.deliverable = sharedService.deliverable;
		populateMetadata();
		initVersions();
		filterValues();
	}

	$scope.edit = function (field) {
		$scope.flags[field] = !$scope.flags[field];

		if (field == 'product_input') {
			$('#' + field).val('');
		}
	}

	$scope.undo = function (field) {
		var meta = $scope.metadata,
			deliv = $scope.deliverable;
		$scope.flags[field] = !$scope.flags[field];

		switch (field) {
			case "title":
				meta.title = deliv.title;
				break;
			case "description":
				meta.description = deliv.shortdesc
				break;
			case "projectName":
				break;
			case "product_input":
				$('#' + field).val(deliv.productName + ' (ID: ' + deliv.product + ')');
				meta.versionName = deliv.version;

				$scope.flags.version_input = true;
				initVersions();
				break;
			case "version_input":
				meta.versionName = deliv.version;
				$scope.flags.versionButton = true;
				break;
			case "category":
				meta.category = deliv.documentType
				break;
			case "language":
				meta.language = deliv.locale;
				break;
			case "transtype":
				break;
			case "content_weight": 
				meta.contentWeight = deliv.weight;
				break;
		}
	}

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
	
	//get project names from backend
	$scope.projects = projectService.getAllProjectNames({
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

	$scope.selectProduct = function (product) {
		$('#product_input').val(product.name);
		$('#product_input').dropdown('toggle');
		$('#version_input').val('');
		$scope.initVersions();
	}
	
	$scope.selectProject = function(projectName){
		$('#project_input').val(projectName.name);
		$('#project_input').dropdown('toggle');
		$scope.metadata.projectName = projectName.name;
	}

	$scope.selectVersion = function (version) {
		$('#version_input').val(version.name);
		$('#version_input').dropdown('toggle');
	}

	$scope.selectCategory = function (category) {
		$('#category').val(category);
		$('#category').dropdown('toggle');
	}

	$scope.takeOwnership = function () {
		$scope.metadata.owner = sapuacpuserid;
		$scope.flags.owner = false;
	}

	$scope.uploadFile = function (event) {
		var file = event.target.files[0]; // get files from input
		$scope.errorMessage = "";
		$scope.file = undefined;

		if (!isValidFileFormat(file)) {
			$scope.errorMessage = "Please select a valid file!";
			return;
		}

		$scope.file = file;
		$scope.metadata.rootFile = $scope.file.name;
	};

	$scope.upload = function () {
		$scope.uploadedFiles = true;
		var fd,	status,
			meta = prepareMetadata();

        fd = new FormData();

	    fd.append("metadata", JSON.stringify(meta));
		fd.append("file", $scope.file);

		var xhr = new XMLHttpRequest();
		xhr.addEventListener("load", uploadSuccess, false);
		xhr.addEventListener("abort", uploadCanceled, false);
		xhr.open("POST", "/http.svc/manual_upload");
		xhr.send(fd);
	}

	function uploadSuccess(evt) {
		if (evt.target.response.indexOf('Error') > 0) {
			// trying to upload format different than 'zip' and 'pdf'
			uploadFailed(evt);
		} else {
			var json = JSON.parse(evt.target.response);

			if (json.data) {
				$scope.deliverableId = json.data.deliverableId;
				$scope.importJobId = json.data.importJobId;
				$scope.showThird(); // file is uploaded
			} else {
				uploadFailed(evt);
			}
		}
	}

	function uploadFailed(evt) {
		var response = evt.target.response;

		if (response.indexOf('root page') > 0) {
			$scope.errorMessage = JSON.parse(response).message;
			return;
		}

		$scope.errorMessage = "There was an error attempting to upload the file.";
	};

	function uploadCanceled(evt) {
		$scope.$apply(function(){
			$scope.progressVisible = false;
		})
		alert("The upload has been canceled by the user or the browser dropped the connection.");
	};

	$scope.showFirst = function () {
		$scope.firstPage = true;
		$scope.secondPage = false;
		$scope.thirdPage = false;
	}

	$scope.showSecond = function () {
		var validationMessage = validate();

		if (validationMessage.status != 'Error') {
			$scope.metadata.transtype.indexOf('pdf') > -1 ?
					$scope.isPDF = true : $scope.isPDF = false;
			$scope.firstPage = false;
			$scope.secondPage = true;
			$scope.thirdPage = false;

			$scope.errorMessage = "";
			// $scope.file = undefined;
			// $("#file").val("");
		} else {
			alert(validationMessage.message);
		}
	}

	$scope.showThird = function () {
		$scope.firstPage = false;
		$scope.secondPage = false;
		$scope.thirdPage = true;
	}

	function populateMetadata(deliverable) {
		var deliverable = $scope.deliverable;
		$scope.metadata.title = 
			deliverable.title ? deliverable.title : '';
		$scope.metadata.description = 
			deliverable.shortdesc ? deliverable.shortdesc : '';
		$scope.metadata.projectName = 
			deliverable.projectName ? deliverable.projectName : '';
		$scope.metadata.productId = 
			deliverable.product ? {
				product: deliverable.product,
				name: deliverable.productName
		} : '';
		$scope.metadata.versionName = 
			deliverable.version ? deliverable.version : '';
		$scope.metadata.category = 
			deliverable.documentType ? deliverable.documentType : '';
		if ($scope.newTranslation) {
			$scope.metadata.language = '';
		} else {
			$scope.metadata.language = 
				deliverable.locale ? deliverable.locale : '';
		}
		if (!$scope.newFormat) {
			$scope.metadata.transtype = 
				deliverable.transtype ? deliverable.transtype : '';
		}
		$scope.metadata.build =
			deliverable.build ? deliverable.build + 1 : '1';
		if ($scope.newFormat) {
			$scope.metadata.rootPage = '';
		} else {
			$scope.metadata.rootPage = 
				deliverable.rootPage ? deliverable.rootPage : '';
		}
		$scope.metadata.contentWeight = deliverable.weight;
		$scope.metadata.owner = 
			deliverable.author ? deliverable.author : '';
		if ($scope.newFormat) {
			$scope.metadata.outputId = rfc4122.v4().replace(/-/g, '');
		} else {
			$scope.metadata.outputId =
				deliverable.loio ? deliverable.loio : '';
		}

		$scope.metadata.mapId =
			deliverable.buildableMapLOIO ? deliverable.buildableMapLOIO : '';
	}

	function filterValues() {
		var deliv = $scope.deliverable;

		if ($scope.newTranslation) {
			var lang = deliv.locale,
				languages = $scope.languages;

			for (var i = 0; i < languages.length; i++) {
				if (lang == languages[i].code) {
					languages.splice(i, 1);
					return;
				}
			}
		}

		if ($scope.newFormat) {
			var format = deliv.transtype,
				formats = $scope.formats;

			for (var i = 0; i < formats.length; i++) {
				if (format == formats[i].val) {
					formats.splice(i, 1);
				}
			}
		}
	}

	function filterVersions() {
		var deliv = $scope.deliverable;

		if ($scope.newVersion) {
			var versions = $scope.versions.data,
				version = deliv.version;

			for (var i = 0; i < versions.length; i++) {
				if (version == versions[i].version) {
					versions.splice(i, 1);
					return;
				}
			}
		}
	}

	var prepareMetadata = function() {
		var meta = angular.copy($scope.metadata, meta);

		meta.productId = meta.productId.product;
		
		meta.versionId = meta.versionName;
		delete meta.versionName;
		
		var transtype = meta.transtype;

		if (transtype.indexOf('pdf') > -1 || transtype == 'zip') {
        	meta.rootPage = meta.rootFile;
        }

		if (meta.contentWeight === '') {
			meta.contentWeight = undefined;
		}

		return meta;
	}

	function setupCategory() {

		for (var i = 0; i < $scope.categories.length; i++) {
			var category = $scope.categories[i];
			if (category == $scope.metadata.category) {
				return;
			}
		}

		$scope.categories.push($scope.metadata.category);
	}

	function initVersions() {
		var product = $scope.newDeliverable ? 
				$scope.metadata.productId.product : $scope.deliverable.product;

		$scope.versions = versionService.getVersionNames({
			product: product,
			rnd: new Date().getTime()
		},
	    function (data) {
	        // success handler
			if ($scope.versions.data.length == 1) {
				var version = $scope.versions.data[0];
				$scope.metadata.versionName = version.version;
				$scope.flags.version_input = true;
				$scope.flags.versionButton = false;
				return;
			} else if (($scope.newVersion || $scope.newDeliverable)
					&& data.data.length > 1) {
				var version = $scope.versions.data[0];
				$scope.metadata.versionName = version.version;
				$scope.flags.version_input = false;
			}
			if ($scope.newVersion) {
				filterVersions();
			}
	    },
	    function(error) {
	        // error handler
	        sharedService.errorHandler(error);
	    });
	}

	$scope.initVersions = initVersions;

	var validate = function () {
		var meta = $scope.metadata;

		if (meta.title == '' ||
			meta.productId == '' ||
			meta.versionName == '' ||
			meta.language == '' ||
			meta.projectName == '' ||
			(meta.transtype == 'custom-html' && !meta.rootPage)) {
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
		}

		return {
			status: 'OK'
		}
	}

	function isValidFileFormat(file) {
		var transtype = $scope.metadata.transtype,
			fileType = file.type.toLowerCase(),
			fileName = file.name.toLowerCase();

		if (fileType !== "") {
			if (transtype == "pdf" || transtype == "pdf.sap") {
				if (fileType != "application/pdf") {
					return false;
				}
			} else if (fileType.indexOf("7z") < 0 &&
					fileType.indexOf("zip") < 0 &&
					fileType.indexOf("rar") < 0) {
				return false;
			}
		} else {
			if (transtype == "pdf" || transtype == "pdf.sap") {
				if (fileName.indexOf(".pdf") < 0) {
					return false;
				}
			} else if (fileName.indexOf(".7z") < 0 &&
					fileName.indexOf(".zip") < 0 &&
					fileName.indexOf(".rar") < 0) {
				return false;
			}
		}

		return true;
	}
}]);