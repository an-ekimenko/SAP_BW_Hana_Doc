/**
 * Dynamic content profiling API.
 *  © Copyright 2015 SAP SE.  All rights reserved
 */

// ProfilingValue ------------------------------------------------------------------------------
/**
 * Creates a PropertyValue with fields:
 * - parent : ProfilingProperty
 * - propName : string (the property/facet this value belongs to)
 * - value : string
 * - hidden : boolean (true by default)
 * - description : string
 * - position : number (0 by default)
 * 
 * @param {ProfilingProperty} parentProperty
 * @param {string} value
 * @param {string} label
 */
function PropertyValue(parentProperty, value, label) {
    this.value = value;
    this.label = label;
    this.hidden = true;
    this.description = "";
    this.position = 0;
    this.visibility_in_facets = "yes";
    
	if (parentProperty instanceof ProfilingProperty && parentProperty !== null) {
        this.parent = parentProperty;
        this.propName = parentProperty.name;
    } else if (typeof parentProperty == "string") {
        this.propName = parentProperty;
        this.parent = null;
    }
}

PropertyValue.prototype.setHidden = function(isHidden) {
    this.hidden = typeof isHidden !== "undefined" && isHidden ? true : false;
}
PropertyValue.prototype.isHidden = function() {
    return this.hidden
}
/**
 * invert hidden value: true if it was false, false if it was true
 */
PropertyValue.prototype.toggleHidden = function() {
    this.hidden = this.hidden ? false : true;
}
PropertyValue.prototype.setDescription = function(d) {
    this.description = d;
}
PropertyValue.prototype.setPosition = function(pos) {
    this.position = pos;
}
PropertyValue.prototype.setVisibilityInFacets = function(isVisible) {
    this.visibility_in_facets = isVisible;
}

// ------- START ------- functions that might be used on the content generation side -------

/*  Returns the string token that appears in @class for elements that match the profile. */
PropertyValue.prototype.classToken = function() {
    return "props--" + this.propName + "--" + this.value;
}
/* Returns an id attribute value to use in a <style> associated this pair. If a prefix is given, it is included in the value. */
PropertyValue.prototype.styleId = function(prefix) {
    var idString = "style_";
    if (typeof prefix !== "undefined" && prefix != null) {
        idString = idString + prefix + "_";
    }
    return (idString + this.classToken());
}
PropertyValue.prototype.asString = function() {
    return PropertyValue.encode(this.propName, this.value, this.hidden);
}
PropertyValue.prototype.equals = function(otherVal) {
    return (typeof otherVal !== "undefined" && otherVal != null && this.parent.prop === otherVal.parent.prop && this.propName === otherValue.propName && this.value === otherVal.value);
}

PropertyValue.encode = function(propName, propValue, state) {
    // Encode in the format: [propName,propValue,hidden] where hidden is 0 or 1.
    return "[" + propName + "," + propValue + "," + (typeof state == "boolean" && state ? "1" : "0") + "]";
}
    
PropertyValue.decode = function(encodedString) {
    // Decode from the format created by encode()
    var trimmed = encodedString.replace(/^\[/, "").replace(/\]$/,"");
    var items = trimmed.split(",");
    // NB: The encoded string has no label information. For the label concatenate propName + propValue
    var newProp = new PropertyValue(items[0], items[1], "" + items[0] + "_" + items[1]);
    newProp.setHidden("" + items[2] == "1");
    return newProp;
}

// ------- END ------- functions that might be used on the content generation side -------

// ProfilingProperty ------------------------------------------------------------------------------
/**
 * Creates a ProfilingProperty with fields:
 * - name : string
 * - label : string
 * - values : PropertyValue[]
 * - description : string
 * - facetType : string
 * - defaultValue : string (id of facet_value) or null
 * - position : number (0 by default)
 * 
 * @param {ProfilingProperty} parent
 * @param {string} value
 * @param {string} label
 */
function ProfilingProperty(name, label) {
    this.name = name;
    this.label = label;
    this.values = [];
    this.description = "";
    this.facetType = "checkbox";
    this.defaultValue = null;
    this.position = 0;
    this.visibility_in_facets = "yes";
}

