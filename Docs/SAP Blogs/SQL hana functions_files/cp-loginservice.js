'use strict';
/* User Service */
var cpLoginService = angular.module('cpLoginService', []);


cpLoginService.factory('usersManagement', ['$cookies', 
    function($cookies) {
        var usersManagement = {
        		
                logout: function($scope) {
                	// Remove cookies on client side.  Server should also tell browser to delete cookies.
                	var firstname = $cookies.get('sapuacpuserfirstname');
                	if (firstname) {
                		$cookies.remove('sapuacpuserfirstname', { path: '/http.svc'});
                		$cookies.remove('sapuacpuseremail', { path: '/http.svc'});
                		$cookies.remove('sapuacpuserid', { path: '/http.svc'});
                	}
                	
                	$cookies.put('sapuacplogout', 'true');
                	
                },
                isLoggedOn: function($scope) { // $scope is not used, refactoring needed
                	var firstname = $cookies.get('sapuacpuserfirstname');
                	return (firstname)? true: false;
                },
                isUserAdmin: function() {
                	var isAdmin = $cookies.get('sapuacpuserisadmin'); // returns 1 or 0, if cookie exists
                	return (isAdmin && isAdmin == 1)? true: false; // convert to boolean and return
                },
                isUserEmployee: function() {
                	var isEmployee = $cookies.get('sapuacpuserisemployee'); // returns 1 or 0, if cookie exists
                	return (isEmployee && isEmployee == 1)? true: false; // convert to boolean and return
                },
                userFirstName: function() {
                	return $cookies.get('sapuacpuserfirstname');
                },
                userLastName: function() {
                	return $cookies.get('sapuacpuserlastname');
                },
               userId: function() {
				   return $cookies.get('sapuacpuserid')
			   }
        } 
        return usersManagement; 
    }
]);