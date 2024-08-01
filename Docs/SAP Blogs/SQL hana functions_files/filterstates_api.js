function StateFilterApi() {
    /**
     * the suggestion api javascript contains helper functions to create a request to uacp to retrieve filter values for products
     * for implemenation:
     * 1. get default parameters
     * 2. add the required values to the default paramters
     * 3. set your changes via setParameters
     * 4. call searchContent with the corresponding success and error handler
     */

    this._server = "";
    this._apiPath = "/http.svc/filter?";
    this._parameters = {
		element : "state",
		nocache: new Date().getTime(),
        language: "",
		product : "",
		deliverable : "",
		version : ""
    };

    // reads the content based on the parameters and calls then the success or error handler
    this.queryStates = function (fnSuccessHandler, fnErrorHandler) {
        var url = this._server + this._apiPath;
        $.ajax({
            url: url,
            type: 'get',
            data: this._parameters,
            success: function (response) {
                // calls the success handler with the data for the topic
                fnSuccessHandler(response.data);
            },
            error: function (error) {
                // calls the error handler
                fnErrorHandler(error);
            }
        });
    };
	
    this.setServer = function (server) {
        this._server = server;
    };

    this.getServer = function () {
        return this._server;
    };
	
	this.setLanguage = function(language) {
		this._parameters.language = language;
	};
	
	this.getLanguage = function() {
		return this._parameters.language;
	};
	
	
	this.setProduct = function(product) {
		this._parameters.product = product;
	};
	
	this.getProduct = function() {
		return this._parameters.product;
	};		

	this.setDeliverable = function(deliverable) {
		this._parameters.deliverable = deliverable;
	};
	
	this.getDeliverable = function() {
		return this._parameters.deliverable;
	};			

	this.setVersion = function(version) {
		this._parameters.version = version;
	};
	
	this.getVersion = function() {
		return this._parameters.version;
	};			
	

};