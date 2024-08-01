'use strict';

var cpRwController = angular.module('cpRwCtrl', []);

cpRwController.controller('RwCtrl', [ '$scope', '$http', 'pageService', '$log', '$uibModal', 'sub', '$cookies',
		function($scope, $http, pageService, $log, $uibModal, sub, $cookies) {

			$scope = $scope || {};
			$scope.pageService = pageService;
			$scope.subscription = {};
			$scope.subscribed = 0;
			$scope.authorized = false;

			var DEFAULT_SCHEDULE = "HOURLY";

			var tz = jstz.determine(); // Determines the time zone of the browser client
			var timezone = tz.name(); // Returns the name of the time zone eg "Europe/Berlin"

			var sapuacpuseremail = $cookies.get('sapuacpuseremail');

			if (sapuacpuseremail) {
				$scope.user.email = sapuacpuseremail.replace(/['"]+/g, '');
			}

			if (pageService.authorization) {
				$scope.authorized = pageService.authorization.publish;
			}

			$scope.subscription.option = DEFAULT_SCHEDULE;
			$scope.subscription.modified = false;

			if (pageService.feedbackSubscription) {
				var subscription = pageService.feedbackSubscription;
				if (subscription.subscribed) {
					$scope.subscription.option = subscription.schedule;
					$scope.subscribed = subscription.subscribed;
				}
			}

			$scope.feedbackForm = {
				stage : 1,
				helpful : false,
				inaccurate : false,
				confusing : false,
				problem : false,
				feature : false,
				text : "",
				url : window.location.href,
			}

			$scope.sendFeedback = function() {
				var data = {
					helpful : $scope.feedbackForm.helpful,
					inaccurate : $scope.feedbackForm.inaccurate,
					confusing : $scope.feedbackForm.confusing,
					problem : $scope.feedbackForm.problem,
					feature : $scope.feedbackForm.feature,
					text : $scope.feedbackForm.text,
					deliverableId : $scope.content.deliverableId || $scope.pageService.deliverable.id,
					file_loio : $scope.content.fileLoio,
					url : window.location.href,
				}
				$http.post("/http.svc/feedback", data).success(function(data, status) {

				},function(error) {
					//sharedService.errorHandler(data);
					$log.error("Error in Feedback Service: ");
					$log.error(error);
			 	});
				$scope.feedbackForm.stage = 4;
				
				$scope.$on("onShowSelected", function(event) {
					 $scope.feedbackForm = {
								stage : 1,
								helpful : false,
								inaccurate : false,
								confusing : false,
								problem : false,
								feature : false,
								text : "",
								url : window.location.href,
							}
					 });

			}

			$scope.openModal = function() {
				var modalInstance = $uibModal.open({
					templateUrl: '_build_938311c7a845691adeabc837/partials/feedback-subscription-modal.html',
					controller: 'ModalInstanceCtrl',
					scope: $scope
				});
			};

			$scope.save = function() {
				sub.addFeedbackSubscription({
					deliverable_id: pageService.deliverable.id,
					notification_option: $scope.subscription.option,
					timezone: timezone
				}, function(response) {
					if (response.data) {
						$scope.subscribed = 1;
						$scope.pageService.feedbackSubscription.subscribed = response.data.subscribed;
						$scope.pageService.feedbackSubscription.schedule = response.data.schedule;
					}
				}, function(error) {
					// error
				});
			};

			$scope.unsubscribe = function() {
				sub.removeFeedbackSubscription({
					deliverable_id: pageService.deliverable.id
				}, function(response) {
					$scope.subscribed = 0;
					$scope.subscription.option = DEFAULT_SCHEDULE;
					$scope.pageService.feedbackSubscription.subscribed = 0;
					$scope.pageService.feedbackSubscription.schedule = undefined;
				}, function(error) {
					// error
				});
			};
	}
]);

cpRwController.directive( 'rwMarkActiveInToc', function() {
	return {
		restrict: 'A',
		link: function( scope, element, attrs ) {			
			element.bind( 'click', function(e) {
				e.preventDefault();
				
				var el = element[0],
					elUrl = element[0].getAttribute('ng-href'),
					shortenedUrl = elUrl.substring( elUrl.length - 37 );
				
				var node = {
						'u': shortenedUrl,
						'highlightable': true
				}
				
				return scope.$parent.showSelected(node);
			});
		}
	}
});
