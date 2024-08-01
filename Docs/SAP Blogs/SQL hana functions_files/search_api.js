function SearchApi() {
    /**
     * the search api javascript contains helper functions to create a request to uacp to retrieve content
     * for implementation:
     * 1. get default parameters
     * 2. add the required values to the default parameters
     * 3. set your changes via setParameters
     * 4. call searchContent with the corresponding success and error handler
     */

    this._server = ""; 
    this._apiPath = "/http.svc/search";
    this._esApiPath = "/http.svc/elasticsearch";
    this._showHighlighting = false;
    this._parameters = {
        area: "all",
        deliverable: "",
        version: "",
        language: "en-US",
        state: "PRODUCTION",
        topic: [],
        q: "",
		transtype : "standard,html,pdf,others",
        product: "",
        to: ""
    };

    // reads the content based on the parameters and calls then the success or error handler
    this.search = function (fnSuccessHandler, fnErrorHandler) {
    	var showHighlighting = this._showHighlighting;	
	    var url;
	    if (!isFeatureRestricted("ElasticSearchHandler"))
        	url = this._server + this._esApiPath;
        else
        	url = this._server + this._apiPath;
           
        $.ajax({
            url: url,
            type: 'get',
            data: this._parameters,
            success: function (response) {
            	
                if(response.data) {
                    if(showHighlighting && response.data.results && response.data.query) {
                        
                        var topics = response.data.results;
                        
                        for(var i=0; i<topics.length; i++) {
                            
                            if(topics[i].transtype === "html5.uacp") {
                                topics[i].url += "?q="+response.data.query;
                            }
                        }
                    }
                    
                    response = response.data;
                }
            	
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

    this.setShowHighlighting = function(highlighting) {
        this._showHighlighting = highlighting;
    }

    this.getShowHighlighting = function() {
        return this._showHighlighting;
    }
    
    // sets the content api parameters
    this.setParameters = function (parameters) {
        this._parameters = jQuery.extend(true, {}, parameters);
    };

    // gets the current content api paramters
    this.getParameters = function () {
        var parameters = jQuery.extend(true, {}, this._parameters);
        return parameters;
    };
	
    this.setQ = function (q) {
        this._parameters.q = q;
    };
	
	this.getQ = function() {
		return this._parameters.q;
	};

    this.getDeliverable = function () {
        return this._parameters.deliverable;
    };	

    this.setDeliverable = function (deliverable) {
        this._parameters.deliverable = deliverable;
    };

    this.getDeliverable = function () {
        return this._parameters.deliverable;
    };

    this.setVersion = function (version) {
        this._parameters.version = version;
    };

    this.getVersion = function () {
        return this._parameters.version;
    };

    this.setProduct = function (product) {
        this._parameters.product = product;
    };

    this.getProduct = function () {
        return this._parameters.product;
    };

    this.setLanguage = function (language) {
        this._parameters.language = language;
    };

    this.getLanguage = function () {
        return this._parameters.language;
    };
	
    this.setState = function (state) {
        this._parameters.state = state;
    };
	
	this.getState = function() {
		return this._parameters.state;
    };	
    
    this.setTopic = function(topic) {
        this._parameters.topic = topic;
    }

    this.getTopic = function() {
        return this._parameters.topic;
    }
	
    this.setTranstype = function (transtype) {
        this._parameters.transtype = transtype;
    };

    this.getTranstype = function () {
        return this._parameters.transtype;
    };	

    this.setTo = function (to) {
        if(to) this._parameters.to = to;
        else delete this._parameters.to 
    };

    this.getTo = function () {
        return this._parameters.to;
    };
    
    this.setArea = function (area) {
    	this._parameters.area = area;
    }

    this.getArea = function() {
        return this._parameters.area;
    }
};


/**
 * set featureflaglist cookie in brower: document.cookie="featureflagsCookie=feature1,feature2,feature3",
 * don't set space between commas.
 * @param cookieName 
 * @param featureFlagName
 * @returns {Boolean}
 */
function isFeatureRestricted(featureFlag) {
	 var cookieName = "sapuacprestrictedfeaturelist";
	 var re = new RegExp('[; ]'+cookieName+'=([^\\s;]*)');
 	 var sMatch = (' '+document.cookie).match(re);
	 var featureFlags = [];
	 if (cookieName && sMatch) 
		 featureFlags = unescape(sMatch[1]).replace(/["\s\+\[\]]/g,'').split(',') 
	 for(var i=0; i< featureFlags.length; i++) {
		 if(featureFlags[i]==featureFlag) 
			 return true;
	 }
	 return false;
}

