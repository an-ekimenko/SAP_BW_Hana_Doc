'use strict';
/* Controllers */
var cpPageCommentController = angular.module('cpPageCommentCtrl', []);

cpPageCommentController.controller('PageCommentCtrl', ['$scope', 'page', '$sce', '$stateParams', '$log', 'usersManagement',
                                                        '$interval', 'PATHS', 'Notification',
                                                       'userSharedService', '$location', 
                                                       '$translate', 'pageService', '$uibModal', '$cookies', '$document', 'pulse',
                                                       function($scope, page, $sce, $stateParams, $log, usersManagement, 
                                                    		   $interval, PATHS, Notification, 
                                                    		   sharedService, $location,
                                                    		   $translate, pageService, $uibModal, $cookies, $document, pulse) {
	

	// pageService stores deliverable information to be shared between controllers and topics within a deliverable
	$scope.pageService = pageService;	
	$scope.pageContent = $scope.pageContent || pageService;
	
	if (pageService.data) {
		$scope.pageService.data.comments = pageService.data.comments;
		
	}
	
	//font size
	$scope.currentFontSize = $scope.currentFontSize || {
			value: "small"
	};
		
	// Assign url parameters
	$scope.location = $location;
	$scope.date = new Date();
	
	$scope.content = $scope.content || {};
	$scope.setup = $scope.setup || {};
	
	// initialize User object
	$scope.user = $scope.user || {};
	$scope.user.review = $scope.user.review || 0;
	var isUserAdmin = $cookies.get("sapuacpuserisadmin");
	
	$scope.newComment = {  // used as model for replies
			text: '',
			author: $scope.user.name,
			created_on: Number(Date.now())
	};
	
	$scope.pane = $scope.pane || {
			showCommentsPane: $scope.showComments,
			showSearch: false,
			underline: function() {
				var that = this;
				$(this).css("border-color", "black");
			},
	};
	
	// Initialize arrays for display
	$scope.content = $scope.content || {
			html: null,
	};
	
	$scope.viewInDashboard = !sharedService.isRestricted('ViewInDashboard');
	
	$scope.pageContent = $scope.pageContent || {
			data: {
				comments: []
			},
			comments: [],
	};

	$scope.commentpane = $scope.commentpane || {
			open: true,
			resolved: true,
			inline: true,
			general: true,
			orphan: true,
			show: false,
			filterByStatus: false,
			filterByType: false,
	};

	$scope.filteredcomments = $scope.filteredcomments || [];
	
	$scope.annotations = $scope.annotations || [];
	$scope.annotatorControl = $scope.annotatorControl  || {};  // connects to annotatorjs and anchoredcomment directive
	$scope.annotationsOn = $scope.annotationsOn || false;
	
	// add edit status to comments
	$scope.addEditShow = function(tree) {
		var _comments = tree;
		
		for (var i = 0; i < _comments.length; ++i){

			if (_comments[i].author_id == '_anonymous') {  // remove display of anonymous comments
				tree.splice(i, 1);
				continue;
			}
			
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
	
	$scope.cphighlight = function(comment, isHover){
		var id, top, pagetop, pagecommenttop, commenttop, inlinetop, element;

		if (comment.id) {
			id = comment.id
		} else {
			if (comment[0] && comment[0].id){
				id = comment[0].id;
			}
		}

		$("span.annotator-hl, div.cpmarker").removeClass("activecomment detached-active");	
		$("span.annotator-hl[data-annotation-id='" + id + "'], div.cpmarker[id='" + id + "']").addClass("activecomment");

		if (!sharedService.isRestricted("CommentAutoScroll")) {
			if (!isHover && comment.label == "INLINE") {
				element = angular.element($("span.annotator-hl[data-annotation-id='" + id + "']"));
				$("span.annotator-hl[data-annotation-id]").removeClass("pulse");
				pulse.addPulse(element);
				$document.scrollToElement(element, 0, 800);
			}
		}
		
		// Detached comment code
		
		if ((comment.orphan) && (comment.label == "INLINE")) {  // Detached comment
			$("span.annotator-hl[data-annotation-id='" + id + "'], div.cpmarker[id='" + id + "']").addClass("detached-active");
		}
		
	}
	
	// Change page routine
	
// orphan comments
	
	var addOrphan = function (element) {
		element.orphan = false;
	}
	
	$scope.orphanize = function(annotation) {  // not used
		// mark comment as orphan.
		var _id = annotation.id;
		var comments = $scope.pageService.data.comments;

		for (var i = 0; i < comments.length; i++ ){
				if (comments[i].id == _id) {
					comments[i].orphan = true;
					comments[i].label = "ORPHAN";
					break;
				}
			}
		
		$("span[data-annotation-id='" + _id + "']").removeClass("annotator-hl"); 
	}
	
	$scope.detachize = function(annotation) {
				
		// mark comment as orphan.
				var _id = annotation.id;
				var comments = $scope.pageService.data.comments;

				for (var i = 0; i < comments.length; i++ ){
						if (comments[i].id == _id) {
							
							comments[i].orphan = true;  // means both orphan and detached
							
							if (annotation.orphanize) {
								comments[i].label = "ORPHAN";  
								comments[i].orphanize = true;  // True Orphan
							} else {
								comments[i].label = "INLINE";  // Detached - orphan text with inline label
								comments[i].detached = true;
							}
							
							
							break;
						}
				}

		return;
	}
	
	$scope.reanchor = function(annotation) {
		
		// mark comment as orphan.
				var _id = annotation.id;
				var comments = $scope.pageService.data.comments || [];
				var range = annotation.ranges[0] || null;

				for (var i = 0; i < comments.length; i++ ){
					if (comments[i].id == _id && range) {
						// update comment range
						page.reanchor({
							id: _id,
		         			start_node_path: range.start,
		         			end_node_path: range.end,
		         			start_index: range.startOffset,
		         			end_index: range.endOffset,
						},
						// success
						function(data){
							
						},
						// error
						function(error){
							
						});
					
					break;
					}
				}
			
		return;
	}
	
	$scope.reAnchorComments = function(annotation) {
		$scope.annotatorControl.reanchorAnn(annotation);
	}
	
	// add Label General, Inline, Orphan
	
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
		
		return;
	}
	
	var hideReplies = function(element) {
		element.show = false;
	}

	// loads anchored comments
	$scope.loadAnchoredComments = function() {
		$scope.pageContent.anchoredcomments = $scope.sortanchored($scope.pageService.data.comments);
		$scope.annotatorControl.load($scope.pageContent.anchoredcomments);
	}
	
	// convert comment to annotation
	$scope.convertToAnnotation = function convertToAnnotation(comment) {
		var annotation = {}; 
		annotation.id = comment.id.toString();
		annotation.annotator_schema_version = "v1.0",
		annotation.created = comment.created_on;
		annotation.updated = comment.created_on;
		annotation.text = comment.text;
		annotation.quote = comment.marked_content;
		annotation.uri = $location.path();
		annotation.ranges = [];
		var range = { 
				"start": comment.start_node_path,
				"end": comment.end_node_path,
				"startOffset": comment.start_index,
				"endOffset": comment.end_index
		};	
		annotation.ranges.push(range);
		annotation.user = $scope.user.name;
		annotation.process_state = comment.process_state;
		annotation.state = comment.state;
		annotation.prev = comment.prev;  // saves entire text
		annotation.aft = comment.aft;
		return annotation;
	};
	
	$scope.focusComment = function() {
		if ($scope.comment_id) {
			var c = {
					id: $scope.comment_id
			}
			$scope.cphighlight(c);
			// TODO figure this out
			//$route.updateParams({ 'comment_id': null});
		}
	}
	
	// convert annotation to comment
	$scope.convertToComment = function (annotation) {
		var comment = {
				id: annotation.id,
				text: annotation.text,
				author: annotation.user,
				created_on: annotation.created,
				marked_content: annotation.quote,
				process_state: annotation.process_state,
				state: annotation.state,
				show: false,
				editing: false,
				aft: annotation.aft,
				prev: annotation.prev,
		};
		return comment;
	}


	$scope.refreshComments = function() {
		if (!$scope.annotatorControl || !$scope.annotatorControl.load) return;
		if ($scope.user.review != 1) return;
		if (!$scope.annotationsOn) return;
		
		$scope.pageContent.anchoredcomments = $scope.sortanchored($scope.pageService.data.comments);
			$scope.annotatorControl.load($scope.pageContent.anchoredcomments);
			$scope.commentpane.updateCount();
			
			if (!($("div.cpmarker.activecomment").length)){
				$scope.focusComment();
			}
		}
	
    // filter comments orderBy general, orphan, inline
    
    $scope.sortComments = function(item) {
    	if (item.marked_content === '' && !item.orphan) return 0; 	// 0 - General comments
    	if (item.orphan && item.label == 'ORPHAN') return 1;		// 1 - true orphan
    	return 2;  													// 2 - inline & detached comments

    };
	
    /* Run Annotations - this bit of code is to prevent inline comments from being available until after user has logged in, has review rights, and has clicked on the comment panel. */
    
    $scope.vm = $scope.vm || {}
    $scope.vm.accessor = $scope.vm.accessor || {};
    
    $scope.vm.startAnnotator = function() {
    	$scope.annotationsOn = true;
    	if ($scope.vm.accessor.getData){
    		var data = $scope.vm.accessor.getData();
    		// $log.info(data);
    	}
    	$scope.refreshComments();
    };
	
	// if the url has '?show_comments=true', then display comment pane on initial loading
    
    $scope.show_comments = $stateParams.show_comments || null;
	$scope.comment_id = $stateParams.comment_id || null;
    
	if ($scope.user.review == 1  && $scope.show_comments == 'true'){
		$scope.$parent.showComments = true;
		$scope.showComments = true;
		$scope.vm.startAnnotator();
		$scope.hideToc();
		$scope.show_comments = null;
		// TODO figure this out
		//$route.updateParams({ 'show_comments': null});
	}
    
	$scope.$watch('user.review', function(newValue, oldValue) {
		if(newValue === 1){
			// review is true (1)
			$scope.pane.showComments = true;
			$scope.vm.startAnnotator();
		} else {
			// review is false
			$scope.pane.showComments = false;
		}
	}, true);
	
	
	$scope.setup = $scope.setup || {};
	
	$scope.setup.query = function() {
		var params;
		
		if ($stateParams) {
			params = $stateParams;
		}
		
		$scope.content.deliverableLoio = params.deliverableLoio;
		$scope.content.version = params.version;
		$scope.content.languageCode = params.languageCode;
		$scope.content.state = $scope.state;
		$scope.content.alias = params.alias;
		$scope.content.filePath = params.filePath || null;
	}
	
	$scope.setup.errorCheck = function(data) {
		if (!data) return;
		
		if (data.status === 'Error') {
			sharedService.errorHandler(data);
			Notification.error("Server error - cannot retrieve deliverable");
			$log.error(data);
		}
	}

	
	var data;
	
	data = pageService;
	
	$scope.setup.query();

	/* COMMENTING */

	var highlighter = $interval(function () {
		$scope.focusComment();
	}, 500, 3);

	$scope.status = $scope.status || {
			isopen: false
	};

	$scope.toggled = function(open) {
		// $log.log('Dropdown is now: ', open);
	};

	$scope.toggleDropdown = function($event) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope.status.isopen = !$scope.status.isopen;
	};
	
	// show all replies
	$scope.show = $scope.show || false;
	
	// param flag = boolean true/false; 
	//   true  - to expand all replies
	//   false - collapse all replies
	$scope.expandAll = function(flag) {
		var _comments = $scope.pageService.data.comments;
		for (var i = 0; i < _comments.length; ++i){
			_comments[i].show = flag;
		}
	}
	
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
					orphancount++;
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
	
	// return true if user is the comment's author or admin
	// thus allowing edits or deletions.
	// Admin check and deletion to be developed in future. 
	$scope.authorize = function(comment) {
		var _comment = comment;
		var _id = $scope.user.id;
		
		if ((_comment.author_id === _id) || isUserAdmin) {  
			return true;
		} else {
			return false;
		}
	}
	
	// ng-model = initial for opening empty comment
	$scope.initial = {
			text: '',
	};

	// Add comment function.  This works for both anchored and unanchored comments.
	$scope.addComment = function(commentsArray, newComment, annotation) {
		var that = this,   // needed in javascript to access outside scope variables.
			newCommentText = newComment.text,
			_anno = null,
			_current = null,
			label, 
			_comment, 
			_quote,
			prev = null, 
			aft = null,
			sanitized_text;

		if ((!newCommentText) || newCommentText === '') {
			Notification.info("Error: No text was entered.");
			return;
		}
		
		if (!$scope.user.id) {
			Notification.error("Error: User is not logged in.");
			return;
		}

		$scope.commentsLoading = true;
		
		if (!annotation) {
			_anno = {
					quote: "",
					ranges: [{
						start: "",           
						end: "",             
						startOffset: 0,                      
						endOffset: 0                     
					}]  			
			};
			label = "GENERAL";
		} else {
			_anno = annotation;
			label = "INLINE";
			prev = _anno.prev;
			aft =  _anno.aft;
		}

		if (!commentsArray) {
			commentsArray = [];
		}	

		_quote = _anno.quote.replace('&nbsp;', ' ');  // to fix Product names
		_anno.quote = _quote;
		
		// $log.info(_quote);
		
		sanitized_text = encodeURIComponent(newCommentText).replace(new RegExp('%20', 'g'), ' ');
		
		_comment = page.add(
				{
					deliverableId: $scope.content.deliverableId || $scope.pageService.deliverable.id,
					file_loio: $scope.content.fileLoio,
					text: sanitized_text,
					marked_content: _quote,
					start_node_path: _anno.ranges[0].start,
					end_node_path: _anno.ranges[0].end,
					start_index: _anno.ranges[0].startOffset,
					end_index: _anno.ranges[0].endOffset,
					process_state: 'OPEN',
					prev: prev,
					aft: aft,
				}
				, function(data) {
					// success handler
					$scope.commentsLoading = false;

					if (data.data.author_id == '_anonymous') {
						sharedService.errorHandler(data);
						$log.error("Server error - User logged out");
						$log.error(data);
						return;
					}
					commentsArray.push({
						id: _comment.data.id,
						text: decodeComment(_comment.data.text),
						author: _comment.data.author,
						author_id: _comment.data.author_id,
						created_on: _comment.data.created_on,
						marked_content: _quote,
						process_state: 'OPEN',
						state: 'VISIBLE',
						show: true,
						editing: false,
						child_comments: [],
						hidden: { 'background-color': '#FFF'},
						orphan: false,
						label: label,
						start_node_path: _comment.data.start_node_path,
						end_node_path: _comment.data.end_node_path,
						start_index: _comment.data.start_index,
						end_index: _comment.data.end_index,
						isUserAuthorized: _comment.data.isUserAuthorized
					});

					_anno.id = _comment.data.id;
					_anno.process_state = 'OPEN';
					_anno.user = _comment.data.author;
					
					if (annotation){
						$scope.annotations.push(_anno);
						$(annotation.highlights).attr('data-annotation-id', _anno.id);
					}
				}	
				, function(error) {
					//error handler
					$scope.commentsLoading = false;
					sharedService.errorHandler(error);
					$log.error("Server error - Add comment failed");
					$log.error(error);
				}
		);   

		this.initial.text = '';
		
	};

	$scope.startEditing = function(commentOrReply) {	
		if (commentOrReply === undefined) {
			throw new Error('Function argument is undefined!');
		}
		
		if (commentOrReply === null || typeof(commentOrReply) !== 'object') {
			throw new TypeError('Function argument should be an object!');
		}
		
		commentOrReply.editing = true; 
		commentOrReply.old = commentOrReply.text;
	};
	
	$scope.cancelEditing = function(commentOrReply) {	
		if (commentOrReply === undefined) {
			throw new Error('Function argument is undefined!');
		}
		
		if (commentOrReply === null || typeof(commentOrReply) !== 'object') {
			throw new TypeError('Function argument should be an object!');
		}
		
		commentOrReply.editing = false; 
		commentOrReply.text = commentOrReply.old;
	};
	
	// edit comment
	$scope.edit = function(comment) {
		var _comment, locator, highlight, _anno;
		var _anno_array = [];
		var comments = $scope.pageService.data.comments;
		
		var updateComment = function ( id, text ) {
			for (var i = 0; i < comments.length; i++ ){
				if (comments[i].id == id) {
					comments[i].text = text;
					break; //Stop this loop, we found it!
				}
			}
		}
		
		if (!comment) {
			return;
		}

		$scope.commentsLoading = true;

		// anchored comment - convert to regular comment
		// comment can be an annotation (typeof quote != 'undefined') or comment associated with annotation (marked_content != "")
		if (typeof comment.quote != 'undefined') {
			_comment = $scope.convertToComment(comment);
		
		} else {
			_comment = comment;
		}
		
		updateComment(_comment.id, _comment.text);
		
		page.edit({
			id: 	_comment.id,
			text: 	encodeURIComponent(_comment.text)
				.replace(new RegExp('%20', 'g'), ' '),
			process_state: _comment.process_state,
			state: _comment.state,
		}, function(data) {
			// success handler
			$scope.commentsLoading = false;
		}, function(error) {
			//error handler
			$scope.commentsLoading = false;
			sharedService.errorHandler(error);
			$log.error("Server error - Edit comment failed");
			$log.error(error);
		});
		
		// check if it is annotation, then
		
		if (typeof comment.marked_content != 'undefined' 
			&& comment.marked_content != "") {

			//  remove annotation
		    $scope.unwrapAnnotation(comment.id);
			//locator = "span[data-annotation-id='" + comment.id + "']"
			//highlight = $(locator);
			//highlight.contents().unwrap();
			
			//  convert to new annotation
			_anno = $scope.convertToAnnotation(_comment);
			// provide update(edited info to Annotator
			$scope.annotatorControl.setup(_anno);
		}

	};

	var updateAnnotation = function(comment) {  // check if used.
		var _annotation = $scope.convertToAnnotation(comment);
		$scope.annotatorControl.edit(_annotation);
	}
	
	$scope.editReply = function(array, comment) {
		if (!comment) {
			return;
		}

		$scope.commentsLoading = true;

		page.edit({
			parentComment: array.id,
			id: comment.id,
			text: encodeURIComponent(comment.text)
				.replace(new RegExp('%20', 'g'), ' '),
			process_state: 'OPEN',
			
		}, function(data) {
			// success handler
			$scope.commentsLoading = false;
		}, function(error) {
			//error handler
			$scope.commentsLoading = false;
			sharedService.errorHandler(error);
			$log.error("Server error - Edit Reply");
			$log.error(error);
		});
	};

	// removes underline highlight of inline comment
	// param:  id is comment.id
	$scope.unwrapAnnotation = function(id) {
		var locator = "span[data-annotation-id='" + id + "']"
		var highlight = $(locator);
		highlight.contents().unwrap();
	}
	
	$scope.clearComment = function() {	
		$scope.initial.text = '';
	};
	
	$scope.remove = function(array, comment) {
		
		var _comment, highlight, locator;
		if (!array || !comment || !comment.text || !comment.id) return;
		
		// distinguish between anchored and unanchored comment
		if (comment.marked_content === "") {
			// comment is general comment
			_comment = comment;
		} else {
			// anchored comment - convert to regular comment
			_comment = $scope.convertToComment(comment);
			$scope.unwrapAnnotation(comment.id);  // remove underline of inline comment
		}

		// check if array has the comment.  Delete if comment is present in array.
		// this avoids errors if the comment does not exist in array.
		if(_hasId(array, _comment.id) > -1){
			_deleteCommentInArray(_comment.id);
			_deleteCommentInDatabase(_comment.id);
		}
		
	};
	
	var _deleteCommentInArray = function(id) {
		var index = _hasId($scope.pageService.data.comments, id);
		if (index > -1) {
			$scope.pageService.data.comments.splice(index, 1);
		}
	};
	
	var _deleteCommentInDatabase = function(id) {
		$scope.commentsLoading = true;

		page.deleteComment({
			id: id
		}, function(data) {
			// success handler
			$scope.commentsLoading = false;
		}, function(error) {
			//error handler
			$scope.commentsLoading = false;
			sharedService.errorHandler(error);
			$log.error("Server error - delete comment failed");
			$log.error(error);
		});
	}
	
	// Searches array for presence of comment id.  Returns index of found or -1 if not found.  
	// works for comments and annotations.
	var _hasId = function(annotations, id) {
		if(!annotations) return -1;
		if(!id) return -1;
		
		for (var i=0; i < annotations.length;i++)  {
			
			if (annotations[i].id && id == annotations[i].id) {
				return i;
			}
		}
		return -1;
	}

	$scope.removeReply = function(array, comment) {
		var index = array.indexOf(comment);
		if (index != -1) array.splice(index, 1);

		$scope.commentsLoading = true;

		page.deleteComment({
			id: comment.id
		}, function(data) {
			// success handler
			$scope.commentsLoading = false;
		}, function(error) {
			//error handler
			$scope.commentsLoading = false;
			sharedService.errorHandler(error);
			$log.error("Server error - delete reply failed");
			$log.error(error);
		});
	};
	
	// Add reply - initial reply to a comment
	$scope.addReply = function(comment, array) { // check if necessary
		
		var parentId, reply, sanitized_text;
		
		if (!array) {
			array = [];
		}
		if (!comment.child_comments) {
			comment.child_comments = [];
		}
		
		sanitized_text = encodeURIComponent(this.newComment.text)
			.replace(new RegExp('%20', 'g'), ' ');

		$scope.commentsLoading = true;

		reply = page.reply({
			parentComment: comment.id,
			text: sanitized_text,
			process_state: 'OPEN',
		}, function(data) {
			// success handler
			$scope.commentsLoading = false;

			if (typeof array.parentId === 'undefined' || array.parentId === null) {
				parentId = null;
			} else {
				parentId = array.parentId;
			}

			comment.child_comments.push({
				id: reply.data.id,
				text: decodeComment(reply.data.text),
				author: reply.data.author,
				created_on: reply.data.created_on,
				parentId: parentId,
				process_state: 'OPEN',
				show: true,
				editing: false,
				showReply: false,
			});
		}, function(error) {
			// error handler
			$scope.commentsLoading = false;
			sharedService.errorHandler(error);
			$log.error("Server error - add reply failed");
			$log.error(error);
		});

		this.newComment.text = '';
		comment.showReply = false;
	};
	
	// Reply to a reply  ** obsolete.  check and remove.
	$scope.replyToReply = function(comment, array, parentId) { 
		var reply, sanitized_text;
		
		if (!array) {
			array = [];
		}

		$scope.commentsLoading = true;

		sanitized_text = encodeURIComponent(this.newComment.text)
			.replace(new RegExp('%20', 'g'), ' ');
		
		reply = page.reply({
			parentComment: parentId,
			text: sanitized_text,
			process_state: 'OPEN',

		}, function(data) {
			// success handler
			$scope.commentsLoading = false;

			array.push({
				id: reply.data.id,
				text: decodeComment(reply.data.text),
				author: reply.data.author,
				created_on: reply.data.created_on,
				parentId: parentId,
				process_state: 'OPEN',		
				show: true,
				editing: false,
				showReply: false,
			});
		}, function(error){
			// error handler
			$scope.commentsLoading = false;
			sharedService.errorHandler(error);
			$log.error("Server error - reply to reply failed");
			$log.error(error);
		});

		this.newComment.text = '';
		comment.showReply = false;
	};

	$scope.cancelReply = function(comment) {
		this.newComment.text = '';
		comment.showReply = false;
	};
	
	
	// open or resolve comment status
	$scope.resolve = function(comment) {
		var _comment = comment;
		
		// Switch process state between OPEN and RESOLVED
		if (comment.process_state === 'OPEN') {
			comment.process_state = 'RESOLVED';
		} else {
			comment.process_state = 'OPEN';
		}

		$scope.commentsLoading = true;

		// Save to back end
		page.edit({
			id: 	_comment.id,
			process_state: _comment.process_state,
		}, function(data) {
			// success handler
			$scope.commentsLoading = false;
			$log.info("Success - comment state: " + comment.process_state);
		}, function(error) {
			//error handler
			$scope.commentsLoading = false;
			sharedService.errorHandler(error);
			$log.error("Server error - resolve comment failed");
			$log.error(error);
		});	
	};
	
	// HIDE or SHOW comments
	$scope.hide = function (comment) {
		var _comment = comment;
		var _anno;
		
		// Switch process state between VISIBLE and HIDDEN
		if (comment.state === 'VISIBLE') {
			
			comment.state = 'HIDDEN';

		} else {
			comment.state = 'VISIBLE';
			
		}

		$scope.commentsLoading = true;

		// Save to back end
		page.edit({
			id: 	_comment.id,
			text:  	encodeURIComponent(_comment.text)
				.replace(new RegExp('%20', 'g'), ' '),
			state: _comment.state,
			process_state: _comment.process_state,
			
		}, function(data) {
			// success handler
			$scope.commentsLoading = false;
			$scope.unwrapAnnotation(comment.id);
			//  convert to new annotation
			_anno = $scope.convertToAnnotation(_comment);
			$scope.annotatorControl.setup(_anno);
			//$scope.refreshComments();   // Load anchored comments
			
		}, function(error) {
			//error handler
			$scope.commentsLoading = false;
			sharedService.errorHandler(error);
			$log.error("Server error - hide/show comment failed");
			$log.error(error);
		});
	};
	
    // delete comment/reply from confirmation modal
    
	$scope.$on('handleDeleteComment', function(event, args) {
		var array = args.array;
		var comment = args.comment;
		var reply = args.reply;

		if (reply) {
			$scope.removeReply(comment.child_comments, reply);
		} else {
			$scope.remove(pageService.data.comments, pageService.comment);
		}
		
	});

	function decodeComment(comment) {
		if (comment) {
			comment = decodeURIComponent(comment);
		}

		return comment;
	}
    
}
]);
// filters comments by status, type, hidden/show
cpPageCommentController.filter('filterComments', function() {
	return function (items, open, resolved, inline, general, orphan, show) {
		// define array to return
		var filtered = [];
		
		// define function for filter logic OPEN vs RESOLVED, inline vs general
		var filter = function(item) {
			var that = this;
			if 	((open && item.process_state === 'OPEN') &&
					((inline && item.marked_content != '' && !item.orphan) || (general && item.marked_content === '') || (orphan && item.orphan)))
			{ 		
				filtered.push(item);

			} else
				if 	((resolved && item.process_state === 'RESOLVED') &&
						((inline && item.marked_content != '' && !item.orphan) || (general && item.marked_content === '') || (orphan && item.orphan)))
				{ 
					filtered.push(item);

				}
		};
		
		// error checking to ensure comment input is not undefined and array has data.
		if (typeof items != 'undefined' && items.length > 0) {
			// iterate through array
			for (var i = 0; i < items.length; i++) {
				var item = items[i];

				if 	(show) {
					// if show_hidden_comments is true
					// show all comments whether hidden or visible
					filter(item);

				} else {
					// if show_hidden_comments is false
					// then only show visible comments as per other requirements.
					if (item.state === 'VISIBLE') {
						filter(item);
					}
					// else don't show the item because it was marked hidden.
				}	
			}
		}
		return filtered;

	};
});

