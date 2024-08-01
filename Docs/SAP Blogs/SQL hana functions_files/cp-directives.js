'use strict';
/* Directives */
var cpDirectives = angular.module('cpDirectives', []);
cpDirectives.directive("cpHeader", function() {
    return {
        restrict: 'E',
        templateUrl: "_build_938311c7a845691adeabc837/partials/cp-header.html"
    };
});
cpDirectives.directive("cpFooter", function() {
    return {
        restrict: 'E',
        templateUrl: "_build_938311c7a845691adeabc837/partials/cp-footer.html"
    };
});
cpDirectives.directive("cpComments", function() {
    return {
        restrict: 'E',
        templateUrl: "_build_938311c7a845691adeabc837/partials/cp-comments.html"
    };
});
cpDirectives.directive("cpAddComment", function() {
    return {
        restrict: 'E',
        templateUrl: "_build_938311c7a845691adeabc837/partials/cp-add-comment.html"
    };
});
cpDirectives.directive("cpAddReply", function() {
    return {
        restrict: 'E',
        templateUrl: "_build_938311c7a845691adeabc837/partials/cp-add-reply.html"
    };
});
cpDirectives.directive("cpReplies", function() {
    return {
        restrict: 'E',
        templateUrl: "_build_938311c7a845691adeabc837/partials/cp-replies.html"
    };
});
cpDirectives.directive("testIframe", function() {
    return {
        restrict: 'E',
        templateUrl: "_build_938311c7a845691adeabc837/partials/test-iframe.html",
        };	
});

