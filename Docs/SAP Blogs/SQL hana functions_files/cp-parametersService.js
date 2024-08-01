var parametersService = angular.module('parametersService', []);

/* 
Sections in the parametersHandler service: 
- API instantiation
- Variable setup
- Parameter generation function
- Url parameters update function
- Parameter modification functions - converting formats, adding property values, clearing properties
- Parameter checking functions
*/

parametersService.factory('parameterHandler', ['$location', function($location) {
	
	var searchApi = new SearchApi();
	
	var parameterHandler = {}
	
	// define the default search parameters		
	parameterHandler.parameters = {};

	//Parameter generation function
	parameterHandler.generateParameters = function(parameters) {

		this.parameters = searchApi.getParameters();
		
		//Parameter: q
		if(parameters.q) {
			this.parameters.q = parameters.q;
		}

		//Parameter: state
		if (parameters.state) {
			this.parameters.state = parameters.state;
		} else {
			$location.search('state', this.parameters.state);
		}
		
		//Parameter: language
		if (parameters.language) {
			this.parameters.language = parameters.language;
		} else {
			$location.search('language', this.parameters.language);			
		}

		//Parameter: format/transtype
		if (parameters.format) {
			this.parameters.transtype = parameters.format;
		} else {
			if(typeof this.parameters.transtype != 'string') {
				this.parameters.transtype = this.convertType(this.parameters.transtype);
			}
			$location.search('format', this.parameters.transtype);			
		}
		
		//Parameter: product
		if (parameters.product) {
			this.parameters.product = {}
			this.parameters.product.key = parameters.product;

			if(parameters.version) {
				this.parameters.version = {}
				this.parameters.version.key = parameters.version;
			}
		}
		
		return this.parameters;
	}

	//Url parameters update function
	parameterHandler.updateUrl = function(parameters) {
		
		if(parameters.q) {
			$location.search('q', parameters.q);
		}

		if(!typeof parameters.state != 'string'){
			var state = parameterHandler.convertType(parameters.state);
		}
		
		if(parameters.state) {
			$location.search('state', state);
		}

		if(parameters.language) {
			$location.search('language', parameters.language);
		}

		if(typeof parameters.transtype != 'string'){
			var transtype = parameterHandler.convertType(parameters.transtype);
		}

		if(parameters.transtype) {
			$location.search('format', transtype);
		}

		if(parameters.product) {
			$location.search('product', parameters.product.key);
		}

		if(parameters.version) {
			$location.search('version', parameters.version.key);
		}

	}

	//Parameter modification functions
	parameterHandler.updateQuery = function(newQuery) {
		this.parameters.q = newQuery
		this.parameters.to = ""
		$location.search('q', this.parameters.q);
	}

	parameterHandler.findProductValue = function(allProducts) {
		
		for(var i=0; i<allProducts.length; i++) {
			if(this.parameters.product.key === allProducts[i].key) {
				this.parameters.product.value = allProducts[i].value;
			}
		}
	}

	parameterHandler.findVersionValue = function(allVersions) {
		
		for(var i=0; i<allVersions.length; i++) {
			if(this.parameters.version.key === allVersions[i].key) {
				this.parameters.version.value = allVersions[i].value;
			}
		}
	}

	parameterHandler.convertType = function(toConvert) {
		//The convertType function handles the conversion of data from String to Object Literal and the reverse
		//This is used to work with transtype filters
		
		if(typeof toConvert === 'string') {
			var tempArray = [];
			var converted = {};
						
			tempArray = toConvert.split(",");
			
			for(var i=0; i<tempArray.length; i++) {
				converted[tempArray[i]] = true;
			}
		} else {
			var tempArray = [];
			var converted = "";
			
			for(var property in toConvert) {
				if(toConvert[property] === true) {						
					tempArray.push(property);
				}
			}
	
			converted = tempArray.toString();
		}	

		return converted;
	}

	parameterHandler.clearProductSelection = function() {
		//Clear any version selection and any version options related to previous product selection
		this.parameters.product = "";
		this.parameters.versions = "";
	}

	//Parameter checking functions
	parameterHandler.allOptionsDeselected = function(parameters) {
		for(var selection in parameters) {
			if(parameters[selection] === true) {
				return false;
			}
		}

		return true;
	}
	
	return parameterHandler;
}]);