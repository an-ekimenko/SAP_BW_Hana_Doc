cpControllers.controller('UploadStatusJobsCtrl', ['$scope', '$uibModal', '$log', 'userSharedService', 'dashboardssharedservice', 'Notification', 'jobQuery', '$filter', '$interval', '$rootScope',
                                                function($scope, $uibModal, $log, sharedService, dashboardssharedservice, Notification, failedImportJobsQuery, $filter, $interval, $rootScope) {

 	$scope.$parent.viewTitle = 'Job Status';
 	$scope.$parent.productLink = null;
	$scope.$parent.showSearchIcon = true;
	$scope.$parent.viewerOn.value = false; //Determine whether the viewer is open
	var importJob = null;
	
	$scope.jobMessages = null;
	$scope.applicationVersion = '';
    
    // Make into struct later once refactoring
    $scope.importjob_id = "";
    $scope.job_type = "";
    $scope.request_status = "";
    $scope.project_name = "";
    $scope.project_phio = "";
    $scope.loio = "";
    $scope.version = "";
    $scope.lang = "";
    $scope.transtype = "";
    $scope.build = "";
    $scope.submitted = "";
    $scope.target_index_db = "";

    $scope.failedJobsView = function () {
        
        var modalInstance = $uibModal.open({
          templateUrl: '_build_938311c7a845691adeabc837/partials/dashboard-failed-import-jobs.html',
          controller: 'ModalInstanceCtrl',
          windowClass: 'app-modal-window'
        });

    };
    
    $scope.runUploadDataTable = function () {

        $scope.globalD = undefined;
        $scope.$on('$viewContentLoaded', function(event , viewConfig) {
        	if(viewConfig == "dashboard-upload-status-jobs@uploadStatus") {
        		//console.log("feedback");
            $('#uploadtable_id thead th').each( function () {
                var title = $('#uploadtable_id thead th').eq( $(this).index() ).text();
                $(this).html( '<input type="text" placeholder="Filter '+title+'" />' );
               
            } );

            var events = $('#events');
            var t2 = $('#uploadtable_id').DataTable({
                "orderCellsTop": true,
                "dom": '<"dashboard-buttons"B>rtip<"bottom"l>', //Document Object Model for DT
                "destroy": true,
                "serverSide": true,
                "processing": true,
                "deferRender": true,
                "order": [[ 11, "desc" ]],
                "buttons": [                	
                    {
                        name: 'excel',
                        text: 'Excel',
                        action: function ( e, dt, node, config ) {
                        	var d = {};
                        	d.$page_size = $scope.globalD.length;
                            d.$page = Math.ceil(($scope.globalD.start/$scope.globalD.length)+1);
                            d.$pageCount = $scope.globalD.length;

                            d.importjob_id = $scope.globalD.columns[0].search.value;
                            d.job_type = $scope.globalD.columns[1].search.value;
                            d.request_status = $scope.globalD.columns[2].search.value;
                            d.submitted_by = $scope.globalD.columns[3].search.value;
                            d.project_name = $scope.globalD.columns[4].search.value;
                            d.project_phio= $scope.globalD.columns[5].search.value;                        
                            d.omaploio = $scope.globalD.columns[6].search.value;                        
                            d.version = $scope.globalD.columns[7].search.value;
                            d.language = $scope.globalD.columns[8].search.value;
                            d.transtype = $scope.globalD.columns[9].search.value;
                            d.build = $scope.globalD.columns[10].search.value;
                            d.submitted = $scope.globalD.columns[11].search.value;
                            d.target_index_db = $scope.globalD.columns[12].search.value;
                            
                            var columnID = $('#uploadtable_id thead th').eq($scope.globalD.order[0].column).attr('id');
                            
                            d.$orderbycolumn=columnID;
                            d.$orderbytype=($scope.globalD.order[0].dir == "asc") ? "ASC" : "DESC";
                        	
                            $scope.jobMessages = failedImportJobsQuery.querySuccessAndFailedExcel({
                            	importjob_id: d.importjob_id,
                            	job_type: d.job_type,
                            	request_status: d.request_status,
                            	project_name: d.project_name,
                            	project_phio: d.project_phio,
                            	omaploio: d.omaploio,
                            	version: d.version,
                            	language: d.language,
                            	transtype: d.transtype,
                            	build: d.build,
                            	submitted: d.submtted,
                            	target_index_db: d.target_index_db,
                            	
                            	$page: d.page,
                            	$orderbycolumn: d.$orderbycolumn,
                            	$orderbytype: d.$orderbytype                            	
                            }, 
                                function (data) {
                                    var csv = dashboardssharedservice.convertToCSV(data.data.result, '#uploadtable_id');
                                    dashboardssharedservice.downloadFile(csv,'export.csv');
                                },
                                function(error) {
                                    sharedService.errorHandler(error);
                            });

                        }
                    },                    
                    {
                        name: 'reload',
                        text: 'Reload',
                        action: function ( e, dt, node, config ) {
                            t2.ajax.reload();
                        }
                    },
                    {
                        className: 'restart-button',
                        text: 'Restart',
                        action: function ( e, dt, node, config ) {
                        	restartJob();
                        }
                    },
                    {
                        className: 'cancel-button',
                        text: 'Cancel',
                        action: function ( e, dt, node, config ) {
                        	cancelJob();
                        }
                    }
                ],
                select: "single",
                stateSave:  true,
                lengthMenu: [[20,30,50,100,500],[20,30,50,100,500]], // options for length of datatable
                ajax: {
                    url: '/http.svc/upload_job_status?',
                    start: 0,
                    data: function(d) {
                        d.$page_size = d.length;
                        d.$page = Math.ceil((d.start/d.length)+1);
                        d.$pageCount = d.length;

                        d.importjob_id = d.columns[0].search.value;
                        d.job_type = d.columns[1].search.value;
                        d.request_status = d.columns[2].search.value;
                        d.submitted_by = d.columns[3].search.value;
                        d.project_name = d.columns[4].search.value;
                        d.project_phio= d.columns[5].search.value;                        
                        d.omaploio = d.columns[6].search.value;                        
                        d.version = d.columns[7].search.value;
                        d.language = d.columns[8].search.value;
                        d.transtype = d.columns[9].search.value;
                        d.build = d.columns[10].search.value;
                        d.submitted = d.columns[11].search.value;
                        d.target_index_db = d.columns[12].search.value;
                        var columnID = $('#uploadtable_id thead th').eq(d.order[0].column).attr('id');
                        
                        d.$orderbycolumn=columnID;
                        d.$orderbytype=(d.order[0].dir == "asc") ? "ASC" : "DESC";

                        $scope.globalD = d;
                    },
                    dataSrc: function (json) {
                        json.page = json.data.meta.page;
                        json.recordsTotal = json.data.meta.total;
                        json.recordsFiltered = json.data.meta.total;
                        $scope.applicationVersion = json.data.meta.applicationVersion;
                        $scope.globalD.total = json.data.meta.total;
                        return json.data.result;
                    },
                },
                columns: [
                    
                    {   title: "Job ID", 
                        data: function ( row, type, set ) {
                            return '<a target="_blank" href="/http.svc/upload_job_status?importjob_id='+row.importjob_id+'" >' + row.importjob_id + '</a>';
                    	}
                    },
                    { title: "Type", data: 'job_type'},
                    { title: "Status", data: 'request_status'},
                    { title: "Submitted By", data: 'submitted_by'},
                    { title: "Project Name", data: 'project_name'},
                    { title: "Project PHIO", data: 'project_phio'},
                    { title: "Deliverable LOIO", data: 'omaploio',
                    	"fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('loio' + oData.omaploio);
                        }
                    },                    
                    { title: "Version Name", data: 'version'},
                    { title: "Language", data: 'language'},
                    { title: "Format", data: 'transtype'},
                    { title: "Build", data: 'build'},
                    { 
                    	title: "Request Time", 
                    	data: 'submitted', 
                    	type: 'date',
                    	render: function ( data, type, row ) {
                    				return $filter('date')(data, 'd-MMM-yyyy HH:mm:ss');
                    	}, 
                    },
                    { title: "Target Database Index",  data: "target_index_db" }
                    
                ]
            });

            $('#uploadtable_id thead th').each( function () {
                var titleH = $('#uploadtable_id thead th').eq( $(this).index() ).text();
                var variable = $('#uploadtable_id thead th').eq( $(this).index() ).attr('id');
                var valOfTB=$scope.globalD[variable];

                if (variable == 'omaploio' && valOfTB != '') {
                	valOfTB = 'loio' + valOfTB;
                }
                
                if (titleH != 'Request Time'){
                	$(this).html( titleH+'<br><input class="display" type="text" value="'+valOfTB+'"placeholder="Filter '+titleH+'" />' );
                }
                
            } );

            t2.columns().eq(0).each(function(colIdx) {
            	var search;
                $('input', t2.column(colIdx).header()).on('keyup change', function(event) {
                    // 16 = shift, 17 = ctrl, 18 = alt
                	// we don't want to send requests for these keys
                	var key = event.keyCode;
                	if (key < 16 || key > 18) {
                		if (angular.isDefined(search)) {
                    		$interval.cancel(search);
                    		search = undefined;
                    	}
                    	
                        search = $interval(function (data) {
                        	var term = angular.copy(data.value, term),
                        		id = data.id;

                        	if (id == "omaploio") {
                            	term = term.replace("loio", '');
                            }

                        	t2.column(colIdx)
                              .search(term)
                              .draw();
                        }, 600, 1, false, {value: this.value, id: t2.column(colIdx).header().id});
                	}
                });
             
                $('input', t2.column(colIdx).header()).on('click', function(e) {
                    e.stopPropagation();
                    this.focus();
                });
            });

            t2.buttons('.restart-button').disable();
            t2.buttons('.cancel-button').disable();

            // Does the selection and deselection process
            t2.on( 'select', function ( e, dt, type, indexes ) {

                if(indexes) { // check, in case doubleClick in table header textField
                    
                    importJob = dt.rows(indexes).data()[0];
                    t2.buttons('.restart-button').enable();
                    t2.buttons('.cancel-button').enable();
                }
            })
            t2.on( 'deselect', function ( e, dt, type, indexes ) {
            	t2.buttons('.restart-button').disable();
                t2.buttons('.cancel-button').disable();
            });
        	}// if viewConfig equal to "dashboard-upload-status-jobs@uploadStatus"
        });
    }

    function restartJob() {
    	if (importJob != null) {
    		failedImportJobsQuery.restartJob({
    			jobId: importJob.importjob_id
    		}, function () {
    			sharedService.broadcastReloadDT();
    		}, function (error) {
    			sharedService.errorHandler(error);
    		});
    	}
    }

    function cancelJob() {
    	if (importJob != null) {
    		failedImportJobsQuery.cancelJob({
    			jobId: importJob.importjob_id
    		}, function () {
    			sharedService.broadcastReloadDT();
    		}, function (error) {
    			sharedService.errorHandler(error);
    		});
    	}
    }

    $scope.runUploadDataTable();
 }]);