cpDirectives.directive("annotator", ['$log', 'Notification', function($log, Notification) {
	return {
		restrict: 'A',
		priority: 500,
	    scope: {
	        control: '=',
	        accessor: '='
	      },
		link: function(scope, element, attrs, controller) {
			
			// set up connection between annotatorJS and commenting backend
			Annotator.Plugin.SAP = function(element) {
				return {
					pluginInit : function () {
						this.annotator.subscribe('annotationCreated', function (annotation) {
							var MAX_LENGTH = 8192;
				            // console.log("The annotation: %o has just been created!", annotation);
				            var comments = angular.element('#PageCommentCtrl').scope().pageService.data.comments;
				            var anno = annotation;
				            if (anno.text.length > MAX_LENGTH) {
				            	(new Annotator()).deleteAnnotation(annotation);
				            	Notification.error("Error: Comment is too long (>8K symbols).");
				            	return;
				            }
				            if (anno.quote.length > MAX_LENGTH) {
				            	(new Annotator()).deleteAnnotation(annotation);
				            	Notification.error("Error: Marked text is too long (>8K symbols).");
				            	return;
				            }
				            angular.element('#PageCommentCtrl').scope().addComment(comments, annotation, anno);
				            angular.element('#PageCommentCtrl').scope().$apply();  // refresh display of comments.
				            // console.log(JSON.stringify(anno));
				          }).subscribe('rangeNormalizeFail', function (annotation) {
				        	  angular.element('#PageCommentCtrl').scope().reAnchorComments(annotation);
				        	  //return;
				          })
				          .subscribe('annotationUpdated', function (annotation) {
				            // console.log("The annotation: %o has just been updated!", annotation);
				            //angular.element('#PageCommentCtrl').scope().edit(annotation);  // to be tested.
				            //angular.element('#PageCommentCtrl').scope().$apply();
				          })
				          .subscribe('annotationDeleted', function (annotation) {
				            // console.log("The annotation: %o has just been deleted!", annotation);
				            var comments = angular.element('#PageCommentCtrl').scope().pageService.data.comments;
				            angular.element('#PageCommentCtrl').scope().remove(comments, annotation);  		           
				            angular.element('#PageCommentCtrl').scope().$apply();
				          })
				          .subscribe('annotationViewerShown', function (editor, annotation) {
					            // console.log("The annotation viewer: %o has just been shown!", annotation);
					            angular.element('#PageCommentCtrl').scope().cphighlight(annotation[0], true);
					            angular.element('#PageCommentCtrl').scope().$apply();
				          })
				          .subscribe('reAnchorRangeFail', function (annotation, range, error) {
				              // range not found - possible orphan
				        	  console.log("reAnchorRangeFail - orphanize: ", annotation);
				        	  angular.element('#PageCommentCtrl').scope().orphanize(annotation);  // not called (bug)
				          })
				          .subscribe('orphanTextFail', function (annotation) {
					          // orphan text not found - possible orphan
				        	  console.log("orphanTextFail - detachize: ", annotation);
				        	  angular.element('#PageCommentCtrl').scope().detachize(annotation);  // orphanize later
					      })
					      .subscribe('updateOrphanRange', function (annotation) {
				              // reanchor orphan comment
				        	  angular.element('#PageCommentCtrl').scope().reanchor(annotation); 
				          });
					}
				}
			};
			
			scope._accessor = scope.accessor || {};
			
			if (scope._accessor) {
				scope._accessor.getData = function () {
					
				    if (!scope.ann) {
						scope.ann = $(element).annotator();  
					    scope.ann.annotator("addPlugin", "SAP");    // Saves annotations to CP and loads annotations.
					    // scope.ann.annotator("addPlugin", "Touch");  // Allows annotations on touch devices such as tablets and phones. use {force: true} for debugging.
				    }

				    
				    scope._control = scope.control || {}; 		// connects $scope.annotatorControl to this directive. 
				    
				    // function for loading annotations on demand.
				    scope._control.load = function(comments) {
				    	scope.ann.annotator("loadAnnotations", comments);  
				    }
				    
				    scope._control.remove = function(comment) {
				    	scope.ann.annotator("deleteAnnotation", comment);
				    }
				    
				    scope._control.edit = function(comment) {
				    	scope.ann.annotator("updateAnnotation", comment);  // only adds id
				    }
				    
				    scope._control.setup = function(comment) {
				    	scope.ann.annotator("setupAnnotation", comment);  
				    }
				    
				    
				    scope._control.reanchorAnn = function(comment) {
				    	scope.ann.annotator("reanchorAnnotation", comment);  
				    }
				    
					return true;
				}
			}  
			
			var translateAnnotator = function translateAnnotator() {
				if (element.find("#annotator-field-0")[0] !== undefined) {
					element.find("#annotator-field-0")[0].setAttribute("placeholder", scope.$eval("'COMMENT_INLINE_MSG' | translate"));
					element.find(".annotator-controls>[href='#cancel']")[0].innerHTML = scope.$eval("'CANCEL' | translate");
					element.find(".annotator-controls>[href='#save']")[0].innerHTML = scope.$eval("'ADD' | translate");
				}
			};
		    
			scope.$watch(function() { return element.find("#annotator-field-0").length;}, function(newValue, oldValue) {
				translateAnnotator();
			});
			
			scope.$watch(function() { return $('html').attr('lang');}, function(newValue, oldValue) {
				translateAnnotator();
			});
			
		}
	};
}]);
cpDirectives.directive("comments", ['$log', 'Notification', function($log, Notification) {
	return {
		restrict: 'A',
		priority: 500,
	    scope: {
	        control: '=',
	        accessor: '='
	      },
		link: function(scope, element, attrs, controller) {
			
			var translateComments = function translateComments() {
				if (element.find(".ngTruncateToggleText")[0] !== undefined) {
					element.find(".ngTruncateToggleText")[0].innerHTML = scope.$eval("'MORE_WITH_SPACE' | translate");
				}
			};
		    
			scope.$watch(function() { return element.find(".ngTruncateToggleText").length;}, function(newValue, oldValue) {
				translateComments();
			});
			
			scope.$watch(function() { return $('html').attr('lang');}, function(newValue, oldValue) {
				translateComments();
			});
			
		}
	};
}]);
// Used in upload deliverable modal for uploadFile multiple filelist change
cpDirectives.directive('customOnChange', function() {
	  return {
	    restrict: 'A',
	    link: function (scope, element, attrs) {
	      var onChangeFunc = scope.$eval(attrs.customOnChange);
	      element.bind('change', onChangeFunc);
	    }
	  };
});
// Used in dashboard for the single-click/double-click event.
// Also used in PageContentCtrl for changePage.
cpDirectives.directive('sglclick', ['$parse', function($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
          var fn = $parse(attr['sglclick']);
          var delay = 300, clicks = 0, timer = null;
          element.on('click', function (event) {
            clicks++;  //count clicks
            if(clicks === 1) {
              timer = setTimeout(function() {
                scope.$apply(function () {
                    fn(scope, { $event: event });
                }); 
                clicks = 0;             //after action performed, reset counter
              }, delay);
              } else {
                clearTimeout(timer);    //prevent single-click action
                clicks = 0;             //after action performed, reset counter
              }
          });
        }
    };
}]);
//Rescale side widgets on scroll

