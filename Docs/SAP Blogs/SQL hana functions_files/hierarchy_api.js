function HierarchyApi() {
    /**
     * the search api javascript contains helper functions to create a request to uacp to retieve content
     * for implemenation:
     * 1. get default parameters
     * 2. add the required values to the default paramters
     * 3. set your changes via setParameters
     * 4. call searchContent with the corresponding success and error handler
     */

    this._server = "";
    this.categories = [];
    this.lines = [];
    this.products = [];
    this.productdata = [];
    this.hierarchy = {};
    this.hierarchy.categories = [];


    // reads the content based on the parameters and calls then the success or error handler
    this.loadHierarchyData = function (fnSuccessHandler, fnErrorHandler) {
        
    	var hierarchyLoader = new HierarchyLoader();
    	this.onDataRetrieved(hierarchyLoader.hierarchy,fnSuccessHandler);
    	var that = this;
        var productdataurl = "/http.svc/search?area=browser&state=DRAFT,TEST,PRODUCTION";
        $.ajax({
            url: productdataurl,
            type: 'get',
            success: function(response) {
                that.onProductDataRetrieved(response,fnSuccessHandler);
            },
            error: function (error) {
                // calls the error handler
                console.log("error");
            }
        });

    };

    // call back with the response data
    // after data is initialized the success handler from outside is called
    this.onDataRetrieved= function(response,fnSuccessHandler) {
        this.categories = this.sortByName(response.categories);
        this.categories = this.moveMiscToEnd(this.categories);
        this.lines = this.sortByNameWithoutSAP(response.lines);
        this.products = this.sortByNameWithoutSAP(response.products);
        // call success handler
        if (this.productdata.length>0 && this.lines.length>0) {
            this.mergeProductData(fnSuccessHandler);
        }
    };

    this.onProductDataRetrieved = function(response,fnSuccessHandler) {
        this.productdata = response.data.products;
        if (this.productdata.length>0 && this.lines.length>0) {
            this.mergeProductData(fnSuccessHandler);
        }
    };    

    // merge the full product data with the mappings
    this.mergeProductData = function(fnSuccessHandler) {
        this.results = [];
        for (var i = 0;i<this.productdata.length;i++) {
            var productinfo = this.productdata[i];
            var id = this.path2Id(productinfo.url);
            var productmapping = this.getProductById(id);
            if (productmapping) {
                productinfo.id = id;
                productinfo.name = productinfo.title;
                productinfo.parent = productmapping.parent;
                productinfo.level = productmapping.level;
                productinfo.path = productmapping.path;
                productinfo.ppmsid = productmapping.ppmsid;
                productinfo.type = productmapping.type;
                if (productmapping.hide) {
                	productinfo.hide = productmapping.hide;
                }
            }
            else {
                productinfo.id = id;
                productinfo.name = productinfo.title;
                productinfo.parent = "MISC";
                productinfo.path = productinfo.url;
                productinfo.level = 1;
                productinfo.type = "LINE";
                productinfo.base = "PRODUCT";
            }
            if (productinfo.name && productinfo.id) {
                this.results.push(productinfo);
            }
        }
        this.productdata = [];
        this.products = this.sortByNameWithoutSAP(this.results);
        fnSuccessHandler();
    };

    this.getProductById = function(id) {
        for (var i=0;i<this.products.length;i++) {
            if (this.products[i].id == id) {
                return this.products[i];
            }
        }
        for (var i=0;i<this.lines.length;i++) {
            if (this.lines[i].id == id) {
                return this.lines[i];
            }
        }
        return undefined;
    };
    
    this.findLineById = function(id) {
        for (var i=0;i<this.products.length;i++) {
            if (this.products[i].id == id) {
                return true;
            }
        }
        return false;
    };
    
    // set the server
    this.setServer = function (server) {
        this._server = server;
    };

    // get server
    this.getServer = function () {
        return this._server;
    };

    // returns all categories
    this.getCategories = function() {
        return this.categories;
    };
    // returns all product lines
    this.getLines = function() {
        return this.lines;
    };    

        // returns all products
    this.getProducts = function() {
        return this.products;
    };        

    // get the full hierarchy
    this.getHierarchy = function() {
    	var foundproducts = [];
        if (this.hierarchy.categories.length==0) {
            this.hierarchy = {};
            this.hierarchy.categories = [];
            for (var i=0;i<this.categories.length;i++) {
                var node = {};
                var category = this.categories[i];
                node = category;
                node.lines = [];
                var lines = this.getLinesForCategory(category);
                for (var j=0;j<lines.length;j++) {
                    var linenode = {};
                    var line = lines[j];
                    linenode = line;
                    
                    if (line.base == "LINE") {
                        var products = this.getProductsForLine(line);
                        linenode.products = products;
                        // add the found products
                        for (var k=0;k<products.length;k++) {
                        	foundproducts.push(products[k]);
                        }
                        if (products.length > 0) {
                        	linenode.total = this.countAssociatedProductsOfLine(linenode);
                            linenode.filtered = 0;
                            node.lines.push(linenode);
                        }
                    }
                    
                    else {
                    	if (!line.hide) {
	                        linenode.products = [];
	                        foundproducts.push(linenode);
	                        if (this.findLineById(line.id)) {
	                        	linenode.total = this.countAssociatedProductsOfLine(linenode);
	                        	linenode.filtered = 0;
	                        	node.lines.push(linenode);
	                        }
                    	}
                    }
                }
                this.sortByNameWithoutSAP(node.lines);
                node.total = this.countAssociatedProductsOfCategory(node);
                node.filtered = 0;
                this.hierarchy.categories.push(node);
            }

            //TODO add missing misc products
            var unassignedProductLines = this.findUnassignedProductsForMisc(this.getProducts(),foundproducts);
            //add them to category misc
            var index = this.findIndexOfMiscCategory();
            if (index>-1) {
            	for (var i=0;i<unassignedProductLines.length;i++) {
            		this.hierarchy.categories[index].lines.push(unassignedProductLines[i]);
            	}
            	this.hierarchy.categories[index].total = this.hierarchy.categories[index].lines.length;
            }
            // sort the products of misc
            
            this.hierarchy.total = this.countProductOfHierarchy(this.hierarchy);
            // no filter applied
            this.hierarchy.filtered = this.total;
        }
        return this.hierarchy;
    }
    
    
    
    this.findIndexOfMiscCategory = function() {
    	var index = -1;
    	for (var i=0;i<this.hierarchy.categories.length;i++) {
    		if (this.hierarchy.categories[i].id== "MISC") {
    			index = i;
    		}
    	}
    	return index;
    }
    
    this.findUnassignedProductsForMisc = function(allproducts,foundproducts) {
    	var results = [];
    	for (var i=0;i<allproducts.length;i++) {
    		var product = allproducts[i];
    		if (!this.containsProduct(foundproducts,product)) {
    			if(!product.hide) {
	    			var id = this.path2Id(product.url);
	    			// create a line product for the not found ones
	    			product.id = id;
	    			product.name = product.title;
	    			product.parent = "MISC";
	    			product.path = product.url;
	    			product.level = 1;
	    			product.type = "LINE";
	    			product.base = "PRODUCT";
	    			product.products = [];
	    				
	    			results.push(product);
    			}
    		}
    	}
    	return results;
    }
    
    this.containsProduct = function(productlist,searchproduct) {
    	for (var i=0;i<productlist.length;i++) {
    		if (productlist[i].path == searchproduct.url) {
    			return true;
    		}
    	}
    	return false;
    }

    // filters the hierarchy based on the search terms and highlights the found places with a b tag
    this.getFilteredHierarchy = function(searchterms) {
        var terms = searchterms.toLowerCase().split(" ");
        var result = jQuery.extend(true, {}, this.getHierarchy());
        result.categories = [];
        for (var i=0;i<this.hierarchy.categories.length;i++) {
            var category = this.getFilteredCategory(this.hierarchy.categories[i],terms);
            result.categories.push(category);
        }
        result.filtered = this.countProductOfHierarchy(result);
        return result;
    };

    this.getFilteredCategory = function(orgcategory,searchterms) {
        var category =  jQuery.extend(true, {}, orgcategory);
        category.lines = [];
        for (var i = 0; i < orgcategory.lines.length;i++) {
            var fl = this.getFilteredLine(orgcategory.lines[i],searchterms);
            if (fl) {
                category.lines.push(fl);
            }
        }
        category.filtered = this.countAssociatedProductsOfCategory(category);
        return category;
    };

    this.getFilteredLine = function(orgline,searchterms) {
        var line = jQuery.extend(true, {}, orgline);

        // check if line itself is a product
        if (!line.products.length) {
            var pl = this.getFilteredProduct(line,searchterms);
            if (pl) {
                pl.total = 1;
                pl.filtered = 1;
            }
            return pl;
        }
        else {
            // check if line name contains the search terms
            var markedlinename = this.markTerm(line.name,searchterms);
            if (markedlinename) {
                line.name = markedlinename;
                line.total = line.products.length;
                line.filtered = line.products.length;
                return line;
            }
            // check if one of the associated products has matching name
            var orgproducts = line.products;
            line.products = [];
            for (var i=0;i<orgproducts.length;i++) {
                var fp = this.getFilteredProduct(orgproducts[i],searchterms);
                if (fp) {
                    line.products.push(fp);
                }
            }
            if (line.products.length>0) {
                line.total = orgproducts.length;
                line.filtered = line.products.length;
                return line;
            }
        }
        return null;
    };


    // filters and highlights a product
    this.getFilteredProduct = function(product,terms) {
        // check for the main product name
        var highlightname = this.markTerm(product.name,terms);
        if (highlightname) {
            product.name = highlightname;
            return product;
        }
        // alternativeProductNames
        if (product.alternativeProductNames) {
            for (var i=0;i<product.alternativeProductNames.length;i++) {
                var altName = product.alternativeProductNames[i];
                var highlightname = this.markTerm(altName,terms);
                if (highlightname) {
                    product.name = product.name + " ("+highlightname+")";
                    return product;
                }
            }
        }
        return null;
    };

    this.countProductOfHierarchy = function(hierarchy) {
        var count = 0;
        for (i=0;i<hierarchy.categories.length;i++) {       	
        	for (j=0;j<hierarchy.categories[i].lines.length;j++) {
                count+=this.countAssociatedProductsOfLine(hierarchy.categories[i].lines[j]);
            }
        }
        return count;
    };
    
    this.countAssociatedProductsOfCategory = function(category) {
        var count = 0;
        for (i=0;i<category.lines.length;i++) {
            count+=this.countAssociatedProductsOfLine(category.lines[i]);
        }
        return count;
    };

    this.countAssociatedProductsOfLine = function(line) {
        var count = 0;
        if (line.products.length) {
            count+=line.products.length;
        }
        else {
        	count+=1;
        }
        return count;
    };


    this.markTerm = function(text,terms) {
        var result = text;
        var found = false;
        /*var starttag="<span class='highlighted'>";
        var endtag="</span>";
        for (var i=0;i<terms.length;i++) {
            var term = terms[i];
            if (result.indexOf(term)>0) {
                var replaceStr = starttag+term+endtag;
                result = result.replace(new RegExp(term, 'g'), replaceStr);
                found=true;
            }
        }*/
        
        //regex for validating text on multiple terms at once
        re_and_cnt = "(?=.*" + terms.join(")(?=.*") + ")";
        re_and = new RegExp(re_and_cnt);
        
        //regex to replace multiple terms at once
        re_hl = new RegExp('(' + terms.join('|') + ')', 'gi');
        
        if (re_and.test(result.toLowerCase())) {
        	var resultwhl = text.replace(re_hl, '<b>$&</b>');
        	return resultwhl;
        } else {
        	return '';
        }
        
        /*if (!found) return "";
        return result;*/
    };

/*
    this.markTerm = function(text,terms) {
        var result = text;
        if (!text || !terms) return "";
        var found = 0;
        var starttag="<i>";
        var endtag="</i>";
        for (var i=0;i<terms.length;i++) {
            var term = terms[i];
            if (result.indexOf(term)>0) {
                var replaceStr = starttag+term+endtag;
                result = result.replace(new RegExp(term, 'g'), replaceStr);
                found+=1;
            }
        }
        if (found < terms.length) return "";
        return result;
    };    
*/
    this.getFilteredProducts = function(searchterms) {
        var terms = searchterms.split(" ");
        var result = [];
        var products = this.getProducts();
        for (var i=0;i<products.length;i++) {
            var filteredproduct = this.getFilteredProduct(products[i],terms);
            if (filteredProduct) {
                result.push(filteredProduct);
            }
        }
        return result;
    }


    






    // returns the lines for a specific category
    this.getLinesForCategory = function(category) {
        return this.getLinesForCategoryId(category.id);
    };

    // returns the lines for a specific category id
    this.getLinesForCategoryId = function(category_id) {
        var result = [];
        var foundIds = [];
        for (var i=0;i<this.getProducts().length;i++) {
            var product = this.getProducts()[i];
            if (product.parent == category_id) {
            	foundIds.push(product.id);
                result.push(product);
            }
        }
        for (var i=0;i<this.getLines().length;i++) {
            var line = this.getLines()[i];
            if (foundIds.indexOf(line.id) == -1 && line.parent == category_id) {
                result.push(line);
            }
        }
        return result;
    };

    // returns the products for a specific line
    this.getProductsForLine = function(line) {
        return this.getProductsForLineId(line.id);
    };

    // returns the products for a specific line id
    this.getProductsForLineId = function(line_id) {
        var result = [];
        for (var i=0;i<this.getProducts().length;i++) {
            var product = this.getProducts()[i];
            if (product.parent == line_id) {
            	if (!product.hide) {
            		result.push(product);
            	}
            }
        }
        return result;
    };

    this.sortByName = function(elements) {
        return elements.sort(this.compareNames);
    };

    this.moveMiscToEnd = function(elements) {
        var miscIndex = -1;
        var soluIndex = -1;
        var techIndex = -1;
        for ( var i =0;i<elements.length;i++) {
        	if (elements[i].id === "SOLUTIONS") {
        		soluIndex = i;
        	}
        }
        if (soluIndex>-1) {
            var solu = elements[soluIndex];
            elements.push(solu);
            elements.splice(soluIndex,1);
        }
        for ( var i =0;i<elements.length;i++) {
        	if (elements[i].id === "TECHNOLOGIES") {
        		techIndex = i;
        	}
        }
        if (techIndex>-1) {
            var tech = elements[techIndex];
            elements.push(tech);
            elements.splice(techIndex,1);
        }
        for ( var i =0;i<elements.length;i++) {
            if (elements[i].id === "MISC") {
            	miscIndex = i;
            }
        }
        if (miscIndex>-1) {
            var misc = elements[miscIndex];
            elements.push(misc);
            elements.splice(miscIndex,1);
        }
        return elements;
    }


    this.sortByNameWithoutSAP = function(elements) {
        return elements.sort(this.compareNamesWithoutSAP);
    };

   

    this.compareNamesWithoutSAP = function(a,b) {
        var v1 = a.name.toLowerCase().replace("sap ","");
        var v2 = b.name.toLowerCase().replace("sap ","");
        if (v1 < v2)
          return -1;
        if (v1 > v2)
          return 1;
        return 0;
    };

    this.compareNames = function(a,b) {
        var v1 = a.name.toLowerCase();
        var v2 = b.name.toLowerCase();
        if (v1 < v2)
          return -1;
        if (v1 > v2)
          return 1;
        return 0;
    };
    
    this.path2Id = function(path) {
        return path.replace("/viewer/p/","")
    }
	
};