/*!
 * SAP Web Analytics - Tracking Script
 *
 * Piwik Plugin 
 * 
 * Version: 0.1.3e
 *
 * (C) 2013-2015 SAP SE. All rights reserved.
 */
var swa=swa||{};var varlength=225;var previous={};previous.timeStamp=0;swa.plugin={log:function(){swa.currentEvent="load";var a=swa.plugin._getCommons();a.element_type="page";a.event_type="load";if(swa.test&&typeof parent.window.swa_tests==="function"){parent.window.swa_tests("load",a)}return"&"+swa.jQuery.param(a)},link:function(){swa.currentEvent="click";var d=swa.plugin;var e=d.clickedElements.shift();var b=swa._isUI5()?e.target:e.currentTarget;var a=d._getCommons();if(e.ctrlKey||e.altKey){a.element_id=String.fromCharCode(e.keyCode);a.element_type="Hotkey press";a.element_text=e.ctrlKey?"Ctrl + "+String.fromCharCode(e.keyCode):"Alt + "+String.fromCharCode(e.keyCode);a.xpath="";a.clickX=0;a.clickY=0;a.elementX=0;a.elementY=0;a.clickTime=Math.round(+new Date()/1000);a.elementWidth=0;a.elementHeight=0}else{if(typeof b!=="undefined"){var c=b.tagName.toLowerCase();a.element_id=b.id;a.element_type=c;if(b.type!=="password"&&!swa.jQuery(b).is(swa.textExclusionSelector)){a.element_text=d._getElementText(b).substring(0,varlength)}a.xpath=d._getXpath(b);a.clickX=Math.round(e.pageX);a.clickY=Math.round(e.pageY);a.elementX=Math.round(swa.jQuery(b).offset().left);a.elementY=Math.round(swa.jQuery(b).offset().top);a.clickTime=Math.round(+new Date()/1000);a.elementWidth=Math.round(swa.jQuery(b).outerWidth());a.elementHeight=Math.round(swa.jQuery(b).outerHeight());if(c=="a"&&b.href){a.target_url=b.href}}}if(swa.test&&typeof parent.window.swa_tests==="function"){parent.window.swa_tests("click",a)}return"&"+swa.jQuery.param(a)},event:function(){swa.currentEvent="custom";var b=swa.plugin._getCommons();b.event_type="custom";b.element_type="event";var d=swa.plugin.customEventAddValues.shift();if(typeof d!=="undefined"){for(var c=0;c<d.length;c++){if((typeof d[c]!=="undefined")&&(d[c]!==null)){var a=String(d[c]).trim();if(a.length>0){b["e_"+(c+2)]=a}}}}if(swa.test&&typeof parent.window.swa_tests==="function"){parent.window.swa_tests("custom",b)}return"&"+swa.jQuery.param(b)},_getXpath:function(b){var a="";var c=b;for(;c&&c.nodeType==1;c=c.parentNode){var d=swa.jQuery(c.parentNode).children(c.tagName).index(c)+1;d=d>1?"["+d+"]":"";a="/"+c.tagName.toLowerCase()+d+a}return a},_getCommons:function(){var b={timezone:new Date().getTimezoneOffset(),locale:(navigator.language?navigator.language:navigator.browserLanguage),pageTitle:document.title,pageWidth:swa.jQuery(window).width(),pageHeight:swa.jQuery(window).height()};var a;if(typeof swa.owner=="function"){a=swa.owner()}else{a=swa.owner}if(a!=null&&a!=undefined){b.user=a}else{b.user=Piwik.getAsyncTracker().getVisitorId()}if(typeof swa.subSiteId!=="undefined"){b.idsitesub=swa.subSiteId}for(var c=0;c<30;c++){var f="custom"+String(c+1);var e=swa.plugin._getCustomvalues(c+1);if(e===null){continue}if(typeof(e[0])==="function"){b[f]=e[0].apply(null,e[1])}else{if(!e[2]){var d=window[e[0]];if(typeof d==="function"){b[f]=d.apply(null,e[1])}else{b[f]=e[0]}}else{b[f]=e[0]}}}return b},_getElementText:function(a){var b=swa.jQuery(a);if(b.text().length>0){return b.text()}return b.attr("title")?b.attr("title"):b.val()},_getCustomvalues:function(b){var a;switch(b){case 1:if(typeof swa.custom1==="undefined"){break}return[swa.custom1.ref,swa.custom1.params,swa.custom1.isStatic];case 2:if(typeof swa.custom2==="undefined"){break}return[swa.custom2.ref,swa.custom2.params,swa.custom2.isStatic];case 3:if(typeof swa.custom3==="undefined"){break}return[swa.custom3.ref,swa.custom3.params,swa.custom3.isStatic];case 4:if(typeof swa.custom4==="undefined"){break}return[swa.custom4.ref,swa.custom4.params,swa.custom4.isStatic];case 5:if(typeof swa.custom5==="undefined"){break}return[swa.custom5.ref,swa.custom5.params,swa.custom5.isStatic];case 6:if(typeof swa.custom6==="undefined"){break}return[swa.custom6.ref,swa.custom6.params,swa.custom6.isStatic];case 7:if(typeof swa.custom7==="undefined"){break}return[swa.custom7.ref,swa.custom7.params,swa.custom7.isStatic];case 8:if(typeof swa.custom8==="undefined"){break}return[swa.custom8.ref,swa.custom8.params,swa.custom8.isStatic];case 9:if(typeof swa.custom9==="undefined"){break}return[swa.custom9.ref,swa.custom9.params,swa.custom9.isStatic];case 10:if(typeof swa.custom10==="undefined"){break}return[swa.custom10.ref,swa.custom10.params,swa.custom10.isStatic];case 11:if(typeof swa.custom11==="undefined"){break}return[swa.custom11.ref,swa.custom11.params,swa.custom11.isStatic];case 12:if(typeof swa.custom12==="undefined"){break}return[swa.custom12.ref,swa.custom12.params,swa.custom12.isStatic];case 13:if(typeof swa.custom13==="undefined"){break}return[swa.custom13.ref,swa.custom13.params,swa.custom13.isStatic];case 14:if(typeof swa.custom14==="undefined"){break}return[swa.custom14.ref,swa.custom14.params,swa.custom14.isStatic];case 15:if(typeof swa.custom15==="undefined"){break}return[swa.custom15.ref,swa.custom15.params,swa.custom15.isStatic];case 16:if(typeof swa.custom16==="undefined"){break}return[swa.custom16.ref,swa.custom16.params,swa.custom16.isStatic];case 17:if(typeof swa.custom17==="undefined"){break}return[swa.custom17.ref,swa.custom17.params,swa.custom17.isStatic];case 18:if(typeof swa.custom18==="undefined"){break}return[swa.custom18.ref,swa.custom18.params,swa.custom18.isStatic];case 19:if(typeof swa.custom19==="undefined"){break}return[swa.custom19.ref,swa.custom19.params,swa.custom19.isStatic];case 20:if(typeof swa.custom20==="undefined"){break}return[swa.custom20.ref,swa.custom20.params,swa.custom20.isStatic];case 21:if(typeof swa.custom21==="undefined"){break}return[swa.custom21.ref,swa.custom21.params,swa.custom21.isStatic];case 22:if(typeof swa.custom22==="undefined"){break}return[swa.custom22.ref,swa.custom22.params,swa.custom22.isStatic];case 23:if(typeof swa.custom23==="undefined"){break}return[swa.custom23.ref,swa.custom23.params,swa.custom23.isStatic];case 24:if(typeof swa.custom24==="undefined"){break}return[swa.custom24.ref,swa.custom24.params,swa.custom24.isStatic];case 25:if(typeof swa.custom25==="undefined"){break}return[swa.custom25.ref,swa.custom25.params,swa.custom25.isStatic];case 26:if(typeof swa.custom26==="undefined"){break}return[swa.custom26.ref,swa.custom26.params,swa.custom26.isStatic];case 27:if(typeof swa.custom27==="undefined"){break}return[swa.custom27.ref,swa.custom27.params,swa.custom27.isStatic];case 28:if(typeof swa.custom28==="undefined"){break}return[swa.custom28.ref,swa.custom28.params,swa.custom28.isStatic];case 29:if(typeof swa.custom29==="undefined"){break}return[swa.custom29.ref,swa.custom29.params,swa.custom29.isStatic];case 30:if(typeof swa.custom30==="undefined"){break}return[swa.custom30.ref,swa.custom30.params,swa.custom30.isStatic];default:return null}return null},clickedElements:[],customEventAddValues:[]};var elements=swa.jQuery("*");if(swa.trackFrames===true){swa.jQuery.each(swa.jQuery("iframe:not('"+swa.frameExclusionSelector+"')"),function(a,c){try{elements.push(swa.jQuery(c).contents().find("html")[0])}catch(b){}})}var elementSelector=":not('.swa_ignore')";swa.jQuery(elements).on("click.swa",elementSelector,function(a){if(swa.loggingEnabled&&swa.clicksEnabled){if(this===a.target){if(previous.timeStamp!==a.timeStamp){previous.timeStamp=a.timeStamp;swa.__validateVisitorCookie();swa.plugin.clickedElements.push(a);Piwik.getAsyncTracker().trackLink("click","event_type")}}}});swa.jQuery(window).keydown(function(a){if(swa.hotkeysEnabled&&(a.ctrlKey||a.altKey)&&(a.keyCode!==17&&a.keyCode!==18)){swa.plugin.clickedElements.push(a);swa.__validateVisitorCookie();Piwik.getAsyncTracker().trackLink("keypress","event_type")}});