cpDirectives.directive("sidebar", ['$window', '$document', function ($window, $document) {
    return { 
    	restrict: 'A',
    	link: function(scope, element, attrs) {

         var resizeSideWidgets = function resizeSideWidgets() {

        	// VARIABLES
            var distanceFromTop = pageYOffset;
            // scope.distanceFromTop = distanceFromTop;

            var distanceFromBottom = $document.height() - pageYOffset - $window.innerHeight;
            // scope.distanceFromBottom = distanceFromBottom;

            var headerHeight = 70 + $('div#cp-hero').outerHeight(false) + $('div.survey-request').outerHeight(false);
            // scope.headerHeight = headerHeight;

            var footerHeight = $('div#cp-footer').outerHeight(false);
            // scope.footerHeight = footerHeight;

            var pageWidth = $window.innerWidth;
            // scope.pageWidth = pageWidth;
            
            var mobileMaxWidth = 1024;
            
            if (pageWidth > mobileMaxWidth) {
            
	            //VARIABLE SIDEBARS ON DESKTOP
	            if (distanceFromTop < headerHeight) {
	
	                //scope.makefixed = false;
	                element.css({
	                	'height': 'calc(100vh - ' + headerHeight + 'px + ' + distanceFromTop + 'px)',
	                	'position': 'absolute'
	                });
	
	            } else if (distanceFromTop >= headerHeight && distanceFromBottom >= footerHeight) {
	
	                //scope.makefixed = true;
	                element.css({
	                	'height': '100vh',
	                	'position': 'fixed'
	                });
	
	            } else {
	
	                //scope.makefixed = true;
	                element.css({
	                	'height': 'calc(100vh - ' + footerHeight + 'px + ' + distanceFromBottom + 'px)',
	                	'position': 'fixed'
	                });
	
	            };
            } else {
            	
            	//FIXED SIDEBARS ON MOBILE
            	element.css({
                	'height': '100vh',
                	'position': 'fixed'
                });
            	
            }

            // scope.$apply();
        };

        angular.element($window).bind("scroll", function() {
        	resizeSideWidgets();
        });

        angular.element($window).bind("resize", function() {
            resizeSideWidgets();
        });
    	
        angular.element($window).load(function() {
            resizeSideWidgets();
        });
    }}
}]);

cpDirectives.directive("pfactions", ['$window', '$document', function ($window, $document) {
    return { 
    	restrict: 'A',
    	link: function(scope, element, attrs) {

         var resizeSideWidgets = function resizeSideWidgets() {

        	// VARIABLES
            var distanceFromTop = pageYOffset;
            // scope.distanceFromTop = distanceFromTop;

            var distanceFromBottom = $document.height() - pageYOffset - $window.innerHeight;
            // scope.distanceFromBottom = distanceFromBottom;

            var headerHeight = 56 + 70 + $('div#cp-hero').outerHeight(false) + $('div.survey-request').outerHeight(false);
            // scope.headerHeight = headerHeight;

            var footerHeight = $('div#cp-footer').outerHeight(false);
            // scope.footerHeight = footerHeight;

            var pageWidth = $window.innerWidth;
            // scope.pageWidth = pageWidth;
            
            var mobileMaxWidth = 900;
            
            
	            //VARIABLE SIDEBARS ON DESKTOP
	            if (distanceFromTop < headerHeight) {
	
	                //scope.makefixed = false;
	                element.css({
	                	'top': '20px',
	                	'position': 'absolute',
	                	'box-shadow': 'none',
	                	'margin-left': '-20px',
	                	'margin-right': '-20px'
	                });
	
	            } else {
	
	                //scope.makefixed = true;
	                element.css({
	                	'top': '0',
	                	'position': 'fixed',
	                	'box-shadow': '0px 1px 3px #999',
	                	'margin-left': '0',
	                	'margin-right': '0'
	                });
	
	            };

            // scope.$apply();
        };

        angular.element($window).bind("scroll", function() {
        	resizeSideWidgets();
        });

        angular.element($window).bind("resize", function() {
            resizeSideWidgets();
        });
    	
        angular.element($window).load(function() {
            resizeSideWidgets();
        });
        
        resizeSideWidgets();
    }}
}]);

