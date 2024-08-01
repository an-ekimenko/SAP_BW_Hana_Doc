'use strict';
/* Controllers */
var cpPageContentController = angular.module('cpPageContentCtrl', []);

cpPageContentController.controller('PageContentCtrl', ['$rootScope', '$scope', '$filter', 'page', '$sce', 'deliverableState', '$state','$stateParams', '$location', '$log', 'usersManagement',
                                                       '$cookies', '$window', '$interval', 'PATHS', 'Notification',
                                                       'userSharedService', 'deliverables', 'searchResult', 'localResult',
                                                       'pageService', '$uibModal', '$document', 'productPageVersions', 'versionUtilities', 'resultsHandler', 
                                                       function($rootScope, $scope, $filter, page, $sce, deliverableState, $state, $stateParams, $location, $log, 
                                                               usersManagement, $cookies, $window, $interval, PATHS, Notification, 
                                                               sharedService, deliverables, searchResult, localResult,
                                                               pageService, $uibModal, $document, productPageVersions, versionUtilities, resultsHandler) {
	
	$scope.currentSearchScope = "This document";       
    $scope.scopedSearchPlaceholder = 'Search through this document';

    $scope.switchSearchScope = function(val) {
    	if (val == 'document') {
    		$scope.currentSearchScope = "This document";       
            $scope.scopedSearchPlaceholder = 'Search through this document';
    	} else if (val == 'product') {
    		$scope.currentSearchScope = "This product";       
            $scope.scopedSearchPlaceholder = 'Search through all documents relating to this product';
    	} else {
    		$scope.currentSearchScope = "All SAP products";       
            $scope.scopedSearchPlaceholder = 'Search across all products on the SAP Help Portal';
    	}  	
    }
	
	$scope.$on("tocExpanded", function(event) {
		$scope.$broadcast("tocExpanded2");
	});
	
	function applyDynamicFiltering() {
		// every time when a TOC link is clicked and if the dynamic filtering is active, apply it
		if($scope.tab.filtering.isopen == true) {
			var	controller = pageService.filteringController;

			controller.applyDefaults();
		}
	}

	function getAnchorId(filePath) {
		// the filePath is in the format (1ff89caf6fcf4a4db30d1196094c7030.html)
		// for future improvements in the back-end we let the possibility that the filepath be prefixed with 'copy'

		if (filePath.substring(0, 4) == "copy") {
			return filePath.slice(0, filePath.indexOf(".html"));

		} else if (filePath.indexOf("loio") == -1) {
			return "loio" + filePath.slice(0, filePath.indexOf(".html"));

		} else {
			console.error('Could not deduce anchorId from filePath');
			return filePath;
		}
	}

	function scrollToElementWithId(filePath) {
		// wait for the DOM to load before trying to get an element by id

		var scroller = $interval(function () {
			
			var hash = getAnchorId(filePath)
			
			var element = document.getElementById(hash);

			if (element) {
				var chunkedTopic = angular.element(element) || {};
				
				$document.scrollToElement(chunkedTopic, 0, 800);
				$location.hash(hash);
				$interval.cancel(scroller);
			}

		}, 500, 3);
		
	}

	function scrollToTopic() {
		var tocContainer = angular.element(document.getElementById('toc')),
			interval;
    	
		interval =  $interval(function () {
        	var topic = angular.element($('.tree-selected'));
        	if (topic.length > 0) {
        		tocContainer.scrollTo(topic, 0, 100);
        		$interval.cancel(interval);
        		interval = undefined;
        	}
        }, 100, 0, false);
	}

	function scrollToTop() {
		$document.scrollTo(0,0);
	}

    function getSelectedNode() {
        var hash = $location.hash();

        if (hash !== '') {
            hash = hash.replace("loio", "")
            var allNodes = $scope.content.allNodes;
            if (allNodes !== undefined){
            	for (var i = 0; i < allNodes.length; i++) {
            		var node = allNodes[i];

            		if (node.u) {
            			var url = node.u.replace(".html", "");

            			if (url == hash) {
            				return node;
            			}
            		}
            	}
            }
        }
        return undefined;
    }

	function getStateName(parameters) {
		var params;

		if (parameters !== undefined) {
			params = parameters;
		} else {
			params = $scope.content;
		}

		if ($scope.state !== "PRODUCTION") {
			if (params.alias != undefined && params.alias != "") {
				if (params.filePath != undefined) {
					return "viewerAliasFilePath";
				}

				return "viewerAlias";
			} else {
				if (params.filePath != undefined) {
					return "viewerFilePath";
				}

				return "viewer";
			}
		} else {
			if (params.alias != undefined && params.alias != "") {
				if (params.filePath != undefined) {
					return "viewerAliasFilePathProduction";
				}

				return "viewerAliasProduction";
			} else {
				if (params.filePath != undefined) {
					return "viewerProductionFilePath";
				}

				return "viewerProduction";
			}
		}
	}
	
	function recoveryStepsForChunkTopicAnchorMismatchInTocAndContent(content) {
		/* For chunked topics there is a mismatch between the anchor hash in the TOC and the anchor in the deliverable content (middle pane).
		Some anchor ids have a 'copy' prefix when others have a 'loio' prefix. The service at the endpoint 'getpagecontent' returns 
		JSON data from which the front-end uses the 'fullToc' property for the anchor hash in the TOC and the 'body' property for the 
		deliverable content (middle pane). However, the hash anchor cannot be recovered from the 'fullToc' property because the back-end has 
		explicitely removed the prefix when uploading deliverables to the database (and thus the front-end prepends the hash anchors with 'loio'). 
		The recovery steps are therefore to re-write all ids starting with a 'copy' prefix to one with 'loio' (re-anchoring). */

		var idsToRewrite = $(content).find('[id^="copy"]');
		$.each(idsToRewrite, function(index, value) {

			var oldId = $(value).attr("id");

			if( oldId != "copyright") {
				var loioPart = oldId.substring(4); // remove loio or copy prefix
				$(value).attr("id","loio"+loioPart);
			}

		});

		var hrefsToRewrite = $(content).find('[href*="copy"]');
		$.each(hrefsToRewrite, function(index, value) {

			var oldHref = $(value).attr("href");

			if( oldHref != "copyright" ) {
				var newHref = oldHref.replace("copy","loio");
				$(value).attr("href",newHref);
			}
		});
	}

	// try{ sap_s.trackData(); } catch(e) {console.log(e);}
	$scope.matchTrimmedStrings = function(deliverableTitle) {
		return function(release) {
			return release.title.trim() === deliverableTitle.trim();
		}
	}
	// Header settings
	$scope.imagemapResizeTrigger = function() {
		angular.forEach(angular.element(".imagemap_tooltips img"), function(el){
			angular.element(el).triggerHandler("resize");
		});
	};

	$scope.$parent.viewTitle = null;
	$scope.$parent.productLink = null;
	$scope.$parent.showSearchIcon = true;
	$scope.$parent.viewerOn.value = true; //Determine whether the viewer is open

	// pageService stores deliverable information to be shared between controllers and topics within a deliverable
	$scope.pageService = pageService;
	$scope.pageService.data = $scope.pageService.data || {};
	
	// set default font size to "small"
	$scope.currentFontSize = {
			value: "small"
	};
	
	// set page loading animation to true
	$scope.pageLoading = true;
	
	// get font size cookie if it exists
	var sapuacpviewerfontsize = $cookies.get('sapuacpviewerfontsize');
	
	if (!sapuacpviewerfontsize) {
		$cookies.put('sapuacpviewerfontsize', $scope.currentFontSize.value);
	} else {
		$scope.currentFontSize.value = sapuacpviewerfontsize;
	}
	
	// helper functions
	
	var isSameDeliverable = function(deliverable, content) {
		var _deliverable = deliverable;
		var _content = content;

		if (!_content || !_deliverable) {
			return false;
		}

		_content.state = _content.state || deliverableState;
		
		if ( (_content.deliverableLoio === _deliverable.loio) &&
				(_content.version === _deliverable.version) &&
				(_content.languageCode === _deliverable.languageCode) &&
				(_content.state === _deliverable.state) ) {
			return true;
		} else if (_content.alias === $stateParams.alias) {
			return false;
		}
	}

	// returns node from tree
    var locateNode = function(tree, node) {
        var _tree = tree.slice();
        var _node = node;
        
        for (var i = 0; i < _tree.length; ++i) {
            if ( (_tree[i].u && _tree[i].u === node.u) && (_tree[i].t && _tree[i].t === node.t) ) {
                return _tree[i];
            } else if ( (!_tree[i].u && !node.u) && (_tree[i].t && _tree[i].t === node.t) ) {
            	return _tree[i];
        	} else {
                if (_tree[i].c && _tree[i].c.length > 0){
                    var result = locateNode(_tree[i].c, _node);
                    if (result) return result;
                }
            }
        }    
        
        return null;
    }
    
    // TOC - returns nodes that should be expanded based on breadcrumb 
    var locateTree = function(breadcrumb, tree , setSelectedNode) {
        var _tree = tree;
        var _breadcrumb = breadcrumb;

    	var result = [];
    	
    	for (var i = 0; i < _breadcrumb.length; i++){
    		var node = locateNode(_tree, _breadcrumb[i]);
    		if (node) {
    			result.push(node);
    		}
    	}
    	
    	if (setSelectedNode) {
    		var node = getSelectedNode();

    		$scope.content.selectedNode = node !== undefined ?
    				node : result[result.length - 1];

    		return result;
    	}

    	$scope.content.selectedNode = result[result.length - 1];
    	return result;
    }
    
	var allNodes = function(input) {
		var result = [];
		var _tree = input.slice();
		if (!_tree) return null;
		if (_tree.length <= 0) return null;
		
		for (var i = 0; i < _tree.length; ++i){
			if(_tree[i].c != 'undefined') {
				result.push(_tree[i]);  // parent node.
				var children = allNodes(_tree[i].c);
				Array.prototype.push.apply(result, children);
			}
		}
		
		return result;
	}
	
	// Assign url parameters
	$scope.location = $location;
	$scope.state = deliverableState;

	// initialize Table of Contents arrays

	if (isSameDeliverable(pageService.deliverable, $stateParams)) {
		pageService.treeFamily = pageService.treeFamily || [];
		pageService.toc = pageService.toc || [];
		pageService.subscription = pageService.subscription || {};
		pageService.deliverable = pageService.deliverable || {};
	} else {
		pageService.treeFamily = [];
		pageService.toc = [];
		pageService.subscription = {};
		pageService.deliverable = {};
	}

	
	// initialize User object
	$scope.user = $scope.user || {};
	$scope.user.review = $scope.user.review || 0;
	
	$scope.newComment = {  // used as model for replies
			text: '',
			author: $scope.user.name,
			created_on: Number(Date.now())
	};
	
	// used for single rw pane
	$scope.pane = {
			showCommentsPane: $scope.showComments,
			showSearch: false, 
			underline: function() {
				var that = this;
				$(this).css("border-color", "black");
			},
	};
	
	$scope.pdfRestricted = sharedService.isRestricted('PDFGeneration');
	
	// used for accordion
	$scope.tab = {
			  
			  comments: {
				  isopen: false // false
			  },
			  
			  search: {
				  isopen: false
			  },
			  
			  feedback: {
				  isopen: false
			  },
			  
			  info: {
				  isopen: false
			  },
			  
			  fontsize: {
				  isopen: false
			  },
			  
			  share: {
				  isopen: false
			  },
			  
			  download: {
				  isopen: false
			  },
			  
			  filtering: {
				  isopen: false
			  }
	}
	
	if(!$scope.pdfRestricted) {
		$scope.tab.customPdf = {
			isopen: false
		}
	}
	
	var closeAllTabs = function() {
		$scope.tab.comments.isopen = false;
		$scope.tab.search.isopen = false;
		$scope.tab.feedback.isopen = false;
		$scope.tab.info.isopen = false;
		$scope.tab.fontsize.isopen = false;
		$scope.tab.share.isopen = false;
		$scope.tab.download.isopen = false;
		$scope.tab.filtering.isopen = false;
		if(!$scope.pdfRestricted) {
			$scope.tab.customPdf.isopen = false;
		}
	}
	
	var checkTabsAreClosed = function() {
		
		if(!$scope.pdfRestricted) {
			if (
					$scope.tab.comments.isopen == false &&
					$scope.tab.search.isopen == false &&
					$scope.tab.feedback.isopen == false &&
					$scope.tab.info.isopen == false &&
					$scope.tab.fontsize.isopen == false &&
					$scope.tab.share.isopen == false &&
					$scope.tab.download.isopen == false &&
					$scope.tab.filtering.isopen == false &&
					$scope.tab.customPdf.isopen == false
					) {
				return true;
				} else {
					return false;
				}
		} else {
			if (
					$scope.tab.comments.isopen == false &&
					$scope.tab.search.isopen == false &&
					$scope.tab.feedback.isopen == false &&
					$scope.tab.info.isopen == false &&
					$scope.tab.fontsize.isopen == false &&
					$scope.tab.share.isopen == false &&
					$scope.tab.download.isopen == false &&
					$scope.tab.filtering.isopen == false
						) {
					return true;
				} else {
					return false;
				}
		}
	}
	
	$scope.changeTab = function(value1) {	
		$scope.imagemapResizeTrigger();
		
		if(!$scope.pdfRestricted) {
			if($scope.tab.filtering.isopen && value1 != 'customPdf') { // make all content visible again
				$('.hidden').each(function(i, obj) {
				    $(this).removeClass("hidden");
				});
				$('.flagged').each(function(i, obj) {
					
					$(obj).removeClass("flagged");
					$(obj).prev().remove();
					$(obj).next().remove();
				});
			}	
		} else {
			if($scope.tab.filtering.isopen) { // make all content visible again
				$('.hidden').each(function(i, obj) {
				    $(this).removeClass("hidden");
				});
				$('.flagged').each(function(i, obj) {
					
					$(obj).removeClass("flagged");
					$(obj).prev().remove();
					$(obj).next().remove();
				});
			}	
		}
		
		
		
		closeAllTabs();
		
		
		$scope.tab[value1].isopen = true;
		
		if ($window.innerWidth < 1490 && $window.innerWidth > 1024 ) {
			$scope.$parent.tocHidden.value = true;
		}
	}
	
	$scope.toggleToc = function() {
		if ($scope.$parent.tocHidden.value == true && $window.innerWidth < 1490 && $window.innerWidth > 1024 ) {
			closeAllTabs();
		}
		$scope.$parent.tocHidden.value = !$scope.$parent.tocHidden.value;
	}
	
	
	
	// param flag = boolean true/false; 
	//   true  - to expand all replies
	//   false - collapse all replies
	$scope.expandAll = function(flag) {
		var _comments = $scope.pageService.data.comments;
		for (var i = 0; i < _comments.length; ++i){
			_comments[i].show = flag;
		}
	}
	
	// This expands and closes the rw on window resize
	// This section must be in the page content ctrl to access the right widget tabs
	
	var deskThreshold = 1489;
    var deskInitialDiff = (window.innerWidth > deskThreshold) ? 1:-1;
    
    var mobThreshold = 1024;
    var mobInitialDiff = (window.innerWidth > mobThreshold) ? 1:-1;

    $(window).on('resize',function(){

        var deskCurrentDiff = window.innerWidth - deskThreshold;
        if(deskCurrentDiff*deskInitialDiff <= 0) {
            deskInitialDiff *= -1;
            //console.log("desktop crossed");
            if (window.innerWidth > deskThreshold) {
            	if ($scope.$parent.tocHidden.value == true) {
            		$scope.$parent.tocHidden.value = false;
            	}
            	if (pageService.deliverable.filteringTokens && checkTabsAreClosed() ) {
            		$scope.changeTab('filtering');
            	}
            	if ($scope.user.review === 1 && checkTabsAreClosed() ) {
            		$scope.changeTab('comments');
            	}
            	if ($scope.user.review === 0 && checkTabsAreClosed() ) {
            		$scope.changeTab('feedback');
            	}
            } else if ($scope.$parent.tocHidden.value == false) {
            	closeAllTabs();
            }
        }

    	var mobCurrentDiff = window.innerWidth - mobThreshold;
        if (mobCurrentDiff*mobInitialDiff <= 0) {
        	mobInitialDiff *= -1;
            //console.log("mobile crossed 2");
            closeAllTabs();
        }
    });
    
    // End of code that opens/closes the rw on resize
	
	$scope.$watch('user.review', function(newValue, oldValue) {
		if (pageService.deliverable.filteringTokens &&
				isSameDeliverable(pageService.deliverable, $scope.content)) {
			if (window.innerWidth > 1489){
				$scope.tab.comments.isopen = false;
				$scope.tab.feedback.isopen = false;
				$scope.tab.filtering.isopen = true;
			}
			if (window.innerWidth <= 1489){
				$scope.tab.comments.isopen = false;
				$scope.tab.feedback.isopen = false;
				$scope.tab.filtering.isopen = false;
			}
		} else {
			
			if(newValue === 1){
				// review is true (1)
				//$scope.pane.showComments = true;
				
				if (window.innerWidth > 1489){
					$scope.tab.comments.isopen = true;
					$scope.tab.feedback.isopen = false;
				}
				if (window.innerWidth <= 1489){
					$scope.tab.comments.isopen = false;
					$scope.tab.feedback.isopen = false;
				}
	
			} else {
				// review is false
				//$scope.pane.showComments = false;
				
				if (window.innerWidth > 1489){
					$scope.tab.comments.isopen = false;
					$scope.tab.feedback.isopen = true;
				}
				if (window.innerWidth <= 1489){
					$scope.tab.comments.isopen = false;
					$scope.tab.feedback.isopen = false;
				}
			}
			
		}
	});
	
	$scope.$watch('currentFontSize.value', function(newValue, oldValue) {
		if (JSON.stringify(newValue) != JSON.stringify(oldValue)){
			$cookies.put('sapuacpviewerfontsize', $scope.currentFontSize.value);
		}
	});
	
	// Initialize arrays for display
	$scope.content = {
			html: null,
			dir: 'ltr',
	};
	
	$scope.pageContent = {
			data: {
				comments: []
			},
			comments: [],
	};

	$scope.commentpane = {
			open: true,
			resolved: true,
			inline: true,
			general: true,
			orphan: true,
			show: false,
			filterByStatus: false,
			filterByType: false,
	};

	// return number of open comments
	$scope.commentpane.updateCount = function() {
		var opencount = 0;
		var anchoredcount = 0;
		var hiddencount = 0;
		var orphancount = 0;
		var _comments = $scope.pageService.data.comments;
		
		if (_comments){
			
			for (var i = 0; i < _comments.length; ++i){
				if(_comments[i].process_state === 'OPEN') {
					opencount++;
				}
				if(_comments[i].marked_content != '') {
					anchoredcount++;
				}
				if(_comments[i].state === 'HIDDEN') {
					hiddencount++;
				}
				if(_comments[i].orphan) {
					orphancount++
				}
			}
	
		$scope.commentpane.opencomments = opencount;
		$scope.commentpane.resolvedcomments = _comments.length - opencount;
		$scope.commentpane.inlinecomments = anchoredcount - orphancount;
		$scope.commentpane.generalcomments = _comments.length - anchoredcount;
		$scope.commentpane.orphancomments = orphancount;
		$scope.commentpane.hiddencomments = hiddencount;
	
		}
	}
	
	$scope.filteredcomments = [];
	
	$scope.annotations = [];
	$scope.annotatorControl = {};  // connects to annotatorjs and anchoredcomment directive
	$scope.annotationsOn = false;
	

	// helper function to return the appropriate state for the url
	// If the state is PRODUCTION, an empty string is returned.
	// Otherwise, it returns the state with a backslash. 
	$scope.url = function(s) {
		if (s === 'PRODUCTION') {
			return '';
		} else {
			return '/' + s;
		}
	}

	// Initialize Release 
	$scope.content.selectedRelease = null;

	// return index in array releases of the current version
	function currentRelease (releases, version, language, state, loio, alias) {
		for (var i = 0; i < releases.length; i++) {
			var item = releases[i];

			if ((item.v == version) && (item.l == language) 
					&& (item.state == state) && (item.loio == loio)){
				return i;
			} else if (alias != undefined && (item.state == state) && (item.alias == alias)){
				return i;
			}
		}
	};

	var addOrphan = function (element) {
		element.orphan = false;
	}
	
	var addLabel = function(element) {
		var that = this;
		if (element.orphan) {
			element.label = "ORPHAN";
			return;
		}
		if (element.marked_content === '') {
			element.label = "GENERAL";
			return;
		} else {
			element.label = "INLINE";
			return;
		} 
		
	}
	
	var hideReplies = function(element) {
		element.show = false;
	}
	
	$scope.addEditShow = function(tree) {
		var _comments = tree;
		
		for (var i = 0; i < _comments.length; ++i){

			_comments[i].edit = false;
			_comments[i].show = false;
			
			if (_comments[i].state === 'HIDDEN'){
				_comments[i].hidden = {'background-color': '#EEE', 'opacity':'0.9'};
			} else {
				_comments[i].hidden = {'background-color': '#FFF', 'opacity':'1'};
			}
			
			if (_comments[i].child_comments && _comments[i].child_comments.length > 0){
				$scope.addEditShow(_comments[i].child_comments);
			}
		}
		
	}
	
	// sorts inline comments and general comments.  Returns array of inline comments.  
	// Inline comments used to be called anchored comments.
	$scope.sortanchored = function(array) {
		var anchoredcomments = [];
		var comment = {};
		var range = {};
		var div, start_node, end_node;
		var nodepath = document.getElementsByClassName('main');
		start_node = nodepath[0];

		array.forEach(function (item, index, array) {

			if (typeof item.marked_content != 'undefined' && item.marked_content != null && item.marked_content != ''){
				comment = {}; // clear comment
				comment.id = item.id.toString();
				comment.annotator_schema_version = "v1.0",
				comment.created = item.created_on;
				comment.updated = item.created_on;
				comment.text = item.text;
				comment.quote = item.marked_content;
				comment.uri = $location.path();
				comment.ranges = [];
				range = { 
						"start": item.start_node_path,
						"end": item.end_node_path,
						"startOffset": item.start_index,
						"endOffset": item.end_index
				};	
				comment.ranges.push(range);
				comment.user = item.author;
				comment.process_state = item.process_state;
				comment.state = item.state;
				comment.orphan = false;
				comment.prev = item.prev;
				comment.aft = item.aft;

				anchoredcomments.push(comment);

			}
		});
		return anchoredcomments;
	}

    // filter comments orderBy general, orphan, inline
    
    $scope.sortComments = function(item) {
    	if (item.marked_content === '' && !item.orphan) return 0; 	// 0 - General comments
    	if (item.orphan) return 1;  								// 1 - Orphan comments
    	return 2;  													// 2 - Inline comments
    };
	
    /* Initialize Annotations - 
     * this code prevents inline comments from being available until after
     * the user has logged in and has review rights for the deliverable. */
    
    $scope.vm = $scope.vm || {}
    $scope.vm.accessor = $scope.vm.accessor || {};
    
	// if the url has '?show_comments=true', then display comment pane on initial loading
    var show_comments = $stateParams.show_comments || null;

	if (show_comments=='true'){  // pane.showCommentsPane=true; pane.showSearch=false; 

		// $scope.pane.showSearch = false;
		$scope.pane.showCommentsPane = true;
		$scope.tab.comments.isopen = true;
		
		$scope.showComments = true;
		$scope.hideToc();
		show_comments = null;
	}
	
	// Setup helper functions
	
	$scope.setup = {};
	$scope.topicCommentsUrl = "";
	$scope.deliverableCommentsUrl = "";
	
	$scope.setup.comments = function(data) {
		if (!data) return;
		
		$scope.pageService.data.comments = data;
		$scope.pageService.data.comments.forEach(addOrphan);
		$scope.pageService.data.comments.forEach(addLabel);
		$scope.pageService.data.comments.forEach(hideReplies);
		
		$scope.addEditShow($scope.pageService.data.comments);
		$scope.pageContent.anchoredcomments = $scope.sortanchored($scope.pageService.data.comments);

		$scope.topicCommentsUrl = '/viewer/deliverable_comments?'
			+ 'title=' + $scope.pageService.deliverable.title
			+ '&versionName=' + $scope.pageService.deliverable.versionName
			+ '&status=' + $scope.pageService.deliverable.state
			+ '&topic=' + $scope.pageService.currentPage.t.trim();

		$scope.deliverableCommentsUrl = '/viewer/deliverable_comments?'
			+ 'title=' + pageService.data.deliverable.title
			+ '&versionName=' + pageService.data.deliverable.versionName
			+ '&status=' + pageService.data.deliverable.state;
	}
	
	$scope.setup.query = function() {	
		var params = {}, hash = -1;

		if ($stateParams) {
			params = $stateParams;
		}
		
		if (params.filePath) {
			hash = params.filePath.indexOf('%23');
			if (hash > 0) {
				$scope.content.filePath = params.filePath.substring(0, hash);
				$log.info($scope.content.filePath);
			} else {
				$scope.content.filePath = params.filePath;
			}
		} else {
			$scope.content.filePath = null;
		}
		
		$scope.content.deliverableLoio = params.deliverableLoio;
		$scope.content.version = params.version;
		$scope.content.languageCode = params.languageCode;
		$scope.content.state = $scope.state;
		$scope.content.alias = params.alias;
	}
	
	$scope.setup.errorCheck = function(data) {
		if (!data) return;

		if (data.status === 'Error') {
			sharedService.errorHandler(data);
			Notification.error("Server error - cannot retrieve deliverable");
			$log.error(data);
		}
	}

	$scope.setup.product = function(data) {
		var _data;
		
		if (!data) {
			_data = pageService.data;
		} else {
			_data = data.data;
			if(!data.data.deliverable){ 
				/* In case when same deliverable request to BE (request with params deliverableInfo: 0, toc: 0, ) the										// deliverableInfo is already in pageService
				 deliverableInfo does not exist in response, and expect to take it from cache buffer pageService*/ 
				_data.deliverable = pageService.data.deliverable;
			}
		}
		
		var _product = _data.deliverable.product;
		var _state = _data.deliverable.state;
		var _language = _data.deliverable.languageCode;
		var _version = _data.deliverable.version;
		// Get updated product name from backend
		var versionParams = {
	            product: _product, // search by product ID
	            state: _state, // any existing state value should suffice
	            language: _language //any existing language should suffice
	    };
		
		var releaseParams = {
				 product: _product, 
		         state: _state, 
		         language: _language,
		         version: _version
		}
		
		var cached = $scope.user.id === undefined;
		productPageVersions(cached).query(versionParams).$promise.then(function(result) {
			
			//_data.deliverable.productName = result.data.pv[0].productName; // the first item should suffice, since the productName should be consistent for all deliverables

			if (_data && _data.deliverable && _data.deliverable.product &&
					_data.deliverable.productName && _data.deliverable.productName != '' && $scope.$parent) {
				$scope.$parent.viewTitle = _data.deliverable.productName;
				$scope.viewTitle = _data.deliverable.productName;
				$scope.$parent.productLink = PATHS.BASE_URL + '/product' + $scope.url(_state) + '/' + encodeURIComponent(encodeURIComponent(_data.deliverable.product)) + '/' + encodeURIComponent(encodeURIComponent(_version)) + '/' + _language;  // /product/:state/:product/:version/:languageCode'
				$scope.productLink = PATHS.BASE_URL + '/product' + $scope.url(_state) + '/' + encodeURIComponent(encodeURIComponent(_data.deliverable.product)) + '/' + encodeURIComponent(encodeURIComponent(_version)) + '/' + _language;
			} else {
				$scope.$parent.viewTitle = null;
				$scope.viewTitle = null;
				$scope.$parent.productLink = null;
				$scope.productLink = null;
			}
			trackData(_data)
		});
	}
		
	$scope.setup.toc = function(data){
		
		var flatten = function(data) {
		    var result = [], _data = data.slice();
		    function clone (obj) {
		    	var copy = {};
		    	for (var p in obj) {
		    		copy[p] = obj[p];
		    	}
		    	return copy;
		    }
		    function recurse (current) {
			    if (Array.isArray(current)) {
		    		for (var i = 0, l = current.length; i < l; i++) {	
		    			recurse(current[i]);
		    		}
			    } else
		    	
			    	if (!current.c) {
			    		result.push(current);
			    		return;
			    	}  else {
		    			var node = clone(current);
		    			// node.c.length = 0;
		    			result.push(node);
			    		recurse(current.c);
			    		
			    	}
		    };
		    recurse(_data);
		    return result;
		}
		
		if (!data) return;
		
		if (data.data && data.data.deliverable) {
			// New deliverable - delete old pageService toc data and load new data
			if (pageService.treeFamily.length == 0) {
				pageService.treeFamily.push.apply(pageService.treeFamily, data.data.deliverable.fullToc);
			} else {
				pageService.treeFamily.length = 0;
				pageService.treeFamily.push.apply(pageService.treeFamily, data.data.deliverable.fullToc);
			}
			
			if(pageService.toc.length == 0 && data.data.toc) {
				pageService.toc.push.apply(pageService.toc, data.data.toc);
			} else {
				pageService.toc.length = 0;
				pageService.toc.push.apply(pageService.toc, data.data.toc);
			}
			
			$scope.content.allNodes = allNodes(pageService.treeFamily);
	        $scope.content.expandedNodes = locateTree(data.data.breadcrumb.slice().reverse(), pageService.treeFamily , true);
	        
	        pageService.flatToc = flatten(data.data.deliverable.fullToc);
			// $log.info(pageService.flatToc);
	        
	        if ((data.data.deliverable.copyrightPath !== undefined) && (data.data.deliverable.copyrightPath.length > 0)) {
	        	$scope.$parent.copyrightPage = true;
	        	
	        	$scope.$parent.copyrightUrl = function() {
	        		var pageUrl = data.data.deliverable.copyrightPath;
	        		var aliasData = {};
	        		aliasData.deliverableLoio = $scope.content.deliverableLoio;
	        		aliasData.languageCode = $scope.content.languageCode;
	        		aliasData.version = $scope.content.version;
	        		aliasData.state = $scope.content.state;
	        		
	        		if ($scope.content.alias) {
	        			aliasData.alias = $scope.content.alias;
	        			var pageUrl = "/" + pageUrl;
	        		}
	        		
	        		aliasData.filePath = '';    
	                return $scope.getViewerURLAlias(aliasData) + pageUrl;
	        	}
	        	
	        } else {
	        	$scope.$parent.copyrightPage = false;
	        }
	        
	        if ((data.data.deliverable.disclaimerPath !== undefined) && (data.data.deliverable.disclaimerPath.length > 0)) {
	        	$scope.$parent.disclaimerPage = true;
	        	
	        	$scope.$parent.disclaimerUrl = function() {
	        		var pageUrl = data.data.deliverable.disclaimerPath;
	        		var aliasData = {};
	        		aliasData.deliverableLoio = $scope.content.deliverableLoio;
	        		aliasData.languageCode = $scope.content.languageCode;
	        		aliasData.version = $scope.content.version;
	        		aliasData.state = $scope.content.state;
	               
	        		if ($scope.content.alias) {
	        			aliasData.alias = $scope.content.alias;
	        			var pageUrl = "/" + pageUrl;
	        		}
	        		
	        		aliasData.filePath = '';  
	                return $scope.getViewerURLAlias(aliasData) + pageUrl;
	        	}
	        	
	        } else {
	        	$scope.$parent.disclaimerPage = false;
	        }
	        
		} else {
			// copy data from pageService
			if (pageService.treeFamily.length == 0) {
				pageService.treeFamily.push.apply(pageService.treeFamily, pageService.deliverable.fullToc);
			}

			$scope.content.allNodes = $scope.content.allNodes || allNodes(pageService.treeFamily);
            $scope.content.expandedNodes = $scope.content.expandedNodes
            	.concat(locateTree(data.data.breadcrumb.slice().reverse(), pageService.treeFamily, false));  
		}

		scrollToTopic();
	}
	
	$scope.setup.pageService = function(data) {
		if (!data || !data.data) return;
		
		pageService.data = data.data;
		pageService.deliverable =  data.data.deliverable || pageService.deliverable; 
		pageService.subscription = data.data.subscription;
		pageService.feedbackSubscription = data.data.feedbackSubscription;
		pageService.applicationVersion = data.data.applicationVersion;
		pageService.authorization = data.data.authorization;
	}
	
	$scope.setup.download = function(data) {
		if (!data || !data.data) return;
		
		$scope.data = {};
		
		var filterbyversion = function (releases, version, languageCode, state) {
			var filtered = [];
			
			releases.forEach(function(release) {
				if (release.v === version && 
					release.l === languageCode && 
					release.state === state && 
					release.transtype.indexOf('pdf')== 0 ) {			
					
						filtered.push(release);
				}
			});
			
			return filtered;
		}
		
		$scope.refresh = function() {
			if ($scope.pageService.deliverable) {
				var version = $scope.pageService.deliverable.version;
				var state = $scope.pageService.deliverable.state;
				var languageCode = $scope.pageService.deliverable.languageCode;
				$scope.data.releases = filterbyversion( $scope.pageService.deliverable.releases, version, languageCode, state);
				$scope.data.selectedRelease = null;
			}
		}
		
		$scope.refresh();
	}
	
	$scope.setup.currentPage = function(data) {
		
		if (!data || !data.data) return;
		
		$scope.content.fileLoio = data.data.currentPage.loio;
		$scope.content.filePath = data.data.currentPage.u || undefined;
		
		if (data.data.authorization) {
			$scope.user.review = data.data.authorization.review;	
		}
		
		if (data.data.deliverable) {
			$scope.content.deliverableId = data.data.deliverable.id;	
		}
		
		// update current page information
		pageService.currentPage = data.data.currentPage;
		
	    if (($window.document != undefined) && ($window.document.title !== undefined)){
	    	if (data && data.data && data.data.currentPage.t) {
		    	var title = data.data.currentPage.t;
		    	
		    	if (data.data.deliverable && data.data.deliverable.productName) {
		    		title += " | "+data.data.deliverable.productName;
		    	}
		    	else if  (data.data.deliverable && data.data.deliverable.title) {
		    		title += " | "+data.data.deliverable.title;
		    	}
		    	title += " | SAP Help Portal"
		    	$window.document.title = title;
	    	}
	    } 
    
	}
	
	$scope.setup.nextpreviouspage = function(data) {
		// returns next topic as an object (without children).
		var isTopicHead = function(node) {
			if (node.u || node.m) {
				return false;
			} else return true;
		}
		var isChunked = function(node) {
			if (node.h) {
				return true;
			}
			return false;
		}
		var isValidAdjacentTopic = function(node) {
			return !(isTopicHead(node) || isChunked(node));
		}
		var getNextAndPreviousTopics = function(id) {
			
			var toc = pageService.flatToc || [];
			var l = toc.length;
			var topic = {
					next: {},
					previous: {}
			};
			
			if (!id) return;
			
			for (var i = 0; i < l; i++) {
				
				if (toc[i].u == id) {
					if (i < l - 1) {
						var nextTopicIndex = i+1;
						while ( (nextTopicIndex < l ) && !isValidAdjacentTopic(toc[nextTopicIndex]) )  {
							nextTopicIndex = nextTopicIndex + 1;
						}
						if (nextTopicIndex !== l) {
							topic.next = toc[nextTopicIndex];
						}
					}
					if (i > 0) {
						var previousTopicIndex = i-1;
						while ( (previousTopicIndex > -1) && !isValidAdjacentTopic(toc[previousTopicIndex]) ) {
							previousTopicIndex = previousTopicIndex - 1;
						}
						if(previousTopicIndex !== -1) {
							topic.previous = toc[previousTopicIndex];
						}
					}

					return topic;
				}
			}
			
			return null;  // topic not found
		}
		
		pageService.topics = getNextAndPreviousTopics(data.data.currentPage.u) || {};	
		$scope.topics = pageService.topics; 
	}
	
	$scope.setup.subscriptions = function(data) {
		if (!data || !data.data) return;
		if (!data.data.subscription) return;
		
		pageService.subscription = pageService.subscription || [];
		
		if(Object.keys(pageService.subscription).length == 0) {
			pageService.subscription = data.data.subscription; 
		} 
		
	}
	
	$scope.setup.logouturl = function () {
		//$scope.$parent.logouturl = PATHS.LOGOUT_URL + $location.absUrl().replace('#', '%23');
		$scope.$parent.logouturl = PATHS.LOGOUT_URL 
			+ $location.protocol() + "://" + $location.host() + ":" + $location.port() + "/viewer/";
	}

	// set up RTL if language is hebrew or arabic.
	$scope.setup.dir = function(data) {
		if (!data || !data.data) return;
		if (!data.data.deliverable) return;
		
		var lang, rtl = 'rtl', ltr = 'ltr';
		var RTL = ['he-IL', 'ar-SA'];

		lang = data.data.deliverable.languageCode;
		
		if (RTL.indexOf(lang) > -1) { // return > -1 if lang is a RTL language
			$scope.content.dir = rtl;
		} else {
			$scope.content.dir = ltr;
		}
	}
	
	$scope.setup.chunked = function(data) {
		var parent;
		var node = pageService.node || {};
		var url = node.u || "";
		
		if (node.h) { // chunked topic
			parent = node.h.replace("loio", "") + '.html';

			if (parent == $scope.pageContent.data.currentPage.u) {
				
				$scope.content.selectedNode = node;
				
				// The scroll behavior is handled in scope.showSelected, so that the scroll will initiate immediately on click
				
				return null;
			}
		} else {
			// The scroll behavior is handled in scope.showSelected, so that the scroll will initiate immediately on click
		}
		
		pageService.node = null;
		pageService.url = null;
	}

	$scope.setup.swa = function (data) {
		var deliverable,
			topicLoio = data.data.currentPage.loio;

		if (data.data.deliverable) {
			deliverable = data.data.deliverable;
		} else {
			deliverable = pageService.deliverable;
		}

		deliverableInfo.loio = deliverable.loio;
		deliverableInfo.version = deliverable.version;
		deliverableInfo.language = deliverable.languageCode;
		deliverableInfo.topicLoio = topicLoio;

		runSwa();
	};

	$scope.setup.searchable = function(data) {
		if (data.data.notSearchable === 1) {
			var noIndex = $('<meta name="robots" content="no-index">');
			$('head').append(noIndex);
			$scope.$on("$destroy", function(){
				$(noIndex).remove();
			});
		}
	}

	$scope.setup.all = function(data) {
		$scope.setup.searchable(data);
		$scope.setup.product(data);
		$scope.setup.pageService(data);
		$scope.setup.toc(data);
		$scope.setup.releaseSelectors(data);
		$scope.setup.download(data);
		$scope.setup.currentPage(data);
		$scope.setup.nextpreviouspage(data);
		$scope.setup.subscriptions(data);
		$scope.setup.swa(data);
        
		$scope.setup.dir(data);
        /* DO NOT REPLACE THIS ORDER OF THESE CALLS AS 
         * setup.comments() expect the content over which 
         * it make annotations (comments) */
		$scope.publish();
        $scope.setup.comments(data.data.comments);
        /*DO NOT REPLACE THIS ORDER OF THESE CALLS */
		// $scope.setup.chunked();		
		$scope.pageLoading = false;	
		scrollToTop();
	}
	
	$scope.setup.page = function(data) {
		$scope.setup.toc(data); 
		// $scope.setup.releaseSelectors(data);
		$scope.setup.currentPage(data);
		$scope.setup.nextpreviouspage(data);
		$scope.setup.subscriptions(data);
		$scope.setup.swa(data);
        /* DO NOT REPLACE THIS ORDER OF THESE CALLS AS 
         * setup.comments() expect the content over which 
         * it make annotations (comments) */  
		$scope.publish();
        $scope.setup.comments(data.data.comments);
        /*DO NOT REPLACE THIS ORDER OF THESE CALLS */
		$scope.setup.chunked(data);
		trackData(data.data);
	}

	function trackData(data) {
		
		var pageName = data.currentPage.t;
		
		var language = $scope.getLanguage();
		
		var loginStatus = false;
   		if ($scope.user.id) {
    		loginStatus = true;
    	}
		
   		if(data.deliverable) {
   			var channel = data.deliverable.product + ":" + data.deliverable.loio;
   		}
        
        adobeTracker.setPageData(pageName, language, loginStatus, channel);
        adobeTracker.trackData();
	}

	sharedService.subscribeErrorEvent($scope, function somethingChanged() {
		$scope.pageLoading = false;
    }); 

	// Configure table of contents
	// CSS styling assignments go here.

	$scope.treeOptions = {
			nodeChildren: "c",
			dirSelectable: true,
			allowDeselect: false,
			injectClasses: {
				iExpanded: "fa fa-angle-down",
				iCollapsed: "fa fa-angle-right",
			}
	}

	
	$scope.expandToc = function() {	
		var count = Math.floor($scope.content.allNodes.length / 100) + 1,
		arrayLength = $scope.content.allNodes.length;

		var interval = $interval(function(countIter) {
			var length,
				cancel;
	
			if ((100 * (countIter + 1)) > arrayLength) {
				length = arrayLength;
				cancel = true;
			} else {
				length = 100 * (countIter + 1);
			}
	
			for (var i = countIter * 100; i < length; i++) {
				$scope.content.expandedNodes.push($scope.content.allNodes[i]);
			}
	
			if (cancel) {
				$interval.cancel(interval);
			}
		}, 100, count);
	}

	$scope.collapseToc = function() {
		$scope.content.expandedNodes.length = 0;
	}
	
	$scope.aliasURL = function(data) {                
         return $scope.url(data.state) + '/' + data.alias;
    }
	
	$scope.getViewerURL = function(data) {
        
       if(data.alias && data.filePath) {
           return $scope.aliasURL(data)+'/'+data.filePath;
       }
       else 
       {
    	   if (data.alias) {
    		   return $scope.aliasURL(data);
    	   } 
    	   else
    	   {
    		   return $scope.url(data.state) + '/' + data.deliverableLoio + '/' + data.version + '/' + data.languageCode+'/'+data.filePath;
    	   }
       }
	}
	
	$scope.getViewerURLAlias = function(data) {
        
		if(data.alias && data.filePath) {
			return PATHS.BASE_URL + $scope.aliasURL(data)+'/'+data.filePath;
		}
		else 
		{
			if (data.alias) {
				return PATHS.BASE_URL + $scope.aliasURL(data);
			} 
			else
			{
				return PATHS.BASE_URL +$scope.url(data.state) + '/' + data.deliverableLoio + '/' + data.version + '/' + data.languageCode+'/'+data.filePath;
			}
		}
	}

	// TOC:  changePage function for navigation from Table of Contents  // BUG - nonclickable topicheads
	// provides url for hrefs
	$scope.changePage = function(node) {
		var url, chunked, path, hash = "";
		if (typeof node === 'undefined' || node == null) {
			return null;
		}

		if (typeof node.u != 'undefined' || node.u != null){
			url = node.u;
		} else if (typeof node.p != 'undefined' || node.p != null){
			url = node.p;
		}
		else if (typeof node.m != 'undefined' || node.m != null){
			url = node.m;
			node.u = node.m;
		}

		if (!url || url === '') {
			return null;  // topicheads do not have URLs
		}
		
		chunked = node.h || null;
		
		if (chunked) {
			$scope.content.filePath = chunked.replace("loio", "") + '.html'; //#loio' + url.substring(0, url.length - 5);
			hash = '#loio' + url.substring(0, url.length - 5);
		} else {
			$scope.content.filePath = url;
		}

		path = PATHS.BASE_URL + $scope.getViewerURL($scope.content) + hash; 
		return path;  // we return the path so that the user can click "Open in new window" and this work.  If it is a function, then it doesn't seem to work.  Probably just needs more code to make it work. 
	};
	
	var isTopicHead = function(node) {
		if (node.u || node.m) {
			return false;
		} else return true;
	}
	
	// This function scrolls to the top of the page if the current scroll position is below it
	var scrollToTopOfPage = function() {
		var distanceFromTop = pageYOffset;
		var headerHeight = $('div#cp-hero').outerHeight() - 5;
		
		if (distanceFromTop > headerHeight) {
			$('html, body').animate({scrollTop: $("#page").offset().top},'fast');
		}
	}
	
	// This function initiates a changepage.  
    $scope.showSelected = function(node) {
        var url, 
        	buildableMap, 
        	params, 
        	chunked, 
        	path, 
        	newurl, 
        	parent, 
        	loio, 
        	height, 
        	temp, 
        	hash;
        
        if(!$scope.pdfRestricted) {
        	if($scope.tab.customPdf.isopen) {
    			$scope.showAddButton = false;
    		}
        }
		
        $scope.$broadcast('onShowSelected');
        
        if (!node) {
            return null;
        }
        
        if (node.u){
            url = node.u;
        } else {
            if (node.p){
                url = node.p;
            }
        }

        if (node.m) {
            // if topic is a deliverable (mapref link)
            buildableMap = node.m;
            if (buildableMap) {
                
                $scope.setup.query();
                
                // query and get new content for main page.
                params = {
                        deliverableInfo: 1,
                        toc: 1,
                        
                        deliverable_loio:   $scope.content.deliverableLoio,
                        version:            $scope.content.version,
                        language:           $scope.content.languageCode,
                        buildable_map:      buildableMap,
                        state:              $scope.state,
                        alias:              $scope.content.alias
					};
				if ($scope.user.id) {
					params.rnd = new Date().getTime();
				}
                
                $scope.pageContent = page.query(params, function (data) {  
                    // success handler  - new deliverable in new buildablemap
                    // update the local variables

                	var deliverable = data.data.deliverable,
                		stateName = getStateName(deliverable);

                    $state.go(stateName, {
                    	state: 				deliverable.state,
                    	deliverableLoio:    deliverable.loio,
                        version:            deliverable.version,
                        languageCode:       deliverable.languageCode,
                        filePath:          	deliverable.filePath,
                        alias:				deliverable.alias
                    });
                    
                    $scope.setup.logouturl();
                }, function(error) {
                    //error handler
                    sharedService.errorHandler(error);
                    $log.error('Server error retrieving deliverable');
                    $log.error(error);
                });
            }
            //$scope.content.expandedNodes.push(node);  // expand children of topichead
            return null;  // topicheads do not have URLs
        }
        
        if (!$scope.pageContent.data) {
            return null;  // query not completed yet
        }
        
        if (node.h) {
            parent = node.h;
            hash = url;
            url = parent;
        }
        
        if (!node.h && (url == $scope.pageContent.data.currentPage.u)) {
            
            scrollToTopOfPage();
            $location.hash('');        
            return null;  // same as current page
        }
        
        if (!node.h && node.u) { //scroll to top on regular topic links
        	$scope.hideToc();
        	$scope.hideRw();
            scrollToTopOfPage();
        }
        
        if (node.h) {
        	// chunked topic
        	if (($scope.pageContent.data.currentPage.u !== undefined ) && ( $scope.pageContent.data.currentPage.u.replace(".html","") == node.h.replace("loio","") )) {
				//check if node is just selected while current opened one is not its parent
				
				$scope.hideToc();
				$scope.hideRw();

				loio = getAnchorId(hash); // hash is in the form of filePath (e.g. 13fa65782b9c4b248186fa0c15b679fd.html)
				temp = angular.element(document.getElementById(loio)) || {};

				$document.scrollToElement(temp, 0, 800);
				$location.hash(loio);
				
        	} else {
				// query and get new content for main page

        		if(url !== '') { // url === node.h
        			$scope.content.filePath = url.replace('loio','')+'.html';
        		}
        		
				pageService.node = node ;

				var queryParams = {
                    deliverableInfo: 0,
                    toc: 0,
            
                    deliverable_loio:   $scope.content.deliverableLoio,
                    version:            $scope.content.version,
                    language:           $scope.content.languageCode,
                    file_path:          $scope.content.filePath,
                    state:              $scope.state,
                    alias:              $scope.content.alias
				}
				
				if ($scope.user.id) {
					queryParams.rnd = new Date().getTime();
				}
				
                $scope.pageContent = page.query(queryParams, function (data) {
                    // Same deliverable, different page
                    // update the local variables - do not update toc and deliverableinfo   
                    $scope.setup.errorCheck(data);  
                    $scope.setup.page(data);
                    //path =  $scope.getViewerURL($scope.content);
                    //$location.hash("#" + node.u);
                    //TODO
                    var params = {
                    	filePath: $scope.content.filePath,
                    	alias: $scope.content.alias
                    };
                    
                    var stateName = getStateName(params);

                    $state.go(stateName, {
                    	state: 				$scope.content.state,
                    	deliverableLoio:    $scope.content.deliverableLoio,
                        version:            $scope.content.version,
                        languageCode:       $scope.content.languageCode,
                        filePath:          	$scope.content.filePath,
                        alias:				$scope.content.alias,
                        '#':				node.u

                    },
					{
						location: true,
						inherit: true,
						relative: $state.$current,
						notify: false
					});
					var hash = node.u;
					
					$scope.hideToc();
					$scope.hideRw();
					
					if (hash !== "") {
						scrollToElementWithId(hash);
					}
					
                    $scope.setup.logouturl();
                    
					$scope.pageLoading = false;
					
					applyDynamicFiltering();

                }, function(error) {

                    sharedService.errorHandler(error);
                    $log.error('Server error retrieving deliverable');
                    $log.error(error);
                    
                    $scope.pageLoading = false;
                });
        		
        		
        	}
            return null;
        }  
        
		if(highlightingEnabled && !node.highlightable) {
			$location.search('q', null);
		}
		
        $(".target-html").empty();
        $scope.pageLoading = true;
        
        $scope.setup.query();
        
        // filePath exception for chunked topics

        chunked = node.h || null;
        if (!chunked) {
		    $scope.content.filePath = url; // url === node.h
        }
        
        // query and get new content for main page.
        var queryParams = {
				deliverableInfo: 0,
				toc: 0,
				deliverable_loio:   $scope.content.deliverableLoio,
				version:            $scope.content.version,
				language:           $scope.content.languageCode,
				file_path:          $scope.content.filePath,
				state:              $scope.state,
				alias:              $scope.content.alias
		};
		if ($scope.user.id) {
			queryParams.rnd = new Date().getTime();
		}
        $scope.pageContent = page.query(queryParams
        ,function (data) {  
            // Same deliverable, different page
            // update the local variables - do not update toc and deliverableinfo   
            
            $scope.setup.errorCheck(data);  
            $scope.setup.page(data);

            path = $scope.getViewerURL($scope.content); 
            
            if (!chunked) {
                $scope.content.filePath = url;
            }

            var stateName = getStateName();

            $state.go(stateName, {
            	state: 				$scope.content.state,
            	deliverableLoio:    $scope.content.deliverableLoio,
                version:            $scope.content.version,
                languageCode:       $scope.content.languageCode,
                filePath:          	$scope.content.filePath,
                alias:				$scope.content.alias
            },
            {
            	location: true,
            	inherit: true,
            	relative: $state.$current,
            	notify: false
    		}).then(function() {
				if(highlightingEnabled && node.highlightable) {
					$location.search('q', searchTerm);
					highlightText(searchTerm);
				}
				
				if(!$scope.pdfRestricted) {
					if($scope.tab.customPdf.isopen) {
						$scope.showAddButton = true;
					}
				}
			});

            $scope.setup.logouturl();
            
            $scope.pageLoading = false;

			applyDynamicFiltering();
            
        }, function(error) {

            sharedService.errorHandler(error);
            $log.error('Server error retrieving deliverable');
            $log.error(error);
            
            $scope.pageLoading = false;
        });
    }

	$scope.resetFiltering = function() {
		$scope.$broadcast("resetFiltering");
	}
    
	// breadcrumb - return links
    $scope.homecrumb = function() {
        var path = PATHS.BASE_URL;
        
        if($scope.content.alias) {
            return path + $scope.url($scope.state) + '/' + $scope.content.alias;
        } else {
     		return path + $scope.url($scope.state) + '/' + $scope.content.deliverableLoio + '/' + $scope.content.version + '/' + $scope.content.languageCode;
        }
    }
    
	$scope.crumb = function (item) {
		var path, chunked;
		
		if (!item) return null;
		if (!item.u && item.t) return null; // no url but title is present = topichead

		chunked = item.h || null;
		
		if (chunked) {
			$scope.content.filePath = chunked.replace("loio", "") + '.html'; // #loio' + url.substring(0, url.length - 5);
		} else {
			$scope.content.filePath = item.u;
		}
		
		path = PATHS.BASE_URL + $scope.getViewerURL($scope.content); 
		
		return path; 
	}
	
		
	// Edit content for viewer display
	// replace video/image links in body html
	// this function does a lot more than just replace links. 
	// It basically formats the transtype to be viewed better in the viewer. 
	// DITA functionality enablement occurs here.
	// This function should be rewritten as a directive.
	// ** formerly known as replacelinks
	
	$scope.publish = function () {
		
		var data, nav, header, footer, pagelinks, styles, colgroup, 
			convertsrc, convertposter, converthref, 
			convertInteractiveVideo, convertKalturaScripts, convertDisclaimerLinks, getNewAttributeHref;
		
		if ($scope.pageContent.data.body) {
			data = $scope.pageContent.data.body;
		} else {
			return null;
		}
		
		// parse content
		var content;
		// content = $.parseHTML( _body, document, true );
		content = $.parseHTML( data, document, true );  // run all scripts
		
		// for chunked topics: re-write all 'copy' prefixes to 'loio' ones
		recoveryStepsForChunkTopicAnchorMismatchInTocAndContent(content);

		// remove enumeration in the title header 
		var enumheader;
		enumheader = $(content).find("h1 span.enumeration");
		enumheader.remove();
		
		// Modifications for d4p-html5.sap format (SAP-Anywhere)
		// remove nav and header 
		nav = $(content).find("nav");
		header = $(content).find("header");
		footer = $(content).find("footer");
		pagelinks = $(content).find("#page-links");
		styles = $(content).find("style"); // try to avoid having inline styles overwrite viewer css
	
		nav.remove();
		header.remove();
		footer.remove();
		pagelinks.remove();
		styles.remove();
		
		// DHTML - remove colgroup (unwanted extra first column in tables)
		colgroup = $(content).find("colgroup");
		colgroup.empty();
		
		// remove any leftover imagemapster tooltips
		$('.mapster_tooltip').remove();
		
		convertKalturaScripts = function() {
			var that = this,
			oldScript, newScript;
			if ($(that).attr('modified') !== 'true') {
				oldScript = $(that)[0].innerHTML;
				if (oldScript.indexOf("kWidget") > -1) {
					newScript = "(function() {var run = function() {" +
						"if (kWidget !== undefined) {" + 
						oldScript + 
						"clearInterval(timer);" + 
						"}" +
				"};" + 
				" var timer = setInterval(function() {run()}, 500);})()";
				$(that)[0].innerHTML = newScript;
				$(that).attr('modified', 'true');
				}
			}
		}
		// convert DHTML img/video links to viewer format
		convertsrc = function () {
			var deliverable = $scope.pageService.data.deliverable,
				that = this,
				_src= $(that).attr('src'),
				_base;

			if (typeof _src === 'undefined' || _src.indexOf(PATHS.RESOURCE_URL) > -1) return;
			
			if ($scope.content.alias) {
			    _base = PATHS.RESOURCE_URL_WITH_ALIAS + $scope.state + '/' + $scope.content.alias + '/';
			}	
			else {
			    _base = PATHS.RESOURCE_URL + '/' + deliverable.state + '/' + deliverable.loio + '/' + deliverable.version + '/' + deliverable.languageCode + '/';
			}

			var _new = _base + _src;
			this.src = _new;
		};
		
		// convert DHTML poster images to viewer format
		convertposter = function () {
			var deliverable = $scope.pageService.data.deliverable,
				that = this,
				_poster= $(that).attr('poster'),
				_base;

			if (typeof _poster === 'undefined' || _poster.indexOf(PATHS.RESOURCE_URL) > -1) return;
			
			if ($scope.content.alias) {
			    _base = PATHS.RESOURCE_URL_WITH_ALIAS + $scope.state + '/' + $scope.content.alias + '/';
			}	
			else {
			    _base = PATHS.RESOURCE_URL + '/' + deliverable.state + '/' + deliverable.loio + '/' + deliverable.version + '/' + deliverable.languageCode + '/';
			}

			var _new = _base + _poster;
			this.poster = _new;
		};
		
		// convert href links
		converthref = function() {
			var _base, _path, _new;
			var that = this;
			var _href = $(that).attr('href');
			
			if (typeof _href === 'undefined' || _href.indexOf(PATHS.BASE_URL) > -1 || _href.indexOf(PATHS.RESOURCE_URL) > -1 || $(that).is('[href^="mailto:"]'))  return;
			if (_href.substring(0, 4) === "http") return;
			
			if (_href.indexOf(".html") > 0) {
			    if($scope.content.alias) {
			        _base = PATHS.BASE_URL + $scope.url($scope.state) + '/' + $scope.content.alias + '/';
			    }
			    else {
			        _base = PATHS.BASE_URL + $scope.url($scope.state) + '/' + $scope.content.deliverableLoio + '/' + $scope.content.version + '/' + $scope.content.languageCode + '/';
			    }
			} else {
			    if($scope.content.alias) {
			        _base = PATHS.RESOURCE_URL_WITH_ALIAS + $scope.state + '/' + $scope.content.alias + '/';
			    }
			    else {
			        _base = PATHS.RESOURCE_URL + '/' + $scope.state + '/' + $scope.content.deliverableLoio + '/' + $scope.content.version + '/' + $scope.content.languageCode + '/';
			    }
			}
			_path = _href.replace("frameset.htm?", "");
			_new = _base + _path;
			this.href = _new;
		}

		convertDisclaimerLinks = function() {
			var href = $(this).attr('href'),
				index = href.indexOf("="),
				queryParameter = href.substring(index + 1),
				newhref = "";

			newhref = "disclaimer-for-links?q=" + encodeURIComponent(queryParameter);

			this.href = newhref;
		}

		getNewAttributeHref = function(){
			
			var href = $(this).attr('href'),
			index = href.indexOf("="),
			queryParameter = href.substring(index + 1),
			newhref = "";
			
			newhref = "/viewer/disclaimer-for-links?q=" + encodeURIComponent(queryParameter);
			$(this).attr("disurl", newhref)
						
		}
		
		function setclicklink(){
			var that = this;
			var _href = $(that).attr('href');
			
			if (_href.indexOf(".html#loio") > 0) {
				AttachEvent(that, "click", onClickEventHandler);
			}
			
		}

		function AttachEvent(element, type, handler) {
			if (element.addEventListener) element.addEventListener(type, handler, false);
			else element.attachEvent("on"+type, handler);
		}

		function onClickEventHandler(e) {
		
			e.preventDefault();
			
			var node = (e.srcElement || e.target) // a.xref - the expected element (node)
            if(!node.className.indexOf('xref') !== -1) {
            	node = node.ownerDocument.activeElement
            }
			var parts = node.pathname.split('/');
			
        
			if (($scope.pageContent.data.currentPage.u !== undefined ) && ( $scope.pageContent.data.currentPage.u == parts[parts.length - 1])){

				//check if node is just selected while current open one is not his parent

				var hash = node.hash.replace("#", ""),
                temp = angular.element(document.getElementById(hash)) || {};
     
                $document.scrollToElement(temp, 0, 800);
				$location.hash(hash);
				
				$scope.content.selectedNode = getSelectedNode();
				
			} else {

				// query and get new content for main page.

				$scope.setup.query();
				var linkState;
				
				$scope.content.filePath = parts[parts.length - 1];
				if (parts.length > 4) {
					linkState = parts[parts.length - 5];
				} else {
					linkState = "PRODUCTION";
				}
				
				var params = {
					deliverableInfo: 1,
					toc: 1,
					
					deliverable_loio:   parts[parts.length - 4],
					version:            parts[parts.length - 3].replace('%20',' '),
					language:           parts[parts.length - 2],
					file_path:          parts[parts.length - 1],
					state:              linkState,
					alias:              undefined
				};

				if ($scope.user.id) {
					params.rnd = new Date().getTime();
				}
				
				$scope.pageContent = page.query(params, function (data) {
                   // Same deliverable, different page
                   // update the local variables - do not update toc and deliverableinfo   
					
					$scope.setup.errorCheck(data);
					
			        if ((data.data.redirect !== undefined) && (data.data.redirect !== "")) {

						$window.location.href = data.data.redirect;
						
			        } else {

						var hash = node.hash.replace('#','');
						$location.hash(hash)
						$scope.setup.page(data);
				
						//TODO
						var prms = {
							filePath: params.file_path,
							alias: params.alias
						};
						
						var stateName = getStateName(prms);

						$state.go(stateName, {
							state: 				linkState,
							deliverableLoio:    params.deliverable_loio,
							version:            params.version,
							languageCode:       params.language,
							filePath:          	params.file_path,
							alias:				params.alias,
							'#': 				hash
						},
						{
							location: true,
							inherit: true,
							relative: $state.$current,
							notify: false
		           		});
		                   
						if (hash !== "") {
							scrollToElementWithId(hash);
						}
						$scope.setup.logouturl();
						
						$scope.pageLoading = false;
			        }
                   
               }, function(error) {
                   sharedService.errorHandler(error);
                   $log.error('Server error retrieving deliverable');
                   $log.error(error);
                   
                   $scope.pageLoading = false;
               });
       		}
		};
		
		convertInteractiveVideo = function() {
			var relativeUrl = this.href.substring(this.href.indexOf("viewer/") + 7);
			this.href = PATHS.RESOURCE_URL + '/' + $scope.state + '/' + $scope.content.deliverableLoio + '/' + $scope.content.version + '/' + $scope.content.languageCode + '/' + relativeUrl;
		}

		// select links for conversion

		var _lightbox, _prettyprint, alinks, innerlinks, xreflinks,  arealinks, imglinks, videolinks, interactivevideolinks, videos, kalturaScripts, tablenoborder, disclaimerLinks; 
		
		_lightbox = $(content).find("a[data-lightbox]");
		_prettyprint = $(content).find(".prettyprint");
		alinks = $(content).find(".link");
		xreflinks = $(content).find(".xref");
		innerlinks = $(content).find("[href*='frameset']");
		arealinks = $(content).find("area");
		
		imglinks = $(content).find("img");
		interactivevideolinks = $(content).find("a[data-zip-file-name]");

		videolinks = $(content).find("video source");
		videos = $(content).find("video");
		kalturaScripts = $(content).find("script:contains('kWidget')");
		tablenoborder = $(content).find("div.tablenoborder");
		
		//NEW DISCLAIMER POP UP
		//disclaimerLinks = $(content).find("[href*='help.sap.com/disclaimer?site=']");
		
		if($scope.showByFeatureFlag("disclaimer")){
		
		   disclaimerLinks = $(content).find("[href*='help.sap.com/disclaimer?site=']");
		   disclaimerLinks.each(convertDisclaimerLinks);
		   
		}else{
		
		disclaimerLinks = $(content).find("[class ='extlink']");
				
		disclaimerLinks.each(getNewAttributeHref);
		
		disclaimerLinks.removeAttr("href")
		
		disclaimerLinks.on('click', function( event ){
			
			var hrefURL = this.getAttribute('disurl');
			$scope.openDisclaimer(hrefURL);
		
		  });
		
		}
		//-------------------------------
		// Disable right-click
		/*
		openDis.on('contextmenu', function(e){
			e.prevenDefault();
			var hrefURL = this.getAttribute('href')
			
			$scope.openDisclaimer(hrefURL);
			
		}, false); */
		
		// convert DHTML frameset links to viewer format
		// convertion of xrefs is done in backend.
		alinks.each(converthref);
		innerlinks.each(converthref);
		xreflinks.each(converthref);
		xreflinks.each(setclicklink);
		_lightbox.each(converthref);
		arealinks.each(converthref);

		//disclaimerLinks.each(convertDisclaimerLinks);
		
		imglinks.each(convertsrc);	
		videolinks.each(convertsrc);
		videos.each(convertposter);
		kalturaScripts.each(convertKalturaScripts);
		interactivevideolinks.each(convertInteractiveVideo);
		videos.each(function () {  
			// this is needed to prevent the audio from continuing to play when the video is paused.
			this.pause();
		});
		
		// Collapsible sections - remove href="#nowhere" 
		var _nowhere;
		_nowhere = $(content).find("[href*='#nowhere']");
		_nowhere.removeAttr( "href" );
		
		/* recovering from an issue from the content-generation side:
			- the html content for Dynamic Filtering references some missing files (scripts or others)
			- the console informs of the missing references (not a critical issue)
			- recovery: do not include these broken references */
		content = $.grep(content,function(el) {
			if(el.src) {
				return (el.src.indexOf('profilingapi.min.js') == -1 && 
						el.src.indexOf('content-profiling-data') == -1 && 
						el.src.indexOf('profilingsync.min.js') == -1 );
			} else 
				return true;
		});

		// Empty target-html
		var target;
		target = $(".target-html");
		target.empty();	// remove any content already present
		
		try {
			target.html(content);	// add modified content
		}
		catch(e) {
			$log.info(e);
		}
		
		// **** Collapsibles ****
		
		var getCollapsifyLocalizedStrings = function() {
			var collapsifyOpts = {};
			for (var i = 0; i < content.length; i++) {
				if (content[i].tagName === "SCRIPT" && content[i].outerHTML.indexOf("collapsify") > -1) {
						var str = content[i].outerHTML;
						var jsonStr = str.match(new RegExp("collapsify\\(([^\\)]*)\\);"));
						collapsifyOpts = {};
						if (jsonStr !== null && jsonStr.length > 1) {
							try {
								collapsifyOpts = JSON.parse(jsonStr[1]);
							} catch (e) {
								//deliverable will need to be built and uploaded to use localized strings.
							} finally {
								return collapsifyOpts;
							}
						}
				}
			}
			return collapsifyOpts;
		}
		
		var _collapsibles;
		
		_collapsibles = $(".collapsible"); 
		
		if (_collapsibles.length) {
			var opts = getCollapsifyLocalizedStrings();
			_collapsibles.collapsify(opts);
		} 
		
		// *** Highlighting Search Terms****
		if(highlightingEnabled && $location.search().q) {
			searchTerm = $location.search().q;
			highlightText(searchTerm);
		}
		
		// **** Datatable ****
		
		var convertDatatable = function(elt) {
			var e, _caption;
			
			if ( ! $.fn.DataTable.isDataTable(elt)) {
				
				e = $(elt);
				_caption = e.find("caption").detach();

				// TODO:  insert column configuration here later
				
				e.css('width','100%');  // fix datatable width (resizable panes)

				e.parent().parent().prepend(_caption);  // add datatable caption
				
				$(elt).DataTable({
					"dom": 'B<"table-top"lpf><"datatable-scroll"rt><"table-bottom"ip>',
		            "buttons": [
		                        {
		                        	extend: 'colvis',
		                        	text: 'Show / hide columns'
		                        }],
				}).columns.adjust();
			}				
		}	
		var _table;
		var _datatables;
		
		_datatables = $("table[class*='datatable']"); 
		
		if (_datatables.length) {			
			for (var i = 0; i < _datatables.length; i++) {
				convertDatatable(_datatables[i]);
			}
		} 

		$('.dt-buttons').each(function () {
            $(this).parent().parent().before(this);
		});
		
		// tables
		var _tables;
		_tables = document.querySelectorAll("table");

		for (var i = 0; i < _tables.length; ++i) {
			var item = _tables[i];

			$(item).doubleScroll({ 
				contentElement: 'table'
			});
			
			$(item).width('auto');
			$(item).prev('div').width('auto');
			
		}
		
		var _tablenoborders;
		_tablenoborders = document.querySelectorAll("div.tablenoborder");
		
		var _html;
		_html = document.querySelector("html");
		
		var restoreCss = function(item) {
			
			$(item).css({
				'overflow': 'auto',
				'position': 'static',
				'height': '100%',
				'top': 'auto',
				'background-color': 'transparent',
				'width': 'auto',
				'left': 'auto',
				'z-index': 'inherited',
				'border' : '0px',
				'border-color': 'rgh(51, 51, 51)',
				'border-style': 'none',
				'padding': '0',
				'box-shadow': 'none',
				'pointer-events': 'auto',
			});
			
			$(item).find("table").css('width','100%');
			$(item).find("div.datatable-scroll").css('padding', '0');
			$(item).find("div.doubleScroll-scroll-wrapper").css('width','100%');
			$('.btn-close-window').css('display', 'none');
			
			$(_html).css('overflow', 'auto');
			
		}
		
		var cplightbox = function(item) {
			if (!item) item = this;
			
			$(item).css( {
				
				'overflow': 'auto',
			    'position': 'fixed',
			    'height': '100vh',
			    'top': '20px',
			    'width': '100%',
			    'left': '0',
			    'z-index': '1000',
			    'background-color': 'rgba(255, 255, 255, 0)',
			    'box-sizing': 'border-box',
			    'pointer-events': 'none',
				
			});
			
			$(item).find("table").css( {
				
				'width': '100%',
			    'overflow-x': 'auto',
			    'overflow-y': 'hidden',
			    'background-color': '#FFF',
			    'box-sizing': 'border-box',
				
			});
			$(item).find("div.datatable-scroll").css('padding', '0em 1em');
			$(item).find("div.doubleScroll-scroll-wrapper").css('width','100%');
			
			if ($(item).hasClass("img-box")){
				var w = window.innerWidth;
				var h = window.innerHeight;
				var nw = item.get(0).childNodes[1].naturalWidth;
				var nh = item.get(0).childNodes[1].naturalHeight;
				var top = 30, left = 20, rm = 20;
				
				if ((h-nh) > 0) {
					top = ((h - nh) / 2) - 50;
				} 
				
				if ((w - nw) > 0) {
					left = (w - nw) / 2;
				} 
				
				$(item).css( {
					'top': top,
					'left': left,
					'width': 'auto',
				    'pointer-events': 'none',
				    'margin-right': rm,
				});
				
				$(item.get(0).childNodes[1]).css({
					'height': 'auto',
					'width': 'auto',
				    'overflow-x': 'auto',
				    'overflow-y': 'hidden',
				    'background-color': '#FFF',
				    'box-sizing': 'border-box',
				    'position':'relative',
				    'margin':'auto',
				    'pointer-events': 'auto',
				});
			}
			
			$(_html).css('overflow', 'hidden');
		}
		
		for (var i = 0; i < _tablenoborders.length; ++i) {
			var item = _tablenoborders[i];
			var expandButton = '<div class="btn-expand"><button class="ColVis_Button">Expand <span class="btn-expand-icon">&#xe0ac;</span></button></div>';
			var closeWindow = '<div class="btn-close-window"><span class="btn-close-window-icon">&#xe1c8;</span></div>';
			var isOpen = false;
			var thead = $(item).find("thead");
			var widest = thead.outerWidth(true);
			var topic = $('#topic');
			var topicWidth = topic.outerWidth(false) - 130;  // find width when resized.

			if (widest > topicWidth) {
				var _colvis = $(item).find(".ColVis");
				
				_colvis.before(expandButton);
				$(item).prepend(closeWindow);
				$('.btn-close-window').css('display', 'none');
				
				$(item).find(".btn-expand, .btn-close-window").on('click', function( event ){
					event.preventDefault();
				
					if (isOpen) {
						restoreCss(item);
						$('div.backdrop').remove();
						$('.btn-close-window').css('display', 'none');
						$('div.btn-expand>button.ColVis_Button').text("").append("Expand <span class='btn-expand-icon'>&#xe0ac;</span>");
						isOpen = false;
					} else {
						// set up background for click to close
						var back = '<div class="backdrop"></div>';
						
						if ($('div.backdrop').length == 0){
							$(item).before(back);
							$('div.backdrop').on('click', function (){
								// restore original CSS
								restoreCss(item);
								$(this).remove();
								isOpen = false;
							});
						}

						
						// Lightbox
						cplightbox(item);
						//$('.btn-close-window').css('display', 'inherit');
						$('div.btn-expand>button.ColVis_Button').text("").append("Close <span class='btn-expand-icon'>&#xe0ad;</span>");
						isOpen = true;
							
					 }
	
				});
			
			}
		}

		// **** Prettyprint (prettify.js) ****
		if (_prettyprint.length){
			prettyPrint();
		}
		
	};

	(function() {
		$scope.setup.query();

		var params = {
				deliverableInfo: 1,                                         // deliverableInfo is already in pageService
                toc: 1,                                                     // toc is already in pageService
                deliverable_loio:   $scope.content.deliverableLoio,
                version:            $scope.content.version,
                language:           $scope.content.languageCode,
                file_path:          $scope.content.filePath,
                state:              $scope.state,
                alias:              $scope.content.alias
		};

		if ($scope.user.id) {
			params.rnd = new Date().getTime();
		}

		if ($location.search().loadlandingpageontopicnotfound) {
			
			params.loadlandingpageontopicnotfound = $location.search().loadlandingpageontopicnotfound;
			
			// clean-up the url from the additional parameter
			$location.search('loadlandingpageontopicnotfound', null);
		}
		
        $scope.pageContent = page.query(params, function (data) {
			var hash = $location.hash();

			$scope.setup.errorCheck(data);
			if ((data.data.redirect !== undefined) && (data.data.redirect !== "")){
				var url = $window.location.protocol + '//' + $window.location.host + data.data.redirect;
				$window.location.replace(url);
			} 
			else {
				//TODO
				$scope.setup.all(data);

				if (hash !== "") {
					scrollToElementWithId(hash);
				}

				if (data.data.deliverable) {
					var tokens = data.data.deliverable.filteringTokens;

					if (tokens) {
						var pset = new ProfilingSet("Content Filtering", 
								data.data.deliverable.filteringTokens);
						var controller = new ProfilingController(window, pset);

						$(window.document.documentElement).data("contentProfilingController", controller);
						controller.synchronize(window, "content");
						pageService.filteringController = controller;
					}
				}
			}

		}, function(error) {
                // error handler
                // this code is for an automatic sign in if the user is not logged in and the content is secured.
                // it automatically logs in the user and redirects back to the content.
                var firstname = $cookies.get("sapuacpuserfirstname");
                var sapuacplogout = $cookies.get("sapuacplogout");
                
                if ((error.status === 403) && (!firstname)  && (sapuacplogout === undefined || sapuacplogout === "true")) {
                    
                    var path = PATHS.LOGIN_URL + $location.absUrl().replace('#', '%23');
                    $window.location.href = $window.location.protocol + '//' + $window.location.host + path;    
                    
                } else {
                    sharedService.errorHandler(error);
                    $log.error('Server error retrieving deliverable');
                    $log.error(error);
                    //$scope.pageService.deliverable.title = ":-(";
                }
        });
        
	})();

	// Print page functionality 
	$scope.printDiv = function(divName) {
	  var printContents = document.getElementById(divName).innerHTML || null;
	  var popupWin = window.open('', '_blank', 'width=300,height=300');
	  popupWin.document.open();
	  popupWin.document.write('<html><head>' +
			  '<base href="/viewer/" />' +
			  '<link rel="stylesheet" type="text/css" href="css/fonts.css" />' +
			  '<link rel="stylesheet" type="text/css" href="css/general.css" />' +
			  //'<link rel="stylesheet" type="text/css" href="css/table.css" />' +
			  //'<link rel="stylesheet" type="text/css" href="css/cp.css" />' +
			  //'<link rel="stylesheet" type="text/css" href="css/page.css" />' +
			  '<link rel="stylesheet" type="text/css" href="css/dita.css" />' +
			  '<link rel="stylesheet" type="text/css" href="css/datatables.css" />' +
			  '<link rel="stylesheet" type="text/css" href="css/datatable.css" />' +
			  '<link rel="stylesheet" type="text/css" href="css/printstyles.css" />' +
			  '</head><body onload="window.print()"><div id="page">' + printContents + '</div></body></html>');
	  popupWin.document.close();
	} 
	
	$scope.print = function() {
		$scope.printDiv('print-target');
	}
		
	
	// Context Search
	var _keywords = '';
	
    // Authentication code
    $scope.result = {};

    $scope.search = {
    		keywords: function(newKeywords){
    			return arguments.length ? (_keywords = newKeywords) : _keywords;
    		},
    		showresults: false,
    };
    
    //Keeps track of whether a local search has been performed in this viewer session
    
    var searchPerformed = {
			value: false
	};
    
    $scope.searchPerformed = searchPerformed;
    
    $scope.getLanguage = function() {
	    // check for equal (===) null or undefined
    	if ($scope.content.languageCode == null) {
    		return $scope.pageService.deliverable.languageCode;
    	} else {
    		return $scope.content.languageCode;
    	}
    }
    
    $scope.getDirection = function() {
    	var language = $scope.getLanguage();
    	
    	if (language !== undefined) {
			if (language.substring(0, 2) == 'ar' || 
				language.substring(0, 2) == 'he') {
				return 'rtl';
			} else {
				return 'ltr';
			}
    	}
    	return 'ltr';
	};
	
    $scope.getSecLang = function () {
        var langcode = $scope.getLanguage().substring(0,2);
        if (langcode !== undefined) {
        	return langcode;
        }
        return 'en';
    };
    
    $scope.getDeliverableLoio = function() {
    	// check for equal (===) null or undefined
    	if ($scope.content.deliverableLoio == null){
    		return $scope.pageService.deliverable.loio;
    	}else{
    		return $scope.content.deliverableLoio;
    	}
    }
    
    $scope.getVersion = function() {
    	// check for equal (===) null or undefined
    	if ($scope.content.version == null){
    		return $scope.pageService.deliverable.version;
    	}else{
    		return $scope.content.version;
    	}
    }
    
    $scope.getState = function() {
    	// check for equal (===) null or undefined
    	if ($scope.content.state == null){
    		return $scope.pageService.deliverable.state;
    	}else{
    		return $scope.content.state;
    	}
    }
    
    // $scope.go queries the searchResult service
    // @param x is the keywords, or search terms.
    $scope.localResultsWaiting = false;
    $scope.to = 21;
	$scope.moreResults = false;
    $scope.previousTerm = '';
    $scope.result.results = [];
    
    var adobeTracker = new AdobeTrackingService();
    
    $scope.golocal = function(keywords) {
    	

		if (keywords !== undefined) {
			
			if(highlightingEnabled) {

				searchTerm = keywords;

				highlightText(searchTerm);

				if($location.search.q != searchTerm) {
					$location.search('q', searchTerm);
				}
			}
			
			$scope.changeTab('search');
			$scope.pane.showSearch = true; 
			$scope.tab.search.isopen = true;
			$scope.hideToc();
			searchPerformed.value = true;
			
			if (window.innerWidth < 1025) {
				$scope.$parent.rwShown.value = true;
			}
				$scope.localResultsWaiting = true;
				$scope.previousTerm = keywords;
				$scope.to = 21;
				$scope.moreResults = false;
		} else {
			keywords = $scope.previousTerm;
		}
    	
    	// check for alias
    	// set the deliverableLoio if it is alias 
		// when alias the always called scope.setup.query function that take these parameters need for the search request:
		// loio , version , lang and state will set them to undefined !!!
		
		var navrefsearch = sharedService.isRestricted("navrefsearch") ? 0 : 1;
		
    	$scope.tempResult = searchResult.query({
    		q: encodeURIComponent(keywords),
    		language: $scope.getLanguage(),//$scope.getLanguage(),
    		deliverable: $scope.getDeliverableLoio(),//$scope.content.deliverableLoio,
    		version: $scope.getVersion(),//$scope.content.version,
			state: $scope.getState(),
			navrefsearch: navrefsearch,
			to: $scope.to
    	},
        function (data) {
            // success handler
			var response = data.data;
    		$scope.localkeywords = keywords;
    		$scope.localResultsWaiting = false;
			var _resultsLength = response.results.length;
            if (_resultsLength === $scope.to) {
                $scope.moreResults = true;
                response.results = response.results.splice(0, $scope.to - 1);
                $scope.to += 20;
            } else {
                $scope.moreResults = false;
            }
			
            $scope.result = $scope.tempResult;
            
            var noResults = false
            if(!_resultsLength) {
            	noResults = true;
            }
            
            adobeTracker.trackSearchData(response.query, noResults);
        },
        function(error) {
            // error handler
            sharedService.errorHandler(error);
            $scope.localResultsWaiting = false;
			
		$scope.result = $scope.tempResult;
        });
    	$scope.search.showresults = true;
    };
    
    $scope.onSelectResult = function() { 
    	
    	var linkRank = this.$index+1; 
    	var linkDescription = this.item.title; 
    	
    	adobeTracker.trackResultClick(linkRank, linkDescription);
    };
    
    $scope.goProduct = function(keywords) {
    	
    	var state = $scope.getState();
    	var language = $scope.getLanguage();
    		
    	$location.url('/search?q=' + keywords + '&state='+state+'&language='+language+'&format=standard,html,pdf,others' );
    }
   
    
    $scope.whereToGo = function(searchData) {
	    	
    		//console.log('ff off');
	    	if(searchData.area === "this document") {
	    		$scope.golocal(searchData.keywords);
	    	} else {
	    		$scope.goProduct(searchData.keywords);
	    	}
	    	
    }
    
    $scope.whereToGoFF = function(keywords) {
    		
	    	//console.log('ff on');
	    	if ($scope.currentSearchScope == "This document") {
	    		//console.log('local');
	    		$scope.golocal(keywords);
	    	} else if ($scope.currentSearchScope == "This product") {
	    		//doesn't exist yet
	    		//$scope.goProduct(keywords);
	    	} else if ($scope.currentSearchScope == "All SAP products") {
	    		//console.log('global');
	    		$scope.goProduct(keywords);
	    	}
	    	
    }
    
    localResult.subscribe($scope, $scope.whereToGo);
    

	// logic connected to the Release selectors

	$scope.setup.releaseSelectors = function(data) {
		$scope.setup.releases();
		$scope.setup.versions();
		$scope.setup.languages();
		$scope.setup.states();
		$scope.setup.showVersionSelector(data);
		$scope.setup.showLanguageSelector();
		$scope.setup.showStateSelector();
	}

	/*
	 * A release or a 'valid combination' is a record row from the database that is returned from a search for 
	 * deliverables with the same {buildable map loio AND product} as the current deliverable. 
	 * 
	 * It is possible that there is for instance a language 'EN' associated with a version '1.0' 
	 * but several languages 'EN' and 'DE' associated with version '2.0' and thus switching 
	 * from version '2.0' to '1.0' when the current deliverable is in 'DE' cannot find a deliverable.
	 * 
	 * The complication is extended with the state and transtype (format) for a valid combination.
	 */
	$scope.setup.releases = function() {
		
		if (pageService && pageService.deliverable && pageService.deliverable.releases) {
			
			$scope.content.releases = []

			var _unsortedVersions = JSON.parse(JSON.stringify(pageService.deliverable.releases));

    		var _unsortedVersionKeys = _unsortedVersions.map(function(obj) {
    			return obj.v;
			});
			//Deep copy.  The sortVersions function will sort the original array passsed in but we want to keep a copy of the original ordering.
			var _unsortedVersionKeysCopy = JSON.parse(JSON.stringify(_unsortedVersionKeys));
			// releases are sorted by the version id (release.v) and not by the version name (release.n)
			var _sortedVersionKeys = versionUtilities.sortVersions(_unsortedVersionKeysCopy);
			
    		for (var i = 0; i < _sortedVersionKeys.length; i++) {
    			var n = _unsortedVersionKeys.indexOf(_sortedVersionKeys[i]);
    			$scope.content.releases.push(_unsortedVersions[n]);
    			_unsortedVersionKeys.splice(n, 1);
                _unsortedVersions.splice(n, 1);
			}
			
			// releases where the version name is empty will be entirely ignored
    		// releases where the transtype is not html5.uacp or pdf will also be entirely ignored
			$scope.content.releases = $scope.content.releases.filter(function(release) {
				return (release.transtype == "html5.uacp" || release.transtype == "pdf" || release.transtype == "pdf.sap");
			});

			// for not logged in users only use releases that are in state PRODUCTION
			if ( !usersManagement.isLoggedOn() ) {
				$scope.content.releases = $scope.content.releases.filter(function(release) {
					return release.state == "PRODUCTION";
				});
			}

			var num = currentRelease($scope.content.releases, $scope.content.version,
					$scope.content.languageCode, $scope.state, $scope.content.deliverableLoio, $scope.content.alias);

			$scope.content.selectedRelease = $scope.content.releases[num];
		} else {
			$scope.content.releases = [];
			$scope.content.selectedRelease = null;
		}

	}

	$scope.setup.versions = function() {

		var releases = $scope.content.releases.filter(function(release) {
			return (release.n != "");
		});
		
		if ( !releases && !Object.prototype.toString.call( releases ) === '[object Array]') {

			$scope.content.versions = [];
			return;
		}
		
		var newItems = [];

		$scope.htmlVersionMap = {}; // determines whether to place pdf icon 
		$scope.pdfVersionMap = {}; // determines whether to place pdf icon

		for (var i = 0; i < releases.length; i++) {

			var isDuplicate = false;

			for (var j = 0; j < newItems.length; j++) {

				if (releases[i].v == newItems[j].v) {
					isDuplicate = true;
					break;
				}
			}

			if ( !isDuplicate ) {
				newItems.push({v: releases[i].v, n: releases[i].n});
			}

			if ( releases[i].transtype == "html5.uacp") {
				$scope.htmlVersionMap[releases[i].v] = true;
			}
			if ( releases[i].transtype == "pdf" || releases[i].transtype == "pdf.sap" ) {
				$scope.pdfVersionMap[releases[i].v] = true;
			}
		}

		// sort the versions in the order they appear in the product page
		var _unsortedVersionKeys = newItems.map(function (obj) {
			return obj.v;
		});
		var _sortedVersionKeys = versionUtilities.sortVersions(_unsortedVersionKeys);
		var availableVersions = [];
		for (var i = 0; i < _sortedVersionKeys.length; i++) {
			var n = _unsortedVersionKeys.indexOf(_sortedVersionKeys[i]);
			availableVersions.push(newItems[n]);
		}

		$scope.content.versions = availableVersions;
	}

	$scope.setup.languages = function() {

		var releases = $scope.content.releases;
		
		if ( !releases && !Object.prototype.toString.call( releases ) === '[object Array]') {

			$scope.content.languages = [];
			return;
		}
		
		var newItems = [];

		$scope.htmlLanguageMap = {}; // determines whether to place pdf icon
		$scope.pdfLanguageMap = {}; // determines whether to place pdf icon

		for (var i = 0; i < releases.length; i++) {

			var isDuplicate = false;

			for (var j = 0; j < newItems.length; j++) {

				if (releases[i].l == newItems[j]) {
					isDuplicate = true;
					break;
				}				
			}

			// waterfall logic:
			// filter the languages based on the current version
			if ( !isDuplicate ) {
				if (releases[i].v == $scope.getVersion())
					newItems.push(releases[i].l);
			}

			if ( releases[i].transtype == "html5.uacp" ) {
				$scope.htmlLanguageMap[releases[i].l] = true;
			}
			if ( releases[i].transtype == "pdf" || releases[i].transtype == "pdf.sap" ) {
				$scope.pdfLanguageMap[releases[i].l] = true;
			}
			
		}

		$scope.content.languages = newItems;
	}

	$scope.setup.states = function() {

		var releases = $scope.content.releases;

		if ( !releases && !Object.prototype.toString.call( releases ) === '[object Array]') {
		
			$scope.content.states = [];
			return;
		}

		var newItems = [];
		
		$scope.htmlStateMap = {}; // determines whether to place pdf icon
		$scope.pdfStateMap = {}; // determines whether to place pdf icon

		for (var i = 0; i < releases.length; i++) {

			var isDuplicate = false;
			
			for (var j = 0; j < newItems.length; j++) {

				if (releases[i].state == newItems[j]) {
					isDuplicate = true;
					break;
				}
			}
			
			// waterfall logic:
			// filter the states based on the current version and language
			if ( !isDuplicate ) {

				if (releases[i].v == $scope.getVersion() && 
						releases[i].l == $scope.getLanguage() )
					newItems.push(releases[i].state);
			}

			if ( releases[i].transtype == "html5.uacp" ) {
				$scope.htmlStateMap[releases[i].state] = true;
			}
			if ( releases[i].transtype == "pdf" || releases[i].transtype == "pdf.sap" ) {
				$scope.pdfStateMap[releases[i].state] = true;
			}

		}

		$scope.content.states = newItems;
	}

	$scope.shouldAddPdfIcon = function(version, language, state) {

		var availableInHTML = $scope.htmlVersionMap[version] && 
								$scope.htmlLanguageMap[language] && 
								$scope.htmlStateMap[state];
		
		var availableInPDF = $scope.pdfVersionMap[version] && 
								$scope.pdfLanguageMap[language] && 
								$scope.pdfStateMap[state];
		
		return !availableInHTML && availableInPDF;
	}
	
	$scope.setup.showVersionSelector = function(data) {

		// determines whether the "show version" checkbox in Edit Product Page is checked
		var showVersionName = data.data.deliverable.showVersionName;
		
		var uniqueVersions = $scope.content.versions;

		// for more than one version (with version name), always show the version selector
		// for a single version (with version name), check whether the "show version" checkbox in Edit Product Page is checked
		$scope.content.versionSelector = versionUtilities.getVersionSelectorState(uniqueVersions, showVersionName);
	}

	$scope.setup.showLanguageSelector = function() {

		// for more than one language show the language selector
		// for a single language different from the preferred user language (derived from the browser and other data) also show the language selector

		$scope.showLanguageSelector = $scope.content.languages.length > 1 
										|| !$scope.checkLanguageNew($scope.getTwoDigitPrefLang());
	}

	$scope.setup.showStateSelector = function() {

		$scope.showStateSelector = $scope.is_employee || $scope.is_admin;
	}
	
    //check if language exists in releases, used for the secondary language selector on viewer
    $scope.checkLanguageNew = function(preferredLanguage) {

    	if ($scope.content.releases !== undefined) {
    		
	    	var availableLanguages = $scope.content.releases.map(function(release) {
	    		if (release.l.substring(0, 2) == $scope.content.selectedRelease.l.substring(0, 2)) {
	    			var twoDigits = release.l.substring(0, 2);
	    			return twoDigits;
	    		}
			});

	    	if(availableLanguages.indexOf(preferredLanguage) > -1){
	    		return true;
	    	} else {
	    		return false;
	    	}
	    	
    	} else {
    		return true;
    	}
	}
	
	$scope.checkActive = function(var1, var2) {
		if (var1 == var2) {
			return true;
		}
	}
	
	$scope.filterStatusName = function(value) {
		if (value == 'PRODUCTION') {
			return 'SEARCH_RESULTS_PRODUCTION';
		} else if (value == 'TEST') {
			return 'SEARCH_RESULTS_Test';
		} else {
			return 'SEARCH_RESULTS_DRAFT';
		}
	}

	$scope.changeVersion = function(version, versionName) {

		// disable event for currently selected version
		if (version == $scope.content.selectedRelease.v) {
			return;
		}

		var desiredValues = {
			"l" : $scope.content.selectedRelease.l,
			"state" : $scope.content.selectedRelease.state,
			"transtype" : $scope.content.selectedRelease.transtype, // "html5.uacp"
			"title" : $scope.content.selectedRelease.title
		};

		var resolveObjectOptions = {};
		resolveObjectOptions.currentRelease = $scope.content.selectedRelease;
		resolveObjectOptions.selectorChanged = ["version", versionName];
		resolveObjectOptions.currentTopic = pageService.currentPage.u;
		
		var filteredByVersion = $scope.content.releases.filter(function(release) {
			return release.v == version;
		});
		
		// the filtering results in at least one result otherwise the version must not have appeared as an option

		var filteredByLanguage = filteredByVersion.filter(function(release) {
			return release.l == desiredValues.l;
		});

		if (filteredByLanguage.length == 0) {
			// invalid combination
			resolveObjectOptions.resolveState = "INVALID_COMBO";
			resolveObjectOptions.availableReleases = filteredByVersion;

			resolveConflict(resolveObjectOptions);
			return;
		}

		var filteredByState = filteredByLanguage.filter(function(release) {
			return release.state == desiredValues.state;
		});

		if (filteredByState.length == 0) {
			// invalid combination
			resolveObjectOptions.resolveState = "INVALID_COMBO";
			resolveObjectOptions.availableReleases = filteredByLanguage;

			resolveConflict(resolveObjectOptions);
			return;
		}

		// filter for html5
		var filteredByTranstype = filteredByState.filter(function(release) {
			return release.transtype == desiredValues.transtype;
		});

		// in case there is no html5 release, then use a pdf one
		if (filteredByTranstype.length == 0) {

			// resolve state is: "ONLY_PDF";
			
			// if there are several results for one buildable map loio, then use the filter for titles
			if (filteredByState.length > 1) {

				var filteredByTitle = filteredByState.filter(function(release) {
					return release.title == desiredValues.title;
				});

				// if there are no matching titles (or more than 1) , then display the popup
				if (filteredByTitle.length != 1) {

					resolveObjectOptions.resolveState = "DIFFERENT_TITLE";
					resolveObjectOptions.availableReleases = filteredByState;
					
					resolveConflict(resolveObjectOptions);
					return;
				} else { // there is exactly 1 release (in pdf with the same title)

					// do not display the popup but redirect to the pdf release
					sharedService.redirectToRelease(filteredByTitle[0], pageService.currentPage.u);
				}
				
			} else { // there is exactly 1 release and it's in pdf

				// do not display the popup but redirect to the pdf release
				sharedService.redirectToRelease(filteredByState[0], pageService.currentPage.u);
			}
		} // else there are 1 or more html5 releases (possibly with different titles)

		// if there are several results for one buildable map loio, then use the filter for titles
		if (filteredByTranstype.length > 1) {
			
			var filteredByTitle = filteredByTranstype.filter(function(release) {
				return release.title == desiredValues.title;
			});
			
			// if there are no matching titles (or more than 1) , then display the popup
			if (filteredByTitle.length != 1) {

				resolveObjectOptions.resolveState = "DIFFERENT_TITLE";
				resolveObjectOptions.availableReleases = filteredByTranstype;

				resolveConflict(resolveObjectOptions);
				return;
			} else { // there is exactly 1 release (in html5 with the same title)

				// do not display the popup but redirect to the html release
				sharedService.redirectToRelease(filteredByTitle[0], pageService.currentPage.u);
			}

		} else { // there is exactly 1 release and it's in html5

			// do not display the popup but redirect to the html release
			sharedService.redirectToRelease(filteredByTranstype[0], pageService.currentPage.u);
		}

		// if the modal is closed, return the previously selected value (automatic since function exited)
	}
	
	$scope.changeLanguage = function(language) {

		// disable event for currently selected language
		if (language == $scope.content.selectedRelease.l) {
			return;
		}

		var desiredValues = {
			"v" : $scope.content.selectedRelease.v,
			"state" : $scope.content.selectedRelease.state,
			"transtype" : $scope.content.selectedRelease.transtype, // "html5.uacp"
			"title" : $scope.content.selectedRelease.title
		};

		var resolveObjectOptions = {};
		resolveObjectOptions.currentRelease = $scope.content.selectedRelease;
		resolveObjectOptions.selectorChanged = ["language", language];
		resolveObjectOptions.currentTopic = pageService.currentPage.u;

		var filteredByLanguage = $scope.content.releases.filter(function(release) {
			return release.l == language;
		});

		// the filtering results in at least one result otherwise the language must not have appeared as an option

		var filteredByVersion = filteredByLanguage.filter(function(release) {
			return release.v == desiredValues.v;
		})

		if (filteredByVersion.length == 0) {
			// invalid combination
			resolveObjectOptions.resolveState = "INVALID_COMBO";
			resolveObjectOptions.availableReleases = filteredByLanguage;

			resolveConflict(resolveObjectOptions);
			return;
		}

		var filteredByState = filteredByVersion.filter(function(release) {
			return release.state == desiredValues.state;
		});

		if (filteredByState.length == 0) {
			// invalid combination
			resolveObjectOptions.resolveState = "INVALID_COMBO";
			resolveObjectOptions.availableReleases = filteredByVersion;

			resolveConflict(resolveObjectOptions);
			return;
		}

		// filter for html5
		var filteredByTranstype = filteredByState.filter(function(release) {
			return release.transtype == desiredValues.transtype;
		});

		// in case there is no html5 release, then use a pdf one
		if (filteredByTranstype.length == 0) {

			// resolve state is: "ONLY_PDF";

			// if there are several results for one buildable map loio, then use the filter for titles
			if (filteredByState.length > 1) {

				var filteredByTitle = filteredByState.filter(function(release) {
					return release.title == desiredValues.title;
				});

				// if there are no matching titles (or more than 1) , then display the popup
				if (filteredByTitle.length != 1) {
					
					resolveObjectOptions.resolveState = "DIFFERENT_TITLE";
					resolveObjectOptions.availableReleases = filteredByState;
					
					resolveConflict(resolveObjectOptions);
					return;
				} else { // there is exactly 1 release (in pdf with the same title)

					// do not display the popup but redirect to the pdf release
					sharedService.redirectToRelease(filteredByTitle[0], pageService.currentPage.u);
				}

			} else { // there is exactly 1 release and it's in pdf

				// do not display the popup but redirect to the pdf release
				sharedService.redirectToRelease(filteredByState[0], pageService.currentPage.u);
			}
			
		} // else there are 1 or more html5 releases (possibly with different titles)

		// if there are several results for one buildable map loio, then use the filter for titles
		if (filteredByTranstype.length > 1) {

			var filteredByTitle = filteredByTranstype.filter(function(release) {
				return release.title == desiredValues.title;
			});
			
			// if there are no matching titles (or more than 1) , then display the popup
			if (filteredByTitle.length != 1) {

				resolveObjectOptions.resolveState = "DIFFERENT_TITLE";
				resolveObjectOptions.availableReleases = filteredByTranstype;

				resolveConflict(resolveObjectOptions);
				return;
			} else { // there is exactly 1 release (in html5 with the same title)

				// do not display the popup but redirect to the html release
				sharedService.redirectToRelease(filteredByTitle[0], pageService.currentPage.u);
			}

		} else { // there is exactly 1 release and it's in html5

			// do not display the popup but redirect to the html release
			sharedService.redirectToRelease(filteredByTranstype[0], pageService.currentPage.u);
		}
		
		// if the modal is closed, return the previously selected value (automatic since function exited)
	}

	$scope.changeState = function(state) {

		// disable event for currently selected language
		if (state == $scope.content.selectedRelease.state) {
			return;
		}

		var desiredValues = {
			"v" : $scope.content.selectedRelease.v,
			"l" : $scope.content.selectedRelease.l,
			"transtype" : $scope.content.selectedRelease.transtype, // "html5.uacp"
			"title" : $scope.content.selectedRelease.title
		};

		var resolveObjectOptions = {};
		resolveObjectOptions.currentRelease = $scope.content.selectedRelease;
		resolveObjectOptions.selectorChanged = ["state", state];
		resolveObjectOptions.currentTopic = pageService.currentPage.u;

		var filteredByState = $scope.content.releases.filter(function(release) {
			return release.state == state;
		});

		// the filtering results in at least one result otherwise the state must not have appeared as an option

		var filteredByVersion = filteredByState.filter(function(release) {
			return release.v == desiredValues.v;
		})

		if (filteredByVersion.length == 0) {
			// invalid combination
			resolveObjectOptions.resolveState = "INVALID_COMBO";
			resolveObjectOptions.availableReleases = filteredByState;

			resolveConflict(resolveObjectOptions);
			return;
		}

		var filteredByLanguage = filteredByVersion.filter(function(release) {
			return release.l == desiredValues.l;
		});

		if (filteredByLanguage.length == 0) {
			// invalid combination
			resolveObjectOptions.resolveState = "INVALID_COMBO";
			resolveObjectOptions.availableReleases = filteredByLanguage;
			
			resolveConflict(resolveObjectOptions);
			return;
		}

		// filter for html5
		var filteredByTranstype = filteredByLanguage.filter(function(release) {
			return release.transtype == desiredValues.transtype;
		});

		// in case there is no html5 release, then use a pdf one
		if (filteredByTranstype.length == 0) {

			// resolve state is: "ONLY_PDF";

			// if there are several results for one buildable map loio, then use the filter for titles
			if (filteredByLanguage.length > 1) {

				var filteredByTitle = filteredByLanguage.filter(function(release) {
					return release.title == desiredValues.title;
				});

				// if there are no matching titles (or more than 1) , then display the popup
				if (filteredByTitle.length != 1) {
					
					resolveObjectOptions.resolveState = "DIFFERENT_TITLE";
					resolveObjectOptions.availableReleases = filteredByLanguage;
					
					resolveConflict(resolveObjectOptions);
					return;
				} else { // there is exactly 1 release (in pdf with the same title)

					// do not display the popup but redirect to the pdf release
					sharedService.redirectToRelease(filteredByTitle[0], pageService.currentPage.u);
				}

			} else { // there is exactly 1 release and it's in pdf

				// do not display the popup but redirect to the pdf release
				sharedService.redirectToRelease(filteredByLanguage[0], pageService.currentPage.u);
			}

		} // else there are 1 or more html5 releases (possibly with different titles)

		// if there are several results for one buildable map loio, then use the filter for titles
		if (filteredByTranstype.length > 1) {

			var filteredByTitle = filteredByTranstype.filter(function(release) {
				return release.title == desiredValues.title;
			});
			
			// if there are no matching titles (or more than 1) , then display the popup
			if (filteredByTitle.length != 1) {

				resolveObjectOptions.resolveState = "DIFFERENT_TITLE";
				resolveObjectOptions.availableReleases = filteredByTranstype;

				resolveConflict(resolveObjectOptions);
				return;
			} else { // there is exactly 1 release (in html5 with the same title)

				// do not display the popup but redirect to the html release
				sharedService.redirectToRelease(filteredByTitle[0], pageService.currentPage.u);
			}

		} else { // there is exactly 1 release and it's in html5

			// do not display the popup but redirect to the html release
			sharedService.redirectToRelease(filteredByTranstype[0], pageService.currentPage.u);
		}

		// if the modal is closed, return the previously selected value (automatic since function exited)
	}
	
	function resolveConflict(options) {
		$uibModal.open({
			templateUrl: '_build_938311c7a845691adeabc837/partials/releaseselector-modal.html',
			controller: 'ReleaseSelectorCtrl',
			resolve: {
				options: options
			}
		});
	}
	
	// end of logic connected to the Release selectors

	var highlightingEnabled = resultsHandler.getShowHighlighting();
	var searchTerm;

	function highlightText(searchTerms) {
		//Clear all previously highlighted terms
		$('span.highlighted').each(function() {
			var term = $(this).text();
			$(this).replaceWith(term);
		});
		
		var rootNode = document.getElementById("d4h5-main-content");
		rootNode.normalize(); //This removes empty textnodes and combines adjacent textnodes	

		//Iterate through dom elements recursively to find all text nodes and highlight search terms
		const highlightTextNodes = function(parentNode) {
			if(parentNode.childNodes) {
				
				const children = parentNode.childNodes;
				
				for(var i=0; i<children.length; i++) {
					
					if(children[i].nodeName === '#text') {
						
						var childValue = children[i].nodeValue;
						
						/*Escape HTML open tags so that any string that includes html, eg. sample code, 
						will not be processed as HTML by .parseHTML() after highlighting is completed
						Unescaping is done by .parseHTML() so that the html string is restored*/
						childValue = childValue.replace(/<+/g, '&lt');
						
						var highlightedHTMLString = $sce.valueOf($filter('highlight')(childValue, searchTerms));

						if(childValue != highlightedHTMLString) {

							var nodeArray = $.parseHTML(highlightedHTMLString);
						
							var textNodeToReplace = parentNode.childNodes[i];
						
							for (var j=0;j<nodeArray.length;j++){
								parentNode.insertBefore(nodeArray[j],textNodeToReplace);
							}
							parentNode.removeChild(textNodeToReplace);

							i+=nodeArray.length-1; //increase i by the number of child nodes added to the parent node 
						}

					} else{
						highlightTextNodes(children[i])
					}
			  	}
		   }
		}

		const findCollapsedHighlights = function() {
			var collapsibles = $(".collapsible"); 
			
			collapsibles.each(function() {

				var hasHighlightedText = $(this).find('span.highlighted').length;
				var isAlreadyExpanded = $(this).find('.expand').length;

				if(hasHighlightedText && !isAlreadyExpanded) {
					var target = $(this).find('.col-wrapper');
					target.trigger('click');
				}
			})
		}
	
		highlightTextNodes(rootNode);
		findCollapsedHighlights();
	}
	
	$scope.findDeliverableRoot = function(val) {
		var root = val.substring(0, val.lastIndexOf('/'));
		return root;
	}
	
    if(!$scope.pdfRestricted) {
    	
    	$scope.pdfTopics = [];
    	$scope.showAddButton = true;

    	$scope.updateButton = function() {		
    		if($scope.pdfTopics.length) {
    			for(var i=0; i<$scope.pdfTopics.length; i++) {
    				if($stateParams.filePath === $scope.pdfTopics[i].id) {
    					$scope.showAddButton = false;
    				}
    			}
    		} else {
    			$scope.showAdd = true;
    		}	
    	}

    	$scope.addToPdf = function() {
    		if($scope.showAddButton) {
    			var topic = {}
    			var title = document.getElementsByClassName('topictitle1');
    			topic.title = title[0].innerText; 
    			var content = document.getElementById('d4h5-main-content');
    			topic.content = content.cloneNode(true);
    			topic.id = $stateParams.filePath;
    	
    			$scope.pdfTopics.push(topic);

    			var element = document.getElementById("customPdfBox");

    			$('#customPdfBox').animate({
    				scrollTop: element.scrollHeight
    			  }, 500);
    		}
    	}
    	
    	$scope.removeTopic = function() {
    		$scope.pdfTopics.splice(this.$index, 1);
    	}
    	
    	$scope.buildPdf = function() {

    		var contentRoot = document.createElement('div');

    		for(var i=0; i<$scope.pdfTopics.length; i++) {
    			contentRoot.appendChild($scope.pdfTopics[i].content);
    		}

    		html2pdf(contentRoot, {
    			margin:       1,
    			filename:     'custom.pdf',
    			image:        { type: 'jpeg', quality: 2 },
    			html2canvas:  { dpi: 192, letterRendering: true },
    			jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    		  });
    	}

    	
    }
	

}]);