ProfilingProperty.prototype.setDescription = function(desc) {
	this.description = desc;
}
ProfilingProperty.prototype.setFacetType = function(facetType) {
    this.facetType = facetType;
}
ProfilingProperty.prototype.setDefaultValue = function(defaultValue) {
    this.defaultValue = defaultValue;
}
ProfilingProperty.prototype.setPosition = function(pos) {
    this.position = pos;
}
ProfilingProperty.prototype.setVisibilityInFacets = function(isVisible) {
    this.visibility_in_facets = isVisible;
}
/**
 * Creates a PropertyValue with given name and label and adds it to the property's values
 * @param {string} valueString
 * @param {string} valueLabel
 * @returns - PropertyValue
 */
ProfilingProperty.prototype.addValue = function(valueString, valueLabel) {
    var theValue = this.getValue(valueString);
    if (theValue == null) {
        theValue = new PropertyValue(this, valueString, valueLabel);
        this.values.push(theValue);
    }
    return theValue
}
/**
 * @param {string} valueString
 * @returns PropertyValue or null, if not found
 */
ProfilingProperty.prototype.getValue = function(valueString) {
    for (var i = 0; i < this.values.length; i++)
        if (this.values[i].value == valueString) {
            return this.values[i];
        }
    return null;
}
/**
 * @param {string} valueString
 * @returns boolean
 */
ProfilingProperty.prototype.haveValue = function(valueString) {
    return this.getValue(valueString) !== null;
}
/**
 * @param {string} valueString
 * @returns boolean or null, if input value is null
 */
ProfilingProperty.prototype.isHidden = function(valueString) {
    var propValue = this.getValue(valueString);
    if (propValue != null) {
        return propValue.isHidden();
    }
    return null;
}
/**
 * @param {string} valueString
 * @param {boolean} isHidden
 */
ProfilingProperty.prototype.setHidden = function(valueString, isHidden) {
    var propValue = this.getValue(valueString);
    if (propValue != null) {
        propValue.setHidden(isHidden)
    }
}

// ------- START ------- functions that might be used on the content generation side -------

ProfilingProperty.prototype.applyToAllValues = function(applyFunction) {
    for (var i = 0; i < this.values.length; i++) {
        applyFunction(this.values[i]);
    }
}
/* Returns a string encoding of the property and current state. */
ProfilingProperty.prototype.asString = function() {
    var result = "";
    for (var i = 0; i < this.values.length; i++) {
        result += this.values[i].asString();
    }
    return result;
}

// ------- END ------- functions that might be used on the content generation side -------

//ProfilingSet ------------------------------------------------------------------------------
/**
 * Creates a ProfilingSet with fields:
 * - name : string
 * - properties : ProfilingProperty[]
 * - id : string (in form "Profiling set name")
 * 
 * @param {string} name
 * @param json - an object with field profilingData
 */
function ProfilingSet(name, json) {
	
    this.name = name;
    this.properties = [];
    this.id = function() {
        return 'Profiling set "' + (typeof this.name !== "undefined" && this.name != null ? this.name : "#unnamed#") + '"';
    }
    if (typeof json == "object" && json != undefined && "profilingData" in json)
        for (var i = 0; i < json.profilingData.length; i++) {
            var propItem = json.profilingData[i];
            var newProp = this.addProperty(propItem.prop, propItem.label);

            if (propItem.facet_type) {
                newProp.setFacetType(propItem.facet_type);

                if (propItem.facet_type == "radio" || propItem.facet_type == "dropdown") {
                    if (propItem.default_value) {
                        newProp.setDefaultValue(propItem.default_value);
                    }
                }
                
            }
            if (typeof propItem.description !== "undefined") {
                newProp.setDescription(propItem.description);
            }
            if (typeof propItem.position !== "undefined") {
                newProp.setPosition(propItem.position);
            }
            if (typeof propItem.visibility_in_facets != "undefined") {
                newProp.setVisibilityInFacets(propItem.visibility_in_facets);
            }
            for (var j = 0; j < propItem.values.length; j++) {
                var valItem = propItem.values[j];
                var newValue = newProp.addValue(valItem.value, valItem.label);
			    if (typeof valItem.description !== "undefined") {
			        newValue.setDescription(valItem.description);
			    }
			    if (typeof valItem.position !== "undefined") {
			        newValue.setPosition(valItem.position);
			    }
			    if (typeof valItem.visibility_in_facets !== "undefined") {
                    newValue.setVisibilityInFacets(valItem.visibility_in_facets);
                }
                if (typeof valItem.initialState !== "undefined" && newProp.facet_type == "checkbox") {
			        newValue.setHidden(valItem.initialState !== "visible");
                }
                if (valItem.value == propItem.default_value) {
                    newValue.setHidden(false);
                }
            }

        }
}
/**
 * Return an existing property for property with given name or creates and returns one with given name and label
 * 
 * @param {string} propName
 * @param {string} propLabel
 */