cpDirectives.directive("scrollmobile", function ($window) {
    return function(scope, element, attrs) {

        function resizeSideWidgets() {

            var distanceFromTop = pageYOffset;
            //scope.distanceFromTop = distanceFromTop;

            var distanceFromBottom = $(document).height() - pageYOffset - $(window).height();
            //scope.distanceFromBottom = distanceFromBottom;

            //if (window.innerWidth > 640) {
            //    var mobileValue = 0;
            //} else {
            //    var mobileValue = 0;
            //}

            var headerHeight = 70 + $('div#cp-hero').outerHeight(false) + $('div.survey-request').outerHeight(false);
            //scope.headerHeight = headerHeight;

            var footerHeight = $('div#cp-footer').outerHeight(false);
            //scope.footerHeight = footerHeight;

            var pageWidth = window.innerWidth;
            //scope.pageWidth = pageWidth;
            
            var mobileMaxWidth = 1024;
            
            if (pageWidth <= mobileMaxWidth) {

	            if (distanceFromTop < headerHeight) {
	
	                //scope.makefixed = false;
	            	element.css('display', 'none');
	
	            /*} else if (distanceFromTop >= headerHeight && distanceFromBottom >= footerHeight) {
	
	                scope.makefixed = true;*/
	
	            } else {
	
	                //scope.makefixed = true;
	            	element.css('display', 'block');
	
	            };
	            
            } else {
            	
            	//hide on desktop view
            	element.css('display', 'none');
            	
            }

            // scope.$apply();
        };


        angular.element($window).bind("scroll", function() {
            resizeSideWidgets();
        });

        angular.element($window).bind("resize", function() {
            resizeSideWidgets();
        });

        angular.element($window).load(function() {
            resizeSideWidgets();
        });

    };
});

cpDirectives.directive("cpmenu", function ($window) {
    return function(scope, element, attrs) {

        function toggleMenu() {
            if (element.attr('aria-expanded') == 'false') {
                element.attr('aria-expanded', 'true');
                element.children('div.targetmenu').attr('aria-hidden', 'false');
            } else {
                element.attr('aria-expanded', 'false');
                element.children('div.targetmenu').attr('aria-hidden', 'true'); 
            }
        };

        function closeMenu() {
            element.attr('aria-expanded', 'false');
            element.children('div.targetmenu').attr('aria-hidden', 'true'); 
        };

        element.find('button.menu-trigger').on('click', function(e) {
        	if (element.attr('aria-haspopup') == 'true') {
        		toggleMenu();
        	}
        });
        
        element.find('input.run-search').on('click', function(e) {
        	closeMenu();
        });
        
        //this condition needs to be in a $watch, so that it updates after the DOM is changed by ng-if statements
        //some a.tile elements need to be inside ng-if statements for security reasons (dashboards, etc..)
        scope.$watch(function() { return element.find('a.tile').length;}, function(newValue, oldValue) {
        	element.find('a.tile').on('click', function(e) {
               	closeMenu();
            });
		});

        $window.addEventListener('click', function(e) {
            if (element.attr('aria-expanded') == 'true') {
                if (!element[0].contains(e.target)) {
                    closeMenu();
                }
            }
        });
        
        // for touch devices
        $window.addEventListener('touchend', function(e) {
            if (element.attr('aria-expanded') == 'true') {
                if (!element[0].contains(e.target)) {
                    closeMenu();
                }
            }
        });

    };
});

