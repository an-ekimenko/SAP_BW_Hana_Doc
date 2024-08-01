cpUserMgmtControllers.controller('ModalURLMappingsCtrl', ['$scope', '$location', 'urlMappingsService',
    function($scope, $location, urlMappingsService) {

	var mappings;
	$scope.mainPage = true;
	$scope.helpPortalUploadPage = false;
	$scope.SMPUploadPage = false;
	$scope.CPUploadPage = false;
	$scope.warningPage = false;
	$scope.canUpload = false;
	$scope.uploaded = false;

	$scope.showHelpPortalUploadPage = function () {
		$scope.mainPage = false;
		$scope.helpPortalUploadPage = true;
		$scope.SMPUploadPage = false;
		$scope.CPUploadPage = false;
		$scope.warningPage = false;
		$scope.path = '/http.svc/help_portal_url_mappings';
	}
	
	$scope.showSMPUploadPage = function () {
		$scope.mainPage = false;
		$scope.SMPUploadPage = true;
		$scope.helpPortalUploadPage = false;
		$scope.CPUploadPage = false;
		$scope.warningPage = false;
		$scope.path = '/http.svc/smp_url_mappings';
	}
	
	$scope.showCPUploadPage = function () {
		$scope.mainPage = false;
		$scope.SMPUploadPage = false;
		$scope.helpPortalUploadPage = false;
		$scope.CPUploadPage = true;
		$scope.warningPage = false;
		$scope.path = '/http.svc/cp_url_mappings';
	}

	$scope.showWarningPage = function () {
		$scope.mainPage = false;
		$scope.helpPortalUploadPage = false;
		$scope.SMPUploadPage = false;
		$scope.CPUploadPage = false;
		$scope.warningPage = true;
	}

	$scope.showProgressPage = function () {
		$scope.progressPage = true;
		$scope.mainPage = false;
		$scope.helpPortalUploadPage = false;
		$scope.SMPUploadPage = false;
		$scope.CPUploadPage = false;
		$scope.warningPage = false;
	}
	
	$scope.downloadSMPMappings = function () {
		var csv;

		urlMappingsService.downloadSMPMappings({
			//
		}, function(response) {
			csv = response.data.mappings;
			var link = document.createElement('a');
			var blob = new Blob(["\ufeff", csv]);
			var url = URL.createObjectURL(blob);
			
			if(link.download != undefined) {
				link.href = url;
				link.download = "smp_url_mappings.csv";
			} else if(navigator.msSaveBlob) {
				link.setAttribute("href", url);
				link.addEventListener("click", function(event){
					navigator.msSaveBlob(blob, "smp_url_mappings.csv");
				})
			}
			
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			
			
		
		}, function(error) {
			// error handler
		});
	}

	$scope.downloadHelpPortalMappings = function () {
		var csv;

		urlMappingsService.downloadHelpPortalMappings({
			//
		}, function(response) {
			csv = response.data.mappings;
			var link = document.createElement('a');
			var blob = new Blob(["\ufeff", csv]);
			var url = URL.createObjectURL(blob);
			
			if(link.download != undefined) {
				link.href = url;
				link.download = "help_portal_url_mappings.csv";
			} else if(navigator.msSaveBlob) {
				link.setAttribute("href", url);
				link.addEventListener("click", function(event){
					navigator.msSaveBlob(blob, "help_portal_url_mappings.csv");
				})
			}
			
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			
			
		
		}, function(error) {
			// error handler
		});
	}
	
	$scope.downloadCPMappings = function () {
		var csv;

		urlMappingsService.downloadCPMappings({
			//
		}, function(response) {
			csv = response.data.mappings;
			var link = document.createElement('a');
			var blob = new Blob(["\ufeff", csv]);
			var url = URL.createObjectURL(blob);
			
			if(link.download != undefined) {
				link.href = url;
				link.download = "cp_url_mappings.csv";
			} else if(navigator.msSaveBlob) {
				link.setAttribute("href", url);
				link.addEventListener("click", function(event){
					navigator.msSaveBlob(blob, "cp_url_mappings.csv");
				})
			}
			
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			
			
		
		}, function(error) {
			// error handler
		});
	}

	$scope.uploadMappings = function (event) {
		var file = event.target.files[0]; // get files from input
		$scope.$apply(function() {
			file.progress = 0;
			file.status = '';
			mappings = file;
			$scope.canUpload = true;
		});
	};

	$scope.upload = function (path) {
		var fd,	status;

        fd = new FormData();

	    fd.append("csv", mappings);

	    var xhr = new XMLHttpRequest();
		xhr.upload.addEventListener("progress", function(evt) {
			uploadProgress(evt);
		}, false);
		xhr.addEventListener("load", function(evt) {
			var json = JSON.parse(evt.target.response);// file is uploaded
			$scope.uploaded = true;
		}, false);
		xhr.addEventListener("error", uploadFailed, false);
		xhr.addEventListener("abort", uploadCanceled, false);
		xhr.open("POST", path);
		xhr.send(fd);
	}

	// This fucntion is used to show progress of the upload.
	function uploadProgress(evt) {
		$scope.$apply(function(){
			if (evt.lengthComputable) {
				$scope.progress = Math.round(evt.loaded * 100 / evt.total);
				console.log($scope.progress);
				if ($scope.progress == 100) {
					$scope.status = "OK";
				}
			} else {
				$scope.progress = 'unable to compute';
			}
		})
	};

	function uploadFailed(evt) {
		alert("There was an error attempting to upload the file.");
	};

	function uploadCanceled(evt) {
		$scope.$apply(function(){
			$scope.progressVisible = false;
		})
		alert("The upload has been canceled by the user or the browser dropped the connection.");
	};
}]);