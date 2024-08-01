var cpWhatsNewController = angular.module('cpWhatsNewController', []);

cpWhatsNewController.controller('cpWhatsNewController', ['$rootScope', '$scope', '$cookies', 'usersManagement', 'userSharedService', '$log', '$translate', '$location', '$interval', 'securityService','contentApiService','$uibModal','cpWhatsNewService',
    function($rootScope, $scope, $cookies, usersManagement, sharedService, $log, $translate, $location, $interval, securityService,contentApiService,$uibModal,cpWhatsNewService) {
		// whats new content location
		// https://uacptest2.neo.ondemand.com/viewer/#/DRAFT/838ce9f84a6b4931a697f81405253365/2.0.0.0.x/en-US/0d90d6e849c2467189565fc30549b773.html
		// get content api
		// https://uacptest2.neo.ondemand.com/http.svc/getcontent?&deliverable=838ce9f84a6b4931a697f81405253365&version=2.0.0.0.x&language=en-US&state=DRAFT&topic=0d90d6e849c2467189565fc30549b773&transtype=xhtml.body&filepath=&nocontent=false

	$scope.slides = [];
	$scope.wncookie = true;
	try{ sap_s.trackData(); } catch(e) {console.log(e);}
		// get the original html content and parses the sections
		$scope.parseContent = function(content) {
			var linkcontent = content.replace(new RegExp('src="', 'g'), 'src="'+$scope.getBasePath());
			var htmlcontent = $.parseHTML(linkcontent);
			var sections1 = $(htmlcontent).find(".section");
			var sections=$(sections1).unwrap();
			for ( var i=0;i<sections.length;i++) {
				$scope.parseSection(sections[i]);
			}
		};
		
		// handler when content is retrieved from the server
		$scope.onContentRetrieved = function(data) {
			$scope.deliverableDate=data.date;
			$scope.parseContent(data.content);
		};
		
		// get the base path based on the parameters
		$scope.getBasePath = function() {
			var basePath = "/doc/"+$scope.parameters.state+"/"+$scope.parameters.deliverable+"/"+$scope.parameters.version+"/"+$scope.parameters.language+"/";
			return basePath;
		};
		
		$scope.allFeaturesPath=function() {
			window.open('#'+$scope.allNewFeature.allData.url);		
		};
		
		$scope.parseSection = function(sectioncontent) {
			$scope.addSlide(sectioncontent.innerHTML);
		};
		
		$scope.isLoggedOn = function() {
			return usersManagement.isUserEmployee();
	    };
		
		// add a slider
		$scope.myInterval = 5000;
		$scope.noWrapSlides = false;
		$scope.active = 0;
		var currIndex = 0;

		// add a new slide
		$scope.addSlide = function(sectioncontent) {
			var newWidth = 500 + $scope.slides.length + 1;
		    $scope.slides.push({
		    	content: sectioncontent,
		    	id: currIndex++
		    });
		};

		// read the content from the server
		$scope.cancel = function () {
			$scope.dialog.dismiss('cancel');
        };

		cpWhatsNewService.whatsNewInit($scope);
        contentApiService.getContent($scope.parameters,$scope.onContentRetrieved);
	}
]);