ProfilingSet.prototype.addProperty = function(propName, propLabel) {
    var theProp = this.getProperty(propName);
    if (theProp != null) {
        return theProp;
    }
    theProp = new ProfilingProperty(propName, propLabel);
    this.properties.push(theProp);
    return theProp
}
/**
 * @param {string} propName
 */
ProfilingSet.prototype.getProperty = function(propName) {
    for (var i = 0; i < this.properties.length; i++)
        if (this.properties[i].name == propName) {
            return this.properties[i];
        }
    return null;
}
/**
 * @param {string} propName
 */
ProfilingSet.prototype.haveProperty = function(propName) {
    return this.getProperty(propName) !== null
}
/**
 * @param {string} propName
 * @param {string} valueName
 */
ProfilingSet.prototype.getValue = function(propName, valueName) {
    var prop = this.getProperty(propName);
    return prop != null ? prop.getValue(valueName) : null;
}
ProfilingSet.prototype.sortProfilingSetByPosition = function() {

    this.properties.sort(function(a, b){return a.position - b.position});
    
    for (var i = 0 ; i < this.properties.length ; i++ ) {
        this.properties[i].values.sort(function(a, b){return a.position - b.position});
    }
}

// ------- START ------- functions that might be used on the content generation side -------

ProfilingSet.prototype.applyToAllProperties = function(applyFunction) {
    for (var i = 0; i < this.properties.length; i++) {
        applyFunction(this.properties[i]);
    }
}
ProfilingSet.prototype.applyToAllValues = function(applyFunction) {
    for (var i = 0; i < this.properties.length; i++) {
        var prop = this.properties[i];
        for (var j = 0; j < prop.values.length; j++) {
            applyFunction(prop, prop.values[j]);
        }
    }
}
ProfilingSet.prototype.getStateAsString = function() {
    var result = "";
    this.applyToAllProperties( function(prop) {
        result = result + prop.asString();
        });
    return result;
}
ProfilingSet.prototype.setStateFromString = function(encodedString) {
    var trimmed = encodedString.replace(/^\[/, "").replace(/\]$/,"");
    var items = trimmed.split("][");
    for (var i = 0; i < items.length; i++) {
        tempVal = PropertyValue.decode(items[i]);
        var prop = this.getProperty(tempVal.propName);
        if (prop !== null) {
            prop.setHidden(tempVal.value, tempVal.isHidden());
        }
    }
}

// ------- END ------- functions that might be used on the content generation side -------


//ProfilingController ------------------------------------------------------------------------------
/**
 * Creates a ProfilingController with fields:
 * - ownerWindow : the main JS object root
 * - profile : ProfilingSet
 * - navigationWindow : the main JS object root (used in synchronize)
 * - contentWindow : the main JS object root (used in synchronize)
 * 
 * @param window
 * @param {ProfilingSet} profilingSet
 */
function ProfilingController(window, profilingSet) {
    this.ownerWindow = window;
    this.profile = profilingSet;
    this.navigationWindow = null;
    this.contentWindow = null;
}

/**
 * Register a window to have profiling applied and immediately apply current values.
 * (Unknown use. Used in cp-pagecontentctrl.js)
 */
ProfilingController.prototype.synchronize = function(toWindow, windowType) {
    if (typeof toWindow === "undefined" || toWindow == null) {
        console.log("synchronize(): window is " + (typeof toWindow === "undefined" ? "undefined" : "null") + "!");
        toWindow = (windowType == "navigation" ? this.navigationWindow : this.contentWindow);
    } else if (windowType == "content") {
        this.contentWindow = toWindow;
    } else if (windowType == "navigation") {
        this.navigationWindow = toWindow;
    } else return; // Should not happen.
    
//    // this.applyFilteringToDoc(toWindow.document);
    // Debug
    this.ownerWindow.console.log("Synchronized " + windowType + " profiling to " + toWindow.document.location.pathname)
};

