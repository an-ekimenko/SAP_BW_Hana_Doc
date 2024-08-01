cpControllers.controller('AliasesCtrl', ['$scope', '$uibModal', '$log', 'userSharedService', 'Notification', 'stateService', 'aliasConfiguration', '$interval', '$rootScope',
                                                function($scope, $uibModal, $log, sharedService, Notification, stateService, aliasConfiguration, $interval, $rootScope) {

 	$scope.$parent.viewTitle = 'Deliverable Aliases';
 	$scope.$parent.productLink = null;
	$scope.$parent.showSearchIcon = true;
	$scope.$parent.viewerOn.value = false; //Determine whether the viewer is open
	var VIEWER_FORMAT = "html5.uacp";
	
    // Make into struct later once refactoring
    $scope.id = "";
    $scope.loio = "";
    $scope.version = "";
    $scope.language = "";
    $scope.alias = "";
    
    $scope.project_name = "";
    $scope.title = "";
    $scope.transtype = "";
    
    $scope.draft_alias = "";
    $scope.test_alias = "";
    $scope.prod_alias = "";
    $scope.selectedRow = null;
    
    $scope.editAliasView = function(data) {
        aliasConfiguration.setConfig(data);
        sharedService.broadcastEditAlias(data);
    };
    
    $scope.getState = function(state, row) {
        for(var i = 0; i < row.states.length; i++)
        {
          if(row.states[i] == state)
          {
            return row.states[i];
          }
        }
        
        return undefined;
    };

    $scope.runAliasesDataTable = function () {

        $scope.globalD = undefined;
        $scope.$on('$viewContentLoaded', function(event , viewConfig) {
        	if(viewConfig == "dashboard-aliases@aliases") {
            $('#aliases_id thead th').each( function () {
                var id = $('#aliases_id thead th').eq( $(this).index() ).attr('id');
                
                if(id!='draft_alias' && id!='test_alias' && id!='prod_alias'  && id!= 'edit' ) {
                    var title = $('#aliases_id thead th').eq( $(this).index() ).text();
                    $(this).html( '<input type="text" placeholder="Filter '+title+'" />' );
                }                
            } );

            var events = $('#events');
            var t2 = $('#aliases_id').DataTable({
                "orderCellsTop": true,
                "dom": '<"dashboard-buttons"B>rtip',
                //"dom": 'Brtip',
                "destroy": true,
                "serverSide": true,
                "processing": true,
                "deferRender": true,
                "buttons": [
                    
                    {
                        extend: 'colvis',
                        text: 'Column Visibility'
                    },
                                   
                    {
                        name: 'reload',
                        text: 'Reload',
                        action: function ( e, dt, node, config ) {
                            t2.ajax.reload();
                        }
                    },
                    {
                        name: 'edit',
                        text: 'Edit',
                        action: function ( e, dt, node, config ) {
                            if($scope.selectedRow!=null) {
                                $scope.editAliasView($scope.data[$scope.selectedRow]);
                            }
                            $scope.selectedRow = null;
                        }
                    },
                ],
                select: 'single',
                colReorder: {
                    realtime: true
                },
                stateSave:  true,
                lengthMenu: [20],
                ajax: {
                    url: '/http.svc/aliases',
                    start: 0,
                    length:20,
                    pages: 5,
                    data: function(d) {
                        d.$page_size = d.length;
                        d.$page = Math.ceil((d.start/d.length)+1);
                        d.$pageCount = d.length;

                        d.project_name = d.columns[0].search.value;
                        d.title = d.columns[1].search.value;
                        d.transtype = d.columns[2].search.value;
                        
                        d.loio = d.columns[3].search.value;

                        d.version = d.columns[4].search.value;

                        d.language = d.columns[5].search.value;
                        d.alias = d.columns[6].search.value;                        

                        var columnID = $('#aliases_id thead th').eq(d.order[0].column).attr('id');
                        d.$orderbycolumn=columnID;
                        d.$orderbytype=(d.order[0].dir == "asc") ? "ASC" : "DESC";

                        $scope.globalD = d;
                    },
                    dataSrc: function (json) {
                        json.page = json.data.meta.page;
                        json.recordsTotal = json.data.meta.total;
                        json.recordsFiltered = json.data.meta.total;
                        $scope.globalD.total = json.data.meta.total;
                        $scope.data = json.data.result;
                        return json.data.result;
                    },
                },
                columns: [
                    { title: "Project", data: 'project_name'},
                    { title: "Title", data: 'title'},
                    { title: "Format", data: 'format'},
                    { title: "LOIO", data: "loio", className: 'loio',
						render: function (data, type, full, meta) {
							return "loio" + data;
						}
                    },
                    { title: "Version", data: 'version'},
                    { title: "Language", data: 'language'},
                    { title: "Alias", data: function ( row, type, set ) {
                            
                           if(row.alias) {
                               return row.alias;
                           }
                           else {
                               return '';
                           }
                        }
                    },                  
                    { 
                        title: "Draft Alias",
                        orderable: false, 
                        data: function ( row, type, set ) {

                            var state = $scope.getState('DRAFT', row);

                            if (state && row.alias) {
                                if (row.format == VIEWER_FORMAT) {
                                	return '<a target="_blank" href="/viewer/DRAFT/' + row.alias + '" >' + '/DRAFT/' + row.alias + '</a>';
                                }
                                else if (/productpage/.test(row.format)) {
                                	return '<a target="_blank" href="/viewer/product/DRAFT/' + row.alias + '" >' + '/product/DRAFT/' + row.alias + '</a>';
                                }
                                else {
                                	return '<a target="_blank" href="/DRAFT/' + row.alias + '/' + row.root_page + '" >' + '/DRAFT/' + row.alias  + '/' + row.root_page +  '</a>';
                                }
                            }

                            return '';
                         }
                    },
                    { 
                        title: "Test Alias",
                        orderable: false, 
                        data: function ( row, type, set ) {

                            var state = $scope.getState('TEST', row);

                            if (state && row.alias) {
                                if (row.format == VIEWER_FORMAT) {
                                	return '<a target="_blank" href="/viewer/TEST/' + row.alias + '" >' + '/TEST/' + row.alias + '</a>';
                                }
                                else if (/productpage/.test(row.format)) {
                                	return '<a target="_blank" href="/viewer/product/TEST/' + row.alias + '" >' + '/product/TEST/' + row.alias + '</a>';
                                }
                                else {
                                	return '<a target="_blank" href="/TEST/' + row.alias + '/' + row.root_page + '" >' + '/TEST/' + row.alias  + '/' + row.root_page +  '</a>';
                                }
                            }

                            return '';
                         }
                    },
                    { 
                        title: "Prod Alias",
                        orderable: false, 
                        data: function ( row, type, set ) {

                            var state = $scope.getState('PRODUCTION', row);

                            if (state && row.alias) {
                                if (row.format == VIEWER_FORMAT) {
                                	return '<a target="_blank" href="/viewer/' + row.alias + '" >' + '/' + row.alias + '</a>';
                                }
                                else if (/productpage/.test(row.format)) {
                                	return '<a target="_blank" href="/viewer/product/' + row.alias + '" >' + '/product/' + row.alias + '</a>';
                                }
                                else {
                                	return '<a target="_blank" href="/' + row.alias + '/' + row.root_page + '" >' + '/' + row.alias  + '/' + row.root_page +  '</a>';
                                }
                            }

                            return '';
                         }
                    }
                ]
            });

            function injectTextFieldsInTH () {

                $('#aliases_id thead th').each( function () {
                    var titleH = $('#aliases_id thead th').eq( $(this).index() ).text();
                    var variable = $('#aliases_id thead th').eq( $(this).index() ).attr('id');
                   
                    if(variable!='draft_alias' && variable!='test_alias' && variable!='prod_alias' && variable!= 'edit' ) {
                        var valOfTB=$scope.globalD[variable];
    
                        if (variable == 'loio' && valOfTB != '') {
                            valOfTB = 'loio' + valOfTB;
                        }
    
                        $(this).html( titleH+'<br><input class="display" type="text" value="'+valOfTB+'"placeholder="Filter '+titleH+'" />' );
                    }
                } ); 
            }
            injectTextFieldsInTH();

            function attachListenersToTextFieldsInTH() {
                t2.columns().eq(0).each(function(colIdx) {
                    var variable = t2.column(colIdx).header().id,
                        search;
                    
                    if (variable!='draft_alias' && variable!='test_alias' && variable!='prod_alias' && variable!= 'edit') {
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
                                    var term = angular.copy(data.value),
                                        id = data.id;
    
                                    if (id == "loio") {
                                        term = term.replace("loio", '');
                                    } else if (id == "title") {
                                        term = encodeURIComponent(term);
                                    }
    
                                    t2.column(colIdx)
                                      .search(term)
                                      .draw();
                                }, 600, 1, false, {value: this.value, id: t2.column(colIdx).header().id});
                            }
                        });
                     
                        $('input', t2.column(colIdx).header()).on('mousedown mouseup click', function(e) {
                            e.stopImmediatePropagation();
                        });
                    }
                }); 
            }
            attachListenersToTextFieldsInTH();


            t2.on('column-visibility.dt', function(e, settings, column, state ){
                
                injectTextFieldsInTH();
                attachListenersToTextFieldsInTH();
            });

            // Does the selection and deselection process
            t2.on( 'select', function ( e, dt, type, indexes ) {

                if(indexes) { // check, in case doubleClick in table header textField

                    $scope.selectedRow = indexes[0];
                    
                     t2.$('tr.selected').removeClass('selected');
                     
                     var rows = $('tr', this);
                     rows.eq(indexes[0]+1).addClass('selected');                
                }
            });
            t2.on( 'deselect', function ( e, dt, type, indexes ) {
                $scope.selectedRow = [];
            });
        	} //end if viewConfig equal to aliases
        });
    }

    $scope.runAliasesDataTable();
 }]);
