!function(){function e(t,r,n){function i(s,a){if(!r[s]){if(!t[s]){var u="function"==typeof require&&require;if(!a&&u)return u(s,!0);if(o)return o(s,!0);var c=new Error("Cannot find module '"+s+"'");throw c.code="MODULE_NOT_FOUND",c}var f=r[s]={exports:{}};t[s][0].call(f.exports,function(e){return i(t[s][1][e]||e)},f,f.exports,e,t,r,n)}return r[s].exports}for(var o="function"==typeof require&&require,s=0;s<n.length;s++)i(n[s]);return i}return e}()({1:[function(e,t,r){"use strict";function n(e){function t(e,t){return y[e]=E.IN_PROGRESS,new u(function(r){t.instance.retrieve().then(function(){y[e]=E.COMPLETE,r()}).catch(function(t){y[e]=E.COMPLETE,r()})})}function r(){for(var e=[],r=u.defer(),n=Object.keys(g);n.length;){var o=f.randomSplice(n),s=g[o];if(s.enabled)try{e.push(t(o,s))}catch(e){}}return u.all(e).then(function(){i.emit("rti_partner_request_complete",{requestsCompleted:e.length}),r.resolve()}),r}function n(){for(var e in y)y.hasOwnProperty(e)&&y[e]!==E.COMPLETE&&i.emit("hs_identity_timeout",{statsId:g[e].instance.getStatsId()})}function p(){var e={};b||(b=!0,n());for(var t in g)if(g.hasOwnProperty(t)){var r=g[t];if(r.enabled){var i=r.instance.getResults();y[t]===E.COMPLETE?(e[t]=i?{data:i}:{data:{}},e[t].responsePending=!1):e[t]={data:{},responsePending:!0}}}return e}function v(){m===E.NOT_STARTED&&(_=r(),m=E.IN_PROGRESS)}var h,g,m,y,_,E={NOT_STARTED:0,IN_PROGRESS:1,COMPLETE:2},b=!1;return function(){i=c.services.EventsService,o=c.services.TimerService,h=a(),m=E.NOT_STARTED,y={},g=e.partners;for(var t=Object.keys(g),n=t.length-1;n>=0;n--){var s=f.randomSplice(t),u=g[s];if(u.enabled)try{var _=d[s];if(f.isObject(_)?u.instance=l(_,u.configs):u.instance=_(u.configs),!u.instance){u.enabled=!1;continue}y[s]=E.NOT_STARTED}catch(e){u.enabled=!1}}h._setDirectInterface("IdentityLayer",{retrieve:v,getAllPartnerResults:p,invokeAllPartners:r})}(),s.derive(h,{retrieve:v})}var i,o,s=e(5),a=e(2),u=e(10),c=e(29),f=e(14),l=e(19),d={AdserverOrgIp:e(18),MerkleIp:e(21),LiveRampIp:e(20)};t.exports=n},{}],2:[function(e,t,r){"use strict";function n(){function e(e,t){return i.resolve(t)}function t(e,t){u={},u[e]=t}function r(e){c=e}function n(){return u}function o(e){f=e}function s(e,t){return f(e,t)}function a(e,t){return i.resolve().then(function(){return c(e,t)})}var u,c,f;return function(){u=null,c=e,f=e}(),{_setDirectInterface:t,_setExecutor:r,_executeNext:s,setNext:o,getDirectInterface:n,execute:a}}var i=e(10);e(15);t.exports=n},{}],3:[function(e,t,r){"use strict";e(15);t.exports=function(){function e(e,t){return e=e||"http:",t=t||"https:","https:"===document.location.protocol?t:e}function t(){return("CSS1Compat"===y.document.compatMode?y.document.documentElement:y.document.body).clientWidth}function r(){return("CSS1Compat"===y.document.compatMode?y.document.documentElement:y.document.body).clientHeight}function n(){return y.screen.width}function i(){return y.screen.height}function o(){return document.referrer}function s(){return y.location.hostname}function a(){return navigator.userAgent}function u(){return navigator.language||navigator.browserLanguage||navigator.userLanguage||navigator.systemLanguage}function c(){return y.location.pathname}function f(){try{return window.top===window.self}catch(e){return!1}}function l(){return f()?location.href:document.referrer||location.href}function d(){try{return localStorage.setItem("test","test"),localStorage.removeItem("test"),!0}catch(e){return!1}}function p(e,t,r,n){try{for(var i,o=window,s=0;;)if(!(r&&s<r)){if(n&&s>n)break;if(e&&(i=e(o)))return i;var a;try{a=o.frameElement}catch(e){a=null}if(null===a){if(t&&(i=t(o)))return i;break}o=o.parent,s++}}catch(e){}return null}function v(e){return p(function(t){return t.hasOwnProperty(e)?t[e]:null})}function h(e,t){var r=t||y,n=r.document.createElement("iframe");return e&&(n.src=e),n.width=0,n.height=0,n.scrolling="no",n.marginWidth=0,n.marginHeight=0,n.frameBorder=0,n.setAttribute("style","border: 0px; vertical-align: bottom; visibility: hidden; display: none;"),r.document.body.appendChild(n),n}function g(e){var t=e+"=",r=y.document.cookie.split(";");for(var n in r)if(r.hasOwnProperty(n)){for(var i=r[n];" "===i.charAt(0);)i=i.substring(1,i.length);if(0===i.indexOf(t))return i.substring(t.length,i.length)}return null}function m(){var e=!1;try{new window.ActiveXObject("ShockwaveFlash.ShockwaveFlash")&&(e=!0)}catch(t){navigator.mimeTypes&&void 0!==navigator.mimeTypes["application/x-shockwave-flash"]&&navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin&&(e=!0)}return e}var y;return function(){y=p(null,function(e){return e})}(),{topWindow:y,getProtocol:e,isLocalStorageSupported:d,getViewportWidth:t,getViewportHeight:r,isTopFrame:f,getScreenWidth:n,getScreenHeight:i,getReferrer:o,getPageUrl:l,getHostname:s,getUserAgent:a,getLanguage:u,getPathname:c,getNearestEntity:v,traverseContextTree:p,createHiddenIFrame:h,readCookie:g,isFlashSupported:m}}()},{}],4:[function(e,t,r){"use strict";var n=e(3),i=e(14),o=e(13);t.exports=function(){function e(e){if(!a)return!1;try{localStorage.removeItem(u+e)}catch(e){return!1}return!0}function t(t){if(!a)return null;var r;try{r=JSON.parse(localStorage.getItem(u+t))}catch(e){return null}return null===r?null:!r.e||r.e<o.now()?(e(t),null):i.isObject(r.d)?{data:r.d,created:r.t,expires:r.e}:null}function r(e){var r=t(e);return r&&r.data}function s(e,t,r){if(!a)return!1;r>c&&(r=c);var n=o.now(),i={t:n,d:t,e:n+r};try{localStorage.setItem(u+e,JSON.stringify(i))}catch(e){return!1}return!0}var a,u="IXWRAPPER",c=6048e5;return function(){a=n.isLocalStorageSupported()}(),{deleteData:e,getEntry:t,getData:r,setData:s}}()},{}],5:[function(e,t,r){"use strict";e(15);t.exports=function(){function e(e){for(var t in e)e.hasOwnProperty(t)&&"_"===t[0]&&"__"!==t.slice(0,2)&&delete e[t];return e}function t(t,r){var n,i={};for(n in t)t.hasOwnProperty(n)&&(i[n]=t[n]);for(n in r)r.hasOwnProperty(n)&&(i[n]=r[n]);return e(i)}return{derive:t}}()},{}],6:[function(e,t,r){"use strict";function n(e){function t(e){if(i.isFunction(e))try{e()}catch(e){}}return function(){if(i.isArray(e))for(var t=0;t<e.length;t++)try{e[t]()}catch(e){}}(),{push:t}}var i=e(14);t.exports=n},{}],7:[function(e,t,r){"use strict";var n={DEFAULT_UID_LENGTH:8,MIN_BANNER_DIMENSION:1,MIN_BID_FLOOR:0,MIN_SITE_ID:0,DEFAULT_UID_CHARSET:"ALPHANUM",SESSION_ID_LENGTH:8,PUBKIT_AD_ID_LENGTH:16,RENDER_SERVICE_EXPIRY_SWEEP_TIMER:3e4,DEFAULT_PARTNER_PRIORITY:1,LineItemTypes:{ID_AND_SIZE:1,ID_AND_PRICE:2,CUSTOM:3},DeviceTypeMethods:{USER_AGENT:1,REFERENCE:2,SIZE_MAPPING:3},RequestArchitectures:{MRA:1,SRA:2},InitialLoadStates:{DISABLED:1,ENABLED:2},MediationLevels:{NONE:1,HT_SLOT:2,PARTNER:3}};t.exports=n},{}],8:[function(e,t,r){"use strict";function n(e){function t(){return a.mobile()?n.DeviceTypes.MOBILE:(a.tablet(),n.DeviceTypes.DESKTOP)}function r(){var t;try{t=eval(e.configs.reference)}catch(e){throw s("INTERNAL_ERROR","DeviceTypeChecker: could not eval() `reference`.")}if(!o.isFunction(t)){if(o.isString(t))return t;throw s("INVALID_TYPE","DeviceTypeChecker: `reference` must refer to a function or a string")}try{return t()}catch(e){throw s("INTERNAL_ERROR","DeviceTypeChecker: could not execute `reference` function.")}}function u(){switch(c){case i.DeviceTypeMethods.USER_AGENT:return t();case i.DeviceTypeMethods.REFERENCE:return r();default:return t()}}var c;return function(){c=i.DeviceTypeMethods[e.method]||i.DeviceTypeMethods.USER_AGENT}(),{getDeviceType:u}}var i=e(7),o=e(14),s=e(15),a=e(9);n.isValidDeviceType=function(e){for(var t in n.DeviceTypes)if(n.DeviceTypes.hasOwnProperty(t)&&"TABLET"!==t&&e===n.DeviceTypes[t])return!0;return!1},n.DeviceTypes={DESKTOP:"desktop",MOBILE:"mobile",TABLET:"tablet"},t.exports=n},{}],9:[function(e,t,r){"use strict";var n,i,o;n={},o=window.navigator.userAgent.toLowerCase(),n.ios=function(){return n.iphone()||n.ipod()||n.ipad()},n.iphone=function(){return!n.windows()&&i("iphone")},n.ipod=function(){return i("ipod")},n.ipad=function(){return i("ipad")},n.android=function(){return!n.windows()&&i("android")},n.androidPhone=function(){return n.android()&&i("mobile")},n.androidTablet=function(){return n.android()&&!i("mobile")},n.blackberry=function(){return i("blackberry")||i("bb10")||i("rim")},n.blackberryPhone=function(){return n.blackberry()&&!i("tablet")},n.blackberryTablet=function(){return n.blackberry()&&i("tablet")},n.windows=function(){return i("windows")},n.windowsPhone=function(){return n.windows()&&i("phone")},n.windowsTablet=function(){return n.windows()&&i("touch")&&!n.windowsPhone()},n.fxos=function(){return(i("(mobile;")||i("(tablet;"))&&i("; rv:")},n.fxosPhone=function(){return n.fxos()&&i("mobile")},n.fxosTablet=function(){return n.fxos()&&i("tablet")},n.meego=function(){return i("meego")},n.mobile=function(){return n.androidPhone()||n.iphone()||n.ipod()||n.windowsPhone()||n.blackberryPhone()||n.fxosPhone()||n.meego()},n.tablet=function(){return n.ipad()||n.androidTablet()||n.blackberryTablet()||n.windowsTablet()||n.fxosTablet()},n.desktop=function(){return!n.tablet()&&!n.mobile()},i=function(e){return-1!==o.indexOf(e)},t.exports=n},{}],10:[function(e,t,r){function n(){}function i(e){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],f(e,this)}function o(e,t){for(;3===e._state;)e=e._value;if(0===e._state)return void e._deferreds.push(t);e._handled=!0;var r=1===e._state?t.onFulfilled:t.onRejected;if(null===r)return void(1===e._state?s:a)(t.promise,e._value);var n;try{n=r(e._value)}catch(e){return void a(t.promise,e)}s(t.promise,n)}function s(e,t){try{if(t===e)throw new TypeError("A promise cannot be resolved with itself.");if(t&&("object"==typeof t||"function"==typeof t)){var r=t.then;if(t instanceof i)return e._state=3,e._value=t,void u(e);if("function"==typeof r)return void f(bind(r,t),e)}e._state=1,e._value=t,u(e)}catch(t){a(e,t)}}function a(e,t){e._state=2,e._value=t,u(e)}function u(e){for(var t=0,r=e._deferreds.length;t<r;t++)o(e,e._deferreds[t]);e._deferreds=null}function c(e,t,r){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.promise=r}function f(e,t){var r=!1;try{e(function(e){r||(r=!0,s(t,e))},function(e){r||(r=!0,a(t,e))})}catch(e){if(r)return;r=!0,a(t,e)}}i.prototype.catch=function(e){return this.then(null,e)},i.prototype.then=function(e,t){var r=new this.constructor(n);return o(this,new c(e,t,r)),r},i.all=function(e){var t=Array.prototype.slice.call(e);return new i(function(e,r){function n(o,s){try{if(s&&("object"==typeof s||"function"==typeof s)){var a=s.then;if("function"==typeof a)return void a.call(s,function(e){n(o,e)},r)}t[o]=s,0==--i&&e(t)}catch(e){r(e)}}if(0===t.length)return e([]);for(var i=t.length,o=0;o<t.length;o++)n(o,t[o])})},i.resolve=function(e){return e&&"object"==typeof e&&e.constructor===i?e:new i(function(t){t(e)})},i.reject=function(e){return new i(function(t,r){r(e)})},i.defer=function(){var e={};return e.promise=new i(function(t,r){e.resolve=t,e.reject=r}),e},t.exports=i},{}],11:[function(e,t,r){"use strict";t.exports=function(e){e=e.toLowerCase();var t=/(edge)\/([\w.]+)/.exec(e)||/(opr)[\/]([\w.]+)/.exec(e)||/(chrome)[ \/]([\w.]+)/.exec(e)||/(iemobile)[\/]([\w.]+)/.exec(e)||/(version)(applewebkit)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(e)||/(webkit)[ \/]([\w.]+).*(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(e)||/(webkit)[ \/]([\w.]+)/.exec(e)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e)||/(msie) ([\w.]+)/.exec(e)||e.indexOf("trident")>=0&&/(rv)(?::| )([\w.]+)/.exec(e)||e.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e)||[],r={},n={browser:t[5]||t[3]||t[1]||"",version:t[2]||t[4]||"0",versionNumber:t[4]||t[2]||"0"};if(n.browser&&(r[n.browser]=!0,r.version=n.version,r.versionNumber=parseInt(n.versionNumber,10)),r.rv||r.iemobile){n.browser="msie",r.msie=!0}if(r.edge){delete r.edge;n.browser="msedge",r.msedge=!0}if(r.opr){n.browser="opera",r.opera=!0}if(r.safari&&r.android){n.browser="android",r.android=!0}if(r.safari&&r.kindle){n.browser="kindle",r.kindle=!0}if(r.safari&&r.silk){n.browser="silk",r.silk=!0}return r.name=n.browser,r}(window.navigator.userAgent)},{}],12:[function(e,t,r){"use strict";var n=e(29),i=e(13),o=e(14),s=e(15),a=e(11);t.exports=function(){function e(){return l}function t(e){var t="";for(var r in e)if(e.hasOwnProperty(r))if(o.isObject(e[r]))for(var n in e[r])e[r].hasOwnProperty(n)&&(t+=r+"%5B"+n+"%5D="+encodeURIComponent(e[r][n])+"&");else if(o.isArray(e[r]))for(var i=0;i<e[r].length;i++)t+=r+"%5B%5D="+encodeURIComponent(e[r][i])+"&";else t+=r+"="+encodeURIComponent(e[r])+"&";return t.slice(0,-1)}function r(e,r,n){return"/"!==e[e.length-1]&&r&&(e+="/"),r=r||[],o.isObject(n)&&(n=t(n)),n=n?"?"+n:"",e+r.join("/")+n}function u(e){var s,u=null,c=e.scope||window;if(e.useImgTag)s=c.document.createElement("img");else{s=c.document.createElement("script"),s.type="text/javascript";var f=!0;e.hasOwnProperty("async")&&(f=e.async),s.async=f}var l=e.url;if(e.data){var d;d=o.isString(e.data)?e.data:t(e.data),l=r(e.url,null,d)}var p,v=!1,h=function(){try{if(v)return;v=!0,e.onTimeout&&e.onTimeout(),e.useImgTag||e.continueAfterTimeout||s.parentNode.removeChild(s)}catch(e){}};e.globalTimeout&&n.services.TimerService.addTimerCallback(e.sessionId,h),e.timeout&&(p=setTimeout(h,e.timeout));var g=function(){try{if(v){if(!e.continueAfterTimeout)return}else clearTimeout(p);e.onSuccess&&e.onSuccess(null,i.now(),v),v=!0,e.useImgTag||s.parentNode.removeChild(s)}catch(e){}};null===s.onload?s.onload=g:s.onreadystatechange=function(){"loaded"!==s.readyState&&"complete"!==s.readyState||(s.onreadystatechange=null,g())};var m=function(){try{if(v){if(!e.continueAfterTimeout)return}else clearTimeout(p),v=!0;e.onFailure&&e.onFailure(),e.useImgTag||s.parentNode.removeChild(s)}catch(e){}};if(s.onerror=m,u=i.now(),s.src=l,!e.useImgTag){var y=c.document.getElementsByTagName("script")[0];y?y.parentNode.insertBefore(s,y):a.msie||a.msedge||a.mozilla?c.onload=function(){c.document.body.appendChild(s)}:c.document.body.appendChild(s)}return u}function c(a){if(!e()){if(a.jsonp&&"GET"===a.method)return u(a);throw s("INTERNAL_ERROR","XHR is not supported in this browser.")}var c=null,f=a.scope||window,l=new f.XMLHttpRequest,d=a.url,p=null;if(a.data)if("GET"===a.method){var v;v=o.isString(a.data)?a.data:t(a.data),d=r(a.url,null,v)}else"POST"===a.method&&(p=o.isString(a.data)?a.data:JSON.stringify(a.data));var h=!0;a.hasOwnProperty("async")&&(h=a.async),l.open(a.method,d,h);var g="application/x-www-form-urlencoded; charset=UTF-8";if(void 0!==a.contentType&&(g=a.contentType),g&&l.setRequestHeader("Content-Type",g),a.headers){a.headers.hasOwnProperty("X-Request-With")||l.setRequestHeader("X-Request-With","XMLHttpRequest");for(var m in a.headers)a.headers.hasOwnProperty(m)&&l.setRequestHeader(m,a.headers[m])}a.withCredentials&&(l.withCredentials=!0);var y,_=!1,E=function(){try{if(_)return;_=!0,a.onTimeout&&a.onTimeout()}catch(e){}};return a.globalTimeout&&n.services.TimerService.addTimerCallback(a.sessionId,E),a.timeout&&(a.continueAfterTimeout?y=setTimeout(E,a.timeout):(l.timeout=a.timeout,l.ontimeout=E)),(a.onSuccess||a.onFailure)&&(l.onreadystatechange=function(){if(4===l.readyState){if(_){if(!a.continueAfterTimeout)return}else clearTimeout(y),l.ontimeout=null;if(200===l.status){if(a.onSuccess)try{a.onSuccess(l.responseText,i.now(),_)}catch(e){}}else if(a.onFailure)try{a.onFailure(l.status)}catch(e){}_=!0}}),c=i.now(),l.send(p),c}function f(e){return e.useImgTag=!0,u(e)}var l;return function(){l=window.XMLHttpRequest&&"string"==typeof(new XMLHttpRequest).responseType}(),{ajax:c,jsonp:u,img:f,buildUrl:r,objToQueryString:t,isXhrSupported:e}}()},{}],13:[function(e,t,r){"use strict";var n=e(7);e(15);t.exports=function(){function e(e,t){e.open("text/html","replace"),e.write(t),e.close()}function t(e,t){e=e||n.DEFAULT_UID_LENGTH,t=t||n.DEFAULT_UID_CHARSET;for(var r="",i=0;i<e;i++)r+=u[t].charAt(Math.floor(Math.random()*u[t].length));return r}function r(){return t(8,"HEX")+"-"+t(4,"HEX")+"-4"+t(3,"HEX")+"-"+"89ab".charAt(Math.floor(4*Math.random()))+t(3,"HEX")+"-"+t(8,"HEX")}function i(){return(new Date).getTime()}function o(){return a.getTimezoneOffset()}function s(){}var a,u={ALPHANUM:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",ALPHA:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",ALPHA_UPPER:"ABCDEFGHIJKLMNOPQRSTUVWXYZ",ALPHA_LOWER:"abcdefghijklmnopqrstuvwxyz",HEX:"0123456789abcdef",NUM:"0123456789"};return function(){a=new Date}(),{UidCharacterSets:u,generateUniqueId:t,generateUuid:r,now:i,getTimezoneOffset:o,documentWrite:e,noOp:s}}()},{}],14:[function(e,t,r){"use strict";var n=e(15);t.exports=function(){function e(e){return void 0===e?"undefined":{}.toString.call(e).match(A)[1].toLowerCase()}function t(t){return"string"===e(t)}function r(t){return"number"===e(t)&&!isNaN(t)}function i(t){return"number"===e(t)||"string"===e(t)&&!isNaN(Number(t))}function o(e){return r(e)&&e%1==0}function s(t){return"function"===e(t)}function a(t){return"boolean"===e(t)}function u(t){return"object"===e(t)}function c(t){return"regexp"===e(t)}function f(e,t){var r=e.indexOf(t);r>-1&&e.splice(r,1)}function l(r,i,o){if("array"!==e(r))return!1;if(void 0!==i){if(!t(i))throw n("INVALID_TYPE","`type` must be a string");if("class"===i){if(!t(o))throw n("INVALID_TYPE","`className` must be a string");for(var s=0;s<r.length;s++)if("object"!=typeof r[s]||r[s].__type__!==o)return!1}else for(var a=0;a<r.length;a++)if(e(r[a])!==i)return!1}return!0}function d(e){return e.length?e.splice(Math.floor(Math.random()*e.length),1)[0]:null}function p(e){var t,r,n;for(n=e.length-1;n>0;n--)t=Math.floor(Math.random()*(n+1)),r=e[n],e[n]=e[t],e[t]=r;return e}function v(e){return JSON.parse(JSON.stringify(e))}function h(){for(var e=Array.prototype.slice.call(arguments),t={},r=0;r<e.length;r++)for(var n in e[r])e[r].hasOwnProperty(n)&&(t[n]=e[r][n]);return t}function g(){for(var e=Array.prototype.slice.call(arguments),t=[],r=0;r<e.length;r++)for(var n=0;n<e[r].length;n++)t.push(e[r][n]);return t}function m(e){if(t(e)){if(""!==e)return!1}else if(u(e)){for(var r in e)if(e.hasOwnProperty(r))return!1}else{if(!l(e))throw n("INVALID_TYPE","`entity` must be either a string, object, or an array");if(e.length)return!1}return!0}function y(e,t,r){void 0===r&&(r=O);for(var n=0;n<e.length;n++){for(var i=!1,o=0;o<t.length&&!(i=r(e[n],t[o]));o++);if(!i)return!1}return!0}function _(e,t,r,n){return t=t||[],n=n||null,r=r||"Error occurred while calling function.",function(){try{e.apply(n,t)}catch(e){}}}function E(e,t){var r=""+e;if(t=+t,t!=t&&(t=0),t<0)throw new RangeError("repeat count must be non-negative");if(t==1/0)throw new RangeError("repeat count must be less than infinity");if(t=Math.floor(t),0==r.length||0==t)return"";if(r.length*t>=1<<28)throw new RangeError("repeat count must not overflow maximum string size");for(var n="",i=0;i<t;i++)n+=r;return n}function b(e,t,r){return t>>=0,r=String(r||" "),e.length>t?String(e):(t-=e.length,t>r.length&&(r+=E(r,t/r.length)),r.slice(0,t)+String(e))}function w(e,t,r){return t>>=0,r=String(r||" "),e.length>t?String(e):(t-=e.length,t>r.length&&(r+=E(r,t/r.length)),String(e)+r.slice(0,t))}function T(e,t){t=t||null;try{return eval.call(t,e)}catch(e){}return null}function S(e,t,r){r=r||null;try{return eval.call(r,e+"("+t.join()+")")}catch(e){}return null}function I(){for(var e=Array.prototype.slice.call(arguments),t=e[0],r=1;r<e.length;r++)Array.prototype.push.apply(t,e[r]);return t}function P(){for(var e=Array.prototype.slice.call(arguments),t=e[0],r=1;r<e.length;r++){var n=e[r];for(var i in n)n.hasOwnProperty(i)&&(t[i]=n[i])}return t}var A=/\s([a-zA-Z]+)/,O=function(e,t){return e===t};return{randomSplice:d,shuffle:p,deepCopy:v,mergeObjects:h,mergeArrays:g,isArray:l,isEmpty:m,isInteger:o,isString:t,isNumeric:i,isRegex:c,isNumber:r,isBoolean:a,isFunction:s,isObject:u,isArraySubset:y,getType:e,tryCatchWrapper:_,arrayDelete:f,repeatString:E,padStart:b,padEnd:w,evalVariable:T,evalFunction:S,appendToArray:I,appendToObject:P}}()},{}],15:[function(e,t,r){"use strict";function n(e,t){return new Error(e+": "+t)}n.ErrorTokens={MISSING_ARGUMENT:1,INVALID_TYPE:2,INVALID_VALUE:3,MISSING_PROPERTY:4,NUMBER_OUT_OF_RANGE:5,EMPTY_ENTITY:6,INTERNAL_ERROR:7,DUPLICATE_ENTITY:8,INVALID_ARGUMENT:9,INVALID_CONFIG:10},t.exports=n},{}],16:[function(e,t,r){"use strict";function n(e){function t(){return r}var r;return function(){o.DeviceTypeChecker=i(e.DeviceTypeChecker),r={Services:{},Layers:{}};for(var t=0;t<a.length;t++){var n=a[t].name,c=a[t].constructor(e.Services[n]);c&&(o.services[n]=c,c.getDirectInterface&&c.getDirectInterface()&&(r.Services=s.mergeObjects(r.Services,c.getDirectInterface())))}for(var f,l=e.Layers.length-1;l>=0;l--){var d=e.Layers[l].layerId,p=u[d](e.Layers[l].configs);p.getDirectInterface()&&(r.Layers=s.mergeObjects(r.Layers,p.getDirectInterface())),f&&p.setNext(f.execute),f=p}}(),{getDirectInterface:t}}var i=e(8),o=e(29),s=e(14),a=(e(15),[{name:"EventsService",constructor:e(22)},{name:"GptService",constructor:e(25)},{name:"PublisherSonarService",constructor:e(26)},{name:"HeaderStatsService",constructor:e(23)},{name:"TimerService",constructor:e(27)},{name:"ComplianceService",constructor:e(24)}]),u={IdentityLayer:e(1)};t.exports=n},{}],17:[function(e,t,r){"use strict";function n(){function e(e){for(var t="",r=0;r<e.length-3;r++)t+=String.fromCharCode(e.charCodeAt(r)-4);return t}function t(t,r){var o=e(r.partner),u=r.sessionId,p=r.status;if(u&&"success"===p){var v=s.now();if(l[u]===g.DONE){var h=i.getData(n.STORAGE_KEY_NAME);if(null===h||!h.hasOwnProperty("prt")||!a.isArray(h.prt))return;h=h.prt;for(var m=0;m<h.length;m++)if(h[m].sId===u&&h[m].sst){h[m].rt.hasOwnProperty(o)||(h[m].rt[o]=[]),h[m].rt[o].unshift(v-h[m].sst),i.setData(n.STORAGE_KEY_NAME,{prt:h},d);break}}else{if(!c[u])return;f.hasOwnProperty(u)||(f[u]={}),f[u].hasOwnProperty(o)||(f[u][o]=[]),f[u][o].push(v-c[u])}}}function r(e){var t=e.length;if(0===t)return 0;for(var r=0,n=0;n<t;n++)r+=e[n];return r/t}function u(e){var t=i.getData(n.STORAGE_KEY_NAME);if(null===t||!t.hasOwnProperty("prt")||!a.isArray(t.prt)||0===t.prt.length)return e;t=t.prt;for(var o=[],s=0;s<t.length;s++)if(t[s].hasOwnProperty("rt"))for(var u in t[s].rt)if(t[s].rt.hasOwnProperty(u)){var c=r(t[s].rt[u]);0!==c&&o.push(c)}var f=r(o);if(0===f)return e;for(var l=o.length,d=0,g=0;g<l;g++)d+=Math.pow(o[g]-f,2);d=Math.sqrt(d/l);var m=Math.floor(f+2*d+p),y=Math.floor(e*v),_=Math.floor(e*h);return m<y?m=y:m>_&&(m=_),m}var c,f,l,d=6048e5,p=100,v=.8,h=3,g={IPR:0,DONE:1},m={hs_session_start:function(e){var t=e.sessionId;c.hasOwnProperty(t)&&l[t]===g.IPR||(c[t]=s.now(),l[t]=g.IPR)},hs_session_end:function(e){var t=e.sessionId;if(c[t]&&l[t]===g.IPR){l[t]=g.DONE;var r=i.getData(n.STORAGE_KEY_NAME);null!==r&&r.hasOwnProperty("prt")&&a.isArray(r.prt)?(r=r.prt,r.length>=5&&r.pop()):r=[],r.unshift({sId:t,sst:c[t],rt:f[t]||{}}),i.setData(n.STORAGE_KEY_NAME,{prt:r},d),delete f[t],delete c[t]}},partner_request_complete:function(e){t("partner_request_complete",e)}};return function(){for(var e in m)m.hasOwnProperty(e)&&o.services.EventsService.on(e,m[e]);l={},f={},c={}}(),{getTimeout:u}}var i=e(4),o=e(29),s=e(13),a=e(14);n.STORAGE_KEY_NAME="lib_mem",t.exports=n},{}],18:[function(e,t,r){"use strict";function n(){var e={ttd_pid:a,fmt:u,p:o.configs.publisherId};o.Utilities.ajax({url:o.Utilities.getProtocol()+s,method:"GET",data:e,onSuccess:function(e){try{var t=JSON.parse(e);if(!t.TDID)return void o.registerError("response does not contain TDID");var r=[];for(var n in t)t.hasOwnProperty(n)&&r.push({id:t[n],ext:{rtiPartner:n}});o.registerMatch({source:c.source,uids:r})}catch(e){o.registerError("response is not valid JSON")}},onFailure:function(e){o.registerError("API returned error response "+e)}})}function i(e){o=e,o.onRetrieve(n)}var o,s="//match.adsrvr.org/track/rid",a="casale",u="json",c={partnerId:"AdserverOrgIp",statsId:"ADSORG",version:"1.3.0",source:"adserver.org",cacheExpiry:{match:6048e5,pass:864e5,error:864e5},targetingKeys:{exchangeBidding:"ixpid_1"}};t.exports={type:"identity",api:"1",main:i,profile:c}},{}],19:[function(e,t,r){"use strict";function n(e,t){function r(e){return!!(e&&e.uids&&p.isString(e.source)&&p.isArray(e.uids))&&e.uids.every(function(e){return Boolean(!p.isEmpty(e)&&e.id)})}function n(e,t){var r={match:"hs_identity_response",pass:"hs_identity_pass",error:"hs_identity_error"}[e];o.emit(r,{statsId:L}),o.emit("ip_module_result_"+x,e,t),"match"===e&&(C=t)}function v(e,t){if(!q){if(q=!0,D.cacheExpiry){var r={response:e,version:D.version};"pass"!==e&&(r.data=t),Object.keys(U).length&&(r.consent=U);var i=D.cacheExpiry[e];u.setData(F,r,i)}n(e,t),j&&j()}}function h(e){if(!i.isPrivacyEnabled())return null;if("gdpr"===e){var t=i.gdpr.getConsent();return t&&t.consentString&&(U.gdpr=!0),t}return null}function g(e){var t=u.getData(e);return t&&"match"===t.response&&t.data?t.data:null}function m(e){var t={url:e.url,method:e.method,async:!0,withCredentials:!0,jsonp:!1,continueAfterTimeout:!1,timeout:e.timeout||0};return e.onSuccess&&(t.onSuccess=e.onSuccess),e.onTimeout&&(t.onTimeout=e.onTimeout),e.onFailure&&(t.onFailure=e.onFailure),void 0!==e.data&&(t.data=e.data),void 0!==e.contentType&&(t.contentType=e.contentType),c.ajax(t)}function y(){return D.sonar&&D.sonar.enabled?s.getSonarPayload(D.sonar.entrypoints):{}}function _(e){k=e}function E(e){return Boolean(D.sonar&&D.sonar.enabled&&s.getLastUpdated(y())>e.created)}function b(e){return!(!D.consent||!i.isPrivacyEnabled())&&((!e.data.consent||!p.isArraySubset(Object.keys(D.consent),Object.keys(e.data.consent)))&&i.wait().then(function(){return Object.keys(D.consent).some(function(t){if(e.data.consent&&e.data.consent[t])return!1;var r=i[t].getConsent();return r&&r.consentString})}))}function w(e){return e.data.version!==D.version}function T(e){return!r(e.data.data)}function S(){return D.consent&&i.isPrivacyEnabled()?i.wait():null}function I(){var e=u.getEntry(F);return f.resolve().then(function(){if(!e)return null;var t=H[e.data.response];return t?f.all(t.map(function(t){return t.call(null,e)})):null}).then(function(t){return!t||t.indexOf(!0)>-1?null:(o.emit("hs_identity_cached",{statsId:L}),n(e.data.response,e.data.data),e.data)})}function P(){return f.resolve().then(function(){return f.all(G.map(function(e){return e.call()}))}).then(function(){return new f(function(e){o.emit("hs_identity_request",{statsId:L}),q=!1,j=e,o.emit("ip_module_retrieve_"+x)})})}function A(){return L}function O(){return C}function N(){if(k)return k;if(C&&p.isArray(C.uids)&&C.uids.length&&C.uids[0].id){var e={};return e[D.targetingKeys.exchangeBidding]=C.uids[0].id,e}return null}function R(){return I().then(function(e){return e?null:P()})}var D,x,L,M,C,k,U,j,F,q,H={match:[E,T],pass:[E,b,w],error:[w]},G=[S];return function(){i=l.services.ComplianceService,o=l.services.EventsService,s=l.services.PublisherSonarService,D=e.profile,x=D.partnerId,L=D.statsId,C=null,k=null,j=null,F=x,U={},M={Utilities:{buildUrl:c.buildUrl,getPageUrl:a.getPageUrl,getProtocol:a.getProtocol,getReferrer:a.getReferrer,getTime:d.now,getType:p.getType,isArray:p.isArray,isEmpty:p.isEmpty,isFunction:p.isFunction,isInteger:p.isInteger,isNumeric:p.isNumeric,isString:p.isString,isObject:p.isObject,isTopFrame:a.isTopFrame,isXhrSupported:c.isXhrSupported,readCookie:a.readCookie,ajax:m,getConsent:h,getIdentityResultFrom:g,getPublisherSonarData:y},onRetrieve:o.on.bind(null,"ip_module_retrieve_"+x),onResult:o.on.bind(null,"ip_module_result_"+x),registerMatch:v.bind(null,"match"),registerPass:v.bind(null,"pass"),registerError:v.bind(null,"error"),registerEbTargeting:_,configs:t},e.main(M)}(),{getStatsId:A,getResults:O,getTargets:N,retrieve:R}}var i,o,s,a=e(3),u=e(4),c=e(12),f=e(10),l=e(29),d=e(13),p=e(14);t.exports=n},{}],20:[function(e,t,r){"use strict";function n(){var e={pid:a,rt:"envelope"},t=o.Utilities.getConsent("gdpr");t&&t.consentString&&t.version&&(e[l.consent.gdpr]=t.consentString,1==t.version?e[f]=1:2==t.version&&(e[f]=4));var r=[],n=l.sonar.entrypoints[0].key,i=o.Utilities.getPublisherSonarData();i&&i.hasOwnProperty(n)&&(e[n]=i[n].data,e[u]=c,r.push(i[n].meta)),o.Utilities.ajax({url:o.Utilities.getProtocol()+s,method:"GET",data:e,onSuccess:function(e){try{var t,n=JSON.parse(e);if(!o.Utilities.isObject(n))return void o.registerError("invalid response");if(o.Utilities.isEmpty(n))return void o.registerPass();if(!n.hasOwnProperty("envelope"))return void o.registerError("invalid envelope object");if(o.Utilities.isEmpty(n.envelope))return void o.registerPass();t={source:l.source,uids:[{id:n.envelope,ext:{rtiPartner:"idl"}}]},r.length&&(t.ext={sonar:r}),o.registerMatch(t)}catch(e){o.registerError("response is not valid JSON")}},onFailure:function(e){204===e?o.registerPass():o.registerError("API returned error response "+e)}})}function i(e){o=e,window.ats&&window.ats.retrieveEnvelope(function(e){if(e)try{var t=JSON.parse(e).envelope;o.registerMatch({source:l.source,uids:[{id:t,ext:{rtiPartner:"idl"}}]})}catch(e){}}),o.onRetrieve(n)}var o,s="//api.rlcdn.com/api/identity",a=2,u="it",c=4,f="ct",l={partnerId:"LiveRampIp",statsId:"LVRAMP",version:"1.3.0",source:"liveramp.com",cacheExpiry:{match:864e5,pass:864e5,error:864e5},consent:{gdpr:"cv"},targetingKeys:{exchangeBidding:"ixpid_3"},sonar:{enabled:!0,entrypoints:[{key:"iv",filter:{attr:1,algo:1}}]}};t.exports={type:"identity",api:"1",main:i,profile:l}},{}],21:[function(e,t,r){"use strict";function n(e,t){var r=[],n=s.Utilities.getPublisherSonarData();if(!s.configs.enable4CiteTag)for(var i in n)n.hasOwnProperty(i)&&(e[i]=n[i].data,r.push(n[i].meta));s.Utilities.ajax({url:s.Utilities.getProtocol()+t,method:"GET",data:e,onSuccess:function(e){try{var t,n=JSON.parse(e);if(!s.Utilities.isObject(n))return void s.registerError("invalid response");n.c&&n.c.value&&localStorage.setItem("_svsid",n.c.value);var i=[];if(n.ppid){if(!n.ppid.id)return void s.registerError("invalid ppid object");i.push({id:n.ppid.id,ext:{enc:0}})}if(n.pam_id&&!a.msie){if(!n.pam_id.id||!n.pam_id.keyID)return void s.registerError("invalid pam_id object");i.push({id:n.pam_id.id,ext:{keyID:n.pam_id.keyID,enc:1}})}i.length?(t={source:l.source,uids:i},r.length>0&&(t.ext={sonar:r}),s.registerMatch(t)):s.registerPass()}catch(e){s.registerError("response is not valid JSON")}},onFailure:function(e){s.registerError("API returned error response "+e)}})}function i(){var e="",t={};s.configs.enable4CiteTag?(localStorage.getItem("__svsid")&&localStorage.removeItem("__svsid"),e=localStorage.getItem("_svsid")?localStorage.getItem("_svsid"):null,t.vendor="idsv2",t.sv_cid="5274_04512",t.sv_pubid=s.configs.pubid,t.sv_domain=document.location.hostname,e&&(t.sv_session=e),n(t,c)):(t.ptk=f,t.pubid=s.configs.pubid,n(t,u))}function o(e){s=e,s.onRetrieve(i)}var s,a=e(11),u="//mid.rkdms.com/idsv2",c="//id.sv.rkdms.com/identity/",f="17c1789b-e660-493b-aa74-3c8fb990dc5f",l={partnerId:"MerkleIp",statsId:"MRKL",version:"1.4.2",source:"merkleinc.com",cacheExpiry:{match:6048e5,pass:864e5,error:864e5},targetingKeys:{exchangeBidding:"ixpid_4"},sonar:{enabled:!0,entrypoints:[{key:"qs1",filter:{attr:1,algo:2}}]}};t.exports={type:"identity",api:"1",main:o,profile:l}},{}],22:[function(e,t,r){"use strict";function n(){function e(e,t,r){s.hasOwnProperty(e)||(s[e]=[]);var n=i.generateUniqueId();return s[e].push({id:n,fn:r,once:t}),n}function t(t,r){return e(t,!1,r)}function r(t,r){return e(t,!0,r)}function n(e){for(var t in s)if(s.hasOwnProperty(t))for(var r=s[t].length-1;r>=0;r--)if(s[t][r].id===e)return void s[t].splice(r,1)}function o(){var e=Array.prototype.slice.call(arguments),t=e.shift();if(t&&s.hasOwnProperty(t))for(var r=s[t].length-1;r>=0;r--){try{s[t][r].fn.apply(null,e)}catch(e){}s[t][r].once&&s[t].splice(r,1)}}var s;return function(){s={}}(),{on:t,once:r,off:n,emit:o}}var i=e(13);e(15);t.exports=n},{}],23:[function(e,t,r){"use strict";function n(e){function t(e){var t={
auction_cycle:"ac",global_timeout:"gt",bid_requests:"brq",bid_responses:"brs",bid_errors:"be",bid_passes:"bp",bid_timeouts:"bt",dfp_kv_pushed:"kv",top_bid:"tb",prefetch:"p",res_latency:"rl",partner_timeout:"pt"};return t.hasOwnProperty(e)?t[e]:e}function r(){if(c.isEmpty(P))return[];var e={s:"identity",t:O,xslots:{}};for(var r in P)if(P.hasOwnProperty(r)){e.xslots.hasOwnProperty(r)||(e.xslots[r]={});for(var n=0;n<P[r].length;n++){var i=P[r][n];"bid_requests"!==i.n&&"res_latency"!==i.n||(i.v=String(i.v)),e.xslots[r].hasOwnProperty(i.x)||(e.xslots[r][i.x]={});var o=t(i.n);e.xslots[r][i.x][o]=i.v}}return P={},[e]}function f(e,t){c.isEmpty(P)&&(O=u.now());var r=t.statsId;P[r]=P[r]||[];var n={b:r,x:N?"after":"before"};"hs_identity_request"===e?(n.n="bid_requests",n.v=1,A[r]=u.now()):"hs_identity_cached"===e?(n.n="bid_requests",n.v=0):"hs_identity_response"===e?(n.n="bid_responses",n.v=1):"hs_identity_error"===e?(n.n="bid_errors",n.v=1):"hs_identity_pass"===e?(n.n="bid_passes",n.v=1):"hs_identity_timeout"===e?(n.n="bid_timeouts",n.v=1):"hs_identity_bid_latency"===e&&(n.n="res_latency",n.v=u.now()-A[r]),P[r].push(n)}function l(e){if(S.hasOwnProperty(e)&&S[e]!==R.IPR&&S[e]!==R.SENT){var t={p:I[e],d:a.DeviceTypeChecker.getDeviceType(),c:v,s:e,w:g,t:u.now(),pg:{t:m,e:b[e]}};h.auctionCycle&&(t.ac=E[e]),t.sl=r(),t.akamaiDebugInfo=T[e],delete T[e],delete b[e],delete w[e];var n=s.buildUrl(d,null,{s:p,u:o.getPageUrl(),v:3});s.ajax({method:"POST",url:n,data:t}),S[e]=R.SENT}}if(!s.isXhrSupported())return null;var d,p,v,h,g,m,y,_,E,b,w,T,S,I,P,A,O,N,R={IPR:0,DONE:1,SENT:2},D={hs_session_start:function(e){var t=e.sessionId;S.hasOwnProperty(t)||(S[t]=R.IPR,_[t]=u.now(),b[t]=[],w[t]={},I[t]=n.SessionTypes.DISPLAY)},hs_session_end:function(e){var t=e.sessionId;S.hasOwnProperty(t)&&S[t]!==R.DONE&&(E[t]=String(u.now()-_[t]),delete _[t],setTimeout(function(){S[t]=R.DONE,l(t)},0))},hs_akamai_debug:function(e){var t=e.sessionId;T[t]={},T[t].hostname=e.hostname,e.hasOwnProperty("requestHost")&&(T[t].requestHost=e.requestHost),e.hasOwnProperty("akamaiPresent")&&(T[t].akamaiPresent=e.akamaiPresent)},hs_identity_request:function(e){f("hs_identity_request",e)},hs_identity_cached:function(e){f("hs_identity_cached",e)},hs_identity_response:function(e){f("hs_identity_response",e),i.emit("hs_identity_bid_latency",e)},hs_identity_error:function(e){f("hs_identity_error",e),i.emit("hs_identity_bid_latency",e)},hs_identity_pass:function(e){f("hs_identity_pass",e),i.emit("hs_identity_bid_latency",e)},hs_identity_bid_latency:function(e){c.isNumber(A[e.statsId])&&f("hs_identity_bid_latency",e)},hs_identity_timeout:function(e){f("hs_identity_timeout",e),N=!0},hs_define_identity_timeout:function(e){}};return function(){i=a.services.EventsService,m=u.now(),d="https://as-sec.casalemedia.com/headerstats",p=e.siteId,v=e.configId,h=e.options,g=p+u.now(),g+=u.generateUniqueId(32-g.length),a.instanceId=g,S={},b={},w={},T={},y={},_={},E={},I={},P={},A={},N=!1;for(var t in D)D.hasOwnProperty(t)&&a.services.EventsService.on(t,D[t])}(),{}}var i,o=e(3),s=(e(4),e(17),e(12)),a=e(29),u=e(13),c=e(14);e(15);n.SessionTypes={DISPLAY:"display",VIDEO:"video"},t.exports=n},{}],24:[function(e,t,r){"use strict";function n(){function e(){return{applies:!0,consentString:""}}function t(){return{version:1,uspString:""}}function r(){return!1}function n(e){return e}function o(){return i.resolve()}return{gdpr:{getConsent:e,setApplies:function(){}},usp:{getConsent:t},isPrivacyEnabled:r,delay:n,wait:o}}var i=e(10);t.exports=n},{}],25:[function(e,t,r){"use strict";e(13);t.exports=function(){return{}}},{}],26:[function(e,t,r){"use strict";t.exports=function(){return{getSonarPayload:function(){return{}},getLastUpdated:function(){return 0},setSonarEmail:function(){return{}}}}},{}],27:[function(e,t,r){"use strict";function n(){function e(e){return function(){u[e].state=c.TERMINATED;for(var t=0;t<u[e].cbs.length;t++)try{u[e].cbs[t]()}catch(e){}delete u[e].cbs,delete u[e].timer}}function t(t,r,n){var s=o.generateUniqueId(i.SESSION_ID_LENGTH);return r=!!r,n=n?[n]:[],u[s]={state:c.NEW,cbs:n,timeout:t},r&&(u[s].state=c.RUNNABLE,u[s].timer=setTimeout(e(s),t)),s}function r(t){u.hasOwnProperty(t)&&u[t].state===c.NEW&&(u[t].state=c.RUNNABLE,u[t].timer=setTimeout(e(t),u[t].timeout))}function n(e,t){u.hasOwnProperty(e)&&u[e].state!==c.TERMINATED&&u[e].cbs.unshift(t)}function s(e){return u.hasOwnProperty(e)?u[e].state:null}function a(e){u.hasOwnProperty(e)&&u[e].state!==c.TERMINATED&&(u[e].state=c.TERMINATED,clearTimeout(u[e].timer),delete u[e].cbs,delete u[e].timer)}var u,c={NEW:0,RUNNABLE:1,TERMINATED:2};return function(){u={}}(),{TimerStates:c,createTimer:t,startTimer:r,addTimerCallback:n,getTimerState:s,clearTimer:a}}var i=e(7),o=e(13);e(15);t.exports=n},{}],28:[function(e,t,r){"use strict";var n,i,o=(e(3),e(6)),s=e(16),a=e(29),u=e(14);window[a.NAMESPACE]=window[a.NAMESPACE]||{},window[a.NAMESPACE].cmd=window[a.NAMESPACE].cmd||[];var c=window[a.NAMESPACE].cmd;window[a.NAMESPACE]=function(){function e(e,t,r){var n="";try{if(!u.isBoolean(t))return i.emit("error","`once` must be a boolean"),n;if(!u.isFunction(r))return i.emit("error","`callback` must be a function"),n;if(!u.isString(e))return i.emit("error","`eventName` must be a string"),n;if(!p.hasOwnProperty(e))return i.emit("error","Unrecognized event "+e),n;if("rti_partner_request_complete"===e&&!0===d.emitted)return r(e,d.args),n;var o=function(){var t=Array.prototype.slice.call(arguments);r(e,JSON.stringify(t))};n=t?i.once(e,o):i.on(e,o)}catch(e){i.emit("error",e)}return n}function t(e){try{if(!u.isString(e))return void i.emit("error","`subscriptionId` must be a string");i.off(e)}catch(e){i.emit("error",e)}}function r(){return f.Layers.IdentityLayer.getAllPartnerResults()}function o(e){var t={status:!1,message:"Identity feature not enabled"};return t=a.services.PublisherSonarService.setSonarEmail(e),t.status&&f.Layers.IdentityLayer.invokeAllPartners(),t}var c,f,l,d={emitted:!1,args:{}},p={error:1,warning:2,rti_partner_request_complete:3};if(function(){try{c={DeviceTypeChecker:{method:"USER_AGENT",configs:{}},Services:{EventsService:{},TimerService:{},HeaderStatsService:{siteId:"340102",configId:"164323601241456",options:{auctionCycle:!1}}},Layers:[{layerId:"IdentityLayer",configs:{partners:{AdserverOrgIp:{enabled:!0,configs:{publisherId:187621}},MerkleIp:{enabled:!0,configs:{pubid:"SENDTONEWS",enable4CiteTag:1}},LiveRampIp:{enabled:!0,configs:{}}}}}]},f=s(c).getDirectInterface(),n=a.services.ComplianceService,i=a.services.EventsService;var t=Math.random().toString(36).slice(-5);i.emit("hs_session_start",{sessionId:t}),e("rti_partner_request_complete",!0,function(e,r){d={emitted:!0,args:r},i.emit("hs_session_end",{sessionId:t})}),n.wait().then(function(){f.Layers.IdentityLayer.retrieve()}).catch(function(e){})}catch(e){l={subscribeEvent:function(){return""},unsubscribeEvent:function(){}}}}(),l)return l;var v={};if(window[a.NAMESPACE])for(var h in window[a.NAMESPACE])window[a.NAMESPACE].hasOwnProperty(h)&&(v[h]=window[a.NAMESPACE][h]);return v.subscribeEvent=e,v.unsubscribeEvent=t,v.getIdentityInfo=r,v.setSonarEmail=o,v}(),window[a.NAMESPACE].cmd=o(c)},{}],29:[function(e,t,r){"use strict";var n={NAMESPACE:"headertag",PRODUCT:"IdentityLibrary",services:{},DeviceTypeChecker:{},initQueue:[],globalTimeout:null,instanceId:null,version:"2.37.0"};t.exports=n},{}]},{},[28]);