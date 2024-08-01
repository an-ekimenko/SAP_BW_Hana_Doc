cpControllers.controller('CommentsCtrl', ['$scope', '$route', '$log', '$uibModal', 'commentService', 'usersManagement', '$interval',
                                          'userSharedService', 'dashboardssharedservice', 'Notification', 'stateService', '$filter', '$cookies', '$rootScope',
                                          '$state', '$stateParams',
                                                function($scope, $route, $log, $uibModal, commentService, usersManagement, $interval,
                                                		sharedService, dashboardssharedservice, Notification, stateService, $filter, $cookies, $rootScope,
                                                		$state, $stateParams) {

 	$scope.$parent.viewTitle = 'Comments';
	$scope.$parent.showSearchIcon = true;
	$scope.$parent.viewerOn.value = false; //Determine whether the viewer is open
	var isUserAdmin = $cookies.get("sapuacpuserisadmin");

	var STATUS_OPEN = 'OPEN',
		STATUS_RESOLVED = 'RESOLVED',
		DISPLAY_HIDEN = 'HIDDEN',
		DISPLAY_VISIBLE = 'VISIBLE',
		BUTTON_REOPEN = 'Set to Open',
		BUTTON_RESOLVE = 'Set to Resolved',
		BUTTON_HIDE = 'Mark as Hidden',
		BUTTON_UNHIDE = 'Mark as Visible',
		BUTTON_DELETE = 'Delete Comment',
		BUTTON_FILTERS = 'Clear Filters';
    
    $scope.selectedRow = null;
    var urlParameters = getUrlParameters($stateParams);

    $scope.runCommentsDataTable = function () {
    	var initialLoad = true;

        $scope.globalD = undefined;
        $scope.$on('$viewContentLoaded', function(event, viewConfig) {
        	if (viewConfig == "comments@comments") {
        		
				$('#comments_id thead th').each( function () {
					var id = $('#comments_id thead th').eq( $(this).index() ).attr('id');
	
					if (id != 'no_of_replies') {
						var title = $('#comments_id thead th').eq( $(this).index() ).text();
						$(this).html( '<input type="text" placeholder="Filter '+title+'" />' );
					}
            	} );
	
	            var events = $('#events');
	            var commentsTable = $('#comments_id').DataTable({
	                "orderCellsTop": true,
	                "dom": '<"dashboard-buttons"B>rtip<"bottom"l>',
	                "destroy": true,
	                "serverSide": true,
	                "processing": true,
	                "deferRender": true,
	                "order": [[6, 'desc']],/* order by created date*/
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
	                    	name: 'toggle_resolve',
	                    	className: 'toggle-resolve-button',
	                    	text: BUTTON_RESOLVE,
	                    	action: function ( e, dt, node, config) {
	                    		commentService.toggleResolve({
	                    			id: dt.row($scope.selectedRow).data().id,
	                				status: dt.row($scope.selectedRow).data().state
	                    		}, function(response) {
	                    			// success handler
	                    			$scope.selectedRow = null;
	                    			disableButtons(dt);
	                    			dt.ajax.reload();
	                    		}, function(error) {
	                    			// error handler
	                    		});
	                    	}
	                    },
	
	                    {
	                    	name: 'toggle_hide',
	                    	className: 'toggle-hide-button',
	                    	text: BUTTON_HIDE,
	                    	action: function ( e, dt, node, config) {
	                    		commentService.toggleHide({
	                    			id: dt.row($scope.selectedRow).data().id,
	                				display: dt.row($scope.selectedRow).data().display
	                    		}, function(response) {
	                    			// success handler
	                    			$scope.selectedRow = null;
	                    			disableButtons(dt);
	                    			dt.ajax.reload();
	                    		}, function(error) {
	                    			// error handler
	                    		});
	                    	}
	                    },
	
	                    {
	                    	name: 'delete',
	                    	className: 'toggle-delete-button',
	                    	text: BUTTON_DELETE,
	                    	action: function ( e, dt, node, config) {
	                    		commentService.deleteComment({
	                    			id: dt.row($scope.selectedRow).data().id
	                    		}, function(response) {
	                    			// success handler
	                    			$scope.selectedRow = null;
	                    			disableButtons(dt);
	                    			dt.ajax.reload();
	                    		}, function(error) {
	                    			// error handler
	                    		});
	                    	}
						},
						
	                    {
	                        extend: 'excel',
	                        text: 'Export to CSV',
							action: function( e, dt, node, config ) {
								
								var d = {};

								/* $page_size = 0 means 
								* that there is no limit to the number of records to return
								* because the same back-end service is used to populate the 
								* dashboards with paginated data
								*/
								d.$page_size = 0;
								
								// data for filtering
								d.title = $scope.globalD.columns[0].search.value;
								d.versionName = $scope.globalD.columns[1].search.value;
								d.status = $scope.globalD.columns[2].search.value;
								d.topic = $scope.globalD.columns[3].search.value;
								d.comment = $scope.globalD.columns[4].search.value;
								d.commenter = $scope.globalD.columns[5].search.value;
								d.state = $scope.globalD.columns[8].search.value;
								d.display = $scope.globalD.columns[9].search.value;
								d.version = $scope.globalD.columns[10].search.value;
								d.locale = $scope.globalD.columns[11].search.value;
								d.projectId = $scope.globalD.columns[12].search.value;
								d.projectName = $scope.globalD.columns[13].search.value;
								d.author = $scope.globalD.columns[14].search.value;
								
								//data for ordering / sorting
								d.$order_by = ($scope.globalD.order[0].dir == "asc") ? 
										$scope.globalD.columns[$scope.globalD.order[0].column].data+':ASCENDING' 
										: $scope.globalD.columns[$scope.globalD.order[0].column].data+':DESCENDING';
								
								
								var queryParams = {
									title: d.title,
									versionName: d.versionName,
									status: d.status,
									topic: d.topic,
									comment: d.comment,
									commenter: d.commenter,
									state: d.state,
									display: d.display,
									version: d.version,
									locale: d.locale,
									projectId: d.projectId,
									projectName: d.projectName,
									author: d.author,

									$page_size: d.$page_size,
									$order_by: d.$order_by
								}

								$uibModal.open({
									templateUrl: '_build_938311c7a845691adeabc837/partials/dashboard-export-comments-csv-modal.html',
									controller: 'ExportCommentsCSVmodalCtrl',
									resolve: {
										params: queryParams
									}
								});
	
							}
	                    }
						
	                ],
	                select: 'single',
	                colReorder: {
	                    realtime: false
	                },
	                stateSave:  true,
	                stateDuration: 0,
	                lengthMenu: [[20,30,50,100,500],[20,30,50,100,500]],
	                ajax: {
	                    url: '/http.svc/comments',
	                    start: 0,
	                    length:20,
	                    pages: 5,
	                    data: function (d) {
	                    	// data for pagination
	                    	d.$page_size = d.length;
	                        d.$page = Math.ceil((d.start/d.length)+1);
	                        d.$pageCount = d.length;

	                        var columns = d.columns;

							if (initialLoad) {
			                    if (!$.isEmptyObject(urlParameters)) {
			                    	// Populate column values from url
			                    	for (var parameter in urlParameters) {
			                    		for (var i = 0; i < columns.length; i++) {

			                    			var searchKey = columns[i].data

			                                if (searchKey === parameter) {
			                                    d[parameter] = urlParameters[parameter];
			                                    break;
			                                }
			                    		}
			                    	}
			                    } else {
			                    	// Populate url with values from local storage
			                    	for (var i = 0; i < columns.length; i++) {
			                    		var name = columns[i].data,
			                    			value = columns[i].search.value;

			                    		if (value != "") {
			                    			urlParameters[name] = value;
			                    			d[name] = value;
			                    		}
			                    	}

			                    	$state.go("comments", urlParameters,
					    			{
										location: "replace",
										inherit: false,
										relative: $state.$current,
										notify: false
					    			});
			                    }

							}

							// data for filtering
							for (var i = 0; i < columns.length; i++) {
								var variable = d.columns[i].data;

								if (!d[variable]) {
									if (initialLoad) {
										d[variable] = ""
									} else {
										d[variable] = d.columns[i].search.value;
									}
								}
							}

	                        //data for ordering / sorting
	                        d.$order_by = (d.order[0].dir == "asc") ? 
	                                  d.columns[d.order[0].column].data+':ASCENDING' 
	                                : d.columns[d.order[0].column].data+':DESCENDING';
	
	                        initialLoad = false;
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
	                    { title: "Title", data: 'title', "width": "15%"},
	                    { title: "Version Name", data: 'versionName', "width": "5%"},
	                    { title: "Status", data: 'status'},
	                    { title: "Topic", data: 'topic', "width": "15%"},
	                    { 
	                    	title: "Comment",
	                    	data: 'comment',
	                    	orderable: false,
	                    	"width": "25%",
	                    	"fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
	                    		if (oData.topicURL) {
	                    			$(nTd).html("<a href='" + oData.topicURL 
	                    					+ "?show_comments=true&comment_id=" + oData.id 
	                    					+ "' target='_blank'>" + sData + "</a>");
	                    		} else {
	                    			$(nTd).html("<p>" + sData + "</p>");
	                    		}
	                        }
	                    },
	                    { title: "Commenter", data: 'commenter'},
	                    { 
	                    	title: "Created On", 
	                    	data: 'created_date', 
	                    	type: 'date',
	                    	render: function ( data, type, row ) {
								return  data? $filter('date')(data, 'd-MMM-yyyy HH:mm') : '';
	                    	}, 
	                    	"width": "5%"},
	                    { title: "No. of Replies", orderable: false, data: 'no_of_replies', "width": "5%"},
	                    { title: "State", data: 'state', "width": "5%"},
	                    { title: "Display", data: 'display', "width": "5%"},
	                    { title: "Version", visible: false, data: 'version', "width": "5%"},
	                    { title: "Locale", visible: false, data: 'locale', "width": "5%"},
	                    { title: "Project ID", visible: false, data: 'projectId', "width": "5%"},
						{ title: "Project Name", visible: false, data: 'projectName', "width": "5%"},
						{ title: "Owner", visible: false, data: 'author'}
	                ]
	            });
	
				function injectTextFieldsInTH () {

					$('#comments_id thead th').each( function () {
						var thId = $('#comments_id thead th').eq( $(this).index() ).attr('id');
						var thText = $('#comments_id thead th').eq( $(this).index() ).text();
						var userInput = $scope.globalD[thId];
						
						if (thId == 'loio' && userInput != '') {
							userInput = 'loio' + userInput;
						}

						if (thId != 'no_of_replies' && thId != 'created_on') {
							$(this).html( thText+'<br/><input class="display" id="' + thId + '" type="text" value="'+userInput+'"placeholder="Filter '+thText+'" />' );
						}
					} );

				}
				injectTextFieldsInTH();

	            function attachListenersToTextFieldsInTH () {
					
					commentsTable.columns().eq(0).each(function(colIdx) {
						var variable = commentsTable.column(colIdx).header().id,
							search;
							$('input', commentsTable.column(colIdx).header()).on('keyup change', function(event) {
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
											id = data.id,
											index;

										if (id == "title" || id == "topic" || id == "comment") {
											term = encodeURIComponent(term);
										}

										for (var i = 0; i < commentsTable.columns().eq(0).length; i++) {
											for (var parameter in urlParameters) {
												var column = commentsTable.column(i);
												if (parameter == column.header().id && parameter != id) {
													index = getColumnIndexByName(parameter, commentsTable);
													commentsTable.column(index).search(urlParameters[parameter]);
												}
											}
										}

										urlParameters[id] = term;
										index = getColumnIndexByName(id, commentsTable);

										$state.go("comments", urlParameters,
						    			{
											location: "replace",
											inherit: false,
											relative: $state.$current,
											notify: false
						    			});

										commentsTable.column(index)
										.search(term)
										.draw();
									}, 600, 1, false, {value:this.value, id: this.id});
								}
							});
						
							$('input', commentsTable.column(colIdx).header()).on('mousedown mouseup click', function(e) {
								e.stopImmediatePropagation();
							});
					});
				}
				attachListenersToTextFieldsInTH();

	            // disable buttons until selection is made
	            disableButtons(commentsTable);

	            commentsTable.on('column-visibility.dt', function(e, settings, column, state ){
	            	commentsTable.ajax.reload();
					injectTextFieldsInTH();
					attachListenersToTextFieldsInTH();
	            });

	            commentsTable.on( 'column-reorder', function ( e, settings, details ) {
	            	commentsTable.ajax.reload();
	                injectTextFieldsInTH();
	                attachListenersToTextFieldsInTH();
	            });
				
	            // Does the selection and deselection process
	            commentsTable.on( 'select', function ( e, dt, type, indexes ) {

					if(indexes) { // check, in case doubleClick in table header textField

						var rows, currentRow, user;
						user = $scope.$parent.user;
						$scope.selectedRow = indexes[0];
		
						rows = $('tr', this);
						rows.eq(indexes[0]+1).addClass('selected');
						currentRow = dt.row($scope.selectedRow).data()
		
						// changes the Status / Display toggle button text according to the row selected
						if (currentRow.state && currentRow.display) {
							if (currentRow.state === STATUS_OPEN) {
								dt.button(3).text(BUTTON_RESOLVE);
							} else if (currentRow.state === STATUS_RESOLVED) {
								dt.button(3).text(BUTTON_REOPEN);
							}
		
							if (currentRow.display === DISPLAY_VISIBLE) {
								dt.button(4).text(BUTTON_HIDE);
							} else if (currentRow.display === DISPLAY_HIDEN) {
								dt.button(4).text(BUTTON_UNHIDE);
							}
						}
		
						if (currentRow.isUserAuthorized) {
							dt.button(5).enable();
						}
		
						dt.button(3).enable();
						dt.button(4).enable();
					}
	            });
	            commentsTable.on( 'deselect', function ( e, dt, type, indexes ) {
	            	$scope.selectedRow = [];
	
	            	disableButtons(dt);
	            });

	            function getColumnIndexByName(name, commentsTable) {
	            	var columns = commentsTable.columns().eq(0);

	            	for (var i = 0; i < commentsTable.columns().eq(0).length; i++) {
	            		if (commentsTable.column(i).header().id == name) {
	            			return i;
	            		}
	            	}
	            };


			} // end if viewConfig equal to comments
		});
	}
	
    // disables the Status toggle, Display toggle and Delete buttons
    var disableButtons = function(commentsTable) {
    	commentsTable.button(3).disable();
    	commentsTable.button(4).disable();
    	commentsTable.button(5).disable();
    }

    var clearFilters = function(commentsTable) {
    	commentsTable.columns().eq(0).each(function(colIdx) {
            	commentsTable.column(colIdx).search('');
        });
    	$('#comments_id thead th > input').each( function () {
            this.value = '';
        } );

    	$state.go("comments", {},
		{
			location: "replace",
			inherit: false,
			relative: $state.$current,
			notify: false
		});

    	urlParameters = {};

    	commentsTable.column(0).search('').draw();
    }

    function getUrlParameters(params) {
    	var result = {};

    	for (var parameter in params) {
    		var value = params[parameter];
    		if (value) {
    			result[parameter] = value;
    		}
    	}

    	return result;
    }

    $scope.runCommentsDataTable();
 }]);
