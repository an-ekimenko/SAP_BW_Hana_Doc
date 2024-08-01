cpDirectives.directive("cpCommentText", function ($window) {
	return {
		restrict: 'AEC',
		scope: {
			text: '=',
			charsThreshold: '='
		},
		templateUrl: '_build_938311c7a845691adeabc837/partials/cp-comment-text.html',
	    link: function(scope, element, attrs, controller) {
	    	var length = scope.charsThreshold,
	    		text = scope.text;
	    	
	    	function update() {
		    	if (text.length < length) {
		    		scope.commentText = text;
		    	} else {
		    		scope.commentText = getTruncatedText(text);
		    		scope.flag = false;
		    	}
	    	}
	    	
	    	update();

	    	scope.$watch('text', function(value) {
	      	  text = value;
	      	  update();
	      	});
	    	
	    	scope.showLess = function () {
	    		scope.commentText = getTruncatedText(text);
	    		scope.flag = false;
	    	}

	    	scope.showMore = function () {
	    		scope.commentText = text;
	    		scope.flag = true;
	    	}

	    	function getTruncatedText(text) {
	    		return text.substring(0, length) + "...";
	    	}
	    }
	}
});