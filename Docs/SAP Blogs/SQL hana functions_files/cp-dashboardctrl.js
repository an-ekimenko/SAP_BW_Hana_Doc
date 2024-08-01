 'use strict';
 /* Dashboard Controllers */
 var cpDashboardController = angular.module('cpDashboardCtrl', []);
 
 

 cpDashboardController
 	.controller('DashboardCtrl',
 			['$scope', '$uibModal', 'deleteDeliv',
 			 'deliverables', '$cookies', '$log', '$window',
 			 'userSharedService', 'dashboardssharedservice', 'Notification', 'PATHS', '$location',
 			 '$filter', '$interval', '$rootScope',
 			 function($scope, $uibModal, deleteDeliv,
 					 deliverables, $cookies, $log, $window,
 					 sharedService, dashboardssharedservice, Notification, PATHS, $location,
 					 $filter, $interval, $rootScope) {

 	$scope.isUserAdmin = ($cookies.get("sapuacpuserisadmin") == "1"? true:false);
 				
    /* Initialization of Variables */
 	$scope.$parent.viewTitle = 'Deliverables';
 	$scope.$parent.productLink = null;
	$scope.$parent.showSearchIcon = true;
	$scope.$parent.viewerOn.value = false; //Determine whether the viewer is open

    $scope.deliverableList = [];

 	$scope.canDelete = false; // if a user can delete a deliverable.
 	$scope.canPublish = false; // if a user can publish a deliverable.
    $scope.hasProj = false; // For project
    $scope.projectID = ''; // Controller project ID holder
    $scope.URLparams = {}; // Used to hold the URL parameters for filtering
    
    $scope.applicationVersion = '';

    // Linking to viewer
 	$scope.url = function(state) {
 		if (state === 'PRODUCTION') {
 			return '';
 		} else {
 			return '/' + state;
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
 	$scope.getRawContentURL = function(oData) {
 		if (oData.alias) 
 		{
 			return $scope.aliasURL(oData) + '/' + oData.rootPage;
 		}
 		else 
 		{
 			if (oData.state === 'PRODUCTION') {
 				return PATHS.RESOURCE_URL + '/'  + oData.loio + '/' 
 					+ oData.version + '/' +  oData.locale + '/' 
 					+ encodeURIComponent(oData.rootPage).replace(/%2F/g, "/");
 			} else {
 				return PATHS.RESOURCE_URL + '/' + oData.state + '/' 
 					+ oData.loio + '/' + oData.version + '/' +  oData.locale + '/' 
 					+ encodeURIComponent(oData.rootPage).replace(/%2F/g, "/");
 			}
 		}
 	}
 	
 	// For viewer linking
 	$scope.getViewerURL = function(oData) {
        
 	   if(oData.alias) {
           return PATHS.BASE_URL + $scope.aliasURL(oData);
       }
       else 
       {
           return PATHS.BASE_URL + $scope.url(oData.state) + '/' + oData.loio + '/' + oData.version + '/' + oData.locale;
       }
     }

    // Used to delete a deliverable from dashboard
 	$scope.$on('handleDeleteDeliv', function() {
 		var delivIndex = $scope.deliverableList.data.d.results.indexOf(sharedService.deliverable);

 		if(delivIndex > -1) {
 			$scope.deliverableList.data.d.results.splice(delivIndex,1);
 		}
 		$scope.selectedRow = null;
 		$scope.canDelete = false;
 	});

    // What occurs when a deliverable is clicked on the datatable.
    // Needs to be re-done
 	$scope.handleDelivClick = function (deliverables) {
        if (deliverables != null) {
        	var deliverablesLength = deliverables.length;
        	if (deliverablesLength > 0) {
        		$scope.canDelete = true;
            	$scope.canPublish = true;

            	for (var i = 0; i < deliverablesLength; i++) {
            		if (deliverables[i].delete != 1) {
             			$scope.canDelete = false;
             			break;
             		}
        		}

            	for (var i = 0; i < deliverablesLength; i++) {
        			if (deliverables[i].publish != 1) {
             			$scope.canPublish = false;
             			break;
             		}
            	}

            	if (deliverables[0].projectId != null || deliverables[0].projectId != '') {
                        $scope.projectID = deliverables[0].projectId;
                        $scope.hasProj = true;
                }
                else {
                        $scope.projectID = '';
                        $scope.hasProj = false;
                }
        	} else {
        		$scope.canDelete = false;
            	$scope.canPublish = false;
        	}
        	
        }
        sharedService.sendDeliverable(deliverables);
 	};
 	
    // Used to linking
 	$scope.go = function (deliverable) {
 		var path = $scope.url(deliverable.state) + '/' + deliverable.loio + '/' + deliverable.version + '/' + deliverable.locale;
		$location.url(path);
 	}
 	
    // Used for linking
 	$scope.displayDeliv = function(deliverable) {
 		var target = PATHS.RESOURCE_URL + '/' + deliverable.state + '/' + deliverable.loio + '/' + deliverable.version + '/' +  deliverable.locale + '/' + deliverable.rootPage;
 		$window.open(target, '_blank');
 		return;
 	}

    // Code used for exporting excel.
    $scope.convertToCSV = function(objArray, dt, limit) {    	
            var str = '';  
            
            if(objArray.length>=limit) {
            	str = 'You cannot export more than '+limit+' deliverables at one time.\r\n';
            }
            
            var visCols = []; // what columns are currently visable.
            var col=0;

            // Loop through visable columns
            $('#table_id thead th').each( function () {
                var title = ($('#table_id thead th').eq(col).text()); // grab
																		// column
																		// name
                var variable = $('#table_id thead th').eq(col).attr('id'); // grab
																			// column's
																			// data
																			// ID
                str += title + "	";
                visCols.push(variable);
                col++;
            });

            str.slice(0,-1);
            str += '\r\n';

            for (var i = 0; i < objArray.length; i++) {
                var line ='';
                for (var j=0; j < visCols.length; j++ ) {
                    var variable = visCols[j];
                    line += '"'+objArray[i][variable]+'"	';
                }
                str += line + '\r\n';
            }
 
            return str;
        }

    // This is the main data-tables function (Initializes the datatable).
     $scope.runDataTable = function () {

        var useLocalState; //Stores boolean option to restore local storage search values 
    	var urlInitialized; //Stores whether it is the first time url parameters are being used 
    	
    	//if there are no url parameters retrieve state from local storage 
    	if($.isEmptyObject($location.search())) {
    		useLocalState = true; //Column values are handled from localStorage values
    	} else { 
    		useLocalState = false; //Column values are handle from url parameters 
    	}

        $scope.globalD = undefined; // Used as a data-holder to store what is
									// sent as HTTP request
        var UACP_HTML = 'html5.uacp',
        	UACP_PRODUCTPAGE = 'productpage.uacp',
        	UACP_ZIP = 'zip';
        
        $scope.$on('$viewContentLoaded', function(event, viewConfig) {
        	if(viewConfig == "dashboard@deliverables" ) {

            // Initializing the filter boxes
            $('#table_id thead th').each( function () {
                var title = $('#table_id thead th').eq( $(this).index() ).text();
                 $(this).html( '<input type="text" placeholder="Filter '+title+'" />' );
            } );
            
            var events = $('#events'); // Used to aid selection

            var t = $('#table_id').DataTable({
                "dom": '<"dashboard-buttons"B>rtip<"bottom"l>', // Document
																// Object Model
																// for DT
                "destroy": true, // destroys and rebuilds table
                "serverSide": true,
                "processing": true,
                "order": [[ 6, "desc" ]],
                "deferRender": true, // waits for server communication to
										// render table
                "buttons": [ // buttons for the datatable
                     {
                         extend: 'colvis',
                         text: 'Column Visibility'
                     },// Column visability
                    {
                        name: 'excel',
                        text: 'Export to CSV',
                        action: function ( e, dt, node, config) {

                            /* $top = 0 means 
                            * that there is no limit to the number of records to return
                            * because the same back-end service is used to populate the 
                            * dashboards with paginated data
                            */
                            var queryParams = {
                                $top: 0,
                                title: $scope.globalD['title'],
                                transtype: $scope.globalD['transtype'],
                                locale: $scope.globalD['locale'],
                                loio: $scope.globalD['loio'],
                                version:$scope.globalD['version'],
                                versionName: $scope.globalD['versionName'],
                                build: $scope.globalD['build'],
                                uploadedDate:  $scope.globalD['uploadedDate'],
                                uploadedBy:  $scope.globalD['uploadedBy'],
                                productName:  $scope.globalD['productName'],
                                product:$scope.globalD['product'],
                                projectName:  $scope.globalD['projectName'],
                                buildableMapLOIO:  $scope.globalD['buildableMapLOIO'],
                                appUrl:  $scope.globalD['appUrl'],
                                contextType: $scope.globalD['contextType'],
                                system:  $scope.globalD['system'],
                                state:  $scope.globalD['state'],
                                // notSearchableFromOutside: $scope.globalD['notSearchableFromOutside'], (no text field for input)
                                // public: $scope.globalID['public'], (no text field for input)
                                indexerId: $scope.globalD['indexerId'],
                                author: $scope.globalD['author'],
                                uploadType: $scope.globalD['uploadType']
                        }

                            $uibModal.open({
                                templateUrl: '_build_938311c7a845691adeabc837/partials/dashboard-export-deliverables-csv-modal.html',
                                controller: 'ExportDeliverablesCSVmodalCtrl',
                                resolve: {
                                    params: queryParams
                                }
                            });

                        }
                    },
                    {
                        className: 'clear-filters-button',
                        text: 'Clear Filters',
                        action: function ( e, dt, node, config) {
                    		clearFilters(dt);
                    	}
                    },
                    {
                        name: 'manageGroup',
                        text: 'Manage Groups',
                        action: function ( e, dt, node, config ) {
                        	$uibModal.open({
                                templateUrl: '_build_938311c7a845691adeabc837/partials/dashboard-usergroupmgmt.html',
                                windowClass: 'app-modal-window',
                                controller: 'ModalInstanceCtrl'
                            });
                        }
                    },
                    {
                        name: 'authorize',
                        text: 'Authorize',
                        enabled: false,
                        className: 'authorize-button',
                        action: function ( e, dt, node, config ) {
                            //sharedService.broadcastAuthorize();
                        	var modalInstance = $uibModal.open({
                                templateUrl: '_build_938311c7a845691adeabc837/partials/dashboard-userauth.html',
                                controller: 'ModalInstanceCtrl',
                                windowClass: 'app-modal-window'
                            });
                        }
                    },
                    {
                        text: 'Select All Deliverables on Page',
                        action: function ( e, dt, node, config ) {
                            t.rows().select();
                        }
                    },
                    {
                        name: 'download',
                        text: 'Download',
                        action: function ( e, dt, node, config ) {
                            sharedService.broadcastDownload();
                        }
                    },
                    {
                        name: 'upload',
                        text: 'Upload',
                        className: 'upload-button',
                        enabled: $scope.isUserAdmin,
                        action: function ( e, dt, node, config ) {
                            sharedService.broadcastUpload();
                        }
                    },
                    {
                        name: 'publish',
                        className: 'publish-button',
                        text: 'Publish',
                        action: function ( e, dt, node, config ) {
                        	$uibModal.open({
                        		templateUrl: '_build_938311c7a845691adeabc837/partials/dashboard-publication.html',
                        		controller: 'ModalInstanceCtrl',
                        		windowClass: 'app-modal-window',
                        		scope: $scope
                        	});
                        }
                    },     
                    {
                        name: 'delete',
                        className: 'delete-button',
                        text: 'Delete',
                        action: function ( e, dt, node, config ) {
                            sharedService.broadcastDelete();
                        }
                    },
                    {
                        name: 'reload',
                        text: 'Reload',
                        action: function ( e, dt, node, config ) {
                        	dt.button(7).disable();
                        	dt.button(8).disable();
                        	sharedService.deliverable = undefined;
                        	sharedService.deliverableList = [];
                            sharedService.broadcastReloadDT();
                        }
                    },
                    {
                        name: 'manual_upload',
                        text: 'Manual Upload',
                        extend: 'collection',
                        background: false,
                        fade: 0,
                        buttons: [
                            {
                            	className: 'new-deliverable-button',
                            	text: 'New Deliverable',
                            	action: function () {
                            		$scope.pageType = 'newDeliverable';
                            		$uibModal.open({
                                        templateUrl: '_build_938311c7a845691adeabc837/partials/dashboard-manual-upload.html',
                                        controller: 'ModalInstanceCtrl',
                                        windowClass: 'app-modal-window',
                                        scope: $scope
                                    });
                            	}
                            },
                            {
                            	className: 'new-revision-button',
                            	text: 'New Revision',
                            	enabled: false,
                            	action: function () {
                            		$scope.pageType = 'newRevision';
                            		$uibModal.open({
                                        templateUrl: '_build_938311c7a845691adeabc837/partials/dashboard-manual-upload.html',
                                        controller: 'ModalInstanceCtrl',
                                        windowClass: 'app-modal-window',
                                        scope: $scope
                                    });
                            	}
                            },
                            {
                            	className: 'new-version-button',
                            	text: 'New Version',
                            	enabled: false,
                            	action: function () {
                            		$scope.pageType = 'newVersion';
                            		$uibModal.open({
                                        templateUrl: '_build_938311c7a845691adeabc837/partials/dashboard-manual-upload.html',
                                        controller: 'ModalInstanceCtrl',
                                        windowClass: 'app-modal-window',
                                        scope: $scope
                                    });
                            	}
                            },
                            {
                            	className: 'new-translation-button',
                            	text: 'New Translation',
                            	enabled: false,
                            	action: function () {
                            		$scope.pageType = 'newTranslation';
                            		$uibModal.open({
                                        templateUrl: '_build_938311c7a845691adeabc837/partials/dashboard-manual-upload.html',
                                        controller: 'ModalInstanceCtrl',
                                        windowClass: 'app-modal-window',
                                        scope: $scope
                                    });
                            	}
                            },
                            {
                            	className: 'new-format-button',
                            	text: 'New Format',
                            	enabled: false,
                            	action: function () {
                            		$scope.pageType = 'newFormat';
                            		$uibModal.open({
                                        templateUrl: '_build_938311c7a845691adeabc837/partials/dashboard-manual-upload.html',
                                        controller: 'ModalInstanceCtrl',
                                        windowClass: 'app-modal-window',
                                        scope: $scope
                                    });
                            	}
                            }
                        ]
                    },
                    {
                     	className: 'manual-edit-button',
                        name: 'manual-edit',
                        text: 'Edit Metadata',
                        enabled: false,
                        action: function ( e, dt, node, config ) {
                        	$uibModal.open({
                                templateUrl: '_build_938311c7a845691adeabc837/partials/dashboard-manual-edit.html',
                                controller: 'ModalInstanceCtrl',
                                windowClass: 'app-modal-window',
                                scope: $scope
                            });
                        }
                    },
                    {
                        className: 'edit-project-button',
                        text: 'Edit Project',
                        enabled: false,
                        action: function ( e, dt, node, config ) {
                        	$uibModal.open({
                                templateUrl: '_build_938311c7a845691adeabc837/partials/dashboard-edit-project.html',
                                controller: 'ModalInstanceCtrl',
                                windowClass: 'app-modal-window',
                                scope: $scope
                            });
                        }
                    },
                    {
                        name: 'products',
                        text: 'Products',
                        extend: 'collection',
                        background: false,
                        fade: 0,
                        buttons: [
                            {
                            	text: 'Create new product',
                            	action: function () {
                            		$scope.pageType = 'newProduct';
                            		$uibModal.open({
                                        templateUrl: '_build_938311c7a845691adeabc837/partials/dashboard-create-product.html',
                                        controller: 'ModalInstanceCtrl',
                                        windowClass: 'app-modal-window',
                                        scope: $scope
                                    });
                            	}
                            },
                            {
                            	className: 'edit-product-button',
                            	text: 'Edit selected product',
                            	enabled: false,
                            	action: function () {
                            		$scope.pageType = 'editProduct';
                            		$uibModal.open({
                                        templateUrl: '_build_938311c7a845691adeabc837/partials/dashboard-edit-product.html',
                                        controller: 'ModalInstanceCtrl',
                                        windowClass: 'app-modal-window',
                                        scope: $scope
                                    });
                            	}
                            }
                        ]
                    },
                    {
                        name: 'versions',
                        text: 'Versions',
                        extend: 'collection',
                        background: false,
                        fade: 0,
                        buttons: [
                            {
                            	text: 'Create new version',
                            	action: function () {
                            		$scope.pageType = 'newVersion';
                            		$uibModal.open({
                                        templateUrl: '_build_938311c7a845691adeabc837/partials/dashboard-create-version.html',
                                        controller: 'ModalInstanceCtrl',
                                        windowClass: 'app-modal-window',
                                        scope: $scope
                                    });
                            	}
                            },
                            {
                            	className: 'edit-version-button',
                            	text: 'Edit selected version',
                            	enabled: false,
                            	action: function () {
                            		$scope.pageType = 'editVersion';
                            		$uibModal.open({
                                        templateUrl: '_build_938311c7a845691adeabc837/partials/dashboard-edit-version.html',
                                        controller: 'ModalInstanceCtrl',
                                        windowClass: 'app-modal-window',
                                        scope: $scope
                                    });
                            	}
                            }
                        ]
                    },
                    {
                        className: 'search-options-button',
                        text: 'Search Options',
                        action: function ( e, dt, node, config ) {
                        	$uibModal.open({
                                templateUrl: '_build_938311c7a845691adeabc837/partials/dashboard-search-options.html',
                                controller: 'ModalInstanceCtrl',
                                windowClass: 'app-modal-window',
                                scope: $scope
                            });
                        }
                    },
                    {
                        className: 'url-mappings-button',
                        text: 'URL Mappings',
                        action: function ( e, dt, node, config ) {
                        	$uibModal.open({
                                templateUrl: '_build_938311c7a845691adeabc837/partials/dashboard-url-mappings.html',
                                controller: 'ModalInstanceCtrl',
                                windowClass: 'app-modal-window',
                                scope: $scope
                            });
                        }
                    },
                    {
                        className: 'change-slave-button',
                        text: 'Move',
                        action: function ( e, dt, node, config ) {
                        	$uibModal.open({
                                templateUrl: '_build_938311c7a845691adeabc837/partials/dashboard-change-slave.html',
                                controller: 'ModalInstanceCtrl',
                                windowClass: 'app-modal-window',
                                scope: $scope
                            });
                        }
                    }
                ],
                select: true, // makes table selectable
                colReorder: { // for column reordering
                    realtime: false
                },
                stateSave:  useLocalState, // saves state of datatable
                stateDuration: 0,
                lengthMenu: [[20,30,50,100,500],[20,30,50,100,500]], // options
																		// for
																		// length
																		// of
																		// datatable
                ajax: { // Ajax request sent.
                    url: '/http.svc/deliverables?$expand=project',
                    start: 0,
                    data: function(d) {

                        //main query
                        if(d.length == -1) {
                            if ($scope.globalD == undefined) {
                                d.$top=20;
                                d.$pageCount = 20;
                                d.$page = 1;
                            }
                            else {
                                d.$top=$scope.globalD.total;
                                d.$pageCount = $scope.globalD.total;
                                d.$page = 1;
                            }
                        }
                        else {
                            d.$top=d.length;
                            d.$page = Math.ceil((d.start/d.length)+1);
                            d.$pageCount = d.length;
                        }

                        //sorting
                        d.$orderby = (d.order[0].dir == "asc") ? 
                                  d.columns[d.order[0].column].data+':ASCENDING' 
                                : d.columns[d.order[0].column].data+':DESCENDING';
                       
                       //old code for filtering
                       if (d.draw <= 1) {

                            for (var i=0; i<23; i++) {
                                var variable = d.columns[i].data;
                                $scope.URLparams[variable] = d.columns[i].search.value; 
                            }; 
                        }

                                               
                       var columns = d.columns;
                       var urlParameters = $location.search();

                       if(useLocalState || urlInitialized) {
                           //Populate url from column values
                           
                           for(var i = 0; i<columns.length; i++) {
                               var searchKey = columns[i].data
                               columns[i].search.value = unescape(columns[i].search.value).trim()
                               
                               var searchValue = columns[i].search.value;  
                               
                               if(searchValue) {
                                   if(!searchValue.replace(/\s/g, '').length) {
                                       //If the search value is just spaces
                                       columns[i].search.value = "";
                                       $location.search(searchKey, null);
                                    } else {
                                        $location.search(searchKey, searchValue);                                                                    
                                    }
                               } else {
                                   for(var parameter in urlParameters) {
                                       if(searchKey === parameter) {
                                           //If the column value has been any emptied
                                           $location.search(parameter, null);     
                                       }
                                    }
                                }
                            }
                            useLocalState = false;
                            urlInitialized = true;
                       } else {
                           
                            //Populate column values from url
                           
                           for(var parameter in urlParameters) {
                               for(var i = 0; i<columns.length; i++) {
                                   
                                var searchKey = columns[i].data
                                
                                if(searchKey === parameter) {
                                    columns[i].search.value = unescape(urlParameters[parameter]);   
                                }
                            }
                        }
                        
                        urlInitialized = true
                    }

                        for (var i=0; i<23; i++) {
                            var variable = d.columns[i].data;
                            d[variable] = d.columns[i].search.value;
                        }; 

                        $scope.globalD = d;
                    },
                    dataSrc: function (json) {
                        json.page = json.data.d.meta.page;
                        json.recordsTotal = json.data.d.meta.total;
                        json.recordsFiltered = json.data.d.meta.total;
                        $scope.globalD.total = json.data.d.meta.total;
                        $scope.applicationVersion = json.data.d.applicationVersion;
                        return json.data.d.results;
                    },
                },
                columns: [ // The columns for the datatable
                    { title: "Title", data: 'title',
                    	"fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
                    		var path,
                    			target;
                    		if (oData.transtype == UACP_PRODUCTPAGE) {
                    			$(nTd).html(oData.title);
                            } else {
                            	if (oData.transtype == UACP_ZIP) {
                            		path = $location.protocol() + "://" + $location.host() + ":" + $location.port()
                            			+ "/http.svc/download?deliverable_id=" + oData.id;
                            		target = "target='_blank'";
                            	} else if (oData.transtype == UACP_HTML) {
                            		path = $scope.getViewerURL(oData);
                            		target = "target='_blank'";
                            	} else {
                            		path = $scope.getRawContentURL(oData);
                            		target = "target='_blank'";
                            	}

                            	$(nTd).html("<a href='" + path + "' " + target + ">" + oData.title + "</a>"); 
                            }
                         }
                    },
                    { title: "Version", data: 'version',
                    	 "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
                    		 $scope.NAfield(nTd, sData);
                    	 }
                    },
                    { title: "Version Name", data: 'versionName',
						 "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
							 $scope.NAfield(nTd, sData);
						 }
                    },
                    { title: "Status", data: 'state'},
                    { title: "Locale", data: 'locale'},
                    { title: "Build", data: 'build'},
                    { title: "Format", data: 'transtype'},
                    { 
                    	title: "Last Import date", 
                    	data: 'uploadedDate', 
                    	type: 'date',
                    	render: function ( data, type, row ) {
                            return data? $filter('date')(data, 'd-MMM-yyyy HH:mm') : '';
                    	}
                    	
                    },
                    {title: "Uploaded or published by", data: "uploadedBy"},
                    {title: "Upload Type", visible: false, data: "uploadType"},
                    { title: "Product", data: 'product',
                    	 "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
                    		 $scope.NAfield(nTd, sData);
    						 }
                    },
                    { title: "Product Name", data: 'productName',
                        "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
    							 var path = PATHS.BASE_URL + '/product/' + oData.state + '/' + encodeURIComponent(encodeURIComponent(oData.product)) + '/' + encodeURIComponent(encodeURIComponent(oData.version)) + '/' + oData.locale;
    							 $(nTd).html("<a href='"+path+"'>"+oData.productName+"</a>"); 
    							 $scope.NAfield(nTd, sData);
                        }
                    },
                    { title: "Project Name", data: 'projectName'},
                    { title: "Output ID", data: "loio",
                    	render: function (data, type, full, meta) {
                    		return "loio" + data;
                    	}
                    },
                    { title: "Buildable Map", data: 'buildableMapLOIO'},
                    { title: "Read Priv. Groups" , data: 'groups', visible: false, orderable: false,
                    	render: function (data, type, full, meta) {
                    		var groups = data,
                    		    result = "";

                    		if (groups) {
                    			result = getGroupsHtml(groups);
                    		} else {
                    			result = '<a class="authorization-link" data-row-id="' 
                    				+ meta.row + '">View more...</a>';
                    		}

                    		return  result;
                    	}
                    },
                    { title: "App URL", visible: false, data: 'appUrl'},
                    { title: "Help Type", visible: false, data:'contextType'},
                    { title: "System", visible: false, data: 'system'},
                    { title: "Searchable", visible: false, data: 'notSearchableFromOutside',
                    	"fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
                            if (oData.notSearchableFromOutside == 0) {
                            	$(nTd).html('<span class="glyphicon glyphicon-check"></span>');
                            } else {
                            	$(nTd).html('<span class="glyphicon glyphicon-unchecked"></span>');
                            }
                        }
                    },
                    { title: "Public", visible: false, data: 'public',
                    	"fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
                            if (oData.public == 1) {
                            	$(nTd).html('Yes');
                            } else {
                            	$(nTd).html('No');
                            }
                        }
                    },
                    { title: "Indexer ID", visible: false, data: 'indexerId'},
                    { title: "Owner", visible: false, data: 'author'},
                    { title: "Subscribed", visible: false, data: 'subscribed',
                    	"fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
                            if (oData.transtype == "html5.uacp") {
                            	if (oData.subscribed) {
                                	$(nTd).html('Yes');
                                } else {
                                	$(nTd).html('No');
                                }
                            }
                        }
                    }
                ]
            });
            
            // set text in grey color if field is empty 
            $scope.NAfield = function(nTd,sData) {
            	 if(sData == ""){
					 sData = "[this field is empty; we recommend adding valid value]";
					 $(nTd).html("<span style='color:rgb(221,221,221)'>"+sData+"</span>");
				 }
            }

            /*
			 * POST DATATABLE CONSTRUCTION
            */

            function injectTextFieldsInTH () {
                $('#table_id thead th').each( function () {
                    var titleH = $('#table_id thead th').eq( $(this).index() ).text();
                    var variable = $('#table_id thead th').eq( $(this).index() ).attr('id');
                    var valOfTB = $scope.globalD[variable];

                    if (variable == 'loio' && valOfTB != '') {
                    	valOfTB = 'loio' + valOfTB;
                    }

                    if (titleH != 'Last Import date' && titleH != 'Searchable'
                    		&& titleH != 'Public' && titleH != 'Read Priv. Groups' && titleH != 'Subscribed'){
                        $(this).html( titleH+'<br><input class="display" type="text" value="'+valOfTB+'"placeholder="Filter '+titleH+'" />' );
                    }
                    
                }); 
            }
            injectTextFieldsInTH();

            function attachListenersToTextFieldsInTH () {

                t.columns().eq(0).each(function(colIdx) {
                	var search;
                    $('input', t.column(colIdx).header()).on('keyup', function(event) {
                    	// 16 = shift, 17 = ctrl, 18 = alt
                    	// we don't want to send requests for these keys
                    	var key = event.keyCode;
                    	if (key < 16 || key > 18) {
                    		if (angular.isDefined(search)) {
                        		$interval.cancel(search);
                        		search = undefined;
                        	}

                            search =  $interval(function (data) {
                            	var term = angular.copy(data.value, term),
                            		id = data.id;

                            	if (id == "loio") {
                            		term = term.replace('loio', '');
                            	} else if (id == "title") {
                            		term = encodeURIComponent(term);
                            	}

                            	t.column(colIdx)
                                .search(term)
                                .draw();

                            	//search = undefined;
                            }, 600, 1, false, {value: this.value, id: t.column(colIdx).header().id});
                    	}
                    });

                    $('input', t.column(colIdx).header()).on('mousedown mouseup click', function(e) {
                        e.stopImmediatePropagation();
                    });
                })
            };
            attachListenersToTextFieldsInTH();

            t.on( 'column-reorder', function ( e, settings, details ) {
                sharedService.broadcastReloadDT();
            });

            t.on( 'column-visibility.dt', function ( e, settings, column, state ) {
                sharedService.broadcastReloadDT(); 
            });

            // table refresh on command
            $scope.$on('handleReloadDT', function() {
                t.ajax.reload();
                injectTextFieldsInTH();
                attachListenersToTextFieldsInTH();
            });

            // initalize buttons
            t.buttons('.publish-button').disable();
            t.buttons('.delete-button').disable();
            t.buttons('.search-options-button').disable();
            t.buttons('.change-slave-button').disable();

            // Does the selection and deselection process
            t.on( 'select', function ( e, dt, type, indexes ) {
                var rowData = t.rows( indexes ).data().toArray();
                events.prepend( '<div><b>'+type+' selection</b> - '+JSON.stringify( rowData )+'</div>' );

                enableButtons(dt);
                
            })
            .on( 'deselect', function ( e, dt, type, indexes ) {
            	disableButtons(dt)
            })
            .on('draw', function() {
                $('.authorization-link').on('mouseup', function(event) {
                	event.stopImmediatePropagation();
                    var data = this.dataset;

                    if (data.rowId) {
                    	$scope.handleDelivClick(t.rows(data.rowId).data());

                    	var modalInstance = $uibModal.open({
                            templateUrl: '_build_938311c7a845691adeabc837/partials/dashboard-userauth.html',
                            controller: 'ModalInstanceCtrl',
                            windowClass: 'app-modal-window',
                            scope: $scope
                        });
                    }
                });
            });
        	}// if viewConfig
        });
    }

     function enableButtons(table) {
    	 if (table) {
    		 $scope.handleDelivClick(table.rows('.selected').data());

    		 if (table.rows('.selected').data().length > 0) {
    			 
    			 if (hasPrivilege('grantAccess') || $scope.isUserAdmin) {
    				 table.buttons('.search-options-button').enable();
    			 }

    			 if ((hasPrivilege('publish') || $scope.isUserAdmin) && isEditable()) {
    				 table.buttons('.manual-edit-button').enable();
    			 } else {
    				 table.buttons('.manual-edit-button').disable();
    			 }

    			 if ($scope.isUserAdmin) {
    				 table.buttons('.change-slave-button').enable();
    			 }

    			 table.buttons('.authorize-button').enable();
             }

             if (table.rows('.selected').data().length == 1) {
            	 table.buttons('.new-revision-button').enable();
            	 table.buttons('.new-version-button').enable();
            	 table.buttons('.new-translation-button').enable();
            	 table.buttons('.new-format-button').enable();

            	 table.buttons('.edit-product-button').enable();
            	 table.buttons('.edit-version-button').enable();
            	 table.buttons('.edit-project-button').enable();
             } else {
            	 table.buttons('.new-revision-button').disable();
            	 table.buttons('.new-version-button').disable();
            	 table.buttons('.new-translation-button').disable();
            	 table.buttons('.new-format-button').disable();
	
            	 table.buttons('.edit-product-button').disable();
            	 table.buttons('.edit-version-button').disable();
            	 table.buttons('.edit-project-button').disable();
             }

             if ($scope.canPublish) {
            	 table.buttons('.publish-button').enable();
             } else {
            	 table.buttons('.publish-button').disable();
             }

             if ($scope.canDelete) {
            	 table.buttons('.delete-button').enable();
             } else {
            	 table.buttons('.delete-button').disable();
             }
    	 }
     }

     function disableButtons(table) {
    	 if (table) {
    		 if (table.rows('.selected').data().length == 0) {
                 $scope.canPublish = false;
                 $scope.canDelete = false;

                 table.buttons('.new-revision-button').disable();
                 table.buttons('.new-version-button').disable();
                 table.buttons('.new-translation-button').disable();
                 table.buttons('.new-format-button').disable();
                 table.buttons('.manual-edit-button').disable();

                 table.buttons('.edit-product-button').disable();
                 table.buttons('.edit-version-button').disable();
                 table.buttons('.edit-project-button').disable();
                 table.buttons('.search-options-button').disable();
                 table.buttons('.change-slave-button').disable();
                 table.buttons('.authorize-button').disable();
             }

             $scope.handleDelivClick(table.rows('.selected').data());

             if (!isEditable()) {
            	 table.buttons('.manual-edit-button').disable();
             } else {
            	 table.buttons('.manual-edit-button').enable();
             }

             if($scope.canPublish) {
            	 table.buttons('.publish-button').enable();
             } else {
            	 table.buttons('.publish-button').disable();
             }

             if($scope.canDelete) {
            	 table.buttons('.delete-button').enable();
             } else {
            	 table.buttons('.delete-button').disable();
             }
    	 }
     }

     function hasPrivilege(privilege) {
    	 var deliverables = sharedService.deliverableList;

    	 for (var i = 0; i < deliverables.length; i++) {
    		 var deliverable = deliverables[i];
    		 if (deliverable[privilege] == 0) {
    			 return false;
    		 }
    	 }

    	 return true;
     }

     function clearFilters(table) {

        $location.search({});
    	 // will be rewritten when refactoring
    	 sharedService.deliverableList = [];
    	 sharedService.deliverable = {};

    	 table.columns().eq(0).each(function(colIdx) {
    		 table.column(colIdx).search('');
    	 });

    	 $('#table_id thead th > input').each( function () {
    		 this.value = '';
    	 });

    	 table.column(0).search('').draw();

    	 table.buttons('.publish-button').disable();
    	 table.buttons('.delete-button').disable();

    	 table.buttons('.new-revision-button').disable();
         table.buttons('.new-version-button').disable();
         table.buttons('.new-translation-button').disable();
         table.buttons('.new-format-button').disable();
         table.buttons('.manual-edit-button').disable();

         table.buttons('.edit-product-button').disable();
         table.buttons('.edit-version-button').disable();
         table.buttons('.edit-project-button').disable();

         table.buttons('.search-options-button').disable();
     }

     function isEditable() {
    	 var deliverables = sharedService.deliverableList,
    	 	 state;

    	 if (deliverables.length == 0) {
    		 return false;
    	 } else {
    		 state = deliverables[0].state;
    	 }

    	 for (var i = 0; i < deliverables.length; i++) {
    		 var deliverable = deliverables[i];
    		 if (state != deliverable.state) {
    			 return false;
    		 }
    	 }

    	 return true;
     }

     function getGroupsHtml(groups) {
    	 var html = "",
    	 	 groupsLength = groups.length,
    	 	 group = undefined,
    	 	 hasEveryone = false,
    	     hasEmployees = false,
    	     EVERYONE = "EVERYONE",
    	     SAP_EMPLOYEES = "SAP_EMPLOYEES";

    	 for (var i = 0; i < groupsLength; i++) {
    		 group = groups[i];

    		 if (group === EVERYONE) {
    			 hasEveryone = true;
    		 }

    		 if (group === SAP_EMPLOYEES) {
    			 hasEmployees = true;
    		 }
    	 }

    	 if (hasEveryone) {
    		 html = '<span class="everyone">' 
    			 + EVERYONE + '</span>';
    	 } else if (hasEmployees) {
    			 html = '<span class="employees">' 
    				 + SAP_EMPLOYEES + '</span>';
    	 } else {
    		 for (var i = 0; i < groups.length; i++) {
				 group = groups[i];
				 html += '<span class="mixed">' + group
				 	+ '</span>';
			 }
    	 }

    	 return html;
     }

     $scope.runDataTable();

 }]);