(function(){/* 
 
 Copyright The Closure Library Authors. 
 SPDX-License-Identifier: Apache-2.0 
*/ 
'use strict';var g=this||self;(class{constructor(a,b){this.g=b===h?a:""}}).prototype.toString=function(){return this.g.toString()};var h={};function l(a){l[" "](a);return a}l[" "]=function(){};function m(a){let b=g,c=0;for(;b&&40>c++;){var f=!1;try{var d;if(d=!!b&&null!=b.location.href)b:{try{l(b.foo);d=!0;break b}catch(e){}d=!1}f=d}catch(e){f=!1}if(f&&a(b))break;a:{try{const e=b.parent;if(e&&e!=b){b=e;break a}}catch(e){}b=null}}};function n(){return new p(a=>a(void 0))}function q(a,b){if(!a.h)if(b instanceof p)b.then(c=>{q(a,c)});else{a.h=!0;a.i=b;for(b=0;b<a.g.length;++b)r(a,a.g[b]);a.g=[]}}function r(a,b){a.h?b(a.i):a.g.push(b)}class p{constructor(a){this.h=!1;this.g=[];a(b=>{q(this,b)})}then(a){return new p(b=>{r(this,c=>{b(a(c))})})}};function t(a){if(!a)throw Error("functionToExecute must not be truthy.");};function u(){return/\d+\.\d+\.\d+(-.*)?/.test("1.3.3-google_20200427")}function v(){const a=["1","3","3"],b=["1","0","3"];for(let c=0;3>c;c++){const f=parseInt(a[c],10),d=parseInt(b[c],10);if(f>d)break;else if(f<d)return!1}return!0};function w(a){return!!a&&void 0!==a.omid_message_guid&&void 0!==a.omid_message_method&&void 0!==a.omid_message_version&&"string"===typeof a.omid_message_guid&&"string"===typeof a.omid_message_method&&"string"===typeof a.omid_message_version&&(void 0===a.omid_message_args||void 0!==a.omid_message_args)}function x(a){return new y(a.omid_message_guid,a.omid_message_method,a.omid_message_version,a.omid_message_args)} 
function z(a){const b={["omid_message_guid"]:a.h,["omid_message_method"]:a.method,["omid_message_version"]:a.version};void 0!==a.g&&(b.omid_message_args=a.g);return b}class y{constructor(a,b,c,f){this.h=a;this.method=b;this.version=c;this.g=f}};class A{constructor(a){this.h=a}};function B(a,b){return a&&(a[b]||(a[b]={}))};function C(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,a=>{let b=16*Math.random()|0;return"y"===a?(b&3|8).toString(16):b.toString(16)})};function D(...a){E(()=>{throw Error("Could not complete the test successfully - ",...a);},()=>console.error(...a))}function E(a,b){"undefined"!==typeof jasmine&&jasmine?a():"undefined"!==typeof console&&console&&console.error&&b()};const F=eval("this");var G=function(){if("undefined"!==typeof omidGlobal&&omidGlobal)return omidGlobal;if("undefined"!==typeof global&&global)return global;if("undefined"!==typeof window&&window)return window;if("undefined"!==typeof F&&F)return F;throw Error("Could not determine global object context.");}();function H(a){try{return a.frames?!!a.frames.omid_v1_present:!1}catch(b){return!1}};class I extends A{constructor(a){super(a);this.handleExportedMessage=I.prototype.i.bind(this)}sendMessage(a,b=this.h){if(!b)throw Error("Message destination must be defined at construction time or when sending the message.");b.handleExportedMessage(z(a),this)}i(a,b){w(a)&&this.g&&this.g(x(a),b)}};function J(a){return null!=a&&"undefined"!==typeof a.top&&null!=a.top}function K(a){if(a===G)return!1;try{if("undefined"===typeof a.location.hostname)return!0}catch(b){return!0}return!1};class L extends A{constructor(a,b=G){super(b);a.addEventListener("message",c=>{if("object"===typeof c.data){var f=c.data;w(f)&&c.source&&this.g&&this.g(x(f),c.source)}})}sendMessage(a,b=this.h){if(!b)throw Error("Message destination must be defined at construction time or when sending the message.");b.postMessage(z(a),"*")}};const M=["omid","v1_VerificationServiceCommunication"],N=["omidVerificationProperties","serviceWindow"];function O(a,b){return b.reduce((c,f)=>c&&c[f],a)};function P(a,b,c,...f){if(a.g){var d=C();c&&(a.h[d]=c);c=u()&&v()?f:JSON.stringify(f);a.g.sendMessage(new y(d,`VerificationService.${b}`,"1.3.3-google_20200427",c))}} 
class Q{constructor(a){if(!a){var b;"undefined"===typeof b&&"undefined"!==typeof window&&window&&(b=window);b=J(b)?b:G;a=[];var c=O(b,N);c&&a.push(c);a.push(J(b)?b.top:G);a:{for(const e of a){b:{a=b;c=e;var f=H;if(!K(c))try{const k=O(c,M);if(k){var d=new I(k);break b}}catch(k){}d=f(c)?new L(a,c):null}if(a=d)break a}a=null}}if(this.g=a)this.g.g=this.j.bind(this);else if(d=(d=G.omid3p)&&"function"===typeof d.registerSessionObserver&&"function"===typeof d.addEventListener?d:null)this.omid3p=d;this.h= 
{};this.i=(d=G.omidVerificationProperties)?d.injectionId:void 0}registerSessionObserver(a,b){t(a);this.omid3p?this.omid3p.registerSessionObserver(a,b,this.i):P(this,"addSessionListener",a,b,this.i)}addEventListener(a,b){if(!a)throw Error("Value for eventType is undefined, null or blank.");if("string"!==typeof a&&!(a instanceof String))throw Error("Value for eventType is not a string.");if(""===a.trim())throw Error("Value for eventType is empty string.");t(b);this.omid3p?this.omid3p.addEventListener(a, 
b):P(this,"addEventListener",b,a)}j(a){const b=a.method,c=a.h;a=a.g;if("response"===b&&this.h[c]){var f=u()&&v()?a?a:[]:a&&"string"===typeof a?JSON.parse(a):[];this.h[c].apply(this,f)}"error"===b&&window.console&&D(a)}}(function(a,b,c="undefined"===typeof omidExports?null:omidExports){c&&(a=a.split("."),a.slice(0,a.length-1).reduce(B,c)[a[a.length-1]]=b)})("OmidVerificationClient",Q);function R(){let a=null;m(b=>(b=b.mraid)&&b.IS_GMA_SDK?(a=b,!0):!1);return a}function S(){return new p(a=>{g.document.readyState&&"complete"===g.document.readyState?a():g.addEventListener("load",a)})}function T(){return new p(a=>{const b=R();b&&("loading"===b.getState()?b.addEventListener("ready",()=>{a(b)}):a(b))})} 
function U(){return new p(a=>{S().then(()=>{T().then(b=>{const c=(f,d)=>{0<d.width&&0<d.height&&(a(),b.removeEventListener("exposureChange",c))};b.addEventListener("exposureChange",c)})})})} 
function V(a){a.j?(a.h=new p(b=>{const c=new p(d=>{a.i.registerSessionObserver(e=>{"sessionStart"==e.type&&(e=e.data,d("app"==e.context.environment),e.context.omidNativeInfo&&(a.g.sdk=e.context.omidNativeInfo.partnerName))})}),f=new p(d=>{a.i.addEventListener("geometryChange",e=>{e=e.data;const k=e.adView.reasons;k&&-1!=k.indexOf("hidden")||(e=e.adView,(e=e.onScreenContainerGeometry||e.onScreenGeometry)&&e.width&&e.height&&d())})});c.then(d=>{d?(f.then(()=>{a.g.src=1;b(a.g)}),U().then(()=>{a.g.src= 
2;b(a.g)})):b()})}),a.h.then(()=>{a.j=!1})):a.h=n()}class W{constructor(){var a=this.i=new Q;this.l=!(!a.g&&!a.omid3p);this.h=null;this.j=this.l;this.g={}}};window.omrhp=function(a){var b=new W;b.h||V(b);b.h.then(a)};}).call(this);
