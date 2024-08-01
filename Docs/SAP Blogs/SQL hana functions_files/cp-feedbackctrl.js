cpControllers.controller('FeedbackCtrl', ['$scope', '$log', '$uibModal', 'feedbackService', 'usersManagement', 'userSharedService', 'dashboardssharedservice', 'Notification', 'stateService', '$filter', '$interval', '$rootScope',
                                                function($scope, $log, $uibModal, feedbackService, usersManagement, sharedService, dashboardssharedservice, Notification, stateService, $filter, $interval, $rootScope) {
	
 	$scope.$parent.viewTitle = 'Feedback';
	$scope.$parent.showSearchIcon = true;
	$scope.$parent.viewerOn.value = false; //Determine whether the viewer is open

	var STATUS_OPEN = 'OPEN',
		STATUS_RESOLVED = 'RESOLVED',
		DISPLAY_HIDEN = 'HIDDEN',
		DISPLAY_VISIBLE = 'VISIBLE',
		BUTTON_REOPEN = 'Set to Open',
		BUTTON_RESOLVE = 'Set to Resolved',
		BUTTON_HIDE = 'Mark as Hidden',
		BUTTON_UNHIDE = 'Mark as Visible',
		BUTTON_DELETE = 'Delete Feedback',
		BUTTON_FILTERS = 'Clear Filters';

    // Make into struct later once refactoring
    $scope.id = "";
    $scope.title = "";
    $scope.version = "";
    $scope.topic = "";
    $scope.product = "";
    $scope.file_loio = "";
    $scope.locale = "";
    $scope.helpful = "";
    $scope.inaccurate = "";
    $scope.confusing = "";
    $scope.feature = "";
    $scope.problem = "";
    $scope.text = "";
    $scope.created_on = "";
    $scope.lastmodifieddate= "";
    $scope.auhor = "";
    //$scope.canDelete = false; // if a user can delete a feedback.
    $scope.selectedRow = null;

    $scope.runFeedbackDataTable = function () {
        $scope.globalD = undefined;
        $scope.$on('$viewContentLoaded', function(event , viewConfig) {
        	if(viewConfig == "feedback@feedback") {
        		 $('#feedback_id thead th').each( function () {
                     var title = $('#feedback_id thead th').eq( $(this).index() ).text();
                     var exp = new RegExp('Helpful|Inaccurate|Confusing|Feature');
                     if (exp.test(title)) {
                         $(this).html( '<input type="text" style="width: 40px"  />' );
                     }else{
                    	 $(this).html( '<input type="text" placeholder="Filter '+title+'" />' );
                     }
                     
                 } );	
        		
            var events = $('#events');
            var feedbackTable = $('#feedback_id').DataTable({
                "orderCellsTop": true,
                "dom": '<"dashboard-buttons"B>rtip<"bottom"l>',
                "destroy": true,
                "serverSide": true,
                "processing": true,
                "deferRender": true,
                "order": [[12, 'desc']],/* order by created date*/
                "buttons": [
                    
                    {
                        extend: 'colvis',
                        text: 'Column Visibility'
                    },
                    {
                        name: 'reload',
                        text: 'Reload',
                        action: function ( e, dt, node, config ) {
                        	$scope.selectedRow = null;
                        	disableButtons(dt);
                        	dt.ajax.reload();
                        }
                    },

                    {
                    	name: 'clear_filters',
                    	text: BUTTON_FILTERS,
                    	action: function ( e, dt, node, config) {
                    		$scope.selectedRow = null;
                        	disableButtons(dt);
                    		clearFilters(dt);
                    	}
                    },

                    {
                    	name: 'delete',
                    	text: BUTTON_DELETE,
                    	action: function ( e, dt, node, config) {
                    		feedbackService.deleteFeedback({
                    			id: dt.row($scope.selectedRow).data().id
                    		}, function(response) {
                    			// success handler
                    			dt.ajax.reload();
                    		}, function(error) {
                    			// error handler
                    		});
                    	}
                    },
                    {
                        name: 'excel',
                        text: 'Export to CSV',
                        action: function ( e, dt, node, config) {
                            
                            /* $page_size = 0 means 
                            * that there is no limit to the number of records to return
                            * because the same back-end service is used to populate the 
                            * dashboards with paginated data
                            */
                            var queryParams = {
                                $page_size: 0,
                                product: $scope.globalD['product'],
                                title: $scope.globalD['title'],
                                topic: $scope.globalD['topic'],
                                version: $scope.globalD['version'],
                                helpful: $scope.globalD['helpful'],
                                inaccurate: $scope.globalD['inaccurate'],
                                confusing: $scope.globalD['confusing'],
                                problem: $scope.globalD['problem'],
                                feature: $scope.globalD['feature'],
                                text: $scope.globalD['text'],
                                file_loio: $scope.globalD['file_loio'],
                                locale: $scope.globalD['locale'],
                                lastmodifieddate: $scope.globalD['lastmodifieddate'],
                                created_on: $scope.globalD['created_on'],
								author: $scope.globalD['author']
                            }

                            $uibModal.open({
                                templateUrl: '_build_938311c7a845691adeabc837/partials/dashboard-export-feedback-csv-modal.html',
                                controller: 'ExportFeedbackCSVmodalCtrl',
                                resolve: {
                                    params: queryParams
                                }
                            });
                        }
                    }
                    
                ],
                select: 'single',
                colReorder: {
                    realtime: true
                },
                stateSave:  true,
                lengthMenu: [[20,30,50,100,500], [20,30,50,100,500]],
                ajax: {
                    url: '/http.svc/feedback',
                    start: 0,
                    length:20,
                    pages: 5,
                    data: function (d) {
                    	// data for pagination
                    	d.$page_size = d.length;
                        d.$page = Math.ceil((d.start/d.length)+1);
                        d.$pageCount = d.length;

                        // data for filtering
                        d.product = d.columns[0].search.value;
                        d.title = d.columns[1].search.value; // name of the column is Deliverable but means in fact Deliverable title!!!
                        d.topic = d.columns[2].search.value;
                        d.version = d.columns[3].search.value;
                        d.file_loio =  d.columns[4].search.value;
                        d.locale =  d.columns[5].search.value;
                        d.helpful =  d.columns[6].search.value;
                        d.inaccurate =  d.columns[7].search.value;
                        d.confusing =  d.columns[8].search.value;
                        d.feature =  d.columns[9].search.value;
                        d.problem =  d.columns[10].search.value;
                        d.text =  d.columns[11].search.value;
                        d.created_on =  d.columns[12].search.value;
                        d.lastmodifieddate =  d.columns[13].search.value;
                        d.author = d.columns[14].search.value;

                        //data for ordering / sorting
                        d.$order_by = (d.order[0].dir == "asc") ? 
                                  d.columns[d.order[0].column].data+':ASCENDING' 
                                : d.columns[d.order[0].column].data+':DESCENDING';

                        $scope.globalD = d;
                    	
                    },
                    dataSrc: function (json) {
                    	// success handler
                    	json.page = json.data.meta.page;
                        json.recordsTotal = json.data.meta.total;
                        json.recordsFiltered = json.data.meta.currentPageTotal;
                        //$scope.globalD.total = json.data.meta.total;
                        $scope.data = json.data.result;
                        return json.data.result;
                    }
                },
                columns: [
                    { title: "Product",	 data: 'product',  "width": "5%"},
                    { title: "Deliverable", data: 'title', "width": "13%"},
                    { title: "Topic",	 data: 'topic',  "width": "13%"},
                    { title: "Version", data: 'version', "width": "3%"},
                    { title: "Loio", data: 'file_loio', "width": "15%",
                    	render: function (data, type, full, meta) {
                    		return "<a href='" + full.url + "'>" + 'loio' + data + "</a>"
                    	}
                    },
                    { title: "Locale", data: 'locale', "width": "3%"},
                    { title: "Helpful", data: 'helpful', "width": "3%"},
                    { title: "Inaccurate", data: 'inaccurate', "width": "40px  !important;"},
                    { title: "Confusing", data: 'confusing', "width": "3%"},
                    { title: "Feature", data: 'feature', "width": "3%"},
                    { title: "Problem", data: 'problem', "width": "3%"},
                    { title: "Text", data: 'text', orderable: false,"width": "3%"},
                    { 
                    	title: "Created", 
                    	data: 'created_on', 
                    	type: 'date',
                    	"width": '9%',
                    	render: function ( data, type, row ) {
                            return data? $filter('date')(data, 'd-MMM-yyyy HH:mm') : '';
                    	}
                    },
                    { 
                    	title: "Last modified", 
                    	data: 'lastmodifieddate', 
                    	type: 'date',
                    	"width": '9%',
                    	render: function ( data, type, row ) {
                            return data? $filter('date')(data, 'd-MMM-yyyy HH:mm') : '';
                    	}
                    },
                    { title: "Owner", visible: false, data: 'author'}
                ]
            });

            function injectTextFieldsInTH () {

                $('#feedback_id thead th').each( function () {
                    var titleH = $('#feedback_id thead th').eq( $(this).index() ).text();
                    var id = $('#feedback_id thead th').eq( $(this).index() ).attr('id');
                    var valOfTB=$scope.globalD[id];
                    var exp = new RegExp('Locale|Helpful|Inaccurate|Confusing|Feature|Problem');
                    var exp_skip = new RegExp('Created|Last modified');
                    if (id == 'file_loio' && valOfTB != '') {
                        valOfTB = 'loio' + valOfTB;
                    }
                    
                    if(!exp_skip.test(titleH)){
                        if (exp.test(titleH)) {
                            $(this).html( titleH+'<br><input class="display" type="text" style="width: 60px" value="'+valOfTB+'"placeholder="Filter" />' );
                        }else{
                            $(this).html( titleH+'<br><input class="display" type="text" value="'+valOfTB+'"placeholder="Filter '+titleH+'" />' );
                        }
                    }
                } ); 
            }
            injectTextFieldsInTH();
            
            function attachListenersToTextFieldsInTH () {

                feedbackTable.columns().eq(0).each(function(colIdx) {
                    var variable = feedbackTable.column(colIdx).header().id ;
                    var	search;
                        $('input', feedbackTable.column(colIdx).header()).on('keyup change', function(event) {
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
    
                                    if (id == "file_loio") {
                                        term = term.replace("loio", '');
                                    } else if (id == "title" || id == "topic" || id == "text") {
                                        term = encodeURIComponent(term);
                                    }
    
                                    feedbackTable
                                        .column(colIdx)
                                        .search(term)
                                        .draw();
                                },600, 1, false, {value: this.value, id: feedbackTable.column(colIdx).header().id});
                            }
                        });
                     
                        $('input', feedbackTable.column(colIdx).header()).on('mousedown mouseup click', function(e) {
                            e.stopImmediatePropagation();
                        });
                });
            }
            attachListenersToTextFieldsInTH();

            // disable buttons until selection is made
            disableButtons(feedbackTable);

            feedbackTable.on('column-visibility.dt', function(e, settings, column, state ){
                
                injectTextFieldsInTH();
                attachListenersToTextFieldsInTH();
            });

            // Does the selection and deselection process
            feedbackTable.on( 'select', function ( e, dt, type, indexes ) {

                if(indexes) { // check, in case doubleClick in table header textField
                    var rows, currentRow, user;
                    user = $scope.$parent.user;
                    $scope.selectedRow = indexes[0];
    
                    rows = $('tr', this);
                    rows.eq(indexes[0]+1).addClass('selected');
                    currentRow = dt.row($scope.selectedRow).data()
                    
                    if(currentRow.candelete == 1){
                        dt.button(3).enable();
                    }
                    else{
                        dt.button(3).disable();
                    }
                }
            });
            feedbackTable.on( 'deselect', function ( e, dt, type, indexes ) {
            	$scope.selectedRow = [];

            	disableButtons(dt);
            });
        	}// end if viewConfig equal to feedback
        });
    }

    // disables the Status toggle, Display toggle and Delete buttons
    var disableButtons = function(feedbackTable) {
    	feedbackTable.button(3).disable();
    }

    var clearFilters = function(feedbackTable) {
    	feedbackTable.columns().eq(0).each(function(colIdx) {
    		feedbackTable.column(colIdx).search('');
        });
    	$('#feedback_id thead th > input').each( function () {
            this.value = '';
        } );
    	feedbackTable.column(0).search('').draw();
    }

    $scope.runFeedbackDataTable();
 }]);