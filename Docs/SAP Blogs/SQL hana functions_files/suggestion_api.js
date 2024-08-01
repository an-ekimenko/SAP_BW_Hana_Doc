function SuggestionApi() {
    /**
     * the suggestion api javascript contains helper functions to create a request to uacp to retrieve suggestions
     * for implementation:
     * 1. get default parameters
     * 2. add the required values to the default parameters
     * 3. set your changes via setParameters
     * 4. call searchContent with the corresponding success and error handler
     */    
    this._server = "";
    this._apiPath = "/http.svc/suggestion?";
    this._parameters = {
        q: "",
        language: "",
        state: "PRODUCTION"
    };

    // reads the content based on the parameters and calls then the success or error handler
    this.querySuggestions = function (fnSuccessHandler, fnErrorHandler) {
        var url = this._server + this._apiPath;
        $.ajax({
            url: url,
            type: 'get',
            data: this._parameters,
            success: function (response) {
                // calls the success handler with the data for the topic
                fnSuccessHandler(response);
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

    // gets the current content api parameters
    this.getParameters = function () {
        return this._parameters;
    };


    this.setLanguage = function (language) {
        this._parameters.language = language;
    };

    this.getLanguage = function () {
        return this._parameters.language;
    };
	
	this.setState = function(state) {
		this._parameters.state = state;
	};
	
	this.getState = function() {
		return this._parameters.state;
	};

	this.setKeywords = function (keywords) {
        this._parameters.q = encodeURI(keywords);
    };
	
	this.getDefaultParameters = function() {
		var defaultParams =	{
								q: "",
								language: "",
								state: "PRODUCTION"
							};
		return defaultParams;
	};
};