//filter and return inline comments ordered
cpPageCommentController.filter('inlineOrder', function() {
	return function (items) {

		var inlineComments = [];
		var item;
		var filtered = [];
		var result;
		var elements = document.getElementsByClassName('annotator-hl');
		
		// separate out array of inline comments
		if (typeof items != 'undefined' && items.length > 0) {  // check that array of items exists
			
			for (var i = 0; i < items.length; i++) {
				
				item = items[i];
				
				if ((item.marked_content != '' && !item.orphan) || item.detached) {  // inline comment OR detached comment
					inlineComments.push(item);
				
				} else {
				
					filtered.push(item);
				}
			}
		} else {
			// empty or undefined array
			return items;
		}
		
		// Order inline comments based on appearance in document
		if (inlineComments.length > 0) {
			var length = elements.length;
			var attr, val;
			
			for (var i = 0; i < length; i++) {
				
				attr = elements.item(i).attributes.getNamedItem('data-annotation-id');
				
				if (attr){
					val = attr.value;
					inlineComments.forEach(function(element) {
						if (element.id == val){
							element.inlineIndex = i;  // assign index of appearance of comment
						}
					});
				}
				
				attr = null;
				
			}
		}
		
		result = filtered.concat(inlineComments); // combine comments
		return result;

	};
});
