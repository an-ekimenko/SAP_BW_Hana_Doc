cpControllers.controller('FilterCtrl', ['$scope', 'pageService', '$q', '$timeout', '$window', '$location', '$resource', 'Notification', 'usersManagement',
                                                  function($scope, pageService, $q, $timeout, $window, $location, $resource, Notification, usersManagement) {

	var	filteringTokens = pageService.deliverable.filteringTokens,
	controller = pageService.filteringController;

	var profilingData = filteringTokens.profilingData;

	$scope.isUserLoggedOn = usersManagement.isLoggedOn();
	
	// ------- used for IndexedDB to remember last profiling setup ---------
	var localDatabase = {};
	const dbName = "profilingDb";
	localDatabase.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
	localDatabase.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange;
	localDatabase.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;

	if(localDatabase.indexedDB) {
		localDatabase.indexedDB.onerror = function (event) {
			console.log("Database error: " + event.target.errorCode + ' Loading global defaults.');
			loadGlobalDefaults();
		};
	} else {
		console.log("IndexedDB is disabled. Loading global defaults.");
		loadGlobalDefaults();
	}
	
	// ---------------------------------------------------------------------
	
	var readDefaults = function() {

		// load URL defaults
		var urlProfile = $location.search().profile;
			
		if (urlProfile) {
			// search profile in db and override local defaults
		
			var predefinedProfile = $resource('/http.svc/predefined_profiles?profile=:id', {id:'@id'});
			predefinedProfile.get({id:urlProfile}, function(response) {
				
				if(!response.data) {
					
					console.error("Could not retrieve the predefined profile. "
					+ "The server did not return a response.");
	
					loadGlobalDefaults();

				} else {
					var profileSelection = response.data.profileSelection;
					
					// guard against bad input
					if (!profileSelection || profileSelection.constructor !== Array) {
						
						console.error("The response does not contain a predefined profile "
										+"or it's not an array.");

						loadGlobalDefaults();

					} else {
						
						// de-select all values (they were selected with the creation of the prof. set)
						for (var i = 0; i < controller.profile.properties.length; i++) {
							var prop = controller.profile.properties[i];
							for (var j = 0; j < prop.values.length; j++) {
								prop.values[j].setHidden(true);
							}
						}
						
						// select the ones from the predefined profile
						// if a property or its value does not exist, skip it (select the ones that can be selected)
						for (var i = 0; i < profileSelection.length; i++) {
							
							var property = controller.profile.getProperty(profileSelection[i][0]);
							
							if (!property) {
								console.error("This is an incorrect profile for this deliverable. "
												+ "Cannot find property: " + profileSelection[i][0]);
								
							} else {
								
								var value = controller.profile.getValue(profileSelection[i][0], profileSelection[i][1]);
								
								if (!value) {
									console.error("This is an incorrect profile for this deliverable. "
													+ "Cannot find value: " + profileSelection[i][1] + " for property: " + profileSelection[i][0]);
									
								} else {
									// assign the defaultValue on the property level for radio or dropdown
									if (property.facetType == 'radio' || property.facetType == 'dropdown') {
										property.setDefaultValue(profileSelection[i][1]);
									}
									
									// set visibility of property values
									controller.profile
										.getValue(profileSelection[i][0], profileSelection[i][1])
										.setHidden(false);
								}
							}
							
						}
					}
					
					// apply the defaults
					loadURLDefaults();
				}
				
			}, function(error) {
				console.error("Could not find the predefined profile for the URL with parameter for profile." 
							+ "The text will be filtered based on the defaults set by the author instead."
							+ "The message from the server: " + error.data.message);
				loadGlobalDefaults();
			});
			
		} else {
			// try to load custom defaults (stored in IndexedDB)
			// 	load global defaults on error
			
			createObjectStoreOrLoadCustomDefaults(pageService.deliverable.id);
		}
				
	}

	function loadGlobalDefaults() {
		controller.applyDefaults(profilingData);
		countOptions(controller);
		controller.profile.sortProfilingSetByPosition();
		$scope.filterFacets = getFilteringFacets(controller);
		clearData(pageService.deliverable.id);
	}
	
	function loadURLDefaults() {
		controller.applyDefaults();
		countOptions(controller);
		controller.profile.sortProfilingSetByPosition();
		$scope.filterFacets = getFilteringFacets(controller);
		// once URL defaults are used, custom defaults will be deleted
		clearData(pageService.deliverable.id);
	}
	
	function countOptions(controller) {
		
		$scope.all = 0;
		$scope.selected = 0;
		
		for(var i=0; i<controller.profile.properties.length; i++){
			
			var prop = controller.profile.properties[i];

			for(var j=0; j<prop.values.length; j++){
				
				var val = prop.values[j];

				if (prop.visibility_in_facets == "yes") {
					
					if(val.visibility_in_facets == "yes") {

						$scope.all++;
						
						if (!val.hidden) {

							$scope.selected++;
						}

					}
					
				}
			}
		}
	}
	
	// collapsible facets
    $scope.onClickCollapse = function(val) {
    	var spanEl = $("#" + val);

    	if (spanEl.hasClass("expanded")) {
    		spanEl.removeClass("expanded");
    	}
    	else {
    		spanEl.addClass("expanded");
    	}
    }
    
    // "more" and "less" buttons
    $scope.limitFacetValues = 5;

	controller.profile.sortProfilingSetByPosition();
    $scope.filterFacets = getFilteringFacets(controller);

	$scope.toggleFilter = function (prop, value) {
		profilingMenuItemToggle(prop, value, controller);
	}

	$scope.changeRadioFilter = function (prop, value) {
		profilingMenuRadioChange(prop, value, controller);
	}

	$scope.changeDropdownFilter = function(prop, val) {
		profilingMenuRadioChange(prop, val, controller);
	}

	$scope.$on("resetFiltering", function(event) {
		loadGlobalDefaults();
	});

	$scope.$on("tocExpanded2", function(event) {
		
		var refilterTOC = function() {
			controller.applyFilteringToDoc2("#toc");
		}

		// delay the dynamic filtering until after it's been loaded by the angular tree controller
		// otherwise the TOC elements after expansion get filtered before the tree controller repopulates them
		$timeout(refilterTOC, 0);
	});

	$scope.copyProfiling = function() {
		
		// find the selected values

		var selections = [];

		for ( i = 0; i < controller.profile.properties.length; i++ ) {
			
			if ( controller.profile.properties[i].facetType == 'checkbox' ) {

				for ( j = 0 ; j < controller.profile.properties[i].values.length; j++ ) {

					if ( !controller.profile.properties[i].values[j].hidden ) {

						var line = [];
						line.push(controller.profile.properties[i].name);
						line.push(controller.profile.properties[i].values[j].value);

						selections.push(line);
					}
				}
			} else if ( controller.profile.properties[i].facetType == 'radio' || 
						controller.profile.properties[i].facetType == 'dropdown') {
				var line = [];
				line.push(controller.profile.properties[i].name);
				line.push(controller.profile.properties[i].defaultValue);

				selections.push(line);
			}

		}

		// call back-end POST request

		var predefinedProfile = $resource('/http.svc/predefined_profiles');
		predefinedProfile.save(JSON.stringify(selections), function(response) {

			if (!response.data) {
				console.error("Could not save the predefined profile to the database." 
				+ "The server did not return a response.");
			} else {
				// create the url to copy

				var toCopy = $location.absUrl().split('?')[0];
				toCopy += '?profile=' + response.data.profileId;
				
				// copy the url to clipboard

				window.prompt("Copy to clipboard: Ctrl+C, Enter", toCopy);
			}

		}, function(error) {
			Notification.error("Could not save the predefined profile to the database." 
						+ "The message from the server: " + error.data.message);
		});

	}
	
	function getFilteringFacets(controller) {
		
		controller.profile.sortProfilingSetByPosition();
		var result = [];

		for (var i = 0; i < controller.profile.properties.length; i++) {
			var filter = controller.profile.properties[i];

			result.push({
				facetTitle: filter.label,
				facetId: filter.name,
				description: filter.description,
				facetType: filter.facetType,
				defaultValue: filter.defaultValue,
				visibility_in_facets: filter.visibility_in_facets,
				more: false, //added to enable "more" and "less" buttons
				filters: getFilteringValues(filter, controller)
			});
		}

		return result;
	}

	function getFilteringValues(filter, controller) {
		var result = filter.values;

		result.forEach(function (current) {
			
			var isHidden = controller.isHidden(filter.name, current.value);

			// guard against author incorrect setup of radio and checkbox default values
			if (filter.facetType == "radio" && filter.facetType == "dropdown") {
				if (filter.defaultValue != current.value) {
					isHidden = null;
				}
			}

			if (isHidden != null) {
				if (isHidden) {
					current.checked = false;
				} else {
					current.checked = true;
				}
			}
			else {
				current.checked = false; // default if not found
			}
		});

		return result;
	}

	function profilingMenuItemToggle(prop, value, controller) {

		if (controller.isHidden(prop, value)) {
			controller.show(prop, value);
			$scope.selected++;
		} else {
			controller.hide(prop, value);
			$scope.selected--;
		}

		// save custom defaults (last profiling setup)
		
		// if object store count != 0 -> overwrite the selected property/value
		// else save the entire profiling set
		saveProfilingSetToDB(pageService.deliverable.id, controller.profile, prop)
		
	}
	
	function profilingMenuRadioChange(prop, value, controller) {
		
		controller.show(prop, value);
		controller.hide(prop, controller.profile.getProperty(prop).defaultValue);
		controller.profile.getProperty(prop).setDefaultValue(value);
		
		saveProfilingSetToDB(pageService.deliverable.id, controller.profile, prop)
	}

	/**
	 * Writes the profilingSet to the IndexedDB by a ProfilingSet record.
	 * We only need to do that for the first filtering menu selection, the rest clicks should only update one record in the DB.
	 * - if object store count != 0 -> overwrite the selected property
	 * - else save the entire profiling set
	 * 
	 * @param {number} id deliverable id associated with the Object Store
	 * @param {ProfilingSet} profilingSet
	 * @param {string} property
	 */
	function saveProfilingSetToDB(id, profilingSet, property) {
		
		var openRequest = localDatabase.indexedDB.open(dbName);
		
		openRequest.onerror = function(event) {
			console.log("Database error: " + event.target.errorCode);
		};
		openRequest.onsuccess = function(event) {
			var db = event.target.result;

			var transaction = db.transaction(id, "readwrite");
			var store = transaction.objectStore(id);

			if (db != null) {
				
				var countRequest = store.count();
				
				countRequest.onsuccess = function(event) {
					
					// needs an immediately executed function because of async call
					(function(profilingSet, property) {
						if(countRequest.result != 0) { // store a single record
							
							var request = store.put(profilingSet.getProperty(property));
							
							request.onsuccess = function(event) {
							};
							
						}
						else { // store the entire profilingSet
							var properties = profilingSet.properties
							for(var i = 0; i < properties.length; i++) {
								
								if (!properties[i].position) {
									properties[i].position = i;
								}

								var request = store.put(properties[i]);

								request.onsuccess = function(event) {
									//executed after all values are added
								};
								
								request.onerror = function(event) {
									console.log('could not save the profiling set in the IndexedDB');
								};
								
							}
						}
						
					}) (profilingSet, property);
					
					
				}
				
				
			}

		};
		openRequest.onupgradeneeded = function (event) {
			var store = event.target.result.createObjectStore(id, { keyPath: "name" });
			store.createIndex("propIndex", "name", { unique: true });
		};
	}
	
	/**
	 * Loads a profilingSet from the profilingProperty records in the IndexedDB.
	 * 
	 * @param {number} id deliverable id associated with the Object Store
	 */
	function loadProfilingSetFromDB(id) {
		return $q(function(resolve, reject){
			
			var openRequest = localDatabase.indexedDB.open(dbName);
			openRequest.onerror = function(event) {
				reject("Database error: " + event.target.errorCode);
			};
			
			openRequest.onupgradeneeded = function (event) {
				var store = event.target.result.createObjectStore(id, { keyPath: "name" });
				store.createIndex("propIndex", "name", { unique: true });
			};
			
			openRequest.onsuccess = function(event) {
				var db = event.target.result;

		        var transaction = db.transaction([id], "readonly");
		        
		        var store = transaction.objectStore(id);
		        
		        store.onerror = function(event) {
		        	loadGlobalDefaults();
		        }

		        if (db != null) {

		            //create profilingSet from records in indexedDB
		        	
		            var index = store.index('propIndex');

		            var profSet = new ProfilingSet('Content Filtering');
		            var prop;

		            index.openCursor().onsuccess = function(event) {
		                var cursor = event.target.result;
		                if (cursor) {
		                    
		                    var record = cursor.value;

							if (prop) {
								attachPrototypes(prop);
								profSet.properties.push(prop);
							}
							prop = record;

		                    cursor.continue();
		                }
		                else {
		                    if(prop) { //push the last property
								attachPrototypes(prop);
		                        profSet.properties.push(prop);
		                    }
			                resolve(profSet);
		                }
		            }
		        }

			};
		    
		});
	}
	
	/**
	 * Used to attach the prototype functions back to the objects stored in the IndexedDB
	 * @param {Object} prop Object to which to attach the ProfilingProperty prototype
	 */
	function attachPrototypes(prop) {
		for (i in prop.values) {
			Object.setPrototypeOf(prop.values[i], PropertyValue.prototype);
		}
		Object.setPrototypeOf(prop, ProfilingProperty.prototype);
	}
	
	function createObjectStoreOrLoadCustomDefaults(id) {
	    
		var request = localDatabase.indexedDB.open(dbName);
		
		request.onerror = function (event) {
			if (request.error && request.error.name === 'InvalidStateError') {
				event.preventDefault();
				loadGlobalDefaults();
			}
		}
		
		// creating the IndexedDB for the first time
		request.onupgradeneeded = function (event) {
			var store = event.target.result.createObjectStore(id, { keyPath: "name" });
			store.createIndex("propIndex", "name", { unique: true });
			loadGlobalDefaults();
		}
		
	    request.onsuccess = function (event){
	        var db = event.target.result;
	        var version =  parseInt(db.version);
	        
	        if(!db.objectStoreNames.contains(id)) {
	        	//object store does not exist => create it
	        	
	        	// load global defaults immediately (so that user does not wait for async call to complete)
	        	loadGlobalDefaults();
	        	
	        	// create the new object store with an onupgradeneeded event and load global defaults
	        	
		        var secondRequest = localDatabase.indexedDB.open(dbName, version+1);
		        
	        	secondRequest.onerror = function (event) {
	        	}
		        secondRequest.onupgradeneeded = function (event) {
					var store = event.target.result.createObjectStore(id, { keyPath: "name" });
					store.createIndex("propIndex", "name", { unique: true });
		        };
		        secondRequest.onsuccess = function (event) {
		            event.target.result.close();
		        }
		        
	        }
	        else {
	        	//object store already exists => load it
	        	(function(id){
		        	var promise = loadProfilingSetFromDB(id);
		        	
		        	promise.then(function(profilingSet){
		        		if(profilingSet){

		        			if(profilingSet.properties.length != 0) {
		        				controller.profile = profilingSet;
		        				controller.applyDefaults();
								countOptions(controller);
								controller.profile.sortProfilingSetByPosition();
								$scope.filterFacets = getFilteringFacets(controller);
		        			}
		        			else {
		        				loadGlobalDefaults();
		        			}
		        			
		        		}
		        	}, function(reason){
		        		loadGlobalDefaults();
		        	});
	        		
	        	}) (pageService.deliverable.id);
	        	
	        }
	        
	    }
	}
	
	/**
	 * Clears the the IndexedDB's object store from records only if the object store exists.
	 * 
	 * @param {number} id deliverable id associated with the Object Store
	 */
	function clearData(id) {
		
		if (!localDatabase.indexedDB) {
			return;
		}
	    var request = localDatabase.indexedDB.open(dbName);
	    
	    request.onsuccess = function (event){
	    	
	        var db = event.target.result;
	        
	        if(db.objectStoreNames.contains(id)) {
				// open a read/write db transaction, ready for clearing the data
				var transaction = db.transaction(id, "readwrite");
				
				transaction.oncomplete = function(event) {
				};
				
				transaction.onerror = function(event) {
					console.log('Failed to clean object store in IndexedDB');
				};
				
				// create an object store on the transaction
				var store = transaction.objectStore(id);
				
				// clear all the data out of the object store
				var cleanObjectStoreRequest = store.clear();
				
				cleanObjectStoreRequest.onsuccess = function(event) {
					// report the success of our clear operation
				};
	        	
	        }
		}
		
		request.onerror = function (event) {
			event.preventDefault();
			console.log("Could not clean the IndexedDB. Maybe it's disabled?");
		}
	    
	}

	// delay the dynamic filtering until after it's been loaded by angular
	// otherwise there is an issue with the TOC in IE
	$timeout(readDefaults, 0);
	
}]);