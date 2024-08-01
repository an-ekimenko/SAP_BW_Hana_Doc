var filters = angular.module('filters', []);

// This filter adds highlights as HTML
filters.filter('highlight', function ($sce) {
  return function (text, filterTerms) {
    
    if (filterTerms) {
    	
    	filterTerms = filterTerms.trim();
    	
        var splitTerms = [];
        var lastIndex = filterTerms.length - 1;

        //If filterTerms is exact string eg. ""hana one""
        if((filterTerms[0] === "'" && filterTerms[lastIndex] === "'") || (filterTerms[0] === '"' && filterTerms[lastIndex] === '"')) {
            text = text.replace(/\s+/g, ' '); //replaces excessive whitespaces, new line or tab breaks with one space 
        	splitTerms[0] = filterTerms.substring(1, lastIndex);
        } else {
            //split filter terms on space
            splitTerms = filterTerms.toLowerCase().split(/\s+/);

            //sort filter terms by length
            splitTerms.sort(function(a, b){
                return b.length - a.length;
            });
        }

        // Regex to simultaneously replace terms
        var regex = new RegExp('(' + splitTerms.join('|') + ')', 'gi');

        // Return text with highlights in HTML
        return $sce.trustAsHtml(text.replace(regex, '<span class="highlighted">$&</span>'));

    }

    // Return un-highlighted text if there are no filter terms
    return $sce.trustAsHtml(text);
  };
});

filters.filter('nonContiguous', function () {
  return function (items, filterTerms) {

    var filtered = [];

    //split filter terms on space
    var splitTerms = filterTerms.toLowerCase().split(/\s+/);

    // Build Regexp with Logical AND using "look ahead assertions"
    re_and = "(?=.*" + splitTerms.join(")(?=.*") + ")";
    re = new RegExp(re_and);

    // Iterate through product list
    for (var x = 0; x < items.length; x++) {

        //If the title matches, include the product
        if (re.test(items[x].title.toLowerCase())) {

            // Setting retrivedByTitle to true tells the 
            // view to hide the alt names for this product
            items[x].alternateName = undefined;
            items[x].retrievedByTitle = true;
            filtered.push(items[x]);

        // If the title doesn't match, check the alternate names for matches
        } else if (items[x].alternateNames && items[x].alternateNames.length > 0 ) {

            // Setting retrivedByTitle to false tells the 
            // view to show the alt names for this product
            items[x].retrievedByTitle = false;

            //Iterate through each alternate name and check for a match
            function altNamesReturnTrue(item) {
                for (var y = 0; y < item.alternateNames.length; y++) {
                    if (re.test(item.alternateNames[y].toLowerCase())) {

                        //return true on the first alternate name match
                        //there's no need to match more than one alternate name
                        items[x].alternateName = item.alternateNames[y]
                        return true;
                    }
                }
            }

            if (altNamesReturnTrue(items[x])) {
                filtered.push(items[x]);
            }

        }
    }

    return filtered;
  };
});

filters.filter('sortLangs', function () {
	  return function (list, order) {
		  if (!list) { return; } 
		  var sorted = [];
		  
	      for (var j=0; j<order.length;j++) {
	    	  for (var k=0; k<list.length; k++) {
	    		  if (order[j].code == list[k].key) {
	    			  sorted.push(list[k]);
	    		  }
	    	  }
	      }
	      
	      if (sorted.length < list.length) {
		      for (var j=0; j<list.length;j++) {
		    	  var found = false;
		    	  for (var k=0; k<sorted.length; k++) {
		    		  if (list[j].key == sorted[k].key) {}
		    		  	found = true;
		    	  }
		    	  if (!found) {
		    		  sorted.push(list[k]);
		    	  }
		      }
		  }

	      return sorted;

	  };
	});

	filters.filter('sortLangsViewer', function () {
		  return function (list, order) {
			  if (!list) { return; } 
			  var sorted = [];
			  
		      for (var j=0; j<order.length;j++) {
		    	  for (var k=0; k<list.length; k++) {
		    		  if (order[j].code == list[k]) {
		    			  sorted.push(list[k]);
		    		  }
		    	  }
		      }
		      
		      if (sorted.length < list.length) {
			      for (var j=0; j<list.length;j++) {
			    	  var found = false;
			    	  for (var k=0; k<sorted.length; k++) {
			    		  if (list[j] == sorted[k]) {}
			    		  	found = true;
			    	  }
			    	  if (!found) {
			    		  sorted.push(list[k]);
			    	  }
			      }
			  }

		      return sorted;

		  };
		});