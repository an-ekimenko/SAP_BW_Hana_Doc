'use strict';
/* Controllers */
var cpControllers = angular.module('cpControllers', []);

cpControllers.controller('ModalSubscribeCtrl', ['$scope', '$uibModal', '$log', 'sub', 'usersManagement', '$cookies', 'pageService',
                                                function($scope, $uibModal, $log, sub, usersManagement, $cookies, pageService) {

	var modalScope = $scope.$new();

	pageService.subscription = pageService.subscription || {};
	// $log.info(pageService.subscription);

	$scope.content = pageService;

	var tz = jstz.determine(); // Determines the time zone of the browser client
	var timezone = tz.name(); // Returns the name of the time zone eg "Europe/Berlin"
	modalScope.user = {};
	usersManagement.isLoggedOn($scope);

	var sapuacpuseremail = $cookies.get('sapuacpuseremail');

	if (sapuacpuseremail) {
		modalScope.user.email = sapuacpuseremail.replace(/['"]+/g, '');
	}

	modalScope.subscription = {};

	modalScope.subscription.option = "HOURLY";  // Default option
	modalScope.subscription.modified = false;

	modalScope.displaysub = function() {
		if ( pageService.subscription && pageService.subscription.subscribed == 1 ) {
			modalScope.subscription.subscribed = true;
			modalScope.subscription.option = pageService.subscription.schedule;
		} else {
			modalScope.subscription.subscribed = false;
			modalScope.subscription.option = 'HOURLY';
		}
	};

	modalScope.displaysub();

	modalScope.addsub = function() {
//		$log.info(pageService.subscription);
//		$log.info("Add sub: " + pageService.deliverable.id);

		var add = function() {
			sub.addCommentSubscription({
				deliverable_id: pageService.deliverable.id,
				notification_option: modalScope.subscription.option,
				timezone: timezone
			}, function() {
				if (!modalScope.subscription.modified  && pageService.subscription.subscribed)
					modalScope.subscription.modified = true;

				if (!pageService.subscription.subscribed)
					pageService.subscription.subscribed = 1;

				pageService.subscription.schedule = modalScope.subscription.option;
				modalScope.displaysub();
			},function(error) {
				// error handler
				sharedService.errorHandler(error);
			});
		}

		// $log.info('subscribe option: ' + modalScope.subscription.option);

		if (pageService.subscription.subscription_id) {  // no edit sub, so delete it first then add it again.
			sub.removeCommentSubscription({
				deliverable_id: pageService.deliverable.id
			}, 	function() {
				add();
			}, function(error) {
				// error handler
				sharedService.errorHandler(error);
			});
		} else {
			add();
		}
	};

	modalScope.removesub = function() {

		$log.info("Remove sub: " + pageService.deliverable.id);
		sub.removeCommentSubscription({
			deliverable_id: pageService.deliverable.id
		}, function() {
			pageService.subscription.subscribed = 0;
			pageService.subscription.schedule = "HOURLY";  // Default option
			modalScope.displaysub();
		},function(error) {
			// error handler
			sharedService.errorHandler(error);
		});
	};

	$scope.subscribe = function(size) {
		modalScope.displaysub();

		var modalInstance = $uibModal.open({
			templateUrl: '_build_938311c7a845691adeabc837/partials/subscribe-modal.html',
			controller: 'ModalInstanceCtrl',
			scope: modalScope,
			size: size
		});
	};
}
]);
cpControllers.controller('ModalInfoCtrl', ['$scope', '$uibModal',  'pageService',
                                           function($scope, $uibModal,  pageService) {
	$scope.content = pageService;
	$scope.more = false;

	$scope.info = function(size) {
		var modalInstance = $uibModal.open({
			templateUrl: '_build_938311c7a845691adeabc837/partials/info-modal.html',
			controller: 'ModalInstanceCtrl',
			size: size
		});
	};
}]);
cpControllers.controller('ModalDownloadCtrl', ['$scope', '$timeout', '$uibModal', '$location', '$window', 'userSharedService', 'pageService',
                                               function($scope, $timeout, $uibModal, $location, $window, sharedService, pageService) {

	$scope.content = pageService;
	$scope.download = function(size) {
		var modalInstance = $uibModal.open({
			templateUrl: '_build_938311c7a845691adeabc837/partials/download-modal.html',
			controller: 'ModalInstanceCtrl',
			size: size
		});
	};

	$scope.$on('handleDownload', function() {
		$scope.ok();
	});
	$scope.downloadAll = function (urls) {
		var link = document.createElement('a'); // creates a link element

		link.setAttribute('download', null);
		link.style.display = 'none';

		document.body.appendChild(link);

		for (var i = 0; i < urls.length; i++) {
			link.setAttribute('href', urls[i]);
			link.click();
		}

		document.body.removeChild(link);
	}

	$scope.ok = function() {
		if (sharedService.deliverable == null || sharedService.deliverable == undefined) {
			alert("You must select a deliverable!");
		}
		else {
			var links = [];
			for (var i=0, len=sharedService.deliverableList.length; i< len; i++ ) {
				var delivID = sharedService.deliverableList[i].id;
				links.push($location.protocol()+"://"+$location.host()+":"+$location.port()+"/http.svc/download?deliverable_id="+delivID);
			}
			console.log(links);
			$scope.downloadAll(links);
		}
	};


}]);
cpControllers.controller('ModalPrintCtrl', ['$scope', '$uibModal', 'pageService',
                                            function($scope, $uibModal, pageService) {

	$scope.print = function(size) {
		var modalInstance = $uibModal.open({
			templateUrl: '_build_938311c7a845691adeabc837/partials/print-modal.html',
			controller: 'ModalInstanceCtrl',
			size: size
		});
	};
}]);
//Please note that $uibModalInstance represents a modal window (instance)
//dependency.
//It is not the same as the $uibModal service used above.
cpControllers.controller('ModalInstanceCtrl', ['$scope', '$uibModalInstance',
                                               function($scope, $uibModalInstance) {
	$scope.ok = function() {
		$uibModalInstance.close();
	};
	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
}
]);

cpControllers.controller('ModalDeleteDeliverableCtrl', ['$scope', '$uibModal', '$log', 'userSharedService', 'deleteDeliv',
                                                        function($scope, $uibModal, $log, sharedService, deleteDeliv) {

	if (sharedService.deliverableList != null) {
		$scope.deliverables = sharedService.deliverableList;
	}

	$scope.$on('handleDelete', function() {
		$scope.deleteview('small');
	});

	$scope.deleteview = function(size) {
		$scope.confirmed = false;
		var modalInstance = $uibModal.open({
			templateUrl: '_build_938311c7a845691adeabc837/partials/dashboard-delete.html',
			controller: 'ModalInstanceCtrl',
			scope: $scope,
			size: size
		});
	};

	$scope.delete = function () {
		var deleteList = [];

		for (var i = 0, length = $scope.deliverables.length; i < length; i++) {
			var deliverable = $scope.deliverables[i];

			if (deliverable != null) {
				deleteList[i] = deliverable.id;
			}
		}

		var isDeleted = deleteDeliv.delete({
			deliverable_ids: deleteList.toString()
		}, function (response) {
			sharedService.broadcastReloadDT();
			$scope.confirmed = true;
		}, function (error) {
			// error handler
		});
	}
}]);

cpControllers.controller('ModalUploadCtrl', ['$scope', '$uibModal', '$log',
                                             function($scope, $uibModal, $log) {
	$scope.files = [];
	$scope.pubmode = "ondemand";  // default setting
	$scope.deliverable_stage = "DRAFT";  // default setting
	$scope.uploadedFiles = false;
	$scope.uploadFile = function(event){
		var files = event.target.files; // get files from input multiple
		$scope.$apply(function() {
			for (var i = 0; i < files.length; i++) {
				$scope.files.push(files[i]);  // add files to $scope.files array.
				$scope.files[i].progress = 0;
				$scope.files[i].status = '';
				$scope.files[i].jobId = '';
				$scope.files[i].id = i;
			}
		});
	};

	$scope.$on('handleUpload', function() {
		$scope.uploadview(); // opens view
	});

	$scope.upload = function() {
		$scope.uploadedFiles = true;
		var fd;
		var status;
		for (var i in $scope.files) {
			// we need a new object for every request. If the object is the same, then we append everytime one more archive to the request
			// at some point the number of archives become too big and the server is not able to handle the requests.
			fd = new FormData();

			fd.append("id", $scope.files[i].id);
			fd.append("archive", $scope.files[i] );
			fd.append("pubmode", $scope.pubmode);
			fd.append("deliverable_stage", $scope.deliverable_stage); // DRAFT, TEST, PROD

			var xhr = new XMLHttpRequest();
			xhr.upload.count = 0;
			xhr.upload.addEventListener("progress", function(evt) {
				uploadProgress(evt, xhr.upload.count);
				if (evt.loaded == evt.total) {
					xhr.upload.count++; // counts the amount of deliverables uploaded
				}
			}, false);
			xhr.addEventListener("load", function(evt) {
				uploadComplete(evt, i); // loads info
			}, false);
			xhr.addEventListener("error", uploadFailed, false);
			xhr.addEventListener("abort", uploadCanceled, false);
			xhr.open("POST", "/http.svc/upload");
			$scope.progressVisible = true; // show progressbar
			xhr.send(fd);

			xhr.onreadystatechange = function(e)
			{
				if ( 4 === this.readyState ) {
					if (this.status === 200) { // if a successfull response is given
						var response = this.response;
						var json = JSON.parse(response);
						console.log([response, e]);    // log the json response
						console.dir(json);
						handleUploadResponse(json);
//						$scope.files[count].status = json.status; // add the current upload status to files array/object
//						$scope.files[count].jobId = json.data.job_id; // add the current upload jobId to files array/object

						//error responses here
					} else if (this.status === 500) {
						console.log(['File error - Server 500', e]); // server error
						console.dir(this.response);

					} else if (this.status === 401) {
						console.log(['Authentication error - 401', e]); //auth error
						console.dir(this.response);

					} else {
						console.log(['File error', e]); //file error
						console.dir(this.response);

					}
				}
			};

		}
	}

	// This fucntion is used to show progress of the upload.
	function uploadProgress(evt,i) {
		$scope.$apply(function(){
			if (evt.lengthComputable) {
				$scope.files[i].progress = Math.round(evt.loaded * 100 / evt.total);
			} else {
				$scope.files[i].progress = 'unable to compute';
			}
		})
	};

	function uploadComplete(evt, i) {
		/* This event is raised when the server send back a response */
		var resp = evt.target.responseText;
		$log.info(resp);
		var response = evt.target.response;
		var json = JSON.parse(response);
		handleUploadResponse(json);
//		$scope.files[i].status = json.status;
//		$scope.files[i].jobId = json.data.job_id;
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

	$scope.uploadview = function () {
		var modalInstance = $uibModal.open({
			templateUrl: '_build_938311c7a845691adeabc837/partials/dashboard-upload.html',
			controller: 'ModalInstanceCtrl',
			windowClass: 'app-modal-window'
		});
	};

	function handleUploadResponse(json) {
		for (var i = 0; i < $scope.files.length; i++) {
			var file = $scope.files[i];
			if (file.id == json.data.file_id) {
				file.jobId = json.data.job_id;
				file.status = json.status;
			}
		}
	}
}
]);

cpControllers.controller('ViewerDownloadCtrl', ['$scope', '$location', '$window', 'pageService', '$log', 'PATHS',
                                                function($scope, $location, $window, pageService, $log, PATHS) {

	$scope.content = pageService;
	$scope.data = {};

	var filterbyversion = function (releases, version, languageCode, state) {
		var filtered = [];

		releases.forEach(function(release) {
			if (release.v === version && release.l === languageCode && release.state === state && release.transtype !== 'html5.uacp') {
				filtered.push(release);
			}
		});

		return filtered;
	}

	$scope.refresh = function() {
		if ($scope.content.deliverable) {
			var version = $scope.content.deliverable.version;
			var state = $scope.content.deliverable.state;
			var languageCode = $scope.content.deliverable.languageCode;
			$scope.data.releases = filterbyversion( $scope.content.deliverable.releases, version, languageCode, state);
			$scope.data.selectedRelease = null;
		}
	}

	// Aliasing
	$scope.aliasURL = function(oData) {


		if (oData.state === 'PRODUCTION') {
			return '/' + oData.alias;
		}
		else if (oData.state) {
			return '/' + oData.state + '/' + oData.alias;
		}
	}

	// For linking
	$scope.getRawContentURL = function(data) {

		if(data.alias)
		{
			return $scope.aliasURL(data) + '/' + data.rootPage;
		}
		else
		{
			if (data.state === 'PRODUCTION') {
				return PATHS.RESOURCE_URL + '/'  + data.loio + '/' + data.v + '/' +  data.l + '/' + data.rootPage;
			} else {
				return PATHS.RESOURCE_URL + '/' + data.state + '/' + data.loio + '/' + data.v + '/' +  data.l + '/' + data.rootPage;
			}
		}
	}

	$scope.download = function() {
		var r, link;

		if (!$scope.data.selectedRelease) {
			return;
		} else {
			r = $scope.data.selectedRelease;
		}

		// $window.location.href = PATHS.DOWNLOAD_URL + r.id; // downloads deliverable
		link = $scope.getRawContentURL(r);
		$window.open(link, '_blank');

	}


}]);

cpControllers.controller('ViewerShareCtrl', ['$scope', '$location', '$window', 'pageService', '$log', 'PATHS',
                                             function($scope, $location, $window, pageService, $log, PATHS) {

	$scope.content = pageService;
	$scope.data = {};
	$scope.info = $scope.content.deliverable.title + ' - ' + $scope.content.currentPage.t;

	$scope.absUrl = encodeURI($location.absUrl());

	(function(d,s,id){
		var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';
		if(!d.getElementById(id)){
			js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';
			fjs.parentNode.insertBefore(js,fjs);
		}
	}(document, 'script', 'twitter-wjs'));

	$scope.share = function() {

		if ($scope.content.deliverable && $scope.content.currentPage) {
			$scope.info = $scope.content.deliverable.title + ' - ' + $scope.content.currentPage.t;
		}

	}

	$scope.weibo = function() {
		event.preventDefault();
		var weibo, url;
		url = 'http://service.weibo.com/share/share.php?url=' + $scope.absUrl + '&title=' + $scope.info; + '&language=zh_cn';
		weibo = $window.open(url, '_blank', 'width=650,height=400');
	}

}]);

cpControllers.controller('ModalDeleteCommentCtrl', ['$scope', '$uibModal', '$log', 'pageService', 'userSharedService',
                                                    function($scope, $uibModal, $log, pageService, sharedService) {

	$scope.confirmed = false;
	$scope.pageService = pageService;



	$scope.deleteConfirm = function(size, array, comment, reply) {

		var modalInstance = $uibModal.open({
			templateUrl: '_build_938311c7a845691adeabc837/partials/comment-delete.html',
			controller: 'ModalInstanceCtrl',
			size: size
		});

		pageService.array = array;
		pageService.comment = comment;
		pageService.reply = reply;



	};

	$scope.delete = function () {

		sharedService.broadcastDeleteComment(pageService.array, pageService.comment, pageService.reply);
		$scope.ok();

	}
}]);

cpControllers.controller('DataTableModalInstanceCtrl', ['$scope', '$uibModalInstance',
                                                        function($scope, $uibModalInstance) {


	$scope.ok = function() {
		$uibModalInstance.close();
	};
	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
}
]);

cpControllers.controller("ExportFeedbackCSVmodalCtrl", ['$scope', '$sce', '$uibModalInstance', '$filter', 'Notification', 'feedbackService', 'dashboardssharedservice', 'userSharedService', 'params', 
                                                function($scope, $sce, $uibModalInstance, $filter, Notification, feedbackService, dashboardssharedservice, sharedService, params) {
	
	$scope.createdDateChanged = function(afterBefore, date) {

        switch(afterBefore) {
            case "AFTER": $scope.createdAfterDate = date; break;
            case "BEFORE": $scope.createdBeforeDate = date;
        }
	}
	
	$scope.lastModifiedDateChanged = function(afterBefore, date) {

        switch(afterBefore) {
            case "AFTER": $scope.lastModifiedAfterDate = date; break;
            case "BEFORE": $scope.lastModifiedBeforeDate = date;
        }
    }

    $scope.changeDateFormat = function(df) {

        if (df == "JS Date String") {
            $scope.currentFormat = df;
            $scope.preview = $scope.today.toString();
        } else if (df == "(JS) timestamp") {
            $scope.currentFormat = df;
            $scope.preview = $scope.today.getTime();
        } else if (df == "Custom") {
            $scope.customFormat = $scope.dateFormats[6];
			$scope.currentFormat = df;
            $scope.preview = $filter('date')($scope.today, $scope.customFormat);
        } else {
            $scope.currentFormat = df;
            $scope.preview = $filter('date')($scope.today, $scope.currentFormat);
        }
    }

    $scope.customChange = function(customFormat) {
        $scope.customFormat = customFormat;
        $scope.preview = $filter('date')($scope.today, $scope.customFormat);
    }
    
    $scope.today = new Date();

    $scope.dateFormats = dashboardssharedservice.availableDateFormats;
	$scope.currentFormat = $scope.dateFormats[0];
    $scope.dateFormatExplanations = dashboardssharedservice.dateFormatExplanations;
	
	$scope.htmlTooltip = $sce.trustAsHtml(dashboardssharedservice.customTooltip);

    $scope.preview = $filter('date')($scope.today, $scope.currentFormat);

    $scope.confirm = function() {

		Notification.primary({message:'Downloading...', delay:'forever', templateUrl:'_build_938311c7a845691adeabc837/partials/dashboard-download-notification.html'});
		
		params.created_after_date = $scope.createdAfterDate? $scope.createdAfterDate.getTime() : null;
		params.created_before_date = $scope.createdBeforeDate? $scope.createdBeforeDate.getTime() : null;
		params.last_modified_after_date = $scope.lastModifiedAfterDate? $scope.lastModifiedAfterDate.getTime() : null;
		params.last_modified_before_date = $scope.lastModifiedBeforeDate? $scope.lastModifiedBeforeDate.getTime() : null;

        // for custom format, use the value from the textfield (Custom is overwritten with e.g. 'dd-MM-yyyy')
        var dateFormat = ($scope.currentFormat!="Custom") ? $scope.currentFormat : $scope.customFormat;
		
        $scope.dList = feedbackService.queryExcel(params,
            function (data) {

                var csv = dashboardssharedservice.convertToCSV(data.data.result, '#feedback_id', dateFormat);
                dashboardssharedservice.downloadFile(csv,'export.csv');
                $uibModalInstance.close();
                
				Notification.clearAll();
				Notification.primary({message:'Download completed.',templateUrl:'_build_938311c7a845691adeabc837/partials/dashboard-download-notification.html'});
            },
            function(error) {
                sharedService.errorHandler(error);
                
				Notification.clearAll();
				Notification.primary({message:'Download failed.',templateUrl:'_build_938311c7a845691adeabc837/partials/dashboard-download-notification.html'});
        });
    }
    
	$scope.cancel = function() {
		$uibModalInstance.close();
	}
    
}]);

cpControllers.controller("ExportCommentsCSVmodalCtrl", ['$scope', '$sce', '$uibModalInstance', '$filter', 'Notification', 'commentService', 'dashboardssharedservice', 'userSharedService', 'params', 
                                                function($scope, $sce, $uibModalInstance, $filter, Notification, commentService, dashboardssharedservice, sharedService, params) {
    
	$scope.createdDateChanged = function(afterBefore, date) {

        switch(afterBefore) {
            case "AFTER": $scope.createdAfterDate = date; break;
            case "BEFORE": $scope.createdBeforeDate = date;
        }
	}

    $scope.changeDateFormat = function(df) {

        if (df == "JS Date String") {
            $scope.currentFormat = df;
            $scope.preview = $scope.today.toString();
        } else if (df == "(JS) timestamp") {
            $scope.currentFormat = df;
            $scope.preview = $scope.today.getTime();
        } else if (df == "Custom") {
            $scope.customFormat = $scope.dateFormats[6];
			$scope.currentFormat = df;
            $scope.preview = $filter('date')($scope.today, $scope.customFormat);
        } else {
            $scope.currentFormat = df;
            $scope.preview = $filter('date')($scope.today, $scope.currentFormat);
        }
    }

    $scope.customChange = function(customFormat) {
        $scope.customFormat = customFormat;
        $scope.preview = $filter('date')($scope.today, $scope.customFormat);
    }
    
    $scope.today = new Date();

    $scope.dateFormats = dashboardssharedservice.availableDateFormats;
	$scope.currentFormat = $scope.dateFormats[0];
    $scope.dateFormatExplanations = dashboardssharedservice.dateFormatExplanations;
	
	$scope.htmlTooltip = $sce.trustAsHtml(dashboardssharedservice.customTooltip);

    $scope.preview = $filter('date')($scope.today, $scope.currentFormat);

    $scope.confirm = function() {
    	
		Notification.primary({message:'Downloading...', delay:'forever', templateUrl:'_build_938311c7a845691adeabc837/partials/dashboard-download-notification.html'});
		
		params.created_after_date = $scope.createdAfterDate? $scope.createdAfterDate.getTime() : null;
		params.created_before_date = $scope.createdBeforeDate? $scope.createdBeforeDate.getTime() : null;

        // for custom format, use the value from the textfield (Custom is overwritten with e.g. 'dd-MM-yyyy')
        var dateFormat = ($scope.currentFormat!="Custom") ? $scope.currentFormat : $scope.customFormat;
        
        $scope.dList = commentService.queryExcel(params,
            function (data) {

                var csv = dashboardssharedservice.convertToCSV(data.data.result, '#comments_id', dateFormat);
                dashboardssharedservice.downloadFile(csv,'export.csv');
                $uibModalInstance.close();
                
				Notification.clearAll();
				Notification.primary({message:'Download completed.',templateUrl:'_build_938311c7a845691adeabc837/partials/dashboard-download-notification.html'});
            },
            function(error) {
                sharedService.errorHandler(error);
                
				Notification.clearAll();
				Notification.primary({message:'Download failed.',templateUrl:'_build_938311c7a845691adeabc837/partials/dashboard-download-notification.html'});
        });
    }
    
	$scope.cancel = function() {
		$uibModalInstance.close();
	}
    
}]);

cpControllers.controller("ExportDeliverablesCSVmodalCtrl", ['$scope', '$sce', '$uibModalInstance', '$filter', 'Notification', 'deliverables', 'dashboardssharedservice', 'userSharedService', 'params', 
                                        function($scope, $sce, $uibModalInstance, $filter, Notification, deliverables, dashboardssharedservice, sharedService, params) {

	$scope.lastModifiedDateChanged = function(afterBefore, date) {

        switch(afterBefore) {
            case "AFTER": $scope.lastModifiedAfterDate = date; break;
            case "BEFORE": $scope.lastModifiedBeforeDate = date;
        }
    }
	
    $scope.changeDateFormat = function(df) {
        
        if (df == "JS Date String") {
            $scope.currentFormat = df;
            $scope.preview = $scope.today.toString();
        } else if (df == "(JS) timestamp") {
            $scope.currentFormat = df;
            $scope.preview = $scope.today.getTime();
        } else if (df == "Custom") {
			$scope.customFormat = $scope.dateFormats[6];
			$scope.currentFormat = df;
            $scope.preview = $filter('date')($scope.today, $scope.customFormat);
        } else {
            $scope.currentFormat = df;
            $scope.preview = $filter('date')($scope.today, $scope.currentFormat);
        }
    }

    $scope.customChange = function(customFormat) {
        $scope.customFormat = customFormat;
        $scope.preview = $filter('date')($scope.today, $scope.customFormat);
    }
    
    $scope.today = new Date();

    $scope.dateFormats = dashboardssharedservice.availableDateFormats;
	$scope.currentFormat = $scope.dateFormats[0];
    $scope.dateFormatExplanations = dashboardssharedservice.dateFormatExplanations;
	
	$scope.htmlTooltip = $sce.trustAsHtml(dashboardssharedservice.customTooltip);

    $scope.preview = $filter('date')($scope.today, $scope.currentFormat);

    $scope.confirm = function() {
		
		Notification.primary({message:'Downloading...', delay:'forever', templateUrl:'_build_938311c7a845691adeabc837/partials/dashboard-download-notification.html'});

		params.last_modified_after_date = $scope.lastModifiedAfterDate? $scope.lastModifiedAfterDate.getTime() : null;
		params.last_modified_before_date = $scope.lastModifiedBeforeDate? $scope.lastModifiedBeforeDate.getTime() : null;

        // for custom format, use the value from the textfield (Custom is overwritten with e.g. 'dd-MM-yyyy')
        var dateFormat = ($scope.currentFormat!="Custom") ? $scope.currentFormat : $scope.customFormat;
        
        $scope.dList = deliverables.queryExcel(params,
            function (data) {

                var csv = dashboardssharedservice.convertToCSV(data.data.d.results, '#table_id', dateFormat);
                dashboardssharedservice.downloadFile(csv,'export.csv');
				$uibModalInstance.close();
				
				Notification.clearAll();
				Notification.primary({message:'Download completed.',templateUrl:'_build_938311c7a845691adeabc837/partials/dashboard-download-notification.html'});
            },
            function(error) {
				sharedService.errorHandler(error);
				
				Notification.clearAll();
				Notification.primary({message:'Download failed.',templateUrl:'_build_938311c7a845691adeabc837/partials/dashboard-download-notification.html'});

        });
    }
    
    $scope.cancel = function() {
        $uibModalInstance.close();
    }
            
}]);

