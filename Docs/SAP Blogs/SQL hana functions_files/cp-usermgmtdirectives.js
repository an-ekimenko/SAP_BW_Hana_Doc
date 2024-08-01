'use strict';


/* User Management Directives */
var cpUserMgmtDirectives = angular.module('cpUserMgmtDirectives', []);

cpUserMgmtDirectives.directive("tablefiltersort", function() {
    return {
        restrict: 'A',
        replace: true,
        template :
        '<th class=\"dropdown dropdown-toggle search-filter\" dropdown dropdown-toggle auto-close="disabled" dropdown-append-to-body on-toggle=\"toggled(open)\">'+
            '{{name}}' + 
            '<ul class=\"dropdown-menu dropup\" dropdown-toggle role=\"menu\">'+
                '<li>'+
                    '<a href dropdown-toggle ng-click=\"orderAsc()\">'+
                    '<span class="glyphicon glyphicon-circle-arrow-up"></span>'+
                    'Sort Ascending</a>'+
                '</li>'+
                '<li>'+
                    '<a href dropdown-toggle ng-click=\"orderDesc()\">'+
                    '<span class="glyphicon glyphicon-circle-arrow-down"> </span>'+
                    'Sort Descending</a>'+
                '</li>'+
                '<li>'+
                    '<div class=\"container usertable-filter\">'+
                        '<form role=\"form\" class=\"form-horizontal\">'+
                            '<span class="form-group">'+ 'Filter:' +
                                '<input type=\"text\" class=\"form-control\" ng-model="search">'+//ng-model=\"searchWhat\">'+
                            '</span>'+
                        '</form>'+
                    '</div>'+
                '</li>'+
            '</ul>'+
        '</th>',
        scope: {
            name: '@headerName',
            sorttype: '=sorttype',
            search: '=searchWhat',
            sort: '=sortVar'
        },
        link: function (scope, element, attrs, $log) {
            scope.orderAsc = function () {
                if((attrs.sorttype).charAt(0) == '-') {
                    attrs.sorttype = attrs.sorttype.substr(1);
                    scope.sort = attrs.sorttype;
                }
            }

            scope.orderDesc = function () {
                if((attrs.sorttype).charAt(0) != '-') {
                     attrs.sorttype = '-'+(attrs.sorttype);
                    scope.sort = attrs.sorttype;
                }
            }

            // dropdown for table
            scope.toggled = function(open) {
            //    scope.$log.log('Dropdown is now: ', open);
            };

            scope.toggleDropdown = function($event) {
                $event.preventDefault();
                $event.stopPropagation();
                scope.status.isopen = !scope.status.isopen;
            };
        }
    }
});