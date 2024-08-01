function ProductFinderApi() {
    /**
     * the search api javascript contains helper functions to create a request to uacp to retieve content
     * for implemenation:
     * 1. get default parameters
     * 2. add the required values to the default paramters
     * 3. set your changes via setParameters
     * 4. call searchContent with the corresponding success and error handler
     */

    this._server = "";
	// ???
    this._apiPath = "/http.svc/search";
    this._parameters = {
        area: "browser",
        state: "PRODUCTION"
    };

    // reads the content based on the parameters and calls then the success or error handler
    this.queryProducts = function (fnSuccessHandler, fnErrorHandler) {
        var url = this._server + this._apiPath;
        $.ajax({
            url: url,
            type: 'get',
            data: this._parameters,
            success: function (response) {
                // calls the success handler with the data for the topic
                fnSuccessHandler(response.data.products);
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

    // sets the content api parameters
    this.setParameters = function (parameters) {
        this._parameters = parameters;
    };

    // gets the current content api paramters
    this.getParameters = function () {
        return this._parameters;
    };
	
    this.setState = function (state) {
        this._parameters.state = state;
    };
	
	this.getState = function() {
		return this._parameters.state;
	};

};