cpDirectives.directive("cctitle", function ($window) {
    return function(scope, element, attrs) {
    	
    	function findLongestWord(str) {

		  var length;
		  var stringArray = [];
		  var string = str;
		  stringArray = string.split(' ');
		  var maxLength = 0;
		  
		  for (var j = 0; j < stringArray.length; j++) {
			  if (stringArray[j].length > maxLength) {
				  maxLength = stringArray[j].length;
			  }
		  }
		  
		  return maxLength;
		}
    	
    	scope.$watch(function() { return element.children('span')[0].textContent;}, function(newValue, oldValue) {
    		var string = element.children('span')[0].textContent;
        	
    		var count = findLongestWord(string);
    		
    		if (count > 20) {
    			element.css('font-size', '1.357em');
    		} else {
    			element.css('font-size', '1.5em');
    		}
    		
    		var truncateTitle = function() {
    			if (element.children('span')[0].offsetWidth > element[0].offsetWidth) {
        			element.addClass('truncated');
        		} else {
        			element.removeClass('truncated');
        		}
    		}
    		
    		truncateTitle();

            angular.element($window).bind("resize", function() {
            	truncateTitle();
            });
     
        	//element.append(count);
    	});

    };
});

cpDirectives.directive("bclength", function ($window) {
    return function(scope, element, attrs) {
    	
    	function findLongestCrumb() {
    		var crumbs = element.children();
        	var longestChild = [];
            var longestChildLength = 50;
            for (var j = 0; j < crumbs.length; j++) {
  			  
  			  if (crumbs[j].offsetWidth > longestChildLength) {
				  longestChildLength = crumbs[j].offsetWidth;
				  longestChild = [];
				  longestChild.push(j);
			  } else if (crumbs[j].offsetWidth == longestChildLength) {
				longestChild.push(j);
			  }
            }

            return longestChild;
        };
        
        function truncateLongestCrumb(lc) {
			for (var j = 0; j < lc.length; j++) {
    			element.children().eq(lc[j]).addClass('truncate');
    			var maxVal = element.children().eq(lc[j]).children('a').children('span').width();
    			maxVal = maxVal - 50;
    			element.children().eq(lc[j]).children('a').children('span').css(
    					'max-width', maxVal
    			);
    		}
		}
        
        function findAndTruncate() {
        	var longestCrumb = findLongestCrumb();
        	if (!longestCrumb) { return; }
    		truncateLongestCrumb(longestCrumb);
    		var count = 0;
    		if (count < 50 && element[0].scrollHeight > 20) {
    			//console.log("recur");
    			count++
    			findAndTruncate();
    		}
        }

        scope.$watch(function() { return element[0].innerText; }, function(newValue, oldValue) {
        	
        	//console.log('change in breadcrumb text');
        	
        	element.children().removeClass('truncate');
        	element.children().children('a').children('span').css(
					'max-width', 'none'
			);
        	
        	if (element[0].scrollHeight > 20) {
        		findAndTruncate();
        	}
        });

        scope.$watch(function() { return document.getElementById('topic').offsetWidth; }, function(newValue, oldValue) {
        	
        	//console.log('change in width');
        	
        	element.children().removeClass('truncate');
        	element.children().children('a').children('span').css(
					'max-width', 'none'
			);
        	
        	if (element[0].scrollHeight > 20) {
        		findAndTruncate();
        	}
        });
        
    };
});

cpDirectives.directive('uuid', ['rfc4122', function (rfc4122) {
  return function (scope, elm) {
    elm.text(rfc4122.v4());
  };
}]);

cpDirectives.directive('focusMe', function($timeout) {
	  return {
		    scope: { trigger: '=focusMe' },
		    link: function(scope, element) {
		      scope.$watch('trigger', function(value) {
		        if(value === true) { 
		          element[0].focus();
		          if($(element[0]).is(":focus")) {
		        	  scope.trigger = false;
		          } else {
		        	  var checkFocus = setInterval(function() {
			        	  element[0].focus();
			        	   if ($(element[0]).is(":focus")) {
			        	      clearInterval(checkFocus);
			        	      scope.trigger = false;
			        	   }
		        	  }, 100);
		          }
		        }
		      });
		    }
		  };
		});
