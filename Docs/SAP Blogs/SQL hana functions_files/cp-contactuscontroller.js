var cpContactUsController = angular.module('cpContactUsController', []);

cpContactUsController.controller('cpContactUsController', ['$rootScope', '$scope', '$http', '$cookies', 
                                                         '$log', '$translate', 
                                                         '$location', '$interval', 'securityService',
                                                         'contentApiService',
                                                         function($rootScope, $scope, $http, $cookies, sharedService, 
                                                        		 $log, $translate, $location, $interval, 
                                                        		 securityService,contentApiService) {

	$scope.formLoading = {
			value: false
	};
	
	$scope.formData = {
	        submitted: false,
	        error: false,
	        type: undefined,
	        title: '',
	        titleError: false,
	        message: '',
	        messageError: false
	};
	
	$scope.submitFeedback = function() {

		//step 1: check that fields are entered
		if ($scope.formData.type == undefined) {
			$scope.formData.type = 'other'; 		//if no type is set, default to other
		}
		if ($scope.formData.title.length < 1) {			//title must not be blank
			$scope.formData.titleError = true;
		} else {
			$scope.formData.titleError = false;
		}
		if ($scope.formData.message.length < 1) {			//message must not be blank
			$scope.formData.messageError = true;
		} else {
			$scope.formData.messageError = false;
		}
		
		if (
				$scope.formData.title.length > 0 && 
				$scope.formData.message.length > 0 &&
				$scope.formData.message.length < 2001
			) {
			
			$scope.formLoading.value = true;

			//step 2: set data
			
			var data = {
				title: $scope.formData.title.replace(/\\/g, '&#92;').replace(/\{/g, '#7B;').replace(/\}/g, '#7D;'),
	            description: $scope.formData.message.replace(/\\/g, '&#92;').replace(/\{/g, '#7B;').replace(/\}/g, '#7D;'),
	            type: $scope.formData.type,
	       	}
			
			//step 3: submit data
			
			$http.post("/http.svc/contact_us", data).then(function(response){
				//console.log("this is a success");
				//show "form submitted" message
				$scope.formData.submitted = true;
				$scope.formLoading.value = false;
				
			},function(response) {
				//console.log("this is an error")
				//sharedService.errorHandler(data);
				//$log.error("Error in Feedback Service: ");
				//$log.error(error);
				//show error message
				$scope.formData.error = true;
				$scope.formLoading.value = false;
		 	});
			
			//step 4: clear data
			$scope.formData.type = undefined;
			$scope.formData.title = '';
			$scope.formData.message = '';
			
		}
	}
    
    $scope.isLoggedOn = function() {
    	var sapuacpuserid = $cookies.get('sapuacpuserid');
    	return sapuacpuserid;
    };
    
    try{ 
    	var trackingData = {};
    	trackingData.pageUrl = location.href;
    	trackingData.pageName ="Help Portal Contact Us";
    	trackingData.prop2 = "en-US";
    	var loginStatus = "logN";
    	if ($scope.isLoggedOn() ) {
    		loginStatus = "logY";
    	}
    	trackingData.prop9 = loginStatus;
    	sap_s.trackData(trackingData); 
    } catch(e) {console.log(e);}    
    

	}
]);
