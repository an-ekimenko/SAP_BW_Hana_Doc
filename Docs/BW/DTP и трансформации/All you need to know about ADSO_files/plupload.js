/**
 * mOxie - multi-runtime File API & XMLHttpRequest L2 Polyfill
 * v1.2.0
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 *
 * Date: 2014-01-16
 */
	!function(e,t){"use strict";function n(e,t){for(var n,i=[],r=0;r<e.length;++r){if(n=s[e[r]]||o(e[r]),!n)throw"module definition dependecy not found: "+e[r];i.push(n)}t.apply(null,i)}function i(e,i,r){if("string"!=typeof e)throw"invalid module definition, module id must be defined and be a string";if(i===t)throw"invalid module definition, dependencies must be specified";if(r===t)throw"invalid module definition, definition function must be specified";n(i,function(){s[e]=r.apply(null,arguments)})}function r(e){return!!s[e]}function o(t){for(var n=e,i=t.split(/[.\/]/),r=0;r<i.length;++r){if(!n[i[r]])return;n=n[i[r]]}return n}function a(n){for(var i=0;i<n.length;i++){for(var r=e,o=n[i],a=o.split(/[.\/]/),u=0;u<a.length-1;++u)r[a[u]]===t&&(r[a[u]]={}),r=r[a[u]];r[a[a.length-1]]=s[o]}}var s={},u="moxie/core/utils/Basic",c="moxie/core/I18n",l="moxie/core/utils/Mime",d="moxie/core/utils/Env",f="moxie/core/utils/Dom",p="moxie/core/Exceptions",h="moxie/core/EventTarget",m="moxie/core/utils/Encode",g="moxie/runtime/Runtime",v="moxie/runtime/RuntimeClient",y="moxie/file/Blob",w="moxie/file/File",E="moxie/file/FileInput",_="moxie/file/FileDrop",x="moxie/runtime/RuntimeTarget",R="moxie/file/FileReader",b="moxie/core/utils/Url",T="moxie/file/FileReaderSync",S="moxie/xhr/FormData",A="moxie/xhr/XMLHttpRequest",O="moxie/runtime/Transporter",I="moxie/image/Image",D="moxie/runtime/html5/Runtime",N="moxie/runtime/html5/file/Blob",L="moxie/core/utils/Events",M="moxie/runtime/html5/file/FileInput",C="moxie/runtime/html5/file/FileDrop",F="moxie/runtime/html5/file/FileReader",H="moxie/runtime/html5/xhr/XMLHttpRequest",P="moxie/runtime/html5/utils/BinaryReader",k="moxie/runtime/html5/image/JPEGHeaders",U="moxie/runtime/html5/image/ExifParser",B="moxie/runtime/html5/image/JPEG",z="moxie/runtime/html5/image/PNG",G="moxie/runtime/html5/image/ImageInfo",q="moxie/runtime/html5/image/MegaPixel",X="moxie/runtime/html5/image/Image",j="moxie/runtime/flash/Runtime",V="moxie/runtime/flash/file/Blob",W="moxie/runtime/flash/file/FileInput",Y="moxie/runtime/flash/file/FileReader",$="moxie/runtime/flash/file/FileReaderSync",J="moxie/runtime/flash/xhr/XMLHttpRequest",Z="moxie/runtime/flash/runtime/Transporter",K="moxie/runtime/flash/image/Image",Q="moxie/runtime/silverlight/Runtime",et="moxie/runtime/silverlight/file/Blob",tt="moxie/runtime/silverlight/file/FileInput",nt="moxie/runtime/silverlight/file/FileDrop",it="moxie/runtime/silverlight/file/FileReader",rt="moxie/runtime/silverlight/file/FileReaderSync",ot="moxie/runtime/silverlight/xhr/XMLHttpRequest",at="moxie/runtime/silverlight/runtime/Transporter",st="moxie/runtime/silverlight/image/Image",ut="moxie/runtime/html4/Runtime",ct="moxie/runtime/html4/file/FileInput",lt="moxie/runtime/html4/file/FileReader",dt="moxie/runtime/html4/xhr/XMLHttpRequest",ft="moxie/runtime/html4/image/Image";i(u,[],function(){var e=function(e){var t;return e===t?"undefined":null===e?"null":e.nodeType?"node":{}.toString.call(e).match(/\s([a-z|A-Z]+)/)[1].toLowerCase()},t=function(i){var r;return n(arguments,function(o,s){s>0&&n(o,function(n,o){n!==r&&(e(i[o])===e(n)&&~a(e(n),["array","object"])?t(i[o],n):i[o]=n)})}),i},n=function(e,t){var n,i,r,o;if(e){try{n=e.length}catch(a){n=o}if(n===o){for(i in e)if(e.hasOwnProperty(i)&&t(e[i],i)===!1)return}else for(r=0;n>r;r++)if(t(e[r],r)===!1)return}},i=function(t){var n;if(!t||"object"!==e(t))return!0;for(n in t)return!1;return!0},r=function(t,n){function i(r){"function"===e(t[r])&&t[r](function(e){++r<o&&!e?i(r):n(e)})}var r=0,o=t.length;"function"!==e(n)&&(n=function(){}),t&&t.length||n(),i(r)},o=function(e,t){var i=0,r=e.length,o=new Array(r);n(e,function(e,n){e(function(e){if(e)return t(e);var a=[].slice.call(arguments);a.shift(),o[n]=a,i++,i===r&&(o.unshift(null),t.apply(this,o))})})},a=function(e,t){if(t){if(Array.prototype.indexOf)return Array.prototype.indexOf.call(t,e);for(var n=0,i=t.length;i>n;n++)if(t[n]===e)return n}return-1},s=function(t,n){var i=[];"array"!==e(t)&&(t=[t]),"array"!==e(n)&&(n=[n]);for(var r in t)-1===a(t[r],n)&&i.push(t[r]);return i.length?i:!1},u=function(e,t){var i=[];return n(e,function(e){-1!==a(e,t)&&i.push(e)}),i.length?i:null},c=function(e){var t,n=[];for(t=0;t<e.length;t++)n[t]=e[t];return n},l=function(){var e=0;return function(t){var n=(new Date).getTime().toString(32),i;for(i=0;5>i;i++)n+=Math.floor(65535*Math.random()).toString(32);return(t||"o_")+n+(e++).toString(32)}}(),d=function(e){return e?String.prototype.trim?String.prototype.trim.call(e):e.toString().replace(/^\s*/,"").replace(/\s*$/,""):e},f=function(e){if("string"!=typeof e)return e;var t={t:1099511627776,g:1073741824,m:1048576,k:1024},n;return e=/^([0-9]+)([mgk]?)$/.exec(e.toLowerCase().replace(/[^0-9mkg]/g,"")),n=e[2],e=+e[1],t.hasOwnProperty(n)&&(e*=t[n]),e};return{guid:l,typeOf:e,extend:t,each:n,isEmptyObj:i,inSeries:r,inParallel:o,inArray:a,arrayDiff:s,arrayIntersect:u,toArray:c,trim:d,parseSizeStr:f}}),i(c,[u],function(e){var t={};return{addI18n:function(n){return e.extend(t,n)},translate:function(e){return t[e]||e},_:function(e){return this.translate(e)},sprintf:function(t){var n=[].slice.call(arguments,1);return t.replace(/%[a-z]/g,function(){var t=n.shift();return"undefined"!==e.typeOf(t)?t:""})}}}),i(l,[u,c],function(e,t){var n="application/msword,doc dot,application/pdf,pdf,application/pgp-signature,pgp,application/postscript,ps ai eps,application/rtf,rtf,application/vnd.ms-excel,xls xlb,application/vnd.ms-powerpoint,ppt pps pot,application/zip,zip,application/x-shockwave-flash,swf swfl,application/vnd.openxmlformats-officedocument.wordprocessingml.document,docx,application/vnd.openxmlformats-officedocument.wordprocessingml.template,dotx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,xlsx,application/vnd.openxmlformats-officedocument.presentationml.presentation,pptx,application/vnd.openxmlformats-officedocument.presentationml.template,potx,application/vnd.openxmlformats-officedocument.presentationml.slideshow,ppsx,application/x-javascript,js,application/json,json,audio/mpeg,mp3 mpga mpega mp2,audio/x-wav,wav,audio/x-m4a,m4a,audio/ogg,oga ogg,audio/aiff,aiff aif,audio/flac,flac,audio/aac,aac,audio/ac3,ac3,audio/x-ms-wma,wma,image/bmp,bmp,image/gif,gif,image/jpeg,jpg jpeg jpe,image/photoshop,psd,image/png,png,image/svg+xml,svg svgz,image/tiff,tiff tif,text/plain,asc txt text diff log,text/html,htm html xhtml,text/css,css,text/csv,csv,text/rtf,rtf,video/mpeg,mpeg mpg mpe m2v,video/quicktime,qt mov,video/mp4,mp4,video/x-m4v,m4v,video/x-flv,flv,video/x-ms-wmv,wmv,video/avi,avi,video/webm,webm,video/3gpp,3gpp 3gp,video/3gpp2,3g2,video/vnd.rn-realvideo,rv,video/ogg,ogv,video/x-matroska,mkv,application/vnd.oasis.opendocument.formula-template,otf,application/octet-stream,exe",i={mimes:{},extensions:{},addMimeType:function(e){var t=e.split(/,/),n,i,r;for(n=0;n<t.length;n+=2){for(r=t[n+1].split(/ /),i=0;i<r.length;i++)this.mimes[r[i]]=t[n];this.extensions[t[n]]=r}},extList2mimes:function(t,n){var i=this,r,o,a,s,u=[];for(o=0;o<t.length;o++)for(r=t[o].extensions.split(/\s*,\s*/),a=0;a<r.length;a++){if("*"===r[a])return[];if(s=i.mimes[r[a]])-1===e.inArray(s,u)&&u.push(s);else{if(!n||!/^\w+$/.test(r[a]))return[];u.push("."+r[a])}}return u},mimes2exts:function(t){var n=this,i=[];return e.each(t,function(t){if("*"===t)return i=[],!1;var r=t.match(/^(\w+)\/(\*|\w+)$/);r&&("*"===r[2]?e.each(n.extensions,function(e,t){new RegExp("^"+r[1]+"/").test(t)&&[].push.apply(i,n.extensions[t])}):n.extensions[t]&&[].push.apply(i,n.extensions[t]))}),i},mimes2extList:function(n){var i=[],r=[];return"string"===e.typeOf(n)&&(n=e.trim(n).split(/\s*,\s*/)),r=this.mimes2exts(n),i.push({title:t.translate("Files"),extensions:r.length?r.join(","):"*"}),i.mimes=n,i},getFileExtension:function(e){var t=e&&e.match(/\.([^.]+)$/);return t?t[1].toLowerCase():""},getFileMime:function(e){return this.mimes[this.getFileExtension(e)]||""}};return i.addMimeType(n),i}),i(d,[u],function(e){function t(e,t,n){var i=0,r=0,o=0,a={dev:-6,alpha:-5,a:-5,beta:-4,b:-4,RC:-3,rc:-3,"#":-2,p:1,pl:1},s=function(e){return e=(""+e).replace(/[_\-+]/g,"."),e=e.replace(/([^.\d]+)/g,".$1.").replace(/\.{2,}/g,"."),e.length?e.split("."):[-8]},u=function(e){return e?isNaN(e)?a[e]||-7:parseInt(e,10):0};for(e=s(e),t=s(t),r=Math.max(e.length,t.length),i=0;r>i;i++)if(e[i]!=t[i]){if(e[i]=u(e[i]),t[i]=u(t[i]),e[i]<t[i]){o=-1;break}if(e[i]>t[i]){o=1;break}}if(!n)return o;switch(n){case">":case"gt":return o>0;case">=":case"ge":return o>=0;case"<=":case"le":return 0>=o;case"==":case"=":case"eq":return 0===o;case"<>":case"!=":case"ne":return 0!==o;case"":case"<":case"lt":return 0>o;default:return null}}var n=function(e){var t="",n="?",i="function",r="undefined",o="object",a="major",s="model",u="name",c="type",l="vendor",d="version",f="architecture",p="console",h="mobile",m="tablet",g={has:function(e,t){return-1!==t.toLowerCase().indexOf(e.toLowerCase())},lowerize:function(e){return e.toLowerCase()}},v={rgx:function(){for(var t,n=0,a,s,u,c,l,d,f=arguments;n<f.length;n+=2){var p=f[n],h=f[n+1];if(typeof t===r){t={};for(u in h)c=h[u],typeof c===o?t[c[0]]=e:t[c]=e}for(a=s=0;a<p.length;a++)if(l=p[a].exec(this.getUA())){for(u=0;u<h.length;u++)d=l[++s],c=h[u],typeof c===o&&c.length>0?2==c.length?t[c[0]]=typeof c[1]==i?c[1].call(this,d):c[1]:3==c.length?t[c[0]]=typeof c[1]!==i||c[1].exec&&c[1].test?d?d.replace(c[1],c[2]):e:d?c[1].call(this,d,c[2]):e:4==c.length&&(t[c[0]]=d?c[3].call(this,d.replace(c[1],c[2])):e):t[c]=d?d:e;break}if(l)break}return t},str:function(t,i){for(var r in i)if(typeof i[r]===o&&i[r].length>0){for(var a=0;a<i[r].length;a++)if(g.has(i[r][a],t))return r===n?e:r}else if(g.has(i[r],t))return r===n?e:r;return t}},y={browser:{oldsafari:{major:{1:["/8","/1","/3"],2:"/4","?":"/"},version:{"1.0":"/8",1.2:"/1",1.3:"/3","2.0":"/412","2.0.2":"/416","2.0.3":"/417","2.0.4":"/419","?":"/"}}},device:{sprint:{model:{"Evo Shift 4G":"7373KT"},vendor:{HTC:"APA",Sprint:"Sprint"}}},os:{windows:{version:{ME:"4.90","NT 3.11":"NT3.51","NT 4.0":"NT4.0",2000:"NT 5.0",XP:["NT 5.1","NT 5.2"],Vista:"NT 6.0",7:"NT 6.1",8:"NT 6.2",8.1:"NT 6.3",RT:"ARM"}}}},w={browser:[[/(opera\smini)\/((\d+)?[\w\.-]+)/i,/(opera\s[mobiletab]+).+version\/((\d+)?[\w\.-]+)/i,/(opera).+version\/((\d+)?[\w\.]+)/i,/(opera)[\/\s]+((\d+)?[\w\.]+)/i],[u,d,a],[/\s(opr)\/((\d+)?[\w\.]+)/i],[[u,"Opera"],d,a],[/(kindle)\/((\d+)?[\w\.]+)/i,/(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?((\d+)?[\w\.]+)*/i,/(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?((\d+)?[\w\.]*)/i,/(?:ms|\()(ie)\s((\d+)?[\w\.]+)/i,/(rekonq)((?:\/)[\w\.]+)*/i,/(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron)\/((\d+)?[\w\.-]+)/i],[u,d,a],[/(trident).+rv[:\s]((\d+)?[\w\.]+).+like\sgecko/i],[[u,"IE"],d,a],[/(yabrowser)\/((\d+)?[\w\.]+)/i],[[u,"Yandex"],d,a],[/(comodo_dragon)\/((\d+)?[\w\.]+)/i],[[u,/_/g," "],d,a],[/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?((\d+)?[\w\.]+)/i],[u,d,a],[/(dolfin)\/((\d+)?[\w\.]+)/i],[[u,"Dolphin"],d,a],[/((?:android.+)crmo|crios)\/((\d+)?[\w\.]+)/i],[[u,"Chrome"],d,a],[/((?:android.+))version\/((\d+)?[\w\.]+)\smobile\ssafari/i],[[u,"Android Browser"],d,a],[/version\/((\d+)?[\w\.]+).+?mobile\/\w+\s(safari)/i],[d,a,[u,"Mobile Safari"]],[/version\/((\d+)?[\w\.]+).+?(mobile\s?safari|safari)/i],[d,a,u],[/webkit.+?(mobile\s?safari|safari)((\/[\w\.]+))/i],[u,[a,v.str,y.browser.oldsafari.major],[d,v.str,y.browser.oldsafari.version]],[/(konqueror)\/((\d+)?[\w\.]+)/i,/(webkit|khtml)\/((\d+)?[\w\.]+)/i],[u,d,a],[/(navigator|netscape)\/((\d+)?[\w\.-]+)/i],[[u,"Netscape"],d,a],[/(swiftfox)/i,/(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?((\d+)?[\w\.\+]+)/i,/(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix)\/((\d+)?[\w\.-]+)/i,/(mozilla)\/((\d+)?[\w\.]+).+rv\:.+gecko\/\d+/i,/(uc\s?browser|polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|qqbrowser)[\/\s]?((\d+)?[\w\.]+)/i,/(links)\s\(((\d+)?[\w\.]+)/i,/(gobrowser)\/?((\d+)?[\w\.]+)*/i,/(ice\s?browser)\/v?((\d+)?[\w\._]+)/i,/(mosaic)[\/\s]((\d+)?[\w\.]+)/i],[u,d,a]],engine:[[/(presto)\/([\w\.]+)/i,/(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i,/(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i,/(icab)[\/\s]([23]\.[\d\.]+)/i],[u,d],[/rv\:([\w\.]+).*(gecko)/i],[d,u]],os:[[/(windows)\snt\s6\.2;\s(arm)/i,/(windows\sphone(?:\sos)*|windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i],[u,[d,v.str,y.os.windows.version]],[/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i],[[u,"Windows"],[d,v.str,y.os.windows.version]],[/\((bb)(10);/i],[[u,"BlackBerry"],d],[/(blackberry)\w*\/?([\w\.]+)*/i,/(tizen)\/([\w\.]+)/i,/(android|webos|palm\os|qnx|bada|rim\stablet\sos|meego)[\/\s-]?([\w\.]+)*/i],[u,d],[/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]+)*/i],[[u,"Symbian"],d],[/mozilla.+\(mobile;.+gecko.+firefox/i],[[u,"Firefox OS"],d],[/(nintendo|playstation)\s([wids3portablevu]+)/i,/(mint)[\/\s\(]?(\w+)*/i,/(joli|[kxln]?ubuntu|debian|[open]*suse|gentoo|arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk)[\/\s-]?([\w\.-]+)*/i,/(hurd|linux)\s?([\w\.]+)*/i,/(gnu)\s?([\w\.]+)*/i],[u,d],[/(cros)\s[\w]+\s([\w\.]+\w)/i],[[u,"Chromium OS"],d],[/(sunos)\s?([\w\.]+\d)*/i],[[u,"Solaris"],d],[/\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]+)*/i],[u,d],[/(ip[honead]+)(?:.*os\s*([\w]+)*\slike\smac|;\sopera)/i],[[u,"iOS"],[d,/_/g,"."]],[/(mac\sos\sx)\s?([\w\s\.]+\w)*/i],[u,[d,/_/g,"."]],[/(haiku)\s(\w+)/i,/(aix)\s((\d)(?=\.|\)|\s)[\w\.]*)*/i,/(macintosh|mac(?=_powerpc)|plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos)/i,/(unix)\s?([\w\.]+)*/i],[u,d]]},E=function(e){var n=e||(window&&window.navigator&&window.navigator.userAgent?window.navigator.userAgent:t);this.getBrowser=function(){return v.rgx.apply(this,w.browser)},this.getEngine=function(){return v.rgx.apply(this,w.engine)},this.getOS=function(){return v.rgx.apply(this,w.os)},this.getResult=function(){return{ua:this.getUA(),browser:this.getBrowser(),engine:this.getEngine(),os:this.getOS()}},this.getUA=function(){return n},this.setUA=function(e){return n=e,this},this.setUA(n)};return(new E).getResult()}(),i=function(){var t={define_property:function(){return!1}(),create_canvas:function(){var e=document.createElement("canvas");return!(!e.getContext||!e.getContext("2d"))}(),return_response_type:function(t){try{if(-1!==e.inArray(t,["","text","document"]))return!0;if(window.XMLHttpRequest){var n=new XMLHttpRequest;if(n.open("get","/"),"responseType"in n)return n.responseType=t,n.responseType!==t?!1:!0}}catch(i){}return!1},use_data_uri:function(){var e=new Image;return e.onload=function(){t.use_data_uri=1===e.width&&1===e.height},setTimeout(function(){e.src="data:image/gif;base64,R0lGODlhAQABAIAAAP8AAAAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="},1),!1}(),use_data_uri_over32kb:function(){return t.use_data_uri&&("IE"!==r.browser||r.version>=9)},use_data_uri_of:function(e){return t.use_data_uri&&33e3>e||t.use_data_uri_over32kb()},use_fileinput:function(){var e=document.createElement("input");return e.setAttribute("type","file"),!e.disabled}};return function(n){var i=[].slice.call(arguments);return i.shift(),"function"===e.typeOf(t[n])?t[n].apply(this,i):!!t[n]}}(),r={can:i,browser:n.browser.name,version:parseFloat(n.browser.major),os:n.os.name,osVersion:n.os.version,verComp:t,swf_url:"../flash/Moxie.swf",xap_url:"../silverlight/Moxie.xap",global_event_dispatcher:"moxie.core.EventTarget.instance.dispatchEvent"};return r.OS=r.os,r}),i(f,[d],function(e){var t=function(e){return"string"!=typeof e?e:document.getElementById(e)},n=function(e,t){if(!e.className)return!1;var n=new RegExp("(^|\\s+)"+t+"(\\s+|$)");return n.test(e.className)},i=function(e,t){n(e,t)||(e.className=e.className?e.className.replace(/\s+$/,"")+" "+t:t)},r=function(e,t){if(e.className){var n=new RegExp("(^|\\s+)"+t+"(\\s+|$)");e.className=e.className.replace(n,function(e,t,n){return" "===t&&" "===n?" ":""})}},o=function(e,t){return e.currentStyle?e.currentStyle[t]:window.getComputedStyle?window.getComputedStyle(e,null)[t]:void 0},a=function(t,n){function i(e){var t,n,i=0,r=0;return e&&(n=e.getBoundingClientRect(),t="CSS1Compat"===s.compatMode?s.documentElement:s.body,i=n.left+t.scrollLeft,r=n.top+t.scrollTop),{x:i,y:r}}var r=0,o=0,a,s=document,u,c;if(t=t,n=n||s.body,t&&t.getBoundingClientRect&&"IE"===e.browser&&(!s.documentMode||s.documentMode<8))return u=i(t),c=i(n),{x:u.x-c.x,y:u.y-c.y};for(a=t;a&&a!=n&&a.nodeType;)r+=a.offsetLeft||0,o+=a.offsetTop||0,a=a.offsetParent;for(a=t.parentNode;a&&a!=n&&a.nodeType;)r-=a.scrollLeft||0,o-=a.scrollTop||0,a=a.parentNode;return{x:r,y:o}},s=function(e){return{w:e.offsetWidth||e.clientWidth,h:e.offsetHeight||e.clientHeight}};return{get:t,hasClass:n,addClass:i,removeClass:r,getStyle:o,getPos:a,getSize:s}}),i(p,[u],function(e){function t(e,t){var n;for(n in e)if(e[n]===t)return n;return null}return{RuntimeError:function(){function n(e){this.code=e,this.name=t(i,e),this.message=this.name+": RuntimeError "+this.code}var i={NOT_INIT_ERR:1,NOT_SUPPORTED_ERR:9,JS_ERR:4};return e.extend(n,i),n.prototype=Error.prototype,n}(),OperationNotAllowedException:function(){function t(e){this.code=e,this.name="OperationNotAllowedException"}return e.extend(t,{NOT_ALLOWED_ERR:1}),t.prototype=Error.prototype,t}(),ImageError:function(){function n(e){this.code=e,this.name=t(i,e),this.message=this.name+": ImageError "+this.code}var i={WRONG_FORMAT:1,MAX_RESOLUTION_ERR:2};return e.extend(n,i),n.prototype=Error.prototype,n}(),FileException:function(){function n(e){this.code=e,this.name=t(i,e),this.message=this.name+": FileException "+this.code}var i={NOT_FOUND_ERR:1,SECURITY_ERR:2,ABORT_ERR:3,NOT_READABLE_ERR:4,ENCODING_ERR:5,NO_MODIFICATION_ALLOWED_ERR:6,INVALID_STATE_ERR:7,SYNTAX_ERR:8};return e.extend(n,i),n.prototype=Error.prototype,n}(),DOMException:function(){function n(e){this.code=e,this.name=t(i,e),this.message=this.name+": DOMException "+this.code}var i={INDEX_SIZE_ERR:1,DOMSTRING_SIZE_ERR:2,HIERARCHY_REQUEST_ERR:3,WRONG_DOCUMENT_ERR:4,INVALID_CHARACTER_ERR:5,NO_DATA_ALLOWED_ERR:6,NO_MODIFICATION_ALLOWED_ERR:7,NOT_FOUND_ERR:8,NOT_SUPPORTED_ERR:9,INUSE_ATTRIBUTE_ERR:10,INVALID_STATE_ERR:11,SYNTAX_ERR:12,INVALID_MODIFICATION_ERR:13,NAMESPACE_ERR:14,INVALID_ACCESS_ERR:15,VALIDATION_ERR:16,TYPE_MISMATCH_ERR:17,SECURITY_ERR:18,NETWORK_ERR:19,ABORT_ERR:20,URL_MISMATCH_ERR:21,QUOTA_EXCEEDED_ERR:22,TIMEOUT_ERR:23,INVALID_NODE_TYPE_ERR:24,DATA_CLONE_ERR:25};return e.extend(n,i),n.prototype=Error.prototype,n}(),EventException:function(){function t(e){this.code=e,this.name="EventException"}return e.extend(t,{UNSPECIFIED_EVENT_TYPE_ERR:0}),t.prototype=Error.prototype,t}()}}),i(h,[p,u],function(e,t){function n(){var n={};t.extend(this,{uid:null,init:function(){this.uid||(this.uid=t.guid("uid_"))},addEventListener:function(e,i,r,o){var a=this,s;return e=t.trim(e),/\s/.test(e)?(t.each(e.split(/\s+/),function(e){a.addEventListener(e,i,r,o)}),void 0):(e=e.toLowerCase(),r=parseInt(r,10)||0,s=n[this.uid]&&n[this.uid][e]||[],s.push({fn:i,priority:r,scope:o||this}),n[this.uid]||(n[this.uid]={}),n[this.uid][e]=s,void 0)},hasEventListener:function(e){return e?!(!n[this.uid]||!n[this.uid][e]):!!n[this.uid]},removeEventListener:function(e,i){e=e.toLowerCase();var r=n[this.uid]&&n[this.uid][e],o;if(r){if(i){for(o=r.length-1;o>=0;o--)if(r[o].fn===i){r.splice(o,1);break}}else r=[];r.length||(delete n[this.uid][e],t.isEmptyObj(n[this.uid])&&delete n[this.uid])}},removeAllEventListeners:function(){n[this.uid]&&delete n[this.uid]},dispatchEvent:function(i){var r,o,a,s,u={},c=!0,l;if("string"!==t.typeOf(i)){if(s=i,"string"!==t.typeOf(s.type))throw new e.EventException(e.EventException.UNSPECIFIED_EVENT_TYPE_ERR);i=s.type,s.total!==l&&s.loaded!==l&&(u.total=s.total,u.loaded=s.loaded),u.async=s.async||!1}if(-1!==i.indexOf("::")?function(e){r=e[0],i=e[1]}(i.split("::")):r=this.uid,i=i.toLowerCase(),o=n[r]&&n[r][i]){o.sort(function(e,t){return t.priority-e.priority}),a=[].slice.call(arguments),a.shift(),u.type=i,a.unshift(u);var d=[];t.each(o,function(e){a[0].target=e.scope,u.async?d.push(function(t){setTimeout(function(){t(e.fn.apply(e.scope,a)===!1)},1)}):d.push(function(t){t(e.fn.apply(e.scope,a)===!1)})}),d.length&&t.inSeries(d,function(e){c=!e})}return c},bind:function(){this.addEventListener.apply(this,arguments)},unbind:function(){this.removeEventListener.apply(this,arguments)},unbindAll:function(){this.removeAllEventListeners.apply(this,arguments)},trigger:function(){return this.dispatchEvent.apply(this,arguments)},convertEventPropsToHandlers:function(e){var n;"array"!==t.typeOf(e)&&(e=[e]);for(var i=0;i<e.length;i++)n="on"+e[i],"function"===t.typeOf(this[n])?this.addEventListener(e[i],this[n]):"undefined"===t.typeOf(this[n])&&(this[n]=null)}})}return n.instance=new n,n}),i(m,[],function(){var e=function(e){return unescape(encodeURIComponent(e))},t=function(e){return decodeURIComponent(escape(e))},n=function(e,n){if("function"==typeof window.atob)return n?t(window.atob(e)):window.atob(e);var i="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",r,o,a,s,u,c,l,d,f=0,p=0,h="",m=[];if(!e)return e;e+="";do s=i.indexOf(e.charAt(f++)),u=i.indexOf(e.charAt(f++)),c=i.indexOf(e.charAt(f++)),l=i.indexOf(e.charAt(f++)),d=s<<18|u<<12|c<<6|l,r=255&d>>16,o=255&d>>8,a=255&d,m[p++]=64==c?String.fromCharCode(r):64==l?String.fromCharCode(r,o):String.fromCharCode(r,o,a);while(f<e.length);return h=m.join(""),n?t(h):h},i=function(t,n){if(n&&e(t),"function"==typeof window.btoa)return window.btoa(t);var i="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",r,o,a,s,u,c,l,d,f=0,p=0,h="",m=[];if(!t)return t;do r=t.charCodeAt(f++),o=t.charCodeAt(f++),a=t.charCodeAt(f++),d=r<<16|o<<8|a,s=63&d>>18,u=63&d>>12,c=63&d>>6,l=63&d,m[p++]=i.charAt(s)+i.charAt(u)+i.charAt(c)+i.charAt(l);while(f<t.length);h=m.join("");var g=t.length%3;return(g?h.slice(0,g-3):h)+"===".slice(g||3)};return{utf8_encode:e,utf8_decode:t,atob:n,btoa:i}}),i(g,[u,f,h],function(e,t,n){function i(n,r,a,s,u){var c=this,l,d=e.guid(r+"_"),f=u||"browser";n=n||{},o[d]=this,a=e.extend({access_binary:!1,access_image_binary:!1,display_media:!1,do_cors:!1,drag_and_drop:!1,filter_by_extension:!0,resize_image:!1,report_upload_progress:!1,return_response_headers:!1,return_response_type:!1,return_status_code:!0,send_custom_headers:!1,select_file:!1,select_folder:!1,select_multiple:!0,send_binary_string:!1,send_browser_cookies:!0,send_multipart:!0,slice_blob:!1,stream_upload:!1,summon_file_dialog:!1,upload_filesize:!0,use_http_method:!0},a),n.preferred_caps&&(f=i.getMode(s,n.preferred_caps,f)),l=function(){var t={};return{exec:function(e,n,i,r){return l[n]&&(t[e]||(t[e]={context:this,instance:new l[n]}),t[e].instance[i])?t[e].instance[i].apply(this,r):void 0},removeInstance:function(e){delete t[e]},removeAllInstances:function(){var n=this;e.each(t,function(t,i){"function"===e.typeOf(t.instance.destroy)&&t.instance.destroy.call(t.context),n.removeInstance(i)})}}}(),e.extend(this,{initialized:!1,uid:d,type:r,mode:i.getMode(s,n.required_caps,f),shimid:d+"_container",clients:0,options:n,can:function(t,n){var r=arguments[2]||a;if("string"===e.typeOf(t)&&"undefined"===e.typeOf(n)&&(t=i.parseCaps(t)),"object"===e.typeOf(t)){for(var o in t)if(!this.can(o,t[o],r))return!1;return!0}return"function"===e.typeOf(r[t])?r[t].call(this,n):n===r[t]},getShimContainer:function(){var n,i=t.get(this.shimid);return i||(n=this.options.container?t.get(this.options.container):document.body,i=document.createElement("div"),i.id=this.shimid,i.className="moxie-shim moxie-shim-"+this.type,e.extend(i.style,{position:"absolute",top:"0px",left:"0px",width:"1px",height:"1px",overflow:"hidden"}),n.appendChild(i),n=null),i},getShim:function(){return l},shimExec:function(e,t){var n=[].slice.call(arguments,2);return c.getShim().exec.call(this,this.uid,e,t,n)},exec:function(e,t){var n=[].slice.call(arguments,2);return c[e]&&c[e][t]?c[e][t].apply(this,n):c.shimExec.apply(this,arguments)},destroy:function(){if(c){var e=t.get(this.shimid);e&&e.parentNode.removeChild(e),l&&l.removeAllInstances(),this.unbindAll(),delete o[this.uid],this.uid=null,d=c=l=e=null}}}),this.mode&&n.required_caps&&!this.can(n.required_caps)&&(this.mode=!1)}var r={},o={};return i.order="html5,flash,silverlight,html4",i.getRuntime=function(e){return o[e]?o[e]:!1},i.addConstructor=function(e,t){t.prototype=n.instance,r[e]=t},i.getConstructor=function(e){return r[e]||null},i.getInfo=function(e){var t=i.getRuntime(e);return t?{uid:t.uid,type:t.type,mode:t.mode,can:function(){return t.can.apply(t,arguments)}}:null},i.parseCaps=function(t){var n={};return"string"!==e.typeOf(t)?t||{}:(e.each(t.split(","),function(e){n[e]=!0}),n)},i.can=function(e,t){var n,r=i.getConstructor(e),o;return r?(n=new r({required_caps:t}),o=n.mode,n.destroy(),!!o):!1},i.thatCan=function(e,t){var n=(t||i.order).split(/\s*,\s*/);for(var r in n)if(i.can(n[r],e))return n[r];return null},i.getMode=function(t,n,i){var r=null;if("undefined"===e.typeOf(i)&&(i="browser"),n&&!e.isEmptyObj(t)){if(e.each(n,function(n,i){if(t.hasOwnProperty(i)){var o=t[i](n);if("string"==typeof o&&(o=[o]),r){if(!(r=e.arrayIntersect(r,o)))return r=!1}else r=o}}),r)return-1!==e.inArray(i,r)?i:r[0];if(r===!1)return!1}return i},i.capTrue=function(){return!0},i.capFalse=function(){return!1},i.capTest=function(e){return function(){return!!e}},i}),i(v,[p,u,g],function(e,t,n){return function i(){var i;t.extend(this,{connectRuntime:function(r){function o(t){var s,u;return t.length?(s=t.shift(),(u=n.getConstructor(s))?(i=new u(r),i.bind("Init",function(){i.initialized=!0,setTimeout(function(){i.clients++,a.trigger("RuntimeInit",i)},1)}),i.bind("Error",function(){i.destroy(),o(t)}),i.mode?(i.init(),void 0):(i.trigger("Error"),void 0)):(o(t),void 0)):(a.trigger("RuntimeError",new e.RuntimeError(e.RuntimeError.NOT_INIT_ERR)),i=null,void 0)}var a=this,s;if("string"===t.typeOf(r)?s=r:"string"===t.typeOf(r.ruid)&&(s=r.ruid),s){if(i=n.getRuntime(s))return i.clients++,i;throw new e.RuntimeError(e.RuntimeError.NOT_INIT_ERR)}o((r.runtime_order||n.order).split(/\s*,\s*/))},getRuntime:function(){return i&&i.uid?i:(i=null,null)},disconnectRuntime:function(){i&&--i.clients<=0&&(i.destroy(),i=null)}})}}),i(y,[u,m,v],function(e,t,n){function i(o,a){function s(t,n,o){var a,s=r[this.uid];return"string"===e.typeOf(s)&&s.length?(a=new i(null,{type:o,size:n-t}),a.detach(s.substr(t,a.size)),a):null}n.call(this),o&&this.connectRuntime(o),a?"string"===e.typeOf(a)&&(a={data:a}):a={},e.extend(this,{uid:a.uid||e.guid("uid_"),ruid:o,size:a.size||0,type:a.type||"",slice:function(e,t,n){return this.isDetached()?s.apply(this,arguments):this.getRuntime().exec.call(this,"Blob","slice",this.getSource(),e,t,n)},getSource:function(){return r[this.uid]?r[this.uid]:null},detach:function(e){this.ruid&&(this.getRuntime().exec.call(this,"Blob","destroy",r[this.uid]),this.disconnectRuntime(),this.ruid=null),e=e||"";var n=e.match(/^data:([^;]*);base64,/);n&&(this.type=n[1],e=t.atob(e.substring(e.indexOf("base64,")+7))),this.size=e.length,r[this.uid]=e},isDetached:function(){return!this.ruid&&"string"===e.typeOf(r[this.uid])},destroy:function(){this.detach(),delete r[this.uid]}}),a.data?this.detach(a.data):r[this.uid]=a}var r={};return i}),i(w,[u,l,y],function(e,t,n){function i(i,r){var o,a;if(r||(r={}),a=r.type&&""!==r.type?r.type:t.getFileMime(r.name),r.name)o=r.name.replace(/\\/g,"/"),o=o.substr(o.lastIndexOf("/")+1);else{var s=a.split("/")[0];o=e.guid((""!==s?s:"file")+"_"),t.extensions[a]&&(o+="."+t.extensions[a][0])}n.apply(this,arguments),e.extend(this,{type:a||"",name:o||e.guid("file_"),lastModifiedDate:r.lastModifiedDate||(new Date).toLocaleString()})}return i.prototype=n.prototype,i}),i(E,[u,l,f,p,h,c,w,g,v],function(e,t,n,i,r,o,a,s,u){function c(r){var c=this,d,f,p;if(-1!==e.inArray(e.typeOf(r),["string","node"])&&(r={browse_button:r}),f=n.get(r.browse_button),!f)throw new i.DOMException(i.DOMException.NOT_FOUND_ERR);p={accept:[{title:o.translate("All Files"),extensions:"*"}],name:"file",multiple:!1,required_caps:!1,container:f.parentNode||document.body},r=e.extend({},p,r),"string"==typeof r.required_caps&&(r.required_caps=s.parseCaps(r.required_caps)),"string"==typeof r.accept&&(r.accept=t.mimes2extList(r.accept)),d=n.get(r.container),d||(d=document.body),"static"===n.getStyle(d,"position")&&(d.style.position="relative"),d=f=null,u.call(c),e.extend(c,{uid:e.guid("uid_"),ruid:null,shimid:null,files:null,init:function(){c.convertEventPropsToHandlers(l),c.bind("RuntimeInit",function(t,i){c.ruid=i.uid,c.shimid=i.shimid,c.bind("Ready",function(){c.trigger("Refresh")},999),c.bind("Change",function(){var t=i.exec.call(c,"FileInput","getFiles");c.files=[],e.each(t,function(e){return 0===e.size?!0:(c.files.push(new a(c.ruid,e)),void 0)})},999),c.bind("Refresh",function(){var t,o,a,s;a=n.get(r.browse_button),s=n.get(i.shimid),a&&(t=n.getPos(a,n.get(r.container)),o=n.getSize(a),s&&e.extend(s.style,{top:t.y+"px",left:t.x+"px",width:o.w+"px",height:o.h+"px"})),s=a=null}),i.exec.call(c,"FileInput","init",r)}),c.connectRuntime(e.extend({},r,{required_caps:{select_file:!0}}))},disable:function(t){var n=this.getRuntime();n&&n.exec.call(this,"FileInput","disable","undefined"===e.typeOf(t)?!0:t)},refresh:function(){c.trigger("Refresh")},destroy:function(){var t=this.getRuntime();t&&(t.exec.call(this,"FileInput","destroy"),this.disconnectRuntime()),"array"===e.typeOf(this.files)&&e.each(this.files,function(e){e.destroy()}),this.files=null}})}var l=["ready","change","cancel","mouseenter","mouseleave","mousedown","mouseup"];return c.prototype=r.instance,c}),i(_,[c,f,p,u,w,v,h,l],function(e,t,n,i,r,o,a,s){function u(n){var a=this,u;"string"==typeof n&&(n={drop_zone:n}),u={accept:[{title:e.translate("All Files"),extensions:"*"}],required_caps:{drag_and_drop:!0}},n="object"==typeof n?i.extend({},u,n):u,n.container=t.get(n.drop_zone)||document.body,"static"===t.getStyle(n.container,"position")&&(n.container.style.position="relative"),"string"==typeof n.accept&&(n.accept=s.mimes2extList(n.accept)),o.call(a),i.extend(a,{uid:i.guid("uid_"),ruid:null,files:null,init:function(){a.convertEventPropsToHandlers(c),a.bind("RuntimeInit",function(e,t){a.ruid=t.uid,a.bind("Drop",function(){var e=t.exec.call(a,"FileDrop","getFiles");a.files=[],i.each(e,function(e){a.files.push(new r(a.ruid,e))})},999),t.exec.call(a,"FileDrop","init",n),a.dispatchEvent("ready")}),a.connectRuntime(n)},destroy:function(){var e=this.getRuntime();e&&(e.exec.call(this,"FileDrop","destroy"),this.disconnectRuntime()),this.files=null}})}var c=["ready","dragenter","dragleave","drop","error"];return u.prototype=a.instance,u}),i(x,[u,v,h],function(e,t,n){function i(){this.uid=e.guid("uid_"),t.call(this),this.destroy=function(){this.disconnectRuntime(),this.unbindAll()}}return i.prototype=n.instance,i}),i(R,[u,m,p,h,y,w,x],function(e,t,n,i,r,o,a){function s(){function i(e,i){function l(e){o.readyState=s.DONE,o.error=e,o.trigger("error"),d()}function d(){c.destroy(),c=null,o.trigger("loadend")}function f(t){c.bind("Error",function(e,t){l(t)}),c.bind("Progress",function(e){o.result=t.exec.call(c,"FileReader","getResult"),o.trigger(e)}),c.bind("Load",function(e){o.readyState=s.DONE,o.result=t.exec.call(c,"FileReader","getResult"),o.trigger(e),d()}),t.exec.call(c,"FileReader","read",e,i)}if(c=new a,this.convertEventPropsToHandlers(u),this.readyState===s.LOADING)return l(new n.DOMException(n.DOMException.INVALID_STATE_ERR));if(this.readyState=s.LOADING,this.trigger("loadstart"),i instanceof r)if(i.isDetached()){var p=i.getSource();switch(e){case"readAsText":case"readAsBinaryString":this.result=p;break;case"readAsDataURL":this.result="data:"+i.type+";base64,"+t.btoa(p)}this.readyState=s.DONE,this.trigger("load"),d()}else f(c.connectRuntime(i.ruid));else l(new n.DOMException(n.DOMException.NOT_FOUND_ERR))}var o=this,c;e.extend(this,{uid:e.guid("uid_"),readyState:s.EMPTY,result:null,error:null,readAsBinaryString:function(e){i.call(this,"readAsBinaryString",e)},readAsDataURL:function(e){i.call(this,"readAsDataURL",e)},readAsText:function(e){i.call(this,"readAsText",e)
},abort:function(){this.result=null,-1===e.inArray(this.readyState,[s.EMPTY,s.DONE])&&(this.readyState===s.LOADING&&(this.readyState=s.DONE),c&&c.getRuntime().exec.call(this,"FileReader","abort"),this.trigger("abort"),this.trigger("loadend"))},destroy:function(){this.abort(),c&&(c.getRuntime().exec.call(this,"FileReader","destroy"),c.disconnectRuntime()),o=c=null}})}var u=["loadstart","progress","load","abort","error","loadend"];return s.EMPTY=0,s.LOADING=1,s.DONE=2,s.prototype=i.instance,s}),i(b,[],function(){var e=function(t,n){for(var i=["source","scheme","authority","userInfo","user","pass","host","port","relative","path","directory","file","query","fragment"],r=i.length,o={http:80,https:443},a={},s=/^(?:([^:\/?#]+):)?(?:\/\/()(?:(?:()(?:([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?()(?:(()(?:(?:[^?#\/]*\/)*)()(?:[^?#]*))(?:\\?([^#]*))?(?:#(.*))?)/,u=s.exec(t||"");r--;)u[r]&&(a[i[r]]=u[r]);if(!a.scheme){n&&"string"!=typeof n||(n=e(n||document.location.href)),a.scheme=n.scheme,a.host=n.host,a.port=n.port;var c="";/^[^\/]/.test(a.path)&&(c=n.path,/(\/|\/[^\.]+)$/.test(c)?c+="/":c=c.replace(/\/[^\/]+$/,"/")),a.path=c+(a.path||"")}return a.port||(a.port=o[a.scheme]||80),a.port=parseInt(a.port,10),a.path||(a.path="/"),delete a.source,a},t=function(t){var n={http:80,https:443},i=e(t);return i.scheme+"://"+i.host+(i.port!==n[i.scheme]?":"+i.port:"")+i.path+(i.query?i.query:"")},n=function(t){function n(e){return[e.scheme,e.host,e.port].join("/")}return"string"==typeof t&&(t=e(t)),n(e())===n(t)};return{parseUrl:e,resolveUrl:t,hasSameOrigin:n}}),i(T,[u,v,m],function(e,t,n){return function(){function i(e,t){if(!t.isDetached()){var i=this.connectRuntime(t.ruid).exec.call(this,"FileReaderSync","read",e,t);return this.disconnectRuntime(),i}var r=t.getSource();switch(e){case"readAsBinaryString":return r;case"readAsDataURL":return"data:"+t.type+";base64,"+n.btoa(r);case"readAsText":for(var o="",a=0,s=r.length;s>a;a++)o+=String.fromCharCode(r[a]);return o}}t.call(this),e.extend(this,{uid:e.guid("uid_"),readAsBinaryString:function(e){return i.call(this,"readAsBinaryString",e)},readAsDataURL:function(e){return i.call(this,"readAsDataURL",e)},readAsText:function(e){return i.call(this,"readAsText",e)}})}}),i(S,[p,u,y],function(e,t,n){function i(){var e,i=[];t.extend(this,{append:function(r,o){var a=this,s=t.typeOf(o);o instanceof n?e={name:r,value:o}:"array"===s?(r+="[]",t.each(o,function(e){a.append(r,e)})):"object"===s?t.each(o,function(e,t){a.append(r+"["+t+"]",e)}):"null"===s||"undefined"===s||"number"===s&&isNaN(o)?a.append(r,"false"):i.push({name:r,value:o.toString()})},hasBlob:function(){return!!this.getBlob()},getBlob:function(){return e&&e.value||null},getBlobName:function(){return e&&e.name||null},each:function(n){t.each(i,function(e){n(e.value,e.name)}),e&&n(e.value,e.name)},destroy:function(){e=null,i=[]}})}return i}),i(A,[u,p,h,m,b,g,x,y,T,S,d,l],function(e,t,n,i,r,o,a,s,u,c,l,d){function f(){this.uid=e.guid("uid_")}function p(){function n(e,t){return y.hasOwnProperty(e)?1===arguments.length?l.can("define_property")?y[e]:v[e]:(l.can("define_property")?y[e]=t:v[e]=t,void 0):void 0}function u(t){function i(){k.destroy(),k=null,s.dispatchEvent("loadend"),s=null}function r(r){k.bind("LoadStart",function(e){n("readyState",p.LOADING),s.dispatchEvent("readystatechange"),s.dispatchEvent(e),I&&s.upload.dispatchEvent(e)}),k.bind("Progress",function(e){n("readyState")!==p.LOADING&&(n("readyState",p.LOADING),s.dispatchEvent("readystatechange")),s.dispatchEvent(e)}),k.bind("UploadProgress",function(e){I&&s.upload.dispatchEvent({type:"progress",lengthComputable:!1,total:e.total,loaded:e.loaded})}),k.bind("Load",function(t){n("readyState",p.DONE),n("status",Number(r.exec.call(k,"XMLHttpRequest","getStatus")||0)),n("statusText",h[n("status")]||""),n("response",r.exec.call(k,"XMLHttpRequest","getResponse",n("responseType"))),~e.inArray(n("responseType"),["text",""])?n("responseText",n("response")):"document"===n("responseType")&&n("responseXML",n("response")),U=r.exec.call(k,"XMLHttpRequest","getAllResponseHeaders"),s.dispatchEvent("readystatechange"),n("status")>0?(I&&s.upload.dispatchEvent(t),s.dispatchEvent(t)):(N=!0,s.dispatchEvent("error")),i()}),k.bind("Abort",function(e){s.dispatchEvent(e),i()}),k.bind("Error",function(e){N=!0,n("readyState",p.DONE),s.dispatchEvent("readystatechange"),D=!0,s.dispatchEvent(e),i()}),r.exec.call(k,"XMLHttpRequest","send",{url:E,method:_,async:w,user:R,password:b,headers:x,mimeType:S,encoding:T,responseType:s.responseType,withCredentials:s.withCredentials,options:P},t)}var s=this;M=(new Date).getTime(),k=new a,"string"==typeof P.required_caps&&(P.required_caps=o.parseCaps(P.required_caps)),P.required_caps=e.extend({},P.required_caps,{return_response_type:s.responseType}),t instanceof c&&(P.required_caps.send_multipart=!0),L||(P.required_caps.do_cors=!0),P.ruid?r(k.connectRuntime(P)):(k.bind("RuntimeInit",function(e,t){r(t)}),k.bind("RuntimeError",function(e,t){s.dispatchEvent("RuntimeError",t)}),k.connectRuntime(P))}function g(){n("responseText",""),n("responseXML",null),n("response",null),n("status",0),n("statusText",""),M=C=null}var v=this,y={timeout:0,readyState:p.UNSENT,withCredentials:!1,status:0,statusText:"",responseType:"",responseXML:null,responseText:null,response:null},w=!0,E,_,x={},R,b,T=null,S=null,A=!1,O=!1,I=!1,D=!1,N=!1,L=!1,M,C,F=null,H=null,P={},k,U="",B;e.extend(this,y,{uid:e.guid("uid_"),upload:new f,open:function(o,a,s,u,c){var l;if(!o||!a)throw new t.DOMException(t.DOMException.SYNTAX_ERR);if(/[\u0100-\uffff]/.test(o)||i.utf8_encode(o)!==o)throw new t.DOMException(t.DOMException.SYNTAX_ERR);if(~e.inArray(o.toUpperCase(),["CONNECT","DELETE","GET","HEAD","OPTIONS","POST","PUT","TRACE","TRACK"])&&(_=o.toUpperCase()),~e.inArray(_,["CONNECT","TRACE","TRACK"]))throw new t.DOMException(t.DOMException.SECURITY_ERR);if(a=i.utf8_encode(a),l=r.parseUrl(a),L=r.hasSameOrigin(l),E=r.resolveUrl(a),(u||c)&&!L)throw new t.DOMException(t.DOMException.INVALID_ACCESS_ERR);if(R=u||l.user,b=c||l.pass,w=s||!0,w===!1&&(n("timeout")||n("withCredentials")||""!==n("responseType")))throw new t.DOMException(t.DOMException.INVALID_ACCESS_ERR);A=!w,O=!1,x={},g.call(this),n("readyState",p.OPENED),this.convertEventPropsToHandlers(["readystatechange"]),this.dispatchEvent("readystatechange")},setRequestHeader:function(r,o){var a=["accept-charset","accept-encoding","access-control-request-headers","access-control-request-method","connection","content-length","cookie","cookie2","content-transfer-encoding","date","expect","host","keep-alive","origin","referer","te","trailer","transfer-encoding","upgrade","user-agent","via"];if(n("readyState")!==p.OPENED||O)throw new t.DOMException(t.DOMException.INVALID_STATE_ERR);if(/[\u0100-\uffff]/.test(r)||i.utf8_encode(r)!==r)throw new t.DOMException(t.DOMException.SYNTAX_ERR);return r=e.trim(r).toLowerCase(),~e.inArray(r,a)||/^(proxy\-|sec\-)/.test(r)?!1:(x[r]?x[r]+=", "+o:x[r]=o,!0)},getAllResponseHeaders:function(){return U||""},getResponseHeader:function(t){return t=t.toLowerCase(),N||~e.inArray(t,["set-cookie","set-cookie2"])?null:U&&""!==U&&(B||(B={},e.each(U.split(/\r\n/),function(t){var n=t.split(/:\s+/);2===n.length&&(n[0]=e.trim(n[0]),B[n[0].toLowerCase()]={header:n[0],value:e.trim(n[1])})})),B.hasOwnProperty(t))?B[t].header+": "+B[t].value:null},overrideMimeType:function(i){var r,o;if(~e.inArray(n("readyState"),[p.LOADING,p.DONE]))throw new t.DOMException(t.DOMException.INVALID_STATE_ERR);if(i=e.trim(i.toLowerCase()),/;/.test(i)&&(r=i.match(/^([^;]+)(?:;\scharset\=)?(.*)$/))&&(i=r[1],r[2]&&(o=r[2])),!d.mimes[i])throw new t.DOMException(t.DOMException.SYNTAX_ERR);F=i,H=o},send:function(n,r){if(P="string"===e.typeOf(r)?{ruid:r}:r?r:{},this.convertEventPropsToHandlers(m),this.upload.convertEventPropsToHandlers(m),this.readyState!==p.OPENED||O)throw new t.DOMException(t.DOMException.INVALID_STATE_ERR);if(n instanceof s)P.ruid=n.ruid,S=n.type||"application/octet-stream";else if(n instanceof c){if(n.hasBlob()){var o=n.getBlob();P.ruid=o.ruid,S=o.type||"application/octet-stream"}}else"string"==typeof n&&(T="UTF-8",S="text/plain;charset=UTF-8",n=i.utf8_encode(n));this.withCredentials||(this.withCredentials=P.required_caps&&P.required_caps.send_browser_cookies&&!L),I=!A&&this.upload.hasEventListener(),N=!1,D=!n,A||(O=!0),u.call(this,n)},abort:function(){if(N=!0,A=!1,~e.inArray(n("readyState"),[p.UNSENT,p.OPENED,p.DONE]))n("readyState",p.UNSENT);else{if(n("readyState",p.DONE),O=!1,!k)throw new t.DOMException(t.DOMException.INVALID_STATE_ERR);k.getRuntime().exec.call(k,"XMLHttpRequest","abort",D),D=!0}},destroy:function(){k&&("function"===e.typeOf(k.destroy)&&k.destroy(),k=null),this.unbindAll(),this.upload&&(this.upload.unbindAll(),this.upload=null)}})}var h={100:"Continue",101:"Switching Protocols",102:"Processing",200:"OK",201:"Created",202:"Accepted",203:"Non-Authoritative Information",204:"No Content",205:"Reset Content",206:"Partial Content",207:"Multi-Status",226:"IM Used",300:"Multiple Choices",301:"Moved Permanently",302:"Found",303:"See Other",304:"Not Modified",305:"Use Proxy",306:"Reserved",307:"Temporary Redirect",400:"Bad Request",401:"Unauthorized",402:"Payment Required",403:"Forbidden",404:"Not Found",405:"Method Not Allowed",406:"Not Acceptable",407:"Proxy Authentication Required",408:"Request Timeout",409:"Conflict",410:"Gone",411:"Length Required",412:"Precondition Failed",413:"Request Entity Too Large",414:"Request-URI Too Long",415:"Unsupported Media Type",416:"Requested Range Not Satisfiable",417:"Expectation Failed",422:"Unprocessable Entity",423:"Locked",424:"Failed Dependency",426:"Upgrade Required",500:"Internal Server Error",501:"Not Implemented",502:"Bad Gateway",503:"Service Unavailable",504:"Gateway Timeout",505:"HTTP Version Not Supported",506:"Variant Also Negotiates",507:"Insufficient Storage",510:"Not Extended"};f.prototype=n.instance;var m=["loadstart","progress","abort","error","load","timeout","loadend"],g=1,v=2;return p.UNSENT=0,p.OPENED=1,p.HEADERS_RECEIVED=2,p.LOADING=3,p.DONE=4,p.prototype=n.instance,p}),i(O,[u,m,v,h],function(e,t,n,i){function r(){function i(){l=d=0,c=this.result=null}function o(t,n){var i=this;u=n,i.bind("TransportingProgress",function(t){d=t.loaded,l>d&&-1===e.inArray(i.state,[r.IDLE,r.DONE])&&a.call(i)},999),i.bind("TransportingComplete",function(){d=l,i.state=r.DONE,c=null,i.result=u.exec.call(i,"Transporter","getAsBlob",t||"")},999),i.state=r.BUSY,i.trigger("TransportingStarted"),a.call(i)}function a(){var e=this,n,i=l-d;f>i&&(f=i),n=t.btoa(c.substr(d,f)),u.exec.call(e,"Transporter","receive",n,l)}var s,u,c,l,d,f;n.call(this),e.extend(this,{uid:e.guid("uid_"),state:r.IDLE,result:null,transport:function(t,n,r){var a=this;if(r=e.extend({chunk_size:204798},r),(s=r.chunk_size%3)&&(r.chunk_size+=3-s),f=r.chunk_size,i.call(this),c=t,l=t.length,"string"===e.typeOf(r)||r.ruid)o.call(a,n,this.connectRuntime(r));else{var u=function(e,t){a.unbind("RuntimeInit",u),o.call(a,n,t)};this.bind("RuntimeInit",u),this.connectRuntime(r)}},abort:function(){var e=this;e.state=r.IDLE,u&&(u.exec.call(e,"Transporter","clear"),e.trigger("TransportingAborted")),i.call(e)},destroy:function(){this.unbindAll(),u=null,this.disconnectRuntime(),i.call(this)}})}return r.IDLE=0,r.BUSY=1,r.DONE=2,r.prototype=i.instance,r}),i(I,[u,f,p,T,A,g,v,O,d,h,y,w,m],function(e,t,n,i,r,o,a,s,u,c,l,d,f){function p(){function i(e){e||(e=this.getRuntime().exec.call(this,"Image","getInfo")),this.size=e.size,this.width=e.width,this.height=e.height,this.type=e.type,this.meta=e.meta,""===this.name&&(this.name=e.name)}function c(t){var i=e.typeOf(t);try{if(t instanceof p){if(!t.size)throw new n.DOMException(n.DOMException.INVALID_STATE_ERR);m.apply(this,arguments)}else if(t instanceof l){if(!~e.inArray(t.type,["image/jpeg","image/png"]))throw new n.ImageError(n.ImageError.WRONG_FORMAT);g.apply(this,arguments)}else if(-1!==e.inArray(i,["blob","file"]))c.call(this,new d(null,t),arguments[1]);else if("string"===i)/^data:[^;]*;base64,/.test(t)?c.call(this,new l(null,{data:t}),arguments[1]):v.apply(this,arguments);else{if("node"!==i||"img"!==t.nodeName.toLowerCase())throw new n.DOMException(n.DOMException.TYPE_MISMATCH_ERR);c.call(this,t.src,arguments[1])}}catch(r){this.trigger("error",r)}}function m(t,n){var i=this.connectRuntime(t.ruid);this.ruid=i.uid,i.exec.call(this,"Image","loadFromImage",t,"undefined"===e.typeOf(n)?!0:n)}function g(t,n){function i(e){r.ruid=e.uid,e.exec.call(r,"Image","loadFromBlob",t)}var r=this;r.name=t.name||"",t.isDetached()?(this.bind("RuntimeInit",function(e,t){i(t)}),n&&"string"==typeof n.required_caps&&(n.required_caps=o.parseCaps(n.required_caps)),this.connectRuntime(e.extend({required_caps:{access_image_binary:!0,resize_image:!0}},n))):i(this.connectRuntime(t.ruid))}function v(e,t){var n=this,i;i=new r,i.open("get",e),i.responseType="blob",i.onprogress=function(e){n.trigger(e)},i.onload=function(){g.call(n,i.response,!0)},i.onerror=function(e){n.trigger(e)},i.onloadend=function(){i.destroy()},i.bind("RuntimeError",function(e,t){n.trigger("RuntimeError",t)}),i.send(null,t)}a.call(this),e.extend(this,{uid:e.guid("uid_"),ruid:null,name:"",size:0,width:0,height:0,type:"",meta:{},clone:function(){this.load.apply(this,arguments)},load:function(){this.bind("Load Resize",function(){i.call(this)},999),this.convertEventPropsToHandlers(h),c.apply(this,arguments)},downsize:function(t,i,r,o){try{if(!this.size)throw new n.DOMException(n.DOMException.INVALID_STATE_ERR);if(this.width>p.MAX_RESIZE_WIDTH||this.height>p.MAX_RESIZE_HEIGHT)throw new n.ImageError(n.ImageError.MAX_RESOLUTION_ERR);(!t&&!i||"undefined"===e.typeOf(r))&&(r=!1),t=t||this.width,i=i||this.height,o="undefined"===e.typeOf(o)?!0:!!o,this.getRuntime().exec.call(this,"Image","downsize",t,i,r,o)}catch(a){this.trigger("error",a)}},crop:function(e,t,n){this.downsize(e,t,!0,n)},getAsCanvas:function(){if(!u.can("create_canvas"))throw new n.RuntimeError(n.RuntimeError.NOT_SUPPORTED_ERR);var e=this.connectRuntime(this.ruid);return e.exec.call(this,"Image","getAsCanvas")},getAsBlob:function(e,t){if(!this.size)throw new n.DOMException(n.DOMException.INVALID_STATE_ERR);return e||(e="image/jpeg"),"image/jpeg"!==e||t||(t=90),this.getRuntime().exec.call(this,"Image","getAsBlob",e,t)},getAsDataURL:function(e,t){if(!this.size)throw new n.DOMException(n.DOMException.INVALID_STATE_ERR);return this.getRuntime().exec.call(this,"Image","getAsDataURL",e,t)},getAsBinaryString:function(e,t){var n=this.getAsDataURL(e,t);return f.atob(n.substring(n.indexOf("base64,")+7))},embed:function(i){function r(){if(u.can("create_canvas")){var t=a.getAsCanvas();if(t)return i.appendChild(t),t=null,a.destroy(),o.trigger("embedded"),void 0}var r=a.getAsDataURL(c,l);if(!r)throw new n.ImageError(n.ImageError.WRONG_FORMAT);if(u.can("use_data_uri_of",r.length))i.innerHTML='<img src="'+r+'" width="'+a.width+'" height="'+a.height+'" />',a.destroy(),o.trigger("embedded");else{var d=new s;d.bind("TransportingComplete",function(){v=o.connectRuntime(this.result.ruid),o.bind("Embedded",function(){e.extend(v.getShimContainer().style,{top:"0px",left:"0px",width:a.width+"px",height:a.height+"px"}),v=null},999),v.exec.call(o,"ImageView","display",this.result.uid,m,g),a.destroy()}),d.transport(f.atob(r.substring(r.indexOf("base64,")+7)),c,e.extend({},h,{required_caps:{display_media:!0},runtime_order:"flash,silverlight",container:i}))}}var o=this,a,c,l,d,h=arguments[1]||{},m=this.width,g=this.height,v;try{if(!(i=t.get(i)))throw new n.DOMException(n.DOMException.INVALID_NODE_TYPE_ERR);if(!this.size)throw new n.DOMException(n.DOMException.INVALID_STATE_ERR);if(this.width>p.MAX_RESIZE_WIDTH||this.height>p.MAX_RESIZE_HEIGHT)throw new n.ImageError(n.ImageError.MAX_RESOLUTION_ERR);if(c=h.type||this.type||"image/jpeg",l=h.quality||90,d="undefined"!==e.typeOf(h.crop)?h.crop:!1,h.width)m=h.width,g=h.height||m;else{var y=t.getSize(i);y.w&&y.h&&(m=y.w,g=y.h)}return a=new p,a.bind("Resize",function(){r.call(o)}),a.bind("Load",function(){a.downsize(m,g,d,!1)}),a.clone(this,!1),a}catch(w){this.trigger("error",w)}},destroy:function(){this.ruid&&(this.getRuntime().exec.call(this,"Image","destroy"),this.disconnectRuntime()),this.unbindAll()}})}var h=["progress","load","error","resize","embedded"];return p.MAX_RESIZE_WIDTH=6500,p.MAX_RESIZE_HEIGHT=6500,p.prototype=c.instance,p}),i(D,[u,p,g,d],function(e,t,n,i){function r(t){var r=this,s=n.capTest,u=n.capTrue,c=e.extend({access_binary:s(window.FileReader||window.File&&window.File.getAsDataURL),access_image_binary:function(){return r.can("access_binary")&&!!a.Image},display_media:s(i.can("create_canvas")||i.can("use_data_uri_over32kb")),do_cors:s(window.XMLHttpRequest&&"withCredentials"in new XMLHttpRequest),drag_and_drop:s(function(){var e=document.createElement("div");return("draggable"in e||"ondragstart"in e&&"ondrop"in e)&&("IE"!==i.browser||i.version>9)}()),filter_by_extension:s(function(){return"Chrome"===i.browser&&i.version>=28||"IE"===i.browser&&i.version>=10}()),return_response_headers:u,return_response_type:function(e){return"json"===e&&window.JSON?!0:i.can("return_response_type",e)},return_status_code:u,report_upload_progress:s(window.XMLHttpRequest&&(new XMLHttpRequest).upload),resize_image:function(){return r.can("access_binary")&&i.can("create_canvas")},select_file:function(){return i.can("use_fileinput")&&window.File},select_folder:function(){return r.can("select_file")&&"Chrome"===i.browser&&i.version>=21},select_multiple:function(){return!(!r.can("select_file")||"Safari"===i.browser&&"Windows"===i.os||"iOS"===i.os&&i.verComp(i.osVersion,"7.0.4","<"))},send_binary_string:s(window.XMLHttpRequest&&((new XMLHttpRequest).sendAsBinary||window.Uint8Array&&window.ArrayBuffer)),send_custom_headers:s(window.XMLHttpRequest),send_multipart:function(){return!!(window.XMLHttpRequest&&(new XMLHttpRequest).upload&&window.FormData)||r.can("send_binary_string")},slice_blob:s(window.File&&(File.prototype.mozSlice||File.prototype.webkitSlice||File.prototype.slice)),stream_upload:function(){return r.can("slice_blob")&&r.can("send_multipart")},summon_file_dialog:s(function(){return"Firefox"===i.browser&&i.version>=4||"Opera"===i.browser&&i.version>=12||"IE"===i.browser&&i.version>=10||!!~e.inArray(i.browser,["Chrome","Safari"])}()),upload_filesize:u},arguments[2]);n.call(this,t,arguments[1]||o,c),e.extend(this,{init:function(){this.trigger("Init")},destroy:function(e){return function(){e.call(r),e=r=null}}(this.destroy)}),e.extend(this.getShim(),a)}var o="html5",a={};return n.addConstructor(o,r),a}),i(N,[D,y],function(e,t){function n(){function e(e,t,n){var i;if(!window.File.prototype.slice)return(i=window.File.prototype.webkitSlice||window.File.prototype.mozSlice)?i.call(e,t,n):null;try{return e.slice(),e.slice(t,n)}catch(r){return e.slice(t,n-t)}}this.slice=function(){return new t(this.getRuntime().uid,e.apply(this,arguments))}}return e.Blob=n}),i(L,[u],function(e){function t(){this.returnValue=!1}function n(){this.cancelBubble=!0}var i={},r="moxie_"+e.guid(),o=function(o,a,s,u){var c,l;a=a.toLowerCase(),o.addEventListener?(c=s,o.addEventListener(a,c,!1)):o.attachEvent&&(c=function(){var e=window.event;e.target||(e.target=e.srcElement),e.preventDefault=t,e.stopPropagation=n,s(e)},o.attachEvent("on"+a,c)),o[r]||(o[r]=e.guid()),i.hasOwnProperty(o[r])||(i[o[r]]={}),l=i[o[r]],l.hasOwnProperty(a)||(l[a]=[]),l[a].push({func:c,orig:s,key:u})},a=function(t,n,o){var a,s;if(n=n.toLowerCase(),t[r]&&i[t[r]]&&i[t[r]][n]){a=i[t[r]][n];for(var u=a.length-1;u>=0&&(a[u].orig!==o&&a[u].key!==o||(t.removeEventListener?t.removeEventListener(n,a[u].func,!1):t.detachEvent&&t.detachEvent("on"+n,a[u].func),a[u].orig=null,a[u].func=null,a.splice(u,1),o===s));u--);if(a.length||delete i[t[r]][n],e.isEmptyObj(i[t[r]])){delete i[t[r]];try{delete t[r]}catch(c){t[r]=s}}}},s=function(t,n){t&&t[r]&&e.each(i[t[r]],function(e,i){a(t,i,n)})};return{addEvent:o,removeEvent:a,removeAllEvents:s}}),i(M,[D,u,f,L,l,d],function(e,t,n,i,r,o){function a(){var e=[],a;t.extend(this,{init:function(s){var u=this,c=u.getRuntime(),l,d,f,p,h,m;a=s,e=[],f=a.accept.mimes||r.extList2mimes(a.accept,c.can("filter_by_extension")),d=c.getShimContainer(),d.innerHTML='<input id="'+c.uid+'" type="file" style="font-size:999px;opacity:0;"'+(a.multiple&&c.can("select_multiple")?"multiple":"")+(a.directory&&c.can("select_folder")?"webkitdirectory directory":"")+(f?' accept="'+f.join(",")+'"':"")+" />",l=n.get(c.uid),t.extend(l.style,{position:"absolute",top:0,left:0,width:"100%",height:"100%"}),p=n.get(a.browse_button),c.can("summon_file_dialog")&&("static"===n.getStyle(p,"position")&&(p.style.position="relative"),h=parseInt(n.getStyle(p,"z-index"),10)||1,p.style.zIndex=h,d.style.zIndex=h-1,i.addEvent(p,"click",function(e){var t=n.get(c.uid);t&&!t.disabled&&t.click(),e.preventDefault()},u.uid)),m=c.can("summon_file_dialog")?p:d,i.addEvent(m,"mouseover",function(){u.trigger("mouseenter")},u.uid),i.addEvent(m,"mouseout",function(){u.trigger("mouseleave")},u.uid),i.addEvent(m,"mousedown",function(){u.trigger("mousedown")},u.uid),i.addEvent(n.get(a.container),"mouseup",function(){u.trigger("mouseup")},u.uid),l.onchange=function g(){if(e=[],a.directory?t.each(this.files,function(t){"."!==t.name&&e.push(t)}):e=[].slice.call(this.files),"IE"!==o.browser)this.value="";else{var n=this.cloneNode(!0);this.parentNode.replaceChild(n,this),n.onchange=g}u.trigger("change")},u.trigger({type:"ready",async:!0}),d=null},getFiles:function(){return e},disable:function(e){var t=this.getRuntime(),i;(i=n.get(t.uid))&&(i.disabled=!!e)},destroy:function(){var t=this.getRuntime(),r=t.getShim(),o=t.getShimContainer();i.removeAllEvents(o,this.uid),i.removeAllEvents(a&&n.get(a.container),this.uid),i.removeAllEvents(a&&n.get(a.browse_button),this.uid),o&&(o.innerHTML=""),r.removeInstance(this.uid),e=a=o=r=null}})}return e.FileInput=a}),i(C,[D,u,f,L,l],function(e,t,n,i,r){function o(){function e(e){for(var n=[],i=0;i<e.length;i++)[].push.apply(n,e[i].extensions.split(/\s*,\s*/));return-1===t.inArray("*",n)?n:[]}function o(e){var n=r.getFileExtension(e.name);return!n||!d.length||-1!==t.inArray(n,d)}function a(e,n){var i=[];t.each(e,function(e){var t=e.webkitGetAsEntry();if(t)if(t.isFile){var n=e.getAsFile();o(n)&&l.push(n)}else i.push(t)}),i.length?s(i,n):n()}function s(e,n){var i=[];t.each(e,function(e){i.push(function(t){u(e,t)})}),t.inSeries(i,function(){n()})}function u(e,t){e.isFile?e.file(function(e){o(e)&&l.push(e),t()},function(){t()}):e.isDirectory?c(e,t):t()}function c(e,t){function n(e){r.readEntries(function(t){t.length?([].push.apply(i,t),n(e)):e()},e)}var i=[],r=e.createReader();n(function(){s(i,t)})}var l=[],d=[],f;t.extend(this,{init:function(n){var r=this,s;f=n,d=e(f.accept),s=f.container,i.addEvent(s,"dragover",function(e){e.preventDefault(),e.stopPropagation(),e.dataTransfer.dropEffect="copy"},r.uid),i.addEvent(s,"drop",function(e){e.preventDefault(),e.stopPropagation(),l=[],e.dataTransfer.items&&e.dataTransfer.items[0].webkitGetAsEntry?a(e.dataTransfer.items,function(){r.trigger("drop")}):(t.each(e.dataTransfer.files,function(e){o(e)&&l.push(e)}),r.trigger("drop"))},r.uid),i.addEvent(s,"dragenter",function(e){e.preventDefault(),e.stopPropagation(),r.trigger("dragenter")},r.uid),i.addEvent(s,"dragleave",function(e){e.preventDefault(),e.stopPropagation(),r.trigger("dragleave")},r.uid)},getFiles:function(){return l},destroy:function(){i.removeAllEvents(f&&n.get(f.container),this.uid),l=d=f=null}})}return e.FileDrop=o}),i(F,[D,m,u],function(e,t,n){function i(){function e(e){return t.atob(e.substring(e.indexOf("base64,")+7))}var i,r=!1;n.extend(this,{read:function(e,t){var o=this;i=new window.FileReader,i.addEventListener("progress",function(e){o.trigger(e)}),i.addEventListener("load",function(e){o.trigger(e)}),i.addEventListener("error",function(e){o.trigger(e,i.error)}),i.addEventListener("loadend",function(){i=null}),"function"===n.typeOf(i[e])?(r=!1,i[e](t.getSource())):"readAsBinaryString"===e&&(r=!0,i.readAsDataURL(t.getSource()))},getResult:function(){return i&&i.result?r?e(i.result):i.result:null},abort:function(){i&&i.abort()},destroy:function(){i=null}})}return e.FileReader=i}),i(H,[D,u,l,b,w,y,S,p,d],function(e,t,n,i,r,o,a,s,u){function c(){function e(e,t){var n=this,i,r;i=t.getBlob().getSource(),r=new window.FileReader,r.onload=function(){t.append(t.getBlobName(),new o(null,{type:i.type,data:r.result})),f.send.call(n,e,t)},r.readAsBinaryString(i)}function c(){return!window.XMLHttpRequest||"IE"===u.browser&&u.version<8?function(){for(var e=["Msxml2.XMLHTTP.6.0","Microsoft.XMLHTTP"],t=0;t<e.length;t++)try{return new ActiveXObject(e[t])}catch(n){}}():new window.XMLHttpRequest}function l(e){var t=e.responseXML,n=e.responseText;return"IE"===u.browser&&n&&t&&!t.documentElement&&/[^\/]+\/[^\+]+\+xml/.test(e.getResponseHeader("Content-Type"))&&(t=new window.ActiveXObject("Microsoft.XMLDOM"),t.async=!1,t.validateOnParse=!1,t.loadXML(n)),t&&("IE"===u.browser&&0!==t.parseError||!t.documentElement||"parsererror"===t.documentElement.tagName)?null:t}function d(e){var t="----moxieboundary"+(new Date).getTime(),n="--",i="\r\n",r="",a=this.getRuntime();if(!a.can("send_binary_string"))throw new s.RuntimeError(s.RuntimeError.NOT_SUPPORTED_ERR);return p.setRequestHeader("Content-Type","multipart/form-data; boundary="+t),e.each(function(e,a){r+=e instanceof o?n+t+i+'Content-Disposition: form-data; name="'+a+'"; filename="'+unescape(encodeURIComponent(e.name||"blob"))+'"'+i+"Content-Type: "+(e.type||"application/octet-stream")+i+i+e.getSource()+i:n+t+i+'Content-Disposition: form-data; name="'+a+'"'+i+i+unescape(encodeURIComponent(e))+i}),r+=n+t+n+i}var f=this,p,h;t.extend(this,{send:function(n,r){var s=this,l="Mozilla"===u.browser&&u.version>=4&&u.version<7,f="Android Browser"===u.browser,m=!1;if(h=n.url.replace(/^.+?\/([\w\-\.]+)$/,"$1").toLowerCase(),p=c(),p.open(n.method,n.url,n.async,n.user,n.password),r instanceof o)r.isDetached()&&(m=!0),r=r.getSource();else if(r instanceof a){if(r.hasBlob())if(r.getBlob().isDetached())r=d.call(s,r),m=!0;else if((l||f)&&"blob"===t.typeOf(r.getBlob().getSource())&&window.FileReader)return e.call(s,n,r),void 0;if(r instanceof a){var g=new window.FormData;r.each(function(e,t){e instanceof o?g.append(t,e.getSource()):g.append(t,e)}),r=g}}p.upload?(n.withCredentials&&(p.withCredentials=!0),p.addEventListener("load",function(e){s.trigger(e)}),p.addEventListener("error",function(e){s.trigger(e)}),p.addEventListener("progress",function(e){s.trigger(e)}),p.upload.addEventListener("progress",function(e){s.trigger({type:"UploadProgress",loaded:e.loaded,total:e.total})})):p.onreadystatechange=function v(){switch(p.readyState){case 1:break;case 2:break;case 3:var e,t;try{i.hasSameOrigin(n.url)&&(e=p.getResponseHeader("Content-Length")||0),p.responseText&&(t=p.responseText.length)}catch(r){e=t=0}s.trigger({type:"progress",lengthComputable:!!e,total:parseInt(e,10),loaded:t});break;case 4:p.onreadystatechange=function(){},0===p.status?s.trigger("error"):s.trigger("load")}},t.isEmptyObj(n.headers)||t.each(n.headers,function(e,t){p.setRequestHeader(t,e)}),""!==n.responseType&&"responseType"in p&&(p.responseType="json"!==n.responseType||u.can("return_response_type","json")?n.responseType:"text"),m?p.sendAsBinary?p.sendAsBinary(r):function(){for(var e=new Uint8Array(r.length),t=0;t<r.length;t++)e[t]=255&r.charCodeAt(t);p.send(e.buffer)}():p.send(r),s.trigger("loadstart")},getStatus:function(){try{if(p)return p.status}catch(e){}return 0},getResponse:function(e){var t=this.getRuntime();try{switch(e){case"blob":var i=new r(t.uid,p.response),o=p.getResponseHeader("Content-Disposition");if(o){var a=o.match(/filename=([\'\"'])([^\1]+)\1/);a&&(h=a[2])}return i.name=h,i.type||(i.type=n.getFileMime(h)),i;case"json":return u.can("return_response_type","json")?p.response:200===p.status&&window.JSON?JSON.parse(p.responseText):null;case"document":return l(p);default:return""!==p.responseText?p.responseText:null}}catch(s){return null}},getAllResponseHeaders:function(){try{return p.getAllResponseHeaders()}catch(e){}return""},abort:function(){p&&p.abort()},destroy:function(){f=h=null}})}return e.XMLHttpRequest=c}),i(P,[],function(){return function(){function e(e,t){var n=r?0:-8*(t-1),i=0,a;for(a=0;t>a;a++)i|=o.charCodeAt(e+a)<<Math.abs(n+8*a);return i}function n(e,t,n){n=3===arguments.length?n:o.length-t-1,o=o.substr(0,t)+e+o.substr(n+t)}function i(e,t,i){var o="",a=r?0:-8*(i-1),s;for(s=0;i>s;s++)o+=String.fromCharCode(255&t>>Math.abs(a+8*s));n(o,e,i)}var r=!1,o;return{II:function(e){return e===t?r:(r=e,void 0)},init:function(e){r=!1,o=e},SEGMENT:function(e,t,i){switch(arguments.length){case 1:return o.substr(e,o.length-e-1);case 2:return o.substr(e,t);case 3:n(i,e,t);break;default:return o}},BYTE:function(t){return e(t,1)},SHORT:function(t){return e(t,2)},LONG:function(n,r){return r===t?e(n,4):(i(n,r,4),void 0)},SLONG:function(t){var n=e(t,4);return n>2147483647?n-4294967296:n},STRING:function(t,n){var i="";for(n+=t;n>t;t++)i+=String.fromCharCode(e(t,1));return i}}}}),i(k,[P],function(e){return function t(n){var i=[],r,o,a,s=0;if(r=new e,r.init(n),65496===r.SHORT(0)){for(o=2;o<=n.length;)if(a=r.SHORT(o),a>=65488&&65495>=a)o+=2;else{if(65498===a||65497===a)break;s=r.SHORT(o+2)+2,a>=65505&&65519>=a&&i.push({hex:a,name:"APP"+(15&a),start:o,length:s,segment:r.SEGMENT(o,s)}),o+=s}return r.init(null),{headers:i,restore:function(e){var t,n;for(r.init(e),o=65504==r.SHORT(2)?4+r.SHORT(4):2,n=0,t=i.length;t>n;n++)r.SEGMENT(o,0,i[n].segment),o+=i[n].length;return e=r.SEGMENT(),r.init(null),e},strip:function(e){var n,i,o;for(i=new t(e),n=i.headers,i.purge(),r.init(e),o=n.length;o--;)r.SEGMENT(n[o].start,n[o].length,"");return e=r.SEGMENT(),r.init(null),e},get:function(e){for(var t=[],n=0,r=i.length;r>n;n++)i[n].name===e.toUpperCase()&&t.push(i[n].segment);return t},set:function(e,t){var n=[],r,o,a;for("string"==typeof t?n.push(t):n=t,r=o=0,a=i.length;a>r&&(i[r].name===e.toUpperCase()&&(i[r].segment=n[o],i[r].length=n[o].length,o++),!(o>=n.length));r++);},purge:function(){i=[],r.init(null),r=null}}}}}),i(U,[u,P],function(e,n){return function i(){function i(e,n){var i=a.SHORT(e),r,o,s,u,d,f,p,h,m=[],g={};for(r=0;i>r;r++)if(p=f=e+12*r+2,s=n[a.SHORT(p)],s!==t){switch(u=a.SHORT(p+=2),d=a.LONG(p+=2),p+=4,m=[],u){case 1:case 7:for(d>4&&(p=a.LONG(p)+c.tiffHeader),o=0;d>o;o++)m[o]=a.BYTE(p+o);break;case 2:d>4&&(p=a.LONG(p)+c.tiffHeader),g[s]=a.STRING(p,d-1);continue;case 3:for(d>2&&(p=a.LONG(p)+c.tiffHeader),o=0;d>o;o++)m[o]=a.SHORT(p+2*o);break;case 4:for(d>1&&(p=a.LONG(p)+c.tiffHeader),o=0;d>o;o++)m[o]=a.LONG(p+4*o);break;case 5:for(p=a.LONG(p)+c.tiffHeader,o=0;d>o;o++)m[o]=a.LONG(p+4*o)/a.LONG(p+4*o+4);break;case 9:for(p=a.LONG(p)+c.tiffHeader,o=0;d>o;o++)m[o]=a.SLONG(p+4*o);break;case 10:for(p=a.LONG(p)+c.tiffHeader,o=0;d>o;o++)m[o]=a.SLONG(p+4*o)/a.SLONG(p+4*o+4);break;default:continue}h=1==d?m[0]:m,g[s]=l.hasOwnProperty(s)&&"object"!=typeof h?l[s][h]:h}return g}function r(){var e=c.tiffHeader;return a.II(18761==a.SHORT(e)),42!==a.SHORT(e+=2)?!1:(c.IFD0=c.tiffHeader+a.LONG(e+=2),u=i(c.IFD0,s.tiff),"ExifIFDPointer"in u&&(c.exifIFD=c.tiffHeader+u.ExifIFDPointer,delete u.ExifIFDPointer),"GPSInfoIFDPointer"in u&&(c.gpsIFD=c.tiffHeader+u.GPSInfoIFDPointer,delete u.GPSInfoIFDPointer),!0)}function o(e,t,n){var i,r,o,u=0;if("string"==typeof t){var l=s[e.toLowerCase()];for(var d in l)if(l[d]===t){t=d;break}}i=c[e.toLowerCase()+"IFD"],r=a.SHORT(i);for(var f=0;r>f;f++)if(o=i+12*f+2,a.SHORT(o)==t){u=o+8;break}return u?(a.LONG(u,n),!0):!1}var a,s,u,c={},l;return a=new n,s={tiff:{274:"Orientation",270:"ImageDescription",271:"Make",272:"Model",305:"Software",34665:"ExifIFDPointer",34853:"GPSInfoIFDPointer"},exif:{36864:"ExifVersion",40961:"ColorSpace",40962:"PixelXDimension",40963:"PixelYDimension",36867:"DateTimeOriginal",33434:"ExposureTime",33437:"FNumber",34855:"ISOSpeedRatings",37377:"ShutterSpeedValue",37378:"ApertureValue",37383:"MeteringMode",37384:"LightSource",37385:"Flash",37386:"FocalLength",41986:"ExposureMode",41987:"WhiteBalance",41990:"SceneCaptureType",41988:"DigitalZoomRatio",41992:"Contrast",41993:"Saturation",41994:"Sharpness"},gps:{0:"GPSVersionID",1:"GPSLatitudeRef",2:"GPSLatitude",3:"GPSLongitudeRef",4:"GPSLongitude"}},l={ColorSpace:{1:"sRGB",0:"Uncalibrated"},MeteringMode:{0:"Unknown",1:"Average",2:"CenterWeightedAverage",3:"Spot",4:"MultiSpot",5:"Pattern",6:"Partial",255:"Other"},LightSource:{1:"Daylight",2:"Fliorescent",3:"Tungsten",4:"Flash",9:"Fine weather",10:"Cloudy weather",11:"Shade",12:"Daylight fluorescent (D 5700 - 7100K)",13:"Day white fluorescent (N 4600 -5400K)",14:"Cool white fluorescent (W 3900 - 4500K)",15:"White fluorescent (WW 3200 - 3700K)",17:"Standard light A",18:"Standard light B",19:"Standard light C",20:"D55",21:"D65",22:"D75",23:"D50",24:"ISO studio tungsten",255:"Other"},Flash:{0:"Flash did not fire.",1:"Flash fired.",5:"Strobe return light not detected.",7:"Strobe return light detected.",9:"Flash fired, compulsory flash mode",13:"Flash fired, compulsory flash mode, return light not detected",15:"Flash fired, compulsory flash mode, return light detected",16:"Flash did not fire, compulsory flash mode",24:"Flash did not fire, auto mode",25:"Flash fired, auto mode",29:"Flash fired, auto mode, return light not detected",31:"Flash fired, auto mode, return light detected",32:"No flash function",65:"Flash fired, red-eye reduction mode",69:"Flash fired, red-eye reduction mode, return light not detected",71:"Flash fired, red-eye reduction mode, return light detected",73:"Flash fired, compulsory flash mode, red-eye reduction mode",77:"Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",79:"Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",89:"Flash fired, auto mode, red-eye reduction mode",93:"Flash fired, auto mode, return light not detected, red-eye reduction mode",95:"Flash fired, auto mode, return light detected, red-eye reduction mode"},ExposureMode:{0:"Auto exposure",1:"Manual exposure",2:"Auto bracket"},WhiteBalance:{0:"Auto white balance",1:"Manual white balance"},SceneCaptureType:{0:"Standard",1:"Landscape",2:"Portrait",3:"Night scene"},Contrast:{0:"Normal",1:"Soft",2:"Hard"},Saturation:{0:"Normal",1:"Low saturation",2:"High saturation"},Sharpness:{0:"Normal",1:"Soft",2:"Hard"},GPSLatitudeRef:{N:"North latitude",S:"South latitude"},GPSLongitudeRef:{E:"East longitude",W:"West longitude"}},{init:function(e){return c={tiffHeader:10},e!==t&&e.length?(a.init(e),65505===a.SHORT(0)&&"EXIF\0"===a.STRING(4,5).toUpperCase()?r():!1):!1
},TIFF:function(){return u},EXIF:function(){var t;if(t=i(c.exifIFD,s.exif),t.ExifVersion&&"array"===e.typeOf(t.ExifVersion)){for(var n=0,r="";n<t.ExifVersion.length;n++)r+=String.fromCharCode(t.ExifVersion[n]);t.ExifVersion=r}return t},GPS:function(){var t;return t=i(c.gpsIFD,s.gps),t.GPSVersionID&&"array"===e.typeOf(t.GPSVersionID)&&(t.GPSVersionID=t.GPSVersionID.join(".")),t},setExif:function(e,t){return"PixelXDimension"!==e&&"PixelYDimension"!==e?!1:o("exif",e,t)},getBinary:function(){return a.SEGMENT()},purge:function(){a.init(null),a=u=null,c={}}}}}),i(B,[u,p,k,P,U],function(e,t,n,i,r){function o(o){function a(){for(var e=0,t,n;e<=u.length;){if(t=c.SHORT(e+=2),t>=65472&&65475>=t)return e+=5,{height:c.SHORT(e),width:c.SHORT(e+=2)};n=c.SHORT(e+=2),e+=n-2}return null}function s(){d&&l&&c&&(d.purge(),l.purge(),c.init(null),u=f=l=d=c=null)}var u,c,l,d,f,p;if(u=o,c=new i,c.init(u),65496!==c.SHORT(0))throw new t.ImageError(t.ImageError.WRONG_FORMAT);l=new n(o),d=new r,p=!!d.init(l.get("app1")[0]),f=a.call(this),e.extend(this,{type:"image/jpeg",size:u.length,width:f&&f.width||0,height:f&&f.height||0,setExif:function(t,n){return p?("object"===e.typeOf(t)?e.each(t,function(e,t){d.setExif(t,e)}):d.setExif(t,n),l.set("app1",d.getBinary()),void 0):!1},writeHeaders:function(){return arguments.length?l.restore(arguments[0]):u=l.restore(u)},stripHeaders:function(e){return l.strip(e)},purge:function(){s.call(this)}}),p&&(this.meta={tiff:d.TIFF(),exif:d.EXIF(),gps:d.GPS()})}return o}),i(z,[p,u,P],function(e,t,n){function i(i){function r(){var e,t;return e=a.call(this,8),"IHDR"==e.type?(t=e.start,{width:u.LONG(t),height:u.LONG(t+=4)}):null}function o(){u&&(u.init(null),s=d=c=l=u=null)}function a(e){var t,n,i,r;return t=u.LONG(e),n=u.STRING(e+=4,4),i=e+=4,r=u.LONG(e+t),{length:t,type:n,start:i,CRC:r}}var s,u,c,l,d;s=i,u=new n,u.init(s),function(){var t=0,n=0,i=[35152,20039,3338,6666];for(n=0;n<i.length;n++,t+=2)if(i[n]!=u.SHORT(t))throw new e.ImageError(e.ImageError.WRONG_FORMAT)}(),d=r.call(this),t.extend(this,{type:"image/png",size:s.length,width:d.width,height:d.height,purge:function(){o.call(this)}}),o.call(this)}return i}),i(G,[u,p,B,z],function(e,t,n,i){return function(r){var o=[n,i],a;a=function(){for(var e=0;e<o.length;e++)try{return new o[e](r)}catch(n){}throw new t.ImageError(t.ImageError.WRONG_FORMAT)}(),e.extend(this,{type:"",size:0,width:0,height:0,setExif:function(){},writeHeaders:function(e){return e},stripHeaders:function(e){return e},purge:function(){}}),e.extend(this,a),this.purge=function(){a.purge(),a=null}}}),i(q,[],function(){function e(e,i,r){var o=e.naturalWidth,a=e.naturalHeight,s=r.width,u=r.height,c=r.x||0,l=r.y||0,d=i.getContext("2d");t(e)&&(o/=2,a/=2);var f=1024,p=document.createElement("canvas");p.width=p.height=f;for(var h=p.getContext("2d"),m=n(e,o,a),g=0;a>g;){for(var v=g+f>a?a-g:f,y=0;o>y;){var w=y+f>o?o-y:f;h.clearRect(0,0,f,f),h.drawImage(e,-y,-g);var E=y*s/o+c<<0,_=Math.ceil(w*s/o),x=g*u/a/m+l<<0,R=Math.ceil(v*u/a/m);d.drawImage(p,0,0,w,v,E,x,_,R),y+=f}g+=f}p=h=null}function t(e){var t=e.naturalWidth,n=e.naturalHeight;if(t*n>1048576){var i=document.createElement("canvas");i.width=i.height=1;var r=i.getContext("2d");return r.drawImage(e,-t+1,0),0===r.getImageData(0,0,1,1).data[3]}return!1}function n(e,t,n){var i=document.createElement("canvas");i.width=1,i.height=n;var r=i.getContext("2d");r.drawImage(e,0,0);for(var o=r.getImageData(0,0,1,n).data,a=0,s=n,u=n;u>a;){var c=o[4*(u-1)+3];0===c?s=u:a=u,u=s+a>>1}i=null;var l=u/n;return 0===l?1:l}return{isSubsampled:t,renderTo:e}}),i(X,[D,u,p,m,w,G,q,l,d],function(e,t,n,i,r,o,a,s,u){function c(){function e(){if(!E&&!y)throw new n.ImageError(n.DOMException.INVALID_STATE_ERR);return E||y}function c(e){return i.atob(e.substring(e.indexOf("base64,")+7))}function l(e,t){return"data:"+(t||"")+";base64,"+i.btoa(e)}function d(e){var t=this;y=new Image,y.onerror=function(){g.call(this),t.trigger("error",new n.ImageError(n.ImageError.WRONG_FORMAT))},y.onload=function(){t.trigger("load")},y.src=/^data:[^;]*;base64,/.test(e)?e:l(e,x.type)}function f(e,t){var i=this,r;return window.FileReader?(r=new FileReader,r.onload=function(){t(this.result)},r.onerror=function(){i.trigger("error",new n.FileException(n.FileException.NOT_READABLE_ERR))},r.readAsDataURL(e),void 0):t(e.getAsDataURL())}function p(n,i,r,o){var a=this,s,u,c=0,l=0,d,f,p,g;if(b=o,g=this.meta&&this.meta.tiff&&this.meta.tiff.Orientation||1,-1!==t.inArray(g,[5,6,7,8])){var v=n;n=i,i=v}return d=e(),u=r?Math.max:Math.min,s=u(n/d.width,i/d.height),s>1&&(!r||o)?(this.trigger("Resize"),void 0):(E||(E=document.createElement("canvas")),f=Math.round(d.width*s),p=Math.round(d.height*s),r?(E.width=n,E.height=i,f>n&&(c=Math.round((f-n)/2)),p>i&&(l=Math.round((p-i)/2))):(E.width=f,E.height=p),b||m(E.width,E.height,g),h.call(this,d,E,-c,-l,f,p),this.width=E.width,this.height=E.height,R=!0,a.trigger("Resize"),void 0)}function h(e,t,n,i,r,o){if("iOS"===u.OS)a.renderTo(e,t,{width:r,height:o,x:n,y:i});else{var s=t.getContext("2d");s.drawImage(e,n,i,r,o)}}function m(e,t,n){switch(n){case 5:case 6:case 7:case 8:E.width=t,E.height=e;break;default:E.width=e,E.height=t}var i=E.getContext("2d");switch(n){case 2:i.translate(e,0),i.scale(-1,1);break;case 3:i.translate(e,t),i.rotate(Math.PI);break;case 4:i.translate(0,t),i.scale(1,-1);break;case 5:i.rotate(.5*Math.PI),i.scale(1,-1);break;case 6:i.rotate(.5*Math.PI),i.translate(0,-t);break;case 7:i.rotate(.5*Math.PI),i.translate(e,-t),i.scale(-1,1);break;case 8:i.rotate(-.5*Math.PI),i.translate(-e,0)}}function g(){w&&(w.purge(),w=null),_=y=E=x=null,R=!1}var v=this,y,w,E,_,x,R=!1,b=!0;t.extend(this,{loadFromBlob:function(e){var t=this,i=t.getRuntime(),r=arguments.length>1?arguments[1]:!0;if(!i.can("access_binary"))throw new n.RuntimeError(n.RuntimeError.NOT_SUPPORTED_ERR);return x=e,e.isDetached()?(_=e.getSource(),d.call(this,_),void 0):(f.call(this,e.getSource(),function(e){r&&(_=c(e)),d.call(t,e)}),void 0)},loadFromImage:function(e,t){this.meta=e.meta,x=new r(null,{name:e.name,size:e.size,type:e.type}),d.call(this,t?_=e.getAsBinaryString():e.getAsDataURL())},getInfo:function(){var t=this.getRuntime(),n;return!w&&_&&t.can("access_image_binary")&&(w=new o(_)),n={width:e().width||0,height:e().height||0,type:x.type||s.getFileMime(x.name),size:_&&_.length||x.size||0,name:x.name||"",meta:w&&w.meta||this.meta||{}}},downsize:function(){p.apply(this,arguments)},getAsCanvas:function(){return E&&(E.id=this.uid+"_canvas"),E},getAsBlob:function(e,t){return e!==this.type&&p.call(this,this.width,this.height,!1),new r(null,{name:x.name||"",type:e,data:v.getAsBinaryString.call(this,e,t)})},getAsDataURL:function(e){var t=arguments[1]||90;if(!R)return y.src;if("image/jpeg"!==e)return E.toDataURL("image/png");try{return E.toDataURL("image/jpeg",t/100)}catch(n){return E.toDataURL("image/jpeg")}},getAsBinaryString:function(e,t){if(!R)return _||(_=c(v.getAsDataURL(e,t))),_;if("image/jpeg"!==e)_=c(v.getAsDataURL(e,t));else{var n;t||(t=90);try{n=E.toDataURL("image/jpeg",t/100)}catch(i){n=E.toDataURL("image/jpeg")}_=c(n),w&&(_=w.stripHeaders(_),b&&(w.meta&&w.meta.exif&&w.setExif({PixelXDimension:this.width,PixelYDimension:this.height}),_=w.writeHeaders(_)),w.purge(),w=null)}return R=!1,_},destroy:function(){v=null,g.call(this),this.getRuntime().getShim().removeInstance(this.uid)}})}return e.Image=c}),i(j,[u,d,f,p,g],function(e,t,n,i,r){function o(){var e;try{e=navigator.plugins["Shockwave Flash"],e=e.description}catch(t){try{e=new ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version")}catch(n){e="0.0"}}return e=e.match(/\d+/g),parseFloat(e[0]+"."+e[1])}function a(a){var c=this,l;a=e.extend({swf_url:t.swf_url},a),r.call(this,a,s,{access_binary:function(e){return e&&"browser"===c.mode},access_image_binary:function(e){return e&&"browser"===c.mode},display_media:r.capTrue,do_cors:r.capTrue,drag_and_drop:!1,report_upload_progress:function(){return"client"===c.mode},resize_image:r.capTrue,return_response_headers:!1,return_response_type:function(t){return"json"===t&&window.JSON?!0:!e.arrayDiff(t,["","text","document"])||"browser"===c.mode},return_status_code:function(t){return"browser"===c.mode||!e.arrayDiff(t,[200,404])},select_file:r.capTrue,select_multiple:r.capTrue,send_binary_string:function(e){return e&&"browser"===c.mode},send_browser_cookies:function(e){return e&&"browser"===c.mode},send_custom_headers:function(e){return e&&"browser"===c.mode},send_multipart:r.capTrue,slice_blob:r.capTrue,stream_upload:function(e){return e&&"browser"===c.mode},summon_file_dialog:!1,upload_filesize:function(t){return e.parseSizeStr(t)<=2097152||"client"===c.mode},use_http_method:function(t){return!e.arrayDiff(t,["GET","POST"])}},{access_binary:function(e){return e?"browser":"client"},access_image_binary:function(e){return e?"browser":"client"},report_upload_progress:function(e){return e?"browser":"client"},return_response_type:function(t){return e.arrayDiff(t,["","text","json","document"])?"browser":["client","browser"]},return_status_code:function(t){return e.arrayDiff(t,[200,404])?"browser":["client","browser"]},send_binary_string:function(e){return e?"browser":"client"},send_browser_cookies:function(e){return e?"browser":"client"},send_custom_headers:function(e){return e?"browser":"client"},stream_upload:function(e){return e?"client":"browser"},upload_filesize:function(t){return e.parseSizeStr(t)>=2097152?"client":"browser"}},"client"),o()<10&&(this.mode=!1),e.extend(this,{getShim:function(){return n.get(this.uid)},shimExec:function(e,t){var n=[].slice.call(arguments,2);return c.getShim().exec(this.uid,e,t,n)},init:function(){var n,r,o;o=this.getShimContainer(),e.extend(o.style,{position:"absolute",top:"-8px",left:"-8px",width:"9px",height:"9px",overflow:"hidden"}),n='<object id="'+this.uid+'" type="application/x-shockwave-flash" data="'+a.swf_url+'" ',"IE"===t.browser&&(n+='classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" '),n+='width="100%" height="100%" style="outline:0"><param name="movie" value="'+a.swf_url+'" />'+'<param name="flashvars" value="uid='+escape(this.uid)+"&target="+t.global_event_dispatcher+'" />'+'<param name="wmode" value="transparent" />'+'<param name="allowscriptaccess" value="always" />'+"</object>","IE"===t.browser?(r=document.createElement("div"),o.appendChild(r),r.outerHTML=n,r=o=null):o.innerHTML=n,l=setTimeout(function(){c&&!c.initialized&&c.trigger("Error",new i.RuntimeError(i.RuntimeError.NOT_INIT_ERR))},5e3)},destroy:function(e){return function(){e.call(c),clearTimeout(l),a=l=e=c=null}}(this.destroy)},u)}var s="flash",u={};return r.addConstructor(s,a),u}),i(V,[j,y],function(e,t){var n={slice:function(e,n,i,r){var o=this.getRuntime();return 0>n?n=Math.max(e.size+n,0):n>0&&(n=Math.min(n,e.size)),0>i?i=Math.max(e.size+i,0):i>0&&(i=Math.min(i,e.size)),e=o.shimExec.call(this,"Blob","slice",n,i,r||""),e&&(e=new t(o.uid,e)),e}};return e.Blob=n}),i(W,[j],function(e){var t={init:function(e){this.getRuntime().shimExec.call(this,"FileInput","init",{name:e.name,accept:e.accept,multiple:e.multiple}),this.trigger("ready")}};return e.FileInput=t}),i(Y,[j,m],function(e,t){function n(e,n){switch(n){case"readAsText":return t.atob(e,"utf8");case"readAsBinaryString":return t.atob(e);case"readAsDataURL":return e}return null}var i="",r={read:function(e,t){var r=this,o=r.getRuntime();return"readAsDataURL"===e&&(i="data:"+(t.type||"")+";base64,"),r.bind("Progress",function(t,r){r&&(i+=n(r,e))}),o.shimExec.call(this,"FileReader","readAsBase64",t.uid)},getResult:function(){return i},destroy:function(){i=null}};return e.FileReader=r}),i($,[j,m],function(e,t){function n(e,n){switch(n){case"readAsText":return t.atob(e,"utf8");case"readAsBinaryString":return t.atob(e);case"readAsDataURL":return e}return null}var i={read:function(e,t){var i,r=this.getRuntime();return(i=r.shimExec.call(this,"FileReaderSync","readAsBase64",t.uid))?("readAsDataURL"===e&&(i="data:"+(t.type||"")+";base64,"+i),n(i,e,t.type)):null}};return e.FileReaderSync=i}),i(J,[j,u,y,w,T,S,O],function(e,t,n,i,r,o,a){var s={send:function(e,i){function r(){e.transport=l.mode,l.shimExec.call(c,"XMLHttpRequest","send",e,i)}function s(e,t){l.shimExec.call(c,"XMLHttpRequest","appendBlob",e,t.uid),i=null,r()}function u(e,t){var n=new a;n.bind("TransportingComplete",function(){t(this.result)}),n.transport(e.getSource(),e.type,{ruid:l.uid})}var c=this,l=c.getRuntime();if(t.isEmptyObj(e.headers)||t.each(e.headers,function(e,t){l.shimExec.call(c,"XMLHttpRequest","setRequestHeader",t,e.toString())}),i instanceof o){var d;if(i.each(function(e,t){e instanceof n?d=t:l.shimExec.call(c,"XMLHttpRequest","append",t,e)}),i.hasBlob()){var f=i.getBlob();f.isDetached()?u(f,function(e){f.destroy(),s(d,e)}):s(d,f)}else i=null,r()}else i instanceof n?i.isDetached()?u(i,function(e){i.destroy(),i=e.uid,r()}):(i=i.uid,r()):r()},getResponse:function(e){var n,o,a=this.getRuntime();if(o=a.shimExec.call(this,"XMLHttpRequest","getResponseAsBlob")){if(o=new i(a.uid,o),"blob"===e)return o;try{if(n=new r,~t.inArray(e,["","text"]))return n.readAsText(o);if("json"===e&&window.JSON)return JSON.parse(n.readAsText(o))}finally{o.destroy()}}return null},abort:function(e){var t=this.getRuntime();t.shimExec.call(this,"XMLHttpRequest","abort"),this.dispatchEvent("readystatechange"),this.dispatchEvent("abort")}};return e.XMLHttpRequest=s}),i(Z,[j,y],function(e,t){var n={getAsBlob:function(e){var n=this.getRuntime(),i=n.shimExec.call(this,"Transporter","getAsBlob",e);return i?new t(n.uid,i):null}};return e.Transporter=n}),i(K,[j,u,O,y,T],function(e,t,n,i,r){var o={loadFromBlob:function(e){function t(e){r.shimExec.call(i,"Image","loadFromBlob",e.uid),i=r=null}var i=this,r=i.getRuntime();if(e.isDetached()){var o=new n;o.bind("TransportingComplete",function(){t(o.result.getSource())}),o.transport(e.getSource(),e.type,{ruid:r.uid})}else t(e.getSource())},loadFromImage:function(e){var t=this.getRuntime();return t.shimExec.call(this,"Image","loadFromImage",e.uid)},getAsBlob:function(e,t){var n=this.getRuntime(),r=n.shimExec.call(this,"Image","getAsBlob",e,t);return r?new i(n.uid,r):null},getAsDataURL:function(){var e=this.getRuntime(),t=e.Image.getAsBlob.apply(this,arguments),n;return t?(n=new r,n.readAsDataURL(t)):null}};return e.Image=o}),i(Q,[u,d,f,p,g],function(e,t,n,i,r){function o(e){var t=!1,n=null,i,r,o,a,s,u=0;try{try{n=new ActiveXObject("AgControl.AgControl"),n.IsVersionSupported(e)&&(t=!0),n=null}catch(c){var l=navigator.plugins["Silverlight Plug-In"];if(l){for(i=l.description,"1.0.30226.2"===i&&(i="2.0.30226.2"),r=i.split(".");r.length>3;)r.pop();for(;r.length<4;)r.push(0);for(o=e.split(".");o.length>4;)o.pop();do a=parseInt(o[u],10),s=parseInt(r[u],10),u++;while(u<o.length&&a===s);s>=a&&!isNaN(a)&&(t=!0)}}}catch(d){t=!1}return t}function a(a){var c=this,l;a=e.extend({xap_url:t.xap_url},a),r.call(this,a,s,{access_binary:r.capTrue,access_image_binary:r.capTrue,display_media:r.capTrue,do_cors:r.capTrue,drag_and_drop:!1,report_upload_progress:r.capTrue,resize_image:r.capTrue,return_response_headers:function(e){return e&&"client"===c.mode},return_response_type:function(e){return"json"!==e?!0:!!window.JSON},return_status_code:function(t){return"client"===c.mode||!e.arrayDiff(t,[200,404])},select_file:r.capTrue,select_multiple:r.capTrue,send_binary_string:r.capTrue,send_browser_cookies:function(e){return e&&"browser"===c.mode},send_custom_headers:function(e){return e&&"client"===c.mode},send_multipart:r.capTrue,slice_blob:r.capTrue,stream_upload:!0,summon_file_dialog:!1,upload_filesize:r.capTrue,use_http_method:function(t){return"client"===c.mode||!e.arrayDiff(t,["GET","POST"])}},{return_response_headers:function(e){return e?"client":"browser"},return_status_code:function(t){return e.arrayDiff(t,[200,404])?"client":["client","browser"]},send_browser_cookies:function(e){return e?"browser":"client"},send_custom_headers:function(e){return e?"client":"browser"},use_http_method:function(t){return e.arrayDiff(t,["GET","POST"])?"client":["client","browser"]}}),o("2.0.31005.0")&&"Opera"!==t.browser||(this.mode=!1),e.extend(this,{getShim:function(){return n.get(this.uid).content.Moxie},shimExec:function(e,t){var n=[].slice.call(arguments,2);return c.getShim().exec(this.uid,e,t,n)},init:function(){var e;e=this.getShimContainer(),e.innerHTML='<object id="'+this.uid+'" data="data:application/x-silverlight," type="application/x-silverlight-2" width="100%" height="100%" style="outline:none;">'+'<param name="source" value="'+a.xap_url+'"/>'+'<param name="background" value="Transparent"/>'+'<param name="windowless" value="true"/>'+'<param name="enablehtmlaccess" value="true"/>'+'<param name="initParams" value="uid='+this.uid+",target="+t.global_event_dispatcher+'"/>'+"</object>",l=setTimeout(function(){c&&!c.initialized&&c.trigger("Error",new i.RuntimeError(i.RuntimeError.NOT_INIT_ERR))},"Windows"!==t.OS?1e4:5e3)},destroy:function(e){return function(){e.call(c),clearTimeout(l),a=l=e=c=null}}(this.destroy)},u)}var s="silverlight",u={};return r.addConstructor(s,a),u}),i(et,[Q,u,V],function(e,t,n){return e.Blob=t.extend({},n)}),i(tt,[Q],function(e){var t={init:function(e){function t(e){for(var t="",n=0;n<e.length;n++)t+=(""!==t?"|":"")+e[n].title+" | *."+e[n].extensions.replace(/,/g,";*.");return t}this.getRuntime().shimExec.call(this,"FileInput","init",t(e.accept),e.name,e.multiple),this.trigger("ready")}};return e.FileInput=t}),i(nt,[Q,f,L],function(e,t,n){var i={init:function(){var e=this,i=e.getRuntime(),r;return r=i.getShimContainer(),n.addEvent(r,"dragover",function(e){e.preventDefault(),e.stopPropagation(),e.dataTransfer.dropEffect="copy"},e.uid),n.addEvent(r,"dragenter",function(e){e.preventDefault();var n=t.get(i.uid).dragEnter(e);n&&e.stopPropagation()},e.uid),n.addEvent(r,"drop",function(e){e.preventDefault();var n=t.get(i.uid).dragDrop(e);n&&e.stopPropagation()},e.uid),i.shimExec.call(this,"FileDrop","init")}};return e.FileDrop=i}),i(it,[Q,u,Y],function(e,t,n){return e.FileReader=t.extend({},n)}),i(rt,[Q,u,$],function(e,t,n){return e.FileReaderSync=t.extend({},n)}),i(ot,[Q,u,J],function(e,t,n){return e.XMLHttpRequest=t.extend({},n)}),i(at,[Q,u,Z],function(e,t,n){return e.Transporter=t.extend({},n)}),i(st,[Q,u,K],function(e,t,n){return e.Image=t.extend({},n,{getInfo:function(){var e=this.getRuntime(),n=["tiff","exif","gps"],i={meta:{}},r=e.shimExec.call(this,"Image","getInfo");return r.meta&&t.each(n,function(e){var t=r.meta[e],n,o,a,s;if(t&&t.keys)for(i.meta[e]={},o=0,a=t.keys.length;a>o;o++)n=t.keys[o],s=t[n],s&&(/^(\d|[1-9]\d+)$/.test(s)?s=parseInt(s,10):/^\d*\.\d+$/.test(s)&&(s=parseFloat(s)),i.meta[e][n]=s)}),i.width=parseInt(r.width,10),i.height=parseInt(r.height,10),i.size=parseInt(r.size,10),i.type=r.type,i.name=r.name,i}})}),i(ut,[u,p,g,d],function(e,t,n,i){function r(t){var r=this,s=n.capTest,u=n.capTrue;n.call(this,t,o,{access_binary:s(window.FileReader||window.File&&File.getAsDataURL),access_image_binary:!1,display_media:s(a.Image&&(i.can("create_canvas")||i.can("use_data_uri_over32kb"))),do_cors:!1,drag_and_drop:!1,filter_by_extension:s(function(){return"Chrome"===i.browser&&i.version>=28||"IE"===i.browser&&i.version>=10}()),resize_image:function(){return a.Image&&r.can("access_binary")&&i.can("create_canvas")},report_upload_progress:!1,return_response_headers:!1,return_response_type:function(t){return"json"===t&&window.JSON?!0:!!~e.inArray(t,["text","document",""])},return_status_code:function(t){return!e.arrayDiff(t,[200,404])},select_file:function(){return i.can("use_fileinput")},select_multiple:!1,send_binary_string:!1,send_custom_headers:!1,send_multipart:!0,slice_blob:!1,stream_upload:function(){return r.can("select_file")},summon_file_dialog:s(function(){return"Firefox"===i.browser&&i.version>=4||"Opera"===i.browser&&i.version>=12||!!~e.inArray(i.browser,["Chrome","Safari"])}()),upload_filesize:u,use_http_method:function(t){return!e.arrayDiff(t,["GET","POST"])}}),e.extend(this,{init:function(){this.trigger("Init")},destroy:function(e){return function(){e.call(r),e=r=null}}(this.destroy)}),e.extend(this.getShim(),a)}var o="html4",a={};return n.addConstructor(o,r),a}),i(ct,[ut,u,f,L,l,d],function(e,t,n,i,r,o){function a(){function e(){var r=this,l=r.getRuntime(),d,f,p,h,m,g;g=t.guid("uid_"),d=l.getShimContainer(),a&&(p=n.get(a+"_form"),p&&t.extend(p.style,{top:"100%"})),h=document.createElement("form"),h.setAttribute("id",g+"_form"),h.setAttribute("method","post"),h.setAttribute("enctype","multipart/form-data"),h.setAttribute("encoding","multipart/form-data"),t.extend(h.style,{overflow:"hidden",position:"absolute",top:0,left:0,width:"100%",height:"100%"}),m=document.createElement("input"),m.setAttribute("id",g),m.setAttribute("type","file"),m.setAttribute("name",c.name||"Filedata"),m.setAttribute("accept",u.join(",")),t.extend(m.style,{fontSize:"999px",opacity:0}),h.appendChild(m),d.appendChild(h),t.extend(m.style,{position:"absolute",top:0,left:0,width:"100%",height:"100%"}),"IE"===o.browser&&o.version<10&&t.extend(m.style,{filter:"progid:DXImageTransform.Microsoft.Alpha(opacity=0)"}),m.onchange=function(){var t;this.value&&(t=this.files?this.files[0]:{name:this.value},s=[t],this.onchange=function(){},e.call(r),r.bind("change",function i(){var e=n.get(g),t=n.get(g+"_form"),o;r.unbind("change",i),r.files.length&&e&&t&&(o=r.files[0],e.setAttribute("id",o.uid),t.setAttribute("id",o.uid+"_form"),t.setAttribute("target",o.uid+"_iframe")),e=t=null},998),m=h=null,r.trigger("change"))},l.can("summon_file_dialog")&&(f=n.get(c.browse_button),i.removeEvent(f,"click",r.uid),i.addEvent(f,"click",function(e){m&&!m.disabled&&m.click(),e.preventDefault()},r.uid)),a=g,d=p=f=null}var a,s=[],u=[],c;t.extend(this,{init:function(t){var o=this,a=o.getRuntime(),s;c=t,u=t.accept.mimes||r.extList2mimes(t.accept,a.can("filter_by_extension")),s=a.getShimContainer(),function(){var e,r,u;e=n.get(t.browse_button),a.can("summon_file_dialog")&&("static"===n.getStyle(e,"position")&&(e.style.position="relative"),r=parseInt(n.getStyle(e,"z-index"),10)||1,e.style.zIndex=r,s.style.zIndex=r-1),u=a.can("summon_file_dialog")?e:s,i.addEvent(u,"mouseover",function(){o.trigger("mouseenter")},o.uid),i.addEvent(u,"mouseout",function(){o.trigger("mouseleave")},o.uid),i.addEvent(u,"mousedown",function(){o.trigger("mousedown")},o.uid),i.addEvent(n.get(t.container),"mouseup",function(){o.trigger("mouseup")},o.uid),e=null}(),e.call(this),s=null,o.trigger({type:"ready",async:!0})},getFiles:function(){return s},disable:function(e){var t;(t=n.get(a))&&(t.disabled=!!e)},destroy:function(){var e=this.getRuntime(),t=e.getShim(),r=e.getShimContainer();i.removeAllEvents(r,this.uid),i.removeAllEvents(c&&n.get(c.container),this.uid),i.removeAllEvents(c&&n.get(c.browse_button),this.uid),r&&(r.innerHTML=""),t.removeInstance(this.uid),a=s=u=c=r=t=null}})}return e.FileInput=a}),i(lt,[ut,F],function(e,t){return e.FileReader=t}),i(dt,[ut,u,f,b,p,L,y,S],function(e,t,n,i,r,o,a,s){function u(){function e(e){var t=this,i,r,a,s,u=!1;if(l){if(i=l.id.replace(/_iframe$/,""),r=n.get(i+"_form")){for(a=r.getElementsByTagName("input"),s=a.length;s--;)switch(a[s].getAttribute("type")){case"hidden":a[s].parentNode.removeChild(a[s]);break;case"file":u=!0}a=[],u||r.parentNode.removeChild(r),r=null}setTimeout(function(){o.removeEvent(l,"load",t.uid),l.parentNode&&l.parentNode.removeChild(l);var n=t.getRuntime().getShimContainer();n.children.length||n.parentNode.removeChild(n),n=l=null,e()},1)}}var u,c,l;t.extend(this,{send:function(d,f){function p(){var n=m.getShimContainer()||document.body,r=document.createElement("div");r.innerHTML='<iframe id="'+g+'_iframe" name="'+g+'_iframe" src="javascript:&quot;&quot;" style="display:none"></iframe>',l=r.firstChild,n.appendChild(l),o.addEvent(l,"load",function(){var n;try{n=l.contentWindow.document||l.contentDocument||window.frames[l.id].document,/^4(0[0-9]|1[0-7]|2[2346])\s/.test(n.title)?u=n.title.replace(/^(\d+).*$/,"$1"):(u=200,c=t.trim(n.body.innerHTML),h.trigger({type:"progress",loaded:c.length,total:c.length}),w&&h.trigger({type:"uploadprogress",loaded:w.size||1025,total:w.size||1025}))}catch(r){if(!i.hasSameOrigin(d.url))return e.call(h,function(){h.trigger("error")}),void 0;u=404}e.call(h,function(){h.trigger("load")})},h.uid)}var h=this,m=h.getRuntime(),g,v,y,w;if(u=c=null,f instanceof s&&f.hasBlob()){if(w=f.getBlob(),g=w.uid,y=n.get(g),v=n.get(g+"_form"),!v)throw new r.DOMException(r.DOMException.NOT_FOUND_ERR)}else g=t.guid("uid_"),v=document.createElement("form"),v.setAttribute("id",g+"_form"),v.setAttribute("method",d.method),v.setAttribute("enctype","multipart/form-data"),v.setAttribute("encoding","multipart/form-data"),v.setAttribute("target",g+"_iframe"),m.getShimContainer().appendChild(v);f instanceof s&&f.each(function(e,n){if(e instanceof a)y&&y.setAttribute("name",n);else{var i=document.createElement("input");t.extend(i,{type:"hidden",name:n,value:e}),y?v.insertBefore(i,y):v.appendChild(i)}}),v.setAttribute("action",d.url),p(),v.submit(),h.trigger("loadstart")},getStatus:function(){return u},getResponse:function(e){if("json"===e&&"string"===t.typeOf(c)&&window.JSON)try{return JSON.parse(c.replace(/^\s*<pre[^>]*>/,"").replace(/<\/pre>\s*$/,""))}catch(n){return null}return c},abort:function(){var t=this;l&&l.contentWindow&&(l.contentWindow.stop?l.contentWindow.stop():l.contentWindow.document.execCommand?l.contentWindow.document.execCommand("Stop"):l.src="about:blank"),e.call(this,function(){t.dispatchEvent("abort")})}})}return e.XMLHttpRequest=u}),i(ft,[ut,X],function(e,t){return e.Image=t}),a([u,c,l,d,f,p,h,m,g,v,y,w,E,_,x,R,b,T,S,A,O,I,L])}(this);;(function(){"use strict";var e={},t=moxie.core.utils.Basic.inArray;return function n(r){var i,s;for(i in r)s=typeof r[i],s==="object"&&!~t(i,["Exceptions","Env","Mime"])?n(r[i]):s==="function"&&(e[i]=r[i])}(window.moxie),e.Env=window.moxie.core.utils.Env,e.Mime=window.moxie.core.utils.Mime,e.Exceptions=window.moxie.core.Exceptions,window.mOxie=e,window.o||(window.o=e),e})();/**
 * Plupload - multi-runtime File Uploader
 * v2.1.1
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 *
 * Date: 2014-01-16
 */

	;(function(e, t, n) {
		function s(e) {
			function r(e, t, r) {
				var i = {
					chunks : "slice_blob",
					jpgresize : "send_binary_string",
					pngresize : "send_binary_string",
					progress : "report_upload_progress",
					multi_selection : "select_multiple",
					dragdrop : "drag_and_drop",
					drop_element : "drag_and_drop",
					headers : "send_custom_headers",
					canSendBinary : "send_binary",
					triggerDialog : "summon_file_dialog"
				};
				i[e] ? n[i[e]] = t : r || (n[e] = t)
			}

			var t = e.required_features, n = {};
			return typeof t == "string" ? o.each(t.split(/\s*,\s*/), function(e) {
				r(e, !0)
			}) : typeof t == "object" ? o.each(t, function(e, t) {
				r(t, e)
			}) : t === !0 && (e.multipart || (n.send_binary_string = !0), e.chunk_size > 0 && (n.slice_blob = !0), e.resize.enabled && (n.send_binary_string = !0), o.each(e, function(e, t) {
				r(t, !!e, !0)
			})), n
		}

		var r = e.setTimeout, i = {}, o = {
			VERSION : "2.1.1",
			STOPPED : 1,
			STARTED : 2,
			QUEUED : 1,
			UPLOADING : 2,
			FAILED : 4,
			DONE : 5,
			GENERIC_ERROR : -100,
			HTTP_ERROR : -200,
			IO_ERROR : -300,
			SECURITY_ERROR : -400,
			INIT_ERROR : -500,
			FILE_SIZE_ERROR : -600,
			FILE_EXTENSION_ERROR : -601,
			FILE_DUPLICATE_ERROR : -602,
			IMAGE_FORMAT_ERROR : -700,
			IMAGE_MEMORY_ERROR : -701,
			IMAGE_DIMENSIONS_ERROR : -702,
			mimeTypes : t.mimes,
			ua : t.ua,
			typeOf : t.typeOf,
			extend : t.extend,
			guid : t.guid,
			get : function(n) {
				var r = [], i;
				t.typeOf(n) !== "array" && ( n = [n]);
				var s = n.length;
				while(s--) i = t.get(n[s]), i && r.push(i);
				return r.length ? r : null
			},
			each : t.each,
			getPos : t.getPos,
			getSize : t.getSize,
			xmlEncode : function(e) {
				var t = {
					"<" : "lt",
					">" : "gt",
					"&" : "amp",
					'"' : "quot",
					"'" : "#39"
				}, n = /[<>&\"\']/g;
				return e ? ("" + e).replace(n, function(e) {
					return t[e] ? "&" + t[e] + ";" : e
				}) : e
			},
			toArray : t.toArray,
			inArray : t.inArray,
			addI18n : t.addI18n,
			translate : t.translate,
			isEmptyObj : t.isEmptyObj,
			hasClass : t.hasClass,
			addClass : t.addClass,
			removeClass : t.removeClass,
			getStyle : t.getStyle,
			addEvent : t.addEvent,
			removeEvent : t.removeEvent,
			removeAllEvents : t.removeAllEvents,
			cleanName : function(e) {
				var t, n;
				n = [/[\300-\306]/g, "A", /[\340-\346]/g, "a", /\307/g, "C", /\347/g, "c", /[\310-\313]/g, "E", /[\350-\353]/g, "e", /[\314-\317]/g, "I", /[\354-\357]/g, "i", /\321/g, "N", /\361/g, "n", /[\322-\330]/g, "O", /[\362-\370]/g, "o", /[\331-\334]/g, "U", /[\371-\374]/g, "u"];
				for( t = 0; t < n.length; t += 2)
				e = e.replace(n[t], n[t + 1]);
				return e = e.replace(/\s+/g, "_"), e = e.replace(/[^a-z0-9_\-\.]+/gi, ""), e
			},
			buildUrl : function(e, t) {
				var n = "";
				return o.each(t, function(e, t) {
					n += ( n ? "&" : "") + encodeURIComponent(t) + "=" + encodeURIComponent(e)
				}), n && (e += (e.indexOf("?") > 0 ? "&" : "?") + n), e
			},
			formatSize : function(e) {
				function t(e, t) {
					return Math.round(e * Math.pow(10, t)) / Math.pow(10, t)
				}

				if(e === n || /\D/.test(e))
					return o.translate("N/A");
				var r = Math.pow(1024, 4);
				return e > r ? t(e / r, 1) + " " + o.translate("tb") : e > (r /= 1024) ? t(e / r, 1) + " " + o.translate("gb") : e > (r /= 1024) ? t(e / r, 1) + " " + o.translate("mb") : e > 1024 ? Math.round(e / 1024) + " " + o.translate("kb") : e + " " + o.translate("b")
			},
			parseSize : t.parseSizeStr,
			predictRuntime : function(e, n) {
				var r, i;
				return r = new o.Uploader(e), i = t.Runtime.thatCan(r.getOption().required_features, n || e.runtimes), r.destroy(), i
			},
			addFileFilter : function(e, t) {
				i[e] = t
			}
		};
		o.addFileFilter("mime_types", function(e, t, n) {e.length && !e.regexp.test(t.name) ? (this.trigger("Error", {
				code : o.FILE_EXTENSION_ERROR,
				message : o.translate("File extension error."),
				file : t
			}), n(!1)) : n(!0)
		}), o.addFileFilter("max_file_size", function(e, t, n) {
			var r;
			e = o.parseSize(e), t.size !== r && e && t.size > e ? (this.trigger("Error", {
				code : o.FILE_SIZE_ERROR,
				message : o.translate("File size error."),
				file : t
			}), n(!1)) : n(!0)
		}), o.addFileFilter("prevent_duplicates", function(e, t, n) {
			if(e) {
				var r = this.files.length;
				while(r--)
				if(t.name === this.files[r].name && t.size === this.files[r].size) {this.trigger("Error", {
						code : o.FILE_DUPLICATE_ERROR,
						message : o.translate("Duplicate file error."),
						file : t
					}), n(!1);
					return
				}
			}
			n(!0)
		}), o.Uploader = function(e) {
			function g() {
				var e, t = 0, n;
				if(this.state == o.STARTED) {
					for( n = 0; n < f.length; n++)!e && f[n].status == o.QUEUED ? ( e = f[n], this.trigger("BeforeUpload", e) && (e.status = o.UPLOADING, this.trigger("UploadFile", e))) : t++;
					t == f.length && (this.state !== o.STOPPED && (this.state = o.STOPPED, this.trigger("StateChanged")), this.trigger("UploadComplete", f))
				}
			}

			function y(e) {e.percent = e.size > 0 ? Math.ceil(e.loaded / e.size * 100) : 100, b()
			}

			function b() {
				var e, t;
				d.reset();
				for( e = 0; e < f.length; e++) t = f[e], t.size !== n ? (d.size += t.origSize, d.loaded += t.loaded * t.origSize / t.size) : d.size = n, t.status == o.DONE ? d.uploaded++ : t.status == o.FAILED ? d.failed++ : d.queued++;d.size === n ? d.percent = f.length > 0 ? Math.ceil(d.uploaded / f.length * 100) : 0 : (d.bytesPerSec = Math.ceil(d.loaded / ((+(new Date) - p || 1) / 1e3)), d.percent = d.size > 0 ? Math.ceil(d.loaded / d.size * 100) : 0)
			}

			function w() {
				var e = c[0] || h[0];
				return e ? e.getRuntime().uid : !1
			}

			function E(e, n) {
				if(e.ruid) {
					var r = t.Runtime.getInfo(e.ruid);
					if(r)
						return r.can(n)
				}
				return !1
			}

			function S() {this.bind("FilesAdded", C), this.bind("CancelUpload", M), this.bind("BeforeUpload", k), this.bind("UploadFile", L), this.bind("UploadProgress", A), this.bind("StateChanged", O), this.bind("QueueChanged", b), this.bind("Error", D), this.bind("FileUploaded", _), this.bind("Destroy", P)
			}

			function x(e, n) {
				var r = this, i = 0, s = [], u = {
					accept : e.filters.mime_types,
					runtime_order : e.runtimes,
					required_caps : e.required_features,
					preferred_caps : l,
					swf_url : e.flash_swf_url,
					xap_url : e.silverlight_xap_url
				};
				o.each(e.runtimes.split(/\s*,\s*/), function(t) {
					e[t] && (u[t] = e[t])
				}), e.browse_button && o.each(e.browse_button, function(n) {
					s.push(function(s) {
						var a = new t.FileInput(o.extend({}, u, {
							name : e.file_data_name,
							multiple : e.multi_selection,
							container : e.container,
							browse_button : n
						}));
						a.onready = function() {
							var e = t.Runtime.getInfo(this.ruid);
							t.extend(r.features, {
								chunks : e.can("slice_blob"),
								multipart : e.can("send_multipart"),
								multi_selection : e.can("select_multiple")
							}), i++, c.push(this), s()
						}, a.onchange = function() {
							r.addFile(this.files)
						}, a.bind("mouseenter mouseleave mousedown mouseup", function(r) {
							v || (e.browse_button_hover && ("mouseenter" === r.type ? t.addClass(n, e.browse_button_hover) : "mouseleave" === r.type && t.removeClass(n, e.browse_button_hover)), e.browse_button_active && ("mousedown" === r.type ? t.addClass(n, e.browse_button_active) : "mouseup" === r.type && t.removeClass(n, e.browse_button_active)))
						}), a.bind("error runtimeerror", function() { a = null, s()
						}), a.init()
					})
				}), e.drop_element && o.each(e.drop_element, function(e) {
					s.push(function(n) {
						var s = new t.FileDrop(o.extend({}, u, {
							drop_zone : e
						}));
						s.onready = function() {
							var e = t.Runtime.getInfo(this.ruid);
							r.features.dragdrop = e.can("drag_and_drop"), i++, h.push(this), n()
						}, s.ondrop = function() {
							r.addFile(this.files)
						}, s.bind("error runtimeerror", function() { s = null, n()
						}), s.init()
					})
				}), t.inSeries(s, function() { typeof n == "function" && n(i)
				})
			}

			function T(e, n, r) {
				var i = new t.Image;
				try {i.onload = function() {
						i.downsize(n.width, n.height, n.crop, n.preserve_headers)
					}, i.onresize = function() {r(this.getAsBlob(e.type, n.quality)), this.destroy()
					}, i.onerror = function() {
						r(e)
					}, i.load(e)
				} catch(s) {
					r(e)
				}
			}

			function N(e, n, r) {
				function f(e, t, n) {
					var r = a[e];
					switch(e) {
						case"max_file_size":
							e === "max_file_size" && (a.max_file_size = a.filters.max_file_size = t);
							break;
						case"chunk_size":
							if( t = o.parseSize(t))
								a[e] = t;
							break;
						case"filters":
							o.typeOf(t) === "array" && ( t = {
								mime_types : t
							}), n ? o.extend(a.filters, t) : a.filters = t, t.mime_types && (a.filters.mime_types.regexp = function(e) {
								var t = [];
								return o.each(e, function(e) {
									o.each(e.extensions.split(/,/), function(e) {/^\s*\*\s*$/.test(e) ? t.push("\\.*") : t.push("\\." + e.replace(new RegExp("[" + "/^$.*+?|()[]{}\\".replace(/./g, "\\$&") + "]", "g"), "\\$&"))
									})
								}), new RegExp("(" + t.join("|") + ")$", "i")
							}(a.filters.mime_types));
							break;
						case"resize":
							n ? o.extend(a.resize, t, {
								enabled : !0
							}) : a.resize = t;
							break;
						case"prevent_duplicates":
							a.prevent_duplicates = a.filters.prevent_duplicates = !!t;
							break;
						case"browse_button":
						case"drop_element":
							t = o.get(t);
						case"container":
						case"runtimes":
						case"multi_selection":
						case"flash_swf_url":
						case"silverlight_xap_url":
							a[e] = t, n || ( u = !0);
							break;
						default:
							a[e] = t
					}
					n || i.trigger("OptionChanged", e, t, r)
				}

				var i = this, u = !1;
				typeof e == "object" ? o.each(e, function(e, t) {
					f(t, e, r)
				}) : f(e, n, r), r ? (a.required_features = s(o.extend({}, a)), l = s(o.extend({}, a, {
					required_features : !0
				}))) : u && (i.trigger("Destroy"), x.call(i, a, function(e) {
					e ? (i.runtime = t.Runtime.getInfo(w()).type, i.trigger("Init", {
						runtime : i.runtime
					}), i.trigger("PostInit")) : i.trigger("Error", {
						code : o.INIT_ERROR,
						message : o.translate("Init error.")
					})
				}))
			}

			function C(e, t) {[].push.apply(f, t), e.trigger("QueueChanged"), e.refresh()
			}

			function k(e, t) {
				if(a.unique_names) {
					var n = t.name.match(/\.([^.]+)$/), r = "part";
					n && ( r = n[1]), t.target_name = t.id + "." + r
				}
			}

			function L(e, n) {
				function h() {u-- > 0 ? r(p, 1) : (n.loaded = f, e.trigger("Error", {
						code : o.HTTP_ERROR,
						message : o.translate("HTTP Error."),
						file : n,
						response : m.responseText,
						status : m.status,
						responseHeaders : m.getAllResponseHeaders()
					}))
				}

				function p() {
					var d, v, g, y;
					if(n.status == o.DONE || n.status == o.FAILED || e.state == o.STOPPED)
						return;
					g = {
						name : n.target_name || n.name
					}, s && a.chunks && c.size > s ? ( y = Math.min(s, c.size - f), d = c.slice(f, f + y)) : ( y = c.size, d = c), s && a.chunks && (e.settings.send_chunk_number ? (g.chunk = Math.ceil(f / s), g.chunks = Math.ceil(c.size / s)) : (g.offset = f, g.total = c.size)), m = new t.XMLHttpRequest, m.upload && (m.upload.onprogress = function(t) {n.loaded = Math.min(n.size, f + t.loaded), e.trigger("UploadProgress", n)
					}), m.onload = function() {
						if(m.status >= 400) {
							h();
							return
						} u = e.settings.max_retries, y < c.size ? (d.destroy(), f += y, n.loaded = Math.min(f, c.size), e.trigger("ChunkUploaded", n, {
							offset : n.loaded,
							total : c.size,
							response : m.responseText,
							status : m.status,
							responseHeaders : m.getAllResponseHeaders()
						}), t.Env.browser === "Android Browser" && e.trigger("UploadProgress", n)) : n.loaded = n.size, d = v = null, !f || f >= c.size ? (n.size != n.origSize && (c.destroy(), c = null), e.trigger("UploadProgress", n), n.status = o.DONE, e.trigger("FileUploaded", n, {
							response : m.responseText,
							status : m.status,
							responseHeaders : m.getAllResponseHeaders()
						})) : r(p, 1)
					}, m.onerror = function() {
						h()
					}, m.onloadend = function() {this.destroy(), m = null
					}, e.settings.multipart && a.multipart ? (g.name = n.target_name || n.name, m.open("post", i, !0), o.each(e.settings.headers, function(e, t) {
						m.setRequestHeader(t, e)
					}), v = new t.FormData, o.each(o.extend(g, e.settings.multipart_params), function(e, t) {
						v.append(t, e)
					}), v.append(e.settings.file_data_name, d), m.send(v, {
						runtime_order : e.settings.runtimes,
						required_caps : e.settings.required_features,
						preferred_caps : l,
						swf_url : e.settings.flash_swf_url,
						xap_url : e.settings.silverlight_xap_url
					})) : ( i = o.buildUrl(e.settings.url, o.extend(g, e.settings.multipart_params)), m.open("post", i, !0), m.setRequestHeader("Content-Type", "application/octet-stream"), o.each(e.settings.headers, function(e, t) {
						m.setRequestHeader(t, e)
					}), m.send(d, {
						runtime_order : e.settings.runtimes,
						required_caps : e.settings.required_features,
						preferred_caps : l,
						swf_url : e.settings.flash_swf_url,
						xap_url : e.settings.silverlight_xap_url
					}))
				}

				var i = e.settings.url, s = e.settings.chunk_size, u = e.settings.max_retries, a = e.features, f = 0, c;
				n.loaded && ( f = n.loaded = s * Math.floor(n.loaded / s)), c = n.getSource(), e.settings.resize && E(c, "send_binary_string") && !!~t.inArray(c.type, ["image/jpeg", "image/png"]) ? T.call(this, c, e.settings.resize, function(e) { c = e, n.size = e.size, p()
				}) : p()
			}

			function A(e, t) {
				y(t)
			}

			function O(e) {
				if(e.state == o.STARTED)
					p = +(new Date);
				else if(e.state == o.STOPPED)
					for(var t = e.files.length - 1; t >= 0; t--)e.files[t].status == o.UPLOADING && (e.files[t].status = o.QUEUED, b())
			}

			function M() {
				m && m.abort()
			}

			function _(e) {b(), r(function() {
					g.call(e)
				}, 1)
			}

			function D(e, t) {
				t.file && (t.file.status = o.FAILED, y(t.file), e.state == o.STARTED && (e.trigger("CancelUpload"), r(function() {
					g.call(e)
				}, 1)))
			}

			function P(e) {e.stop(), o.each(f, function(e) {
					e.destroy()
				}), f = [], c.length && (o.each(c, function(e) {
					e.destroy()
				}), c = []), h.length && (o.each(h, function(e) {
					e.destroy()
				}), h = []), l = {}, v = !1, p = m = null, d.reset()
			}

			var u = o.guid(), a, f = [], l = {}, c = [], h = [], p, d, v = !1, m;
			a = {
				runtimes : t.Runtime.order,
				max_retries : 0,
				chunk_size : 0,
				multipart : !0,
				multi_selection : !0,
				file_data_name : "file",
				flash_swf_url : "js/Moxie.swf",
				silverlight_xap_url : "js/Moxie.xap",
				filters : {
					mime_types : [],
					prevent_duplicates : !1,
					max_file_size : 0
				},
				resize : {
					enabled : !1,
					preserve_headers : !0,
					crop : !1
				},
				send_chunk_number : !0
			}, N.call(this, e, null, !0), d = new o.QueueProgress, o.extend(this, {
				id : u,
				uid : u,
				state : o.STOPPED,
				features : {},
				runtime : null,
				files : f,
				settings : a,
				total : d,
				init : function() {
					var e = this;
					typeof a.preinit == "function" ? a.preinit(e) : o.each(a.preinit, function(t, n) {
						e.bind(n, t)
					});
					if(!a.browse_button || !a.url) {
						this.trigger("Error", {
							code : o.INIT_ERROR,
							message : o.translate("Init error.")
						});
						return
					}S.call(this), x.call(this, a, function(n) { typeof a.init == "function" ? a.init(e) : o.each(a.init, function(t, n) {
							e.bind(n, t)
						}), n ? (e.runtime = t.Runtime.getInfo(w()).type, e.trigger("Init", {
							runtime : e.runtime
						}), e.trigger("PostInit")) : e.trigger("Error", {
							code : o.INIT_ERROR,
							message : o.translate("Init error.")
						})
					})
				},
				setOption : function(e, t) {
					N.call(this, e, t, !this.runtime)
				},
				getOption : function(e) {
					return e ? a[e] : a
				},
				refresh : function() {c.length && o.each(c, function(e) {
						e.trigger("Refresh")
					}), this.trigger("Refresh")
				},
				start : function() {this.state != o.STARTED && (this.state = o.STARTED, this.trigger("StateChanged"), g.call(this))
				},
				stop : function() {this.state != o.STOPPED && (this.state = o.STOPPED, this.trigger("StateChanged"), this.trigger("CancelUpload"))
				},
				disableBrowse : function() { v = arguments[0] !== n ? arguments[0] : !0, c.length && o.each(c, function(e) {
						e.disable(v)
					}), this.trigger("DisableBrowse", v)
				},
				getFile : function(e) {
					var t;
					for( t = f.length - 1; t >= 0; t--)
					if(f[t].id === e)
						return f[t]
				},
				addFile : function(e, n) {
					function l(e, n) {
						var r = [];
						t.each(s.settings.filters, function(t, n) {
							i[n] && r.push(function(r) {
								i[n].call(s, t, e, function(e) {
									r(!e)
								})
							})
						}), t.inSeries(r, n)
					}

					function c(e) {
						var i = t.typeOf(e);
						if( e instanceof t.File) {
							if(!e.ruid && !e.isDetached()) {
								if(!f)
									return !1;
								e.ruid = f, e.connectRuntime(f)
							}
							c(new o.File(e))
						} else
							e instanceof t.Blob ? (c(e.getSource()), e.destroy()) : e instanceof o.File ? (n && (e.name = n), u.push(function(t) {
								l(e, function(n) {n || (a.push(e), s.trigger("FileFiltered", e)), r(t, 1)
								})
							})) : t.inArray(i, ["file", "blob"]) !== -1 ? c(new t.File(null, e)) : i === "node" && t.typeOf(e.files) === "filelist" ? t.each(e.files, c) : i === "array" && ( n = null, t.each(e, c))
					}

					var s = this, u = [], a = [], f;
					f = w(), c(e), u.length && t.inSeries(u, function() {
						a.length && s.trigger("FilesAdded", a)
					})
				},
				removeFile : function(e) {
					var t = typeof e == "string" ? e : e.id;
					for(var n = f.length - 1; n >= 0; n--)
					if(f[n].id === t)
						return this.splice(n,1)[0]
				},
				splice : function(e, t) {
					var r = f.splice(e === n ? 0 : e, t === n ? f.length : t), i = !1;
					return this.state == o.STARTED && ( i = !0, this.stop()), this.trigger("FilesRemoved", r), o.each(r, function(e) {
						e.destroy()
					}), this.trigger("QueueChanged"), this.refresh(), i && this.start(), r
				},
				bind : function(e, t, n) {
					var r = this;
					o.Uploader.prototype.bind.call(this, e, function() {
						var e = [].slice.call(arguments);
						return e.splice(0, 1, r), t.apply(this, e)
					}, 0, n)
				},
				destroy : function() {this.trigger("Destroy"), a = d = null, this.unbindAll()
				}
			})
		}, o.Uploader.prototype = t.EventTarget.instance, o.File = function() {
			function n(n) {o.extend(this, {
					id : o.guid(),
					name : n.name || n.fileName,
					type : n.type || "",
					size : n.size || n.fileSize,
					origSize : n.size || n.fileSize,
					loaded : 0,
					percent : 0,
					status : o.QUEUED,
					lastModifiedDate : n.lastModifiedDate || (new Date).toLocaleString(),
					getNative : function() {
						var e = this.getSource().getSource();
						return t.inArray(t.typeOf(e), ["blob", "file"]) !== -1 ? e : null
					},
					getSource : function() {
						return e[this.id] ? e[this.id] : null
					},
					destroy : function() {
						var t = this.getSource();
						t && (t.destroy(),
						delete e[this.id])
					}
				}), e[this.id] = n
			}

			var e = {};
			return n
		}(), o.QueueProgress = function() {
			var e = this;
			e.size = 0, e.loaded = 0, e.uploaded = 0, e.failed = 0, e.queued = 0, e.percent = 0, e.bytesPerSec = 0, e.reset = function() {
				e.size = e.loaded = e.uploaded = e.failed = e.queued = e.percent = e.bytesPerSec = 0
			}
		}, e.plupload = o
	})(window, mOxie);

