/*!
 * Aniview Ad Player v6.2.153
 * Build time: 2023-12-19T17:37:22.288Z
 * All rights reserved to ANIVIEW LTD 2023
 */
/*! License information is available at LICENSE.txt */!function(){var t={5023:function(t,e,n){var i=n(2369);t.exports=i},1031:function(t,e,n){n(2595),t.exports=n(1899)},888:function(t,e,n){t.exports=n(1403)},1403:function(t,e,n){n(9668);var i=n(5023);t.exports=i},4883:function(t,e,n){var i=n(7475),o=n(9826),r=TypeError;t.exports=function(t){if(i(t))return t;throw r(o(t)+" is not a function")}},6059:function(t,e,n){var i=n(941),o=String,r=TypeError;t.exports=function(t){if(i(t))return t;throw r(o(t)+" is not an object")}},2532:function(t,e,n){var i=n(5329),o=i({}.toString),r=i("".slice);t.exports=function(t){return r(o(t),8,-1)}},2029:function(t,e,n){var i=n(5746),o=n(5988),r=n(1887);t.exports=i?function(t,e,n){return o.f(t,e,r(1,n))}:function(t,e,n){return t[e]=n,t}},1887:function(t){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},5609:function(t,e,n){var i=n(1899),o=Object.defineProperty;t.exports=function(t,e){try{o(i,t,{value:e,configurable:!0,writable:!0})}catch(n){i[t]=e}return e}},5746:function(t,e,n){var i=n(5981);t.exports=!i((function(){return 7!=Object.defineProperty({},1,{get:function(){return 7}})[1]}))},6616:function(t){var e="object"==typeof document&&document.all,n=void 0===e&&void 0!==e;t.exports={all:e,IS_HTMLDDA:n}},1333:function(t,e,n){var i=n(1899),o=n(941),r=i.document,a=o(r)&&o(r.createElement);t.exports=function(t){return a?r.createElement(t):{}}},2861:function(t){t.exports="undefined"!=typeof navigator&&String(navigator.userAgent)||""},3385:function(t,e,n){var i,o,r=n(1899),a=n(2861),s=r.process,l=r.Deno,A=s&&s.versions||l&&l.version,c=A&&A.v8;c&&(o=(i=c.split("."))[0]>0&&i[0]<4?1:+(i[0]+i[1])),!o&&a&&(!(i=a.match(/Edge\/(\d+)/))||i[1]>=74)&&(i=a.match(/Chrome\/(\d+)/))&&(o=+i[1]),t.exports=o},6887:function(t,e,n){"use strict";var i=n(1899),o=n(9730),r=n(7484),a=n(7475),s=n(9677).f,l=n(7252),A=n(4058),c=n(6843),u=n(2029),d=n(953),f=function(t){var e=function(n,i,r){if(this instanceof e){switch(arguments.length){case 0:return new t;case 1:return new t(n);case 2:return new t(n,i)}return new t(n,i,r)}return o(t,this,arguments)};return e.prototype=t.prototype,e};t.exports=function(t,e){var n,o,p,h,g,y,m,b,v,w=t.target,C=t.global,k=t.stat,S=t.proto,x=C?i:k?i[w]:(i[w]||{}).prototype,P=C?A:A[w]||u(A,w,{})[w],T=P.prototype;for(h in e)o=!(n=l(C?h:w+(k?".":"#")+h,t.forced))&&x&&d(x,h),y=P[h],o&&(m=t.dontCallGetSet?(v=s(x,h))&&v.value:x[h]),g=o&&m?m:e[h],o&&typeof y==typeof g||(b=t.bind&&o?c(g,i):t.wrap&&o?f(g):S&&a(g)?r(g):g,(t.sham||g&&g.sham||y&&y.sham)&&u(b,"sham",!0),u(P,h,b),S&&(d(A,p=w+"Prototype")||u(A,p,{}),u(A[p],h,g),t.real&&T&&(n||!T[h])&&u(T,h,g)))}},5981:function(t){t.exports=function(t){try{return!!t()}catch(t){return!0}}},9730:function(t,e,n){var i=n(8285),o=Function.prototype,r=o.apply,a=o.call;t.exports="object"==typeof Reflect&&Reflect.apply||(i?a.bind(r):function(){return a.apply(r,arguments)})},6843:function(t,e,n){var i=n(7484),o=n(4883),r=n(8285),a=i(i.bind);t.exports=function(t,e){return o(t),void 0===e?t:r?a(t,e):function(){return t.apply(e,arguments)}}},8285:function(t,e,n){var i=n(5981);t.exports=!i((function(){var t=function(){}.bind();return"function"!=typeof t||t.hasOwnProperty("prototype")}))},8834:function(t,e,n){var i=n(8285),o=Function.prototype.call;t.exports=i?o.bind(o):function(){return o.apply(o,arguments)}},7484:function(t,e,n){var i=n(2532),o=n(5329);t.exports=function(t){if("Function"===i(t))return o(t)}},5329:function(t,e,n){var i=n(8285),o=Function.prototype,r=o.call,a=i&&o.bind.bind(r,r);t.exports=i?a:function(t){return function(){return r.apply(t,arguments)}}},626:function(t,e,n){var i=n(4058),o=n(1899),r=n(7475),a=function(t){return r(t)?t:void 0};t.exports=function(t,e){return arguments.length<2?a(i[t])||a(o[t]):i[t]&&i[t][e]||o[t]&&o[t][e]}},4229:function(t,e,n){var i=n(4883),o=n(2119);t.exports=function(t,e){var n=t[e];return o(n)?void 0:i(n)}},1899:function(t,e,n){var i=function(t){return t&&t.Math==Math&&t};t.exports=i("object"==typeof globalThis&&globalThis)||i("object"==typeof window&&window)||i("object"==typeof self&&self)||i("object"==typeof n.g&&n.g)||function(){return this}()||this||Function("return this")()},953:function(t,e,n){var i=n(5329),o=n(9678),r=i({}.hasOwnProperty);t.exports=Object.hasOwn||function(t,e){return r(o(t),e)}},2840:function(t,e,n){var i=n(5746),o=n(5981),r=n(1333);t.exports=!i&&!o((function(){return 7!=Object.defineProperty(r("div"),"a",{get:function(){return 7}}).a}))},7026:function(t,e,n){var i=n(5329),o=n(5981),r=n(2532),a=Object,s=i("".split);t.exports=o((function(){return!a("z").propertyIsEnumerable(0)}))?function(t){return"String"==r(t)?s(t,""):a(t)}:a},7475:function(t,e,n){var i=n(6616),o=i.all;t.exports=i.IS_HTMLDDA?function(t){return"function"==typeof t||t===o}:function(t){return"function"==typeof t}},7252:function(t,e,n){var i=n(5981),o=n(7475),r=/#|\.prototype\./,a=function(t,e){var n=l[s(t)];return n==c||n!=A&&(o(e)?i(e):!!e)},s=a.normalize=function(t){return String(t).replace(r,".").toLowerCase()},l=a.data={},A=a.NATIVE="N",c=a.POLYFILL="P";t.exports=a},2119:function(t){t.exports=function(t){return null==t}},941:function(t,e,n){var i=n(7475),o=n(6616),r=o.all;t.exports=o.IS_HTMLDDA?function(t){return"object"==typeof t?null!==t:i(t)||t===r}:function(t){return"object"==typeof t?null!==t:i(t)}},2529:function(t){t.exports=!0},6664:function(t,e,n){var i=n(626),o=n(7475),r=n(7046),a=n(2302),s=Object;t.exports=a?function(t){return"symbol"==typeof t}:function(t){var e=i("Symbol");return o(e)&&r(e.prototype,s(t))}},5988:function(t,e,n){var i=n(5746),o=n(2840),r=n(3937),a=n(6059),s=n(3894),l=TypeError,A=Object.defineProperty,c=Object.getOwnPropertyDescriptor,u="enumerable",d="configurable",f="writable";e.f=i?r?function(t,e,n){if(a(t),e=s(e),a(n),"function"==typeof t&&"prototype"===e&&"value"in n&&f in n&&!n[f]){var i=c(t,e);i&&i[f]&&(t[e]=n.value,n={configurable:d in n?n[d]:i[d],enumerable:u in n?n[u]:i[u],writable:!1})}return A(t,e,n)}:A:function(t,e,n){if(a(t),e=s(e),a(n),o)try{return A(t,e,n)}catch(t){}if("get"in n||"set"in n)throw l("Accessors not supported");return"value"in n&&(t[e]=n.value),t}},9677:function(t,e,n){var i=n(5746),o=n(8834),r=n(6760),a=n(1887),s=n(4529),l=n(3894),A=n(953),c=n(2840),u=Object.getOwnPropertyDescriptor;e.f=i?u:function(t,e){if(t=s(t),e=l(e),c)try{return u(t,e)}catch(t){}if(A(t,e))return a(!o(r.f,t,e),t[e])}},7046:function(t,e,n){var i=n(5329);t.exports=i({}.isPrototypeOf)},6760:function(t,e){"use strict";var n={}.propertyIsEnumerable,i=Object.getOwnPropertyDescriptor,o=i&&!n.call({1:2},1);e.f=o?function(t){var e=i(this,t);return!!e&&e.enumerable}:n},9811:function(t,e,n){var i=n(8834),o=n(7475),r=n(941),a=TypeError;t.exports=function(t,e){var n,s;if("string"===e&&o(n=t.toString)&&!r(s=i(n,t)))return s;if(o(n=t.valueOf)&&!r(s=i(n,t)))return s;if("string"!==e&&o(n=t.toString)&&!r(s=i(n,t)))return s;throw a("Can't convert object to primitive value")}},4058:function(t){t.exports={}},8219:function(t,e,n){var i=n(2119),o=TypeError;t.exports=function(t){if(i(t))throw o("Can't call method on "+t);return t}},3030:function(t,e,n){var i=n(1899),o=n(5609),r="__core-js_shared__",a=i[r]||o(r,{});t.exports=a},8726:function(t,e,n){var i=n(2529),o=n(3030);(t.exports=function(t,e){return o[t]||(o[t]=void 0!==e?e:{})})("versions",[]).push({version:"3.31.1",mode:i?"pure":"global",copyright:"© 2014-2023 Denis Pushkarev (zloirock.ru)",license:"https://github.com/zloirock/core-js/blob/v3.31.1/LICENSE",source:"https://github.com/zloirock/core-js"})},3405:function(t,e,n){var i=n(3385),o=n(5981),r=n(1899).String;t.exports=!!Object.getOwnPropertySymbols&&!o((function(){var t=Symbol();return!r(t)||!(Object(t)instanceof Symbol)||!Symbol.sham&&i&&i<41}))},4529:function(t,e,n){var i=n(7026),o=n(8219);t.exports=function(t){return i(o(t))}},9678:function(t,e,n){var i=n(8219),o=Object;t.exports=function(t){return o(i(t))}},6935:function(t,e,n){var i=n(8834),o=n(941),r=n(6664),a=n(4229),s=n(9811),l=n(9813),A=TypeError,c=l("toPrimitive");t.exports=function(t,e){if(!o(t)||r(t))return t;var n,l=a(t,c);if(l){if(void 0===e&&(e="default"),n=i(l,t,e),!o(n)||r(n))return n;throw A("Can't convert object to primitive value")}return void 0===e&&(e="number"),s(t,e)}},3894:function(t,e,n){var i=n(6935),o=n(6664);t.exports=function(t){var e=i(t,"string");return o(e)?e:e+""}},9826:function(t){var e=String;t.exports=function(t){try{return e(t)}catch(t){return"Object"}}},9418:function(t,e,n){var i=n(5329),o=0,r=Math.random(),a=i(1..toString);t.exports=function(t){return"Symbol("+(void 0===t?"":t)+")_"+a(++o+r,36)}},2302:function(t,e,n){var i=n(3405);t.exports=i&&!Symbol.sham&&"symbol"==typeof Symbol.iterator},3937:function(t,e,n){var i=n(5746),o=n(5981);t.exports=i&&o((function(){return 42!=Object.defineProperty((function(){}),"prototype",{value:42,writable:!1}).prototype}))},9813:function(t,e,n){var i=n(1899),o=n(8726),r=n(953),a=n(9418),s=n(3405),l=n(2302),A=i.Symbol,c=o("wks"),u=l?A.for||A:A&&A.withoutSetter||a;t.exports=function(t){return r(c,t)||(c[t]=s&&r(A,t)?A[t]:u("Symbol."+t)),c[t]}},2595:function(t,e,n){var i=n(6887),o=n(1899);i({global:!0,forced:o.globalThis!==o},{globalThis:o})},9668:function(t,e,n){n(2595)},2369:function(t,e,n){var i=n(1031);t.exports=i}},e={};function n(i){var o=e[i];if(void 0!==o)return o.exports;var r=e[i]={exports:{}};return t[i].call(r.exports,r,r.exports,n),r.exports}n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),function(){"use strict";function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(e){var n=function(e,n){if("object"!==t(e)||null===e)return e;var i=e[Symbol.toPrimitive];if(void 0!==i){var o=i.call(e,n||"default");if("object"!==t(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===n?String:Number)(e)}(e,"string");return"symbol"===t(n)?n:String(n)}function i(t,n){for(var i=0;i<n.length;i++){var o=n[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,e(o.key),o)}}var o=Object.prototype.toString;function r(t,e){return n=t,o.call(n).slice(8,-1)===e;var n}var a=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.listeners={}}var e,n,o,a=t.prototype;return a.subscribe=function(t,e,n){this.listeners[e]||(this.listeners[e]=[]),this.listeners[e].push({callback:t,context:n})},a.unsubscribe=function(t,e){if(this.listeners[e])for(var n=0;n<this.listeners[e].length;++n)if(this.listeners[e][n].callback===t){this.listeners[e].splice(n,1);break}},a.dispatch=function(t){if(this.listeners[t]){for(var e=arguments.length,n=new Array(e>1?e-1:0),i=1;i<e;i++)n[i-1]=arguments[i];for(var o=0;o<this.listeners[t].length;++o)if(this.listeners[t][o]&&(r(s=this.listeners[t][o].callback,"Function")||"function"==typeof s))try{var a;(a=this.listeners[t][o].callback).call.apply(a,[this.listeners[t][o].context].concat(n))}catch(t){0}var s}},e=t,n&&i(e.prototype,n),o&&i(e,o),Object.defineProperty(e,"prototype",{writable:!1}),e}();var s=n(888);function l(t){return function(t){return"number"==typeof t||function(t){return null!==t&&"object"==typeof t}(t)&&r(t,"Number")}(t)&&s.isFinite(t)}function A(t){return l(t)?t:1.7777777777777777}!function(t){t.avPlayer=function(e){var n,i,o,r,s,l,c,u={},d={},f=new a;(i=this).AdLoaded=!1,i.playing=!1,i.contentPlaying=!1,i.muted=!0;var p,h=null,g=null,y=null,m="track1.aniview.com";if(e.publisherId&&(e.publisherId=e.publisherId.trim()),e.channelId&&(e.channelId=e.channelId.trim()),e.trackDomain&&(m=e.trackDomain),e.adServerDomain&&e.wl){var b=e.adServerDomain.indexOf(".");if(b>-1)m=e.adServerDomain.substring(0,b)+"t"+e.adServerDomain.substring(b,100)}if(e.events&&e.events.playerStarted&&((new Image).src="https://"+m+"/track?pid="+e.publisherId+"&cid="+e.channelId+"&e=playerStarted&cb="+Date.now()),l={AdLoaded:[],AdStarted:[],AdStopped:[],AdSkipped:[],AdClosed:[],AdSkippableStateChange:["adSkippableState"],AdSizeChange:["adWidth","adHeight"],AdLinearChange:["adLinear"],AdDurationChange:["adDuration","adRemainingTime"],AdExpandedChange:["adExpanded"],AdRemainingTimeChange:["adRemainingTime"],AdVolumeChange:["adVolume"],AdImpression:[],AdVideoStart:[],AdVideoFirstQuartile:[],AdVideoMidpoint:[],AdVideoThirdQuartile:[],AdVideoComplete:[],AdClickThru:[],AdInteraction:[],AdUserAcceptInvitation:[],AdUserMinimize:[],AdUserClose:[],AdPaused:[],AdPlaying:[],AdLog:[],AdError:[],AdViewableImpression:[],ContentImpression:[],ContentComplete:[],ContentPaused:[],ContentPlaying:[],ContentClick:[],Inventory:[],InventoryRequest:[],AdEvent:[],AdReady:[],CompanionView:[],AniviewPassbackResize:[]},e.startTemplate){var v=document.getElementById(e.position);if(v){var w=document.createElement("div");w.style.width="100%",w.style.margin="0 auto",w.style.maxWidth=e.maxWidth+"px";var C=document.createElement("div");C.id="aniBox",p=C;var k=document.createElement("div");e.position=e.position+"_"+Date.now(),k.id=e.position,w.appendChild(C),C.appendChild(k),v.appendChild(w)}}function S(){var t,n,i=document.getElementById(e.position)||e.positionDiv;if(t=i.parentNode||"BODY"!=i.parentNode.tagName?i.parentNode.clientWidth:document.body.clientWidth||screen.width,Math.floor(t)>4e3&&(t=4e3),n=Math.round(t/A(e.heightRatio)),0==e.height&&100==e.width){e.height=n,e.width=t;var o=e.maxHeight||(navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().indexOf("firefox")>-1?0:document.documentElement.clientHeight)||document.body.clientHeight||screen.height;e.height>o&&!e.autoHeight&&(e.height=o,e.width=Math.round(o*A(e.heightRatio))),e.minHeight&&(e.height=Math.max(e.height,e.minHeight)),e.minWidth&&(e.width=Math.max(e.width,e.minWidth))}e.width=Math.floor(e.width),e.height=Math.floor(e.height),u.width=d.width=e.width,u.height=d.height=e.height}function x(t){o.subscribe((function(e,n,r){var a;for(a=0;a<arguments.length;a++)a>0&&", ",arguments[a];for(a=0;a<l[t].length;a++)"get"+l[t][a].charAt(0).toUpperCase()+l[t][a].slice(1);if("AdEvent"==t&&"function"==typeof i.onEvent&&i.onEvent(e,n,r),"AdLoaded"==t&&(i.AdLoaded=!0,"function"==typeof i.onLoad&&i.onLoad()),"AdReady"==t&&"function"==typeof i.onAdReady&&i.onAdReady(e,n,r),"AdImpression"==t&&(i.playing=!0,"function"==typeof i.onPlay&&i.onPlay(e)),"AdVideoFirstQuartile"==t&&"function"==typeof i.onPlay25&&i.onPlay25(),"AdVideoMidpoint"==t&&"function"==typeof i.onPlay50&&i.onPlay50(),"AdVideoThirdQuartile"==t&&"function"==typeof i.onPlay75&&i.onPlay75(),"AdVideoComplete"==t&&(i.playing=!1,"function"==typeof i.onPlay100&&i.onPlay100()),"AdClickThru"==t&&"function"==typeof i.onClick&&i.onClick(e,n,r),"AdPaused"==t&&"function"==typeof i.onPause&&i.onPause(),"AdPlaying"==t&&"function"==typeof i.onResume&&i.onResume(),"AdError"==t&&(i.playing=!1,"function"==typeof i.onError&&i.onError(e)),"AdStopped"==t&&(i.playing=!1,"function"==typeof i.onStopped&&i.onStopped()),"AdSkipped"==t&&(i.playing=!1,"function"==typeof i.onSkip&&i.onSkip()),"AdClosed"==t&&(i.playing=!1,"function"==typeof i.onClose&&i.onClose(e)),"AdVolumeChange"==t){var s=i.muted;if(void 0!==o.adVolume&&(i.muted=!(o.adVolume>0)),s==i.muted)return;"function"!=typeof i.onUnmute||i.muted?"function"==typeof i.onMute&&i.muted&&(i.onMute(),i.muted=!0):(i.onUnmute(),i.muted=!1)}"ContentImpression"==t&&(i.contentPlaying=!0,"function"==typeof i.onContentPlay&&i.onContentPlay(e)),"ContentComplete"==t&&(i.contentPlaying=!1,"function"==typeof i.onContentPlay100&&i.onContentPlay100()),"ContentPaused"==t&&"function"==typeof i.onContentPaused&&i.onContentPaused(),"ContentPlaying"==t&&"function"==typeof i.onContentPlaying&&i.onContentPlaying(),"ContentClick"==t&&"function"==typeof i.onContentClick&&i.onContentClick(),"Inventory"==t&&"function"==typeof i.onInventory&&i.onInventory(e),"InventoryRequest"==t&&"function"==typeof i.onInventoryRequest&&i.onInventoryRequest(e),f.dispatch(t,e,n,r)}),t)}function P(t){if(!(i.playCalled||!t&&e.startOnView&&e.templateType>0)){if(i.playCalled=!0,document.body&&"function"==typeof document.body.appendChild?document.body.appendChild(n):(document.getElementById(e.position)||e.positionDiv).appendChild(n),n.contentWindow.document.open(),n.onload=s,n.contentWindow.document.close(),n.contentDocument){var o="http://".concat(e.adServerDomain||"go1.aniview.com","/api/adserver/adserve");!function(t,e){var n=t.createDocumentFragment();e.forEach((function(e){for(var i=t.createElement("link"),o=0,r=Object.keys(e);o<r.length;o++){var a=r[o];i.setAttribute(a,e[a])}n.appendChild(i)}));var i=t.head||t.getElementsByTagName("head")[0];i&&i.appendChild(n)}(n.contentDocument,[{href:o,rel:"preconnect"}])}!function(t){function n(){t.updateGui({logo:!0})}e.hideLogoOnAd&&(t.on("AdImpression",(function(){t.updateGui({logo:!1})})),t.on("AdError",n),t.on("AdSkipped",n),t.on("AdVideoComplete",n)),e.clickmacro&&t.on("AdClickThru",(function(){(new Image).src=e.clickmacro})),e.impmacro&&t.on("AdImpression",(function(){(new Image).src=e.impmacro}))}(i)}}n&&n.parentNode&&(n.parentNode.removeChild(n),n=null),(n=document.createElement("iframe")).setAttribute("id","AVLoader"+e.position),n.style.display="none",n.src="about:blank",s=function(){var t,i,a="https://player.aniview.com/script/6.1/",s="https://player.aniview.com/script/6.1/";(e.baseJsUrl||""==e.baseJsUrl)&&(a=e.baseJsUrl),(e.omBaseJsUrl||""==s.omBaseJsUrl)&&(s=e.omBaseJsUrl);isNaN(e.abtest)&&(5==Math.floor(20*Math.random())&&(e.abtest=5));5==e.abtest&&(a+="ab5/",s+="ab5/",e.baseJsUrl=a,e.omBaseJsUrl=s),a=a+"AVmanager.js?v=1.0&type=s&pid="+e.publisherId;try{(r=n.contentWindow.document.createElement("script")).src=a,r.type="text/javascript",i=function(){setTimeout((function(){if("function"==typeof n.contentWindow.getVPAIDAd){for(t in o=n.contentWindow.getVPAIDAd(),l)l.hasOwnProperty(t)&&x(t);!function(){var t;t={},S(),void 0===e.hideControls&&(e.hidecontrols=!1);(t=e).slot=e.position&&document.getElementById(e.position)||e.positionDiv,t.videoSlotCanAutoPlay=!0,t.getviewability=y,t.isplayer=1,o.initAd(e.width,e.height,"normal","","",t)}()}}),0)},r.onload=function(){i()},n.contentWindow.document.body.appendChild(r)}catch(t){}},i.play=function(){P(!1),e.startTemplate&&p&&this.startTemplate(p)},i.startAd=function(){setTimeout((function(){i.AdLoaded&&o.startAd()}))},i.getReadyAds=function(){if(o&&"function"==typeof o.getReadyAds)return o.getReadyAds()},i.getWidth=function(){return o?o.getAdWidth():-2},i.getHeight=function(){return o?o.getAdHeight():-2},i.setRequestState=function(t,e){o&&"function"==typeof o.setRequestState&&o.setRequestState(t,e)},i.setWaterfallState=function(t,e){o&&"function"==typeof o.setWaterfallState&&o.setWaterfallState(t,e)},i.pauseWaterfall=function(t){void 0===t&&(t=!1),this.setWaterfallState(!1,t)},i.resumeWaterfall=function(t){void 0===t&&(t=!0),this.setWaterfallState(!0,t)},i.setFullscreenState=function(t){o&&"function"==typeof o.setFullscreenState&&o.setFullscreenState(t)},i.setViewability=function(t){if(o)try{o.setViewability(t)}catch(t){}};var T,V,I=!1;function E(t,n,i,r){i||(i="normal"),o&&("normal"===i&&(e.width=t,e.height=n,r&&(u.width=t,u.height=n)),d.width=t,d.height=n,o.resizeAd(Math.floor(t),Math.floor(n),i))}i.unmute=function(t){if(o)if(0==t||I||-1==navigator.userAgent.toLowerCase().indexOf("chrome")||-1==navigator.vendor.toLowerCase().indexOf("google"))o.setAdVolume(t||1);else{var e=document.createElement("video");e.src="data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAAthtZGF0AAACrQYF//+p3EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDE0MiByMjQ1MyBlYTBjYTUxIC0gSC4yNjQvTVBFRy00IEFWQyBjb2RlYyAtIENvcHlsZWZ0IDIwMDMtMjAxNCAtIGh0dHA6Ly93d3cudmlkZW9sYW4ub3JnL3gyNjQuaHRtbCAtIG9wdGlvbnM6IGNhYmFjPTEgcmVmPTMgZGVibG9jaz0xOjA6MCBhbmFseXNlPTB4MzoweDExMyBtZT1oZXggc3VibWU9NyBwc3k9MSBwc3lfcmQ9MS4wMDowLjAwIG1peGVkX3JlZj0xIG1lX3JhbmdlPTE2IGNocm9tYV9tZT0xIHRyZWxsaXM9MSA4eDhkY3Q9MSBjcW09MCBkZWFkem9uZT0yMSwxMSBmYXN0X3Bza2lwPTEgY2hyb21hX3FwX29mZnNldD00IHRocmVhZHM9NiBsb29rYWhlYWRfdGhyZWFkcz0xIHNsaWNlZF90aHJlYWRzPTAgbnI9MCBkZWNpbWF0ZT0xIGludGVybGFjZWQ9MCBibHVyYXlfY29tcGF0PTAgY29uc3RyYWluZWRfaW50cmE9MCBiZnJhbWVzPTMgYl9weXJhbWlkPTIgYl9hZGFwdD0xIGJfYmlhcz0wIGRpcmVjdD0xIHdlaWdodGI9MSBvcGVuX2dvcD0wIHdlaWdodHA9MiBrZXlpbnQ9MjUwIGtleWludF9taW49MjUgc2NlbmVjdXQ9NDAgaW50cmFfcmVmcmVzaD0wIHJjX2xvb2thaGVhZD00MCByYz1jcmYgbWJ0cmVlPTEgY3JmPTIzLjAgcWNvbXA9MC42MCBxcG1pbj0wIHFwbWF4PTY5IHFwc3RlcD00IGlwX3JhdGlvPTEuNDAgYXE9MToxLjAwAIAAAAAPZYiEAC///vYp+BTXMDH/AAAACEGaIWxCv/7AAAADCW1vb3YAAABsbXZoZAAAAAAAAAAAAAAAAAAAA+gAAABQAAEAAAEAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAI0dHJhawAAAFx0a2hkAAAAAwAAAAAAAAAAAAAAAQAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAQAAAAAACAAAAAgAAAAAAJGVkdHMAAAAcZWxzdAAAAAAAAAABAAAAUAAAAAAAAQAAAAABrG1kaWEAAAAgbWRoZAAAAAAAAAAAAAAAAAAAMgAAAAQAVcQAAAAAAC1oZGxyAAAAAAAAAAB2aWRlAAAAAAAAAAAAAAAAVmlkZW9IYW5kbGVyAAAAAVdtaW5mAAAAFHZtaGQAAAABAAAAAAAAAAAAAAAkZGluZgAAABxkcmVmAAAAAAAAAAEAAAAMdXJsIAAAAAEAAAEXc3RibAAAAJdzdHNkAAAAAAAAAAEAAACHYXZjMQAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAACAAIASAAAAEgAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABj//wAAADFhdmNDAfQACv/hABhn9AAKkZsr8fH4CIAAAAMAgAAAGQeJEssBAAZo6+PESEQAAAAYc3R0cwAAAAAAAAABAAAAAgAAAgAAAAAUc3RzcwAAAAAAAAABAAAAAQAAABxzdHNjAAAAAAAAAAEAAAABAAAAAgAAAAEAAAAcc3RzegAAAAAAAAAAAAAAAgAAAsQAAAAMAAAAFHN0Y28AAAAAAAAAAQAAADAAAABhdWR0YQAAAFltZXRhAAAAAAAAACFoZGxyAAAAAAAAAABtZGlyYXBwbAAAAAAAAAAAAAAAACxpbHN0AAAAJKl0b28AAAAcZGF0YQAAAAEAAAAATGF2ZjU2LjAuMTAw",e.setAttribute("playsinline",!0),e.setAttribute("webkit-playsinline",!0),e.style.display="none",document.body.appendChild(e),e.muted=!1;var n=e.play();n?(n.then((function(){i(!0)})).catch((function(t){i(!1)})),setTimeout((function(){i(!1)}),1e3)):i(!1)}function i(e){e&&(I=!0,o.setAdVolume(t||1))}},i.mute=function(){try{o&&o.setAdVolume(0)}catch(t){}},i.pause=function(){o&&o.pauseAd()},i.resume=function(){o&&o.resumeAd()},i.close=function(t){o&&"function"==typeof o.stopAd&&o.stopAd(),t=t||3e3,setTimeout((function(){try{n&&(document.body.removeChild(n),n=null,o=null),i.stopViewability()}catch(t){}}),t+1)},i.getEvents=function(){var t=[];for(var e in l)t.push(e);return t},i.updateGui=function(t){try{if("object"==typeof t)for(var e in t){var i=e.toLowerCase();n.contentWindow.AV_PlayerGui.config[i]=t[e],n.contentWindow.AV_PlayerGui.config[e]=t[e],"showTimeline"==e&&"function"==typeof n.contentWindow.AV_PlayerGui.showTimeline&&n.contentWindow.AV_PlayerGui.showTimeline(t[e])}}catch(t){}},i.resize=function(t,e,n){E(t,e,n,!0)},i.getAdDuration=function(){if(o)return o.getAdDuration()},i.getAdRemainingTime=function(){if(o)return o.getAdRemainingTime()},i.getAdVolume=function(){if(o)return o.getAdVolume()},i.setAdVolume=function(t){if(o)return o.setAdVolume(t)},i.getAdCompanions=function(){if(o)return o.getAdCompanions()},i.seek=function(t){if(o)return o.seekAd(t)},i.getContentPaused=function(){if(o)return o.getContentPaused()},i.getContentCurrentTime=function(){if(o)return o.getContentCurrentTime()},this.pauseContent=function(){if(o)return o.pauseContent()},this.resumeContent=function(){if(o)return o.resumeContent()},this.setContentVolume=function(t){if(o)return o.setContentVolume(t)},this.on=function(t,e,n){f.subscribe(e,t,n)},this.off=function(t,e){f.unsubscribe(e,t)},this.setFloor=function(t){if(o)return o.setFloor(t)},this.setAdConfig=function(t){if(o)return Object.assign(e,t),o.setAdConfig(t)},c=function(){var n=null,i=.5,o=null,r=!1,a=this;function s(){var t=o.iframe?o.baseEl:null,n=a.getVieabilityInfo(o.el,o.wnd,t),r=n.vertical.value*n.horizontal.value,s=n.vertical.state;return e.vitab&&o.wnd&&o.wnd.document&&"hidden"===o.wnd.document.visibilityState&&(r=0,s="OUT_TAB"),{inView:r>=i,ratio:r,state:s,distance:n.vertical.distance}}function l(){var t=s();n&&n(t.inView,t.ratio,t.state,t.distance)}this.checkViewability=function(){l()},this.start=function(e,a,s,A){return!r&&(o=function(e,n){var i,o,a=null,s="object"==typeof e?e:document.getElementById(e);try{if(t.top.location.href,a=t.frameElement)for(var l,A=t;A!==t.top;){if((A=(l=a.ownerDocument).defaultView||l.parentWindow)===t.top){o=A,i=a;break}a=A.frameElement}}catch(t){return r=!0,null}if(null==a){if(!(i=s))return r=!0,null;o=t}return{el:i,wnd:o,baseEl:s,iframe:!(null==a)&&n}}(e,A),!!o&&(s&&(i=s),a&&(o.wnd.addEventListener("resize",l,!0),o.wnd.addEventListener("scroll",l,!0),n=a,setTimeout(l,10)),!0))},this.stop=function(){n&&(o.wnd.removeEventListener("resize",l,!0),o.wnd.removeEventListener("scroll",l,!0),n=null)},this.get=function(t,e){return!r&&o?s():{inView:!1,ratio:0,state:"UNKNOWN"}},this.getHorizontalViewability=function(t,e){var n=e.innerWidth,i=t.getBoundingClientRect().left,o=t.getBoundingClientRect().right,r=o-i;return i>n?{value:0,state:"OUT_RIGHT"}:o<=0?{value:0,state:"OUT_LEFT"}:i>=0&&o<=n?{value:1,state:"IN_HVIEW"}:i<0&&o>n?{value:n/r,state:"LR_TRUNC"}:i<0&&o<=n?{value:o/r,state:"L_TRUNC"}:i>=0&&o>n?{value:(n-i)/r,state:"R_TRUNC"}:{value:0,state:"OUT"}},this.getVerticalViewability=function(t,e,n){var i=e.innerHeight,o=t.getBoundingClientRect().top,r=t.getBoundingClientRect().bottom,a=r-o;return n&&(a=(r=(o+=n.getBoundingClientRect().top)+(n.getBoundingClientRect().bottom-n.getBoundingClientRect().top))-o),o>i?{value:0,state:"OUT_BOTTOM",out:-1}:r<=0?{value:0,state:"OUT_TOP",out:-1}:o>=0&&r<=i?{value:1,state:"IN_VVIEW",out:0,distance:i-o}:o<0&&r>i?{value:i/a,state:"BT_TRUNC",out:-o+r-i}:o<0&&r<=i?{value:r/a,state:"T_TRUNC",out:-o}:o>=0&&r>i?{value:(i-o)/a,state:"B_TRUNC",out:r-i}:{value:0,state:"OUT",out:-1}},this.getVieabilityInfo=function(t,e,n){return{vertical:a.getVerticalViewability(t,e,n),horizontal:a.getHorizontalViewability(t,e,n)}}},this.startViewability=function(t,e,n,i){return h||(h=new c),h.start(t,e,n,i)},this.stopViewability=function(){h&&h.stop()},this.getViewability=function(){if(h)return h.get()},y=function(t,e,n){if(t)return g||(g=new c).start(t,e,n),g.get();g.stop()},T={hidden:void 0,visibilityChange:void 0},void 0!==document.hidden?(T.hidden="hidden",T.visibilityChange="visibilitychange"):void 0!==document.webkitHidden?(T.hidden="webkitHidden",T.visibilityChange="webkitvisibilitychange"):void 0!==document.mozHidden?(T.hidden="mozHidden",T.visibilityChange="mozvisibilitychange"):void 0!==document.msHidden&&(T.hidden="msHidden",T.visibilityChange="msvisibilitychange"),T.hidden&&document.addEventListener(T.visibilityChange,(function(t){!document[T.hidden]||i.mute()}),!1);var B=!1,z=0,j={addClass:function(t,e){(this.isSticky()||this.isFloating())&&t.style.visibility&&(e+=";visibility:"+t.style.visibility+";"),t.style.cssText=e},setfloatingCSS:function(){if(!this.floatingCSS)if(e.floating.floatingCSS)this.floatingCSS=e.floating.floatingCSS;else{var t="";switch(e.floating.backgroundColor||(e.floating.backgroundColor="black"),!0===e.floating.passClick&&(t="pointer-events: none;"),e.floating.right||(e.floating.right=0),e.floating.left||(e.floating.left=0),e.floating.top||(e.floating.top=0),e.floating.bottom||(e.floating.bottom=0),e.floating.position?e.floating.position=e.floating.position.toLowerCase():e.floating.position="bottom-right",e.floating.position){case"bottom-left":this.floatingCSS="bottom:"+e.floating.bottom+"px; left:"+e.floating.left+"px; -webkit-transform-origin:bottom left; transform-origin:bottom left;";break;case"top-left":this.floatingCSS="top:"+e.floating.top+"px; left:"+e.floating.left+"px; -webkit-transform-origin:top left; transform-origin:top left;";break;case"top-right":this.floatingCSS="top:"+e.floating.top+"px; right:"+e.floating.right+"px; -webkit-transform-origin:top right; transform-origin:top right;";break;case"bottom-right":this.floatingCSS="bottom:"+e.floating.bottom+"px; right:"+e.floating.right+"px; -webkit-transform-origin:bottom right; transform-origin:bottom right;";break;case"top":this.floatingCSS=t+"top:"+e.floating.top+"px; display:flex; justify-content: center; align-items: center; width:100%; background: "+e.floating.backgroundColor+"; left: 0;";break;case"bottom":this.floatingCSS=t+"bottom:"+e.floating.bottom+"px; display:flex; justify-content: center; align-items: center; width:100%; background: "+e.floating.backgroundColor+"; left: 0;"}this.floatingCSS+="z-index:"+(e.maxzindex||10000001)+";position:fixed;",e.floating.resize||(this.floatingCSS+="transform:scale("+e.floating.size+"); -webkit-transform:scale("+e.floating.size+");")}},setStickyCSS:function(){if(!this.stickyCSS){var t=.5,n=0,i=0,o=0,r=0,a="";e.sticky.size&&(t=e.sticky.size),!0===e.sticky.passClick&&(a="pointer-events: none;"),e.sticky.backgroundColor||(e.sticky.backgroundColor="black"),e.sticky.right&&(n=e.sticky.right),e.sticky.bottom&&(i=e.sticky.bottom),e.sticky.top&&(o=e.sticky.top),e.sticky.left&&(r=e.sticky.left),"string"!=typeof e.sticky.position&&(e.sticky.position="");var s=e.maxzindex||10000001;switch(e.sticky.position.toLowerCase()){case"bottom-right":this.stickyCSS="z-index:"+s+";position:fixed; bottom:"+i+"px; right:"+n+"px; -webkit-transform:scale("+t+"); -webkit-transform-origin:bottom right; transform:scale("+t+"); transform-origin:bottom right";break;case"bottom-left":this.stickyCSS="z-index:"+s+";position:fixed; bottom:"+i+"px; left:"+r+"px; -webkit-transform:scale("+t+"); -webkit-transform-origin:bottom left; transform:scale("+t+"); transform-origin:bottom left";break;case"top-left":this.stickyCSS="z-index:"+s+";position:fixed; top:"+o+"px; left:"+r+"px; -webkit-transform:scale("+t+"); -webkit-transform-origin:top left; transform:scale("+t+"); transform-origin:top left";break;case"top-right":this.stickyCSS="z-index:"+s+";position:fixed; top:"+o+"px; right:"+n+"px; -webkit-transform:scale("+t+"); -webkit-transform-origin:top right; transform:scale("+t+"); transform-origin:top right";break;case"top":this.stickyCSS=a+"z-index:"+s+";position:fixed; top:"+o+"px; position:fixed; display:flex; justify-content: center; align-items: center; width:100%; background: "+e.sticky.backgroundColor+"; left: 0;";break;case"bottom":this.stickyCSS=a+"z-index:"+s+";position:fixed; bottom:"+i+"px; position:fixed; display:flex;  justify-content: center; align-items: center; width:100%; background: "+e.sticky.backgroundColor+"; left: 0;"}}},getPlaceholderWidth:function(t){var n=t.parentNode||"BODY"!=t.parentNode.tagName?t.parentNode.clientWidth:document.body.clientWidth||screen.width;return n>4e3&&(n=4e3),100!=e.width&&0!=e.height?n=e.width:(e.height=Math.round(n/A(e.heightRatio)),e.width=n),n},hidePlayer:function(t,e,n){t&&(t.style.width=this.getPlaceholderWidth(t)+"px",t.style.height="1px",n?setTimeout((function(){i.playing||V||(t.style.opacity=0)}),1e3):t.style.opacity=0,(this.isSticky()||this.isFloating())&&(e.style.visibility="hidden"),B=!1)},showPlayer:function(t,n){var o=!1,r=!1;this.isFloating()&&(o=!0),this.isSticky()&&(r=!0),(r||o)&&(n.style.visibility=""),r||(t&&(!o||o&&"OUT_TOP"!==i.viewState&&"T_TRUNC"!==i.viewState)&&(t.style.width=u.width+"px",t.style.height=(1*e.captionHeight||0)+u.height+"px"),o&&e.floating&&e.floating.resize||E(e.width,e.height),n.style.zIndex=e.maxzindex||"9999999"),t&&(t.style.opacity=""),B=!0},startAd:function(){this.playerInView&&this.playerLoadedFirstTime&&!e.clickToPlay&&(setTimeout((function(){i.startAd()}),z),z=0)},isFloating:function(){return e.floating&&e.floating.size>0},isSticky:function(){return e.sticky&&e.sticky.size>0},stopFloat:function(){},startFloat:function(t){t.resize||(e.floating?t.resize=e.floating.resize:t.resize=!0),e.floating=t,this.isFloating()&&(e.playOnView=!0,e.floatPos||(e.floatPos=document.getElementById(e.position)||e.positionDiv),this.setfloatingCSS()),h&&h.checkViewability()},startSticky:function(t){if(!this.isSticky()&&(null==t?void 0:t.size)>0){e.sticky=t;var n=t.size||1;if(t.size=1,this.setStickyCSS(),this.addClass(document.getElementById(e.position)||e.positionDiv,this.stickyCSS),1!=n)E(u.width*n,u.height*n)}},onFloatingChanged:function(t){"function"==typeof i.onFloatingChanged&&i.onFloatingChanged(t)},startViewability:function(n){var o,r=this,a=!1,s=!1,l=!1,A=e.startOnView,c=!1;function f(t){(r.addClass(g,r.floatingCSS),e.floating.resize&&!l||t&&l)&&(c?E(1==e.floating.size&&e.floating.width||u.width*e.floating.size,1==e.floating.size&&e.floating.height||u.height*e.floating.size):o=!0);e.floating.closeButton&&i.updateGui({close:!0}),l=!0,r.onFloatingChanged(!0)}function p(){o=!1,l&&(r.addClass(g,""),e.floating.resize&&E(u.width,u.height),e.floating.closeButton&&!e.closeButton&&i.updateGui({close:!1}),l=!1,r.onFloatingChanged(!1))}z=1e3*(e.startdelay||0),r.isFloating()&&(r.stopFloat=function(){e.floating.size=0,r.addClass(g,""),p(),this.floatingCSS=""}),e.floting&&!e.floating&&(e.floating=e.floting),(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4)))&&(s=!0),e.preloader||(e.preloader={}),S();var g=document.getElementById(e.position)||e.positionDiv,y="";"bottomup"==e.openTransition&&(y="position:absolute;bottom:0;",n.parentNode.style.position="relative");var m,b,v,w=e.aniBoxCSS||"overflow:hidden; -webkit-transition:1s ease height; transition:1s ease height;opacity:0;"+y;if(n&&!e.showPos&&r.addClass(n,w),r.isFloating()&&(e.playOnView=!0,e.floatPos||(e.floatPos=g),r.setfloatingCSS()),r.isSticky()&&(e.floatPos||(e.floatPos=g),e.playOnView=!1,r.setStickyCSS(),e.preloader.type||(e.hideInitPreloader=!0)),(e.playOnView&&!e.autoPlay&&!e.showPlayer||e.openAnim)&&r.hidePlayer(n,g),e.showPlayer&&r.showPlayer(n,g),e.showPos&&(n.style.width=u.width+"px",n.style.height=u.height+"px"),i.on("AdLoaded",(function(){r.playerLoadedFirstTime=!0,r.startAd()})),i.on("AniviewPassbackResize",(function(t){i.resize(t.w,t.h)})),i.on("AdImpression",(function(){if(n&&(n.style.opacity=""),r.isSticky()&&""!=e.preloader.type&&r.addClass(g,r.stickyCSS),e.floating&&e.floating.floatOnImp&&(e.floating.floatOnImp=!1),r.showPlayer(n,g),e.unMuteOnMouseEnter&&!s&&(g.addEventListener("mouseenter",(function(t){setTimeout((function(){i.unmute()}),5)})),g.addEventListener("mouseleave",(function(t){setTimeout((function(){i.mute()}),5)}))),e.pauseOnBlur&&!s&&t.addEventListener("blur",(function(){setTimeout((function(){i.pause()}),500)})),e.playOnView)try{h.checkViewability()}catch(t){}r.isFloating()&&e.floating.resize&&E(d.width,d.height)})),i.on("AdVideoComplete",(function(){e.loopVideo||e.lastFrame||e.preloader.type||V||e.completeonadstopped||r.hidePlayer(n,g,!0),0==e.autoPlayLoop&&(r.startAdFirstTime=!1,a&&r.startAd())})),i.on("AdSkipped",(function(){e.preloader&&e.preloader.type||V||r.hidePlayer(n,g,!0)})),i.on("AdStopped",(function(){e.loopVideo||e.lastFrame||e.preloader.type||V||r.hidePlayer(n,g,!0)})),i.on("Inventory",(function(){c=!0,o&&f(!0),B&&e.captionHeight&&r.showPlayer(n,g)})),i.on("AdClosed",(function(){if(e.closeevent||r.isFloating()&&e.floating.closeButton){e.floating.resize&&E(u.width,u.height);var t=l;r.addClass(g,""),r.showPlayer(n,g),r.isFloating()&&e.floating.closeButton&&(e.closeButton||i.updateGui({close:!1}),t||i.close()),e.floating.size=0}else r.hidePlayer(n,g),i.stopViewability(),e.floating.closeButton&&(e.floating.closeButton=!1,i.close())})),i.on("AdError",(function(t){var i=t&&t.errorlimit;e.preloader.type||e.passbackUrl||e.showPlayer?e.passbackUrl&&(e.playOnView||e.passbackpriority)&&i&&(V=!0,r.showPlayer(n,g),e.passbackUrl.nofloat&&r.isFloating()&&(e.floating.size=0,r.addClass(g,""))):r.hidePlayer(n,g)})),e.playOnView||A||e.enableViewability){var C=.5;e.inViewRatio&&(m=e.inViewRatio,b=0,v=1,m=Number(m),b=Number(b),v=Number(v),b=isNaN(b)?0:b,v=isNaN(v)?0:v,isNaN(m)||(m=Math.max(Math.min(m,v),b)),C=m),i.startViewability(n,(function(t,o,s,c){if(i.viewState=s,t&&e.playOnViewPerc&&e.playOnViewPerc>0){var u=100-100*(e.height-c)/e.height;u>0&&u<e.playOnViewPerc&&(t=!1)}if("function"==typeof i.onViewabilityChanged)try{i.onViewabilityChanged(t,o,s,c)}catch(t){}if(t&&A)return r.isSticky()&&r.addClass(g,r.stickyCSS),A=!1,void P(!0);if(!r.isSticky())if(t)a=!0,!e.preloader.type||r.playerInView||0!=e.Preroll||e.hideInitPreloader||r.showPlayer(n,g),r.playerInView=!0,i.playing||(r.startAd(),"content"==e.preloader.type&&e.showPlayer&&e.autoPlayContent&&i.resumeContent()),i.playing||V||""!==e.preloader.type&&e.preloader.type?(e.pauseOnUnseen&&i.resume(),r.addClass(g,""),r.isFloating()&&p(),(!n.style.height||n.clientHeight<=1)&&(i.playing||e.showPlayer)&&r.showPlayer(n,g)):r.isFloating()&&e.floating.resize&&p(),l=!1;else{if(a=!1,r.isFloating()&&!e.floating.floatOnImp)switch(s){case"T_TRUNC":case"OUT_TOP":f();break;case"B_TRUNC":case"OUT_BOTTOM":e.floating.floatOnBottom&&f()}(i.playing||i.contentPlaying||""!=e.preloader.type&&e.preloader.type&&!e.preloader.noFloatIdle)&&(!e.pauseOnUnseen||l||r.isSticky()||i.pause())}}),C,e.iframeViewability)}else r.isSticky()&&(!e.preloader.type||e.hideInitPreloader?(r.addClass(g,r.stickyCSS),r.hidePlayer(n,g)):r.addClass(g,r.stickyCSS)),r.startAdFirstTime=!1,r.playerInView=!0,r.playerLoadedFirstTime=!0,r.startAd(),n&&(n.style.opacity=""),e.hideInitPreloader?r.hidePlayer(n,g):r.showPlayer(n,g)}};i.startTemplate=function(t){j.startViewability(t)},this.stopFloat=function(){j.stopFloat()},this.startFloat=function(t){j.startFloat(t)},this.startSticky=function(t){j.startSticky(t)}}}(window)}()}();