/**
 * A function to set / re-set the defaults.
 * Adds a style (class hidden) to the head to hide/show profiled elements.
 * Adds a style (class flagged) to the head to flag/un-flag profiled elements.
 * 
 * @param profilingData An array with profilingData that appears as it is in content.profiling.data.js, profilingData
 */
ProfilingController.prototype.applyDefaults = function(profilingData) {
	
    var dom = this.contentWindow.document;
    if ("undefined" == typeof dom || null == dom) console.log("applyDefaults(): Document is " + ("undefined" == typeof dom ? "undefined" : "null") + "!");
    else {
        $(dom).find("style.hidden").remove();
        $('<style id="filteringHidden" type="text/css">.hidden { display: none; }</style>"').appendTo(dom.getElementsByTagName("head"));
        
        // applies global defaults
        if(profilingData) {
            for(var i=0; i<profilingData.length; i++) {

                var prop = profilingData[i];

                if (!prop.facet_type || prop.facet_type == "checkbox") {
                    
                    var vals = profilingData[i].values;                
                    
                    for(var j=0; j<vals.length; j++) {
	                    this.profile.getValue(profilingData[i].prop,vals[j].value).setHidden(false);		                        
			                if (vals[j].initialState == "visible") {
			                    this.profile.getValue(profilingData[i].prop,vals[j].value).setHidden(false);
			                } else {
			                    this.profile.getValue(profilingData[i].prop,vals[j].value).setHidden(true);
                            }
                    }
                } else if (prop.facet_type == "radio" || prop.facet_type == "dropdown") {
                    
                    if (prop.default_value) {
			            var radioProp = this.profile.getProperty(prop.prop);
			            var radioValue = this.profile.getValue(prop.prop, radioProp.defaultValue);
			            radioValue.setHidden(true);
			            radioProp.setDefaultValue(prop.default_value)
			            var radioValueNew = this.profile.getValue(prop.prop, prop.default_value);
			            radioValueNew.setHidden(false);
			        } else {
                        // if no default value was found, mark the first as default one
                        var radioProp = this.profile.getProperty(prop.prop);
                        // if the in-memory profilingSet has a default for the radio property, hide it (reset button)
                        if (radioProp.defaultValue) {
                            var radioValue = this.profile.getValue(prop.prop, radioProp.defaultValue);
                            radioValue.setHidden(true);
                        }
			            radioProp.setDefaultValue(radioProp.values[0].value);
			            radioProp.values[0].setHidden(false);
                    }                                    
                }
            }
        }

    	this.applyFilteringToDoc2("#toc");
		this.applyFilteringToDoc2(".body");
    }
    
}

/**
 * Shows/hides the property-value in a the in-memory profilingController object and applies the changes to the entire document.
 * @this {ProfilingController}
 * @param {string} propName A property (category/facet) name.
 * @param {string} valueString A value name.
 * @param {boolean} isHidden A boolean: true hides element, false shows it.
 * 
 */
ProfilingController.prototype.showHide = function(propName, valueString, isHidden) {
    var val = this.profile.getValue(propName, valueString);
    if (val != null) {
        val.setHidden(isHidden);

//        // this.applyFiltering();
        this.applyFilteringToDoc2("#toc");
        this.applyFilteringToDoc2(".body");

    } else {
        console.log("ProfilingController.showHide(" + isHidden + "): No match for (" + propName + "," + valueString + ")")
    }
};

/**
 * Applies the profiling data on an element with a specific class or id (.body for page content element, #toc for the table of contents element)
 * 
 * @param {string} elJQueryString A string to identify the element on which to apply the filtering (.body or #toc)
 */
