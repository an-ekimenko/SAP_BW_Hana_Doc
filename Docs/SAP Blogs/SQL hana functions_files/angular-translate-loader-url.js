/*!
 * angular-translate - v2.8.1 - 2015-10-01
 * 
 * Copyright (c) 2015 The angular-translate team, Pascal Precht; Licensed MIT
 */
!function(t,e){"function"==typeof define&&define.amd?define([],function(){return e()}):"object"==typeof exports?module.exports=e():e()}(this,function(){function t(t,e){"use strict"
return function(r){if(!r||!r.url)throw new Error("Couldn't use urlLoader since no url is given!")
var n={}
return n[r.queryParameter||"lang"]=r.key,e(angular.extend({url:r.url,params:n,method:"GET"},r.$http)).then(function(t){return t.data.data},function(){return t.reject(r.key)})}}return angular.module("pascalprecht.translate").factory("$translateUrlLoader",t),t.$inject=["$q","$http"],t.displayName="$translateUrlLoader","pascalprecht.translate"})
