    try {
var _mN = _mN || {};
var iframeURL = 'https://contextual.media.net/mediamain.html?cid=8CUQBB2U5&cpcd=7xRa5ccNXLLzdohX57nd7w%3D%3D&crid=441289839&pid=8PO9ETNPJ&size=641x481&https=1&cpnet=yVb1sHm-0KIh29BOFTjjrDpxjZWX6ciQr11kVPXNdQE%3D&cme=G7gr592Y0HAQJcmqNN_wsGtt9xW1OZ5WQwzjpWtvULGE3o0E6FoMR0eULf5dU62NuA4zIbgsPyK4VCHSMFMhRh2tSdJmZRrJw-Vk9T3oOBuL53Dws9YUs3QIqyMugrSMMsjvwJgXZ9-NePUZ9OI7Iw%3D%3D%7C%7CNDHRnZ9Gz3KXlI-i9OnZqQ%3D%3D%7C5gDUJdTGiJzedmq9hanWYg%3D%3D%7CN7fu2vKt8_s%3D%7C5GsDmWBndvyMfRi4F3iGh4RXkrrbftuEPhTabBM-WuOkmBvu0X9VTHcJxOFN8G_G_kEYv-J-d0yb5VNt8nrK1P2xXvigL27H%7Cy2SqoJcE0s800pFvulyTZAYlAsjZnulS%7C&cc=BY&bf=0&vif=0&ugd=4&nse=3';
iframeURL += "&vi=1540878843591570316";var winScope = window;var vi = '1540878843591570316';var viComp = '1540878843591570316';var buckets = [{"bucket_id":230746,"percentage":"50"},{"bucket_id":230747,"percentage":"50"}];

function getRandomFromTo(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
} 

function getABTestBucket(){ 
	if(buckets && buckets.length > 0){
		var buckLen = buckets.length,
		randStr = getRandomFromTo(1, 100),
		sumBucket = 0;
		
		for(var l=0; l<buckLen; l++){
			sumBucket = parseInt(sumBucket) + parseInt(buckets[l]['percentage']);
			
			if(randStr <= sumBucket && buckets[l]['bucket_id']){
				iframeURL += '&bid='+buckets[l]['bucket_id'];
				return '';
			}
		}
	}
}
getABTestBucket();
var _mNObject = window._mN;
var _mNDetailsObject = window._mNDetails;
if(window._mNObject && _mNObject.util && _mNObject.util.triggerAdTagEvent) {
	_mNObject.util.triggerAdTagEvent('441289839',"layerTwoLoadCompleted", false, []);
	_mNObject.util.triggerAdTagEvent('441289839',"layerThreeLoadStarted", false, iframeURL);
}_mNDetailsObject.console = _mNDetailsObject.console || {};
if(window.buckets && window._mNDetailsObject && window._mNObject) {
    _mNDetailsObject.console['441289839'] = _mNDetailsObject.console['441289839'] || {};
	_mNDetailsObject.console['441289839'].buckets = buckets;
	window.buckets = undefined;
}
var locHash = '';
try{
	if(typeof _mNDetails != 'undefined'){ locHash += (typeof _mNDetails.getLocHash == 'function') ? _mNDetails.getLocHash('441289839', vi) : ((_mNDetails['locHash'] && _mNDetails['locHash']['441289839']) || '');}
	if(locHash != ''){
		locHash = '#'+locHash;
	}
	locHash += '&dytm=' + new Date().getTime();
}catch(e){}
iframeURL += locHash;
_mNDetails = (typeof _mNDetails != "undefined")?_mNDetails:{};
_mNDetails['locHash'] = _mNDetails['locHash'] || {};
_mNDetails['locHash']['441289839'] = locHash;
if (typeof _mNDetails.updateLocHash == "function") {
    _mNDetails.updateLocHash('441289839', vi, locHash);
}_mNDetails.amendToLocHash = function(str) {
if(vi) {
    if (typeof _mNDetails.updateLocHash == "function" && typeof _mNDetails.getLocHash == "function") {
        _mNDetails.updateLocHash('441289839', vi, _mNDetails.getLocHash('441289839', vi) + str);
    }
    else if(_mNDetails['locHash'] && _mNDetails['locHash']['441289839'] && _mNDetails['locHash'][vi]) {
        _mNDetails['locHash']['441289839'] += str;
        _mNDetails['locHash'][vi] += str;
    }
}
}
var l2ch = 3;
if(vi) {
    l2ch = 2;
    if(viComp) {
        l2ch  = (vi == viComp) ? 0 : 1;
    }
}
_mNDetails.amendToLocHash('&l2ch='+l2ch);            _mNDetails.amendToLocHash('&l2wsip=2886958065');
var _mN_mc_cnt = _mN_mc_cnt || 0;
var _mN_mc_frameID = '_mN_main_441289839'+'_'+_mN_mc_cnt++;
_mNDetails = (typeof _mNDetails != "undefined")?_mNDetails:{};
_mNDetails['iframeURL'] = _mNDetails['iframeURL'] || {};
_mNDetails['iframeURL']['441289839'] = iframeURL;
_mNDetails['iframeID'] = _mNDetails['iframeID'] || {};
_mNDetails['iframeID']['441289839'] = _mN_mc_frameID;var _mN_mainCont = '<!DOCTYPE html><html><head><scri' + 'pt type="text/javascript">var publisherScope = window.parent.winScope; var iframeID = typeof (frameID) !== "undefined" ? frameID : window.parent._mNDetails["iframeID"]["441289839"], callback = false, dyncId = iframeID.replace("main", "dy").replace(/_[0-9]*$/g, ""), mFrame = window.parent._mNDetails["iframeURL"]["441289839"].replace(/#.*/, "");function processL3() {loadL3();} window.parent.loadL3 = loadL3; function loadL3() { parent._mN_dy.putContent(iframeID, adContent.content, "0", "0", "", "12"); }; function getL3URL(urlFromL2) { var isSecureSrc = urlFromL2.indexOf("https") === 0, isWindowSecure = "https:" == document.location.protocol; if (!isWindowSecure || isSecureSrc) { return urlFromL2 + "&nb=1"; } try { (function(){        var localhash = (window._mNDetails && (typeof _mNDetails.getLocHash == \'function\' && _mNDetails.getLocHash(\'441289839\',\'1540878843591570316\') || (_mNDetails[\'locHash\'] && _mNDetails[\'locHash\'][\'441289839\']))) || \'\';		var imgUrl = \'https://lg3.media.net/flping.php?reason=34&action=15&cme=CO9JjDBY5XxPcA6icXxmdWBqZAuejTynt8pwxyjWUoNwfrp2bg1VNnKgOA-wSboo5xfMvF78tTYUhR91WCBfrPCDepzWr8deGdKP5MN3WYvjMSc28yEahiIHLhhPCDySJdwZL_d85Kp8g8vrhCaZHwOwBaJarLfxRS16I40ejxjCLXHoTaf_NV36tNmyNBBwvI138P9lk9X1OOMFuA5B4TcLtDHeV43tkXwaXYVzwf2zi9I4hwDvTjB7v2ofwwJD_eXpZzudWah24f8oKnWMSQSJuVvpMf_Zcj5b3AHBpisfBT9QHGTHVwEkYHaXGZp5Oi0ybfaadZfVPjIOyG0worfVnDWn4WxGGUDPv2Zsj2zoTM_jJ7fieFYGmpP6oewULYQecnbggsyWir2I5MdBwa2CA9oYbM7rO-EB3hLM77As5XyXYIzs983WlyslJxpiLUcjzO8Ep9rSWQ9ZCwLn4yHd_iY0V3pi6BrX6SkeoHeMrVijwJ6Q6vOtIbJ0VRzfYWOWdpIpyqXtwsYl4CSnp6Y2anZffSh6O3dzcUsU3gHHR_HE6TMl8A1jOLxo6VlB33y7yVUBG1lFeRvr8NHKfauifozA0hiVfrcS6KsiJm99jbdpWcR6ba9Wotr7CzfD8GCdK8WihAk%3D%7C%7C&gdpr=1&r=\'+new Date().getTime()+\'&\'+localhash.replace(/#/g, \'&\');		if(window._mN && _mN._util && _mN._util.logNBBeacons){			_mN._util.logNBBeacons(imgUrl);		}else if(window._mN && _mN.util && _mN.util.logBeacons){			_mN.util.logBeacons(imgUrl);		}else{			(new Image()).src = imgUrl;		}	})(); } catch (e) { } return ""; }; function createTag() { var l3src = getL3URL(mFrame); if (!l3src) { return; } var scr = document.createElement("script"); scr.onload = scr.onreadystatechange = function () { if (typeof adContent != "undefined" && !callback) { callback = true; processL3();} }; scr.type = "text/javascript"; scr.src = l3src; scr.async = "async"; document.getElementsByTagName("head")[0].appendChild(scr); };</scri' + 'pt></head><body onload="createTag()"></body></html>';
var _mN_dy = _mN_dy || {};_mN_dy.eventLib = {
	addEvent: function (elem, type, eventHandle) {
		if(elem.addEventListener) {
			elem.addEventListener( type, eventHandle, false );
		} else if ( elem.attachEvent ) {
			elem.attachEvent( "on" + type, eventHandle );
		}
		elem = null; // Handle Memory Leak
	},
	removeEvent: function(elem, type, eventHandle) {
		if (elem.removeEventListener) {
			elem.removeEventListener(type, eventHandle);
		} else if(elem.detachEvent) {
			elem.detachEvent('on' + type, eventHandle);
		}
		elem = null;
	}
};
_mN_dy.getContent = function (data, url, w, h, id, insl) {
	var frameObject = data;
	if (typeof frameObject == "object") {
		data = frameObject.data;
		url = frameObject.url;
		w = frameObject.width;
		h = frameObject.height;
		id = frameObject.id;
		insl = frameObject.isInsl;
	}
	var ifr = document.getElementById(id),
	errload = function(){_mN_dy.getContent(data, url, w, h, id);};

	if(!ifr){
		_mN_dy.eventLib.addEvent(document, 'DOMContentLoaded', errload);
		//_mN_dy.eventLib.addEvent(window, 'load', errload);
		ifr = null;
		return;
	}
	//_mN_dy.eventLib.removeEvent(window, 'load', errload);
	var doc,
	win = ifr.contentWindow || ifr.contentDocument;
	try {
		doc = (win && (win.document || win)) || false;
		if(doc) {
			doc.open();
			win.frameID = id;
			doc.write(data);
			doc.close();
			win.frameID = id;
			//win.locHash = window.locHash || null;
		}
	} catch (e) {
		_mN_dy.putContent(id, '', w, h, url, insl);
	}
}
_mN_dy.putContent = function (id, data, w, h, url, insl) {
	var frameObject = id;
	if (typeof frameObject == "object") {
		data = frameObject.data;
		url = frameObject.url;
		w = frameObject.width;
		h = frameObject.height;
		id = frameObject.id;
		insl = frameObject.isInsl ? '1' : '0';
	}
	var ifr = document.getElementById(id),
	mainFrame = document.createElement("iframe");
	mainFrame.marginWidth = 0;
	mainFrame.marginHeight = 0;
	mainFrame.scrolling = "no";
	mainFrame.frameBorder = 0;
	mainFrame.height = h;
	mainFrame.width = w;
	mainFrame.id = id+"_n";
	mainFrame.setAttribute('allowTransparency', "true");
	
	if(url != '' && data == ''){
		mainFrame.src = url;
	}
	try {
	    ifr.parentNode.insertBefore(mainFrame, ifr);
	} catch (ignore) {
		return;
	}
	if(url != '' && data == ''){
		mainFrame.parentNode.removeChild(ifr);
		return;
	}

	var win = mainFrame.contentWindow || mainFrame.contentDocument,
	doc = (win && (win.document || win)) || false;
	if(doc) {
		try {
			if(/msie/.test(navigator.userAgent.toLowerCase())){
				throw 10;
			}
			doc.open();
			win.frameId = id+"_n";
			doc.write(data);
			doc.close();
			win.frameId = id+"_n";
			//win.locHash = window.locHash || null;
		} catch (e) {
			win.data = data;
			doc.location.replace('javascript:window["data"];');
		}
	    if(insl && insl == '12'){           //12 is product id for exit interstitial
		    _mN_dy.exInttAd && _mN_dy.exInttAd.init && _mN_dy.exInttAd.init(mainFrame);
		}
		else if(insl && (insl == '6' || insl == '1')){
		_mN_dy.inttAd && _mN_dy.inttAd.init && _mN_dy.inttAd.init(mainFrame);
		}
		mainFrame.parentNode.removeChild(ifr);
	}
}; _mN_dy["ha_441289839"] = (function(){ var id = _mN_mc_frameID+"_n"; return function (){  if(document.getElementById(id)){document.getElementById(id).style.display="none";}};})(); 
(function(){
window._mNInslDisplay = true;
var ifrid = _mN_mc_frameID,
cont = _mN_mainCont,
url = iframeURL;

_mN_dy._mNCreateFrame = function (){
	if(document && document.getElementsByTagName && document.getElementById && document.body){
		
		var mainFrame = document.createElement("iframe");
		mainFrame.marginWidth = 0;
		mainFrame.marginHeight = 0;
		mainFrame.scrolling = "no";
		mainFrame.frameBorder = 0;
		mainFrame.height = '0';
		mainFrame.width = '0';
		mainFrame.id = ifrid;
		mainFrame.style.display = 'none';
		document.body.appendChild(mainFrame);
		_mN_dy.getContent(cont, url, '0', '0', ifrid, '1');
		
	}else{
		setTimeout(_mN_dy._mNCreateFrame, 15);
	}
}
})();_mN_dy._mNCreateFrame();    window.waitForEInsl = {};
    window.waitForEInsl['441289839'] = true;
    var exIntParams = {'crid' : 441289839, 'tm' : 360, 'dm' : '', 'inslntdy' : false, 'exTrgTm': 0};
!function(t,e,n,i){var s={cont:null,timerVal:t._mNInslTm||20,timeOutObj:null,crid:"",init:function(n){this.cont=n,this.cont.style.position="CSS1Compat"==e.compatMode?"fixed":"absolute",this.cont.style.left=t._mNInslLeftPx||"5px",this.cont.style.top=t._mNInslTopPx||"5px",this.cont.allowTransparency=this.chkVd(),this.cont.height=t._mNInslHeightPer||"99%",this.cont.width=t._mNInslWidthPer||"99%",this.cont.style.cssText=this.cont.style.cssText+";z-index:2147483647 !important;",this.atevL(),this.timer(this.timerVal)},timer:function(t){var n=this;return t<0?void this.close():(this.cont.contentWindow.document.getElementById("timerDiv")&&(e.body.innerText?this.cont.contentWindow.document.getElementById("timerDiv").innerText=t:this.cont.contentWindow.document.getElementById("timerDiv").innerHTML=t),t-=1,void(this.timeOutObj=setTimeout(function(){n.timer(t)},1e3)))},atevL:function(){this.eventLib&&(this.eventLib.addEvent(this.cont.contentWindow,"keydown",this.hanEscK),this.eventLib.addEvent(e,"keydown",this.hanEscK))},hanEscK:function(e){e=e||t.event,27!==e.keyCode&&27!==e.charCode||this.close()},close:function(){this.cont.style.display="none",clearTimeout(this.timeOutObj),this.eventLib&&(this.eventLib.removeEvent(this.cont.contentWindow,"keydown",this.hanEscK),this.eventLib.removeEvent(e,"keydown",this.hanEscK))},chkVd:function(){var t=navigator.appName,e=navigator.appVersion,n=parseFloat(e),i=navigator.userAgent;switch(t){case"Microsoft Internet Explorer":t="MSIE",n=i.substr(i.lastIndexOf("MSIE")+5,3);break;case"Netscape":i.lastIndexOf("Chrome/")>0?(t="Chrome",n=i.substr(i.lastIndexOf("Chrome/")+7,10)):i.lastIndexOf("Firefox/")>0?(t="Firefox",n=i.substr(i.lastIndexOf("Firefox/")+8,5)):i.lastIndexOf("Safari/")>0&&(t="Safari",n=i.substr(i.lastIndexOf("Safari/")+7,7));break;case"Opera":n=i.substr(i.lastIndexOf("Version/")+8,5)}if(t.match(/MSIE/)){if(n.match(/[678]/))return!1}else if(t.match(/Safari/)&&navigator.platform.match(/Win/))return!1;return!0},eventLib:{addEvent:function(t,e,n){t.addEventListener?t.addEventListener(e,n,!1):t.attachEvent&&t.attachEvent("on"+e,n),t=null},removeEvent:function(t,e,n){t.removeEventListener?t.removeEventListener(e,n):t.detachEvent&&t.detachEvent("on"+e,n),t=null}}};t.waitForEInsl&&"object"==typeof t.waitForEInsl&&"undefined"==typeof n.exInttAd?n.exInttAd=s:"undefined"==typeof n.inttAd&&(n.inttAd=s)}(window,document,_mN_dy);
!function(t,e,n,i,o){function s(e){a=!1,e=e?e:t.event,e.clientY<30&&(a=!0)}function c(e){e=e?e:t.event;var o=e.relatedTarget||e.toElement;if((!o||"HTML"==o.nodeName)&&e.clientY<10&&a){var s=d();(!i.exTrgTm||s-h>=i.exTrgTm)&&n.exInttAd.show()}}function m(n){this.cont=n,this.cont.style.display="none",this.cont.style.position="CSS1Compat"==e.compatMode?"fixed":"absolute",this.cont.style.left=t._mNInslLeftPx||"5px",this.cont.style.top=t._mNInslTopPx||"5px",this.cont.allowTransparency=this.chkVd(),this.cont.height=t._mNInslHeightPer||"99%",this.cont.width=t._mNInslWidthPer||"99%",this.cont.style.cssText=this.cont.style.cssText+";z-index:2147483647 !important;",this.atevL()}function r(){var o=this.cont.contentWindow||this.cont.contentDocument;this.cont.style.display="block",this.timer(this.timerVal),t.waitForEInsl[i.crid]=!1,o&&o.mUtil&&(o.mUtil.renderAdUnit(),l(),n.eventLib.removeEvent(e,"mouseout",n.exInttAd.checkMousePointer),/msie/.test(u)&&n.eventLib.removeEvent(e,"mousemove",n.exInttAd.mouseMoveDirection),_mNDetails._mNVI.trigger(this.cont))}function l(){var t=1,e="_mNExInsl",n=i.tm,o=i.dm;if(i.inslntdy){var s=_mN._util.mngc(e);s&&(s=parseInt(s),s++,t=s)}_mN.util.isStringSet(n)?_mN._util.mnsc(e,t,1,"/",o,"",n):_mN.util.isStringSet(o)?_mN._util.mnsc(e,t,1,"/",o):_mN._util.mnsc(e,t,1,"/")}function d(){return parseInt((new Date).getTime()/1e3,10)}var a=!0,u=t.navigator.userAgent.toLowerCase(),h=d();n.exInttAd&&!n.exInttAd.checkMousePointer&&(n.exInttAd.checkMousePointer=c,n.exInttAd.init=m,n.exInttAd.show=r,n.eventLib.addEvent(e,"mouseout",n.exInttAd.checkMousePointer),/msie/.test(u)&&(a=!1,n.exInttAd.mouseMoveDirection=s,n.eventLib.addEvent(e,"mousemove",n.exInttAd.mouseMoveDirection)))}(window,document,_mN_dy,exIntParams);        function isPreloadSupported(){
        	var linkElem = document.createElement('link'),
		    relList = linkElem.relList;
	        if (!(relList && typeof relList.supports === "function")){
		        return false;
	        }
	        return relList.supports('preload');
        }
        if (_mNDetails && !_mNDetails.plnr && isPreloadSupported()) {
            var headID = document.getElementsByTagName('head');
            if (headID && headID[0]) {
                var link = document.createElement('link');
                link.rel = 'preload';
                link.href = 'https://contextual.media.net/__media__/js/util/nrrV9233.js';
                link.as = "script";
                headID[0].appendChild(link);
                _mNDetails.plnr = 1;
            }
        };} catch (err){
					var errObj = {},
    					errStacktrace = '',
    					objTrace = '',
    					errorString = '',
    					userAgent = encodeURIComponent(window.navigator.userAgent);

					if (err.stack) {errStacktrace = err.stack;}
					else if (err.s) {errStacktrace = err.s;}
					else if (err.stacktrace) {errStacktrace = err.stacktrace;}
					else errStacktrace = 'No StackTrace';
					for ( var x in err) {
						if (err.hasOwnProperty && err.hasOwnProperty(x)) {
							objTrace += x + " : '" + err[x] + "',";
						}
					}
					errObj.stack = errStacktrace;
    				errObj.objTrace = objTrace;
    				errObj.layer = 'DynamicLayer';
    				if (typeof JSON === "object" && typeof JSON.stringify !== "undefined") {
            			errorString = JSON.stringify(errObj);
    				} else {
        				errorString = errStacktrace + '@#@' + objTrace + '@#@' + 'DynamicLayer';
    				}
					errorString = encodeURIComponent("[" + errorString + "]");
					var _mNurlsrc = 'https://lg3.media.net/nerrping.php?userAgent='+userAgent+'&cid=8CUQBB2U5&crid=441289839&d='+errorString+'&requrl='+encodeURIComponent(window.location.href)+'&img=logo.gif';
					var _mNImgx  = new Image();
					_mNImgx.src = _mNurlsrc ;
			}