ProfilingController.prototype.applyFilteringToDoc2 = function(elJQueryString) {
    
	var window = this.contentWindow.document;
	
	if (typeof window == "undefined" || window == null) console.log("applyFilteringToDoc2(elJQueryString): Document is " + (typeof window == "undefined" ? "undefined" : "null") + "!");

	else if (this.profile != null) {
		
		var children = $(elJQueryString).children();
		
		for(var i = 0; i < children.length; i++) {
			
			var isVisibleAndFiltered = this.isElementVisibleAndFiltered(children[i], false);
			if(isVisibleAndFiltered.visible) {
				$(children[i]).removeClass("hidden");
				this.flagChildren(children[i], isVisibleAndFiltered.filtered);
			}
			else {
				$(children[i]).addClass("hidden");
			}
		}
	}
	
}

/**
 * Determines whether an element should be visible and whether it should be flagged or hidden based on one of its ancestors 
 * having profiling class-tags
 * 
 * WARNING: The element does not necessarily have only profiling class-tags assigned to it and might have none!
 * 
 * @param el - A DOM element object
 * @param {boolean} filtered - A condition passed through ancestors to determine whether to flag or hide an element
 * @returns An object with two properties: visible and filtered
 */
ProfilingController.prototype.isElementVisibleAndFiltered = function(el, filtered) {
	
    var classes = el.className.split(" ");
	
	var elementVisibility = true;
    
    //create a map that will be used with the "AND" logic between facet-attributes on the same element
    var facetMapHidden = {};
    
    for (var j = 0; j<classes.length; j++) {
        
    	var classTag = classes[j].split("--");
    	
    	var propertyValue = this.profile.getValue(classTag[1], classTag[2]);
    	
    	//elements might have non-profiling class-tags (e.g. p, props_all)
    	if (!propertyValue) {
    		continue;
    	}
    	else {
    		
    		// populate the map to keep track of whether different facet-attributes are shown for the same element
    		// i.e. "OR" operation within each attribute, "AND" operation between attributes
    		if(facetMapHidden[classTag[1]] == undefined) { // add new

                // each value in the map has:
                //    1. the final visibility (named hidden) and 
                //    2. a list of objects, each containing the value and its visibility (will be used for the flagging text)
                var part2 = {value: propertyValue.value, visibility: propertyValue.isHidden()};
                var template = {hidden:propertyValue.isHidden(), list: [part2]};

    			facetMapHidden[classTag[1]] = template;
    		}
    		else {

                if (!propertyValue.isHidden()) { // check displayed for overwrite

                    // overwrite the final visibility and add the propertyValue to the list of objects
                    var part2 = {value: propertyValue.value, visibility: propertyValue.isHidden()};
                    facetMapHidden[classTag[1]].hidden = propertyValue.isHidden();
                    facetMapHidden[classTag[1]].list.push(part2);
                }
                else {
                    // add the propertyValue to the list of objects
                    var part2 = {value: propertyValue.value, visibility: propertyValue.isHidden()};
                    facetMapHidden[classTag[1]].list.push(part2);
                }
            }

    	}
    }
    
    // loop through the facetMapHidden to determine whether to show an element (all map values need to be false to display the el.)
    for (var key in facetMapHidden) {
        if (facetMapHidden[key].hidden) {
	        elementVisibility = false;
	        break;
        }
    }

    // the flagging text could only be generated after all class-tags have been parsed (it can be generated from the facetMapHidden list)
    var flaggingText = '';
    // only generate the flagging text if the element is not visible and being filtered (a child of a profiling element that's visible)
    if(!elementVisibility && filtered) {
        var keyCount = Object.keys(facetMapHidden).length;
        var currentKey = 0;
        for (var key in facetMapHidden) {
            var mapVal = facetMapHidden[key];
            
            flaggingText += "\'" + this.profile.getProperty(key).label + "\':";
            for (var i = 0; i < mapVal.list.length; i++) {

                flaggingText += this.profile.getValue(key, mapVal.list[i].value).label;
                if (i != mapVal.list.length-1) {
                    flaggingText += " OR ";
                }
            }
            if (currentKey != keyCount-1) {
                flaggingText += " AND ";
            }
            currentKey++;
        }
    }
    
    // determine whether an element should be flagged or hidden based on whether it's parent element has profiling class-tags
    if(!filtered){
    	
    	if($.isEmptyObject(facetMapHidden)) {
        	return {visible: elementVisibility, filtered: false, flaggingText: flaggingText};
    	}
    	else {
        	return {visible: elementVisibility, filtered: true, flaggingText: flaggingText};
    	}
    	
    }
    else {
        return {visible: elementVisibility, filtered: filtered, flaggingText: flaggingText};
    }
}

