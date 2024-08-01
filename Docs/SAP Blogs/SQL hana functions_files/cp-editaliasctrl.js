cpControllers.controller('EditAliasCtrl', ['$scope', '$route', '$uibModal', '$log', 'Notification', 'userSharedService', 'aliasConfiguration', 'submitAlias',
                                                function($scope, $route, $uibModal, $log, Notification, sharedService, aliasConfiguration, submitAlias) {

    $scope.data = aliasConfiguration.getConfig();
    $scope.ok = false;
    $scope.notok = false;
    $scope.statusOKMessage;
    $scope.statusNOTOKMessage;
    
    $scope.$on('handleEditAlias', function(event, data) {
       $scope.editAliasView();
    });
    
    
    $scope.editAliasView = function () {
        var modalInstance = $uibModal.open({
            templateUrl: '_build_938311c7a845691adeabc837/partials/edit-alias-modal.html',
            controller: 'ModalInstanceCtrl',
            windowClass: 'app-modal-window'
          });

    };        
    
    
    $scope.submit = function() {
        data = $scope.data;
        var response = submitAlias.submit({
                                        alias: data.alias,
                                        id: data.id
                                        }, function(data) {
                                            if(data.status=='OK') {
                                                $scope.ok = true;
                                                $scope.notok = false;
                                                $scope.statusOKMessage = data.data.message;
                                            }
                                            else if(data.status=='ERROR') {
                                                $scope.ok = false;
                                                sharedService.errorHandler( 
                                                        {
                                                            status: data.status,
                                                            data: {message: data.data.message}
                                                        });
                                            }
                                            else {
                                                $scope.ok = false;
                                                $scope.notok = false;
                                            }
                                        });
    };
    
    $scope.cancel = function() {
        location.reload();
    };
   
 }]);
