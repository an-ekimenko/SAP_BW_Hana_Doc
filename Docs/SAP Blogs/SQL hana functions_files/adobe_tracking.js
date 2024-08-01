function AdobeTrackingService() {

    var _trackingData = {};
    var _trackingType = "";
    var _trackingText = "";


    var setPageUrl  = function(pageUrl) {
        if(!pageUrl) {
            pageUrl = location.href;
        }

        _trackingData.pageUrl = pageUrl;
    }

    var setPageName = function(pageName) {
        pageName = pageName.toLowerCase();

        if(pageName.length > 100) {
            pageName = pageName.substring(0, 100);
        }
        
        _trackingData.pageName = pageName;
    }

    var setLanguage = function(language) {
        _trackingData.prop2 = language;
    }

    var setLoginStatus = function(isLoggedOn) {
        var loginStatus = "logN"

        if(isLoggedOn) {
            loginStatus = "logY";
        } 

        _trackingData.prop9 = loginStatus;
    }

    var setEventType = function(event) {
        _trackingData.events = event;
    }

    var setQuery = function(query, noResults) {
        query = query.toLowerCase();

        if(query.length > 100) {
            query = query.substring(0, 100);
        }

        _trackingData.prop11 = query;

        if(noResults) {
            _trackingData.prop12 = query;
        } else if (_trackingData.prop12){
        	delete _trackingData.prop12;
        }
    }

    var setLinkDetails = function(linkRank, linkDescription) {

        linkDescription = linkDescription.replace(/\s+/g, ' ').toLowerCase(); //replaces excessive whitespaces, new line or tab breaks with one space, set to lower case
        
        if(linkDescription.length > 255) {
            linkDescription = linkDescription.substring(0, 255);
        }

        _trackingData.eVar19 = ''+ linkRank + '^' + linkDescription + '';
    }

    var setTrackingType = function(trackingType) {
        _trackingType = trackingType;
    }

    var setTrackingText = function(trackingText) {
        _trackingText = trackingText;
    }

    var setChannel = function(channel) {
    	_trackingData.channel = channel;
    }
    
    this.setPageData = function(pageName, language, loginStatus, channel) {

        setPageUrl();
        
        if(pageName) {
        	setPageName(pageName);
        }

        if(language) {
        	setLanguage(language);
        }

        setLoginStatus(loginStatus);       	
        
        if(channel) {
        	setChannel(channel);
        }
    }
    
    this.trackSearchData = function(query, noResults) {
    	
    	setPageUrl();
    	
    	setEventType('event15');
        
    	if(query) {
    		setQuery(query, noResults);
    	}
    	
    	this.trackData();
    } 
    
    this.trackData = function() {
    	
    	try {
    		sap_s.trackData(_trackingData);
    		} catch(e) {console.log(e);}  
    }

    this.trackResultClick = function(linkRank, linkDescription) {
    	
    	var event = 'event11, event12=' + linkRank;
    	
    	setEventType(event);
        setLinkDetails(linkRank, linkDescription);
        setTrackingType("tl_o");
        setTrackingText("search result click");

        try {
        	sap_s.trackData(_trackingData, _trackingType, _trackingText);
        } catch(e) {console.log(e);}  

    }
}