// logic connected to the Release selectors
cpPageContentController.controller('ReleaseSelectorCtrl',['$scope', '$uibModalInstance', 'userSharedService', 'options',
													function($scope, $uibModalInstance, userSharedService, options) {
	
	$scope.selectorChanged = options.selectorChanged;
	$scope.resolveState = options.resolveState;
	$scope.currentRelease = options.currentRelease;
	$scope.availableReleases = options.availableReleases;
	var topic = options.currentTopic;

	$scope.invalidCombo = [];
	if ( $scope.selectorChanged[0] != "version" ) {
		$scope.invalidCombo.push(["Version", $scope.currentRelease.n]);
	} else {
		$scope.invalidCombo.push(["Version", $scope.selectorChanged[1]]);
	}

	if ( $scope.selectorChanged[0] != "language" ) {
		$scope.invalidCombo.push(["Language", $scope.currentRelease.l]);
	} else {
		$scope.invalidCombo.push(["Language", $scope.selectorChanged[1]]);
	}

	if ( $scope.selectorChanged[0] != "state" ) {
		$scope.invalidCombo.push(["State", $scope.currentRelease.state]);
	} else {
		$scope.invalidCombo.push(["State", $scope.selectorChanged[1]]);
	}

	if( options.resolveState == "ONLY_PDF" || options.resolveState == "DIFFERENT_LOIO" ) {
		$scope.invalidCombo.push(["Format", $scope.currentRelease.transtype]);
	}
	if ( options.resolveState == "DIFFERENT_LOIO" ) {
		$scope.invalidCombo.push(["Title", $scope.currentRelease.title]);
		$scope.invalidCombo.push(["LOIO"], $scope.currentRelease.loio);
	}

	$scope.selectedRelease = $scope.availableReleases[0];

	$scope.changeRelease = function(release) {
		$scope.selectedRelease = release;
	}

	$scope.getReleaseLink = function(release) {
		return userSharedService.getRedirectLink(release, topic);
	}

	$scope.openInCurrentWindow = function() {
		userSharedService.redirectToRelease($scope.selectedRelease, topic);
	}
	$scope.cancel = function() {
		$uibModalInstance.close();
	}
}]);