/**
 * A recursive function to flag or hide the children of an element
 * 
 * @param node - A DOM element object
 * @param {boolean} filtered - A condition passed through ancestors to determine whether to flag or hide an element
 * 
 */
ProfilingController.prototype.flagChildren = function(node, filtered) {

	var children = $(node).children();

	//end-condition: no more children
	if (children.length < 1) {
		return;
	}
	
	//for each child element determine whether its visible by evaluating all the element's class-tags
	
	for(var i=0; i<children.length; i++) {
		
		var elementVisibility = this.isElementVisibleAndFiltered(children[i], filtered);

		//if element is visible, (display element + remove flagging) + recursive call
		if(elementVisibility.visible) {

            var el = $(children[i]);

			el.removeClass("hidden"); //display element

			this.flagChildren(el, elementVisibility.filtered);

             //remove flagging
            if (el[0].className.indexOf('flagged') != -1) {
                el.removeClass("flagged");
                el.prev().remove();
                el.next().remove();
            }

		}
		else{ //else apply flagging style in the way of visiting the elements (innermost style is the one to visualize) + recursive call
			if(filtered) {
                var el = $(children[i]);

				el.removeClass("hidden");

                this.flagChildren(el, elementVisibility.filtered);

                // add flagging
                if (el[0].className.indexOf('flagged') == -1) { //avoid double flagging on the same element
                    
                    el.addClass("flagged");
                    el.before("<div style='border-style: solid; border-color: green green white green; border-bottom: none; color:green;'>Only valid for " + elementVisibility.flaggingText + "</div>");
                    el.after("<div style='border-style: solid; border-color: white green green green; border-top: none; color:green;'>End of " + elementVisibility.flaggingText + "</div>");

                }

			}
			else {
				$(children[i]).addClass("hidden");
			}
		}
		
	}
	
}

/**
 * Hides a property-value
 * @this {ProfilingController}
 * @param {string} propName A property (category/facet) name.
 * @param {string} valueString A value name.
 */
ProfilingController.prototype.hide = function(propName, valueString) {
    this.showHide(propName, valueString, true);
}
/**
 * Shows a property-value
 * @this {ProfilingController}
 * @param {string} propName A property (category/facet) name.
 * @param {string} valueString A value name.
 */
ProfilingController.prototype.show = function(propName, valueString) {
    this.showHide(propName, valueString, false);
}
/**
 * Returns the visibility of a property value (true, false) or null, if value is not found.
 * @param {string} propName A property (category/facet) name.
 * @param {string} valueString A value name.
 * @returns true for the value being hidden, false for the value being shown; null, if value not found.
 */
ProfilingController.prototype.isHidden = function(propName, valueString) {
    var val = this.profile.getValue(propName, valueString);
    return val != null ? val.isHidden() : null; // difference with original api
}
ProfilingController.prototype.setOwnerWindow = function(newWindow) {
    this.ownerWindow = newWindow
};

// ------- START ------- functions that might be used on the content generation side -------

ProfilingController.prototype.showAll = function() {
    if (this.profile == null) return;
    this.profile.applyToAllValues(function(prop, val) { 
        val.setHidden(false);
    });
//    // this.applyFiltering();
    this.applyFilteringToDoc2("#toc");
    this.applyFilteringToDoc2(".body");
}
ProfilingController.prototype.hideAll = function() {
    if (this.profile == null) return;
    this.profile.applyToAllValues(function(prop, val) { 
        val.setHidden(true);
    });
//    // this.applyFiltering();
    this.applyFilteringToDoc2("#toc");
    this.applyFilteringToDoc2(".body");
}

/* Sets state from a string, encoded in the form used by ProfilingSet methods getStateAsString() and 
   saveStateAsString() */
ProfilingController.prototype.setStateFromString = function(stateString) {
    this.profile.setStateFromString(stateString);
}
/* Returns the class attribute value to use in <style> elements, which is useful to select them all for removal. */
ProfilingController.prototype.styleClassVal = function(prefix) {
    var classVal = (prefix != null ? prefix + "_" : "");
    return classVal + "filtering_props";
}

// ------- END ------- functions that might be used on the content generation side -------
