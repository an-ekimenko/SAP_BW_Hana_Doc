'use strict';
/* User Service */
var cpAliasService = angular.module('cpAliasService', []);

//Delete button factory response.
cpAliasService.factory('submitAlias', ['$resource',
    function($resource) {
        return $resource('/http.svc/aliases', {}, {
            'submit': {
                method: 'POST',
                params: {
                    alias: '@alias',
                    id: '@id'
                },
                isArray: false
            }
        });
    }]);

cpAliasService.factory("aliasConfiguration", ['$resource', function($resource) {
    var config;

    var setConfig = function(newConfig) {
        config = newConfig
    };

    var getConfig = function(){
        return config;
    };

    return {
        setConfig: setConfig,
        getConfig: getConfig
    };
}]);
